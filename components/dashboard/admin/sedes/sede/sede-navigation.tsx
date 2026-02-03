"use client";
import { TrashIcon } from "@/utils/icons";
import { SedeProps } from "@/utils/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SedeDeleteModal from "./sede-delete-modal";
import { BedIcon, UserIcon, HouseIcon, BookIcon } from "lucide-react";

export default function SedeNavigation({ props }: { props: SedeProps }) {
    const pathName = usePathname();
    const [isDeleting, setIsDeleting] = useState(false);
    
    return (
        <div className="flex flex-col p-4 gap-8 w-auto rounded-3xl min-h-[150px] min-w-[650px] h-auto text-black dark:text-white bg-black dark:bg-white">
            <header className="flex flex-col mt-2">
                <h1 className="text-xl font-bold text-white dark:text-black text-center">
                    {props.sede.ciudad + " " + (props.sede.central ? "(Central)" : "") || "N/A"}
                </h1>
                <h2 className="text-xs font-semibold text-white dark:text-black/80 text-center">
                    {props.sede.direccion || "N/A"}
                </h2>
            </header>

            <main className="grid grid-cols-3 items-center w-full">
                
                <div className="flex justify-start"></div>

                <nav className="flex flex-row gap-4 justify-center">
                    <SedeNavigationItem
                        icon={<HouseIcon size={18} />}
                        name="Inicio"
                        href={`/dashboard/admin/sedes/${props.sede.id}`}
                        isActive={pathName === `/dashboard/admin/sedes/${props.sede.id}`}
                    />
                    <SedeNavigationItem
                        icon={<UserIcon size={18} />}
                        name="Usuarios"
                        href={`/dashboard/admin/sedes/${props.sede.id}/users`}
                        isActive={pathName === `/dashboard/admin/sedes/${props.sede.id}/users`}
                    />
                    <SedeNavigationItem
                        icon={<BedIcon size={18} />}
                        name="Habitaciones"
                        href={`/dashboard/admin/sedes/${props.sede.id}/rooms`}
                        isActive={pathName === `/dashboard/admin/sedes/${props.sede.id}/rooms`}
                    />
                    <SedeNavigationItem
                        icon={<BookIcon size={18} />}
                        name="Bitácora"
                        href={`/dashboard/admin/sedes/${props.sede.id}/logbook`}
                        isActive={pathName === `/dashboard/admin/sedes/${props.sede.id}/logbook`}
                    />
                </nav>

                <div className="flex justify-end">
                    <button 
                        className="p-2 text-red-600 hover:scale-110 transition-all duration-300 h-[30px] rounded-xl flex items-center justify-center"
                        onClick={() => setIsDeleting(true)}
                    >
                        <TrashIcon />
                    </button>
                </div>

                {isDeleting && (
                    <SedeDeleteModal
                        onClose={() => setIsDeleting(false)}
                        sedeToDelete={props.sede}
                    />
                )}
            </main>
        </div>
    );
}

function SedeNavigationItem({isActive, name, href, icon }: { isActive: boolean, name?: string, href: string, icon?: React.ReactNode }) {
    return (
        <Link className={`
                text-xs font-semibold min-w-[25px] w-auto p-2 hover:scale-105 transition-all duration-300 h-[30px] 
                rounded-xl flex items-center justify-center gap-2 whitespace-nowrap
                ${isActive ? "text-black dark:text-white bg-white dark:bg-black p-4" : "text-white dark:text-black bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/80"}`}
            href={href}>
            {icon && icon}
            {name && name}
        </Link>
    )
}