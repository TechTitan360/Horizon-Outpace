'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // Only run on client side
        const token = localStorage.getItem('token');

        if (!token) {
            // No token found, redirect to login
            router.push('/auth');
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    // Show nothing during SSR and initial client-side check
    if (isAuthenticated === null || isAuthenticated === false) {
        return null;
    }

    return <>{children}</>;
}
