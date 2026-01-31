import SedeLogBookContent from "@/components/dashboard/admin/sedes/sede/bitacora/sede-bitacora";
import { db } from "@/lib/db";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function LogBookPage({ params }: PageProps) {
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
            <SedeLogBookContent bitacoras={bitacoras} />
        </div>
    );
}