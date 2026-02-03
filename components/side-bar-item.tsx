"use client";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { SidebarContext } from "./side-bar";

export default function SideBarItem({ 
    name, 
    isActive, 
    href, 
    icon 
}: { 
    name: string, 
    isActive: boolean, 
    href: string, 
    icon?: ReactNode 
}) {
    const { isClosed } = useContext(SidebarContext);

    return (
        <div className="flex flex-col gap-2 justify-center w-full">
            <Link href={href} 
                title={isClosed ? name : ""}
                className={`flex flex-row items-center gap-3 w-full transition-all duration-300 
                    rounded-xl overflow-hidden
                    hover:bg-black hover:text-white
                    dark:hover:bg-white dark:hover:text-black hover:scale-90
                    ${isClosed ? 'justify-center p-2 h-12' : 'p-3 h-11'}
                    ${isActive 
                        ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-lg shadow-black/10' 
                        : 'text-zinc-500 dark:text-zinc-400 font-medium'}
                `}>
                
                {icon && (
                    <span className="shrink-0 flex items-center justify-center w-6 h-6">
                        {icon}
                    </span>
                )}
                
                {!isClosed && <span className="text-sm truncate animate-in fade-in duration-500">{name}</span>}
            </Link>
        </div>
    )
}