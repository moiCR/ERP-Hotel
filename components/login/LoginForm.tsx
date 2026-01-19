"use client";
import { auth } from "@/actions/auth";
import { useState } from "react";

export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username || username === '') {
            return;
        }

        if (!password || password === '') {
            return;
        }

        const loginButton = document.getElementById('login-button');

        if (!loginButton) {
            return;
        }

        setLoading(true);
        setError('');
        const result = await auth(username, password);

        if (result.success) {
            setLoading(false);
            console.log(result.message);
        } else {
            setLoading(false);
            setError(result.message);
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-full p-16 rounded-xl text-black dark:text-white">
            <form onSubmit={handleLogin} className='flex flex-col justify-center gap-5 w-[600px] h-full'>

                <section className="flex flex-col gap-2 self-center text-center mb-5">
                    <div className="flex flex-col items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                                strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                        </svg>
                        <h1 className="text-2xl font-bold text-zinc-200 dark:text-zinc-200">Inicio de sesión</h1>
                    </div>
                    <h2 className="text-lg text-zinc-200 dark:text-zinc-200">Ingresa tus credenciales</h2>
                </section>

                <section className="flex flex-col gap-2">
                    <label htmlFor="email">Correo electrónico</label>
                    <input required type="text" name="email" className={`p-2 rounded-xl bg-zinc-100 dark:bg-[#2A2A2A] dark:text-zinc-200 `} onChange={(e) => setUsername(e.target.value)} />
                </section>

                <section className="flex flex-col gap-2">
                    <label htmlFor="password">Contraseña</label>
                    <input required type="password" name="password" className='p-2 rounded-xl bg-zinc-100 dark:bg-[#2A2A2A] dark:text-zinc-200' onChange={(e) => setPassword(e.target.value)} />
                </section>

                <section className="flex items-center gap-2">
                    <input id="remember" type="checkbox" />
                    <label htmlFor="remember">Recuerdame</label>
                </section>

                <section className="flex flex-col gap-2">
                    <button
                        id='login-button'
                        className={`${isLoading ? 'animate-pulse bg-green-500 hover:bg-green-400' : 'bg-blue-700 border-2 border-blue-800 hover:bg-blue-600'} 
                                text-white p-3 rounded-xl hover:scale-101 transition-all duration-300`}
                        type="submit">
                        {isLoading ? 'Iniciando sesión' : 'Iniciar sesión'}
                        {isLoading && <span className="loading-dots"></span>}
                    </button>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}  
                </section>
            </form>
        </div>
    )
}   