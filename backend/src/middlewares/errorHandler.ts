import { logger } from '@/utils/logger';

export function errorHandler(error: Error): Response {
    logger.error('Error:', error.message, error.stack);

    return Response.json(
        {
            success: false,
            error: process.env.NODE_ENV === 'development'
                ? error.message
                : 'Internal server error',
        },
        { status: 500 }
    );
}
