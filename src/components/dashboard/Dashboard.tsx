'use client'

import { LiveEventsView } from '@/components/dashboard/LiveEventsView';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CardTableSkeleton } from '@/components/ui/Skeleton';
import { GROUPS } from '@/data/DummyData';
import { Suspense } from 'react';

function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <CardTableSkeleton rows={3} cols={8} />
            <CardTableSkeleton rows={3} cols={8} />
            <CardTableSkeleton rows={3} cols={8} />
        </div>
    );
}

export default function DashboardPage() {
    const groups = GROUPS;

    return (
        <div>
            <Breadcrumb items={[{ label: 'Control Center', href: '/dashboard' }, { label: 'Dashboard', href: '/dashboard' }]} />
            <Suspense fallback={<DashboardSkeleton />}>
                <LiveEventsView groups={groups} />
            </Suspense>
        </div>
    );
}
