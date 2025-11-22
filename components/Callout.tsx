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
      container: 'bg-primary-50 border-primary-400 text-primary-900',
      iconBg: 'bg-primary-100',
      icon: (
        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Note'
    },
    warning: {
      container: 'bg-amber-50 border-amber-400 text-amber-900',
      iconBg: 'bg-amber-100',
      icon: (
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: 'Warning'
    },
    danger: {
      container: 'bg-red-50 border-red-400 text-red-900',
      iconBg: 'bg-red-100',
      icon: (
        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Important'
    },
    tip: {
      container: 'bg-emerald-50 border-emerald-400 text-emerald-900',
      iconBg: 'bg-emerald-100',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Tip'
    },
    check: {
      container: 'bg-slate-50 border-slate-400 text-slate-900',
      iconBg: 'bg-slate-100',
      icon: (
        <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Requirements'
    }
  };

  const style = styles[validType];

  return (
    <div className={`border-l-4 p-4 my-4 rounded-lg shadow-sm ${style.container}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${style.iconBg} flex-shrink-0`}>
          {style.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold mb-1">{style.title}</div>
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
