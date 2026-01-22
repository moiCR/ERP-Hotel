"use client"
import { PartialUser, UserProps } from "@/utils/interfaces";
import { updateUser, deleteUser } from "@/actions/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Rol, Sede } from "@prisma/client";

interface ModalProps {
    onClose: () => void;
    data: UserProps;
    roles: Rol[];
    sedes: Sede[];
}

export default function UserEditModal({ onClose, data, roles, sedes }: ModalProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const [name, setName] = useState(data.user.nombre);
    const [lastName, setLastName] = useState(data.user.apellidos);
    const [email, setEmail] = useState(data.user.email);
    const [password, setPassword] = useState("");
    const [isEnabled, setEnabled] = useState(data.user.estado as boolean);
    const [roleId, setRoleId] = useState<string | number>(data.user.rol?.id || "");
    const [sedeId, setSedeId] = useState<string | number>(data.user.sede?.id || "");

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        setIsPending(true);

        const partialUser: PartialUser = {
            id: Number(data.user.id),
            name: name,
            lastName: lastName,
            email: email,
            estado: isEnabled,
            role: roleId,
            sede: sedeId
        };

        try {
            const result = await updateUser(partialUser);

            if (result && !result.success) {
                alert(result.error || "Error al actualizar");
                setIsPending(false);
                return;
            }

            router.refresh();
            onClose();
        } catch (error) {
            console.error("Failed to update user", error);
            alert("Error al actualizar");
        } finally {
            setIsPending(false);
        }
    }

    async function handleDelete() {
        if (!window.confirm("¿Eliminar usuario permanentemente?")) return;
        setIsPending(true);
        try {
            const result = await deleteUser(Number(data.user.id));

            if (result && !result.success) {
                alert(result.error || "Error al eliminar");
                setIsPending(false);
                return;
            }

            router.refresh();
            onClose();
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Error al eliminar");
        }
        finally { setIsPending(false); }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={onClose}>
            <div
                style={{ viewTransitionName: `user-edit-${data.user.id}` } as React.CSSProperties}
                className="relative w-full max-w-md border rounded-3xl p-6 bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646] shadow-xl animate-tilt"
                onClick={(e) => e.stopPropagation()}
            >

                <form onSubmit={handleUpdate} className="flex flex-col gap-4">

                    <header className="flex justify-between items-center mb-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-black/10 text-black dark:text-white/80 dark:hover:bg-white/10 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
                        </button>

                        <section className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isPending}
                                className="text-red-700 hover:bg-red-100 p-1 rounded-full transition-colors disabled:opacity-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                            </button>


                            <button
                                type="submit"
                                disabled={isPending}
                                className="text-green-600 hover:bg-green-100 p-1 rounded-full transition-colors disabled:opacity-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" /></svg>
                            </button>
                        </section>
                    </header>

                    {/* Inputs */}
                    <section className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-sm font-medium dark:text-gray-300">Nombre</label>
                        <input type="text" id="name" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required value={name} onChange={(e) => setName(e.target.value)} />
                    </section>

                    <section className="flex flex-col gap-1">
                        <label htmlFor="lastName" className="text-sm font-medium dark:text-gray-300">Apellido</label>
                        <input type="text" id="lastName" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </section>

                    <section className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium dark:text-gray-300">Correo electrónico</label>
                        <input type="email" id="email" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </section>

                    <section className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-medium dark:text-gray-300">Estado</label>
                        <select id="password" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" value={isEnabled ? "Activo" : "Inactivo"} onChange={(e) => setEnabled(e.target.value === "Activo")}>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </section>

                    <section className="flex flex-col gap-1">
                        <label htmlFor="role" className="text-sm font-medium dark:text-gray-300">Rol</label>
                        <select id="role" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required value={roleId} onChange={(e) => setRoleId(e.target.value)}>
                            <option value="" disabled>Seleccione un rol</option>
                            {roles.map((r) => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                        </select>
                    </section>

                    <section className="flex flex-col gap-1">
                        <label htmlFor="sede" className="text-sm font-medium dark:text-gray-300">Sede</label>
                        <select id="sede" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required value={sedeId} onChange={(e) => setSedeId(e.target.value)}>
                            <option value="" disabled>Seleccione una sede</option>
                            {sedes.map((s) => <option key={s.id} value={s.id}>{s.ciudad}{s.central ? ' (Central)' : ''}</option>)}
                        </select>
                    </section>

                </form>
            </div>
        </div>
    )
}