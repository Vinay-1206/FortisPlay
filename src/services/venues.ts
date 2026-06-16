import type { Venue } from '@/types';

const VENUES: Venue[] = [
  { id: '1', sNo: 1, venueCode: 'KB1', venueName: 'KB1', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '2', sNo: 2, venueCode: 'KB2', venueName: 'KB2', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '3', sNo: 3, venueCode: 'KB3', venueName: 'KB3', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '4', sNo: 4, venueCode: 'LSC', venueName: 'LSC', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '5', sNo: 5, venueCode: 'LSC36', venueName: 'LSC36', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '6', sNo: 6, venueCode: 'LSS', venueName: 'LSS', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '7', sNo: 7, venueCode: 'LSS36', venueName: 'LSS36', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '8', sNo: 8, venueCode: 'SON', venueName: 'Scone (AUS)', venueClassification: 'Major', combined: 'No', status: 'Active' },
  { id: '9', sNo: 9, venueCode: 'SBY', venueName: 'Salisbury (UK)', venueClassification: 'Major', combined: 'No', status: 'Active' },
  { id: '10', sNo: 10, venueCode: 'YAR', venueName: 'Yarmouth (UK)', venueClassification: 'Major', combined: 'No', status: 'Active' },
  { id: '11', sNo: 11, venueCode: 'DOO', venueName: 'Doomben (AUS)', venueClassification: 'Major', combined: 'No', status: 'Active' },
  { id: '12', sNo: 12, venueCode: 'KB4', venueName: 'KB4', venueClassification: 'Major', combined: 'No', status: 'Active' },
  { id: '13', sNo: 13, venueCode: 'CNO', venueName: 'Casino (AUS)', venueClassification: 'Major', combined: 'No', status: 'Active' },
  { id: '14', sNo: 14, venueCode: 'MAC', venueName: 'Mackay (AUS)', venueClassification: 'Major', combined: 'No', status: 'Active' },
  { id: '15', sNo: 15, venueCode: 'GOS', venueName: 'Gosford (AUS)', venueClassification: 'Major', combined: 'No', status: 'Active' },
];

/** Returns the full list of venues. Replace with a real API call. */
export async function getVenues(): Promise<Venue[]> {
  return VENUES;
}

/** Simple search filter used by the Masters > Venues page. */
export async function searchVenues(query: string): Promise<Venue[]> {
  const q = query.trim().toLowerCase();
  if (!q) return VENUES;
  return VENUES.filter(
    (v) => v.venueCode.toLowerCase().includes(q) || v.venueName.toLowerCase().includes(q),
  );
}
