"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  layoutId?: string;
  className?: string;
}

export function Modal({ isOpen, onClose, children, layoutId, className }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />

          <motion.div
            layoutId={layoutId}
            initial={{ scale: 0.9, opacity: 0, transition: { duration: 0.5 } }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.5 } }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 1
            }}
            className={cn(
              "fixed z-50 bg-white dark:bg-zinc-900 shadow-xl rounded-xl overflow-hidden",
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[400px] w-auto",
              className
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function ModalHeader({ title, onClose }: { title: string; onClose?: () => void }) {
  return (
    <div className="flex items-center justify-between px-6 pt-6 pb-2">
      <h2 className="text-xl font-bold dark:text-white">{title}</h2>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X size={20} />
        </button>
      )}
    </div>
  );
}

export function ModalBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-6 py-4 flex flex-col gap-4 w-auto", className)}>{children}</div>;
}

interface ModalFooterProps {
  onCancel: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  isLoading?: boolean;
  showConfirm?: boolean;
  confirmButtonType?: "button" | "submit" | "reset";
  isDanger?: boolean;
  isDisabled?: boolean;
}

export function ModalFooter({
  onCancel,
  onConfirm,
  cancelText = "Cancelar",
  confirmText = "Guardar",
  isLoading = false,
  showConfirm = true,
  confirmButtonType = "submit",
  isDanger = false,
  isDisabled = false,
}: ModalFooterProps) {
  return (
    <div className="flex justify-end gap-2 px-6 pb-6 pt-2">
      <Button
        onClick={onCancel}
        disabled={isLoading}
        type="button"
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-black/50 rounded-lg hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 disabled:opacity-50"
      >
        {cancelText}
      </Button>

      {showConfirm && (
        <Button
          type={confirmButtonType}
          onClick={onConfirm}
          disabled={isLoading || isDisabled}
          className={cn(
            "px-4 py-2 text-sm font-bold text-white rounded-lg flex items-center gap-2",
            isDanger
              ? "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
              : "bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {confirmText}
        </Button>
      )}
    </div>
  );
}