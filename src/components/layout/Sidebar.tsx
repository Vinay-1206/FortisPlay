'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Drawer } from '@/components/ui/Drawer';
import { Logo } from './Logo';
import { PRIMARY_NAV } from './nav-config';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Mobile navigation drawer. On larger screens the same links are rendered
 * inline by `Navbar`'s secondary tab bar, so this component is only mounted
 * (and only ever opened) below the `lg` breakpoint.
 */
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="left" title="Menu">
      <div className="mb-6">
        <Logo />
      </div>
      <nav aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {PRIMARY_NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                    active ? 'bg-ink-900 text-white' : 'text-ink-700 hover:bg-surface-subtle',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Drawer>
  );
}
