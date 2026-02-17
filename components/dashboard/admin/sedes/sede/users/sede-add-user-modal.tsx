import { updateUser } from "@/actions/user";
import Button from "@/components/ui/button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { Usuario } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SedeAddUserModalProps {
  isOpen: boolean;
  onClose?: () => void;
  usersNotInSede?: (Usuario & {
    rol?: { id: number; nombre: string };
    sede?: { id: number; ciudad: string };
  })[];
  id: number;
}

export default function SedeAddUserModal({
  isOpen,
  onClose,
  usersNotInSede,
  id,
}: SedeAddUserModalProps) {
  const [selectedUsers, setSelectedUsers] = useState<Usuario[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  async function handleConfirm() {
    selectedUsers.forEach(async (user) => {
      setIsLoading(true);
      try {
        const res = await updateUser({
          id: user.id,
          sede: id,
        });

        if (res.success) {
          console.log(`The user ${user.nombre} has been successfully updated.`);
          onClose?.();
        } else {
          console.error(res.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        router.refresh();
        setIsLoading(false);
        setSelectedUsers([]);
      }
    });
  }
  return (
    <Modal isOpen={isOpen} onClose={() => onClose?.()} layoutId="add-user-modal">
      <ModalHeader title="Agregar Usuario" onClose={() => onClose?.()} />
      <ModalBody>
        <p className="text-sm text-gray-600 dark:text-gray-300 w-fit">
          Agrega un nuevo usuario a la sede.
        </p>
        <div className="flex flex-col gap-2 bg-gray-200 dark:bg-black/10 w-[1200px] h-[500px] overflow-y-auto p-4 rounded-lg">
          {usersNotInSede && usersNotInSede.length > 0 ? (
            usersNotInSede.map((user) => (
              <SedeUserNotInSedeItem
                key={user.id}
                user={user}
                isSelected={selectedUsers.some(
                  (selectedUser) => selectedUser.id === user.id,
                )}
                onClick={() =>
                  setSelectedUsers((prev) => {
                    if (
                      prev.some((selectedUser) => selectedUser.id === user.id)
                    ) {
                      return prev.filter(
                        (selectedUser) => selectedUser.id !== user.id,
                      );
                    } else {
                      return [...prev, user];
                    }
                  })
                }
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">
                No hay usuarios disponibles para agregar
              </p>
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter
        onCancel={() => onClose?.()}
        onConfirm={() => handleConfirm()}
        confirmText="Agregar"
        isLoading={isLoading}
      />
    </Modal>
  );
}

interface SedeUserNotInSedeItemProps {
  user: Usuario & {
    rol?: { id: number; nombre: string };
    sede?: { id: number; ciudad: string };
  };
  isSelected?: boolean;
  onClick?: () => void;
}

function SedeUserNotInSedeItem({
  user,
  isSelected,
  onClick,
}: SedeUserNotInSedeItemProps) {
  return (
    <div
      className={cn(
        "flex flex-row gap-2 p-4 rounded-lg cursor-pointer transition-all",
        "bg-white dark:bg-black/60 border border-gray-300 dark:border-black",
        "hover:bg-gray-50 dark:hover:bg-black/20 hover:border-gray-400 dark:hover:border-black/20",
        isSelected &&
          "bg-green-50 dark:bg-green-600/10 border-green-500 dark:border-green-500",
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1 flex-1">
        <p
          className={cn(
            "text-sm font-medium",
            isSelected
              ? "text-green-700 dark:text-green-300"
              : "text-gray-900 dark:text-gray-100",
          )}
        >
          {user.nombre} {user.apellidos}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
        {user.rol && (
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Rol: {user.rol.nombre}
          </p>
        )}
        {user.sede && (
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Sede: {user.sede.ciudad}
          </p>
        )}

        {!user.sede && (
          <p className="text-xs text-gray-600 dark:text-gray-300">
            No tiene sede asignada
          </p>
        )}
      </div>
    </div>
  );
}
