'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ProjectSkeleton from './components/ProjectSkeleton';
import { Plus, FolderKanban, Search } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description?: string | null;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
}

type FilterStatus = 'all' | 'active' | 'archived';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [deleteProject, setDeleteProject] = useState<Project | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Filter and search projects
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus === 'all' ||
                (filterStatus === 'active' && !project.isArchived) ||
                (filterStatus === 'archived' && project.isArchived);
            return matchesSearch && matchesStatus;
        });
    }, [projects, searchQuery, filterStatus]);

    // Count projects by status
    const statusCounts = useMemo(() => ({
        all: projects.length,
        active: projects.filter(p => !p.isArchived).length,
        archived: projects.filter(p => p.isArchived).length,
    }), [projects]);

    const fetchProjects = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Not authenticated');
                setLoading(false);
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/projects`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();

            if (data.success) {
                setProjects(data.data);
            } else {
                setError(data.error || 'Failed to fetch projects');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleNewProject = useCallback(() => {
        setEditingProject(null);
        setIsModalOpen(true);
    }, []);

    const handleEditProject = useCallback((project: Project) => {
        setEditingProject(project);
        setIsModalOpen(true);
    }, []);

    const handleDeleteClick = useCallback((project: Project) => {
        setDeleteProject(project);
    }, []);

    const handleDeleteConfirm = async () => {
        if (!deleteProject) return;

        setDeleteLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Not authenticated');
                setDeleteLoading(false);
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/projects/${deleteProject.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();

            if (data.success) {
                setProjects(prev => prev.filter(p => p.id !== deleteProject.id));
                setDeleteProject(null);
            } else {
                setError(data.error || 'Failed to delete project');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleArchiveToggle = useCallback(async (projectId: number, isArchived: boolean) => {
        // Optimistic update
        setProjects(prev => prev.map(p =>
            p.id === projectId ? { ...p, isArchived } : p
        ));

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Not authenticated');
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/projects/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isArchived })
            });

            const data = await response.json();

            if (!data.success) {
                fetchProjects();
                setError(data.error || 'Failed to update project');
            }
        } catch (err: any) {
            fetchProjects();
            setError(err.message);
        }
    }, [fetchProjects]);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        setEditingProject(null);
    }, []);

    const handleModalSuccess = useCallback(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleDeleteClose = useCallback(() => {
        setDeleteProject(null);
    }, []);

    const clearError = useCallback(() => {
        setError('');
    }, []);

    const tabs: { key: FilterStatus; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'active', label: 'Active' },
        { key: 'archived', label: 'Archived' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-foreground-muted text-sm">
                        {statusCounts.all} projects · {statusCounts.active} active
                    </p>
                </div>
                <button
                    onClick={handleNewProject}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Project
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
                        placeholder="Search projects..."
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

            {/* Projects List */}
            {loading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <ProjectSkeleton key={i} />
                    ))}
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <FolderKanban className="w-8 h-8 text-foreground-muted" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                        {searchQuery || filterStatus !== 'all'
                            ? 'No projects found'
                            : 'No projects yet'}
                    </h3>
                    <p className="text-foreground-muted text-sm mb-6">
                        {searchQuery || filterStatus !== 'all'
                            ? 'Try adjusting your search or filter'
                            : 'Create your first project to get started'}
                    </p>
                    {!searchQuery && filterStatus === 'all' && (
                        <button
                            onClick={handleNewProject}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create Project
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteClick}
                            onArchiveToggle={handleArchiveToggle}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            <ProjectModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSuccess={handleModalSuccess}
                project={editingProject}
            />

            <DeleteConfirmModal
                isOpen={!!deleteProject}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
                loading={deleteLoading}
                title={deleteProject?.title || ''}
            />
        </div>
    );
}
