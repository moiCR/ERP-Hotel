"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "tu_clave_secreta_super_segura");

export async function auth(email: string, password: string, remember: boolean) {
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