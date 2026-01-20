export default function SideBar({ header, children }: { header: string; children: React.ReactNode }) {
    return (
        <aside className="relative flex flex-col gap-2 h-screen w-42 bg-zinc-100 dark:bg-[#242424]">
            <div className="absolute inset-y-0 left-0 right-0 bg-zinc-100 dark:bg-[#242424] rounded-r-3xl -z-10" />

            <section className="mb-6 text-center w-full my-4">
                <h1 className="text-2xl font-semibold">ERP Hotel</h1>
                <span className="text-lg font-semibold">{header} Panel</span>
            </section>
            
            <nav className="flex flex-col gap-2 justify-center w-full">
                {children}
            </nav>
            
            <div className="absolute right-0 top-0 w-8 h-8 pointer-events-none translate-x-full">
                <div className="absolute inset-0 bg-zinc-100 dark:bg-[#242424]" />
                <div className="absolute inset-0 bg-zinc-50 dark:bg-[#1F1F1F] rounded-tl-3xl" />
            </div>

            <div className="absolute right-0 bottom-0 w-8 h-8 pointer-events-none translate-x-full">
                <div className="absolute inset-0 bg-zinc-100 dark:bg-[#242424]" />
                <div className="absolute inset-0 bg-zinc-50 dark:bg-[#1F1F1F] rounded-bl-3xl" />
            </div>
        </aside>
    )
}