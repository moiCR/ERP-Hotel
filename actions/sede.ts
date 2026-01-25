"use server"

import { db } from "@/lib/db";
import { SedeProps } from "@/utils/interfaces";

export async function createSede(sedeProps: SedeProps) {
    const { ciudad, direccion, central } = sedeProps.sede;

    try {
        await db.sede.create({
            data: {
                ciudad,
                direccion,
                central
            }
        })

        return { success: true, data: "Sede creada exitosamente" };
    } catch {
        return { success: false, error: "Error al crear la sede" };
    }
}

