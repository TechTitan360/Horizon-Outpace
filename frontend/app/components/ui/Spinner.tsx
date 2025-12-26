'use client';

import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.ComponentProps<"svg"> {
    size?: "sm" | "md" | "lg";
}

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
    const sizeClasses = {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
    };

    return (
        <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn(sizeClasses[size], "animate-spin text-brand-600", className)}
            {...props}
        />
    );
}

// Full page spinner for suspense fallbacks
export function PageSpinner() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <Spinner size="lg" className="text-brand-600" />
        </div>
    );
}
