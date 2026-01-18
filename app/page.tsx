"use client";
import { useState } from "react";
import LoginForm from "@/components/login/LoginForm";
import SettingsButton from "@/components/login/SettingsButton";
import SettingsModal from "@/components/login/SettingsModal";



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
    <div className="flex flex-col min-h-screen justify-between bg-zinc-50 font-sans dark:bg-[#191919]">
      <div className="flex min-w-screen items-center mt-28 justify-center bg-zinc-50 font-sans dark:bg-[#191919]">
        <main className="flex justify-center max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-[#191919]">
          <LoginForm />
        </main>
      </div>

      {showModal && <SettingsModal onClose={toggleModal} />}
      {!showModal && <SettingsButton onClick={toggleModal} />}
    </div>
  );
}
