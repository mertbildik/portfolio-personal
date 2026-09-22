import React from 'react';
import { motion } from 'motion/react';
import { headerVariants, sectionVariants, VIEWPORT_ONCE } from '../../shared/motion';
import BackLink from './BackLink';

interface CaseStudyHeaderProps {
    title: string;
    summary: string;
    role: string;
    timeline: string;
    scope: string;
    tools: string[];
}

export const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({
    title,
    summary,
    role,
    timeline,
    scope,
    tools,
}) => (
    <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto mb-24 w-full max-w-page md:mb-32"
    >
        <div className="mb-16 md:mb-24">
            <BackLink to="/#portfolio" ariaLabel="Back to portfolio">
                Go back
            </BackLink>
        </div>

        <h1 className="text-display-lg text-ink-high text-balance">{title}</h1>
        <p className="mt-8 max-w-xl text-body text-ink-body text-balance">{summary}</p>

        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-line pt-6 md:grid-cols-3 md:gap-8">
            <div>
                <span className="block text-eyebrow text-ink-low">Role</span>
                <span className="mt-2 block text-caption text-ink-body">{role}</span>
            </div>
            <div>
                <span className="block text-eyebrow text-ink-low">Timeline</span>
                <span className="mt-2 block font-mono text-caption text-ink-body">{timeline}</span>
            </div>
            <div>
                <span className="block text-eyebrow text-ink-low">Scope</span>
                <span className="mt-2 block text-caption text-ink-body">{scope}</span>
            </div>
        </div>

        <div className="mt-8 space-y-3">
            <span className="block text-eyebrow text-ink-low">Tools</span>
            <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                    <span
                        key={tool}
                        className="surface rounded-md px-2 py-1 text-caption text-ink-low"
                    >
                        {tool}
                    </span>
                ))}
            </div>
        </div>
    </motion.header>
);

export const CaseStudySectionHeading: React.FC<{ number: string; children: React.ReactNode }> = ({
    number,
    children,
}) => (
    <div className="mx-auto w-full max-w-page">
        <span className="mb-8 block font-mono text-eyebrow text-ink-low">{number}</span>
        <h2 className="text-display-md text-ink-high">{children}</h2>
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
    tight: 'space-y-10',
    default: 'space-y-10 md:space-y-14',
    wide: 'space-y-16 md:space-y-20',
} as const;

interface CaseStudySectionProps {
    id: string;
    number: string;
    title: string;
    rhythm?: keyof typeof RHYTHM;
    children: React.ReactNode;
}

/**
 * The entrance and anchor offset every case-study section shares.
 *
 * Studies that run the standard numbered frame use CaseStudySection below. A
 * study with its own section headings uses this directly, so the entrance is
 * still defined once rather than repeated at each section.
 */
export const CaseStudySectionShell: React.FC<{
    id: string;
    className?: string;
    children: React.ReactNode;
}> = ({ id, className = '', children }) => (
    <motion.section
        id={id}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className={`scroll-mt-32 ${className}`}
    >
        {children}
    </motion.section>
);

/** One numbered case-study section: the entrance, the anchor, and the heading. */
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
    <div className="mx-auto max-w-page space-y-6">{children}</div>
);

/**
 * One paragraph of case-study body copy.
 *
 * Every study's prose goes through here, so the measure and ink of body text
 * are set in one place rather than repeated on each paragraph.
 */
export const CaseStudyParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="max-w-2xl text-body text-ink-body">{children}</p>
);

/** One numbered decision inside a Solution section. */
export const CaseStudyDecision: React.FC<{
    number: string;
    title: string;
    children: React.ReactNode;
}> = ({ number, title, children }) => (
    <div className="mx-auto max-w-page">
        <span className="font-mono text-caption text-ink-low">{number}</span>
        <h3 className="mt-4 text-card-title text-ink-high">{title}</h3>
        <div className="mt-4 space-y-4">{children}</div>
    </div>
);

interface CaseStudyImageProps {
    src: string;
    alt: string;
    caption: string;
    className?: string;
}

export const CaseStudyImage: React.FC<CaseStudyImageProps> = ({
    src,
    alt,
    caption,
    className = '',
}) => (
    <figure className={`w-full ${className}`}>
        <div className="overflow-hidden rounded-md border border-line bg-canvas">
            <img
                src={src}
                alt={alt}
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
            />
        </div>
        <figcaption className="mt-4 max-w-2xl text-caption text-ink-low">{caption}</figcaption>
    </figure>
);
