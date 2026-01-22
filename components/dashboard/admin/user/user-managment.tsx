import { db } from "@/lib/db";
import UserListClient from "./user-list-client";
import { getSession } from "@/actions/auth";

export default async function UserManagement() {
    const session = await getSession();
    const currentUserId = session?.id as number | undefined;

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
        <UserListClient users={users} roles={roles} sedes={sedes} currentUserId={currentUserId} />
    );
}