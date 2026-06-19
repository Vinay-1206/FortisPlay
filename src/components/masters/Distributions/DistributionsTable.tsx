'use client'

import { useState, useMemo } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { SearchBar } from '@/components/ui/SearchBar'
import { Button } from '@/components/ui/Button'
import {
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    Th,
    Td,
} from '@/components/ui/Table'

// ─── Types ───────────────────────────────────────────────────────────────────

export type DistributionType = 'Commission' | 'Tax'
export type DistributionStatus = 'Active' | 'Inactive'

export interface Distribution {
    id: string
    distributionName: string
    distributionType: DistributionType
    salesCode: string
    percentage: number
    status: DistributionStatus
}

export interface PoolDistribution {
    poolName: string
    distributions: Distribution[]
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const VENUE_POOL_DATA: Record<string, PoolDistribution[]> = {
    KB1: [
        {
            poolName: 'Win',
            distributions: [
                { id: '1', distributionName: 'Club Commission', distributionType: 'Commission', salesCode: 'FEE_CC_PRCT', percentage: 0, status: 'Active' },
                { id: '2', distributionName: 'GST', distributionType: 'Tax', salesCode: 'TAX_BT_PRCT', percentage: 0, status: 'Active' },
                { id: '3', distributionName: 'SGST', distributionType: 'Tax', salesCode: 'TAX_SGST_PRCT', percentage: 0, status: 'Active' },
                { id: '4', distributionName: 'CGST', distributionType: 'Tax', salesCode: 'TAX_CGST_PRCT', percentage: 0, status: 'Active' },
            ],
        },
        {
            poolName: 'Second Horse Pool',
            distributions: [
                { id: '5', distributionName: 'Club Commission', distributionType: 'Commission', salesCode: 'FEE_CC_PRCT', percentage: 0, status: 'Active' },
                { id: '6', distributionName: 'GST', distributionType: 'Tax', salesCode: 'TAX_BT_PRCT', percentage: 0, status: 'Active' },
                { id: '7', distributionName: 'SGST', distributionType: 'Tax', salesCode: 'TAX_SGST_PRCT', percentage: 0, status: 'Active' },
                { id: '8', distributionName: 'CGST', distributionType: 'Tax', salesCode: 'TAX_CGST_PRCT', percentage: 0, status: 'Active' },
            ],
        },
        {
            poolName: 'Place',
            distributions: [
                { id: '9', distributionName: 'Club Commission', distributionType: 'Commission', salesCode: 'FEE_CC_PRCT', percentage: 0, status: 'Active' },
                { id: '10', distributionName: 'GST', distributionType: 'Tax', salesCode: 'TAX_BT_PRCT', percentage: 0, status: 'Active' },
                { id: '11', distributionName: 'SGST', distributionType: 'Tax', salesCode: 'TAX_SGST_PRCT', percentage: 0, status: 'Active' },
                { id: '12', distributionName: 'CGST', distributionType: 'Tax', salesCode: 'TAX_CGST_PRCT', percentage: 0, status: 'Active' },
            ],
        },
    ],
    KB2: [
        {
            poolName: 'Win',
            distributions: [
                { id: '13', distributionName: 'Club Commission', distributionType: 'Commission', salesCode: 'FEE_CC_PRCT', percentage: 5, status: 'Active' },
                { id: '14', distributionName: 'GST', distributionType: 'Tax', salesCode: 'TAX_BT_PRCT', percentage: 2, status: 'Active' },
            ],
        },
    ],
}

const VENUE_OPTIONS = Object.keys(VENUE_POOL_DATA).map((v) => ({ label: v, value: v }))

// ─── Component ────────────────────────────────────────────────────────────────

const DistributionsTable = () => {
    const [selectedVenue, setSelectedVenue] = useState('KB1')
    const [searchQuery, setSearchQuery] = useState('')

    const pools = VENUE_POOL_DATA[selectedVenue] ?? []

    const filteredPools = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        if (!q) return pools
        return pools
            .map((pool) => ({
                ...pool,
                distributions: pool.distributions.filter(
                    (d) =>
                        d.distributionName.toLowerCase().includes(q) ||
                        d.distributionType.toLowerCase().includes(q) ||
                        d.salesCode.toLowerCase().includes(q),
                ),
            }))
            .filter((pool) => pool.distributions.length > 0 || pool.poolName.toLowerCase().includes(q))
    }, [pools, searchQuery])

    return (
        <Card noPadding className="mt-4">
            {/* ── Toolbar ── */}
            <CardHeader className="mb-0 flex-wrap items-center gap-3 border-b border-surface-muted px-5 py-4">
                {/* Left: title + venue selector */}
                <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-ink-900">Distributions</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-ink-500">Venue</span>
                        <div className="relative">
                            <select
                                value={selectedVenue}
                                onChange={(e) => setSelectedVenue(e.target.value)}
                                className="h-9 appearance-none rounded-lg border border-surface-muted bg-white pl-3 pr-8 text-sm font-medium text-ink-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                            >
                                {VENUE_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <svg
                                className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400"
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right: search + create */}
                <div className="flex items-center gap-2 sm:ml-auto">
                    <SearchBar
                        placeholder="Search"
                        containerClassName="w-48 sm:w-60"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button leftIcon={<Plus className="h-4 w-4" />} size="md">
                        Create New
                    </Button>
                </div>
            </CardHeader>

            {/* ── Table ── */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-max border-collapse text-sm">
                    <thead className="bg-surface-subtle">
                        <tr>
                            <Th className="w-48">POOL NAME</Th>
                            <Th>DISTRIBUTION NAME</Th>
                            <Th>DISTRIBUTION TYPE</Th>
                            <Th>SALESCODE</Th>
                            <Th>PERCENTAGE (%)</Th>
                            <Th>STATUS</Th>
                            <Th className="text-right">ACTIONS</Th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-muted">
                        {filteredPools.map((pool) => (
                            <PoolRows
                                key={pool.poolName}
                                pool={pool}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}

// ─── Pool Rows ────────────────────────────────────────────────────────────────

function PoolRows({ pool }: { pool: PoolDistribution }) {
    const { poolName, distributions } = pool

    return (
        <>
            {distributions.map((dist, idx) => (
                <tr
                    key={dist.id}
                    className="transition-colors hover:bg-surface-subtle/60"
                >
                    {/* Pool name only on the first row of each group */}
                    {idx === 0 ? (
                        <Td
                            rowSpan={distributions.length + 1} // +1 for the "Add" footer row
                            className="align-top font-medium text-ink-900"
                        >
                            {poolName}
                        </Td>
                    ) : null}
                    <Td>{dist.distributionName}</Td>
                    <Td>{dist.distributionType}</Td>
                    <Td className="font-mono text-xs text-ink-700">{dist.salesCode}</Td>
                    <Td>{dist.percentage}</Td>
                    <Td>
                        <span
                            className={
                                dist.status === 'Active'
                                    ? 'font-medium text-ink-900'
                                    : 'font-medium text-ink-400'
                            }
                        >
                            {dist.status}
                        </span>
                    </Td>
                    <Td className="text-right">
                        <div className="flex items-center justify-end gap-1">
                            <button
                                type="button"
                                aria-label={`Edit ${dist.distributionName}`}
                                className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-surface-muted hover:text-ink-700"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                aria-label={`Delete ${dist.distributionName}`}
                                className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-red-50 hover:text-status-stopped"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </Td>
                </tr>
            ))}

            {/* "Add Distribution Type" footer row inside the pool group */}
            <tr className="border-b border-surface-muted bg-white">
                <Td colSpan={6} className="py-2 text-right">
                    <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg border border-surface-muted bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:bg-surface-subtle hover:text-ink-900"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Add Distribution Type
                    </button>
                </Td>
            </tr>
        </>
    )
}

export default DistributionsTable