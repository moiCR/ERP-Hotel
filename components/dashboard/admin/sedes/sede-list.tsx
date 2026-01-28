"use client"

import { Sede } from "@prisma/client";
import { SedeItem } from "./sede-item";
import Button from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SedeCreateModal from "./sede-create-modal";
import { createSede } from "@/actions/sede";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@/utils/icons";

interface SedeListProps {
    sedes: Sede[];
}

export function SedeList({ sedes }: SedeListProps) {
    const router = useRouter();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const canCreateCentral = !sedes.some(s => s.central);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const sedeProps = {
            sede: {
                ciudad: formData.get("ciudad") as string,
                direccion: formData.get("direccion") as string,
                central: formData.get("central") === "on",
            }
        };

        if (!sedeProps.sede.ciudad.trim() || !sedeProps.sede.direccion.trim()) {
            return;
        }

        const res = await createSede(sedeProps);
        if (res.success) {
            router.refresh();
            setShowCreateModal(false);
        } else {
            console.error(res.error);;
        }
    }

    return (
        <div className="flex flex-col gap-6 w-full h-full">
            <header className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-bold dark:text-white">Sedes</h1>
                <section className="flex flex-row gap-4 relative">
                    <Button
                        className="flex flex-row gap-2 items-center"
                        onClick={() => setShowCreateModal(true)}
                        layoutId="create-sede-modal"
                    >
                        <PlusIcon />
                        Crear Sede
                    </Button>

                    <AnimatePresence>
                        {showCreateModal && (
                            <SedeCreateModal
                                onClose={() => setShowCreateModal(false)}
                                canCreateCentral={canCreateCentral}
                                onSubmit={handleSubmit}
                            />
                        )}
                    </AnimatePresence>
                </section>
            </header>

            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between px-4 pb-2 border-b border-gray-200 dark:border-[#464646]">
                    <span className="text-sm font-medium text-gray-500">Nombre</span>
                </div>

                <div className="flex flex-col gap-2">
                    {sedes.map((sede) => (
                        <SedeItem key={sede.id} sede={sede} />
                    ))}
                </div>
            </div>

        </div>
    );
}
