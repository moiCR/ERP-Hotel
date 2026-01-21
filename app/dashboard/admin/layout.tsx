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
                    <SideBarItem name="Usuarios" isActive={pathname === "/dashboard/admin/users"} href="/dashboard/admin/users" />
                </SideBar>
            </section>
            
            <section>
                {children}
            </section>
        </>
    )
}
