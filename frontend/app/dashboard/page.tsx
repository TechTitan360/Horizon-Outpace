'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
    CheckSquare,
    Clock,
    TrendingUp,
    AlertCircle,
    Plus,
    ArrowRight,
    Calendar,
    Target
} from 'lucide-react';

interface Task {
    id: number;
    title: string;
    status: number;
    statusName: string;
    priority: number;
    priorityName: string;
    dueDate?: string | null;
}

interface Stats {
    total: number;
    completed: number;
    inProgress: number;
    todo: number;
}

// Skeleton for stats
function StatSkeleton() {
    return (
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] p-5">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-3 w-16 bg-surface-secondary rounded animate-pulse" />
                    <div className="h-7 w-10 bg-surface-secondary rounded animate-pulse" />
                </div>
                <div className="w-10 h-10 bg-surface-secondary rounded-lg animate-pulse" />
            </div>
        </div>
    );
}

// Progress ring component
function ProgressRing({ progress, size = 120, strokeWidth = 10 }: { progress: number; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="var(--neutral-200)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-700 ease-out"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--brand-500)" />
                        <stop offset="100%" stopColor="var(--accent-500)" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">{progress}%</span>
                <span className="text-xs text-foreground-muted">Complete</span>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const [user, setUser] = useState<{ name?: string } | null>(null);
    const [statsData, setStatsData] = useState<Stats | null>(null);
    const [recentTasks, setRecentTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const stats = useMemo(() => [
        { name: 'Total Tasks', value: statsData?.total || 0, icon: CheckSquare, color: 'bg-info', lightColor: 'bg-info-light', textColor: 'text-info' },
        { name: 'In Progress', value: statsData?.inProgress || 0, icon: TrendingUp, color: 'bg-warning', lightColor: 'bg-warning-light', textColor: 'text-warning' },
        { name: 'To Do', value: statsData?.todo || 0, icon: Clock, color: 'bg-brand-500', lightColor: 'bg-brand-50', textColor: 'text-brand-600' },
        { name: 'Completed', value: statsData?.completed || 0, icon: Target, color: 'bg-success', lightColor: 'bg-success-light', textColor: 'text-success' },
    ], [statsData]);

    const completionRate = useMemo(() => {
        if (!statsData || statsData.total === 0) return 0;
        return Math.round((statsData.completed / statsData.total) * 100);
    }, [statsData]);

    const upcomingTasks = useMemo(() => {
        return recentTasks
            .filter(t => t.dueDate && t.status !== 2)
            .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
            .slice(0, 4);
    }, [recentTasks]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch { }
        }
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

            const [statsRes, tasksRes] = await Promise.all([
                fetch(`${apiUrl}/api/tasks/stats`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${apiUrl}/api/tasks`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            const [statsJson, tasksJson] = await Promise.all([statsRes.json(), tasksRes.json()]);

            if (statsJson.success) setStatsData(statsJson.data);
            if (tasksJson.success) setRecentTasks(tasksJson.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const formatDueDate = (date: string) => {
        const d = new Date(date);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (d.toDateString() === today.toDateString()) return 'Today';
        if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getPriorityColor = (priority: number) => {
        switch (priority) {
            case 2: return 'bg-error-light text-error';
            case 1: return 'bg-warning-light text-warning';
            default: return 'bg-surface-secondary text-foreground-muted';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {getGreeting()}{user?.name ? `, ${user.name}` : ''}
                    </h1>
                    <p className="mt-1 text-foreground-muted">
                        Here's what's happening with your tasks today.
                    </p>
                </div>
                <Link
                    href="/dashboard/tasks"
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Task
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? (
                    <>
                        <StatSkeleton />
                        <StatSkeleton />
                        <StatSkeleton />
                        <StatSkeleton />
                    </>
                ) : (
                    stats.map((stat) => (
                        <div
                            key={stat.name}
                            className="bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] p-5 hover:shadow-md hover:border-border transition-all duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-foreground-muted">{stat.name}</p>
                                    <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
                                </div>
                                <div className={`${stat.lightColor} p-2.5 rounded-lg`}>
                                    <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Progress + Quick Actions */}
                <div className="space-y-6">
                    {/* Progress Card */}
                    <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] p-6">
                        <h2 className="text-sm font-semibold text-foreground mb-4">Task Progress</h2>
                        {loading ? (
                            <div className="flex justify-center py-4">
                                <div className="w-[120px] h-[120px] bg-surface-secondary rounded-full animate-pulse" />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <ProgressRing progress={completionRate} />
                                <div className="flex gap-4 mt-4 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                                        <span className="text-foreground-muted">Done</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-surface-secondary" />
                                        <span className="text-foreground-muted">Remaining</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] p-6">
                        <h2 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <Link
                                href="/dashboard/tasks"
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-secondary transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-brand-50 rounded-lg">
                                        <CheckSquare className="w-4 h-4 text-brand-600" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">View all tasks</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-foreground transition-colors" />
                            </Link>
                            <Link
                                href="/dashboard/projects"
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-secondary transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-accent-50 rounded-lg">
                                        <Target className="w-4 h-4 text-accent-600" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">Manage projects</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-foreground transition-colors" />
                            </Link>
                            <Link
                                href="/dashboard/teams"
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-secondary transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-success-light rounded-lg">
                                        <TrendingUp className="w-4 h-4 text-success" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">Team overview</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-foreground transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="lg:col-span-2 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-foreground">Upcoming Deadlines</h2>
                        <Link href="/dashboard/tasks" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                            View all
                        </Link>
                    </div>

                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-surface-secondary animate-pulse">
                                    <div className="w-10 h-10 bg-border rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-3/4 bg-border rounded" />
                                        <div className="h-3 w-1/4 bg-border rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : upcomingTasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-3 bg-surface-secondary rounded-full mb-3">
                                <Calendar className="w-6 h-6 text-foreground-muted" />
                            </div>
                            <p className="text-foreground-muted text-sm">No upcoming deadlines</p>
                            <p className="text-foreground-muted/60 text-xs mt-1">Tasks with due dates will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {upcomingTasks.map((task) => {
                                const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
                                return (
                                    <div
                                        key={task.id}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
                                    >
                                        <div className={`p-2.5 rounded-lg ${isOverdue ? 'bg-error-light' : 'bg-surface-secondary'}`}>
                                            {isOverdue ? (
                                                <AlertCircle className="w-5 h-5 text-error" />
                                            ) : (
                                                <Calendar className="w-5 h-5 text-foreground-muted" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                                            <p className={`text-xs mt-0.5 ${isOverdue ? 'text-error' : 'text-foreground-muted'}`}>
                                                {isOverdue ? 'Overdue' : `Due ${formatDueDate(task.dueDate!)}`}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-md ${getPriorityColor(task.priority)}`}>
                                            {task.priorityName}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
