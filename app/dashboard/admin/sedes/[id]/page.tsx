import SedeEditContent from "@/components/dashboard/admin/sedes/sede/sede-edit-content";
import SedeStats from "@/components/dashboard/admin/sedes/sede/sede-stats";
import { db } from "@/lib/db";
import { Suspense } from "react";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function SedePage({ params }: PageProps) {
    const { id } = await params;
    const idSede = parseInt(id);

    const sede = await db.sede.findUnique({
        where: {
            id: idSede
        },
    });

    const totalHabitaciones = await db.habitacion.count({
        where: {
            idSede: idSede
        }
    });

    const totalUsuarios = await db.usuario.count({
        where: {
            idSede: idSede
        }
    });

    if (!sede) {
        return <div>Sede no encontrada</div>;
    }


    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <SedeStats totalHabitaciones={totalHabitaciones} totalUsuarios={totalUsuarios} />
        <SedeEditContent {...sede} />
      </Suspense>
    );
}