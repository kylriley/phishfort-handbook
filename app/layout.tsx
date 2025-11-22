import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { Search } from '@/components/Search'
import { Footer } from '@/components/Footer'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'PhishFort Reporting Handbook',
  description: 'Guide to effective takedowns and evidence collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="min-h-screen">
        <div className="min-h-screen flex flex-col">
          {/* Header with gradient */}
          <header className="relative bg-gradient-to-r from-primary-800 via-primary-600 to-primary-500 text-white py-4 px-6 z-50 shadow-lg flex-shrink-0 overflow-hidden">
            <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* PhishFort Logo */}
                <Image
                  src="/pf-logo.png"
                  alt="PhishFort Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
                <p className="text-sm text-primary-200 m-0">Reporting Handbook</p>
              </div>
              <div className="w-full max-w-md">
                <Search />
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex flex-1 items-stretch">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-slate-50">
              <div className="max-w-4xl mx-auto px-6 pt-8 pb-2 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-4">
                  {children}
                </div>
                <Footer />
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
