'use client';

import React, { useState } from 'react';
import { X, Loader2, AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    taskTitle: string;
    loading?: boolean;
}

export default function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    taskTitle,
    loading = false,
}: DeleteConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md bg-[var(--card-bg)] rounded-xl shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-error-light rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-error" />
                            </div>
                            <h2 className="text-xl font-semibold text-foreground">Delete Task</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-foreground-muted hover:text-foreground rounded-lg hover:bg-surface-secondary transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <p className="text-foreground-muted">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-foreground">"{taskTitle}"</span>?
                        </p>
                        <p className="mt-2 text-sm text-foreground-muted/70">
                            This action cannot be undone.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border)]">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2.5 text-sm font-medium text-foreground bg-surface-secondary rounded-lg hover:bg-border transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-error rounded-lg hover:bg-error/90 transition-colors disabled:opacity-50"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Delete Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
