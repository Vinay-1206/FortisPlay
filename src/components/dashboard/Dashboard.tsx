'use client'

import { LiveEventsView } from '@/components/dashboard/LiveEventsView';
import { CardTableSkeleton } from '@/components/ui/Skeleton';
import { GROUPS } from '@/data/DummyData';
import { Suspense } from 'react';
import Testing from './Testing';

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
            <Suspense fallback={<DashboardSkeleton />}>
                <LiveEventsView groups={groups} />
            </Suspense>
        </div>
    );
}