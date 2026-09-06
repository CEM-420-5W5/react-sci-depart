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
                        <Link href="/">Home</Link>
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
                                <Link href="/login">Login</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/register">Register</Link>
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
                            <span className="px-4 py-2">Welcome, {username}</span>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button onClick={handleLogout} variant="outline">Logout</Button>
                        </NavigationMenuItem>
                    </>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    )
}