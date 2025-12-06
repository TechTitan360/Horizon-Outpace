import { register, login } from './auth.controller';

export function authRoutes() {
    return {
        '/register': {
            POST: register,
        },
        '/login': {
            POST: login,
        },
    };
}
