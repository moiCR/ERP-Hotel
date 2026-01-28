// app/dashboard/admin/sedes/[id]/page.tsx (o la ruta que estés usando)
import SedeMainContent from "@/components/dashboard/admin/sedes/sede/main/sede-main-content";
import { db } from "@/lib/db";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SedePage({ params }: PageProps) {
    const { id } = await params;
    const idSede = parseInt(id);

    if (isNaN(idSede)) {
        return <div>ID de sede inválido</div>;
    }

    const bitacoras = await db.bitacora.findMany({
        where: {
            usuario: {
                idSede: idSede
            }
        },
        include: {
            usuario: {
                include: {
                    rol: true
                }
            }
        },
        orderBy: {
            fechaIngreso: 'desc'
        }
    });

    return (
        <div className="h-full w-full">
            <SedeMainContent bitacoras={bitacoras}/>
        </div>
    );
}