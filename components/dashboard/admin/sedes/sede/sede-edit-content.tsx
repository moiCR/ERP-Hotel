"use client";
import { Sede } from "@prisma/client";
import { useState } from "react";

export default function SedeEditContent(sede: Sede) {
    const [ciudad, setCiudad] = useState(sede.ciudad);
    const [direccion, setDireccion] = useState(sede.direccion);
    const [central, setCentral] = useState(sede.central);
    return (
        <div className="flex flex-col gap-4 p-4">
            <h2 className="text-2xl font-bold">Editar Sede</h2>
            <hr />
            <form action="submit" className="flex flex-col gap-2">
                    <section className="flex flex-col gap-2">
                        <label htmlFor="ciudad" className="text-sm font-medium dark:text-gray-200">Ciudad</label>
                        <input type="text" name="ciudad" id="ciudad" required className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="direccion" className="text-sm font-medium dark:text-gray-200">Direccion</label>
                        <input type="text" name="direccion" id="direccion" required className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="central" className="text-sm font-medium dark:text-gray-200">Central</label>
                        <select name="central" className="p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" id="" value={central.toString()} onChange={(e) => setCentral(e.target.value === "true")}>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </section>
            </form>
        </div>
    );
}