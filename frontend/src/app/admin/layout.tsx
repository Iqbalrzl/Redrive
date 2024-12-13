'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (!token) {
            router.push('/admin/login')
        } else {
            setIsAuthenticated(true)
        }
    }, [router])

    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <nav className="w-64 bg-white shadow-lg">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin/vehicles" className="block p-2 hover:bg-gray-200 rounded">
                                Vehicle 
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/customers" className="block p-2 hover:bg-gray-200 rounded">
                                Customer 
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/reservations" className="block p-2 hover:bg-gray-200 rounded">
                                Reservation 
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}

