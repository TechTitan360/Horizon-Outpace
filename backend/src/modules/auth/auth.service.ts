import { eq } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { hashPassword, comparePassword } from '@/utils/hash';
import { generateToken } from '@/utils/jwt';

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export async function register(data: RegisterData) {
    // Check if user exists
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email))
        .limit(1);

    if (existingUser.length > 0) {
        throw new Error('Email already registered');
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const [newUser] = await db
        .insert(users)
        .values({
            name: data.name,
            email: data.email,
            passwordHash,
            role: 0, // member by default
        })
        .returning({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            isActive: users.isActive,
            createdAt: users.createdAt,
        });

    // Generate token
    const token = generateToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
    });

    return { user: newUser, token };
}

export async function login(data: LoginData) {
    // Find user
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email))
        .limit(1);

    if (!user || !user.isActive) {
        throw new Error('Invalid email or password');
    }

    // Verify password
    const isValid = await comparePassword(data.password, user.passwordHash);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
        },
        token,
    };
}
