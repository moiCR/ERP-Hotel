import SedeUserContent from "@/components/dashboard/admin/sedes/sede/sede-user-content";
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
            rol: true
        }
    });

    const roles = await db.rol.findMany();

    return (
        <SedeUserContent users={users} roles={roles} idSede={parseInt(id)} sessionUserId={session?.id as number} />
    );
}