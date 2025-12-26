export default function ProjectSkeleton() {
    return (
        <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] p-4 animate-pulse">
            <div className="flex items-start justify-between mb-3">
                <div className="h-5 bg-surface-secondary rounded w-3/4"></div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="h-3 bg-surface-secondary rounded w-full"></div>
                <div className="h-3 bg-surface-secondary rounded w-2/3"></div>
            </div>
            <div className="h-3 bg-surface-secondary rounded w-1/3"></div>
        </div>
    );
}
