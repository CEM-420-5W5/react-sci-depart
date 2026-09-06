'use client';

import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"
import { useAuth } from "@/lib/auth-context"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
 
export function SCINavigationMenu() {
    const { isAuthenticated, username, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <NavigationMenu>
            <NavigationMenuList className="flex-wrap">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/">Accueil</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/test">Test</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                {!isAuthenticated && (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/login">Se connecter</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/register">S'inscrire</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/match">Match</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <span className="px-4 py-2">Bienvenue, {username}</span>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button onClick={handleLogout} variant="outline">Se déconnecter</Button>
                        </NavigationMenuItem>
                    </>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    )
}