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
        <>
            <section>
                <SideBar header="Admin" >
                    <SideBarItem name="Inicio" isActive={pathname === "/dashboard/admin"} href="/dashboard/admin" />
                    <SideBarItem name="Roles" isActive={pathname === "/dashboard/admin/roles"} href="/dashboard/admin/roles" />
                    <SideBarItem name="Usuarios" isActive={pathname === "/dashboard/admin/users"} href="/dashboard/admin/users" />
                    <SideBarItem name="Habitaciones" isActive={pathname === "/dashboard/admin/rooms"} href="/dashboard/admin/rooms" />
                    <SideBarItem name="Reservas" isActive={pathname === "/dashboard/admin/reservations"} href="/dashboard/admin/reservations" />
                </SideBar>
            </section>
            
            <section>
                {children}
            </section>
        </>
    )
}
