import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from '@/config';
import { logger } from '@/utils/logger';
import * as schema from './schema';

const client = postgres(config.database.url, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
});

export const db = drizzle(client, { schema });

// Test connection
client`SELECT 1`
    .then(() => logger.info('✅ Database connected'))
    .catch((err) => logger.error('❌ Database connection failed:', err));

export { schema };
