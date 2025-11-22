import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ClientLayout } from '@/components/ClientLayout'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'PhishFort Reporting Handbook',
  description: 'Guide to effective takedowns and evidence collection',
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon.svg`,
  },
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="min-h-screen">
        <ClientLayout basePath={basePath}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
