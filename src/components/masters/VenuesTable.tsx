'use client';

import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/Button';
import { TableContainer, TableHead, TableBody, TableRow, Th, Td } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { AddVenueDrawer } from './AddVenueDrawer';
import type { Venue } from '@/types';

const PAGE_SIZE = 10;

export function VenuesTable({ venues }: { venues: Venue[] }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return venues;
    return venues.filter(
      (v) => v.venueCode.toLowerCase().includes(q) || v.venueName.toLowerCase().includes(q),
    );
  }, [venues, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const allSelected = paged.length > 0 && paged.every((v) => selected.has(v.id));

  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        paged.forEach((v) => next.delete(v.id));
      } else {
        paged.forEach((v) => next.add(v.id));
      }
      return next;
    });
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Venues</CardTitle>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <SearchBar
            placeholder="Search"
            containerClassName="sm:w-64"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsDrawerOpen(true)}>
            Create New
          </Button>
        </div>
      </CardHeader>

      {filtered.length === 0 ? (
        <EmptyState
          title="No venues found"
          description="Try a different search term, or create a new venue to get started."
        />
      ) : (
        <>
          <TableContainer className="scrollbar-thin">
            <TableHead>
              <TableRow>
                <Th className="w-10">
                  <input
                    type="checkbox"
                    aria-label="Select all venues on this page"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded accent-primary-500"
                  />
                </Th>
                <Th>S.NO</Th>
                <Th>VENUE CODE</Th>
                <Th>VENUE NAME</Th>
                <Th>VENUE CLASSIFICATION</Th>
                <Th>COMBINED</Th>
                <Th>STATUS</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map((venue) => (
                <TableRow key={venue.id}>
                  <Td>
                    <input
                      type="checkbox"
                      aria-label={`Select venue ${venue.venueName}`}
                      checked={selected.has(venue.id)}
                      onChange={() => toggleRow(venue.id)}
                      className="h-4 w-4 rounded accent-primary-500"
                    />
                  </Td>
                  <Td>{venue.sNo}</Td>
                  <Td>
                    <a href="#" className="font-medium text-primary-500 hover:underline">
                      {venue.venueCode}
                    </a>
                  </Td>
                  <Td>{venue.venueName}</Td>
                  <Td>{venue.venueClassification}</Td>
                  <Td>{venue.combined}</Td>
                  <Td>
                    <span
                      className={
                        venue.status === 'Active'
                          ? 'text-status-live font-medium'
                          : 'text-ink-400 font-medium'
                      }
                    >
                      {venue.status}
                    </span>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>

          <Pagination
            className="mt-4"
            page={currentPage}
            pageSize={PAGE_SIZE}
            total={filtered.length}
            onPageChange={setPage}
          />
        </>
      )}

      <AddVenueDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Card>
  );
}
