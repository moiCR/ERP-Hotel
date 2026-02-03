"use client";

import { useTheme } from "next-themes";
import { changeTheme } from "@/actions/theme";
import { flushSync } from "react-dom";
import { useCallback } from "react";

export function useThemeTransition() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    const isDark = resolvedTheme === "dark";

    const setThemeTransition = useCallback(async (newTheme: "dark" | "light", e: React.MouseEvent) => {
        if (resolvedTheme === newTheme) return;

        const isNewThemeDark = newTheme === "dark";

        if (!document.startViewTransition) {
            await changeTheme(newTheme);
            setTheme(newTheme);
            return;
        }

        const x = e.clientX;
        const y = e.clientY;

        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        const transition = document.startViewTransition(async () => {
            await changeTheme(newTheme);
            flushSync(() => {
                setTheme(newTheme);
            });
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            document.documentElement.animate(
                {
                    clipPath: isNewThemeDark ? [...clipPath].reverse() : clipPath,
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: isNewThemeDark
                        ? "::view-transition-old(root)"
                        : "::view-transition-new(root)",
                }
            );
        });
    }, [resolvedTheme, setTheme]);

    const toggleTheme = useCallback(async (e: React.MouseEvent) => {
       const newTheme = isDark ? "light" : "dark";
       setThemeTransition(newTheme, e);
    }, [isDark, setThemeTransition]);

    return {
        toggleTheme,
        setTheme: setThemeTransition,
        isDark,
        mounted: true
    };
}