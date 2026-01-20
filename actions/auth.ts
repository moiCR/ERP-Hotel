"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";


export async function auth(email: string, password: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let targetPath = "/dashboard/";
    try {
        const usuario = await db.usuario.findUnique({
            where: { email: email },
            include: { rol: true }
        });

        if (!usuario || !bcrypt.compareSync(password, usuario.contrasena)) {
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

        if (usuario.rol.nombre === "Administrador") {
            targetPath += "admin";
        }
        
        return { 
            success: true, 
            message: "The process has been successfully completed.",
            user: {
                nombre: usuario.nombre,
                rol: usuario.rol.nombre
            },
            targetPath
        };


    } catch (error) {
        console.error("Error en el login:", error);
        return { success: false, message: "Error interno del servidor" };
    }

    
}