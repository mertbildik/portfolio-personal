import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { Chapter, Frame, Label, Mono, PageFoot, PageHeader, Rules, Table } from '../chrome';
import { authored } from '../theme';
import { family, uses } from '../census';

/** Every shadow utility in the source, of any flavour. The answer should stay zero. */
const SHADOWS =
    uses('shadow') +
    ['shadow-', 'drop-shadow-'].reduce(
        (total, prefix) => total + family(prefix).reduce((n, { count }) => n + count, 0),
        0,
    );

const BLOCKS: [string, string][] = [
    [
        'Work card',
        'Open text beneath one framed image. No outer fill, no lift. On a fine pointer the image settles, the relationship line swaps for the outcome and the arrow enters.',
    ],
    [
        'Chip',
        'A role or a tool on bg-raised, in ink: it is a value. No border and no hover: it is not a control.',
    ],
    [
        'Panel',
        'One raised surface holding a larger grouped layout, with a 1px top light. The McKinsey study’s restricted-access block is the only one.',
    ],
    [
        'Figure',
        'An image in a canvas-backed frame with corner marks, its caption, and its number and pixel size in mono — counted and read, never typed.',
    ],
    [
        'Circle control',
        'An edge outline beside a text label. The one control that fills on hover: ink, icon to canvas.',
    ],
    ['Pill button', 'A full-radius edge with a label. Gains the hover fill and the strong edge.'],
    ['Row', 'Open and borderless at rest. Responds through ink and a revealed icon, never a fill.'],
    [
        'Form row',
        'Aligned label and field between hairline rules. Focus lifts the label from ink-secondary to ink and reveals its marker.',
    ],
    ['Back control', 'A short rule that grows beside its label.'],
    ['Portrait', 'A full circle inside the slowly turning location ring. Not a pattern to reuse.'],
];

const STATES: [string, string][] = [
    ['Rest', 'The ink of the element’s job. No reactive fill.'],
    [
        'Hover',
        'Secondary lifts to ink. Text already at ink changes by an underline, a fill or a revealed icon, never by brightness.',
    ],
    ['Focus', 'An ink lift plus the hover fill, a revealed icon or the strong edge.'],
    ['Pressed', `A circle control scales to 0.97 for ${authored('--duration-press')}.`],
    ['Selected', 'ink on a hover fill, with an ink marker.'],
    ['Loading', 'The label changes and the whole control takes the disabled treatment.'],
    ['Disabled', 'Half opacity on the whole control and a not-allowed cursor.'],
];

const Surfaces: React.FC = () => (
    <>
        <PageHeader
            crumb="Foundations"
            title="Surfaces"
            lede="Depth from edge and fill, never from shadow. Decoration only where it states a fact: a figure’s number, its size, the corners of the evidence."
        />

        <Chapter
            id="edges"
            title="Edges and rules"
            lede="Two ways to draw a line, for two different jobs. A border is the edge of an object and belongs to it. A rule divides content and takes no space, so the rhythm below it holds."
        >
            <Table
                columns={['Use', 'Class', 'For', 'Uses']}
                rows={[
                    [
                        <span className="text-ink">Edge</span>,
                        <Mono bright>border border-edge</Mono>,
                        'Frames, controls, the portrait.',
                        <Mono>{uses('border-edge')}</Mono>,
                    ],
                    [
                        <span className="text-ink">Strong edge</span>,
                        <Mono bright>border-edge-strong</Mono>,
                        'A hovered or focused control.',
                        <Mono>{uses('border-edge-strong')}</Mono>,
                    ],
                    [
                        <span className="text-ink">Rule</span>,
                        <Mono bright>rule-t · rule-b · rule-y</Mono>,
                        'Dividers: metadata, form rows, lists.',
                        <Mono>{uses('rule-t') + uses('rule-b') + uses('rule-y')}</Mono>,
                    ],
                ]}
            />
        </Chapter>

        <Chapter
            id="elevation"
            title="Elevation"
            lede="There is none. Nothing casts a shadow and nothing lifts."
        >
            <p className="max-w-measure text-small text-ink">
                The source contains {SHADOWS} shadow utilities. <Mono>box-shadow</Mono> appears only
                inside named utilities that do not cast: the hairline rules, and the panel’s 1px top
                light — the edge of a surface catching light, which is material rather than depth.
            </p>
            <Frame className="mt-6">
                <div className="panel max-w-96 rounded-md p-4">
                    <span className="flex items-center gap-3 text-label text-ink-secondary">
                        <Lock size={16} strokeWidth={1.5} />
                        Restricted access
                    </span>
                    <p className="mt-2 text-small text-ink">
                        The panel: raised fill and the top light.
                    </p>
                </div>
            </Frame>
        </Chapter>

        <Chapter
            id="radius"
            title="Radius"
            lede="One minimal radius on boxes, a full circle on pills, dots, buttons and the portrait. Nothing sits between those two shapes."
        >
            <div className="flex flex-wrap items-end gap-6">
                <Frame className="px-6 py-6">
                    <Label>rounded-md · {authored('--radius-md')}</Label>
                    <div className="h-16 w-24 rounded-md border border-edge" />
                </Frame>
                <Frame className="px-6 py-6">
                    <Label>rounded-full</Label>
                    <div className="h-16 w-16 rounded-full border border-edge" />
                </Frame>
            </div>
        </Chapter>

        <Chapter
            id="blocks"
            title="Named blocks"
            lede="Every composed thing on the site is one of these. A new block is a decision, not a convenience."
        >
            <Table
                columns={['Block', 'Treatment']}
                rows={BLOCKS.map(([name, treatment]) => [
                    <span className="text-ink">{name}</span>,
                    treatment,
                ])}
            />
        </Chapter>

        <Chapter
            id="states"
            title="States"
            lede="Lift the whole control without flattening its hierarchy. If it is not clickable, it does not react."
        >
            <Table
                columns={['State', 'Treatment']}
                rows={STATES.map(([state, treatment]) => [
                    <span className="text-ink">{state}</span>,
                    treatment,
                ])}
            />
        </Chapter>

        <Chapter
            id="imagery"
            title="Imagery"
            lede="Screenshots, posters and one portrait, in full colour, inside a frame that matches the canvas. The figure itself is on the Components page, as a case study renders it."
        >
            <Rules
                items={[
                    'No tint, gradient, overlay, blend mode, grayscale, blur, brightness or saturate on a content image. The frame is what makes it belong.',
                    'A figure’s marks state facts: its number in the study and its pixel size. A mark that states nothing does not exist.',
                    'Every image below the first screen loads lazily.',
                    'Alt text says what the screen is — “OFK Construction homepage” — never “screenshot” or a filename.',
                    'Homepage work uses one real asset per project in an 8:5 frame. Confidential work shows verified data in the same frame, never a placeholder.',
                ]}
            />
        </Chapter>

        <Chapter
            id="icons"
            title="Icons"
            lede="lucide-react only. An icon never carries meaning alone: it sits beside a label, or inside a control with an aria-label."
        >
            <Frame>
                <div className="flex flex-wrap items-center gap-8">
                    <span className="flex items-center gap-3 text-small text-ink">
                        <ArrowUpRight size={16} />
                        <Mono>16 — beside a label</Mono>
                    </span>
                    <span className="flex items-center gap-3 text-small text-ink">
                        <ArrowUpRight size={20} />
                        <Mono>20 — inside a circle control</Mono>
                    </span>
                    <span className="flex items-center gap-3 text-small text-ink">
                        <Lock size={20} strokeWidth={1.5} />
                        <Mono>stroke 1.5 — a symbol</Mono>
                    </span>
                </div>
            </Frame>
        </Chapter>

        <PageFoot path="/design/surfaces" />
    </>
);

export default Surfaces;
