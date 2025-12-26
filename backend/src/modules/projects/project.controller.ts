import { z } from 'zod';
import { getAllProjects, createProject, getProjectById, updateProject, deleteProject } from "./project.service";
import { authenticate } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import type { RequestWithUser } from '../../types';

// Validation schemas
const createProjectSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().max(1000).optional(),
    teamId: z.number().int().optional(),
});

const updateProjectSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(1000).optional(),
    isArchived: z.boolean().optional(),
});

// Get all projects for authenticated user
export const getProjects = async (req: RequestWithUser): Promise<Response> => {
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
        const result = await getAllProjects(req.user.id);
        if (!result.success) {
            return Response.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }
        return Response.json({
            success: true,
            data: result.data,
            message: 'Projects retrieved successfully'
        });
    } catch (error: any) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};

// Get project by ID
export const getProject = async (req: RequestWithUser, projectId: number): Promise<Response> => {
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
        const result = await getProjectById(projectId, req.user.id);
        if (!result.success) {
            return Response.json(
                { success: false, error: result.error },
                { status: 404 }
            );
        }
        return Response.json({
            success: true,
            data: result.data,
            message: 'Project retrieved successfully'
        });
    } catch (error: any) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};

// Create new project
export const createNewProject = async (req: RequestWithUser): Promise<Response> => {
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
    const validator = validate(createProjectSchema);
    const validationResult = await validator(body);
    if (!validationResult.success) {
        return Response.json(
            { success: false, error: validationResult.error },
            { status: 400 }
        );
    }

    try {
        const result = await createProject(validationResult.data, req.user.id);
        if (!result.success) {
            return Response.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }
        return Response.json({
            success: true,
            data: result.data,
            message: 'Project created successfully'
        }, { status: 201 });
    } catch (error: any) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};

// Update project
export const updateExistingProject = async (req: RequestWithUser, projectId: number): Promise<Response> => {
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
    const validator = validate(updateProjectSchema);
    const validationResult = await validator(body);
    if (!validationResult.success) {
        return Response.json(
            { success: false, error: validationResult.error },
            { status: 400 }
        );
    }

    try {
        const result = await updateProject(projectId, validationResult.data, req.user.id);
        if (!result.success) {
            return Response.json(
                { success: false, error: result.error },
                { status: 404 }
            );
        }
        return Response.json({
            success: true,
            data: result.data,
            message: 'Project updated successfully'
        });
    } catch (error: any) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};

// Delete project
export const deleteExistingProject = async (req: RequestWithUser, projectId: number): Promise<Response> => {
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
        const result = await deleteProject(projectId, req.user.id);
        if (!result.success) {
            return Response.json(
                { success: false, error: result.error },
                { status: 404 }
            );
        }
        return Response.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error: any) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};