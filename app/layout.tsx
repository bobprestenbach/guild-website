import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Providers from '@/components/Providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://thehospitalityguild.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'The Hospitality Guild — Build Better Teams. Elevate the Industry.',
    template: '%s — The Hospitality Guild',
  },
  description: 'The Hospitality Guild is the community, training, and resource hub built exclusively for hospitality managers and businesses.',
  openGraph: {
    type: 'website',
    siteName: 'The Hospitality Guild',
    title: 'The Hospitality Guild — Build Better Teams. Elevate the Industry.',
    description: 'Training, community, and resources built exclusively for hospitality managers and businesses.',
    url: baseUrl,
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Hospitality Guild',
    description: 'Training, community, and resources built exclusively for hospitality managers and businesses.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <Nav />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
