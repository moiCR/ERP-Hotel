import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Prisma } from "@prisma/client";

type BitacoraConDetalles = Prisma.BitacoraGetPayload<{
  include: {
    usuario: {
      include: {
        rol: true
      }
    }
  }
}>;

export default function SedeLogBookContent({ bitacoras }: { bitacoras: BitacoraConDetalles[] }) {
    return (
        <div>
            <h1 className="mb-4 text-xl font-bold">Bitácora de accesos</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-zinc-600 dark:text-zinc-300">
                    <thead className="text-xs uppercase bg-black/5 dark:bg-white/5 rounded-lg">
                        <tr>
                            <th className="px-3 py-2 rounded-l-lg">Usuario</th>
                            <th className="px-3 py-2">Rol</th>
                            <th className="px-3 py-2 rounded-r-lg text-right">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bitacoras.map((log) => (
                            <tr key={log.id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                <td className="px-3 py-2 font-medium truncate max-w-[150px]">
                                    {log.usuario ? `${log.usuario.nombre} ${log.usuario.apellidos}` : "Usuario Eliminado"}
                                </td>
                                <td className="px-3 py-2">
                                    <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-xs">
                                        {log.usuario?.rol?.nombre || "N/A"}
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
        </div>
    );
}