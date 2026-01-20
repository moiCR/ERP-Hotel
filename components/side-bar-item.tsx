import Link from "next/link";

export default function SideBarItem({ name, isActive, href }: { name: string, isActive: boolean, href: string }) {
    return (
        <div className="flex flex-col gap-2 justify-center w-full">
            <Link href={href} 
                className="flex flex-row items-center gap-2 w-full h-13 transition-colors duration-300 rounded-md p-4 
                    hover:bg-gray-200 
                    dark:hover:bg-[#1F1F1F] 
            ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="icon icon-tabler icons-tabler-outline icon-tabler-home" viewBox="0 0 24 24"><path fill="none" stroke="none" d="M0 0h24v24H0z"/><path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"/></svg>
                <span className={`${isActive ? "text-lg font-bold" : "text-lg"} text-black dark:text-white font-semibold`}>{name}</span>
            </Link>
        </div>
    )
}