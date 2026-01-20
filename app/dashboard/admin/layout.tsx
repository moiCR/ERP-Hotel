
import SideBar from "@/components/side-bar";
import SideBarItem from "@/components/side-bar-item";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <section>
                <SideBar header="Admin" >
                    <SideBarItem name="Inicio" isActive={false} href="/dashboard/admin" />
                </SideBar>
            </section>
            
            <section>
                {children}
            </section>
        </>
    )
}
