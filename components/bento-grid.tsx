import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 hover:scale-y-105 hover:scale-x-102 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-zinc-900 bg-white border border-transparent justify-between flex flex-col space-y-4 dark:border-zinc-800",
                className
            )}
        >
            <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-700/25 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {header}
                </div>
            </div>

            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};

export const BentoGridSkeleton = () => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 max-w-full mx-0">
            {/* Item 1 Skeleton */}
            <div className="col-span-1 min-h-[200px] h-full rounded-xl bg-gray-100 dark:bg-zinc-900 overflow-hidden animate-pulse border border-transparent dark:border-zinc-800 p-4 flex flex-col justify-between">
                <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-gray-200 dark:bg-zinc-800" />
                <div className="flex flex-col gap-2 mt-4">
                    <div className="h-4 w-8 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
                </div>
            </div>

            {/* Item 2 Skeleton */}
            <div className="col-span-1 min-h-[300px] h-full rounded-xl bg-gray-100 dark:bg-zinc-900 overflow-hidden animate-pulse border border-transparent dark:border-zinc-800 p-4 flex flex-col justify-between">
                <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-gray-200 dark:bg-zinc-800" />
                <div className="flex flex-col gap-2 mt-4">
                    <div className="h-4 w-8 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
                </div>
            </div>

            {/* Item 3 Skeleton */}
            <div className="col-span-1 lg:col-span-2 h-[420px] rounded-xl bg-gray-100 dark:bg-zinc-900 overflow-hidden animate-pulse border border-transparent dark:border-zinc-800 p-4 flex flex-col justify-between">
                <div className="flex flex-1 w-full h-full rounded-xl bg-gray-200 dark:bg-zinc-800" />
                <div className="flex flex-col gap-2 mt-4">
                    <div className="h-4 w-8 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
                </div>
            </div>
        </div>
    );
};