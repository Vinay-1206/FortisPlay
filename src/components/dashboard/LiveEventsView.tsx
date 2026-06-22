'use client';

import { useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { StatusDot } from '@/components/ui/Badge';
import { EventGroupCard } from './EventGroupCard';
import { MasterDataModal } from './MasterDataModal';
import type { EventGroup } from '@/types';

const TABS = ['All', 'Horse Racing', 'Karambola', 'Lucky Sign'] as const;
type Tab = (typeof TABS)[number];

export function LiveEventsView({ groups }: { groups: EventGroup[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleGroups = useMemo(() => {
    if (activeTab === 'All') return groups;
    return groups.filter((g) => g.title === activeTab);
  }, [groups, activeTab]);

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 700);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header: title, tabs, legend and refresh */}
      <div className="flex items-center justify-between min-h-12">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">
            Live Events
          </h1>
          <div className="flex items-center gap-6 h-12">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'h-6 px-4 rounded-full text-[14px] font-medium transition-all duration-200',
                  activeTab === tab
                    ? 'bg-[#1F232B] text-white'
                    : 'bg-transparent text-[#4B5563]'
                )}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm text-ink-700">
            <StatusDot status="live" /> Betting in Progress
          </span>
          <span className="flex items-center gap-1.5 text-sm text-ink-700">
            <StatusDot status="stopped" /> Betting Stopped
          </span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[8px] border-[1.5px] border-[#2563FF] text-[#2563FF]"
            leftIcon={
              <RefreshCw
                className={cn(
                  'h-4 w-4 text-[#2563FF]',
                  isRefreshing && 'animate-spin'
                )}
              />
            }
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Event group cards */}
      <div className="flex flex-col gap-4">
        {visibleGroups.map((group) => (
          <EventGroupCard key={group.id} group={group} onCreate={() => setIsModalOpen(true)} />
        ))}
      </div>

      <MasterDataModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
