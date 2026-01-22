"use client";

import { createUser } from "@/actions/user"
import { Rol, Sede } from "@prisma/client"
import { useState } from "react";

interface UserModalProps {
    onClose: () => void;
    roles: Rol[];
    sedes: Sede[];
}

import { useRouter } from "next/navigation";

export default function UserModal({ onClose, roles, sedes }: UserModalProps) {
    const router = useRouter();
    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        const name = document.getElementById('name') as HTMLInputElement;
        const lastName = document.getElementById('lastName') as HTMLInputElement;
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const role = document.getElementById('role') as HTMLSelectElement;
        const sede = document.getElementById('sede') as HTMLSelectElement;

        const user = {
            name: name.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            role: role.value,
            sede: sede.value
        }

        const result = await createUser(user)
        if (result.success) {
            onClose();
            router.refresh();
        } else {
            console.log(result.error)
        }
    }

    return (
        <div className="fixed inset-0 z-50 pointer-events-none" onClick={onClose}>
            <div
                id="userModal"
                className="absolute top-24 right-10 w-full max-w-md
                    border rounded-3xl p-6
                    bg-gray-50 dark:bg-[#202020]
                    border-gray-300 dark:border-[#464646]
                    shadow-xl pointer-events-auto
                    animate-tilt
                "
                style={{ viewTransitionName: 'user-expand' } as React.CSSProperties}
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold dark:text-gray-200 text-gray-800">Crear Usuario</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-black/10 text-black dark:text-white/80 dark:hover:bg-white/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                </header>

                <main>
                    <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
                        <section className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-sm font-medium dark:text-gray-300">Nombre</label>
                            <input type="text" id="name" name="name" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required />
                        </section>
                        <section className="flex flex-col gap-1">
                            <label htmlFor="lastName" className="text-sm font-medium dark:text-gray-300">Apellido</label>
                            <input type="text" id="lastName" name="lastName" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required />
                        </section>
                        <section className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium dark:text-gray-300">Correo electrónico</label>
                            <input type="email" id="email" name="email" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required />
                        </section>
                        <section className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm font-medium dark:text-gray-300">Contraseña</label>
                            <input type="password" id="password" name="password" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required />
                        </section>
                        <section className="flex flex-col gap-1">
                            <label htmlFor="role" className="text-sm font-medium dark:text-gray-300">Rol</label>
                            <select id="role" name="role" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.nombre}</option>
                                ))}
                            </select>
                        </section>
                        <section className="flex flex-col gap-1">
                            <label htmlFor="sede" className="text-sm font-medium dark:text-gray-300">Sede</label>
                            <select id="sede" name="sede" className="p-2 border rounded-lg bg-white dark:bg-[#333] border-gray-300 dark:border-[#555] dark:text-white" required>
                                {sedes.map((sede) => (
                                    <option key={sede.id} value={sede.id}>{sede.ciudad}{sede.central ? ' (Central)' : ''}</option>
                                ))}
                            </select>
                        </section>
                        <button type="submit" className="mt-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">Crear</button>
                    </form>
                </main>
            </div>
        </div>
    )
}