/** The two headings the homepage groups work under, in display order. */
export const GROUPS = ['Client work', 'Experience'] as const;
export type Group = (typeof GROUPS)[number];

/**
 * The project index. This is metadata only: every case study's prose lives in
 * its own component under case-studies/studies/. Adding a project means one
 * entry here, one study file, and one folder under assets/.
 */
export interface Project {
    id: string;
    title: string;
    group: Group;
    /** The card's first line: how the work happened, and in what role. */
    relationship: string;
    yearOrStatus: string;
    /** The card's second line: the clearest outcome, in one sentence. */
    summary: string;
    /** Alt text for the card image; the image itself is in assets/covers.ts. */
    coverAlt: string;
    /** Blurs the card image behind an "ask on a call" overlay. */
    confidential?: boolean;
}

export const PROJECTS: Project[] = [
    {
        id: 'ofk',
        title: 'OFK Construction',
        group: 'Client work',
        relationship: 'Client project · Product designer',
        yearOrStatus: '2026',
        summary: 'A bilingual brand and website that makes an established construction record verifiable in one visit.',
        coverAlt: 'OFK Construction homepage',
    },
    {
        id: 'sinerjik',
        title: 'Sinerjik',
        group: 'Client work',
        relationship: 'Client project · UX/UI designer',
        yearOrStatus: '2026',
        summary: 'A sales website used in four pitches, with one becoming a signed client.',
        coverAlt: 'Sinerjik homepage and warehouse demonstration',
    },
    {
        id: 'dog-and-ride',
        title: 'Dog & Ride',
        group: 'Client work',
        relationship: 'Client project · Multidisciplinary designer',
        yearOrStatus: '2025',
        summary: 'One connected brand, website, and sales story for a new way to travel with dogs.',
        coverAlt: 'Dog & Ride homepage',
    },
    {
        id: 'adclusive',
        title: 'Adclusive',
        group: 'Experience',
        relationship: 'Long-term engagement · Product designer',
        yearOrStatus: '2021 – 2024',
        summary: 'A multi-role platform bringing campaigns, tracking, performance, and finance into one system.',
        coverAlt: 'Adclusive platform cover',
    },
    {
        id: 'mckinsey',
        title: 'McKinsey & Co.',
        group: 'Experience',
        relationship: 'Employment · Visual communication specialist',
        yearOrStatus: '2021 – 2024',
        summary: 'High-stakes visual communication shaped from complex models, under strict NDA.',
        coverAlt: 'McKinsey & Company confidential work cover',
        confidential: true,
    },
];
