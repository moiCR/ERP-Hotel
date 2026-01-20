"use client"
import { useTheme } from "next-themes"
import { changeTheme } from "@/actions/theme";

export default function SideBar({ header, children }: { header: string; children: React.ReactNode }) {
    const { setTheme, resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const handleThemeChange = async (theme: "light" | "dark") => {
        await changeTheme(theme);
        setTheme(theme);
    };
    return (
        <aside className="relative flex flex-col gap-2 h-screen w-64 border-r-2 p-2
            bg-zinc-100 border-zinc-200
            dark:bg-[#121212] dark:border-[#444444] justify-between
            ">

            <div className="flex flex-col">

                <div className="absolute inset-y-0 left-0 right-0 rounded-r-3xl -z-10 border-r-2
                bg-zinc-100 border-zinc-200
                dark:bg-[#242424] dark:border-[#444444]"
                />

                <section className="mx-4 my-6 w-full">
                    <h1 className="text-3xl font-semibold">ERP Hotel</h1>
                    <span className="text-xl font-semibold">{header} Panel</span>
                </section>

                <hr className="mx-4 mb-4 border-zinc-200 dark:border-[#444444]" />

                <nav className="flex flex-col gap-4 justify-center w-full ">
                    {children}
                </nav>

                <div className="absolute right-0 top-0 w-8 h-8 pointer-events-none translate-x-full">
                    <div className="absolute inset-0 bg-zinc-100 dark:bg-[#121212]" />
                    <div className="absolute inset-0 rounded-tl-3xl border-l-2 
                    bg-zinc-50 border-zinc-200
                    dark:bg-[#121212] dark:border-[#444444] " />
                </div>

                <div className="absolute right-0 bottom-0 w-8 h-8 pointer-events-none translate-x-full">
                    <div className="absolute inset-0 bg-zinc-100 dark:bg-[#121212]" />
                    <div className="absolute inset-0 rounded-bl-3xl border-l-2
                    bg-zinc-50 border-zinc-200
                    dark:bg-[#121212] dark:border-[#444444]" />
                </div>

            </div>

            <footer className="my-6 w-full p-4 flex flex-row justify-between items-center">
                <button className="p-1 hover:scale-105 rounded-full hover:bg-black/10 text-black dark:text-white/80 dark:hover:bg-white/10 transition-all duration-300" onClick={() => handleThemeChange(isDark ? 'light' : 'dark')}>
                    <LogoutIcon />
                </button>

                <button className="p-1 hover:scale-105 rounded-full hover:bg-black/10 text-black dark:text-white/80 dark:hover:bg-white/10 transition-all duration-300" 
                    onClick={() => handleThemeChange(isDark ? 'light' : 'dark')}><ThemeIcon isDark={isDark}/>
                </button>
            </footer>
        </aside>
    )
}


function LogoutIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
    )
}

function ThemeIcon({ isDark }: { isDark: boolean }) {
    return (
        isDark ?
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" /></svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-sun"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" /><path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" /><path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" /><path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" /><path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" /><path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" /><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" /></svg>
    )
}
