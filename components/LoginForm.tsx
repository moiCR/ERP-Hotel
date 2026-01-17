"use client";
import { auth } from "@/lib/db";
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
        const result = await auth(username, password);

        if(result.success){
            setLoading(false);
            console.log(result.message);
        }else{
            setLoading(false);
            setError(result.message);

            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    return (
        <div className="flex justify-center items-center dark:bg-[#232323] bg-white p-16 rounded-xl text-white border dark:border-[#303030] border-zinc-100 shadow-lg ">
            <form onSubmit={handleLogin} className='flex flex-col gap-5'>
                <label htmlFor="username">Usuario</label>
                <input type="text" name="username" className={`p-2 rounded-xl bg-zinc-100 dark:bg-[#2A2A2A] `} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" className='p-2 rounded-xl bg-zinc-100 dark:bg-[#2A2A2A]' onChange={(e) => setPassword(e.target.value)} />

                <button 
                    id='login-button' 
                    className={`${isLoading ? 'animate-pulse bg-green-500 hover:bg-green-400' : 'bg-blue-500 hover:bg-blue-400'} 
                                text-white p-3 rounded-xl hover:scale-105 transition-all duration-300`}
                    type="submit">
                        {isLoading ? 'Iniciando sesión' : 'Iniciar sesión'}
                        {isLoading && <span className="loading-dots"></span>}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    )
}   