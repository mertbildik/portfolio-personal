import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import SectionIntro from '../shared/SectionIntro';
import { itemVariants, VIEWPORT_ONCE } from '../shared/motion';
import { COVERS } from './assets/covers';
import { GROUPS, PROJECTS, type Group, type Project } from './content/projects';

const groupId = (group: Group) => `work-${group.toLowerCase().replace(' ', '-')}`;

const WorkCard: React.FC<{ project: Project }> = ({ project }) => (
    <motion.article
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
    >
        <Link
            to={`/portfolio/${project.id}`}
            className="work-card group block cursor-pointer rounded-md focus-visible:outline-none"
        >
            <div className="work-card-media overflow-hidden rounded-md border border-line bg-transparent transition-colors duration-200 ease-entrance group-focus-visible:border-ink-low">
                <img
                    src={COVERS[project.id]}
                    alt={project.coverAlt}
                    loading="lazy"
                    className="work-card-image h-full w-full object-cover object-center"
                />
                {project.confidential && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-canvas/80 opacity-0 transition-opacity duration-200 ease-entrance group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Lock size={20} strokeWidth={1.5} className="text-ink-low" />
                        <span className="font-mono text-caption text-ink-body">Confidential · ask on a call</span>
                    </div>
                )}
            </div>

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] gap-6 md:mt-6">
                <div className="min-w-0">
                    <h4 className="text-card-title text-ink-high transition-colors duration-200 ease-entrance group-hover:text-ink-max group-focus-visible:text-ink-max">
                        {project.title}
                    </h4>
                    <div className="work-card-copy mt-2 text-body-sm">
                        <p className="work-card-rest text-ink-low">{project.relationship}</p>
                        <p className="work-card-reveal max-w-lg text-ink-body">{project.summary}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 pt-1">
                    <span className="font-mono text-caption text-ink-low transition-colors duration-200 ease-entrance group-hover:text-ink-body group-focus-visible:text-ink-body">
                        {project.yearOrStatus}
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
            variants={itemVariants}
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
                <section key={group} aria-labelledby={groupId(group)}>
                    <motion.h3
                        id={groupId(group)}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                        className="mb-8 text-headline text-ink-high md:mb-10"
                    >
                        {group}
                    </motion.h3>
                    <div className="flex flex-col gap-16 md:gap-20">
                        {PROJECTS.filter((project) => project.group === group).map((project) => (
                            <WorkCard key={project.id} project={project} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    </div>
);

export default PortfolioSection;
