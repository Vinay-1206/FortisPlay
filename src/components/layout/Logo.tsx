import { cn } from '@/lib/utils';

/** FortisPlay hexagon "F" mark + wordmark, matches the brand in the source screenshots. */
export function Logo({ className, withWordmark = true }: { className?: string; withWordmark?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M14 2 L25 8 V20 L14 26 L3 20 V8 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M10 9 H18 M10 9 V19 M10 14 H15.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withWordmark && <span className="text-lg font-extrabold tracking-tight text-ink-900">FortisPlay</span>}
    </div>
  );
}
