"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";
import { th } from "date-fns/locale";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "tu_clave_secreta_super_segura");

export async function auth(email: string, password: string, remember: boolean) {
    let targetPath = "/dashboard/";
    try {
        const usuario = await db.usuario.findUnique({
            where: { email: email },
            include: { rol: true }
        });

        if (!usuario) {
            throw new Error("La contraseña o el usuario es incorrecto.");
        }
        
        if (!usuario.isActive) {
            throw new Error("Este usuario no está activo");
        }

        if (!usuario.contrasena) {
            throw new Error("Este usuario aun no está activo.");
        }

        if (!bcrypt.compareSync(password, usuario.contrasena)) {
            if (usuario.intentosFallidos >= 3) {
                await db.usuario.update({
                    where: { id: usuario.id },
                    data: {
                        isActive: false
                    }
                });
                throw new Error("Este usuario ha sido bloqueado por seguridad. Contacte a un administrador.");
            }

            await db.usuario.update({
                where: { id: usuario.id },
                data: {
                    intentosFallidos: usuario.intentosFallidos + 1
                }
            });
          
            throw new Error("La contraseña o el usuario es incorrecto.");
        }

        const expirationTime = remember ? "30d" : "2h";

        const token = await new SignJWT({
            id: usuario.id,
            rol: usuario.rol.nombre,
            sedeId: usuario.idSede
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime(expirationTime)
            .sign(SECRET_KEY);

        const cookieStore = await cookies();
        
        if (remember) {
            cookieStore.set("session", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });
        } else {
            cookieStore.set("session", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
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
            user: {
                nombre: usuario.nombre,
                rol: usuario.rol.nombre
            },
            targetPath
        };


    } catch (error) {
        console.error("Error en el login:", error);
        throw new Error("La contraseña o el usuario es incorrecto.");
    }
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = (await cookieStore).get("session")?.value;

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    redirect("/");
}


