import { verifyToken } from '@/utils/jwt';
import type { RequestWithUser } from '@/types';

export async function authenticate(req: RequestWithUser): Promise<Response | void> {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return Response.json(
            { success: false, error: 'No token provided' },
            { status: 401 }
        );
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
    } catch (error) {
        return Response.json(
            { success: false, error: 'Invalid token' },
            { status: 401 }
        );
    }
}
