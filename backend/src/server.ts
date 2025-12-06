import { config } from './config';
import { logger } from './utils/logger';
import { createApp } from './app';

const app = createApp();

const server = Bun.serve({
    port: config.port,

    async fetch(req) {
        // CORS headers
        const headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        });

        // Handle OPTIONS (preflight)
        if (req.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers });
        }

        // Handle request
        const response = await app(req);

        // Add CORS headers to response
        for (const [key, value] of headers.entries()) {
            response.headers.set(key, value);
        }

        return response;
    },

    error(error) {
        logger.error('Server error:', error);
        return new Response('Internal Server Error', { status: 500 });
    },
});

logger.info(`🚀 Server running on http://localhost:${server.port}`);
