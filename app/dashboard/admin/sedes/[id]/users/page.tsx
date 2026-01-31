import SedeUserContent from "@/components/dashboard/admin/sedes/sede/users/sede-user-content";
import { db } from "@/lib/db";
import { getSession } from "@/actions/auth";

export default async function UsersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getSession();

    const users = await db.usuario.findMany({
        where: {
            idSede: parseInt(id)
        },
        include: {
            rol: true,
        }
    });

    const usersNotInSede = await db.usuario.findMany({
        where: {
            OR: [
                { idSede: null },
                {
                    AND: [
                        { idSede: { not: null } },
                        { idSede: { not: parseInt(id) } }
                    ]
                }
            ]
        },
        include: {
            rol: true,
            sede: true,
        }
    });

    const roles = await db.rol.findMany();

    return (
        <SedeUserContent users={users} usersNotInSede={usersNotInSede} roles={roles} idSede={parseInt(id)} sessionUserId={session?.id as number} />
    );
}