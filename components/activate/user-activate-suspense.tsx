export default function UserActivateSuspense() {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <h1 className="text-2xl font-bold">
                Cargando...
            </h1>
            <span className="loading-dots"></span>
        </div>
    )
}