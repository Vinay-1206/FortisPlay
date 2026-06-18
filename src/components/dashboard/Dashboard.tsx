'use client'

import { LiveEventsView } from '@/components/dashboard/LiveEventsView';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
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
            {/*
              FIX: Both breadcrumb items previously had href="/dashboard", so
              key={item.href} produced two identical keys ("/dashboard").
              React warns about this and may deduplicate or drop items.
              Solution: use the array index as a tiebreaker in the key so each
              <li> always has a unique identifier.
            */}
            <Breadcrumb
                items={['Control Center', 'Dashboard']}
            />

            <Suspense fallback={<DashboardSkeleton />}>
                <LiveEventsView groups={groups} />
            </Suspense>
        </div>
    );
}