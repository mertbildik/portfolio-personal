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
        token: 'ink-loud',
        role: 'Hover, focus and active resolution; the one focal phrase.',
        target: 90,
    },
    { token: 'ink-strong', role: 'Headings, titles, entered form values.', target: 90 },
    { token: 'ink', role: 'Prose and anything a visitor came to read.', target: 75 },
    { token: 'ink-quiet', role: 'Labels, captions, metadata.', target: 45 },
    { token: 'ink-faint', role: 'Placeholders only. Never a sentence.', target: 30 },
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
            <span className={met ? 'text-ink-strong' : 'text-danger'}>Lc {value}</span>
            <span className="text-ink-quiet"> · {permits(value)}</span>
        </span>
    );
};

const Colour: React.FC = () => (
    <>
        <PageHeader
            crumb="Foundations"
            title="Colour"
            lede="Achromatic by design: project screenshots are the only colour on the site, and they are judged against a ground with no hue of its own. Each ink is set for its job against APCA, the contrast model that holds up on dark backgrounds."
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
            lede="Five steps, named by job. The target is what each job needs; the measured Lc is read from the browser. Hierarchy is carried here before size, so a heading and body text can share a size and still read in order."
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
            <p className="mt-4 max-w-measure text-small text-ink-quiet">
                WCAG 2 is still the legal floor, and every ink clears it — ink-quiet measures{' '}
                <Mono>
                    {contrast(painted('var(--color-ink-quiet)'), CANVAS)}:1{' '}
                    {grade(contrast(painted('var(--color-ink-quiet)'), CANVAS))}
                </Mono>
                . It is not the design target, because it overstates contrast near black.
            </p>
            <Frame className="mt-6">
                <p className="text-body text-ink-loud">ink-loud — what a hovered line becomes.</p>
                <p className="text-body text-ink-strong">ink-strong — headings and titles.</p>
                <p className="text-body text-ink">ink — everything a visitor came to read.</p>
                <p className="text-body text-ink-quiet">ink-quiet — labels, captions, metadata.</p>
                <p className="text-body text-ink-faint">ink-faint — a placeholder.</p>
            </Frame>
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
            lede="The only chroma in the interface. Always paired with words or a shape change, never carrying the meaning alone."
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
                <span className="flex items-center gap-2 text-small text-ink-quiet">
                    <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                    Available for new projects
                </span>
                <p className="mt-4 text-small text-danger">
                    Sending failed. Try again, or email me directly.
                </p>
            </Frame>
        </Chapter>

        <Chapter id="rules" title="Rules">
            <Rules
                items={[
                    'No new colours. Green and red are status only; everything else is the canvas, lifted.',
                    'Choose ink by job. A sentence someone should read is ink or brighter; ink-quiet is for labels and data; ink-faint is for placeholders and nothing else.',
                    'The hover target is ink-loud. It is a state, not an emphasis to borrow for a static element.',
                    'A standalone text element declares its own ink. A link, button or grouped control may set one ink on the parent and let text and icons inherit it.',
                    'Split-tone headings are allowed only where the words carry different meaning. Colour follows meaning, never a line break.',
                    <>
                        Keyboard focus is an ink lift plus a tonal shift, a revealed icon or a
                        strong edge. <Mono>focus-visible:outline-none</Mono> is only honest when
                        something else confirms the focus.
                    </>,
                ]}
            />
        </Chapter>

        <PageFoot path="/design/colour" />
    </>
);

export default Colour;
