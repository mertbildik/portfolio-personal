import React from 'react';
import { Chapter, Frame, Label, Mono, PageFoot, PageHeader, Rules, Table } from '../chrome';
import { TYPE_STEPS } from '../theme';
import { uses } from '../census';

/**
 * A line of the site's own copy per role, so a specimen shows the token doing
 * its actual job. A role with no sample here still renders — the list is driven
 * by index.css, not by this record.
 */
const SAMPLES: Record<string, string> = {
    display: 'I design & build digital products, websites, and visual experiences.',
    title: 'Selected work.',
    lead: '“Helping people spend less time clicking and more time living.”',
    heading: 'Projects became the proof',
    body: 'OFK’s reputation lived in completed projects, client relationships, photographs, and signed references.',
    small: 'A focused selection of client projects and long-term work.',
    label: 'Client work',
    data: '2026',
};

const HEADINGS = new Set(['display', 'title', 'heading']);

const SIZES = [...new Set(TYPE_STEPS.map((step) => step.size))];
const OFF_GRID = TYPE_STEPS.filter((step) => parseFloat(step.lineHeight) % 4 !== 0);

const Type: React.FC = () => (
    <>
        <PageHeader
            crumb="Foundations"
            title="Type"
            lede={`${TYPE_STEPS.length} roles on ${SIZES.length} sizes. Size marks the page and the section; below that, hierarchy comes from weight and ink, so a block heading is body-sized and leads with weight and brighter ink. One class sets size, line height, tracking and weight together.`}
        />

        <Chapter
            id="scale"
            title="The roles"
            lede="Named by job, as index.css authors them, each beside the job it does. Every size is fixed: the column never grows past its cap, so fluid type would have nothing to express."
        >
            <Frame className="px-0 py-0 md:px-0">
                {TYPE_STEPS.map((step) => (
                    <div
                        key={step.token}
                        className="grid grid-cols-1 gap-4 px-6 py-6 not-last:rule-b md:grid-cols-[14rem_minmax(0,1fr)] md:items-baseline md:gap-8 md:px-8"
                    >
                        <div className="flex flex-col gap-1">
                            <Mono bright>text-{step.token}</Mono>
                            <Mono>
                                {step.size} / {step.lineHeight} · {step.letterSpacing} ·{' '}
                                {step.weight}
                            </Mono>
                            <Mono>{uses(`text-${step.token}`)} uses</Mono>
                        </div>
                        {/* The four authored values, applied as they are authored. A
                            `text-${token}` class here would be invisible to Tailwind's
                            scanner and would only render by accident, because the site
                            happens to use the same class elsewhere. */}
                        <p
                            className={HEADINGS.has(step.token) ? 'text-ink-strong' : 'text-ink'}
                            style={{
                                fontSize: step.size,
                                lineHeight: step.lineHeight,
                                letterSpacing: step.letterSpacing,
                                fontWeight: step.weight,
                            }}
                        >
                            {SAMPLES[step.token] ?? 'The quick brown fox jumps over the lazy dog.'}
                        </p>
                    </div>
                ))}
            </Frame>
        </Chapter>

        <Chapter
            id="grid"
            title="The 4px grid"
            lede="Line heights are whole multiples of 4px, so a stack of text lands on the same grid as everything around it. The grid is a tool, not the goal: where the eye disagrees with it, the eye wins, and the exception is named."
        >
            <p className="text-small text-ink">
                <span className="font-mono text-data text-ink-strong">
                    {TYPE_STEPS.length - OFF_GRID.length} of {TYPE_STEPS.length}
                </span>{' '}
                roles are on the grid, read from index.css.
                {OFF_GRID.map((step) => (
                    <React.Fragment key={step.token}>
                        {' '}
                        <Mono bright>text-{step.token}</Mono> is not: at {step.lineHeight} its lines
                        wrap close enough to read as one statement.
                    </React.Fragment>
                ))}
            </p>
        </Chapter>

        <Chapter
            id="weight"
            title="Weight"
            lede="Two weights. Steps of 50 do not read as a difference on screen, and light text on a dark canvas already looks heavier than it is, so the second weight is 500 and no more."
        >
            <Table
                columns={['Weight', 'Where', 'Why']}
                rows={[
                    [
                        <Mono bright>400</Mono>,
                        <>
                            <Mono bright>text-lead</Mono>, <Mono bright>text-body</Mono>,{' '}
                            <Mono bright>text-small</Mono> and <Mono bright>text-data</Mono>
                        </>,
                        'Text that is read: prose, captions, values, and the key that names a value, which sits behind it.',
                    ],
                    [
                        <Mono bright>500</Mono>,
                        <>
                            <Mono bright>text-display</Mono>, <Mono bright>text-title</Mono>,{' '}
                            <Mono bright>text-heading</Mono> and <Mono bright>text-label</Mono>
                        </>,
                        'Text that names something: a page, a section, a block, a group or an action.',
                    ],
                ]}
            />
            <p className="mt-4 max-w-measure text-small text-ink-quiet">
                The weight lives in the token. A <Mono>font-*</Mono> utility beside a type class is
                the system being worked around — the source currently has{' '}
                {uses('font-semibold') + uses('font-medium') + uses('font-bold')} of them.
            </p>
        </Chapter>

        <Chapter
            id="labels"
            title="Labels and data"
            lede="A key names the value below it and sits behind it: small, quiet, 400. A value, year, time or count is data and is set in Geist Mono at 12, which Mono's width makes read level with 13px Inter. Inter never runs below 13."
        >
            <Frame>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                        <Label>Key over a word</Label>
                        <span className="block text-small text-ink-quiet">Role</span>
                        <span className="mt-1 block text-small text-ink">Product designer</span>
                    </div>
                    <div>
                        <Label>Key over data</Label>
                        <span className="block text-small text-ink-quiet">Timeline</span>
                        <span className="mt-1 block font-mono text-data text-ink">
                            Mar–Apr 2026
                        </span>
                    </div>
                </div>
            </Frame>
        </Chapter>

        <Chapter id="rules" title="Rules">
            <Rules
                items={[
                    <>
                        Use only these {TYPE_STEPS.length}. No <Mono>text-xs</Mono>, no{' '}
                        <Mono>text-2xl</Mono>, no arbitrary sizes, and no responsive size changes.
                    </>,
                    <>
                        Never add <Mono>font-*</Mono>, <Mono>leading-*</Mono> or{' '}
                        <Mono>tracking-*</Mono> to an element that already carries a token.
                    </>,
                    'Reach for ink before size. If two things need to read in order, change the ink or the weight first.',
                    'Tracking is mostly left to Inter’s optical-size axis. The two 20px steps and display add a light touch on top; nothing at 15 or below does.',
                    <>
                        Colour, <Mono>font-mono</Mono> and layout classes are set normally.
                        Interface text is sentence case.
                    </>,
                    <>
                        Headings and quotes balance their lines and paragraphs avoid a lone last
                        word, both set once in index.css. Never put <Mono>text-balance</Mono> on a
                        paragraph: it narrows the whole block.
                    </>,
                ]}
            />
        </Chapter>

        <PageFoot path="/design/type" />
    </>
);

export default Type;
