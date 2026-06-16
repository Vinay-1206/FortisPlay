'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchBar } from '@/components/ui/SearchBar';
import { Logo } from './Logo';
import { Sidebar } from './Sidebar';
import { PRIMARY_NAV } from './nav-config';

/**
 * Application top bar: brand mark, global search, account menu and the
 * horizontal section tabs (Dashboard / Event Day / Masters / ...).
 * Collapses to a hamburger + drawer below the `lg` breakpoint.
 */
export function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-surface-muted bg-white">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-ml-1 rounded-lg p-2 text-ink-700 hover:bg-surface-subtle lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/dashboard" className="flex-shrink-0">
            <Logo />
          </Link>

          <div className="ml-2 hidden max-w-md flex-1 md:block">
            <SearchBar placeholder="Search operators, events, wallets, providers..." />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm font-medium text-ink-700 sm:inline">123456</span>
            <button
              type="button"
              className="flex items-center gap-1 rounded-full p-1 text-ink-700 hover:bg-surface-subtle"
              aria-label="Account menu"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-subtle">
                <User className="h-4 w-4" />
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Secondary tab navigation */}
        <nav aria-label="Sections" className="hidden border-t border-surface-muted lg:block">
          <ul className="flex items-center gap-1 px-4 py-2 sm:px-6">
            {PRIMARY_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
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

        {/* Search visible on mobile, under the brand row */}
        <div className="px-4 pb-2 md:hidden">
          <SearchBar placeholder="Search operators, events..." />
        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
