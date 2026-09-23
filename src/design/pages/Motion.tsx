import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Chapter, Frame, Label, Mono, PageFoot, PageHeader, Rules, Table } from '../chrome';
import { authored, tokensUnder } from '../theme';
import { EASE } from '../../shared/motion';
import ActionCircle from '../../shared/ActionCircle';

/** A duration token's authored value, e.g. `duration('press')` → '100ms'. */
const duration = (name: string) => authored(`--duration-${name}`);

/**
 * Everything on the site that moves, and why it is allowed to. The list is the
 * rule: a thing not on it does not move.
 */
const MOVES: [string, string, string, string][] = [
    ['Press', 'Circle control scales to 0.97', duration('press'), 'feedback'],
    ['Hover, focus', 'Ink lifts; a fill or strong edge appears', duration('state'), 'feedback'],
    ['Reveal', 'Arrow enters 4px; work card copy swaps', duration('reveal'), 'feedback'],
    ['Back control', 'Its rule grows from 32 to 48px', duration('reveal'), 'feedback'],
    ['Section navigator', 'Panel slides 8px in on hover or focus', duration('state'), 'spatial'],
    ['Form → sent', 'Crossfade, opacity only', '160 in · 100 out', 'causality'],
    ['Portrait ring', 'Turns once every 36s, linear', 'ambient', 'the one exception'],
];

const usePrefersReducedMotion = (): boolean => {
    const [reduced, setReduced] = React.useState(false);

    React.useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const read = () => setReduced(query.matches);
        read();
        query.addEventListener('change', read);
        return () => query.removeEventListener('change', read);
    }, []);

    return reduced;
};

const Motion: React.FC = () => {
    const reduced = usePrefersReducedMotion();

    return (
        <>
            <PageHeader
                crumb="Foundations"
                title="Motion"
                lede="Motion exists for feedback, causality and spatial understanding — a press, a change of state, where a panel came from. Nothing animates on arrival: a page, a section or a list is already there when you get to it."
            />

            <Chapter
                id="moves"
                title="What moves"
                lede="The complete list. Anything not on it does not move, and adding to it is a decision."
            >
                <Table
                    columns={['What', 'How', 'Duration', 'Why']}
                    rows={MOVES.map(([what, how, duration, why]) => [
                        <span className="text-ink">{what}</span>,
                        how,
                        <Mono>{duration}</Mono>,
                        <Mono>{why}</Mono>,
                    ])}
                />
            </Chapter>

            <Chapter
                id="curve"
                title="One curve"
                lede="A strong ease-out: it starts fast, so the response feels immediate, and settles slowly. It replaces Tailwind’s own ease-out, so the familiar class name means the right thing. Never ease-in; it delays the first frame."
            >
                <Table
                    columns={['Where', 'Value']}
                    rows={[
                        [<Mono bright>--ease-out</Mono>, <Mono>{authored('--ease-out')}</Mono>],
                        ...tokensUnder('--duration-').map((token) => [
                            <Mono bright>{token}</Mono>,
                            <Mono>{authored(token)}</Mono>,
                        ]),
                        [
                            <Mono bright>--default-transition-duration</Mono>,
                            <Mono>{authored('--default-transition-duration')}</Mono>,
                        ],
                        [
                            <Mono bright>EASE in shared/motion.ts</Mono>,
                            <Mono>[{EASE.join(', ')}]</Mono>,
                        ],
                    ]}
                />
                <p className="mt-4 max-w-measure text-small text-ink-secondary">
                    The curve exists twice because the two runtimes want different formats: CSS a
                    string, motion four numbers. Change one and change the other.
                </p>
            </Chapter>

            <Chapter
                id="feedback"
                title="Feedback, live"
                lede="Hover, focus and press these. On a touch screen hover does nothing, by design: Tailwind 4 applies hover styles only on devices that can hover."
            >
                <Frame>
                    <div className="flex flex-col gap-8">
                        <div>
                            <Label>Press — scale 0.97, {duration('press')}</Label>
                            <button className="group flex items-center gap-4">
                                <span className="text-label text-ink transition-colors duration-state ease-out">
                                    Send inquiry
                                </span>
                                <ActionCircle small>
                                    <ArrowRight size={18} />
                                </ActionCircle>
                            </button>
                        </div>
                        <div>
                            <Label>Ink lift — {duration('state')}</Label>
                            <a
                                href="#feedback"
                                className="text-body text-ink transition-colors duration-state ease-out"
                            >
                                Hover this line
                            </a>
                        </div>
                        <div>
                            <Label>Arrow reveal — 4px, {duration('reveal')}</Label>
                            <a
                                href="#feedback"
                                className="group inline-flex items-center gap-3 text-body text-ink transition-colors duration-state ease-out"
                            >
                                Read the case study
                                <ArrowUpRight
                                    size={16}
                                    className="-translate-x-1 opacity-0 transition-[opacity,transform] duration-reveal ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                                />
                            </a>
                        </div>
                        <div>
                            <Label>Rule grow — {duration('reveal')}</Label>
                            <a
                                href="#feedback"
                                className="group inline-flex w-fit items-center gap-3 text-ink transition-colors duration-state ease-out"
                            >
                                <span className="h-px w-8 bg-current transition-[width] duration-reveal ease-out group-hover:w-12 group-focus-visible:w-12" />
                                <span className="text-label">Go back</span>
                            </a>
                        </div>
                    </div>
                </Frame>
            </Chapter>

            <Chapter
                id="reduced"
                title="Reduced motion"
                lede='MotionConfig reducedMotion="user" in ContactSection covers what motion drives; CSS loops and transforms carry their own media query in index.css.'
            >
                <Frame>
                    <div className="flex items-center gap-3">
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${reduced ? 'bg-ok' : 'bg-ink-secondary'}`}
                        />
                        <span className="text-small text-ink">
                            This browser {reduced ? 'is asking for' : 'is not asking for'} reduced
                            motion.
                        </span>
                    </div>
                </Frame>
                <div className="mt-6">
                    <Rules
                        items={[
                            'The portrait ring stops, and nothing moves position.',
                            'Colour and opacity changes remain. They carry state.',
                        ]}
                    />
                </div>
            </Chapter>

            <Chapter id="rules" title="Rules">
                <Rules
                    items={[
                        'The more often something happens, the less it should move. Nothing moves on arrival.',
                        `Under 300ms, always. A press is ${duration('press')}, a state change ${duration('state')}, a reveal ${duration('reveal')}.`,
                        <>
                            Animate <Mono>transform</Mono> and <Mono>opacity</Mono>. The back
                            control’s rule is the one width that animates.
                        </>,
                        'Hover belongs to controls, on devices that can hover. Content carries no hover.',
                        'Routes are lazy-loaded and the fallback is empty. No spinner, skeleton or progress bar.',
                    ]}
                />
            </Chapter>

            <PageFoot path="/design/motion" />
        </>
    );
};

export default Motion;
