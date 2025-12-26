import { register, login } from './modules/auth/auth.controller';
import { handleTaskRoutes } from './modules/tasks/task.routes';
import { handleProjectRoutes } from './modules/projects/project.routes';

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
        const taskResponse = await handleTaskRoutes(pathname, method, req);
        if (taskResponse) return taskResponse;

        // Project routes
        const projectResponse = await handleProjectRoutes(pathname, method, req);
        if (projectResponse) return projectResponse;

        // 404 Not Found
        return Response.json(
            { success: false, error: 'Route not found' },
            { status: 404 }
        );
    };
}