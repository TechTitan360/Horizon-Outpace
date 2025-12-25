'use client';

import React from 'react';

export default function TaskSkeleton() {
    return (
        <div className="bg-white rounded-lg border border-gray-200/80 px-4 py-3 animate-pulse">
            <div className="flex items-center gap-3">
                {/* Status icon */}
                <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0" />

                {/* Title & description */}
                <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="h-4 w-48 bg-gray-200 rounded" />
                    <div className="h-3 w-32 bg-gray-100 rounded" />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="h-6 w-16 bg-gray-100 rounded" />
                    <div className="h-6 w-16 bg-gray-100 rounded" />
                </div>
            </div>
        </div>
    );
}
