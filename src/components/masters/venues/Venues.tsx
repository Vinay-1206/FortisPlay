'use client'
import { Suspense, useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { VenuesTable } from '@/components/masters/VenuesTable';
import { CardTableSkeleton } from '@/components/ui/Skeleton';
import { VENUES } from '@/data/DummyData';
import DistributionsTable from '@/components/masters/Distributions/DistributionsTable';
import { cn } from '@/lib/utils';
import PoolsTable from '../pools/PoolsTable';
import KycModalForm from '../kycModal/KycModalForm';

const MASTER_TABS = ['Venues', 'Pools', 'LS Prize', 'Distributions', 'Enclosures', 'Terminals', 'Users', 'Users KYC', 'Locations'] as const;

export default function VenuesPage() {
  const [activeTab, setActiveTab] = useState('Venues')
  return (
    <div>
      <Breadcrumb items={['Dashboard', 'Masters']} />
      <div className="mb-6 flex items-center gap-8">
        <h1 className="text-2xl font-bold text-slate-900 shrink-0">
          Masters
        </h1>

        <div className="flex items-center gap-2 overflow-x-auto">
          {MASTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                activeTab === tab
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <Suspense fallback={<CardTableSkeleton rows={5} cols={6} />}>
        {activeTab === 'Venues' && <VenuesContent />}
        {activeTab === 'Distributions' && <DistributionsContent />}
        {activeTab === 'Pools' && <PoolsContent />}
        {activeTab === 'Users KYC' && <UsersKYCContent />}
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

function UsersKYCContent() {
  return <KycModalForm open={true} onClose={() => { }} />;
}

