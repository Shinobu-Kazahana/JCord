import './globals.css'
import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
const font = Open_Sans({ subsets: ['latin'] })
import {ThemeProvider} from '../components/providers/theme-provider'
import {cn} from '@/lib/utils'
import { ModalProvider } from '@/components/providers/modal-provider'
import { SocketProvider } from '@/components/providers/socket-provider'
import { Query } from '@tanstack/react-query'
import { QueryProvider } from '@/components/providers/query-provider'
export const metadata: Metadata = {
  title: 'JC Private Discord',
  description: 'A private discord built by JC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
<html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "white:bg-[#f5f5f5] dark:bg-[#313338]")}>
        
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="discord-theme">
        <SocketProvider>
          <ModalProvider>
            
          </ModalProvider>
          <QueryProvider>    {children}</QueryProvider>
    
        </SocketProvider>
        </ThemeProvider>
 
        
        </body>
    </html>
    </ClerkProvider>
 
  )
}
