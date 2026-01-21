import Link from "next/link";
import { ReactNode } from "react";

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
    return (
        <div className="flex flex-col gap-2 justify-center w-full">
            <Link href={href} 
                className={`flex flex-row items-center gap-2 w-full h-full hover:scale-105 transition-all duration-300 
                    rounded-xl
                    hover:bg-black hover:text-white
                    dark:hover:bg-white dark:hover:text-black
                    ${isActive ? 'bg-black text-white dark:bg-white dark:text-black p-4 h-10 text-lg font-bold' : 'text-sm font-bold p-3 h-9'}
                `}>
                
                {icon && (
                    <span className="flex items-center justify-center">
                        {icon}
                    </span>
                )}
                
                <span>{name}</span>
            </Link>
        </div>
    )
}