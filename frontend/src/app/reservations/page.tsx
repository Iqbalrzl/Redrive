'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ReservationsPage() {
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
            <h1 className="text-3xl font-bold mb-6 text-black">Your Reservations</h1>
            {user.reservations && user.reservations.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {user.reservations.map((reservation) => (
                        <Card key={reservation.id} className="bg-neutral-400/4 text-black">
                            <CardHeader>
                                <CardTitle>{reservation.vehicle.brand} {reservation.vehicle.model}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Date:</strong> {new Date(reservation.date).toLocaleString()}</p>
                                <p><strong>Duration:</strong> {reservation.duration} hours</p>
                                <p><strong>Starts:</strong> {reservation.starts}</p>
                                <p><strong>Ends:</strong> {reservation.ends}</p>
                                <p><strong>Total:</strong> ${reservation.total.toFixed(2)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">You have no reservations yet.</p>
            )}
        </div>
    )
}

