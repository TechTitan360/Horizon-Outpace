import { z } from 'zod';
import { validate } from '@/middlewares/validate';
import * as authService from './auth.service';
import type { ApiResponse } from '@/types';

// Validation schemas
export const registerSchema = z.object({
    name: z.string().min(2).max(150),
    email: z.string().email().max(255),
    password: z.string().min(6),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function register(req: Request): Promise<Response> {
    try {
        const body = await req.json();
        const validation = await validate(registerSchema)(body);

        if (!validation.success) {
            return Response.json(
                { success: false, error: validation.error },
                { status: 400 }
            );
        }

        const result = await authService.register(validation.data);

        return Response.json(
            { success: true, data: result, message: 'Registration successful' },
            { status: 201 }
        );
    } catch (error: any) {
        return Response.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function login(req: Request): Promise<Response> {
    try {
        const body = await req.json();
        const validation = await validate(loginSchema)(body);

        if (!validation.success) {
            return Response.json(
                { success: false, error: validation.error },
                { status: 400 }
            );
        }

        const result = await authService.login(validation.data);

        return Response.json(
            { success: true, data: result, message: 'Login successful' },
            { status: 200 }
        );
    } catch (error: any) {
        return Response.json(
            { success: false, error: error.message },
            { status: 401 }
        );
    }
}
