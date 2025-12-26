'use client';

import React from 'react';

export default function TaskSkeleton() {
    return (
        <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] px-4 py-3 animate-pulse">
            <div className="flex items-center gap-3">
                {/* Status icon */}
                <div className="w-5 h-5 bg-surface-secondary rounded-full flex-shrink-0" />

                {/* Title & description */}
                <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="h-4 w-48 bg-surface-secondary rounded" />
                    <div className="h-3 w-32 bg-border-light rounded" />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="h-6 w-16 bg-border-light rounded" />
                    <div className="h-6 w-16 bg-border-light rounded" />
                </div>
            </div>
        </div>
    );
}
