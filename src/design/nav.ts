/**
 * The map. One list, in reading order: it draws the sidebar and it decides what
 * "previous" and "next" mean at the foot of every page.
 *
 * Development only — see src/design/DesignRoute.tsx.
 */
export interface Entry {
    path: string;
    label: string;
    summary: string;
}

export interface Group {
    title: string | null;
    entries: Entry[];
}

export const NAV: Group[] = [
    {
        title: null,
        entries: [
            {
                path: '/design',
                label: 'Overview',
                summary: 'What the system is and how to read it.',
            },
        ],
    },
    {
        title: 'Foundations',
        entries: [
            {
                path: '/design/type',
                label: 'Type',
                summary: 'Eight roles on five sizes, two weights.',
            },
            {
                path: '/design/colour',
                label: 'Colour',
                summary: 'Achromatic, each ink set for its job against APCA.',
            },
            {
                path: '/design/space',
                label: 'Space',
                summary: 'The 4px grid, the rhythm, the measures.',
            },
            {
                path: '/design/surfaces',
                label: 'Surfaces',
                summary: 'Edges, rules, fills, and the named blocks.',
            },
            {
                path: '/design/motion',
                label: 'Motion',
                summary: 'Feedback and causality only; one curve.',
            },
        ],
    },
    {
        title: 'Catalogue',
        entries: [
            {
                path: '/design/components',
                label: 'Components',
                summary: 'The real components, live, on the real canvas.',
            },
        ],
    },
];

export const FLAT: Entry[] = NAV.flatMap((group) => group.entries);

export const neighbours = (path: string): { previous?: Entry; next?: Entry } => {
    const index = FLAT.findIndex((entry) => entry.path === path);
    return index === -1 ? {} : { previous: FLAT[index - 1], next: FLAT[index + 1] };
};
