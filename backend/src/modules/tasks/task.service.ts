import { db } from '../../db/drizzle';
import { tasks, taskAssignments, users } from '../../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { logger } from '../../utils/logger';

export class TaskService {
    async createTask(taskData: {
        title: string;
        description?: string;
        status: number;
        priority: number;
        dueDate?: string;
        createdBy: number;
        projectId?: number;
        assignedTo?: number;
    }) {
        try {
            const taskValues: any = {
                title: taskData.title,
                description: taskData.description || null,
                status: taskData.status,
                priority: taskData.priority,
                dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
                createdBy: taskData.createdBy,
            };

            // Only add projectId if provided
            if (taskData.projectId) {
                taskValues.projectId = taskData.projectId;
            }

            const [task] = await db.insert(tasks).values(taskValues).returning();

            // Create task assignment if assignedTo is provided
            if (taskData.assignedTo) {
                await db.insert(taskAssignments).values({
                    taskId: task.id,
                    userId: taskData.assignedTo,
                    assignedBy: taskData.createdBy,
                    assignedAt: new Date(),
                });
            }

            logger.info(`Task created: ${task.id}`);
            return task;
        } catch (error: any) {
            logger.error('Error creating task:', error);
            throw new Error('Failed to create task');
        }
    }

    async getTasksByUser(userId: number) {
        try {
            // Get tasks created by user or assigned to user
            const userTasks = await db
                .select({
                    id: tasks.id,
                    title: tasks.title,
                    description: tasks.description,
                    status: tasks.status,
                    priority: tasks.priority,
                    dueDate: tasks.dueDate,
                    createdAt: tasks.createdAt,
                    createdBy: tasks.createdBy,
                    projectId: tasks.projectId,
                    creatorName: users.name,
                })
                .from(tasks)
                .leftJoin(users, eq(tasks.createdBy, users.id))
                .where(eq(tasks.createdBy, userId))
                .orderBy(desc(tasks.createdAt));

            return userTasks;
        } catch (error: any) {
            logger.error('Error fetching tasks:', error);
            throw new Error('Failed to fetch tasks');
        }
    }

    async getTaskById(taskId: number) {
        try {
            const [task] = await db
                .select()
                .from(tasks)
                .where(eq(tasks.id, taskId));

            return task || null;
        } catch (error: any) {
            logger.error('Error fetching task:', error);
            throw new Error('Failed to fetch task');
        }
    }

    async updateTask(taskId: number, userId: number, updates: {
        title?: string;
        description?: string;
        status?: number;
        priority?: number;
        dueDate?: string;
    }) {
        try {
            // Verify user owns the task
            const task = await this.getTaskById(taskId);
            if (!task) {
                throw new Error('Task not found');
            }
            if (task.createdBy !== userId) {
                throw new Error('Unauthorized to update this task');
            }

            const updateData: any = { ...updates, updatedAt: new Date() };

            // Convert dueDate string to Date if provided
            if (updateData.dueDate) {
                updateData.dueDate = new Date(updateData.dueDate);
            }

            const [updatedTask] = await db
                .update(tasks)
                .set(updateData)
                .where(eq(tasks.id, taskId))
                .returning();

            logger.info(`Task updated: ${taskId}`);
            return updatedTask;
        } catch (error: any) {
            logger.error('Error updating task:', error);
            throw error;
        }
    }

    async deleteTask(taskId: number, userId: number) {
        try {
            // Verify user owns the task
            const task = await this.getTaskById(taskId);
            if (!task) {
                throw new Error('Task not found');
            }
            if (task.createdBy !== userId) {
                throw new Error('Unauthorized to delete this task');
            }

            // Delete task assignments first (foreign key constraint)
            await db.delete(taskAssignments).where(eq(taskAssignments.taskId, taskId));

            // Delete the task
            await db.delete(tasks).where(eq(tasks.id, taskId));

            logger.info(`Task deleted: ${taskId}`);
            return true;
        } catch (error: any) {
            logger.error('Error deleting task:', error);
            throw error;
        }
    }

    async getTaskStats(userId: number) {
        try {
            const userTasks = await this.getTasksByUser(userId);

            const stats = {
                total: userTasks.length,
                completed: userTasks.filter(t => t.status === 2).length, // Status 2 = completed
                inProgress: userTasks.filter(t => t.status === 1).length, // Status 1 = in_progress
                todo: userTasks.filter(t => t.status === 0).length, // Status 0 = todo
            };

            return stats;
        } catch (error: any) {
            logger.error('Error fetching task stats:', error);
            throw new Error('Failed to fetch task stats');
        }
    }
}
