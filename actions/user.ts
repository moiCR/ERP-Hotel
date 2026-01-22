"use server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

interface User {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    sede: string;
}

export async function createUser(user: User) {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    try {
        await db.usuario.create({
            data: {
                nombre: user.name,
                apellidos: user.lastName,
                email: user.email,
                contrasena: hashedPassword,
                rol: {
                    connect: {
                        id: parseInt(user.role)
                    }
                },
                sede: {
                    connect: {
                        id: parseInt(user.sede)
                    }
                }
            }
        })

        return { success: true, data: "Usuario creado exitosamente" }
    } catch {
        return { success: false, error: "Error al crear el usuario" }
    }
}