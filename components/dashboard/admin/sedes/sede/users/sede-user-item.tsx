"use client";
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
                <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {props.user.email}
                </h2>
                <h3 className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-lg w-fit">
                    {props.user.rol?.nombre || "N/A"}
                </h3>
            </section>

            <section className="flex flex-row gap-4">
                <motion.button
                    layoutId={`edit-user-modal-${props.user.id}`}
                    onClick={() => onEdit(props.user as unknown as Usuario)}
                    className="w-6 h-6 cursor-pointer text-blue-500 bg-transparent z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <EditIcon />
                </motion.button>
                
                <button
                    onClick={() => onDelete(props.user as unknown as Usuario)}
                    className="w-6 h-6 cursor-pointer transition-all duration-300 ease-in-out hover:scale-x-110 hover:scale-y-105 text-red-500"
                >
                    <TrashIcon />
                </button>
            </section>
        </div>
    );
}