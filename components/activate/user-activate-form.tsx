"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import { activateAccount } from "@/actions/user";

export default function UserActivateForm({
    token
}: {
    token: string;
}) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(''); 

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setIsLoading(true);

        try {
            const result = await activateAccount(token, password);

            if (result.success) {
                setSuccess(result.message);
               
                setTimeout(() => {
                    router.push("/login?activated=true"); 
                }, 2000);
            } else {
                setError(result.message);
                setIsLoading(false);
            }
        } catch (err) {
            setError("Ocurrió un error inesperado.");
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>
                    <section className="flex flex-col gap-2 text-center mb-5">
                        <h1 className="text-2xl font-bold">Activación de usuario</h1>
                        <h2 className="text-lg opacity-80">Crea tu contraseña</h2>
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="password">Nueva Contraseña</label>
                        <input
                            required
                            id="password"
                            type="password"
                            name="password"
                            disabled={isLoading}
                            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-blue-500 outline-none transition-colors duration-100"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="confirm-password">Confirmar contraseña</label>
                        <input
                            required
                            id="confirm-password"
                            type="password"
                            name="confirm-password"
                            disabled={isLoading}
                            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-blue-500 outline-none transition-colors"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <Button
                            id='activate-button'
                            disabled={isLoading || !!success}
                            type="submit"
                            className={success ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                            {success ? "¡Activado!" : (isLoading ? 'Activando...' : 'Activar cuenta')}
                        </Button>
                        
                        {error && (
                            <p className="text-red-500 text-sm text-center mt-2 bg-red-100 p-2 rounded">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="text-green-600 text-sm text-center mt-2 bg-green-100 p-2 rounded">
                                {success} Redirigiendo <span className="loading-dots"></span>
                            </p>
                        )}
                    </section>
                </form>
            </div>
        </div>
    );
}