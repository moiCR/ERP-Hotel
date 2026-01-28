"use server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { PartialUser, User } from "@/utils/interfaces";
import { Prisma } from '@prisma/client';
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { sendActivationEmail } from "@/lib/email";
import crypto from "crypto";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

interface CreateUserProps {
    name: string;
    lastName: string;
    email: string;
    role: string | number;
    sede: string | number;
}

export async function createUser(user: CreateUserProps) {
    try {
        const existingUser = await db.usuario.findUnique({
            where: { email: user.email }
        });

        if (existingUser) {
            return { success: false, error: "El correo electrónico ya está registrado." };
        }

        const token = crypto.randomUUID();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 24);

        await db.usuario.create({
            data: {
                nombre: user.name,
                apellidos: user.lastName,
                email: user.email,
                activationToken: token,
                activationTokenExpiry: expiryDate,
                rol: {
                    connect: {
                        id: Number(user.role)
                    }
                },
                sede: {
                    connect: {
                        id: Number(user.sede)
                    }
                }
            }
        });

        const emailSent = await sendActivationEmail(
            user.email, 
            token, 
            `${user.name} ${user.lastName}`
        );

        if (!emailSent) {
            return { success: false, error: "Usuario creado, pero falló el envío del correo." };
        }

        return { success: true, data: "Usuario invitado exitosamente. Se ha enviado el correo." };

    } catch (err) {
        console.error("Error en createUser:", err);
        return { success: false, error: err };
    }
}


export async function updateUser(userData: PartialUser) {
    if (!userData.id) {
        return { success: false, error: "ID inválido" };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
        return { success: false, error: "No autorizado" };
    }

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        const sessionUserId = payload.id as number;

        if (sessionUserId === userData.id) {
            return { success: false, error: "No puedes editarte a ti mismo" };
        }

        const currentUser = await db.usuario.findUnique({
            where: { id: userData.id }
        });

        if (!currentUser) {
            return { success: false, error: "Usuario no encontrado" };
        }

        const dataToUpdate: Prisma.UsuarioUpdateInput = {};

        if (userData.name && userData.name !== currentUser.nombre) {
            dataToUpdate.nombre = userData.name;
        }


        if (userData.lastName && userData.lastName !== currentUser.apellidos) {
            dataToUpdate.apellidos = userData.lastName;
        }


        if (userData.email && userData.email !== currentUser.email) {
            dataToUpdate.email = userData.email;
        }

        if (userData.isActive !== undefined && userData.isActive !== currentUser.isActive) {
            dataToUpdate.isActive = userData.isActive;
            if (userData.isActive === true && currentUser.isActive === false) {
                dataToUpdate.intentosFallidos = 0;
            }
        }

        if (userData.role) {
            const newRoleId = Number(userData.role);
            if (!isNaN(newRoleId) && newRoleId !== currentUser.idRol) {
                dataToUpdate.rol = {
                    connect: { id: newRoleId }
                };
            }
        }

        if (userData.sede) {
            const newSedeId = Number(userData.sede);
            if (!isNaN(newSedeId) && newSedeId !== currentUser.idSede) {
                dataToUpdate.sede = {
                    connect: { id: newSedeId }
                };
            }
        }

        if (Object.keys(dataToUpdate).length > 0) {
            await db.usuario.update({
                where: { id: userData.id },
                data: dataToUpdate
            });
            return { success: true, data: "Usuario actualizado exitosamente" };
        } else {
            return { success: true, data: "No hay cambios para actualizar" };
        }

    } catch (err) {
        console.error("Error al actualizar el usuario:", err);
        return { success: false, error: "Error al actualizar el usuario" };
    }
}


export async function deleteUser(id : number) {
    if (!id) {
        return { success: false, error: "ID inválido" };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
        return { success: false, error: "No autorizado" };
    }

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        const sessionUserId = payload.id as number;

        if (sessionUserId === id) {
            return { success: false, error: "No puedes eliminarte a ti mismo" };
        }

        await db.usuario.delete({
            where: {
                id: id
            }
        });

        return { success: true, data: "Usuario eliminado exitosamente" };

    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        return { success: false, error: "Error al eliminar el usuario" };
    }
}


export async function activateAccount(token: string, password: string) {
    try {
        const usuario = await db.usuario.findUnique({
            where: { activationToken: token }
        });

        if (!usuario) {
            return { success: false, message: "Token inválido o usuario no encontrado." };
        }

        if (usuario.activationTokenExpiry && new Date() > usuario.activationTokenExpiry) {
            return { success: false, message: "El enlace de activación ha expirado." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.usuario.update({
            where: { id: usuario.id },
            data: {
                contrasena: hashedPassword,
                isActive: true,
                activationToken: null,
                activationTokenExpiry: null,
            }
        });

        return { success: true, message: "Cuenta activada correctamente." };

    } catch (error) {
        console.error("Error activando cuenta:", error);
        return { success: false, message: "Error interno del servidor." };
    }
}