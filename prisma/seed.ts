import { db } from "../lib/db";
import * as bcrypt from "bcryptjs";

async function main() {
    const salt = await bcrypt.genSalt(10);
    const hashedAdminPassword = await bcrypt.hash("admin123", salt)

    const adminRole = await db.rol.upsert({
        where: { nombre: "Administrador" },
        update: {},
        create: { nombre: "Administrador" }
    })

    const sedeCentral = await db.sede.upsert({
        where: { id: 1 },
        update: {},
        create: { ciudad: "San José", direccion: "Residencial, Diag. 23A, San José, Robledal, 10107", central: true }
    })

    await db.usuario.upsert({
        where: { id: 1 },
        update: {},
        create: {
            nombre: "Admin",
            apellidos: "Sistema",
            estado: true,
            contrasena: hashedAdminPassword,
            idRol: adminRole.id,
            idSede: sedeCentral.id,
            email: "admin@admin.com",
        },
    });

    console.log("The process has been successfully completed.");
}

main()
    .then(async () => { await db.$disconnect(); })
    .catch(async (e) => { console.error(e); await db.$disconnect(); process.exit(1); });
