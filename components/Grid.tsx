import React from 'react';

interface GridProps {
  cols?: '1' | '2' | '3' | '4';
  children: React.ReactNode;
}

export function Grid({ cols = '2', children }: GridProps) {
  const gridCols = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[cols]} gap-4 my-6`}>
      {children}
    </div>
  );
}
