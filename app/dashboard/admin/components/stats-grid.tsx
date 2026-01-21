
import { db } from "@/lib/db";
import { BentoGrid, BentoItem } from "@/components/bento-grid";
import { Users, Building2, History } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export async function StatsGrid() {
    const [totalUsuarios, totalSedes, ultimasBitacoras] = await Promise.all([
        db.usuario.count(),
        db.sede.count(),
        db.bitacora.findMany({
            take: 7,
            orderBy: { fechaIngreso: 'desc' },
            include: {
                usuario: {
                    include: {
                        rol: true
                    }
                }
            }
        })
    ]);

    return (
        <BentoGrid className="lg:grid-cols-2 max-w-full mx-0 gap-6">

            {/* --- ITEM 1 --- */}
            <BentoItem
                title="Usuarios Totales"
                description="Usuarios registrados y activos"
                className="col-span-1 min-h-[200px] dark:bg-[#1F1F1F]"
                header={
                    <div className="flex flex-col items-center justify-center w-full h-full text-black  dark:text-white ">
                        <span className="text-7xl font-bold">{totalUsuarios}</span>
                    </div>
                }
                icon={<Users className="h-5 w-5 text-neutral-500" />}
            />

            {/* --- ITEM 2 --- */}
            <BentoItem
                title="Sedes Operativas"
                description="Total de sucursales registradas"
                className="col-span-1 min-h-[300px] dark:bg-[#1F1F1F]"
                header={
                    <div className="flex flex-col items-center justify-center w-full h-full text-zinc-800 dark:text-zinc-100">
                        <span className="text-7xl font-bold">{totalSedes}</span>
                    </div>
                }
                icon={<Building2 className="h-5 w-5 text-neutral-500" />}
            />

            <BentoItem
                title="Últimos Accesos"
                description="Registro de actividad reciente"
                icon={<History className="h-5 w-5 text-neutral-500" />}
                className="col-span-1 lg:col-span-2 h-[420px] dark:bg-[#1F1F1F] bg-white "
                header={
                    <div className="w-full h-full p-2 overflow-hidden">
                        <table className="w-full text-sm text-left text-zinc-600 dark:text-zinc-300 ">
                            <thead className="text-xs uppercase bg-black/5 dark:bg-white/5 rounded-lg">
                                <tr>
                                    <th className="px-3 py-2 rounded-l-lg">Usuario</th>
                                    <th className="px-3 py-2">Rol</th>
                                    <th className="px-3 py-2 rounded-r-lg text-right">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ultimasBitacoras.map((log) => (
                                    <tr key={log.id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                        <td className="px-3 py-2 font-medium truncate max-w-[150px]">
                                            {log.usuario.nombre + " " + log.usuario.apellidos}
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-xs">
                                                {log.usuario.rol?.nombre || "N/A"}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-right text-xs">
                                            {format(new Date(log.fechaIngreso), "dd MMM, HH:mm", { locale: es })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            />

        </BentoGrid>
    )
}
