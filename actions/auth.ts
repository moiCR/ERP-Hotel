"use server";
import { db } from "@/lib/db";

export async function auth(user: string, password: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        const usuario = await db.usuario.findUnique({
            where: { email: user },
            include: { rol: true }
        });

        if (!usuario || usuario.contrasena !== password) {
            return { success: false, message: "La contraseña o el usuario no son correctos" };
        }
        if (!usuario.estado) {
            return { success: false, message: "Este usuario está inhabilitado" };
        }

        await db.bitacora.create({
            data: {
                idUsuario: usuario.id,
                fechaIngreso: new Date(),
            }
        });

        return { 
            success: true, 
            message: "The process has been successfully completed.",
            user: {
                nombre: usuario.nombre,
                rol: usuario.rol.nombre
            }
        };

    } catch (error) {
        console.error("Error en el login:", error);
        return { success: false, message: "Error interno del servidor" };
    }
}