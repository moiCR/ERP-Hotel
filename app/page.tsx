"use client";
import { useState } from "react";
import LoginForm from "@/components/login/login-form";
import SettingsButton from "@/components/login/login-settings-button";
import SettingsModal from "@/components/login/login-settings-modal";
import LoginBackground from "@/components/login/login-background";
import Button from "@/components/ui/button";
import { ModalTheme } from "@/components/theme-modal";
import { BrushIcon } from "lucide-react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    if (!document.startViewTransition) {
      setShowModal(!showModal);
      return;
    }

    document.startViewTransition(() => {
      import("react-dom").then(({ flushSync }) => {
        flushSync(() => {
          setShowModal((prev) => !prev);
        });
      });
    });
  };


  return (
    <div className="flex flex-col min-h-screen justify-between bg-white font-sans dark:bg-[#1F1F1F]">
      <div className=" w-screen flex flex-row">
        <LoginBackground />
        <LoginForm />
      </div>

          <div className="absolute bottom-0 right-0 mx-4 my-4">
            <ModalTheme
              isOpen={showModal}
              className="absolute top-auto bottom-0 left-auto right-0 translate-x-0 translate-y-0"
              onClose={() => setShowModal(false)}
            />

            <Button
              layoutId="theme-modal"
              className="p-2 w-full flex justify-center items-center rounded-xl bg-zinc-100 dark:bg-[#2A2A2A] hover:bg-zinc-200 dark:hover:bg-[#111] text-black dark:text-white transition-all duration-300"
              onClick={() => setShowModal(true)}
            >
              <BrushIcon />
            </Button>
          </div>
    </div>
  );
}
