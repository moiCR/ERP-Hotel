"use client";

interface UserProps {
    user: {
        id: number | string;
        nombre: string;
        apellidos: string;
        email: string;
        rol?: { nombre: string }; 
        sede?: { ciudad: string };
    }
}

export default function UserItem({ user }: UserProps) {
    
    const handleView = () => {
        console.log(`Viewing user: ${user.id}`);
    };

    return (
        <div className="flex items-center animate-fade-in-down justify-between dark:bg-[#252525] bg-gray-200 p-4 rounded-2xl w-full border dark:border-[#1a1a1a] border-gray-300 shadow-sm shrink-0">

            <div className="flex flex-col gap-1 w-16">
                <span className="text-xs text-zinc-400 font-medium">ID</span>
                <span className="text-sm font-bold dark:text-gray-200 text-gray-700 truncate" title={String(user.id)}>
                    {user.id}
                </span>
            </div>

            <div className="flex flex-col gap-1 w-32">
                <span className="text-xs text-zinc-400 font-medium">NOMBRE</span>
                <span className="text-sm font-bold dark:text-gray-200 text-gray-700 truncate">{user.nombre}</span>
            </div>

            <div className="flex flex-col gap-1 w-32">
                <span className="text-xs text-zinc-400 font-medium">APELLIDOS</span>
                <span className="text-sm font-bold dark:text-gray-200 text-gray-700 truncate">{user.apellidos}</span>
            </div>

            <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs text-zinc-400 font-medium">EMAIL</span>
                <span className="text-sm font-bold dark:text-gray-200 text-gray-700 truncate">{user.email}</span>
            </div>

            <div className="flex flex-col gap-1 w-24">
                <span className="text-xs text-zinc-400 font-medium">SEDE</span>
                <span className="text-sm font-bold dark:text-gray-200 text-gray-700 truncate">
                    {user.sede?.ciudad || "N/A"}
                </span>
            </div>

            <div className="flex flex-col gap-1 w-24">
                <span className="text-xs text-zinc-400 font-medium">ROL</span>
                <span className="text-sm font-bold dark:text-gray-200 text-gray-700 truncate">
                    {user.rol?.nombre || "N/A"}
                </span>
            </div>

            <div>
                <button 
                    onClick={handleView}
                    className="flex items-center gap-2  dark:bg-[#252525] text-black dark:text-gray-200 hover:dark:bg-[#111] hover:bg-gray-100 cursor-pointer hover:dark:text-white text-xs font-semibold px-4 py-2 rounded-full  transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="icon icon-tabler icons-tabler-outline icon-tabler-edit" viewBox="0 0 24 24"><path fill="none" stroke="none" d="M0 0h24v24H0z"/><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/></svg>
                </button>
            </div>

        </div>
    );
}