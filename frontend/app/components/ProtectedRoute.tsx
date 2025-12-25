'use client';

import { useEffect, useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    // Use layout effect for faster check before paint
    useIsomorphicLayoutEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.replace('/auth');
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    // Show loading skeleton during auth check
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar Skeleton */}
                <aside className="w-64 bg-white border-r border-gray-200 p-4">
                    <div className="h-8 bg-gray-200 rounded animate-pulse mb-8" />
                    <div className="space-y-3">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
                        ))}
                    </div>
                </aside>
                {/* Content Skeleton */}
                <main className="flex-1 p-8">
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mb-8" />
                    <div className="grid gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-24 bg-white border border-gray-200 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    // Redirect in progress
    if (isAuthenticated === false) {
        return null;
    }

    return <>{children}</>;
}
