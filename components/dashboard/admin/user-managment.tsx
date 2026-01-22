import { db } from "@/lib/db";
import UserListClient from "./user-list-client";

export default async function UserManagement() {
    const [roles, sedes, users] = await Promise.all([
        db.rol.findMany(),
        db.sede.findMany(),
        db.usuario.findMany({
            include: {
                rol: true,
                sede: true,
            },
        }),
    ]);

    return (
        <UserListClient users={users} roles={roles} sedes={sedes} />
    );
}