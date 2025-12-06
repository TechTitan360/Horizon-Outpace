'use client';

import React from 'react';
import { Plus } from 'lucide-react';

export default function ProjectsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                    <p className="mt-2 text-gray-600">Manage your projects</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    New Project
                </button>
            </div>

            <div className="text-center py-12 text-gray-500">
                Projects page - Coming soon
            </div>
        </div>
    );
}
