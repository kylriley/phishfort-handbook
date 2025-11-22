'use client';

import { useState, useCallback } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface ClientLayoutProps {
  children: React.ReactNode;
  basePath: string;
}

export function ClientLayout({ children, basePath }: ClientLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with gradient */}
      <Header
        basePath={basePath}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 items-stretch">
        {/* Sidebar */}
        <Sidebar isMobileOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 pt-6 pb-2 md:px-6 lg:px-8 md:pt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-8 mb-4">
              {children}
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
