import SedeRoomsContent from "@/components/dashboard/admin/sedes/sede/rooms/sede-rooms-content";
import { db } from "@/lib/db";

export default async function SedeRoomsPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    const sedeId = parseInt(id);

    const rooms = await db.habitacion.findMany({
        where: { idSede: sedeId },
        orderBy: { piso: "asc" },
        include: {
            categoria: {
                select: {
                    id: true,
                    nombreCategoria: true // Asegúrate que este nombre sea el que usas en la interfaz
                }
            }
        }
    });

    if (!rooms) {
        console.error("Error: The requested rooms were not found.");
    }

    return (
        /* Corregido: rooms={rooms} en lugar de {{rooms}} */
        <SedeRoomsContent rooms={rooms} idSede={sedeId} />
    );
}