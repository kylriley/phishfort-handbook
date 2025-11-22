'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { navigation, NavItem } from '@/lib/navigation';

interface Heading {
  title: string;
  id: string;
}

function NavItemComponent({ item, depth = 0, pageHeadings }: { item: NavItem; depth?: number; pageHeadings?: Heading[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.href;
  const isParentActive = item.children?.some(child => pathname === child.href);
  
  // Show headings if this is the active page and has headings
  const showHeadings = isActive && pageHeadings && pageHeadings.length > 0;

  const paddingLeft = depth * 16 + 12;

  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between py-2 px-3 text-left text-sm font-medium rounded-lg transition-all duration-200 ${
            isParentActive
              ? 'text-primary-600 bg-primary-50 shadow-sm border border-primary-100'
              : 'text-gray-700 hover:bg-white hover:shadow-sm hover:border-gray-100 border border-transparent'
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
              <NavItemComponent key={index} item={child} depth={depth + 1} pageHeadings={pageHeadings} />
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
    <>
      <Link
        href={item.href}
        className={`block py-2 px-3 text-sm rounded-lg transition-all duration-200 no-underline ${
          isActive
            ? 'bg-primary-500 text-white font-medium shadow-md'
            : 'text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm border border-transparent hover:border-gray-100'
        }`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {item.title}
      </Link>
      {showHeadings && (
        <div className="mt-1 space-y-0.5 ml-2">
          {pageHeadings.map((heading, index) => (
            <Link
              key={index}
              href={`${item.href}#${heading.id}`}
              className="block py-1.5 px-3 text-xs text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors no-underline"
              style={{ paddingLeft: `${paddingLeft + 8}px` }}
            >
              {heading.title}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [pageHeadings, setPageHeadings] = useState<Heading[]>([]);
  const pathname = usePathname();

  // Extract headings from the current page
  useEffect(() => {
    // Wait for the page to render, then extract h2 headings
    const timer = setTimeout(() => {
      const headings: Heading[] = [];
      const h2Elements = document.querySelectorAll('main h2');
      
      h2Elements.forEach((h2) => {
        const text = h2.textContent?.trim() || '';
        // Get ID from the element (either from id attribute or generate from text)
        let id = h2.id;
        if (!id) {
          // Generate ID from text content
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
          // Set the ID on the element for future reference
          h2.id = id;
        }
        
        if (text) {
          headings.push({ title: text, id });
        }
      });
      
      setPageHeadings(headings);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-primary-600"
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
          className="lg:hidden fixed inset-0 bg-primary-900/50 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative left-0 top-0 h-screen lg:h-auto lg:min-h-full lg:self-stretch w-64 bg-slate-50 border-r border-gray-200
          overflow-y-auto z-20 transition-transform lg:flex-shrink-0 shadow-sm
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 pt-20 lg:pt-6 pb-6">
          <nav className="space-y-1">
            {navigation.map((item, index) => (
              <NavItemComponent key={index} item={item} pageHeadings={pageHeadings} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
