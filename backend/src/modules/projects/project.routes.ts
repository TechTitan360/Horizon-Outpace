import { getProjects, getProject, createNewProject, updateExistingProject, deleteExistingProject } from './project.controller';

export async function handleProjectRoutes(
    pathname: string,
    method: string,
    req: Request
): Promise<Response | null> {

    // GET /api/projects
    if (pathname === '/api/projects' && method === 'GET') {
        return await getProjects(req as any);
    }

    // POST /api/projects
    if (pathname === '/api/projects' && method === 'POST') {
        return await createNewProject(req as any);
    }

    // GET/PUT/DELETE /api/projects/:id
    const projectIdMatch = pathname.match(/^\/api\/projects\/(\d+)$/);
    if (projectIdMatch) {
        const projectId = parseInt(projectIdMatch[1]);

        if (method === 'GET') {
            return await getProject(req as any, projectId);
        }

        if (method === 'PUT') {
            return await updateExistingProject(req as any, projectId);
        }

        if (method === 'DELETE') {
            return await deleteExistingProject(req as any, projectId);
        }
    }

    return null; // Not a project route
}