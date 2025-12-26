'use client';

import React, { memo } from 'react';
import { Calendar, Edit2, Trash2, Archive, ArchiveRestore } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description?: string | null;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
    onArchiveToggle: (projectId: number, isArchived: boolean) => void;
}

function ProjectCard({ project, onEdit, onDelete, onArchiveToggle }: ProjectCardProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className={`group bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] p-4 hover:border-border hover:shadow-sm transition-all duration-200 ${project.isArchived ? 'opacity-60' : ''}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{project.title}</h3>
                    {project.isArchived && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-surface-secondary text-foreground-muted rounded">
                            Archived
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(project)}
                        className="p-1.5 text-foreground-muted hover:text-foreground hover:bg-surface-secondary rounded transition-colors"
                        title="Edit"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onArchiveToggle(project.id, !project.isArchived)}
                        className="p-1.5 text-foreground-muted hover:text-foreground hover:bg-surface-secondary rounded transition-colors"
                        title={project.isArchived ? 'Unarchive' : 'Archive'}
                    >
                        {project.isArchived ? (
                            <ArchiveRestore className="w-4 h-4" />
                        ) : (
                            <Archive className="w-4 h-4" />
                        )}
                    </button>
                    <button
                        onClick={() => onDelete(project)}
                        className="p-1.5 text-foreground-muted hover:text-error hover:bg-error-light rounded transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Description */}
            {project.description && (
                <p className="text-sm text-foreground-muted mb-4 line-clamp-2">
                    {project.description}
                </p>
            )}

            {/* Footer */}
            <div className="flex items-center gap-4 text-xs text-foreground-muted">
                <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Created {formatDate(project.createdAt)}</span>
                </div>
            </div>
        </div>
    );
}

export default memo(ProjectCard);
