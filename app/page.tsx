"use client";
import { useState } from "react";
import LoginForm from "@/components/login/LoginForm";
import SettingsButton from "@/components/login/SettingsButton";
import SettingsModal from "@/components/login/SettingsModal";
import Image from 'next/image'
import background_login from '@/public/background_login.webp'




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
      <div className=" w-screen flex flex-row">
          <section className="flex justify-center w-screen h-screen flex-col bg-white ">
              <Image
                  src = {background_login.src}
                  alt = "adsadasads"
                  width={1920}
                  height={1080}
                  className="object-cover w-full h-full" 
              />
          </section>
          <section className="flex justify-center w-screen h-screen flex-col items-center py-32 px-16 bg-white dark:bg-[#191919]">
            <LoginForm />
          </section>
      </div>

      <div className="absolute bottom-0">
        {showModal && <SettingsModal onClose={toggleModal} />}
        {!showModal && <SettingsButton onClick={toggleModal} />}
      </div>
    </div>
  );
}
