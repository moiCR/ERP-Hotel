

import { SedeCreateModalProps } from "@/utils/interfaces";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { useState } from "react";

export default function SedeCreateModal({ onClose, canCreateCentral, onSubmit }: SedeCreateModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(e);
            console.log("The user has been successfully created.");
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <Modal
                isOpen={true}
                onClose={() => onClose?.()}
                layoutId="create-sede-modal"
            >
                <ModalHeader
                    title="Crear Sede"
                    onClose={() => onClose?.()}
                />
                <ModalBody>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <section className="flex flex-col gap-2">
                            <label htmlFor="ciudad" className="text-sm font-medium dark:text-gray-200">Ciudad</label>
                            <input required type="text" name="ciudad" id="ciudad" className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                        </section>

                        <section className="flex flex-col gap-2">
                            <label htmlFor="direccion" className="text-sm font-medium dark:text-gray-200">Dirección</label>
                            <input required type="text" name="direccion" id="direccion" className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                        </section>

                        {canCreateCentral && (
                            <section className="flex flex-row items-center gap-2">
                                <input type="checkbox" name="central" id="central" className="w-4 h-4" />
                                <label htmlFor="central" className="text-sm font-medium dark:text-gray-200">¿Es central?</label>
                            </section>
                        )}

                        <ModalFooter
                            onCancel={() => onClose?.()}
                            confirmText="Agregar"
                            isLoading={isSubmitting}
                        />
                    </form>
                </ModalBody>

            </Modal>
        </>
    );
}
