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
import { PlusIcon } from "@/utils/icons";

interface SedeUserContentProps {
    users: (Usuario & { rol?: { id: number; nombre: string } })[];
    roles: Role[];
    idSede: number;
    sessionUserId: number;
}

export default function SedeUserContent({ users, roles, idSede, sessionUserId }: SedeUserContentProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState<Usuario | null>(null);
    const router = useRouter();

    async function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const userData = {
            name: formData.get("name") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as string,
            sede: idSede.toString()
        };

        const res = await createUser(userData);
        if (res.success) {
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
            router.refresh();
            setEditingUser(null);
            setShowEditModal(false);
        } else {
            console.error(res.error);
        }
    }

    async function handleDelete(user: Usuario) {
        if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.nombre}?`)) {
            const res = await deleteUser(user.id);
            if (res.success) {
                router.refresh();
            } else {
                console.error(res.error);
            }
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <header className="flex flex-row justify-between items-center">
                <h1 className="text-xl font-bold">Usuarios</h1>
            </header>

            <main className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="
                            w-[350px] 
                            bg-black dark:bg-white 
                            text-white dark:text-black 
                            border border-gray-300 
                            p-2 rounded-xl
                        "
                    />

                    {!showCreateModal && !showEditModal && (
                        <motion.div layoutId="create-user-modal">
                            <Button
                                className="flex flex-row gap-2 items-center text-xs"
                                onClick={() => setShowCreateModal(true)}
                            >
                                <PlusIcon />
                                Crear Usuario
                            </Button>
                        </motion.div>
                    )}
                </div>

                <hr />

                <div className="flex flex-col gap-4 relative">
                    <AnimatePresence>
                        {showCreateModal && (
                            <SedeCreateUserModal
                                onClose={() => setShowCreateModal(false)}
                                onSubmit={handleCreateSubmit}
                                roles={roles}
                            />
                        )}
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
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}