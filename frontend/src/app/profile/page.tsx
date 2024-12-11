'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { getMe, logout, MeResponse, isLoggedIn } from '@/lib/auth'

export default function ProfilePage() {
    const [user, setUser] = useState<MeResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        const fetchUser = async () => {
            if (!isLoggedIn()) {
                setLoading(false);
                return;
            }
            try {
                const userData = await getMe()
                setUser(userData)
            } catch (err) {
                console.error('Error fetching user data:', err)
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to fetch user data. Please try logging in again.",
                })
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [toast])

    const handleLogout = () => {
        logout()
        toast({
            title: "Success",
            description: "You have been logged out.",
        })
        router.push('/login')
    }

    if (loading) {
        return <div className="text-center">Loading...</div>
    }

    if (!user) {
        return (
            <div className="max-w-2xl mx-auto mt-8 text-center">
                <h1 className="text-3xl font-bold mb-6">Profile</h1>
                <p className="mb-4">You are not logged in. Please log in to view your profile.</p>
                <Button
                    onClick={() => router.push('/login')}
                    className="bg-black hover:bg-gray-800 transition-colors"
                >
                    Go to Login
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <div className="bg-white shadow rounded-lg p-6">
                <p className="mb-2"><strong className="font-serif">Username:</strong> <span className="font-sans">{user.username}</span></p>
                <p className="mb-2"><strong className="font-serif">Birthdate:</strong> <span className="font-sans">{user.birthdate}</span></p>
                <p className="mb-2"><strong className="font-serif">Address:</strong> <span className="font-sans">{user.address}</span></p>
                <p className="mb-2"><strong className="font-serif">Phone:</strong> <span className="font-sans">{user.phone}</span></p>
                <h2 className="text-2xl font-bold mt-6 mb-4">Reservations</h2>
                {user.reservations.length > 0 ? (
                    <ul className="space-y-4">
                        {user.reservations.map((reservation, index) => (
                            <li key={index} className="bg-gray-50 p-4 rounded-lg font-sans">
                                {JSON.stringify(reservation)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 font-sans">No reservations yet.</p>
                )}
                <Button
                    onClick={handleLogout}
                    className="mt-6 bg-black hover:bg-gray-800 transition-colors"
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

