'use client'

import { useState, useEffect } from 'react'
import axiosInstance from '@/lib/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

interface Customer {
    id: number;
    username: string;
    birthdate: string;
    address: string;
    phone: string;
}

export default function CustomerManagementPage() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [customerId, setCustomerId] = useState('')
    const { toast } = useToast()

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/customer', {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
            })
            setCustomers(response.data)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch customers.",
            })
        }
    }

    const fetchCustomerById = async () => {
        if (!customerId) return
        try {
            const response = await axiosInstance.get(`/api/admin/customer/${customerId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
            })
            setSelectedCustomer(response.data)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch customer.",
            })
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Customer Management</h2>
            
            <div className="space-y-4">
                <Input
                    placeholder="Enter Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                />
                <Button onClick={fetchCustomerById}>Get Customer</Button>
            </div>

            {selectedCustomer && (
                <div className="p-4 border rounded">
                    <h3 className="text-xl font-bold mb-2">Selected Customer</h3>
                    <p><strong>ID:</strong> {selectedCustomer.id}</p>
                    <p><strong>Username:</strong> {selectedCustomer.username}</p>
                    <p><strong>Birthdate:</strong> {selectedCustomer.birthdate}</p>
                    <p><strong>Address:</strong> {selectedCustomer.address}</p>
                    <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                </div>
            )}

            <h3 className="text-xl font-bold">All Customers</h3>
            <div className="space-y-4">
                {customers.map(customer => (
                    <div key={customer.id} className="p-4 border rounded">
                        <p><strong>ID:</strong> {customer.id}</p>
                        <p><strong>Username:</strong> {customer.username}</p>
                        <p><strong>Birthdate:</strong> {customer.birthdate}</p>
                        <p><strong>Address:</strong> {customer.address}</p>
                        <p><strong>Phone:</strong> {customer.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
