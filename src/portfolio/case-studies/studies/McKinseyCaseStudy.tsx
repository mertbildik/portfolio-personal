import React from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import type { Project } from '../../content/projects';
import BackLink from '../BackLink';
import CaseStudySectionNavigator from '../CaseStudySectionNavigator';
import { CaseStudySectionShell } from '../CaseStudyElements';
import { EASE, headerVariants, VIEWPORT_ONCE } from '../../../shared/motion';

const SECTIONS = [
    { id: 'impact', label: 'Impact', description: 'Scale and outcomes' },
    { id: 'capabilities', label: 'Capabilities', description: 'Core areas of work' },
    {
        id: 'restricted-access',
        label: 'Restricted access',
        description: 'NDA and shareable process',
    },
] as const;

const TOOLS = ['Slack', 'Microsoft 365', 'Affinity', 'think-cell'] as const;

const STATS = [
    { value: '10K+', label: 'Assets', desc: 'Slides. Charts. Templates. Systems.' },
    { value: '50+', label: 'Pitch decks', desc: 'Partner and C suite ready.' },
    { value: '5', label: 'Pitch wins', desc: 'Key pages that helped close.' },
    { value: '137', label: 'Kudos', desc: 'From consultants I worked with.' },
    { value: '10', label: 'Critical notes', desc: 'Took it. Fixed it fast.' },
    { value: '3', label: 'Major initiatives', desc: 'Big work beyond the lane.' },
    { value: '1K+', label: 'ThinkCell builds', desc: 'Hard data. Clean charts.' },
    { value: '2', label: 'Native app tests', desc: 'UI and UX feedback teams shipped.' },
] as const;

const CAPABILITIES = [
    {
        number: '01',
        title: 'Data viz',
        items: [
            'Turned messy models into charts people got fast.',
            'Built ThinkCell visuals with clean labels, scale, and logic.',
            'One slide. One takeaway. No extra lines.',
        ],
    },
    {
        number: '02',
        title: 'Executive comms',
        items: [
            'Made slides skimmable in seconds.',
            'Wrote titles that state the decision point.',
            'Kept page order tight so the story didn’t break in reviews.',
        ],
    },
    {
        number: '03',
        title: 'Pitch decks',
        items: [
            'Built high stakes pages for partner and client rooms.',
            'Shaped the flow so the “ask” was impossible to miss.',
            'Delivered key pages fast without letting quality slip.',
        ],
    },
    {
        number: '04',
        title: 'Collaboration',
        items: [
            'Joined 1 on 1 working sessions with consultants.',
            'Ran group reviews and made decisions live.',
            'Set handoff rules so decks stayed clean after I left.',
        ],
    },
    {
        number: '05',
        title: 'Visual polish',
        items: [
            'Owned the visual improvement lane week to week.',
            'Used Affinity and Photoshop for advanced fixes and rebuilds.',
            'Cleaned layout, spacing, and chart styling to a high bar.',
        ],
    },
    {
        number: '06',
        title: 'App UI and UX',
        items: [
            'Joined native app UI and UX user tests.',
            'Wrote clear feedback teams could ship.',
            'Flagged issues in flows, screens, and copy before release.',
        ],
    },
] as const;

const SHARABLE_ON_CALL = [
    'My process (how I work)',
    'The decisions behind the pages',
    'How I handle charts, story flow, and review cycles',
    'The outcomes at a high level',
] as const;

const McKinseyCaseStudy: React.FC<{ project: Project }> = ({ project }) => (
    <div className="w-full">
        <motion.header
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="mb-24 w-full md:mb-32"
        >
            <div className="mb-16 md:mb-24">
                <BackLink to="/#portfolio" ariaLabel="Back to portfolio">
                    Go back
                </BackLink>
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center rounded-md surface px-3 py-1.5">
                        <span className="text-caption text-ink-low">
                            Visual communication specialist
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-ink-low" />
                        <span className="text-caption text-ink-low">Status: Confidential</span>
                    </div>
                </div>

                <h1 className="text-display-lg text-ink-high">
                    {project.title.replace(' & Co.', '')}
                    <br />
                    <span>&amp; Company</span>
                </h1>

                <p className="max-w-xl text-body text-ink-body">
                    Translating complex financial models into intuitive narratives.
                </p>

                <div className="space-y-3">
                    <span className="block text-eyebrow text-ink-low">Tools</span>
                    <div className="flex flex-wrap gap-2">
                        {TOOLS.map((tool) => (
                            <span
                                key={tool}
                                className="rounded-md surface px-2 py-1 text-caption text-ink-low text-nowrap"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="max-w-xl whitespace-pre-line text-body-sm text-ink-low">
                    {'Work is under strict NDA. \nProcess and outcomes can be shared on a call.'}
                </p>
            </div>
        </motion.header>

        <CaseStudySectionNavigator sections={SECTIONS} pageKey={project.id} />

        <div className="space-y-24 md:space-y-32">
            <CaseStudySectionShell id="impact">
                <h2 className="mb-12 text-display-md text-ink-high">Impact &amp; metrics</h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT_ONCE}
                            transition={{ duration: 0.8, delay: index * 0.05, ease: EASE }}
                            className="flex min-h-[180px] flex-col items-start p-6 text-left"
                        >
                            <span className="block font-mono text-display-md text-ink-high">
                                {stat.value}
                            </span>
                            <div className="mt-6 flex flex-col items-start gap-2">
                                <span className="block text-eyebrow text-ink-low">
                                    {stat.label}
                                </span>
                                <p className="text-body-sm text-ink-body">{stat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CaseStudySectionShell>

            <CaseStudySectionShell id="capabilities">
                <h2 className="mb-12 text-display-md text-ink-high">Core capabilities</h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {CAPABILITIES.map((capability, index) => (
                        <motion.div
                            key={capability.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT_ONCE}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
                            className="flex min-h-[320px] flex-col gap-8 p-8 md:p-10"
                        >
                            <h3 className="text-card-title text-ink-high">
                                <span className="font-mono">{capability.number}</span> /{' '}
                                {capability.title}
                            </h3>
                            <ul className="flex flex-col gap-4">
                                {capability.items.map((item) => (
                                    <li key={item} className="text-body-sm text-ink-body">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </CaseStudySectionShell>

            <CaseStudySectionShell id="restricted-access">
                <div className="surface overflow-hidden rounded-md">
                    <div className="grid grid-cols-1 gap-12 p-8 md:grid-cols-2 md:p-12">
                        <div className="flex flex-col justify-between gap-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3 text-ink-low">
                                    <Lock size={20} strokeWidth={1.5} />
                                    <h2 className="text-display-md text-ink-high">
                                        Restricted access
                                    </h2>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-headline text-ink-high">
                                        Client work is protected by NDA.
                                    </h3>
                                    <p className="text-body text-ink-body">
                                        I can’t share decks, screenshots, or client-specific
                                        materials.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-eyebrow text-ink-low">Active status</span>
                                <span className="text-caption text-ink-low">Confidential</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <span className="mb-8 block text-eyebrow text-ink-low">
                                What I can share on a call:
                            </span>
                            <ul className="flex flex-col gap-4">
                                {SHARABLE_ON_CALL.map((item) => (
                                    <li key={item} className="flex items-start gap-4">
                                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ink-body" />
                                        <span className="text-body-sm text-ink-body">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </CaseStudySectionShell>
        </div>
    </div>
);

export default McKinseyCaseStudy;
