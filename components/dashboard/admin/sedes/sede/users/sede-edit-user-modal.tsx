"use client";
import { motion } from "framer-motion";
import { Role, SedeEditUserModalProps } from "@/utils/interfaces";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal";
import { useState } from "react";

interface ExtendedEditModalProps extends SedeEditUserModalProps {
    roles: Role[];
    sessionUserId: number;
}

export default function SedeEditUserModal({ userProps, onClose, onSubmit, roles, sessionUserId }: ExtendedEditModalProps) {

    const isSelf = sessionUserId === Number(userProps.user.id);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSelf) return;
        console.log("The user update process has been initiated.");
        setIsSubmitting(true);
        try {
            await onSubmit(e);
            console.log("The user has been successfully updated.");
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setIsSubmitting(false);
            onClose();
        }
    };

    return (
        <>
            <Modal
                isOpen={true}
                onClose={onClose}
                layoutId={`edit-user-modal-${userProps.user.id}`}
            >
                <form onSubmit={handleSubmit}>
                    <ModalHeader title="Editar Usuario" onClose={onClose} />
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter 
                        onCancel={onClose} 
                        isLoading={isSubmitting} 
                        confirmText="Actualizar"
                        isDisabled={isSelf}
                    />
                </form>
            </Modal>
        </>
    );
}
