import { Spinner } from '../components/ui/Spinner';

export default function DashboardLoading() {
    return (
        <div className="space-y-6 max-w-7xl animate-pulse">
            {/* Header skeleton */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="h-7 w-48 bg-gray-200 rounded-lg" />
                    <div className="h-4 w-64 bg-gray-100 rounded mt-2" />
                </div>
                <div className="h-10 w-28 bg-gray-200 rounded-lg" />
            </div>

            {/* Stats grid skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200/80 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-3 w-16 bg-gray-200 rounded" />
                                <div className="h-6 w-10 bg-gray-200 rounded mt-2" />
                            </div>
                            <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Content skeleton */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200/80 p-6 h-52" />
                    <div className="bg-white rounded-xl border border-gray-200/80 p-6 h-40" />
                </div>
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 p-6 h-72" />
            </div>
        </div>
    );
}
