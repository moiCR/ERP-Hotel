import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UserConfigHeader() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 flex flex-row items-center gap-2 w-full h-16 bg-white drop-shadow-lg dark:bg-black/20 dark:drop-shadow-lg">
            <Link href="/dashboard" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <ArrowLeft />
                <span className="ml-2 text-base font-medium">Panel de control</span>
            </Link>
        </div>
    );
}