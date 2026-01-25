import Logo from '@/public/logo.webp'
import Image from 'next/image'

export default function LoginHeader() {
    return (
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
    )
}