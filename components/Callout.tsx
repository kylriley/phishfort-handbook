import React from 'react';

interface CalloutProps {
  type?: 'note' | 'warning' | 'danger' | 'tip' | 'check';
  children: React.ReactNode;
}

export function Callout({ type = 'note', children }: CalloutProps) {
  // Ensure type is valid
  const validType = (type && ['note', 'warning', 'danger', 'tip', 'check'].includes(type)) 
    ? type 
    : 'note';
  
  const styles = {
    note: {
      container: 'bg-blue-50 border-blue-500 text-blue-900',
      icon: '💡',
      title: 'Note'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-500 text-yellow-900',
      icon: '⚠️',
      title: 'Warning'
    },
    danger: {
      container: 'bg-red-50 border-red-500 text-red-900',
      icon: '🚨',
      title: 'Danger'
    },
    tip: {
      container: 'bg-green-50 border-green-500 text-green-900',
      icon: '💡',
      title: 'Tip'
    },
    check: {
      container: 'bg-gray-50 border-gray-500 text-gray-900',
      icon: '✅',
      title: 'Requirements'
    }
  };

  const style = styles[validType];

  return (
    <div className={`border-l-4 p-4 my-4 rounded ${style.container}`}>
      <div className="flex items-start">
        <span className="text-2xl mr-3">{style.icon}</span>
        <div className="flex-1">
          <div className="font-bold mb-1">{style.title}</div>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
