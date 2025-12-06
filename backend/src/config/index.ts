export const config = {
    port: parseInt(process.env.PORT || '8000'),
    nodeEnv: process.env.NODE_ENV || 'development',

    database: {
        url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/outpace',
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },

    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    },
};

export const ROLES = {
    MEMBER: 0,
    MANAGER: 1,
    ADMIN: 2,
} as const;

export const TASK_STATUS = {
    TODO: 0,
    IN_PROGRESS: 1,
    REVIEW: 2,
    DONE: 3,
    BLOCKED: 4,
} as const;

export const TASK_PRIORITY = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
    CRITICAL: 3,
} as const;
