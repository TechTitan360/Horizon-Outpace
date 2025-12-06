'use client';

import React, { useEffect, useState } from 'react';
import { CheckSquare, Users, FolderKanban, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState([
        { name: 'Total Tasks', value: '0', icon: CheckSquare, color: 'bg-blue-500' },
        { name: 'Active Teams', value: '0', icon: Users, color: 'bg-green-500' },
        { name: 'Projects', value: '0', icon: FolderKanban, color: 'bg-purple-500' },
        { name: 'Completed', value: '0', icon: TrendingUp, color: 'bg-orange-500' },
    ]);
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:8000/api/tasks/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();

            if (data.success) {
                const { total, completed, inProgress, todo } = data.data;
                setStats([
                    { name: 'Total Tasks', value: total.toString(), icon: CheckSquare, color: 'bg-blue-500' },
                    { name: 'In Progress', value: inProgress.toString(), icon: TrendingUp, color: 'bg-green-500' },
                    { name: 'To Do', value: todo.toString(), icon: FolderKanban, color: 'bg-purple-500' },
                    { name: 'Completed', value: completed.toString(), icon: Users, color: 'bg-orange-500' },
                ]);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back{user?.name ? `, ${user.name}` : ''}!
                </h1>
                <p className="mt-2 text-gray-600">
                    Here's what's happening with your projects today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="relative overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                {activities.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>No recent activity</p>
                        <p className="text-sm mt-2">Start creating tasks to see activity here</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
