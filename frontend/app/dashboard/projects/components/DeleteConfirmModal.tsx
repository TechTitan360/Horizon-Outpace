'use client';

import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    title: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, loading, title }: DeleteConfirmModalProps) {
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
                <div className="relative w-full max-w-md bg-[var(--card-bg)] rounded-xl shadow-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-error-light rounded-full">
                            <AlertTriangle className="w-6 h-6 text-error" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground">
                                Delete Project
                            </h3>
                            <p className="mt-2 text-sm text-foreground-muted">
                                Are you sure you want to delete <span className="font-medium text-foreground">"{title}"</span>? This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-error text-white text-sm font-medium rounded-lg hover:bg-error/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
