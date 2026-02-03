"use client";
import { Switch } from "@/components/ui/switch";
import { useThemeTransition } from "@/hooks/theme-hook";

export function ThemeToggle() {
  const { toggleTheme, isDark } = useThemeTransition();
  return (
    <Switch
      checked={isDark}
      onClick={(e) => toggleTheme(e)}
      className="bg-zinc-800 dark:bg-zinc-200"
    />
  );
}