"use client";
import Button from "@/components/ui/button";
import { EditIcon, TrashIcon } from "@/utils/icons";
import { UserProps } from "@/utils/interfaces";
import { Usuario } from "@prisma/client";
import { motion } from "framer-motion";

export default function SedeUserItem({ props, onEdit, onDelete, isSelf }: { props: UserProps, onEdit: (user: Usuario) => void, onDelete: (user: Usuario) => void, isSelf: boolean }) {
    
    return (
        <div className="flex flex-row gap-2 p-5 w-full h-[150px] bg-white/80 dark:bg-black/30 rounded-3xl justify-between items-center shadow-sm">
            <section className="flex flex-col gap-2">
                <h1 className="text-xl font-bold items-center text-gray-800 dark:text-white">
                    {props.user.nombre} {props.user.apellidos} {isSelf && <span className="text-xs text-center font-semibold rounded-full w-fit">(Tú)</span>}
                </h1>
                <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex flex-row items-center gap-2">
                    <span>{props.user.email}</span>
                    {props.user.isActive && <span className="text-xs text-center font-semibold rounded-full w-fit text-green-500">(Activo)</span>} 
                    {!props.user.isActive && <span className="text-xs text-center font-semibold rounded-full w-fit text-red-500">(Inactivo)</span>}
                    {props.user.contrasena && <span className="text-xs text-center font-semibold rounded-full w-fit text-green-500">(Con contraseña)</span>}
                    {!props.user.contrasena && <span className="text-xs text-center font-semibold rounded-full w-fit text-red-500">(Sin contraseña)</span>}
                </h2>
                <h3 className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-lg w-fit">
                    {props.user.rol?.nombre || "N/A"}
                </h3>
            </section>

            <section className="flex flex-row gap-4">
                <Button
                    layoutId={`edit-user-modal-${props.user.id}`}
                    onClick={() => onEdit(props.user as unknown as Usuario)}
                    className="flex flex-row gap-2 cursor-pointer bg-transparent dark:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed text-blue-500 dark:text-blue-800 z-10 items-center"
                    
                >
                    <EditIcon />
                </Button>
                
                <Button
                    onClick={() => onDelete(props.user as unknown as Usuario)}
                    disabled={isSelf}
                    className="flex flex-row gap-2 bg-transparent dark:bg-transparent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-red-500 dark:text-red-800 z-10 items-center"
                >
                    <TrashIcon />
                </Button>
            </section>
        </div>
    );
}