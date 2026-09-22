import React from 'react';
import { Chapter, Frame, Mono, PageFoot, PageHeader, Rules, Table } from '../chrome';
import { BREAKPOINTS } from '../theme';
import { computed, variable } from '../live';
import { family, uses } from '../census';

/**
 * The three widths the system names, and what each is for. Anything else the
 * census finds is shown as undecided — mostly figure layouts inside case
 * studies, which are composition and have not been given names.
 */
const MEASURE: Record<string, string> = {
    'max-w-measure': 'Running text. 32em: about 66 characters at any size.',
    'max-w-page': 'The homepage section, and the case-study column.',
    'max-w-shell': 'The wide case-study frame.',
};

/**
 * The fixed relationships. Dense but breathable: things that belong together
 * sit close, and the gap between groups does the separating.
 */
const RHYTHM: [string, string, string][] = [
    ['Name → role, a stacked pair', '0', 'they read as one unit; ink separates them'],
    ['Label → value', 'mt-1', '4px'],
    ['Ordinal → title', 'mt-2', '8px'],
    ['Title → lead sentence', 'mt-4', '16px'],
    ['Paragraph → paragraph', 'space-y-4', '16px'],
    ['Rule → what it heads', 'pt-4', '16px'],
    ['Heading → the list under it', 'mb-6 / mb-8', '24–32px'],
    ['Lead → metadata rule', 'mt-8', '32px'],
    ['Back link → page title', 'mb-10', '40px'],
    ['Section → section', 'space-y-16 md:space-y-20', '64 / 80px'],
];

/** The spacing families that carry the site's vertical rhythm. */
const FAMILIES = ['gap-', 'space-y-', 'mt-', 'mb-', 'py-', 'px-', 'pt-', 'pb-'];

const step = (className: string): string => {
    const raw = className.split('-').pop() ?? '';
    const base = parseFloat(variable('--spacing') || '0.25') * 16;
    const multiplier = Number(raw);
    return Number.isFinite(multiplier) ? `${multiplier * base}px` : '—';
};

const useActiveBreakpoints = (): Set<string> => {
    const [active, setActive] = React.useState<Set<string>>(new Set());

    React.useEffect(() => {
        const queries = BREAKPOINTS.map(({ name, value }) => ({
            name,
            query: window.matchMedia(`(min-width: ${value})`),
        }));
        const read = () =>
            setActive(new Set(queries.filter((q) => q.query.matches).map((q) => q.name)));

        read();
        queries.forEach(({ query }) => query.addEventListener('change', read));
        return () => queries.forEach(({ query }) => query.removeEventListener('change', read));
    }, []);

    return active;
};

const Space: React.FC = () => {
    const active = useActiveBreakpoints();

    // Every class the census finds is a class the site uses, which is exactly
    // the condition for Tailwind having generated it — so `computed` can always
    // resolve the width.
    const measures = family('max-w-')
        .filter(({ className }) => className !== 'max-w-full' && className !== 'max-w-none')
        .map(({ className, count }) => ({
            className,
            count,
            width: computed(className, 'max-width'),
            role: MEASURE[className],
        }))
        .sort((a, b) => Number(!!b.role) - Number(!!a.role) || b.count - a.count);

    const steps = FAMILIES.flatMap((prefix) => family(prefix))
        .filter(({ className }) => /-\d+(\.\d+)?$/.test(className))
        .sort((a, b) => b.count - a.count);
    const offGrid = steps.filter(({ className }) => parseFloat(step(className)) % 4 !== 0);

    return (
        <>
            <PageHeader
                crumb="Foundations"
                title="Space"
                lede="A 4px grid. Every gap, pad and margin, and every line height but display’s, is a whole multiple of 4, so text blocks stack on one rhythm. Compact on purpose: proximity does the grouping, and the space between groups does the separating."
            />

            <Chapter
                id="rhythm"
                title="Rhythm"
                lede="Fixed relationships between things that always sit together. A page that needs a different gap is usually a page that needs a different block."
            >
                <Table
                    columns={['Pair', 'Class', 'Distance']}
                    rows={RHYTHM.map(([pair, className, distance]) => [
                        pair,
                        <Mono bright>{className}</Mono>,
                        <Mono>{distance}</Mono>,
                    ])}
                />
            </Chapter>

            <Chapter
                id="rules"
                title="Rules take no space"
                lede="A 1px border adds a pixel to its box and pushes everything under it off the grid. A divider is drawn with rule-t, rule-b or rule-y instead — an inset line that occupies nothing. A border is kept for the edge of an object: a frame, a control."
            >
                <Frame>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="rule-t pt-4">
                            <span className="block text-label text-ink-secondary">rule-t</span>
                            <span className="mt-1 block text-small text-ink">
                                A divider. The text below it stays on the grid.
                            </span>
                        </div>
                        <div className="rounded-md border border-edge p-4">
                            <span className="block text-label text-ink-secondary">border</span>
                            <span className="mt-1 block text-small text-ink">
                                An object’s edge. It is part of the object.
                            </span>
                        </div>
                    </div>
                </Frame>
                <p className="mt-4 text-small text-ink">
                    <span className="font-mono text-data text-ink">
                        {uses('rule-t') + uses('rule-b') + uses('rule-y')}
                    </span>{' '}
                    hairline rules in the site today.
                </p>
            </Chapter>

            <Chapter
                id="scale"
                title="The scale in use"
                lede="Every spacing class in the source, counted. A short list is the point."
            >
                <Table
                    columns={['Class', 'Value', 'Uses']}
                    rows={steps
                        .slice(0, 16)
                        .map(({ className, count }) => [
                            <Mono bright>{className}</Mono>,
                            <Mono>{step(className)}</Mono>,
                            <Mono>{count}</Mono>,
                        ])}
                />
                <p className="mt-4 max-w-measure text-small text-ink-secondary">
                    {offGrid.length === 0
                        ? 'Every spacing class in the source is a whole multiple of 4.'
                        : `Off the 4px grid: ${offGrid.map(({ className }) => className).join(', ')}. Each is an optical correction and should say so where it is used.`}
                </p>
            </Chapter>

            <Chapter
                id="measure"
                title="Measure"
                lede="Widths are set by what they hold. Three are named. The others in the source are figure layouts inside case studies, marked so they stay visible until they are decided."
            >
                <Table
                    columns={['Class', 'Width', 'Uses', 'Role']}
                    rows={measures.map(({ className, width, count, role }) => [
                        <Mono bright>{className}</Mono>,
                        <Mono>{width}</Mono>,
                        <Mono>{count}</Mono>,
                        role ?? (
                            <span className="text-ink-secondary">
                                Undecided — used in a figure layout, never named.
                            </span>
                        ),
                    ])}
                />
                <p className="mt-4 max-w-measure text-small text-ink-secondary">
                    Prose never runs wider than <Mono>max-w-measure</Mono>. It is set in em, so
                    smaller type gets a narrower column without a second decision.
                </p>
            </Chapter>

            <Chapter
                id="breakpoints"
                title="Breakpoints"
                lede="Read from the @theme block itself, since Tailwind compiles them into media queries and never emits them as variables. The live column follows this window."
            >
                <Table
                    columns={['Name', 'Value', 'What changes', 'Now']}
                    rows={BREAKPOINTS.map(({ name, value }) => [
                        <Mono bright>{name}</Mono>,
                        <Mono>{value}</Mono>,
                        name === 'md'
                            ? 'Content splits into two or three columns inside a block. Gutters widen.'
                            : name === 'lg'
                              ? 'Case-study grids and the fixed section navigator switch on.'
                              : 'Case-study gutters become symmetric.',
                        active.has(name) ? (
                            <span className="flex items-center gap-2 font-mono text-data text-ink">
                                <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                                active
                            </span>
                        ) : (
                            <Mono>—</Mono>
                        ),
                    ])}
                />
            </Chapter>

            <Chapter id="principles" title="Rules">
                <Rules
                    items={[
                        <>
                            Gap over margin. Reach for <Mono>flex</Mono> or <Mono>grid</Mono> with a{' '}
                            <Mono>gap</Mono> before adding margins to children.
                        </>,
                        'Every distance is a whole multiple of 4. An exception is an optical correction and says so in a comment.',
                        'Align to edges and baselines, not to guesses. Two things on one line share a baseline; open content has no padding that would pull it off the column edge.',
                        'Mobile drops one step. It does not halve.',
                    ]}
                />
            </Chapter>

            <PageFoot path="/design/space" />
        </>
    );
};

export default Space;
