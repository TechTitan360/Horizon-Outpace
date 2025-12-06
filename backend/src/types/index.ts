export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export type Role = 0 | 1 | 2; // member, manager, admin
export type TaskStatus = 0 | 1 | 2 | 3 | 4; // todo, in_progress, review, done, blocked
export type TaskPriority = 0 | 1 | 2 | 3; // low, normal, high, critical

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface RequestWithUser extends Request {
    user?: {
        id: number;
        email: string;
        role: Role;
    };
}
