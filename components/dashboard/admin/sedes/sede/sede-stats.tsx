export default function SedeStats({totalHabitaciones, totalUsuarios}: {totalHabitaciones: number, totalUsuarios: number}) {
    return (
        <div className="flex flex-row gap-6 mb-6">
            <div>
                <div className="flex flex-col items-center justify-center h-auto p-4 w-[350px] bg-black/10 dark:bg-black/20 rounded-3xl">
                    <p className="text-xl font-medium">Usuarios</p>
                    <p className="text-[65px] font-bold">{totalUsuarios}</p>
                </div>  
            </div>
            <div className="flex flex-col items-center justify-center h-auto p-4 w-[350px] bg-black/10 dark:bg-black/20 rounded-3xl">
                <p className="text-xl font-medium ">Habitaciones</p>
                <p className="text-[65px] font-bold">{totalHabitaciones}</p>
            </div>
        </div>
    );
}