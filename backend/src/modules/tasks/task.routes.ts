import { getTasks, createTask, updateTask, deleteTask, getTaskStats } from './task.controller';

export async function handleTaskRoutes(
    pathname: string,
    method: string,
    req: Request
): Promise<Response | null> {
    
    // GET /api/tasks
    if (pathname === '/api/tasks' && method === 'GET') {
        return await getTasks(req as any);
    }

    // POST /api/tasks
    if (pathname === '/api/tasks' && method === 'POST') {
        return await createTask(req as any);
    }

    // GET /api/tasks/stats
    if (pathname === '/api/tasks/stats' && method === 'GET') {
        return await getTaskStats(req as any);
    }

    // PUT/DELETE /api/tasks/:id
    const taskIdMatch = pathname.match(/^\/api\/tasks\/(\d+)$/);
    if (taskIdMatch) {
        const taskId = parseInt(taskIdMatch[1]);

        if (method === 'PUT') {
            return await updateTask(req as any, taskId);
        }

        if (method === 'DELETE') {
            return await deleteTask(req as any, taskId);
        }
    }

    return null; // Not a task route
}