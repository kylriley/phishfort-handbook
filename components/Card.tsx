import React from 'react';
import Link from 'next/link';

interface CardProps {
  title?: string;
  href?: string;
  children?: React.ReactNode;
}

export function Card({ title = '', href = '/', children }: CardProps) {
  // Ensure href is a valid string
  const safeHref = typeof href === 'string' ? href : '/';

  return (
    <Link href={safeHref} className="no-underline group">
      <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer h-full relative overflow-hidden">
        {/* Subtle gradient accent on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-100/0 group-hover:from-primary-50/50 group-hover:to-primary-100/30 transition-all duration-300" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
              <svg className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary-700 group-hover:text-primary-800 m-0">
              {title || 'Untitled'}
            </h3>
          </div>
          {children && (
            <div className="text-gray-600 text-sm leading-relaxed">
              {children}
            </div>
          )}
          <div className="mt-4 flex items-center text-primary-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Learn more</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
