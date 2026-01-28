import Button from "@/components/ui/button";
import { RoomIcon } from "@/utils/icons";
import { Habitacion } from "@prisma/client";

export default function SedeRoomItem({ room }: { room: Habitacion & { categoria: { nombreCategoria: string } | null } }) {
    return (
        <div className="flex flex-col gap-20 bg-white/50 dark:bg-black/25 p-4 justify-between w-[300px] rounded-xl border border-gray-200 dark:border-black/50 hover:scale-x-105 transition-all cursor-pointer">
            <section className="flex flex-col gap-2">
                <RoomIcon/>
                <h1 className="text-xl font-bold">Habitación #{room.id}</h1>
                <h2 className="text-lg font-semibold">Piso #{room.piso}</h2>

                <section className="flex flex-row gap-2">
                    <CategoryItem nombreCategoria={room.categoria?.nombreCategoria} />
                    <StateItem estado={room.estado} />
                </section>
            </section>
            <section className="flex flex-row gap-4 self-end">
                <Button>Eliminar</Button>
            </section>
        </div>
    );
}


function CategoryItem({ nombreCategoria }: { nombreCategoria?: string }) {
    /*
     Estandar = blue
     Deluxe = red
     Suite = gold
    */
    const color = nombreCategoria === "Estandar" ? "blue" : nombreCategoria === "Suite" ? "amber" : "red";

    return (
        <div className={`flex flex-row w-fit rounded-3xl bg-${color}-600 p-2 text-white border border-${color}-700 `}>
            <span className="font-bold text-[8px]">{nombreCategoria}</span>
        </div>
    )
}

function StateItem({ estado }: { estado: string }) {
    const color = estado === "Desocupado" ? "green" : estado === "Reservado" ? "amber" : "red";
    
    return (
        <div className={`flex flex-row w-fit rounded-3xl bg-${color}-600 p-2 text-white border border-${color}-700 `}>
            <span className="font-bold text-[8px]">{estado}</span>
        </div>
    )
}