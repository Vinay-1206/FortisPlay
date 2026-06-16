import { Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EventScheduleTable } from './EventScheduleTable';
import type { EventGroup } from '@/types';

export interface EventGroupCardProps {
  group: EventGroup;
  /** Shown instead of the schedule table when there's nothing scheduled yet. */
  emptyMessage?: React.ReactNode;
  onCreate?: () => void;
}

/**
 * A single "Horse Racing" / "Karambola" / "Lucky Sign" panel: title +
 * create-action button, with either the schedule table or an empty state.
 */
export function EventGroupCard({ group, emptyMessage, onCreate }: EventGroupCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.title}</CardTitle>
        <Button size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={onCreate}>
          {group.ctaLabel}
        </Button>
      </CardHeader>

      {emptyMessage ? (
        <div className="rounded-xl border border-surface-muted bg-surface-subtle">
          <div className="border-b border-surface-muted px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500">
            {group.id === 'horse-racing' ? 'Venue' : 'Meeting'}
          </div>
          <div className="px-6 py-10 text-center text-sm text-ink-700">{emptyMessage}</div>
        </div>
      ) : (
        <EventScheduleTable group={group} />
      )}
    </Card>
  );
}
