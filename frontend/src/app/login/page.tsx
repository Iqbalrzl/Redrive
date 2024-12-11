'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { login, isLoggedIn } from '@/lib/auth'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        if (isLoggedIn()) {
            router.push('/profile')
        }
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await login({ username, password })
            toast({
                title: "Success",
                description: "You have successfully logged in.",
            })
            router.push('/profile')
        } catch (err) {
            setError('Invalid username or password')
            toast({
                variant: "destructive",
                title: "Error",
                description: "Invalid username or password.",
            })
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="font-sans"
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
                        className="font-sans"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" className="w-full bg-black hover:bg-gray-800 transition-colors">
                    Login
                </Button>
            </form>
        </div>
    )
}

