/**
 * Shared domain types for the FortisPlay admin console.
 * Keeping these centralised avoids duplicated/incompatible
 * shapes across pages, services, and components.
 */

export type EventStatus = 'live' | 'stopped' | 'idle';

export interface RaceSlot {
  label: string; // e.g. "RACE 1" / "DRAW 1"
  time: string | null; // "10:35" or null for "-"
  status: EventStatus;
}

export interface EventRow {
  id: string;
  venue: string;
  slots: RaceSlot[];
}

export interface EventGroup {
  id: string;
  title: string; // "Horse Racing" | "Karambola" | "Lucky Sign"
  ctaLabel: string; // "Create Race Card" | "Create Meeting"
  columns: string[]; // column headers e.g. RACE 1..12 or DRAW 1..12
  rows: EventRow[];
}

export interface Venue {
  id: string;
  sNo: number;
  venueCode: string;
  venueName: string;
  venueClassification: 'Major' | 'Minor';
  combined: 'Y' | 'N' | 'No';
  status: 'Active' | 'Deactive';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SidebarTab {
  label: string;
  href: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}
