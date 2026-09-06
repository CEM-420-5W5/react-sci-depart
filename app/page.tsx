"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function Home() {
  
  useProtectedRoute();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Bienvenu à Super Cartes Infinies</h1>

        <div className="flex justify-center items-center">
          <img src="/images/welcome.png" alt="Welcome" />
        </div>
      </div>
    </div>
  );
}
