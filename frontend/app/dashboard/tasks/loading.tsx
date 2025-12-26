export default function TasksLoading() {
    return (
        <div className="space-y-6 max-w-5xl animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-10 w-28 bg-gray-200 rounded-lg" />
            </div>

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="h-10 w-80 bg-gray-100 rounded-lg" />
                <div className="h-10 w-64 bg-gray-100 rounded-lg" />
            </div>

            {/* Task list */}
            <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-200/80 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0" />
                            <div className="flex-1 min-w-0 space-y-1.5">
                                <div className="h-4 w-48 bg-gray-200 rounded" />
                                <div className="h-3 w-32 bg-gray-100 rounded" />
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <div className="h-6 w-16 bg-gray-100 rounded" />
                                <div className="h-6 w-16 bg-gray-100 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
