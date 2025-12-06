import { z, ZodSchema } from 'zod';

export function validate<T>(schema: ZodSchema<T>) {
    return async (data: unknown): Promise<{ success: true; data: T } | { success: false; error: string }> => {
        try {
            const validated = schema.parse(data);
            return { success: true, data: validated };
        } catch (error) {
            if (error instanceof z.ZodError) {
                const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
                return { success: false, error: messages };
            }
            return { success: false, error: 'Validation failed' };
        }
    };
}
