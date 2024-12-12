"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import axiosInstance from '@/lib/axios'

export default function ReservePage({ params }: { params: { id: string } }) {
    const [duration, setDuration] = useState(1)
    const [startTime, setStartTime] = useState('09:00')
    const router = useRouter()
    const { user } = useAuth()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            router.push('/login')
            return
        }

        try {
            await axiosInstance.post(`/api/vehicle/${params.id}/reservation`, {
                duration: duration,
                starts: startTime
            })
            toast({
                title: "Success",
                description: "Reservation created successfully.",
            })
            router.push('/profile')
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create reservation. Please try again.",
            })
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Create Reservation</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        min={1}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                    Confirm Reservation
                </Button>
            </form>
        </div>
    )
}

