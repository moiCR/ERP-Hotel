import { useRouter } from "next/navigation";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./ui/modal";
import { logout } from "@/actions/auth";
import { useState } from "react";

export default function LogoutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    router.push("/");
  };
  return (
    <Modal
      layoutId="logout-modal"
      isOpen={isOpen}
      onClose={onClose}
      className="absolute top-auto bottom-0 left-0 right-auto translate-x-0 translate-y-0"
    >
      <ModalHeader title="Cerrar Sesión" onClose={onClose} />
      <ModalBody>
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
      </ModalBody>
      <ModalFooter
        cancelText="Cancelar"
        confirmText="Cerrar Sesión"
        isLoading={loading}
        onCancel={onClose}
        onConfirm={handleLogout}
      />
    </Modal>
  );
}
