import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Innovation y Desarrollo",
  description: "Gestión de solicitudes",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-950 flex flex-col items-center justify-center">
        {children}
        </div>
      </body>
    </html>
  );
}
