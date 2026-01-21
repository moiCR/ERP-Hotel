
import { db } from "@/lib/db";
import UserItem from "./user/user-item";

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

    const handleSearch = () => {

    }

    const handleReload = () => {
        window.location.reload();
    }

    return (
        <div className="flex flex-col gap-4">
            <header className="flex items-center justify-between">
                <section className="flex items-center gap-2">
                    <input id="searchInput" type="text" className="w-[500px] p-2 border rounded-xl bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646]"
                        placeholder="Buscar usuario..."
                    />

                    <select id="searchInputRol" className="w-[200px] p-2 rounded-xl border bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646]" >
                        {roles.map((rol) => (
                            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                        ))}
                    </select>

                    <select id="searchInputSede" className="w-[200px] p-2 rounded-xl border bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646]" >
                        {sedes.map((sede) => (
                            <option key={sede.id} value={sede.id}>{sede.ciudad}</option>
                        ))}
                    </select>

                </section>
                <section>
                    <button id="reloadButton" className="p-2 mr-2 border rounded-xl bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646] hover:bg-gray-100 dark:hover:bg-[#202020] hover:scale-105 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-reload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" /><path d="M20 4v5h-5" /></svg>
                    </button>
                    <button id="reloadButton" className="p-2 mr-2 border rounded-xl bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646] hover:bg-gray-100 dark:hover:bg-[#202020] hover:scale-105 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    </button>
                </section>
            </header>
            <main>
                <div className="flex flex-col p-4 rounded-3xl gap-4 bg-gray-100 dark:bg-[#202020] h-[calc(100vh-220px)] overflow-y-auto">
                    {users.map((user) => (
                        <UserItem key={user.id} user={user} />
                    ))}
                </div>
            </main>
        </div>
    );
}