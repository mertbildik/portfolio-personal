import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import SectionIntro from '../shared/SectionIntro';
import { homepageItemVariants, VIEWPORT_ONCE } from '../shared/motion';
import adclusiveCover from './assets/adclusive/cover.webp';
import dogAndRideCover from './assets/dog-and-ride/cover.webp';
import mckinseyCover from './assets/mckinsey/cover.webp';
import ofkCover from './assets/ofk/cover.webp';
import sinerjikCover from './assets/sinerjik/cover.webp';
import { PROJECTS, type Project } from './content/projects';

interface WorkCardData {
    project: Project;
    relationship: string;
    outcome: string;
    image?: {
        src: string;
        alt: string;
        treatment?: 'contain';
        confidential?: boolean;
    };
}

const project = (id: string) => PROJECTS.find((entry) => entry.id === id)!;

const GROUPS: { title: string; projects: WorkCardData[] }[] = [
    {
        title: 'Client work',
        projects: [
            {
                project: project('ofk'),
                relationship: 'Client project · Product designer',
                outcome: 'A bilingual brand and website that makes an established construction record verifiable in one visit.',
                image: { src: ofkCover, alt: 'OFK Construction homepage' },
            },
            {
                project: project('sinerjik'),
                relationship: 'Client project · UX/UI designer',
                outcome: 'A sales website used in four pitches, with one becoming a signed client.',
                image: { src: sinerjikCover, alt: 'Sinerjik homepage and warehouse demonstration' },
            },
            {
                project: project('dog-and-ride'),
                relationship: 'Client project · Multidisciplinary designer',
                outcome: 'One connected brand, website, and sales story for a new way to travel with dogs.',
                image: { src: dogAndRideCover, alt: 'Dog & Ride homepage' },
            },
        ],
    },
    {
        title: 'Experience',
        projects: [
            {
                project: project('adclusive'),
                relationship: 'Long-term engagement · Product designer',
                outcome: 'A multi-role platform bringing campaigns, tracking, performance, and finance into one system.',
                image: { src: adclusiveCover, alt: 'Adclusive platform cover' },
            },
            {
                project: project('mckinsey'),
                relationship: 'Employment · Visual communication specialist',
                outcome: 'High-stakes visual communication shaped from complex models, under strict NDA.',
                image: { src: mckinseyCover, alt: 'McKinsey & Company confidential work cover', confidential: true },
            },
        ],
    },
];

const WorkVisual: React.FC<{ card: WorkCardData }> = ({ card }) => {
    if (card.image) {
        return (
            <div className="work-card-media overflow-hidden rounded-md border border-line bg-transparent transition-colors duration-200 ease-entrance group-focus-visible:border-ink-low">
                <img
                    src={card.image.src}
                    alt={card.image.alt}
                    loading="lazy"
                    className={`work-card-image h-full w-full ${
                        card.image.treatment === 'contain'
                            ? 'object-contain p-8 md:p-12'
                            : 'object-cover object-center'
                    }`}
                />
                {card.image.confidential && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-canvas/80 opacity-0 transition-opacity duration-200 ease-entrance group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Lock size={20} strokeWidth={1.5} className="text-ink-low" />
                        <span className="font-mono text-caption text-ink-body">Confidential · ask on a call</span>
                    </div>
                )}
            </div>
        );
    }

    return null;
};

const WorkCard: React.FC<{ card: WorkCardData }> = ({ card }) => (
    <motion.article
        variants={homepageItemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
    >
        <Link
            to={`/portfolio/${card.project.id}`}
            className="work-card group block cursor-pointer rounded-md focus-visible:outline-none"
        >
            <WorkVisual card={card} />

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] gap-6 md:mt-6">
                <div className="min-w-0">
                    <h4 className="text-card-title text-ink-high transition-colors duration-200 ease-entrance group-hover:text-ink-max group-focus-visible:text-ink-max">
                        {card.project.title}
                    </h4>
                    <div className="work-card-copy mt-2 text-body-sm">
                        <p className="work-card-rest text-ink-low">{card.relationship}</p>
                        <p className="work-card-reveal max-w-lg text-ink-body">{card.outcome}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 pt-1">
                    <span className="font-mono text-caption text-ink-low transition-colors duration-200 ease-entrance group-hover:text-ink-body group-focus-visible:text-ink-body">
                        {card.project.yearOrStatus}
                    </span>
                    <ArrowUpRight size={16} className="work-card-arrow shrink-0 text-ink-max" />
                </div>
            </div>
        </Link>
    </motion.article>
);

const PortfolioSection: React.FC = () => (
    <div className="flex flex-col gap-20 md:gap-24">
        <motion.div
            variants={homepageItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
        >
            <SectionIntro
                title="Selected work."
                description="A focused selection of client projects and long-term work across products, websites, and visual communication."
            />
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-28">
            {GROUPS.map((group) => (
                <section key={group.title} aria-labelledby={`work-${group.title.toLowerCase().replace(' ', '-')}`}>
                    <motion.h3
                        id={`work-${group.title.toLowerCase().replace(' ', '-')}`}
                        variants={homepageItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                        className="mb-8 text-headline text-ink-high md:mb-10"
                    >
                        {group.title}
                    </motion.h3>
                    <div className="flex flex-col gap-16 md:gap-20">
                        {group.projects.map((card) => (
                            <WorkCard key={card.project.id} card={card} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    </div>
);

export default PortfolioSection;
