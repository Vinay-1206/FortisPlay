'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MASTERS_TABS } from '@/components/layout/nav-config';

/** Horizontally scrollable secondary tabs for the Masters section. */
export function MastersTabs() {
  const pathname = usePathname();

  return (
    <nav aria-label="Masters sections" className="-mx-1 mb-4 overflow-x-auto pb-1">
      <ul className="flex w-max items-center gap-1 px-1">
        {MASTERS_TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={cn(
                  'block whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  active ? 'bg-ink-900 text-white' : 'text-ink-700 hover:bg-surface-subtle',
                )}
                aria-current={active ? 'page' : undefined}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}