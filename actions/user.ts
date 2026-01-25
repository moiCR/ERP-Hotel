"use server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { PartialUser, User } from "@/utils/interfaces";
import { Prisma } from '@prisma/client';
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

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

        if (userData.estado !== undefined && userData.estado !== currentUser.estado) {
            dataToUpdate.estado = userData.estado;
            if (userData.estado === true && currentUser.estado === false) {
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