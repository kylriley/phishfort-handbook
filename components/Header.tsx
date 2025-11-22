'use client';

import Image from 'next/image';
import { Search } from './Search';

interface HeaderProps {
  basePath: string;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function Header({ basePath, isMobileMenuOpen, onToggleMobileMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-primary-800 via-primary-600 to-primary-500 text-white py-4 px-4 md:py-4 md:px-6 z-50 shadow-lg flex-shrink-0 overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden flex items-center justify-between">
        {/* Hamburger menu */}
        <button
          onClick={onToggleMobileMenu}
          className="p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Centered Logo + Text */}
        <div className="flex flex-col items-center">
          <Image
            src={`${basePath}/pf-logo.png`}
            alt="PhishFort Logo"
            width={120}
            height={40}
            className="object-contain"
          />
          <p className="text-xs text-primary-200 m-0 mt-1">Reporting Handbook</p>
        </div>

        {/* Search icon */}
        <Search />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex relative max-w-7xl mx-auto items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <Image
            src={`${basePath}/pf-logo.png`}
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
  );
}
