import Link from "next/link";

export default function SideBarItem({ name, isActive, href }: { name: string, isActive: boolean, href: string }) {
    return (
        <div className="flex flex-col gap-2 justify-center w-full">
            <Link href={href} 
                className={`flex flex-row items-center gap-2 w-full h-13 hover:scale-105 transition-all duration-300 
                    rounded-xl
                    hover:bg-black hover:text-white
                    dark:hover:bg-white dark:hover:text-black
                    ${isActive ? 'bg-black text-white dark:bg-white dark:text-black p-6 h-20 text-3xl font-bold' : 'text-xl font-bold p-4 h-13'}
                `}>
                <span>{name}</span>
            </Link>
        </div>
    )
}