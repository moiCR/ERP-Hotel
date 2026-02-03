import UserConfigHeader from "@/components/dashboard/user/configuration/user-config-header";


export default function ConfigurationPage() {
    return (
        <div className="flex flex-col p-4 gap-4 h-screen overflow-y-auto w-screen">
            <UserConfigHeader />
        </div>
    );
}