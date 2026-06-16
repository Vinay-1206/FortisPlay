import { Badge } from '@/components/ui/Badge';
import { TableContainer, TableHead, TableBody, TableRow, Th, Td } from '@/components/ui/Table';
import type { EventGroup } from '@/types';

/**
 * Renders the schedule grid for a single event group (Horse Racing,
 * Karambola, Lucky Sign): a venue/meeting column followed by N
 * race/draw columns, each showing a time pill colored by status.
 */
export function EventScheduleTable({ group }: { group: EventGroup }) {
  const firstColumnLabel = group.id === 'horse-racing' ? 'VENUE' : 'MEETING';

  return (
    <TableContainer className="scrollbar-thin">
      <TableHead>
        <TableRow>
          <Th className="sticky left-0 z-10 bg-surface-subtle">{firstColumnLabel}</Th>
          {group.columns.map((col) => (
            <Th key={col} className="text-center">
              {col}
            </Th>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {group.rows.map((row) => (
          <TableRow key={row.id}>
            <Td className="sticky left-0 z-10 bg-white font-medium">{row.venue}</Td>
            {group.columns.map((col, i) => {
              const slot = row.slots[i];
              return (
                <Td key={col} className="text-center">
                  {slot && slot.time ? (
                    <Badge status={slot.status}>{slot.time}</Badge>
                  ) : (
                    <span className="text-ink-300">-</span>
                  )}
                </Td>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
