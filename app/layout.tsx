import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import Navbar from '@/components/navigation/navbar'
import { Providers } from './providers'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Providers>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar/>
            <div >
     
    
            {children}
           
            </div>
          </ThemeProvider>
          </Providers>
          </body>
    </html>
    </ClerkProvider>
  )
}
