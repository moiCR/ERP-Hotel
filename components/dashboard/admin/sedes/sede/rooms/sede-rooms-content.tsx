import Button from "@/components/ui/button";
import { PlusIcon } from "@/utils/icons";
import { Habitacion } from "@prisma/client";
import SedeRoomItem from "./sede-room-item";

interface SedeRoomsContentProps {
    rooms: (Habitacion & { categoria: { id: number; nombreCategoria: string } | null })[];
    idSede: number;
}


export default function SedeRoomsContent({ rooms, idSede }: SedeRoomsContentProps) {
    return (
        <div className="flex flex-col w-full h-full gap-4">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Habitaciones</h1>
                <Button className="flex items-center gap-2">
                    <PlusIcon />
                    Crear Habitación
                </Button>
            </header>

            <hr />
            <section className={rooms.length > 0 ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full h-full" : "flex flex-1 items-center justify-center py-20"}>
                {rooms.length <= 0 && (
                    <div className="flex flex-1 items-center justify-center py-20">
                        <p className="text-muted-foreground text-3xl">No hay habitaciones</p>
                    </div>
                )}

                {rooms.length > 0 && (
                    rooms.map((room) => (
                        <SedeRoomItem
                            key={room.id}
                            room={room}
                        />
                    ))
                )}
            </section>
        </div>
    );
}