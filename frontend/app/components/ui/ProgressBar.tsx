'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function ProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Reset on route change
        setProgress(0);
        setIsVisible(true);

        // Simulate progress
        const timer1 = setTimeout(() => setProgress(40), 100);
        const timer2 = setTimeout(() => setProgress(70), 200);
        const timer3 = setTimeout(() => setProgress(100), 400);
        const timer4 = setTimeout(() => setIsVisible(false), 500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [pathname, searchParams]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-0.5">
            <div
                className="h-full transition-all duration-300 ease-out"
                style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(to right, var(--brand-500), var(--accent-500), var(--brand-600))',
                    boxShadow: '0 0 10px var(--brand-500), 0 0 5px var(--brand-400)',
                }}
            />
        </div>
    );
}
