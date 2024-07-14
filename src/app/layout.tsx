import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { cn, constructMetadata } from '@/lib/utils'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import Footer from '@/components/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es' suppressHydrationWarning className='h-full'>
      <head>
        {/* {process.env.NODE_ENV === 'production' && (
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2148072584206249"
            crossOrigin="anonymous"></script>
        )} */}

      </head>
      <body
        className={cn(
          'relative h-full font-sans antialiased',
          inter.className
        )}>
        {/* <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} /> */}
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
