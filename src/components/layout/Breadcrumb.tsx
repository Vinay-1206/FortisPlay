import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { NavItem } from '@/types';

/** "Control Center > Dashboard" style breadcrumb trail. */
export function Breadcrumb({ items }: { items: NavItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3">
      <ol className="flex items-center gap-1.5 text-xs text-ink-500">
        {items.map((item, i) => (
          // Use index as key — href values can be identical (e.g. both "/dashboard")
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
            {i === items.length - 1 ? (
              <span className="font-medium text-ink-700" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-ink-700">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}