'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProfilePage() {
    const router = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user, router])

    if (!user) {
        return null
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-black">Profile</h1>
            <Card className="bg-neutral-400/1 text-black">
                <CardHeader>
                    <CardTitle>{user.username}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Birthdate:</strong> {user.birthdate}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                </CardContent>
            </Card>
        </div>
    )
}

