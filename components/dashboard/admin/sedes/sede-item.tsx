import { Sede } from "@prisma/client";
import Link from "next/link";

interface SedeItemProps {
    sede: Sede;
}

export function SedeItem({ sede }: SedeItemProps) {
    return (
        <div
            className="flex flex-row gap-2 p-4 w-full h-[80px] justify-between items-center rounded-xl bg-[#e5e7eb] animate-fade-in-right animate-duration-400 dark:bg-black/20 border-gray-300 dark:border-[#464646]"
        >
            <section className="flex flex-col gap-1">
                <span className="font-bold text-black dark:text-white text-lg">{sede.ciudad} {sede.central ? '(Central)' : ''}</span>
            </section>

            <Link
                href={`/dashboard/admin/sedes/${sede.id}`}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-10 10" /><path d="M8 7l9 0l0 9" /></svg>
                Administrar
            </Link>
        </div>
    );
}
