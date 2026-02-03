import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { useState } from "react";

interface SedeCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    canCreateCentral: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SedeCreateModal({ isOpen, onClose, canCreateCentral, onSubmit }: SedeCreateModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(e);
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => onClose?.()}
                layoutId="create-sede-modal"
                className="absolute right-0 top-0 left-auto bottom-auto translate-x-0 translate-y-0 z-50"
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
