"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getMe, MeResponse, isLoggedIn } from '@/lib/auth'

interface AuthContextType {
    user: MeResponse | null
    setUser: React.Dispatch<React.SetStateAction<MeResponse | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<MeResponse | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            if (await isLoggedIn()) {
                try {
                    const userData = await getMe()
                    setUser(userData)
                } catch (error) {
                    console.error('Failed to fetch user data:', error)
                }
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

