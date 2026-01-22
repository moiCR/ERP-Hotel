"use client";

import { useState } from "react";
import UserItem from "./user-item";
import { Usuario, Rol, Sede } from "@prisma/client";
import UserCreateModal from "./user-create-modal";
import UserEditModal from "./user-edit-modal";

interface UserWithRelations extends Usuario {
    rol: Rol;
    sede: Sede;
}

interface UserListClientProps {
    users: UserWithRelations[];
    roles: Rol[];
    sedes: Sede[];
    currentUserId?: number;
}

import { useRouter } from "next/navigation";

export default function UserListClient({ users, roles, sedes, currentUserId }: UserListClientProps) {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedSede, setSelectedSede] = useState("");
    const [showCreateModal, setCreateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserWithRelations | null>(null);

    const toggleModal = (setModal: React.Dispatch<React.SetStateAction<boolean>>, currentState: boolean) => {
        if (!document.startViewTransition) {
            setModal(!currentState);
            return;
        }

        document.startViewTransition(() => {
            import("react-dom").then(({ flushSync }) => {
                flushSync(() => {
                    setModal(!currentState);
                });
            });
        });
    };

    const handleEditUser = (user: UserWithRelations) => {
        if (!document.startViewTransition) {
            setSelectedUser(user);
            return;
        }

        document.startViewTransition(() => {
            import("react-dom").then(({ flushSync }) => {
                flushSync(() => {
                    setSelectedUser(user);
                });
            });
        });
    };

    const handleCloseEditModal = () => {
        if (!document.startViewTransition) {
            setSelectedUser(null);
            return;
        }

        document.startViewTransition(() => {
            import("react-dom").then(({ flushSync }) => {
                flushSync(() => {
                    setSelectedUser(null);
                });
            });
        });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value);
    };

    const handleSedeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSede(e.target.value);
    };

    const handleReload = () => {
        router.refresh();
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
            user.apellidos.toLowerCase().includes(searchText.toLowerCase()) ||
            user.rol.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
            user.sede.ciudad.toLowerCase().includes(searchText.toLowerCase());

        const matchesRole = selectedRole ? user.idRol === parseInt(selectedRole) : true;
        const matchesSede = selectedSede ? user.idSede === parseInt(selectedSede) : true;


        return matchesSearch && matchesRole && matchesSede;
    });

    return (
        <div className="flex flex-col gap-4">
            <header className="flex items-center justify-between">
                <section className="flex items-center gap-2">
                    <input
                        id="searchInput"
                        type="text"
                        className="w-[500px] p-2 border rounded-xl bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646]"
                        placeholder="Buscar usuario..."
                        value={searchText}
                        onChange={handleSearch}
                    />

                    <select
                        id="searchInputRol"
                        className="w-[200px] p-2 rounded-xl border bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646]"
                        value={selectedRole}
                        onChange={handleRoleChange}
                    >
                        <option value="">Todos</option>
                        {roles.map((rol) => (
                            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                        ))}
                    </select>

                    <select
                        id="searchInputSede"
                        className="w-[200px] p-2 rounded-xl border bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646]"
                        value={selectedSede}
                        onChange={handleSedeChange}
                    >
                        <option value="">Todos</option>
                        {sedes.map((sede) => (
                            <option key={sede.id} value={sede.id}>{sede.ciudad}</option>
                        ))}
                    </select>

                </section>
                <section>
                    <button
                        id="reloadButton"
                        onClick={handleReload}
                        className="p-2 mr-2 rounded-xl hover:rotate-360 bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646] hover:bg-gray-100 dark:hover:bg-[#202020] hover:scale-105 transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-reload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" /><path d="M20 4v5h-5" /></svg>
                    </button>
                    {!showCreateModal &&
                        <button onClick={() => toggleModal(setCreateModal, showCreateModal)} id="addButton"
                            style={{ viewTransitionName: 'user-expand' } as React.CSSProperties}
                            className="p-2 mr-2 border rounded-xl bg-gray-50 dark:bg-[#202020] border-gray-300 dark:border-[#464646] hover:bg-gray-100 dark:hover:bg-[#202020] hover:scale-105 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        </button>
                    }
                </section>
            </header>
            <main>
                <div className="flex flex-col p-4 rounded-3xl gap-4 bg-gray-100 dark:bg-[#202020] min-h-[calc(100vh-220px)] overflow-y-auto">
                    {filteredUsers.map((user) => (
                        <UserItem
                            key={user.id}
                            user={user}
                            onEdit={() => handleEditUser(user)}
                            isBeingEdited={selectedUser?.id === user.id}
                            isCurrentUser={currentUserId === user.id}
                        />
                    ))}
                </div>
            </main>
            <div className="absolute bottom-0 right-0">
                {showCreateModal && <UserCreateModal onClose={() => toggleModal(setCreateModal, showCreateModal)} roles={roles} sedes={sedes} />}
                {selectedUser && <UserEditModal onClose={handleCloseEditModal} data={{ user: selectedUser }} roles={roles} sedes={sedes} />}
            </div>
        </div>
    );
}
