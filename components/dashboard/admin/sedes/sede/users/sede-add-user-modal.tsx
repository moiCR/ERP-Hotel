import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Usuario } from "@prisma/client";

interface SedeAddUserModalProps {
    onClose?: () => void;
    usersNotInSede?: (Usuario & { rol?: { id: number; nombre: string } })[];
}

export default function SedeAddUserModal({ onClose, usersNotInSede }: SedeAddUserModalProps) {
    return (
        <Modal
            isOpen={true}
            onClose={() => onClose?.()}
            layoutId="add-user-modal"
        >
            <ModalHeader
                title="Agregar Usuario"
                onClose={() => onClose?.()}
            />
            <ModalBody>
                <p className="text-sm text-gray-600 dark:text-gray-300 w-fit">
                    Agrega un nuevo usuario a la sede.
                </p>
                <div className="flex flex-col gap-2 bg-gray-200 dark:bg-black/10 w-[1200px] h-[500px] overflow-y-auto">
                    {usersNotInSede?.map((user) => (
                        <SedeUserNotInSedeItem
                            key={user.id}
                            user={user}
                        />
                    ))}
                </div>
            </ModalBody>
            <ModalFooter
                onCancel={() => onClose?.()}
                onConfirm={() => onClose?.()}
                confirmText="Agregar"
                isLoading={false}
            />
        </Modal>
    );
}


function SedeUserNotInSedeItem({ user }: { user: Usuario & { rol?: { id: number; nombre: string } } }) {
    return (
        <div className="flex flex-row gap-2">
            <p className="text-sm text-gray-600 dark:text-gray-300 w-fit">
                {user.nombre} {user.apellidos}
            </p>
        </div>
    );
}