"use client";
import { createUser, deleteUser, updateUser } from "@/actions/user";
import SedeUserItem from "./sede-user-item";
import Button from "@/components/ui/button";
import { Usuario } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SedeEditUserModal from "./sede-edit-user-modal";
import SedeCreateUserModal from "./sede-create-user-modal";
import { AnimatePresence, motion } from "framer-motion";
import { Role, UserProps } from "@/utils/interfaces";
import { PlusIcon, UserIcon } from "@/utils/icons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal";
import SedeAddUserModal from "./sede-add-user-modal";

interface SedeUserContentProps {
    users: (Usuario & { rol?: { id: number; nombre: string } })[];
    usersNotInSede: (Usuario & { rol?: { id: number; nombre: string } })[];
    roles: Role[];
    idSede: number;
    sessionUserId: number;
}

export default function SedeUserContent({ users, usersNotInSede, roles, idSede, sessionUserId }: SedeUserContentProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingUser, setEditingUser] = useState<Usuario | null>(null);

    const [userToDelete, setUserToDelete] = useState<Usuario | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();

    async function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const roleId = formData.get("role") as string;
        if (!roleId) {
            console.error("Debes seleccionar un rol");
            return;
        }

        const userData = {
            name: formData.get("name") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            role: roleId,
            sede: idSede.toString()
        };

        const res = await createUser(userData);

        if (res.success) {
            console.log("The user has been successfully created.");
            router.refresh();
            setShowCreateModal(false);
        } else {
            console.error(res.error);
        }
    }

    async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const userData = {
            id: parseInt(formData.get("id") as string),
            name: formData.get("name") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            role: formData.get("role") as string,
        };

        const res = await updateUser(userData);
        if (res.success) {
            console.log("The user has been successfully updated.");
            router.refresh();
            setEditingUser(null);
            setShowEditModal(false);
        } else {
            console.error(res.error);
        }
    }

    function handleDeleteRequest(user: Usuario) {
        setUserToDelete(user);
    }

    async function confirmDelete() {
        if (!userToDelete) return;

        setIsDeleting(true);
        const res = await deleteUser(userToDelete.id);

        if (res.success) {
            console.log(`The user ${userToDelete.nombre} has been successfully deleted.`);
            router.refresh();
            setUserToDelete(null);
        } else {
            console.error(res.error);
        }
        setIsDeleting(false);
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <main className="flex flex-col gap-4 h-full w-full">

                <div className="flex flex-row justify-between items-center">
                    <section className="flex flex-row gap-2">
                        <UserIcon />
                        <h1 className="text-xl font-bold">Usuarios</h1>
                    </section>
                    <section className="flex flex-row gap-2">
                          <Button
                                className="flex flex-row gap-2 items-center text-xs"
                                onClick={() => setShowAddModal(true)}
                                layoutId={"add-user-modal"}
                            >
                                <PlusIcon />
                                Agregar Usuario
                            </Button>
                        <Button
                                className="flex flex-row gap-2 items-center text-xs"
                                onClick={() => setShowCreateModal(true)}
                                layoutId={"create-user-modal"}
                            >
                                <PlusIcon />
                                Crear Usuario
                            </Button>
                    </section>

                                    <AnimatePresence>
                <Modal
                    isOpen={!!userToDelete}
                    onClose={() => setUserToDelete(null)}
                    className="w-[400px]"
                >
                    <ModalHeader
                        title="Eliminar Usuario"
                        onClose={() => setUserToDelete(null)}
                    />
                    <ModalBody>
                        <p className="text-sm text-gray-600 dark:text-gray-300 w-fit">
                            ¿Estás seguro de que deseas eliminar al usuario <span className="font-bold text-black dark:text-white">{userToDelete?.nombre} {userToDelete?.apellidos}</span>?
                        </p>

                        <p className="text-sm text-gray-600 dark:text-gray-300 w-fit">
                            Esta acción no se puede deshacer.
                        </p>
                    </ModalBody>
                    <ModalFooter
                        onCancel={() => setUserToDelete(null)}
                        onConfirm={confirmDelete}
                        confirmText="Eliminar"
                        isDanger={true}
                        isLoading={isDeleting}
                        confirmButtonType="button"
                    />
                </Modal>
                </AnimatePresence>
                <AnimatePresence>
                    {showAddModal && (
                        <SedeAddUserModal
                            onClose={() => setShowAddModal(false)}
                            usersNotInSede={usersNotInSede}
                            id={idSede}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {showCreateModal && (
                        <SedeCreateUserModal
                            onClose={() => setShowCreateModal(false)}
                            onSubmit={handleCreateSubmit}
                            roles={roles}
                        />
                    )}
                </AnimatePresence>
                </div>
                <hr className="w-full h-px bg-gray-200 dark:bg-gray-700" />
                <div className="flex flex-col gap-4 relative">
                    {users.length <= 0 && (
                        <div className="flex flex-1 items-center justify-center py-20">
                            <p className="text-muted-foreground text-3xl">No hay usuarios</p>
                        </div>
                    )}
                    <AnimatePresence>
                        {showEditModal && (
                            <SedeEditUserModal
                                userProps={{ user: editingUser as unknown as UserProps['user'] }}
                                roles={roles}
                                sessionUserId={sessionUserId}
                                onClose={() => setShowEditModal(false)}
                                onSubmit={handleEditSubmit}
                            />
                        )}
                    </AnimatePresence>

                    {users.map((user) => (
                        <SedeUserItem
                            key={user.id}
                            props={{ user }}
                            onEdit={(u) => { setEditingUser(u); setShowEditModal(true) }}
                            onDelete={handleDeleteRequest}
                            isSelf={user.id === sessionUserId}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}