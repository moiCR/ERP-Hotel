"use client";

import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { changeTheme } from "@/actions/theme";

export default function SettingsModal({ onClose }: { onClose: () => void }) {
    const { setTheme, resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const handleThemeChange = async (theme: "light" | "dark") => {
        await changeTheme(theme);
        setTheme(theme);
    };

    return (
        <div className="fixed inset-0 z-50 pointer-events-none" onClick={onClose}>
            <dialog
                id="settingsModal"
                className="absolute bottom-4 right-4 left-auto flex flex-row p-5 gap-4 rounded-xl bg-zinc-100 dark:bg-[#2A2A2A] border-zinc-200 dark:border-zinc-800 shadow-xl m-0 pointer-events-auto border-none"
                open
                onClick={(e) => e.stopPropagation()}
                style={{ viewTransitionName: 'settings-expand' } as React.CSSProperties}
            >
                <div className="flex flex-col gap-4">
                    <button onClick={onClose} className="p-1 rounded-full self-end hover:bg-black/10 text-black dark:text-white/80 dark:hover:bg-white/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-black dark:text-white/80 font-medium">Dark Mode</span>
                        <Switch
                            checked={isDark}
                            onCheckedChange={(checked) => handleThemeChange(checked ? 'dark' : 'light')}
                            className="bg-zinc-800 dark:bg-zinc-200 transition-colors duration-1000"
                        />
                    </div>
                </div>
            </dialog>
        </div>
    )
}