import SedeUserItem from "@/components/dashboard/admin/sedes/sede/sede-user-item";
import Button from "@/components/ui/button";
import { db } from "@/lib/db";

export default async function UsersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const users = await db.usuario.findMany({
        where: {
            idSede: parseInt(id)
        },
        include: {
            rol: true
        }
    });

    return (
        <div className="flex flex-col gap-4">
            <header>
                <h1 className="text-xl font-bold">Usuarios</h1>
            </header>
            <main className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="
                            w-[350px] 
                            bg-black dark:bg-white 
                            text-white dark:text-black 
                            border border-gray-300 
                            p-2 rounded-xl
                        "
                    />
                    <Button className="flex items-center gap-2 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path fill="none" stroke="none" d="M0 0h24v24H0z" /><path d="M12 5v14m-7-7h14" /></svg>
                        Crear
                    </Button>
                </div>

                <hr />

                <div>
                    {users.map((user) => (
                        <SedeUserItem key={user.id} props={{ user }} />
                    ))}
                </div>
            </main>
        </div>
    );
}