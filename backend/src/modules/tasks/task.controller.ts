import { z } from 'zod';
import { TaskService } from './task.service';
import { validate } from '../../middlewares/validate';
import { authenticate } from '../../middlewares/auth';
import type { RequestWithUser } from '../../types';
import { TASK_STATUS, TASK_PRIORITY } from '../../config';

const taskService = new TaskService();

// Validation schemas
const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().max(1000).optional(),
    status: z.number().int().min(0).max(2).default(0), // 0=todo, 1=in_progress, 2=completed
    priority: z.number().int().min(0).max(3).default(0), // 0=low, 1=normal, 2=high, 3=critical
    dueDate: z.string().optional(),
    projectId: z.number().int().optional(),
    assignedTo: z.number().int().optional(),
});

const updateTaskSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(1000).optional(),
    status: z.number().int().min(0).max(2).optional(),
    priority: z.number().int().min(0).max(3).optional(),
    dueDate: z.string().optional(),
});

// Get all tasks for authenticated user
export const getTasks = async (req: RequestWithUser): Promise<Response> => {
    // Authenticate
    const authResult = await authenticate(req);
    if (authResult) return authResult;
    if (!req.user) {
        return Response.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const tasks = await taskService.getTasksByUser(req.user.id);

        // Map status and priority numbers to strings for frontend
        const mappedTasks = tasks.map(task => ({
            ...task,
            statusName: Object.keys(TASK_STATUS)[task.status]?.toLowerCase() || 'unknown',
            priorityName: Object.keys(TASK_PRIORITY)[task.priority]?.toLowerCase() || 'unknown',
        }));

        return Response.json({
            success: true,
            data: mappedTasks,
            message: 'Tasks retrieved successfully'
        });
    } catch (error: any) {
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
};

// Create new task
export const createTask = async (req: RequestWithUser): Promise<Response> => {
    // Authenticate
    const authResult = await authenticate(req);
    if (authResult) return authResult;
    if (!req.user) {
        return Response.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    }

    // Validate request body
    const body = await req.json();
    const validator = validate(createTaskSchema);
    const validationResult = await validator(body);
    if (!validationResult.success) {
        return Response.json(
            { success: false, error: validationResult.error },
            { status: 400 }
        );
    }

    try {
        const task = await taskService.createTask({
            title: validationResult.data.title,
            description: validationResult.data.description,
            status: validationResult.data.status ?? 0,
            priority: validationResult.data.priority ?? 0,
            dueDate: validationResult.data.dueDate,
            createdBy: req.user.id,
            projectId: validationResult.data.projectId,
            assignedTo: validationResult.data.assignedTo,
        });

        return Response.json({
            success: true,
            data: task,
            message: 'Task created successfully'
        }, { status: 201 });
    } catch (error: any) {
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
};

// Update task
export const updateTask = async (req: RequestWithUser, taskId: number): Promise<Response> => {
    // Authenticate
    const authResult = await authenticate(req);
    if (authResult) return authResult;
    if (!req.user) {
        return Response.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    }

    // Validate request body
    const body = await req.json();
    const validator = validate(updateTaskSchema);
    const validationResult = await validator(body);
    if (!validationResult.success) {
        return Response.json(
            { success: false, error: validationResult.error },
            { status: 400 }
        );
    }

    try {
        const task = await taskService.updateTask(taskId, req.user.id, validationResult.data);

        return Response.json({
            success: true,
            data: task,
            message: 'Task updated successfully'
        });
    } catch (error: any) {
        const status = error.message.includes('not found') ? 404 :
            error.message.includes('Unauthorized') ? 403 : 500;
        return Response.json(
            { success: false, message: error.message },
            { status }
        );
    }
};

// Delete task
export const deleteTask = async (req: RequestWithUser, taskId: number): Promise<Response> => {
    // Authenticate
    const authResult = await authenticate(req);
    if (authResult) return authResult;
    if (!req.user) {
        return Response.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        await taskService.deleteTask(taskId, req.user.id);

        return Response.json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error: any) {
        const status = error.message.includes('not found') ? 404 :
            error.message.includes('Unauthorized') ? 403 : 500;
        return Response.json(
            { success: false, message: error.message },
            { status }
        );
    }
};

// Get task statistics
export const getTaskStats = async (req: RequestWithUser): Promise<Response> => {
    // Authenticate
    const authResult = await authenticate(req);
    if (authResult) return authResult;
    if (!req.user) {
        return Response.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const stats = await taskService.getTaskStats(req.user.id);

        return Response.json({
            success: true,
            data: stats,
            message: 'Task stats retrieved successfully'
        });
    } catch (error: any) {
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
};
