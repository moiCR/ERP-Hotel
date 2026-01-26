"use client";
import { UserProps } from "@/utils/interfaces";

export default function SedeUserItem({ props }: { props: UserProps }) {
    
    const handleDelete = () => {
        console.log("The user deletion process has been initiated.");
    };

    const handleEdit = () => {
        console.log("The user edit process has been initiated.");
    };

    return (
        <div className="flex flex-row gap-2 p-5 w-full h-[150px] bg-white/80 dark:bg-black/30 rounded-3xl justify-between items-center shadow-sm">
            <section className="flex flex-col gap-2">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    {props.user.nombre} {props.user.apellidos}
                </h1>
                <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {props.user.email}
                </h2>
                <h3 className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-lg w-fit">
                    {props.user.rol?.nombre || "N/A"}
                </h3>
            </section>
            
            <section className="flex flex-row gap-4">
                <button 
                    onClick={handleEdit}
                    className="w-6 h-6 cursor-pointer transition-all duration-300 ease-in-out hover:scale-x-110 hover:scale-y-105 text-blue-500"
                >
                    <EditIcon/>
                </button>
                <button 
                    onClick={handleDelete}
                    className="w-6 h-6 cursor-pointer transition-all duration-300 ease-in-out hover:scale-x-110 hover:scale-y-105 text-red-500"
                >
                    <TrashIcon/>
                </button>
            </section>
        </div>
    );
}

function TrashIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="icon icon-tabler" viewBox="0 0 24 24">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 7h16" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
    );
}

function EditIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="icon icon-tabler" viewBox="0 0 24 24">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <path d="M16 5l3 3" />
        </svg>
    );
}