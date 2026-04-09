import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ea580c',
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Geniue Food - Fresh from Kitchen | Kukatpally',
  description: 'Order fresh, home-cooked food in Kukatpally, Hyderabad. Fast delivery via WhatsApp. Breakfast, Lunch, Dinner & Snacks.',
  generator: 'v0.app',
  keywords: ['food delivery', 'Kukatpally', 'Hyderabad', 'home cooked food', 'biryani', 'thali'],
  openGraph: {
    title: 'Geniue Food - Fresh from Kitchen',
    description: 'Order fresh, home-cooked food in Kukatpally, Hyderabad',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased overscroll-none">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
