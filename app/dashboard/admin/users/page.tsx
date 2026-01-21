import UserManagement from "@/components/dashboard/admin/user-managment";


export default function UsersPage() {
    return (
        <>
            <div className="mb-6">
                <h1 className="text-3xl font-bold dark:text-white">Panel Administrativo</h1>
                <p className="text-zinc-500">Gestion de usuarios</p>
            </div>
            <UserManagement />
        </>
    )
}