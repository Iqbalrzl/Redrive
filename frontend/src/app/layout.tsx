import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/auth-provider'
import { Header } from '@/app/components/header'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'REDRIVE - Hourly Vehicle Rental',
  description: 'Rent vehicles on an hourly basis with REDRIVE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

