import type { NavItem } from '@/types';

/** Primary section tabs shown in the secondary navigation bar. */
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Event Day', href: '/event-day' },
  { label: 'Masters', href: '/masters' },
  { label: 'Allotments', href: '/allotments' },
  { label: 'Reports', href: '/reports' },
];  

// /** Secondary tabs shown inside the Masters section. */
// export const MASTERS_TABS: NavItem[] = [
//   { label: 'Venues', href: '/masters' },
//   { label: 'Pools', href: '/masters/pools' },
//   { label: 'LS Prize', href: '/masters/ls-prize' },
//   { label: 'Distributions', href: '/masters/distributions' },
//   { label: 'Enclosures', href: '/masters/enclosures' },
//   { label: 'Terminals', href: '/masters/terminals' },
//   { label: 'Users', href: '/masters/users' },
//   { label: 'Users KYC', href: '/masters/users-kyc' },
//   { label: 'Locations', href: '/masters/locations' },
// ];
