'use client';

import React, { useState, memo } from 'react';
import { Calendar, Flag, Edit2, Trash2, ChevronDown, Circle, CheckCircle2, Clock } from 'lucide-react';

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

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
    onStatusChange: (taskId: number, newStatus: number) => void;
}

const STATUS_OPTIONS = [
    { value: 0, label: 'To Do', icon: Circle, color: 'text-gray-400' },
    { value: 1, label: 'In Progress', icon: Clock, color: 'text-blue-500' },
    { value: 2, label: 'Completed', icon: CheckCircle2, color: 'text-green-500' },
];

function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const priorityConfig: Record<string, { color: string; bg: string }> = {
        low: { color: 'text-gray-500', bg: 'bg-gray-100' },
        normal: { color: 'text-blue-600', bg: 'bg-blue-50' },
        high: { color: 'text-orange-600', bg: 'bg-orange-50' },
        critical: { color: 'text-red-600', bg: 'bg-red-50' },
    };

    const currentStatus = STATUS_OPTIONS.find(s => s.value === task.status) || STATUS_OPTIONS[0];
    const StatusIcon = currentStatus.icon;
    const priority = priorityConfig[task.priorityName] || priorityConfig.normal;

    const handleStatusSelect = (newStatus: number) => {
        if (newStatus !== task.status) {
            onStatusChange(task.id, newStatus);
        }
        setShowStatusDropdown(false);
    };

    const formatDate = (date: string) => {
        const d = new Date(date);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (d.toDateString() === today.toDateString()) return 'Today';
        if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 2;

    return (
        <div className="group bg-white rounded-lg border border-gray-200/80 px-4 py-3 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
            <div className="flex items-center gap-3">
                {/* Status Icon/Button */}
                <div className="relative">
                    <button
                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                        className={`p-0.5 rounded hover:bg-gray-100 transition-colors ${currentStatus.color}`}
                        title={currentStatus.label}
                    >
                        <StatusIcon className="w-5 h-5" />
                    </button>

                    {showStatusDropdown && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowStatusDropdown(false)}
                            />
                            <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px]">
                                {STATUS_OPTIONS.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => handleStatusSelect(option.value)}
                                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${task.status === option.value ? 'bg-gray-50' : ''
                                                }`}
                                        >
                                            <Icon className={`w-4 h-4 ${option.color}`} />
                                            <span className="text-gray-700">{option.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

                {/* Title & Description */}
                <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium truncate ${task.status === 2 ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-xs text-gray-500 truncate mt-0.5">{task.description}</p>
                    )}
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Due Date */}
                    {task.dueDate && (
                        <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${isOverdue ? 'bg-red-50 text-red-600' : 'text-gray-500'
                            }`}>
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(task.dueDate)}</span>
                        </div>
                    )}

                    {/* Priority */}
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${priority.bg} ${priority.color}`}>
                        <Flag className="w-3 h-3" />
                        <span className="capitalize">{task.priorityName}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(task)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(task)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(TaskCard);