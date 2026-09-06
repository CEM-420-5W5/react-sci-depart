'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

const authPages = ['/login', '/register'];
const protectedPages = ['/match'];
const publicPages = ['/test', '/'];

export function useProtectedRoute() {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Attendre que l'authentification soit vérifiée
    const isAuthPage = authPages.includes(pathname);
    const isProtectedPage = protectedPages.some(page => pathname.startsWith(page));
    const isHomePage = pathname === '/';

    // Rediriger les utilisateurs non connectés des pages protégées vers login
    if (!auth.isAuthenticated && isProtectedPage) {
      router.push('/login');
      return;
    }

    // Rediriger les utilisateurs connectés de login/register vers la page d'accueil
    if (auth.isAuthenticated && isAuthPage) {
      router.push('/');
      return;
    }
  }, [auth.isAuthenticated, pathname, router]);
}
