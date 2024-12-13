'use client'

import { useState, useEffect } from 'react'
import axiosInstance from '@/lib/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

interface Reservation {
    id: number;
    customerId: number;
    vehicleId: number;
    date: string;
    duration: number;
    starts: string;
    ends: string;
    total: number;
}

export default function ReservationManagementPage() {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
    const [reservationId, setReservationId] = useState('')
    const { toast } = useToast()

    useEffect(() => {
        fetchReservations()
    }, [])

    const fetchReservations = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/reservation', {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
            })
            setReservations(response.data)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch reservations.",
            })
        }
    }

    const fetchReservationById = async () => {
        if (!reservationId) return
        try {
            const response = await axiosInstance.get(`/api/admin/reservation/${reservationId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
            })
            setSelectedReservation(response.data)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch reservation.",
            })
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Reservation Management</h2>
            
            <div className="space-y-4">
                <Input
                    placeholder="Enter Reservation ID"
                    value={reservationId}
                    onChange={(e) => setReservationId(e.target.value)}
                />
                <Button onClick={fetchReservationById}>Get Reservation</Button>
            </div>

            {selectedReservation && (
                <div className="p-4 border rounded">
                    <h3 className="text-xl font-bold mb-2">Selected Reservation</h3>
                    <p><strong>ID:</strong> {selectedReservation.id}</p>
                    <p><strong>Customer ID:</strong> {selectedReservation.customerId}</p>
                    <p><strong>Vehicle ID:</strong> {selectedReservation.vehicleId}</p>
                    <p><strong>Date:</strong> {selectedReservation.date}</p>
                    <p><strong>Duration:</strong> {selectedReservation.duration} hours</p>
                    <p><strong>Starts:</strong> {selectedReservation.starts}</p>
                    <p><strong>Ends:</strong> {selectedReservation.ends}</p>
                    <p><strong>Total:</strong> ${selectedReservation.total}</p>
                </div>
            )}

            <h3 className="text-xl font-bold">All Reservations</h3>
            <div className="space-y-4">
                {reservations.map(reservation => (
                    <div key={reservation.id} className="p-4 border rounded">
                        <p><strong>ID:</strong> {reservation.id}</p>
                        <p><strong>Customer ID:</strong> {reservation.customerId}</p>
                        <p><strong>Vehicle ID:</strong> {reservation.vehicleId}</p>
                        <p><strong>Date:</strong> {reservation.date}</p>
                        <p><strong>Duration:</strong> {reservation.duration} hours</p>
                        <p><strong>Starts:</strong> {reservation.starts}</p>
                        <p><strong>Ends:</strong> {reservation.ends}</p>
                        <p><strong>Total:</strong> ${reservation.total}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

