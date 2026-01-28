import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activar Cuenta - ERP Hotel",
  description: "Activa tu cuenta de acceso",
};

export default function ActivateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {children}
    </div>
  );
}