"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { privateData, publicData } from "@/lib/account-api";

export default function TestPage() {
    useProtectedRoute();
    
    useEffect(() => {
       // obtenir les données
    }, []);

    const testPublique = async () => {
        const data = await publicData();
        console.log('Publique API Status:', data);
      }
    
      const testPrivate = async () => {
        const data = await privateData();
        console.log('Private API Status 2:', data);
      }

    return (
          
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-4">
            <Button onClick={testPublique}>Test Publique</Button>
            <Button onClick={testPrivate}>Test Privé</Button>
        </div> 
    );
}