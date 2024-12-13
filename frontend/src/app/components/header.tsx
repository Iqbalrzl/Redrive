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
import { MeResponse, AdminResponse } from '@/lib/auth'

export function Header() {
    const { user, setUser } = useAuth() as { 
        user: MeResponse | AdminResponse | null, 
        setUser: React.Dispatch<React.SetStateAction<MeResponse | AdminResponse | null>> 
    }
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

    const isAdmin = user && 'username' in user && !('birthdate' in user)

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
                                <Button variant="ghost" className="text-white hover:text-gray-300">
                                    {isAdmin ? 'Admin' : 'Profile'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-black border border-gray-800">
                                {isAdmin ? (
                                    <DropdownMenuItem onSelect={() => router.push('/admin')} className="text-white hover:bg-gray-900">
                                        Admin Dashboard
                                    </DropdownMenuItem>
                                ) : (
                                    <>
                                        <DropdownMenuItem onSelect={() => router.push('/profile')} className="text-white hover:bg-gray-900">
                                            Profile Information
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => router.push('/reservations')} className="text-white hover:bg-gray-900">
                                            Reservations
                                        </DropdownMenuItem>
                                    </>
                                )}
                                <DropdownMenuItem onSelect={handleLogout} className="text-white hover:bg-gray-900">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                                Login
                            </Link>
                            <Link href="/register" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

