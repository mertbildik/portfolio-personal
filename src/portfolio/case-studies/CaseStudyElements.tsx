import React from 'react';
import type { StaticImageData } from 'next/image';
import BackLink from './BackLink';

interface CaseStudyHeaderProps {
    title: string;
    summary: string;
    role: string;
    timeline: string;
    scope: string;
    tools: string[];
}

/**
 * The opening of a standard study. Every distance is a multiple of 4 and the
 * rule above the metadata is drawn without taking space, so the whole header
 * keeps its distances on the 4px grid: 40 to the title, 16 to the summary, 32
 * to the rule. The title's own 34px leading is the type system's one optical
 * exception, noted in index.css.
 *
 * The back link's wrapper is a flex container on purpose. BackLink is
 * inline-flex, and inside a plain block it would sit on a line box built from
 * the page's default strut, making the wrapper 23.5px tall instead of 20 and
 * pushing everything below 3.5px off the grid.
 */
export const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({
    title,
    summary,
    role,
    timeline,
    scope,
    tools,
}) => (
    <header className="mx-auto mb-16 w-full max-w-page md:mb-20">
        <div className="mb-10 flex">
            <BackLink to="/#portfolio" ariaLabel="Back to portfolio">
                Go back
            </BackLink>
        </div>

        <h1 className="text-display text-ink-large">{title}</h1>
        <p className="mt-4 max-w-measure text-body text-ink">{summary}</p>

        <div className="mt-8 grid grid-cols-1 gap-4 rule-t pt-4 md:grid-cols-3 md:gap-8">
            <div>
                <span className="block text-small text-ink-secondary">Role</span>
                <span className="mt-1 block text-small text-ink">{role}</span>
            </div>
            <div>
                <span className="block text-small text-ink-secondary">Timeline</span>
                <span className="mt-1 block font-mono text-data text-ink">{timeline}</span>
            </div>
            <div>
                <span className="block text-small text-ink-secondary">Scope</span>
                <span className="mt-1 block text-small text-ink">{scope}</span>
            </div>
        </div>

        <div className="mt-6 space-y-2">
            <span className="block text-small text-ink-secondary">Tools</span>
            <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                    <span key={tool} className="rounded-md bg-raised px-2 py-1 text-small text-ink">
                        {tool}
                    </span>
                ))}
            </div>
        </div>
    </header>
);

/** The ordinal is data, so it is mono; the title carries the section. */
export const CaseStudySectionHeading: React.FC<{ number: string; children: React.ReactNode }> = ({
    number,
    children,
}) => (
    <div className="mx-auto w-full max-w-page">
        <span className="mb-2 block font-mono text-data text-ink-secondary">{number}</span>
        <h2 className="text-title text-ink-large">{children}</h2>
    </div>
);

/**
 * Vertical rhythm between a section's heading and the blocks under it.
 *
 * `tight`   text-only sections, and Impact.
 * `default` a section carrying one or two figures.
 * `wide`    a section built from several CaseStudyDecision blocks.
 */
const RHYTHM = {
    tight: 'space-y-8',
    default: 'space-y-8 md:space-y-10',
    wide: 'space-y-12 md:space-y-16',
} as const;

interface CaseStudySectionProps {
    id: string;
    number: string;
    title: string;
    rhythm?: keyof typeof RHYTHM;
    children: React.ReactNode;
}

/**
 * The anchor offset every case-study section shares.
 *
 * Sections do not animate in: motion on this site is for feedback and state,
 * and a section arriving is neither. Studies that run the standard numbered
 * frame use CaseStudySection below; a study with its own section headings uses
 * this directly, so the anchor is still defined once.
 */
export const CaseStudySectionShell: React.FC<{
    id: string;
    className?: string;
    children: React.ReactNode;
}> = ({ id, className = '', children }) => (
    <section id={id} className={`scroll-mt-32 ${className}`}>
        {children}
    </section>
);

/** One numbered case-study section: the anchor and the heading. */
export const CaseStudySection: React.FC<CaseStudySectionProps> = ({
    id,
    number,
    title,
    rhythm = 'default',
    children,
}) => (
    <CaseStudySectionShell id={id} className={RHYTHM[rhythm]}>
        <CaseStudySectionHeading number={number}>{title}</CaseStudySectionHeading>
        {children}
    </CaseStudySectionShell>
);

/** A run of body copy inside a section, held to the page column. */
export const CaseStudyProse: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="mx-auto max-w-page space-y-4">{children}</div>
);

/**
 * One paragraph of case-study body copy.
 *
 * Every study's prose goes through here, so the measure and ink of body text
 * are set in one place rather than repeated on each paragraph. The prose
 * measure holds a line to about 70 characters.
 */
export const CaseStudyParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="max-w-measure text-body text-ink">{children}</p>
);

/** One numbered decision inside a Solution section. */
export const CaseStudyDecision: React.FC<{
    number: string;
    title: string;
    children: React.ReactNode;
}> = ({ number, title, children }) => (
    <div className="mx-auto max-w-page">
        <span className="font-mono text-data text-ink-secondary">{number}</span>
        <h3 className="mt-2 text-heading text-ink">{title}</h3>
        <div className="mt-2 space-y-4">{children}</div>
    </div>
);

interface CaseStudyImageProps {
    src: StaticImageData;
    alt: string;
    caption: string;
    className?: string;
}

/**
 * A figure that states what it is. Its number is counted by CSS in document
 * order (`.case-study` resets it, `.figure` increments it), and its size is the
 * image's own, read from the file when the site is built — so neither can be
 * typed wrong. The corner
 * marks frame the evidence; they carry no meaning beyond "this is a figure".
 */
export const CaseStudyImage: React.FC<CaseStudyImageProps> = ({
    src,
    alt,
    caption,
    className = '',
}) => (
    <figure className={`figure w-full ${className}`}>
        <div className="figure-marks relative overflow-hidden rounded-md border border-edge bg-canvas">
            <span className="figure-marks-bottom" aria-hidden="true" />
            <img
                src={src.src}
                alt={alt}
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
            />
        </div>
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="max-w-measure text-small text-ink">{caption}</span>
            <span className="font-mono text-data whitespace-nowrap text-ink-secondary">
                <span className="figure-number" />
                {` · ${src.width}×${src.height}`}
            </span>
        </figcaption>
    </figure>
);
