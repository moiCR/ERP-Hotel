"use client";
import SideBar from "@/components/side-bar";
import SideBarItem from "@/components/side-bar-item";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <main className="flex flex-row w-full h-full">
            <section>
                <SideBar header="Admin" >
                    <SideBarItem name="Inicio" isActive={pathname === "/dashboard/admin"} href="/dashboard/admin" />
                    <SideBarItem name="Usuarios" isActive={pathname === "/dashboard/admin/users"} href="/dashboard/admin/users" />
                </SideBar>
            </section>

            <section className="w-full h-full p-8 z-0">
                {children}
            </section>
        </main>
    )
}
