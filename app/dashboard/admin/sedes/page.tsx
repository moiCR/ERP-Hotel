import { db } from "@/lib/db";
import { SedeList } from "@/components/dashboard/admin/sedes/sede-list";

export default async function SedesPage() {
    const sedes = await db.sede.findMany();

    return (
        <div className="h-full w-full gap-4 flex flex-rowº">
            <SedeList sedes={sedes} />
            
        </div>
    );
}