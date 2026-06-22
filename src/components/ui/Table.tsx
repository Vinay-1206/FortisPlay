import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/** Horizontally scrollable wrapper so wide tables behave on mobile. */
export function TableContainer({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('w-full overflow-x-auto border border-[#EAEEF2] p-2', className)} {...props}>
      <table className="w-full min-w-max border-collapse text-sm">{children}</table>
    </div>
  );
}

export function TableHead({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('bg-[#2563FF]/[0.08]', className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn('divide-y divide-surface-muted', className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className, children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn('transition-colors hover:bg-surface-subtle/60', className)} {...props}>
      {children}
    </tr>
  );
}

export function Th({
  className,
  children,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope="col"
      className={cn(
        `
        h-10
        bg-[#2563FF]/[0.08]
        px-5
        text-left
        text-[12px]
        font-semibold
        uppercase
        tracking-wide
        text-[#5B6475]
        `,
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function Td({ className, children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('whitespace-nowrap px-4 py-3 text-ink-900', className)} {...props}>
      {children}
    </td>
  );
}
