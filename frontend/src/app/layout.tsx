import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'XMRT Ecosystem V3',
    template: '%s | XMRT Ecosystem V3',
  },
  description: 'Decentralized Monero-based ecosystem with AI governance',
  keywords: ['XMRT', 'Monero', 'DeFi', 'DAO', 'AI Governance', 'Web3'],
  authors: [{ name: 'Joseph Andrew Lee', url: 'https://xmrt.io' }],
  creator: 'XMRT Team',
  publisher: 'XMRT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://xmrt.io'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xmrt.io',
    title: 'XMRT Ecosystem V3',
    description: 'Decentralized Monero-based ecosystem with AI governance',
    siteName: 'XMRT Ecosystem',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'XMRT Ecosystem V3',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XMRT Ecosystem V3',
    description: 'Decentralized Monero-based ecosystem with AI governance',
    images: ['/images/twitter-image.png'],
    creator: '@XMRT_io',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white dark:bg-dark-bg">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
