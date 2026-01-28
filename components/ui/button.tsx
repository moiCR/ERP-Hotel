"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    layoutId?: string;
}

export default function Button({ children, layoutId, className, ...props }: ButtonProps) {
    return (
        <div className="relative inline-block">
            {layoutId && (
                <motion.div
                    layoutId={layoutId}
                    className="absolute inset-0 z-0 dark:bg-white/20 bg-black/30 rounded-xl"
                />
            )}

            <button 
                className={cn(
                    "relative z-10 font-bold text-white dark:text-black bg-black dark:bg-white px-4 py-2 rounded-xl transition-transform hover:scale-105 active:scale-95", 
                    className
                )} 
                {...props}
            >
                {children}
            </button>
        </div>
    )
}