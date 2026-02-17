"use client";

import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal";
import { Role } from "@/utils/interfaces";

interface SedeCreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    roles: Role[];
}

export default function SedeCreateUserModal({ isOpen, onClose, onSubmit, roles }: SedeCreateUserModalProps) {
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
        <Modal isOpen={isOpen} onClose={onClose} layoutId="create-user-modal">
            <form onSubmit={handleSubmit}>
                <ModalHeader title="Crear Usuario" onClose={onClose} />
                <ModalBody>
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
                        <label htmlFor="role" className="text-sm font-medium dark:text-gray-200">Rol</label>
                        <select name="role" id="role" required className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
                            <option value="">Seleccione un rol</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>{role.nombre}</option>
                            ))}
                        </select>
                    </section>
                </ModalBody>

                <ModalFooter 
                    onCancel={onClose} 
                    isLoading={isSubmitting} 
                    confirmText="Crear"
                />
            </form>
        </Modal>
    );
}