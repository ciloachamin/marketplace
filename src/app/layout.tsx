import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { cn, constructMetadata } from '@/lib/utils'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import Footer from '@/components/Footer'
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es' suppressHydrationWarning className='h-full'>
      <body
        className={cn(
          'relative h-full font-sans antialiased',
          inter.className
        )}>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className='relative flex flex-col min-h-screen'>
            <Providers>
              <Navbar />
              <div className='flex-grow flex-1 '>
                {children}
              </div>
              <Footer />
            </Providers>
          </main>
          <Toaster position='top-center' richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
