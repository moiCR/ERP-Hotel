"use server";
import { pool } from "@/actions/auth";

export async function auth(username: string, password: string){
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try{
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE username = ? AND password = ?",
            [username, password]
        );

        return {success: true, message: "Login exitoso!."}
    }catch(error){
        console.log(error);
        return {success: false, message: "La contraseña o el usuario no son correctos"}
    }
}