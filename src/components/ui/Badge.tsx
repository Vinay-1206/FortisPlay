import { cn } from '@/lib/utils';
import type { EventStatus } from '@/types';

export interface BadgeProps {
  status: EventStatus;
  children: React.ReactNode;
  className?: string;
}

const statusStyles: Record<EventStatus, string> = {
  live: 'bg-status-live text-white',
  stopped: 'bg-status-stopped text-white',
  idle: 'bg-surface-muted text-ink-500',
};

/** Small colored pill used for race/draw time slots and legend dots. */
export function Badge({ status, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-[26px] min-w-[72px] items-center justify-center rounded-[2px] px-3 text-[12px] font-semibold leading-none',
        statusStyles[status],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small dot used in legends, e.g. "Betting in Progress" / "Betting Stopped". */
export function StatusDot({ status }: { status: EventStatus }) {
  return (
    <span
      className={cn(
        'inline-block h-2.5 w-2.5 rounded-full',
        status === 'live' && 'bg-status-live',
        status === 'stopped' && 'bg-status-stopped',
        status === 'idle' && 'bg-ink-300',
      )}
    />
  );
}
