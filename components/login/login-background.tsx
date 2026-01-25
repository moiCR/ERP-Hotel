import Image from 'next/image'
import BackgroundLogin from '@/public/background_login.webp'

export default function LoginBackground() {
    return (
        <section className="flex p-4 justify-center w-screen h-screen flex-col bg-white dark:bg-[#191919]">
          <Image
            src={BackgroundLogin.src}
            alt="Imagen de una habitacion de hotel"
            width={1280}
            height={720}
            className="object h-[calc(100vh-64px)] rounded-3xl dark:bg-[#191919]"
          />
        </section>
    )
}