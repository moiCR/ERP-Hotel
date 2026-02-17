import { db } from "@/lib/db";
import { SedeList } from "@/components/dashboard/admin/sedes/sede-list";
import { Suspense } from "react";

export default async function SedesPage() {
    const sedes = await db.sede.findMany();

    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <div className="h-full w-full gap-4 flex flex-row">
            <SedeList sedes={sedes} />
        </div>
      </Suspense>
    );
}