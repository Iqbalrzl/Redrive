"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getMe, MeResponse, isLoggedIn, AdminResponse } from '@/lib/auth'

interface AuthContextType {
    user: MeResponse | AdminResponse | null
    setUser: React.Dispatch<React.SetStateAction<MeResponse | AdminResponse | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<MeResponse | AdminResponse | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await isLoggedIn()
            if (userData) {
                setUser(userData)
            }
        }

        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

