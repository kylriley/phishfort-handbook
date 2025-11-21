import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { Search } from '@/components/Search'

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
    <html lang="en">
      <body>
        <div className="h-screen flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-blue-600 text-white py-4 px-6 z-50 shadow-md flex-shrink-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <h1 className="text-2xl font-bold m-0 whitespace-nowrap">PhishFort Handbook</h1>
              <div className="w-full max-w-md">
                <Search />
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
