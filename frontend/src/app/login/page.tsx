'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { login, isLoggedIn } from '@/lib/auth'
import { useAuth } from '@/components/auth-provider'
// import axiosInstance from '@/lib/axios' // Removed as per update 2

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [adminUsername, setAdminUsername] = useState('')
    const [adminPassword, setAdminPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const { toast } = useToast()
    const { user, setUser } = useAuth()

    const handleSubmit = async (e: React.FormEvent, isAdmin: boolean = false) => {
        e.preventDefault()
        try {
            const [token, isAdminLogin] = await login(
                isAdmin ? { username: adminUsername, password: adminPassword } : { username, password },
                isAdmin
            );
            const user = await isLoggedIn();
            setUser(user);
            toast({
                title: "Success",
                description: `You have successfully logged in as ${isAdmin ? 'admin' : 'user'}.`,
                className: "bg-success text-white",
            })
            router.push(isAdmin ? '/admin' : '/')
        } catch (err) {
            setError('Invalid username or password')
            toast({
                variant: "destructive",
                title: "Error",
                description: "Invalid username or password.",
            })
        }
    }

    if (user) {
        return null
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-destructive">{error}</p>}
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </form>

            <h2 className="text-2xl font-bold mt-8 mb-4">Admin</h2>
            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="adminUsername">Username</Label>
                    <Input
                        id="adminUsername"
                        type="text"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="adminPassword">Password</Label>
                    <Input
                        id="adminPassword"
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Login as Admin
                </Button>
            </form>
        </div>
    )
}

