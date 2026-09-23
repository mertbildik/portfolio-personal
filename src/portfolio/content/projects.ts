/**
 * The project index: metadata only, no prose.
 *
 * The Playwright suite imports this file in plain Node, which cannot resolve
 * images, so it must stay free of asset imports. Covers are bound in
 * assets/covers.ts instead.
 */

/** The two headings the homepage groups work under, in display order. */
export const GROUPS = ['Client work', 'Experience'] as const;
export type Group = (typeof GROUPS)[number];

/**
 * The shape of an index entry while it is being written.
 *
 * Consumers use `Project` below, which is this with the id narrowed to the ids
 * that actually exist. This looser version exists only to break the circularity:
 * the id union is derived from the index, so the index cannot be typed by it.
 */
interface ProjectEntry {
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

/**
 * The project index. This is metadata only: every case study's prose lives in
 * its own component under case-studies/studies/. Adding a project means one
 * entry here, one study file, and one folder under assets/.
 *
 * This file must not import anything. The Playwright suite loads it in plain
 * Node, which cannot resolve a .webp, so an import here breaks the whole suite
 * while the build and the typecheck stay green. Image bindings live in
 * assets/covers.ts for that reason.
 */
const PROJECT_INDEX = [
    {
        id: 'ofk',
        title: 'OFK Construction',
        group: 'Client work',
        relationship: 'Client project · Product designer',
        yearOrStatus: '2026',
        summary:
            'A bilingual brand and website that makes an established construction record verifiable in one visit.',
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
        summary:
            'A multi-role platform bringing campaigns, tracking, performance, and finance into one system.',
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
] as const satisfies readonly ProjectEntry[];

/**
 * Every project id that exists, derived from the index so there is only one list.
 *
 * The two registries that nothing else can check are keyed to this type: COVERS
 * in assets/covers.ts and STUDIES in case-studies/CaseStudyPage.tsx. Adding a
 * project above therefore fails `npm run typecheck` until it has both a cover
 * image and a case-study page — instead of shipping a card with a blank image,
 * or a link that bounces the visitor straight back to the work list.
 */
export type ProjectId = (typeof PROJECT_INDEX)[number]['id'];

/** An index entry as the rest of the app sees it. */
export interface Project extends Omit<ProjectEntry, 'id'> {
    id: ProjectId;
}

/**
 * The index consumers read.
 *
 * Typed as Project rather than left as the literal tuple: the literal form is a
 * union of five differently shaped objects, and only one of them carries
 * `confidential`, so reading that field off the union is an error. Ids stay
 * narrow because Project.id is ProjectId.
 */
export const PROJECTS: readonly Project[] = PROJECT_INDEX;
