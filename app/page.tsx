"use client";
import { useState } from "react";
import LoginForm from "@/components/login/login-form";
import SettingsButton from "@/components/login/settings-button";
import SettingsModal from "@/components/login/settings-modal";
import Image from 'next/image'
import BackgroundLogin from '@/public/background_login.webp'
import Logo from '@/public/logo.webp'


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
      <header className="absolute top-0 left-0 w-full">
        <div className="flex justify-end">
          <Image
            src={Logo.src}
            alt="Logo de la empresa"
            width={128}
            height={128}
            className="my-5 mx-5"
          />
        </div>

      </header>
      <div className=" w-screen flex flex-row">
        <section className="flex p-4 justify-center w-screen h-screen flex-col bg-white dark:bg-[#191919]">
          <Image
            src={BackgroundLogin.src}
            alt="Imagen de una habitacion de hotel"
            width={1280}
            height={720}
            className="object h-[calc(100vh-64px)] rounded-3xl dark:bg-[#191919]"
          />
        </section>
        <section className="flex p-4 justify-center w-screen h-screen flex-col items-center py-32 px-16 bg-white dark:bg-[#191919]">
          <LoginForm />
        </section>
      </div>

      <div className="absolute bottom-0 right-0">
        {showModal && <SettingsModal onClose={toggleModal} />}
        {!showModal && <SettingsButton onClick={toggleModal} />}
      </div>
    </div>
  );
}
