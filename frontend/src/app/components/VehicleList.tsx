'use client'

import { useState, useEffect } from 'react'
import VehicleCard from './VehicleCard'
import axiosInstance from '@/lib/axios'

interface Vehicle {
    id: number;
    year: number;
    price: number;
    model: string;
    brand: string;
    imageUrl: string;
}

export default function VehicleList() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axiosInstance.get<Vehicle[]>('/api/vehicle')
                setVehicles(response.data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch vehicles. Please try again later.')
                setLoading(false)
            }
        }

        fetchVehicles()
    }, [])

    if (loading) {
        return <div className="text-center">Loading vehicles...</div>
    }

    if (error) {
        return <div className="text-center text-destructive">{error}</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
                <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                />
            ))}
        </div>
    )
}

