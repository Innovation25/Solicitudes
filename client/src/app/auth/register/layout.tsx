import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-950 flex flex-col items-center justify-center">
      <main>
        {children}
      </main>
    </div>
  );
}