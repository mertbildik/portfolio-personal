import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { Link } from 'react-router';
import SectionIntro from '../shared/SectionIntro';
import { COVERS } from './assets/covers';
import { GROUPS, PROJECTS, type Group, type Project } from './content/projects';

const groupId = (group: Group) => `work-${group.toLowerCase().replace(' ', '-')}`;

export const WorkCard: React.FC<{ project: Project }> = ({ project }) => (
    <article>
        <Link
            to={`/portfolio/${project.id}`}
            className="work-card group block cursor-pointer rounded-md"
        >
            <div className="work-card-media overflow-hidden rounded-md border border-edge bg-transparent transition-colors duration-120 ease-out group-focus-visible:border-edge-strong">
                <img
                    src={COVERS[project.id]}
                    alt={project.coverAlt}
                    loading="lazy"
                    className="work-card-image h-full w-full object-cover object-center"
                />
                {project.confidential && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-canvas/80 opacity-0 transition-opacity duration-120 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Lock size={20} strokeWidth={1.5} className="text-ink-secondary" />
                        <span className="font-mono text-data text-ink">
                            Confidential · ask on a call
                        </span>
                    </div>
                )}
            </div>

            {/* Title and year share a baseline rather than a hand-tuned offset, so
                they stay aligned whatever the two type sizes become. */}
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6">
                <div className="min-w-0">
                    <h4 className="text-heading text-ink transition-colors duration-120 ease-out">
                        {project.title}
                    </h4>
                    <div className="work-card-copy text-small">
                        <p className="work-card-rest text-ink-secondary">{project.relationship}</p>
                        <p className="work-card-reveal max-w-measure text-ink">{project.summary}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="font-mono text-data text-ink-secondary transition-colors duration-120 ease-out group-hover:text-ink group-focus-visible:text-ink">
                        {project.yearOrStatus}
                    </span>
                    <ArrowUpRight size={16} className="work-card-arrow shrink-0 text-ink" />
                </div>
            </div>
        </Link>
    </article>
);

const PortfolioSection: React.FC = () => (
    <div className="flex flex-col gap-12 md:gap-16">
        <SectionIntro
            title="Selected work."
            description="A focused selection of client projects and long-term work across products, websites, and visual communication."
        />

        <div className="flex flex-col gap-16 md:gap-20">
            {GROUPS.map((group) => (
                <section key={group} aria-labelledby={groupId(group)}>
                    {/* A group name labels the list under it; it is not a peer of the
                        project titles, so it takes the quiet label role, not a heading. */}
                    <h3 id={groupId(group)} className="mb-6 text-label text-ink-secondary">
                        {group}
                    </h3>
                    <div className="flex flex-col gap-12 md:gap-16">
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
