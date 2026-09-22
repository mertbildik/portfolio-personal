import React from 'react';
import { Chapter, Frame, Label, Mono, PageFoot, PageHeader, Rules, Table } from '../chrome';
import { authored } from '../theme';
import { contrast, grade, lc, painted, permits } from '../live';
import { uses } from '../census';

const CANVAS = painted('var(--color-canvas)');

/** A token's painted tone, beside the token itself. */
const Swatch: React.FC<{ value: string; round?: boolean }> = ({ value, round = false }) => (
    <span
        aria-hidden="true"
        className={`inline-block h-4 w-4 shrink-0 border border-edge align-[-3px] ${
            round ? 'rounded-full' : 'rounded-md'
        }`}
        style={{ background: value }}
    />
);

/**
 * Each ink, its job, and the Lc that job needs. The target is the decision; the
 * measured value is read from the browser, so a retuned hex shows up here at once.
 */
const INK: { token: string; role: string; target: number }[] = [
    {
        token: 'ink',
        role: 'Everything read at 12–15px: body, block headings, captions, summaries, metadata values, entered values, actions.',
        target: 90,
    },
    {
        token: 'ink-large',
        role: 'Text of 20px and up: display, title, lead. The same ink, corrected for size.',
        target: 80,
    },
    {
        token: 'ink-secondary',
        role: 'Annotation: keys, group labels, ordinals, years, hints, inactive navigation. Also the focus ring.',
        target: 60,
    },
    {
        token: 'ink-faint',
        role: 'Placeholders and disabled text only. Never a sentence.',
        target: 45,
    },
];

/**
 * What each type role needs, read from APCA's size/weight table and adjusted
 * for how the text is read, beside the ink it gets. The need is the research;
 * the ink is the decision. Where the two differ, the row says why.
 */
const NEEDS: [string, string, string, string][] = [
    ['display 28/500', 'Lc 50, max 90', 'ink-large', 'Size and weight carry it.'],
    ['title 20/500', 'Lc 63', 'ink-large', 'Size and weight carry it.'],
    ['lead 20/400', 'Lc 72', 'ink-large', 'One sentence, not a column.'],
    ['heading 15/500', 'Lc 90', 'ink', 'Separates from body by weight, not brightness.'],
    [
        'body 15/400',
        'Lc 90 preferred, 100 in the table',
        'ink',
        'Past 90 near-white text blooms on black; Inter’s tall x-height reads larger than the reference font.',
    ],
    [
        'small 13/400, read',
        'Lc 85',
        'ink',
        'The hardest size on the page, so it keeps the reading ink and recedes by size and place.',
    ],
    [
        'small, label, data — glanced at',
        'Lc 75',
        'ink-secondary',
        'Deliberately under APCA: redundant with its context, and at 9.8:1 still past WCAG AAA.',
    ],
    ['placeholder', 'WCAG 4.5:1 binds', 'ink-faint', 'Must read as “not a value”.'],
];

const SURFACES: { token: string; role: string; utility: string }[] = [
    { token: 'raised', role: 'Static grouped content: chips and the panel.', utility: 'bg-raised' },
    {
        token: 'hover',
        role: 'Interaction feedback: a focused row or control.',
        utility: 'bg-hover',
    },
    { token: 'edge', role: 'Object edges, and the hairline rules.', utility: 'border-edge' },
    {
        token: 'edge-strong',
        role: 'The edge of a hovered or focused control.',
        utility: 'border-edge-strong',
    },
];

const STATUS: [string, string][] = [
    ['ok', 'Availability and confirmed success.'],
    ['danger', 'An actionable failure.'],
];

const Measured: React.FC<{ hex: string; target?: number }> = ({ hex, target }) => {
    const value = lc(hex, CANVAS);
    const met = target === undefined || value >= target;
    return (
        <span className="font-mono text-data">
            <span className={met ? 'text-ink' : 'text-danger'}>Lc {value}</span>
            <span className="text-ink-secondary"> · {permits(value)}</span>
        </span>
    );
};

const Colour: React.FC = () => (
    <>
        <PageHeader
            crumb="Foundations"
            title="Colour"
            lede="Achromatic by design: project screenshots are the only colour on the site, and they are judged against a ground with no hue of its own. Contrast is set by what text needs to be read, not by how important it is: small text needs more than large text, and on a dark ground more still."
        />

        <Chapter
            id="canvas"
            title="The canvas"
            lede="One dark ground, also used as the backing inside every image frame. There is no light palette and no theme switch."
        >
            <Frame className="canvas-atmosphere bg-canvas">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                    <span className="flex items-center gap-3">
                        <Swatch value="var(--color-canvas)" />
                        <Mono bright>canvas</Mono>
                    </span>
                    <Mono>{authored('--color-canvas')}</Mono>
                    <Mono>{uses('bg-canvas')} uses</Mono>
                </div>
                <p className="mt-4 max-w-measure text-small text-ink">
                    Two very quiet white-alpha washes sit over it — <Mono>--surface-canvas</Mono>,
                    applied through the <Mono>canvas-atmosphere</Mono> utility on one fixed layer in{' '}
                    <Mono>App.tsx</Mono>. This frame is carrying them.
                </p>
            </Frame>
        </Chapter>

        <Chapter
            id="ink"
            title="Ink"
            lede="Four inks, named by job. Brightness is not rank: a heading and its paragraph share an ink, and the type system says which is which. Colour makes two distinctions only — content from annotation, and a value from a placeholder. The measured Lc is read from the browser."
        >
            <Table
                columns={['Token', 'Hex', 'Needs', 'Measured', 'Role', 'Uses']}
                rows={INK.map(({ token, role, target }) => {
                    const hex = painted(`var(--color-${token})`);
                    return [
                        <span className="flex items-center gap-3">
                            <Swatch value={`var(--color-${token})`} />
                            <Mono bright>{token}</Mono>
                        </span>,
                        <Mono>{hex}</Mono>,
                        <Mono>Lc {target}</Mono>,
                        <Measured hex={hex} target={target} />,
                        role,
                        <Mono>{uses(`text-${token}`)}</Mono>,
                    ];
                })}
            />
            <p className="mt-4 max-w-measure text-small text-ink-secondary">
                WCAG 2 is the binding floor, and every ink clears it — ink-secondary measures{' '}
                <Mono>
                    {contrast(painted('var(--color-ink-secondary)'), CANVAS)}:1{' '}
                    {grade(contrast(painted('var(--color-ink-secondary)'), CANVAS))}
                </Mono>
                . APCA is guidance, not a standard: it was withdrawn from the WCAG 3 drafts in 2023.
                It is used here because it models what WCAG 2 does not — that size and weight change
                how much contrast text needs.
            </p>
            <Frame className="mt-6">
                <p className="text-title text-ink-large">ink-large — a title.</p>
                <p className="text-body text-ink">ink — everything a visitor reads.</p>
                <p className="text-small text-ink-secondary">ink-secondary — a key or a label.</p>
                <p className="text-body text-ink-faint">ink-faint — a placeholder.</p>
            </Frame>
            <div className="mt-6" />
            <Table
                columns={['Role', 'Needs', 'Gets', 'Why']}
                rows={NEEDS.map(([role, need, ink, why]) => [
                    <Mono bright>{role}</Mono>,
                    <Mono>{need}</Mono>,
                    <Mono bright>{ink}</Mono>,
                    why,
                ])}
            />
        </Chapter>

        <Chapter
            id="surfaces"
            title="Surfaces and edges"
            lede="Four opaque greys, each one step apart from the last so that each reads as a different thing. None of them is a colour; all of them are the canvas, lifted."
        >
            <Table
                columns={['Token', 'Hex', 'Utility', 'For', 'Uses']}
                rows={SURFACES.map(({ token, role, utility }) => [
                    <span className="flex items-center gap-3">
                        <Swatch value={`var(--color-${token})`} />
                        <Mono bright>{token}</Mono>
                    </span>,
                    <Mono>{authored(`--color-${token}`)}</Mono>,
                    <Mono>{utility}</Mono>,
                    role,
                    <Mono>{uses(utility)}</Mono>,
                ])}
            />
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <Frame>
                    <Label>raised</Label>
                    <div className="h-16 rounded-md bg-raised" />
                </Frame>
                <Frame>
                    <Label>hover</Label>
                    <div className="h-16 rounded-md bg-hover" />
                </Frame>
                <Frame>
                    <Label>edge</Label>
                    <div className="h-16 rounded-md border border-edge" />
                </Frame>
                <Frame>
                    <Label>edge-strong</Label>
                    <div className="h-16 rounded-md border border-edge-strong" />
                </Frame>
            </div>
        </Chapter>

        <Chapter
            id="status"
            title="Status"
            lede="The only chroma in the interface, and only ever a mark: a dot or an icon beside words set in ink."
        >
            <Table
                columns={['Token', 'Hex', 'Measured', 'For']}
                rows={STATUS.map(([token, role]) => {
                    const hex = painted(`var(--color-${token})`);
                    return [
                        <span className="flex items-center gap-3">
                            <Swatch value={`var(--color-${token})`} round />
                            <Mono bright>{token}</Mono>
                        </span>,
                        <Mono>{hex}</Mono>,
                        <Measured hex={hex} />,
                        role,
                    ];
                })}
            />
            <Frame className="mt-6">
                <span className="flex items-center gap-2 text-small text-ink-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                    Available for new projects
                </span>
                <p className="mt-4 flex items-center gap-2 text-small text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-danger" />
                    Sending failed. Try again, or email me directly.
                </p>
            </Frame>
        </Chapter>

        <Chapter id="rules" title="Rules">
            <Rules
                items={[
                    'No new colours. Green and red are status marks only — a dot or an icon beside words set in ink, never the words themselves.',
                    'Choose ink by how the text is read, never by rank. Read it as a sentence: ink. Glance at it to orient: ink-secondary. 20px and up: ink-large. A placeholder: ink-faint.',
                    'Nothing is brighter than ink. Hover lifts secondary to ink; a control already at ink changes by something else — an underline, a fill, an arrow.',
                    'A standalone text element declares its own ink. A link, button or grouped control may set one ink on the parent and let text and icons inherit it.',
                    'A link inside prose shares its ink, so it always carries an underline.',
                    <>
                        Keyboard focus is the ring set once in index.css. Only an input opts out,
                        with <Mono>focus:outline-none</Mono>, because its row lifts the label and
                        reveals a marker instead.
                    </>,
                ]}
            />
        </Chapter>

        <PageFoot path="/design/colour" />
    </>
);

export default Colour;
