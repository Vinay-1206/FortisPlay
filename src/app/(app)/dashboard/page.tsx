import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CardTableSkeleton } from '@/components/ui/Skeleton';
import { LiveEventsView } from '@/components/dashboard/LiveEventsView';
import { getLiveEvents } from '@/services/events';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Control Center', href: '/dashboard' }, { label: 'Dashboard', href: '/dashboard' }]} />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}

async function DashboardContent() { 
  const groups = await getLiveEvents();
  return <LiveEventsView groups={groups} />;
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <CardTableSkeleton rows={3} cols={8} />
      <CardTableSkeleton rows={3} cols={8} />
      <CardTableSkeleton rows={3} cols={8} />
    </div>
  );
}
