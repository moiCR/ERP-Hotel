"use client";

import { useState, createContext } from "react";
import LogoutModal from "./logout-modal";
import Button from "./ui/button";
import { ModalTheme } from "./theme-modal";
import { BrushIcon, DoorOpenIcon, UserIcon } from "lucide-react";

export const SidebarContext = createContext({ isClosed: false });

export default function SideBar({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  const [isClosed, setIsClosed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isClosed }}>
      <aside
        className={`relative flex flex-col gap-2 h-screen border-r-2 p-4 transition-all duration-300
            bg-zinc-100 border-zinc-200
            dark:bg-[#121212] dark:border-[#444444] justify-between
            ${isClosed ? "w-20" : "w-64"}`}
      >
        <div className="flex flex-col overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 right-0 rounded-r-3xl -z-10 border-r-2
                bg-zinc-100 border-zinc-200
                dark:bg-[#242424] dark:border-[#444444]"
          />

          <section
            className={`flex flex-row items-center mb-4 ${isClosed ? "justify-center" : "justify-end"}`}
          >
            <button
              onClick={() => setIsClosed(!isClosed)}
              className="hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${isClosed ? "rotate-180" : ""}`}
              >
                <path d="M4 12l10 0" />
                <path d="M4 12l4 4" />
                <path d="M4 12l4 -4" />
                <path d="M20 4l0 16" />
              </svg>
            </button>
          </section>

          <section className="mx-2 mt-4 mb-9 flex items-center gap-3 md:justify-center">
            <div className="min-w-[24px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="icon-tabler-building-skyscraper"
              >
                <path d="M3 21l18 0" />
                <path d="M5 21v-14l8 -4v18" />
                <path d="M19 21v-10l-6 -4" />
              </svg>
            </div>
            {!isClosed && (
              <span className="text-sm font-bold truncate">{header} Panel</span>
            )}
          </section>

          {!isClosed && (
            <section className="mx-2 mb-4">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Menu
              </span>
            </section>
          )}

          <nav className="flex flex-col gap-2 w-full">{children}</nav>
        </div>

        <footer
          className={`my-6 w-full flex flex-col gap-4 items-center ${isClosed ? "px-0" : "px-2"}`}
        >
          <div className="relative">
            <ModalTheme
              isOpen={isThemeModalOpen}
              className="absolute top-auto bottom-0 left-0 right-auto translate-x-0 translate-y-0"
              onClose={() => setIsThemeModalOpen(false)}
            />

            <Button
              layoutId="theme-modal"
              className="p-2 w-full flex justify-center items-center rounded-xl bg-transparent dark:bg-transparent dark:text-white hover:text-red-500 hover:bg-red-500/10 hover:dark:text-red-500 hover:dark:bg-red-500/10 text-black transition-all duration-300"
              onClick={() => setIsThemeModalOpen(true)}
            >
              <BrushIcon />

              {!isClosed && (
                <span className="ml-2 text-sm font-medium">Tema</span>
              )}
            </Button>
          </div>

          <div>
            <Button className="p-2 w-full flex justify-center items-center rounded-xl bg-transparent dark:bg-transparent dark:text-white hover:text-red-500 hover:bg-red-500/10 hover:dark:text-red-500 hover:dark:bg-red-500/10 text-black transition-all duration-300">
              <UserIcon />
              {!isClosed && (
                <span className="ml-2 text-sm font-medium">Cuenta</span>
              )}
            </Button>
          </div>

          <div className="relative">
            <LogoutModal
              isOpen={isLogoutModalOpen}
              onClose={() => setIsLogoutModalOpen(false)}
            />

            <Button
              layoutId="logout-modal"
              className="p-2 w-full flex justify-center items-center rounded-xl bg-transparent dark:bg-transparent dark:text-white hover:text-red-500 hover:bg-red-500/10 hover:dark:text-red-500 hover:dark:bg-red-500/10 text-black transition-all duration-300"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <DoorOpenIcon />
              {!isClosed && (
                <span className="ml-2 text-sm font-medium">Cerrar Sesión</span>
              )}
            </Button>
          </div>
        </footer>
      </aside>
    </SidebarContext.Provider>
  );
}
