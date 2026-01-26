"use client";
import { motion } from "framer-motion";
import { Role, SedeEditUserModalProps } from "@/utils/interfaces";

interface ExtendedEditModalProps extends SedeEditUserModalProps {
    roles: Role[];
    sessionUserId: number;
}

export default function SedeEditUserModal({ userProps, onClose, onSubmit, roles, sessionUserId }: ExtendedEditModalProps) {

    const isSelf = sessionUserId === Number(userProps.user.id);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (isSelf) return;
        console.log("The user update process has been initiated.");
        onSubmit(e);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
                layoutId="edit-user-modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="absolute bottom-0 right-0 mb-4 mr-4 bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl w-[400px] z-50 origin-bottom-right"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold dark:text-white">Editar Usuario</h2>

                    {isSelf && (
                        <p className="text-xs text-red-500 font-medium">No puedes editar tu propio perfil desde aquí.</p>
                    )}

                    <input type="hidden" name="id" value={userProps.user.id} />

                    <section className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium dark:text-gray-200">Nombre</label>
                        <input type="text" name="name" id="name" disabled={isSelf} className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white disabled:opacity-50" defaultValue={userProps.user.nombre} />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="lastName" className="text-sm font-medium dark:text-gray-200">Apellido</label>
                        <input type="text" name="lastName" id="lastName" disabled={isSelf} className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white disabled:opacity-50" defaultValue={userProps.user.apellidos} />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium dark:text-gray-200">Email</label>
                        <input type="email" name="email" id="email" disabled={isSelf} className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white disabled:opacity-50" defaultValue={userProps.user.email} />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="role" className="text-sm font-medium dark:text-gray-200">Rol</label>
                        <select name="role" id="role" disabled={isSelf} className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white disabled:opacity-50" defaultValue={userProps.user.rol?.id}>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>{role.nombre}</option>
                            ))}
                        </select>
                    </section>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSelf}
                            title={isSelf ? "No puedes editar tu propio perfil" : ""}
                            className="px-4 py-2 text-sm font-bold text-white bg-black rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:bg-gray-400 dark:disabled:bg-zinc-700 dark:disabled:text-gray-500"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </motion.div>
        </>
    );
}