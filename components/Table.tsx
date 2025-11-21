import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300">
        {children}
      </table>
    </div>
  );
}
