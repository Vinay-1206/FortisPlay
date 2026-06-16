import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/** Base shimmering placeholder block. */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-surface-muted',
        className,
      )}
      {...props}
    />
  );
}

/** Skeleton matching the shape of an event group card (title + table rows). */
export function CardTableSkeleton({ rows = 3, cols = 8 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-xl border border-surface-muted bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-9 w-36 rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-2">
            <Skeleton className="h-9 w-32 flex-shrink-0" />
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-9 w-16 flex-shrink-0" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Skeleton row for generic data tables. */
export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, c) => (
        <td key={c} className="px-4 py-3">
          <Skeleton className="h-4 w-full max-w-[8rem]" />
        </td>
      ))}
    </tr>
  );
}
