'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { register } from '@/lib/auth'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        birthdate: '',
        address: '',
        phone: '',
    })
    const [error, setError] = useState('')
    const router = useRouter()
    const { toast } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await register(formData)
            toast({
                title: "Success",
                description: "Registration successful. Please login.",
            })
            router.push('/login')
        } catch (err) {
            setError('Registration failed. Please try again.')
            toast({
                variant: "destructive",
                title: "Error",
                description: "Registration failed. Please try again.",
            })
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="font-sans"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="font-sans"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input
                        id="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                        className="font-sans"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="font-sans"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="font-sans"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" className="w-full bg-[#0A0F1C] hover:bg-[#161F35] transition-colors">
                    Register
                </Button>
            </form>
        </div>
    )
}

