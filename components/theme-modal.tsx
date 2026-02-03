import { cn } from "@/lib/utils";
import { Modal, ModalBody, ModalHeader } from "./ui/modal";
import { useThemeTransition } from "@/hooks/theme-hook";

interface ModalThemeProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function ModalTheme({ isOpen, onClose, className }: ModalThemeProps) {
  const { setTheme, isDark } = useThemeTransition();
  const handleThemeChange = (
    newTheme: "dark" | "light",
    e: React.MouseEvent,
  ) => {
    setTheme(newTheme, e);
    onClose();
  };

  return (
    <Modal layoutId="theme-modal" isOpen={isOpen} onClose={onClose} className={cn("", className)}>
      <ModalHeader title="Cambiar Tema" onClose={onClose}/>
      <ModalBody>
        <div className="flex flex-col gap-2">
          <ThemeItem
            type="Claro"
            isActive={!isDark}
            colors={["#ffffff", "#f4f4f5", "#e4e4e7", "#1F1F1F", "#000000"]}
            onClick={(e) => handleThemeChange("light", e)}
          />
          <ThemeItem
            type="Oscuro"
            isActive={isDark}
            colors={["#121212", "#242424", "#444444", "#E0E0E0", "#ffffff"]}
            onClick={(e) => handleThemeChange("dark", e)}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}

function ThemeItem({
  type,
  colors,
  onClick,
  isActive,
}: {
  type: string;
  colors: string[];
  onClick: (e: React.MouseEvent) => void;
  isActive: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-row items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer",
        isActive && "bg-zinc-100 dark:bg-zinc-800 border-2 border-primary",
      )}
    >
      <div>
        <span className="font-medium">{type}</span>
      </div>
      <div className="flex flex-row gap-1">
        {colors.map((color, index) => (
          <span
            key={index}
            className="w-6 h-6 rounded-md border border-gray-200 dark:border-gray-700"
            style={{ backgroundColor: color }}
          ></span>
        ))}
      </div>
    </div>
  );
}
