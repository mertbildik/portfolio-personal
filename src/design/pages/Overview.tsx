import React from 'react';
import { Link } from 'react-router';
import { Chapter, PageFoot, PageHeader, Rules, Table } from '../chrome';
import { NAV } from '../nav';
import { TYPE_STEPS, tokensUnder } from '../theme';

const PRINCIPLES: [string, string][] = [
    [
        'Hierarchy before scale',
        'Weight, ink and space carry hierarchy; size is the last resort. A block heading is body-sized and leads with weight.',
    ],
    [
        'Dense but breathable',
        'Everything on a 4px grid. Related things sit close and the gap between groups does the separating. Dividers take no space.',
    ],
    [
        'Sans for words, mono for data',
        'Sentences and labels are Inter. Timestamps, counts, years and values are Geist Mono.',
    ],
    [
        'Legible by threshold',
        'Each ink is set for its job against APCA. Quiet stays quiet; anything meant to be read clears its threshold.',
    ],
    [
        'Motion explains, never performs',
        'Feedback, causality and spatial understanding only. Nothing animates on arrival; the portrait ring is the one ambient loop.',
    ],
];

const Overview: React.FC = () => (
    <>
        <PageHeader
            crumb="Mert Bildik"
            title="The system, live."
            lede="Every value on these pages is read: the authored ones parsed out of the @theme block in src/index.css, the painted ones measured from the browser, the counts taken from the site's own source. There is nothing here to keep in step — change index.css and reload."
        />

        <Chapter
            id="principles"
            title="Principles"
            lede="Five decisions the code already holds. Everything else follows from them."
        >
            <Table
                columns={['Principle', 'In practice']}
                rows={PRINCIPLES.map(([name, practice]) => [
                    <span className="text-ink-strong">{name}</span>,
                    practice,
                ])}
            />
        </Chapter>

        <Chapter id="map" title="The map">
            <ul className="flex flex-col">
                {NAV.flatMap((group) => group.entries)
                    .filter((entry) => entry.path !== '/design')
                    .map((entry) => (
                        <li key={entry.path}>
                            <Link
                                to={entry.path}
                                className="group grid grid-cols-1 gap-1 border-b border-edge py-5 transition-colors duration-120 ease-out focus-visible:outline-none md:grid-cols-[10rem_minmax(0,1fr)] md:gap-6"
                            >
                                <span className="text-heading text-ink-strong group-hover:text-ink-loud group-focus-visible:text-ink-loud">
                                    {entry.label}
                                </span>
                                <span className="text-small text-ink-quiet group-hover:text-ink group-focus-visible:text-ink">
                                    {entry.summary}
                                </span>
                            </Link>
                        </li>
                    ))}
            </ul>
        </Chapter>

        <Chapter
            id="derived"
            title="How this page stays true"
            lede="Three sources, all derived. A design system that is retyped is a second copy of a fact, and this repository has a rule against those."
        >
            <Table
                columns={['Source', 'Gives', 'Read by']}
                rows={[
                    [
                        <span className="text-ink-strong">src/index.css</span>,
                        <>
                            Authored token values, parsed from the <code>@theme</code> block itself
                            — currently {TYPE_STEPS.length} type steps and{' '}
                            {tokensUnder('--color-').length} colours.
                        </>,
                        <span className="font-mono text-data text-ink-quiet">design/theme.ts</span>,
                    ],
                    [
                        <span className="text-ink-strong">The browser</span>,
                        'Painted values: a translucent token composited over the canvas, and the contrast ratio that follows from it.',
                        <span className="font-mono text-data text-ink-quiet">design/live.ts</span>,
                    ],
                    [
                        <span className="text-ink-strong">src/**/*.tsx</span>,
                        'How often a class is actually used, so the pages can show the system as built rather than as intended.',
                        <span className="font-mono text-data text-ink-quiet">
                            design/census.ts
                        </span>,
                    ],
                ]}
            />
        </Chapter>

        <Chapter
            id="foundation"
            title="Foundation"
            lede="The constraints. These are not preferences; breaking one is a decision to change the system."
        >
            <Rules
                items={[
                    'Two typefaces. Inter for words, Geist Mono for data. No third face.',
                    'One canvas. Every darker or lighter one-off folds back into it.',
                    'One curve, a strong ease-out, and nothing over 300ms.',
                    'No elevation. Depth is edge and fill; the canvas atmosphere is the only gradient.',
                    'No interface accent. Green and red are status only; project imagery supplies every other colour.',
                    'No arbitrary value where a token or a 4px step already covers it. Decoration only where it states a fact.',
                ]}
            />
        </Chapter>

        <Chapter
            id="local"
            title="Why this is local only"
            lede="These pages are notes for whoever works on the site, not part of it."
        >
            <p className="max-w-2xl text-small text-ink">
                The whole <span className="font-mono text-data text-ink-quiet">src/design/</span>{' '}
                tree sits behind{' '}
                <span className="font-mono text-data text-ink-quiet">import.meta.env.DEV</span> in{' '}
                <span className="font-mono text-data text-ink-quiet">src/app/App.tsx</span>, so Vite
                removes it from the production bundle: no chunk, no route, no entry in{' '}
                <span className="font-mono text-data text-ink-quiet">sitemap.xml</span>. In a build,{' '}
                <span className="font-mono text-data text-ink-quiet">/design</span> is a 404 like
                any other unknown path. It also means these pages can read the source with{' '}
                <span className="font-mono text-data text-ink-quiet">?raw</span> imports, which
                would be dead weight in anything shipped.
            </p>
        </Chapter>

        <PageFoot path="/design" />
    </>
);

export default Overview;
