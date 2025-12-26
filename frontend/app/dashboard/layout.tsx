'use client';

import React, { useState, useEffect } from 'react';
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
    LogOut,
    Search,
    ChevronLeft,
    Menu
} from 'lucide-react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PageTransition } from '../components/ui/PageTransition';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch { }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth');
    };

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
        { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
        { name: 'Teams', href: '/dashboard/teams', icon: Users },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ];

    const bottomNav = [
        { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    // Get current page title
    const currentPage = [...navigation, ...bottomNav].find(item => item.href === pathname);
    const pageTitle = currentPage?.name || 'Dashboard';

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-surface">
                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-30 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] transition-all duration-300 ease-in-out ${collapsed ? 'w-[68px]' : 'w-60'
                        }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Logo + Toggle */}
                        <div className="flex items-center h-14 px-4 border-b border-[var(--sidebar-border)]">
                            <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? 'justify-center w-full' : ''}`}>
                                <div className="w-8 h-8 rounded-lg bg-[var(--gradient-brand)] flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-sm">H</span>
                                </div>
                                {!collapsed && (
                                    <span className="font-semibold text-foreground whitespace-nowrap">Horizon</span>
                                )}
                            </div>
                        </div>

                        {/* Main Navigation */}
                        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${isActive
                                            ? 'bg-brand-50 text-brand-600'
                                            : 'text-foreground-muted hover:bg-surface-secondary hover:text-foreground'
                                            } ${collapsed ? 'justify-center' : ''}`}
                                        title={collapsed ? item.name : undefined}
                                    >
                                        <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-brand-600' : 'text-foreground-muted group-hover:text-foreground'}`} />
                                        {!collapsed && <span>{item.name}</span>}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Bottom Navigation */}
                        <div className="px-3 py-3 border-t border-[var(--sidebar-border)] space-y-1">
                            {bottomNav.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${isActive
                                            ? 'bg-brand-50 text-brand-600'
                                            : 'text-foreground-muted hover:bg-surface-secondary hover:text-foreground'
                                            } ${collapsed ? 'justify-center' : ''}`}
                                        title={collapsed ? item.name : undefined}
                                    >
                                        <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-brand-600' : 'text-foreground-muted group-hover:text-foreground'}`} />
                                        {!collapsed && <span>{item.name}</span>}
                                    </Link>
                                );
                            })}

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-foreground-muted rounded-lg hover:bg-surface-secondary hover:text-foreground transition-all duration-200 group ${collapsed ? 'justify-center' : ''}`}
                                title={collapsed ? 'Logout' : undefined}
                            >
                                <LogOut className="w-5 h-5 flex-shrink-0 text-foreground-muted group-hover:text-foreground" />
                                {!collapsed && <span>Logout</span>}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className={`transition-all duration-300 ease-in-out ${collapsed ? 'pl-[68px]' : 'pl-60'}`}>
                    {/* Top Navbar */}
                    <header className="sticky top-0 z-20 h-14 bg-white/80 backdrop-blur-sm border-b border-[var(--border)]">
                        <div className="flex items-center justify-between h-full px-6">
                            {/* Left: Toggle + Page Title */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setCollapsed(!collapsed)}
                                    className="p-1.5 text-foreground-muted hover:text-foreground hover:bg-surface-secondary rounded-lg transition-colors"
                                >
                                    {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                                </button>
                                <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
                            </div>

                            {/* Right: Search + User */}
                            <div className="flex items-center gap-3">
                                {/* Search */}
                                <div className="relative hidden sm:block">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-64 pl-9 pr-4 py-1.5 text-sm bg-surface-secondary border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                                    />
                                </div>

                                {/* Notifications */}
                                <button className="relative p-2 text-foreground-muted hover:text-foreground hover:bg-surface-secondary rounded-lg transition-colors">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
                                </button>

                                {/* User Avatar */}
                                <div className="flex items-center gap-3 pl-3 border-l border-[var(--border)]">
                                    <div className="w-8 h-8 rounded-full bg-[var(--gradient-brand)] flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                    {user?.name && (
                                        <span className="hidden md:block text-sm font-medium text-foreground">
                                            {user.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="p-6">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
