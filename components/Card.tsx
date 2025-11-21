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
    <Link href={safeHref} className="no-underline">
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">
          {title || 'Untitled'}
        </h3>
        {children && (
          <div className="text-gray-600 text-sm">
            {children}
          </div>
        )}
      </div>
    </Link>
  );
}
