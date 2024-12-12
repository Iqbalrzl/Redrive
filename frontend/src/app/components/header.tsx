"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from '@/lib/auth'
import { useToast } from '@/hooks/use-toast'

export function Header() {
    const { user, setUser } = useAuth()
    const router = useRouter()
    const { toast } = useToast()

    const handleLogout = () => {
        logout()
        setUser(null)
        toast({
            title: "Success",
            description: "You have been logged out.",
        })
        router.push('/')
    }

    return (
        <header className="border-b border-border bg-background">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">
                    REDRIVE
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Home
                    </Link>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">Profile</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onSelect={() => router.push('/profile')}>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => router.push('/reservations')}>
                                    Reservations
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={handleLogout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
                                Login
                            </Link>
                            <Link href="/register" className="text-sm font-medium hover:text-primary transition-colors">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

