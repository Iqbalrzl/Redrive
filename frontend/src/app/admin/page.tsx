'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (!token) {
            router.push('/login')
        }
    }, [router])

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Use the navigation menu to manage vehicles, customers, and reservations.</p>
        </div>
    )
}

