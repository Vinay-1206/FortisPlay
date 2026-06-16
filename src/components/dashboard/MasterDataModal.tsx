'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

const REQUIRED_MASTERS = [
  'Venues',
  'Pools',
  'Distributions',
  'Users',
  'Locations',
  'Enclosures',
  'Terminals',
  'Users KYC',
];

export interface MasterDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Blocking dialog shown when an operator tries to create a race card or
 * meeting before the required master data has been configured.
 */
export function MasterDataModal({ isOpen, onClose }: MasterDataModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-status-warning/10 text-status-warning">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="text-lg font-bold text-ink-900">Master Data Required</h2>
        <p className="mt-1 text-sm text-ink-500">
          You need to create and configure the required master data before you can create race
          cards or meetings.
        </p>

        <div className="mt-5 w-full rounded-xl border border-surface-muted bg-surface-subtle p-4 text-left">
          <p className="mb-2 text-sm font-semibold text-ink-900">Please set up the following masters</p>
          <ul className="grid grid-cols-2 gap-2 text-sm text-ink-700">
            {REQUIRED_MASTERS.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-xs text-ink-500">
          Once master data is created, you'll be able to create race cards, meetings and
          scheduled events.
        </p>

        <div className="mt-6 flex w-full gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Link
            href="/masters"
            onClick={onClose}
            className="flex h-10 flex-1 items-center justify-center rounded-xl bg-primary-500 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-600"
          >
            Go to Masters
          </Link>
        </div>
      </div>
    </Modal>
  );
}
