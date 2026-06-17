import type { Venue } from '@/types';


// Dummy Data for Live Events Dashboard
const raceColumns = Array.from({ length: 12 }, (_, i) => `RACE ${i + 1}`);
const drawColumns = Array.from({ length: 12 }, (_, i) => `DRAW ${i + 1}`);

export const GROUPS = [
    {
        id: 'horse-racing',
        title: 'Horse Racing',
        ctaLabel: 'Create Race Card',
        columns: raceColumns,
        rows: [
            {
                id: 'doomben',
                venue: 'Doomben (AUS)',
                slots: times(['10:35', '11:10', '11:45', '12:20', '12:55', '13:30', '14:01']),
            },
            {
                id: 'randwick',
                venue: 'Randwick (AUS)',
                slots: times([
                    '10:55',
                    '11:30',
                    '12:05',
                    '12:40',
                    '13:15',
                    '13:50',
                    '14:25',
                    '15:00',
                    '15:35',
                    '16:10',
                    '16:45',
                    '17:20',
                ]),
            },
            {
                id: 'yarmouth',
                venue: 'Yarmouth (UK)',
                slots: timesMixed([
                    ['18:10', 'live'],
                    ['18:40', 'live'],
                    ['19:10', 'live'],
                    ['19:40', 'live'],
                    ['20:10', 'live'],
                    ['20:40', 'live'],
                    ['21:10', 'live'],
                    ['21:40', 'live'],
                ]),
            },
        ],
    },
    {
        id: 'karambola',
        title: 'Karambola',
        ctaLabel: 'Create Meeting',
        columns: drawColumns,
        rows: [
            {
                id: 'meeting-1',
                venue: 'Meeting 1 @ 13:00',
                slots: times(['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30']),
            },
            {
                id: 'meeting-2',
                venue: 'Meeting 2 @ 15:00',
                slots: timesMixed([
                    ['15:00', 'live'],
                    ['15:05', 'live'],
                    ['15:10', 'live'],
                    ['15:15', 'live'],
                    ['15:20', 'live'],
                    ['15:25', 'live'],
                    ['15:30', 'live'],
                    ['15:35', 'live'],
                ]),
            },
            {
                id: 'meeting-3',
                venue: 'Meeting 3 @ 19:00',
                slots: timesMixed([
                    ['19:00', 'live'],
                    ['19:05', 'live'],
                    ['19:10', 'live'],
                    ['19:15', 'live'],
                    ['19:20', 'live'],
                    ['19:25', 'live'],
                    ['19:30', 'live'],
                ]),
            },
        ],
    },
    {
        id: 'lucky-sign',
        title: 'Lucky Sign',
        ctaLabel: 'Create Meeting',
        columns: drawColumns,
        rows: [
            { id: 'meeting-1', venue: 'Meeting 1 @ 13:00', slots: timesMixed([['13:35', 'live']]) },
            { id: 'meeting-2', venue: 'Meeting 2 @ 15:00', slots: timesMixed([['15:00', 'live']]) },
            { id: 'meeting-3', venue: 'Meeting 3 @ 19:00', slots: timesMixed([['19:00', 'live']]) },
        ],
    },
];

function times(values: string[]) {
    return values.map((time) => ({ label: '', time, status: 'stopped' as const }));
}

function timesMixed(values: [string, 'live' | 'stopped'][]) {
    return values.map(([time, status]) => ({ label: '', time, status }));
}


//  Dummy Data for masters

export const VENUES: Venue[] = [
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