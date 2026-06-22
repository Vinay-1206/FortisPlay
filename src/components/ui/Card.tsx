import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export function Card({
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-[#0F172A]/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-[69px] items-center justify-between border-b border-[#EAEEF2] px-5 py-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        'text-[22px] font-semibold text-[#1F2937]',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}