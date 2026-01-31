import SedeEditContent from "@/components/dashboard/admin/sedes/sede/sede-edit-content";
import { db } from "@/lib/db";

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

    if (!sede) {
        return <div>Sede no encontrada</div>;
    }


    return (
        <div className="h-full w-full">
            <SedeEditContent {...sede} />
        </div>
    );
}