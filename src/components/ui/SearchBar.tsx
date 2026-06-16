'use client';

import { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

/** Search input with a leading magnifying-glass icon, used in the top navbar and table toolbars. */
export function SearchBar({ className, containerClassName, ...props }: SearchBarProps) {
  return (
    <div className={cn('relative w-full', containerClassName)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      <input
        type="search"
        className={cn(
          'h-10 w-full rounded-xl border border-surface-muted bg-surface-subtle pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400',
          'transition-colors duration-150 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100',
          className,
        )}
        {...props}
      />
    </div>
  );
}
