'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    CheckSquare,
    Users,
    FolderKanban,
    BarChart3,
    Settings,
    Bell,
    LogOut
} from 'lucide-react';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth');
    };

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
        { name: 'Teams', href: '/dashboard/teams', icon: Users },
        { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
        { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                {/* Sidebar */}
                <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
                    <div className="flex flex-col h-full">
                        {/* Logo */}
                        <div className="flex items-center h-16 px-6 border-b border-gray-200">
                            <h1 className="text-xl font-bold text-gray-900">Horizon Outpace</h1>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Logout */}
                        <div className="p-4 border-t border-gray-200">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="pl-64">
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
