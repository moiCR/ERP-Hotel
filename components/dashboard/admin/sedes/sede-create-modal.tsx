

import { motion } from "framer-motion";
interface SedeCreateModalProps {
    onClose: () => void;
    canCreateCentral: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SedeCreateModal({ onClose, canCreateCentral, onSubmit }: SedeCreateModalProps) {
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
                layoutId="create-sede-modal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-0 right-0 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl w-[400px] z-50 origin-top-right"
            >
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold dark:text-white">Crear Sede</h2>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="ciudad" className="text-sm font-medium dark:text-gray-200">Ciudad</label>
                        <input type="text" name="ciudad" id="ciudad" className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="direccion" className="text-sm font-medium dark:text-gray-200">Dirección</label>
                        <input type="text" name="direccion" id="direccion" className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                    </section>

                    {canCreateCentral && (
                        <section className="flex flex-row items-center gap-2">
                            <input type="checkbox" name="central" id="central" className="w-4 h-4" />
                            <label htmlFor="central" className="text-sm font-medium dark:text-gray-200">¿Es central?</label>
                        </section>
                    )}

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
                            Guardar
                        </button>
                    </div>
                </form>
            </motion.div>
        </>
    );
}
