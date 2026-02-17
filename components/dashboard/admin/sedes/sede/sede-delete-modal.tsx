"use client";
import { deleteSede } from "@/actions/sede";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Sede } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SedeDeleteModalProps {
  onClose?: () => void;
  sedeToDelete?: Sede;
}

export default function SedeDeleteModal({
  onClose,
  sedeToDelete,
}: SedeDeleteModalProps) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete() {
    if (!sedeToDelete) {
      return;
    }

    setLoading(true);
    const result = await deleteSede(sedeToDelete);
    setLoading(false);
    if (result.success) {
      onClose?.();
      router.push("/dashboard/admin/sedes");
    } else {
      setError(result.error ?? "Error al eliminar la sede");
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={() => onClose?.()}
      layoutId="delete-user-modal"
    >
      <ModalHeader title="Eliminar Sede" onClose={() => onClose?.()} />
      <ModalBody>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          ¿Estás seguro de que deseas eliminar la sede{" "}
          <span className="font-bold text-black dark:text-white">
            {sedeToDelete?.ciudad} {sedeToDelete?.direccion}
          </span>
          ?<br /> <br />
          Esta acción no se puede deshacer.
        </p>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </ModalBody>
      <ModalFooter
        onCancel={() => onClose?.()}
        onConfirm={handleDelete}
        confirmText="Eliminar"
        isDanger={true}
        isLoading={isLoading}
        confirmButtonType="button"
      />
    </Modal>
  );
}
