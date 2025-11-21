'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigation, NavItem } from '@/lib/navigation';

function NavItemComponent({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.href;
  const isParentActive = item.children?.some(child => pathname === child.href);

  const paddingLeft = depth * 16 + 12;

  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between py-2 px-3 text-left text-sm font-medium rounded-md transition-colors ${
            isParentActive ? 'text-blue-600 bg-white shadow-sm' : 'text-gray-900 hover:bg-white hover:shadow-sm'
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <span>{item.title}</span>
          <svg
            className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {isOpen && (
          <div className="mt-1 space-y-1">
            {item.children?.map((child, index) => (
              <NavItemComponent key={index} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.href === '#') {
    return null;
  }

  return (
    <Link
      href={item.href}
      className={`block py-2 px-3 text-sm rounded-md transition-colors no-underline ${
        isActive
          ? 'bg-blue-600 text-white font-medium shadow-sm'
          : 'text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-sm'
      }`}
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      {item.title}
    </Link>
  );
}

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileOpen ? (
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

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative left-0 top-0 h-full w-64 bg-gray-50 border-r border-gray-200
          overflow-y-auto z-20 transition-transform lg:flex-shrink-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 pt-20 lg:pt-6 pb-6">
          <nav className="space-y-1">
            {navigation.map((item, index) => (
              <NavItemComponent key={index} item={item} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
