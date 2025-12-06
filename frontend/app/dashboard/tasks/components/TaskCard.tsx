import React from 'react';
import { Calendar, Flag } from 'lucide-react';

interface Task {
    id: number;
    title: string;
    description?: string | null;
    status: number;
    statusName: string;
    priority: number;
    priorityName: string;
    dueDate?: string | null;
    createdAt: string;
    creatorName?: string;
}

export default function TaskCard({ task }: { task: Task }) {
    const statusColors: Record<string, string> = {
        todo: 'bg-gray-100 text-gray-700',
        in_progress: 'bg-blue-100 text-blue-700',
        completed: 'bg-green-100 text-green-700',
    };

    const priorityColors: Record<string, string> = {
        low: 'text-gray-500',
        normal: 'text-blue-500',
        high: 'text-orange-500',
        critical: 'text-red-500',
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    {task.description && (
                        <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                    )}

                    <div className="mt-4 flex items-center gap-4 flex-wrap">
                        {/* Status */}
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.statusName] || statusColors.todo
                                }`}
                        >
                            {task.statusName.replace('_', ' ')}
                        </span>

                        {/* Due Date */}
                        {task.dueDate && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                        )}

                        {/* Priority */}
                        <div className="flex items-center gap-1.5">
                            <Flag
                                className={`w-4 h-4 ${priorityColors[task.priorityName] || priorityColors.normal
                                    }`}
                            />
                            <span
                                className={`text-sm font-medium capitalize ${priorityColors[task.priorityName] || priorityColors.normal
                                    }`}
                            >
                                {task.priorityName}
                            </span>
                        </div>

                        {/* Created by */}
                        {task.creatorName && (
                            <div className="text-xs text-gray-500">
                                Created by {task.creatorName}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
