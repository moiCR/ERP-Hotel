"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createRol(data: { nombre: string }) {
    try {
        if (!data.nombre || data.nombre.trim() === "") {
            return { success: false, message: "El nombre del rol es obligatorio." };
        }

        const rol = await db.rol.create({
            data: {
                nombre: data.nombre.trim()
            }
        });

        revalidatePath("/dashboard/admin/roles");
        return { success: true, message: "Rol creado exitosamente.", rol };
    } catch (error) {
        console.error("Error al crear rol:", error);
        return { success: false, message: "Error interno al crear el rol." };
    }
}
