
"use client";
import { TrashIcon } from "@/utils/icons";
import { SedeProps } from "@/utils/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SedeNavigation({ props }: { props: SedeProps }) {
    const pathName = usePathname();

    return (
        <div className="flex flex-col p-4 gap-6 w-full rounded-3xl h-[150px] text-black dark:text-white bg-black dark:bg-white">
            <header className="flex flex-col mt-2 justify-center">
                <h1 className="text-xl font-bold text-white dark:text-black">{props.sede.ciudad + " " + (props.sede.central ? "(Central)" : "") || "N/A"}</h1>
                <h2 className="text-xs font-semibold text-white dark:text-black/80">{props.sede.direccion || "N/A"}</h2>
            </header>
            <main className="flex flex-row justify-between h-full w-full">
                <nav className="flex flex-row gap-4 w-full h-full items-center">
                    <SedeNavigationItem
                        name="Inicio"
                        props={props}
                        href={`/dashboard/admin/sedes/${props.sede.id}`}
                        isActive={pathName === `/dashboard/admin/sedes/${props.sede.id}`}
                    />
                    <SedeNavigationItem
                        name="Usuarios"
                        props={props}
                        href={`/dashboard/admin/sedes/${props.sede.id}/users`}
                        isActive={pathName === `/dashboard/admin/sedes/${props.sede.id}/users`}
                    />

                    <SedeNavigationItem
                        name="Habitaciones"
                        props={props}
                        href={`/dashboard/admin/sedes/${props.sede.id}/rooms`}
                        isActive={pathName === `/dashboard/admin/sedes/${props.sede.id}/rooms`}
                    />
                </nav>
                <button className="
                    p-2 text-red-600 hover:scale-y-105 hover:scale-x-101 transition-all duration-300 
                    h-[30px] rounded-xl flex items-center justify-center
                ">
                    <TrashIcon />
                </button>
            </main>
        </div>
    );
}


function SedeNavigationItem({ props, isActive, name, href }: { props: SedeProps, isActive: boolean, name: string, href: string }) {

    return (
        <Link className={`
                text-xs font-semibold min-w-[25px] w-auto p-2 hover:scale-y-105 hover:scale-x-101 transition-all duration-300 h-[30px] 
                rounded-xl flex items-center justify-center
                ${isActive ? "text-black dark:text-white bg-white dark:bg-black p-4" : "text-white dark:text-black bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/80"}`}
            href={href}>

            {name}
        </Link>
    )
}
