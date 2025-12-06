import { register, login } from './modules/auth/auth.controller';
import { getTasks, createTask, updateTask, deleteTask, getTaskStats } from './modules/tasks/task.controller';

export function createApp() {
    return async function handleRequest(req: Request): Promise<Response> {
        const url = new URL(req.url);
        const pathname = url.pathname;
        const method = req.method;

        // Health check
        if (pathname === '/health' && method === 'GET') {
            return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
        }

        // Auth routes
        if (pathname === '/api/auth/register' && method === 'POST') {
            try {
                return await register(req);
            } catch (error: any) {
                console.error('Register error:', error);
                return Response.json(
                    { success: false, error: error.message || 'Internal server error' },
                    { status: 500 }
                );
            }
        }

        if (pathname === '/api/auth/login' && method === 'POST') {
            try {
                return await login(req);
            } catch (error: any) {
                console.error('Login error:', error);
                return Response.json(
                    { success: false, error: error.message || 'Internal server error' },
                    { status: 500 }
                );
            }
        }

        // Task routes
        if (pathname === '/api/tasks' && method === 'GET') {
            try {
                return await getTasks(req as any);
            } catch (error: any) {
                console.error('Get tasks error:', error);
                return Response.json(
                    { success: false, error: error.message || 'Internal server error' },
                    { status: 500 }
                );
            }
        }

        if (pathname === '/api/tasks' && method === 'POST') {
            try {
                return await createTask(req as any);
            } catch (error: any) {
                console.error('Create task error:', error);
                return Response.json(
                    { success: false, error: error.message || 'Internal server error' },
                    { status: 500 }
                );
            }
        }

        if (pathname === '/api/tasks/stats' && method === 'GET') {
            try {
                return await getTaskStats(req as any);
            } catch (error: any) {
                console.error('Get task stats error:', error);
                return Response.json(
                    { success: false, error: error.message || 'Internal server error' },
                    { status: 500 }
                );
            }
        }

        // Task by ID routes (PUT /api/tasks/:id, DELETE /api/tasks/:id)
        const taskIdMatch = pathname.match(/^\/api\/tasks\/(\d+)$/);
        if (taskIdMatch) {
            const taskId = parseInt(taskIdMatch[1]);

            if (method === 'PUT') {
                try {
                    return await updateTask(req as any, taskId);
                } catch (error: any) {
                    console.error('Update task error:', error);
                    return Response.json(
                        { success: false, error: error.message || 'Internal server error' },
                        { status: 500 }
                    );
                }
            }

            if (method === 'DELETE') {
                try {
                    return await deleteTask(req as any, taskId);
                } catch (error: any) {
                    console.error('Delete task error:', error);
                    return Response.json(
                        { success: false, error: error.message || 'Internal server error' },
                        { status: 500 }
                    );
                }
            }
        }

        // 404 Not Found
        return Response.json(
            { success: false, error: 'Route not found' },
            { status: 404 }
        );
    };
}
