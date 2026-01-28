import Link from "next/link";
import Button from "../ui/button";

export default function UserActivateNoCode() {
    return (
        <div className="flex flex-col w-full min-h-screen items-center justify-center gap-4 text-center">
            <h1 className="text-2xl font-bold">Enlace no válido</h1>
            <p className="text-lg opacity-80">El enlace de activación no es válido o ha expirado.</p>
            <Button>
                <Link href="/">
                    Volver al inicio
                </Link>
            </Button>
        </div>
    )
}