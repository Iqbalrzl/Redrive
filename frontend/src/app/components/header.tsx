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
            className: "bg-success text-white",
        })
        router.push('/')
    }

    return (
        <header className="bg-black text-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">
                    REDRIVE
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link href="/" className="text-sm font-medium hover:text-gray-300 transition-colors">
                        Home
                    </Link>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="text-sm hover:text-gray-300 hover:bg-transparent transitions-colors">Profile</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-black border border-gray-800">
                                <DropdownMenuItem onSelect={() => router.push('/profile')} className="text-white hover:bg-gray-900">
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => router.push('/reservations')} className="text-white hover:bg-gray-900">
                                    Reservations
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={handleLogout} className="text-white hover:bg-gray-900">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium hover:text-gray-300 transition-colors">
                                Login
                            </Link>
                            <Link href="/register" className="text-sm font-medium hover:text-gray-300 transition-colors">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

