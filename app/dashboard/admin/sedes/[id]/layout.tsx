import SedeNavigation from "@/components/dashboard/admin/sedes/sede/sede-navigation";
import SedeHeader from "@/components/dashboard/admin/sedes/sede/sede-header";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function SedeLayout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
    const { id } = await params;

    const idInt = parseInt(id);

    if (isNaN(idInt)) {
        return notFound();
    }

    const sede = await db.sede.findUnique({
        where: {
            id: idInt
        }
    });

    if (!sede) {
        return notFound();
    }

    return (
        <div className="flex flex-col h-full w-full gap-8">
            <header className="flex flex-col gap-4">
                <SedeHeader />
                <SedeNavigation props={{ sede }} />
            </header>
            <main className="flex-1 w-full h-full p-4">
                {children}
            </main>
        </div>
    );
}
