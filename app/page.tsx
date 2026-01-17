import LoginForm from "@/components/LoginForm";

export default function Home() {

  const handleLogin = () => {
    document.getElementById('login-button')?.classList.add('animate-pulse');
  }

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#191919]">
      <main className="flex justify-center w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-[#191919]">
        <LoginForm />
      </main>
    </div>
  );
}
