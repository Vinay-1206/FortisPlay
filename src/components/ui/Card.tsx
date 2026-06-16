import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

/**
 * Base surface card: white background, subtle border + shadow, 12px radius.
 * Mirrors the "Horse Racing / Karambola / Lucky Sign" group containers.
 */
export function Card({ className, noPadding, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-surface-muted bg-white shadow-card',
        !noPadding && 'p-4 sm:p-5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mb-4 flex flex-wrap items-center justify-between gap-3', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn('text-lg font-bold text-ink-900', className)} {...props}>
      {children}
    </h2>
  );
}
