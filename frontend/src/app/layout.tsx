import './globals.css'
import { Playfair_Display, Montserrat } from 'next/font/google'
import Link from 'next/link'
import { Toaster } from '@/components/ui/toaster'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

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
      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        <header className="bg-black text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold font-serif">REDRIVE</h1>
            <nav className="font-sans">
              <ul className="flex space-x-4">
                <li><Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
                <li><Link href="/login" className="hover:text-gray-300 transition-colors">Login</Link></li>
                <li><Link href="/register" className="hover:text-gray-300 transition-colors">Register</Link></li>
                <li><Link href="/profile" className="hover:text-gray-300 transition-colors">Profile</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}

