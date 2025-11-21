import React from 'react';

interface GridProps {
  cols?: '1' | '2' | '3' | '4' | string;
  children?: React.ReactNode;
}

export function Grid({ cols = '2', children }: GridProps) {
  // Ensure cols is valid
  const validCols = (cols && ['1', '2', '3', '4'].includes(String(cols))) 
    ? String(cols) as '1' | '2' | '3' | '4'
    : '2';
  
  const gridCols = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[validCols]} gap-4 my-6`}>
      {children}
    </div>
  );
}
