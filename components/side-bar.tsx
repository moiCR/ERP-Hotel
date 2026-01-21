"use client"
import { logout } from "@/actions/auth";
import { useThemeTransition } from "@/hooks/theme-hook";
import { Switch } from "@/components/ui/switch"

export default function SideBar({ header, children }: { header: string; children: React.ReactNode }) {
    const { toggleTheme, isDark } = useThemeTransition();

    return (
        <aside className="relative flex flex-col gap-2 h-screen  border-r-2 p-2 w-56
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
                <button className="p-1 hover:scale-105 rounded-full hover:bg-black/10 text-black dark:text-white/80 dark:hover:bg-white/10 transition-all duration-300"
                    onClick={() => logout()}>
                    <LogoutIcon />
                </button>


                    <div className="flex flex-row justify-around items-center gap-2">
                        <MoonIcon />
                        <Switch
                            checked={isDark}
                            onClick={(e) => toggleTheme(e)}
                            className="bg-zinc-800 dark:bg-zinc-200"
                        />
                    </div>
            </footer>
        </aside>
    )
}


function LogoutIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
    )
}

function MoonIcon() {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-moon" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341-.82-.476-1.644-1.298-1.31a6.5 6.5 0 0 1-6.864-10.787l.077-.08c.551-.63.113-1.653-.758-1.653h-.266l-.068-.006z" /></svg>
        </>
    )
}

