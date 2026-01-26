"use client";
import { motion } from "framer-motion";
import { SedeCreateUserModalProps } from "@/utils/interfaces";

export default function SedeCreateUserModal({ onClose, onSubmit, roles }: SedeCreateUserModalProps) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-40"
            />

            <motion.div
                layoutId="create-user-modal"
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl w-[400px] z-50 overflow-hidden"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={onSubmit} 
                    className="flex flex-col gap-4"
                >
                    <h2 className="text-xl font-bold dark:text-white">Crear Usuario</h2>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium dark:text-gray-200">Nombre</label>
                        <input type="text" name="name" id="name" required className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="lastName" className="text-sm font-medium dark:text-gray-200">Apellidos</label>
                        <input type="text" name="lastName" id="lastName" required className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium dark:text-gray-200">Email</label>
                        <input type="email" name="email" id="email" required className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium dark:text-gray-200">Contraseña</label>
                        <input type="password" name="password" id="password" required className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="role" className="text-sm font-medium dark:text-gray-200">Rol</label>
                        <select name="role" id="role" required className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
                            <option value="">Seleccione un rol</option>
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
                            className="px-4 py-2 text-sm font-bold text-white bg-black rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            Crear
                        </button>
                    </div>
                </motion.form>
            </motion.div>
        </>
    );
}