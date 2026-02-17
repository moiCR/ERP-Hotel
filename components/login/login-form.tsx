"use client";
import { auth } from "@/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import { sileo } from "sileo";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) return;

    setLoading(true);
    setError("");
    
    const promise = await sileo.promise(auth(email, password, remember), {
      loading: { title: "Iniciando Sesión..." },
      success: { title: "Sesión iniciada correctamente" },
      error: {
        title: "Inicio de sesión fallido",
        description: "Por favor, verifica tus credenciales e intenta nuevamente."
      },
    }).catch((err) => {
      setLoading(false);
      setError(err.message);
    });
    
  
    await new Promise((resolve) => setTimeout(resolve, 3000));
    router.push(promise.targetPath!);

    // try {
    //   const result = await auth(email, password, remember);
    //   if (result.success && result.targetPath) {
    //     router.push(result.targetPath);
    //   } else {
    //     setLoading(false);
    //     setError(result.message || "Credenciales inválidas");
    //   }
    // } catch (err) {
    //   setLoading(false);
    //   setError("Ocurrió un error inesperado.");
    //   console.error(err);
    // }
  };

  return (
    <section className="flex p-4 justify-center w-screen h-screen flex-col items-center py-32 px-16 bg-white dark:bg-[#191919]">
      <div className="flex justify-center items-center w-full h-full p-16 rounded-xl">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-5 w-[600px] h-full"
        >
          <section className="flex flex-col gap-2 self-center text-center mb-5">
            <div className="flex flex-col items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
              </svg>
              <h1 className="text-2xl font-bold">Inicio de sesión</h1>
            </div>
            <h2 className="text-lg opacity-80">Ingresa tus credenciales</h2>
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="email">Correo electrónico</label>
            <input
              required
              type="email"
              name="email"
              value={email}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-blue-500 outline-none transition-colors duration-100"
              onChange={(e) => {
                const cleanValue = e.target.value.replace(
                  /[^a-zA-Z0-9@._-]/g,
                  "",
                );
                setEmail(cleanValue);
              }}
            />
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="password">Contraseña</label>
            <input
              required
              type="password"
              name="password"
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-blue-500 outline-none transition-colors"
              onChange={(e) => setPassword(e.target.value)}
            />
          </section>

          <section className="flex items-center gap-2">
            <input
              id="remember"
              className="w-5 h-5 accent-blue-700 cursor-pointer"
              type="checkbox"
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label
              htmlFor="remember"
              className="text-zinc-500 dark:text-zinc-400"
            >
              Recuérdame
            </label>
          </section>

          <section className="flex flex-col gap-2 w-full justify-center">
            <Button
              id="login-button"
              disabled={isLoading}
              className={
                "font-bold items-center justify-center flex w-full flex-row text-white dark:text-black bg-black dark:bg-white px-4 py-2 rounded-xl hover:scale-x-110 hover:scale-y-105 transition-all duration-300" +
                " " +
                (isLoading
                  ? "bg-black/80 dark:bg-white/80 text-white dark:text-black font-bold cursor-not-allowed"
                  : "cursor-pointer bg-black dark:bg-white text-white dark:text-black font-bold hover:scale-105 transition-all duration-300")
              }
              type="submit"
            >
              Iniciar sesión
            </Button>
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </section>
        </form>
      </div>
    </section>
  );
}
