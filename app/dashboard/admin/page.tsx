
import { Suspense } from "react";
import { StatsGrid } from "./components/stats-grid";
import { BentoGridSkeleton } from "@/components/bento-grid";

export default function HomePage() {
    return (
        <div className="p-8 w-full h-full z-0">

            <div className="mb-6">
                <h1 className="text-3xl font-bold dark:text-white">Panel Administrativo</h1>
                <p className="text-zinc-500">Resumen de actividad del ERP</p>
            </div>

            <Suspense fallback={<BentoGridSkeleton />}>
                <StatsGrid />
            </Suspense>
        </div>
    )
}