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
        <div className="bg-white rounded-xl border border-gray-200/80 p-5">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-7 w-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
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
                    stroke="#f3f4f6"
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
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{progress}%</span>
                <span className="text-xs text-gray-500">Complete</span>
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
        { name: 'Total Tasks', value: statsData?.total || 0, icon: CheckSquare, color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-600' },
        { name: 'In Progress', value: statsData?.inProgress || 0, icon: TrendingUp, color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600' },
        { name: 'To Do', value: statsData?.todo || 0, icon: Clock, color: 'bg-purple-500', lightColor: 'bg-purple-50', textColor: 'text-purple-600' },
        { name: 'Completed', value: statsData?.completed || 0, icon: Target, color: 'bg-green-500', lightColor: 'bg-green-50', textColor: 'text-green-600' },
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
            case 2: return 'bg-red-100 text-red-700';
            case 1: return 'bg-amber-100 text-amber-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="space-y-6 max-w-7xl">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {getGreeting()}{user?.name ? `, ${user.name}` : ''}
                    </h1>
                    <p className="mt-1 text-gray-500">
                        Here's what's happening with your tasks today.
                    </p>
                </div>
                <Link
                    href="/dashboard/tasks"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
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
                            className="bg-white rounded-xl border border-gray-200/80 p-5 hover:shadow-md hover:border-gray-300/80 transition-all duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{stat.name}</p>
                                    <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
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
                    <div className="bg-white rounded-xl border border-gray-200/80 p-6">
                        <h2 className="text-sm font-semibold text-gray-900 mb-4">Task Progress</h2>
                        {loading ? (
                            <div className="flex justify-center py-4">
                                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full animate-pulse" />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <ProgressRing progress={completionRate} />
                                <div className="flex gap-4 mt-4 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                        <span className="text-gray-600">Done</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                                        <span className="text-gray-600">Remaining</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl border border-gray-200/80 p-6">
                        <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <Link
                                href="/dashboard/tasks"
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <CheckSquare className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">View all tasks</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </Link>
                            <Link
                                href="/dashboard/projects"
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <Target className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Manage projects</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </Link>
                            <Link
                                href="/dashboard/teams"
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Team overview</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-900">Upcoming Deadlines</h2>
                        <Link href="/dashboard/tasks" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View all
                        </Link>
                    </div>

                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 animate-pulse">
                                    <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                                        <div className="h-3 w-1/4 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : upcomingTasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-3 bg-gray-100 rounded-full mb-3">
                                <Calendar className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm">No upcoming deadlines</p>
                            <p className="text-gray-400 text-xs mt-1">Tasks with due dates will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {upcomingTasks.map((task) => {
                                const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
                                return (
                                    <div
                                        key={task.id}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className={`p-2.5 rounded-lg ${isOverdue ? 'bg-red-50' : 'bg-gray-100'}`}>
                                            {isOverdue ? (
                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                            ) : (
                                                <Calendar className="w-5 h-5 text-gray-500" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                                            <p className={`text-xs mt-0.5 ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
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
