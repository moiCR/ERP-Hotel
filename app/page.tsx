"use client";
import { useState } from "react";
import LoginForm from "@/components/login/login-form";
import SettingsButton from "@/components/login/login-settings-button";
import SettingsModal from "@/components/login/login-settings-modal";
import LoginBackground from "@/components/login/login-background";

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

      <div className="absolute bottom-0 right-0">
        {showModal && <SettingsModal onClose={toggleModal} />}
        {!showModal && <SettingsButton onClick={toggleModal} />}
      </div>
    </div>
  );
}
