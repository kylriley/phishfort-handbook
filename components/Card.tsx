import React from 'react';
import Link from 'next/link'; // Or your router's Link component

interface CardProps {
  title: string;
  href: string;
  children: React.ReactNode;
}

export function Card({ title, href, children }: CardProps) {
  return (
    <Link href={href} className="no-underline">
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">
          {title}
        </h3>
        <div className="text-gray-600 text-sm">
          {children}
        </div>
      </div>
    </Link>
  );
}
