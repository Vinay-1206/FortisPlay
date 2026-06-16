import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { MastersTabs } from '@/components/masters/MastersTabs';
import { VenuesTable } from '@/components/masters/VenuesTable';
import { CardTableSkeleton } from '@/components/ui/Skeleton';
import { getVenues } from '@/services/venues';

export const metadata: Metadata = {
  title: 'Masters · Venues',
};

export default function MastersPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Masters', href: '/masters' }]} />
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-ink-900">Masters</h1>
      <MastersTabs />
      <Suspense fallback={<CardTableSkeleton rows={5} cols={6} />}>
        <VenuesContent />
      </Suspense>
    </div>
  );
}

async function VenuesContent() {
  const venues = await getVenues();
  return <VenuesTable venues={venues} />;
}