"use client"

import { Sede } from "@prisma/client";
import { SedeItem } from "./sede-item";
import Button from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SedeCreateModal from "./sede-create-modal";
import { createSede } from "@/actions/sede";
import { useRouter } from "next/navigation";

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
                    {!showCreateModal && (
                        <motion.div layoutId="create-sede-modal">
                            <Button
                                className="flex flex-row gap-2 items-center"
                                onClick={() => setShowCreateModal(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                Crear Sede
                            </Button>
                        </motion.div>
                    )}

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
