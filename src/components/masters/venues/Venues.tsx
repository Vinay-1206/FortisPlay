'use client'
import { Suspense, useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { VenuesTable } from '@/components/masters/VenuesTable';
import { CardTableSkeleton } from '@/components/ui/Skeleton';
import { VENUES } from '@/data/DummyData';
import DistributionsTable from '@/components/masters/Distributions/DistributionsTable';
import { cn } from '@/lib/utils';
import PoolsTable from '../pools/PoolsTable';

const MASTER_TABS = ['Venues', 'Pools', 'LS Prize', 'Distributions', 'Enclosures', 'Terminals', 'Users', 'Users KYC', 'Locations'] as const;

export default function VenuesPage() {
  const [activeTab, setActiveTab] = useState('Venues')
  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Masters', href: '/masters' }]} />
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-ink-900">Masters</h1>
      <div className="flex flex-wrap items-center gap-1 rounded-xl bg-surface-subtle p-1">
        {MASTER_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              activeTab === tab ? 'bg-ink-900 text-white' : 'text-ink-700 hover:bg-white',
            )}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <Suspense fallback={<CardTableSkeleton rows={5} cols={6} />}>
        {activeTab === 'Venues' && <VenuesContent />}
        {activeTab === 'Distributions' && <DistributionsContent />}
        {activeTab === 'Pools' && <PoolsContent />}
      </Suspense>
    </div>
  );
}

function VenuesContent() {
  const venues = VENUES;
  return <VenuesTable venues={venues} />;
}

function DistributionsContent() {
  // const distributions = DISTRIBUTIONS;
  return <DistributionsTable />;
}

function PoolsContent() {
  // const pools = POOLS;
  return <PoolsTable />;
}

