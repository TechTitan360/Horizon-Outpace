'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import TaskSkeleton from './components/TaskSkeleton';
import { Plus, CheckSquare, Search, Filter, LayoutList, LayoutGrid } from 'lucide-react';

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

type FilterStatus = 'all' | 'todo' | 'in_progress' | 'completed';

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deleteTask, setDeleteTask] = useState<Task | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Filter and search tasks
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus === 'all' || task.statusName === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [tasks, searchQuery, filterStatus]);

    // Count tasks by status
    const statusCounts = useMemo(() => ({
        all: tasks.length,
        todo: tasks.filter(t => t.statusName === 'todo').length,
        in_progress: tasks.filter(t => t.statusName === 'in_progress').length,
        completed: tasks.filter(t => t.statusName === 'completed').length,
    }), [tasks]);

    const fetchTasks = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Not authenticated');
                setLoading(false);
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/tasks`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();

            if (data.success) {
                setTasks(data.data);
            } else {
                setError(data.message || 'Failed to fetch tasks');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleNewTask = useCallback(() => {
        setEditingTask(null);
        setIsModalOpen(true);
    }, []);

    const handleEditTask = useCallback((task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    }, []);

    const handleDeleteClick = useCallback((task: Task) => {
        setDeleteTask(task);
    }, []);

    const handleDeleteConfirm = async () => {
        if (!deleteTask) return;

        setDeleteLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Not authenticated');
                setDeleteLoading(false);
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/tasks/${deleteTask.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();

            if (data.success) {
                setTasks(prev => prev.filter(t => t.id !== deleteTask.id));
                setDeleteTask(null);
            } else {
                setError(data.message || 'Failed to delete task');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleStatusChange = useCallback(async (taskId: number, newStatus: number) => {
        const statusNames = ['todo', 'in_progress', 'completed'];
        setTasks(prev => prev.map(t =>
            t.id === taskId
                ? { ...t, status: newStatus, statusName: statusNames[newStatus] || 'todo' }
                : t
        ));

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Not authenticated');
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();

            if (!data.success) {
                fetchTasks();
                setError(data.message || 'Failed to update task status');
            }
        } catch (err: any) {
            fetchTasks();
            setError(err.message);
        }
    }, [fetchTasks]);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        setEditingTask(null);
    }, []);

    const handleModalSuccess = useCallback(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleDeleteClose = useCallback(() => {
        setDeleteTask(null);
    }, []);

    const clearError = useCallback(() => {
        setError('');
    }, []);

    const tabs: { key: FilterStatus; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'todo', label: 'To Do' },
        { key: 'in_progress', label: 'In Progress' },
        { key: 'completed', label: 'Completed' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-foreground-muted text-sm">
                        {statusCounts.all} tasks · {statusCounts.completed} completed
                    </p>
                </div>
                <button
                    onClick={handleNewTask}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Task
                </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Status Tabs */}
                <div className="flex items-center bg-surface-secondary rounded-lg p-1 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilterStatus(tab.key)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${filterStatus === tab.key
                                ? 'bg-[var(--card-bg)] text-foreground shadow-sm'
                                : 'text-foreground-muted hover:text-foreground'
                                }`}
                        >
                            {tab.label}
                            <span className={`ml-1.5 text-xs ${filterStatus === tab.key ? 'text-foreground-muted' : 'text-foreground-muted/60'}`}>
                                {statusCounts[tab.key]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64 flex-shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--card-bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="bg-error-light border border-error/20 rounded-lg px-4 py-3 text-error text-sm flex items-center justify-between">
                    <span>{error}</span>
                    <button onClick={clearError} className="text-error/70 hover:text-error p-1">
                        ✕
                    </button>
                </div>
            )}

            {/* Task List */}
            {loading ? (
                <div className="space-y-3">
                    <TaskSkeleton />
                    <TaskSkeleton />
                    <TaskSkeleton />
                </div>
            ) : filteredTasks.length === 0 ? (
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] p-12 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-surface-secondary rounded-full mb-4">
                        <CheckSquare className="w-6 h-6 text-foreground-muted" />
                    </div>
                    {tasks.length === 0 ? (
                        <>
                            <h3 className="text-base font-semibold text-foreground mb-1">No tasks yet</h3>
                            <p className="text-foreground-muted text-sm mb-6">Get started by creating your first task</p>
                            <button
                                onClick={handleNewTask}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Create Task
                            </button>
                        </>
                    ) : (
                        <>
                            <h3 className="text-base font-semibold text-foreground mb-1">No matching tasks</h3>
                            <p className="text-foreground-muted text-sm">Try adjusting your search or filter</p>
                        </>
                    )}
                </div>
            ) : (
                <div className="space-y-2">
                    {filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteClick}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            )}

            {/* Task Modal (Create/Edit) */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSuccess={handleModalSuccess}
                task={editingTask}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={!!deleteTask}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
                taskTitle={deleteTask?.title || ''}
                loading={deleteLoading}
            />
        </div>
    );
}
