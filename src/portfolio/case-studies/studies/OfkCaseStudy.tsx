import React from 'react';
import { motion } from 'motion/react';
import approachImage1 from '../../assets/ofk/approach-image-1.webp';
import approachImage2 from '../../assets/ofk/approach-image-2.webp';
import approachImage3 from '../../assets/ofk/approach-image-3.webp';
import approachImage4 from '../../assets/ofk/approach-image-4.webp';
import outputAbout from '../../assets/ofk/output-about.webp';
import outputCaseStudy from '../../assets/ofk/output-case-study.webp';
import outputHome from '../../assets/ofk/output-home.webp';
import outputProjects from '../../assets/ofk/output-projects.webp';
import outputServices from '../../assets/ofk/output-services.webp';
import problemImage1 from '../../assets/ofk/problem-image-1.webp';
import solutionLanguages from '../../assets/ofk/solution-languages.webp';
import solutionProjects from '../../assets/ofk/solution-projects.webp';
import solutionReferences from '../../assets/ofk/solution-references.webp';
import type { CustomProject } from '../../content/projects';
import Button from '../../../shared/Button';
import { sectionVariants, VIEWPORT_ONCE } from '../../../shared/motion';
import { CaseStudyHeader, CaseStudyImage, CaseStudySectionHeading } from '../CaseStudyElements';
import CaseStudySectionNavigator from '../CaseStudySectionNavigator';

const SECTIONS = [
    { id: 'problem', label: 'Problem', description: 'The missing digital proof' },
    { id: 'approach', label: 'Approach', description: 'Evidence shaped the structure' },
    { id: 'solution', label: 'Solution', description: 'Three product decisions' },
    { id: 'output', label: 'Output', description: 'Identity and shipped product' },
    { id: 'impact', label: 'Impact', description: 'The verified change' },
] as const;

const OfkCaseStudy: React.FC<{ project: CustomProject }> = ({ project }) => (
    <div className="w-full">
        <CaseStudyHeader
            title={project.title}
            summary="OFK had completed projects and signed references, but no digital home for either. I built a bilingual website that helps corporate buyers inspect the work before making contact."
            role="Product designer"
            timeline="Mar to Apr 2026"
            scope="Strategy, identity, UX/UI, build"
            tools={['Figma', 'Notion', 'Claude Code', 'Affinity']}
        />

        <CaseStudySectionNavigator sections={SECTIONS} pageKey={project.id} />

        <div className="space-y-24 md:space-y-32">
            <motion.section
                id="problem"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="scroll-mt-32 space-y-10 md:space-y-14"
            >
                <CaseStudySectionHeading number="01">Problem</CaseStudySectionHeading>
                <div className="mx-auto max-w-page space-y-6">
                    <p className="max-w-2xl text-body text-ink-body">
                        OFK’s reputation lived in completed projects, client relationships, photographs, and signed references. Online, the company had little more than a logo.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        A buyer could not assess OFK in one place. They had to piece the story together from files and conversations.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        The website also needed to support pitches, meetings, and early project discussions.
                    </p>
                </div>

                <CaseStudyImage
                    src={problemImage1}
                    alt="OFK source folders for the logo, project photography, and reference documents"
                    caption="The proof existed, but it was scattered across documents and folders."
                    className="mx-auto max-w-2xl"
                />
            </motion.section>

            <motion.section
                id="approach"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="scroll-mt-32 space-y-10 md:space-y-14"
            >
                <CaseStudySectionHeading number="02">Approach</CaseStudySectionHeading>
                <div className="mx-auto max-w-page space-y-6">
                    <p className="max-w-2xl text-body text-ink-body">
                        I reviewed company documents, project records, photographs, service information, and three signed references.
                    </p>

                    <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                        {[
                            'Can OFK perform the required work?',
                            'Has it delivered something comparable?',
                            'Who can verify that experience?',
                            'How can a buyer start a conversation?',
                        ].map((question, index) => (
                            <li key={question} className="flex gap-4 border-t border-line py-5 text-body-sm text-ink-body">
                                <span className="shrink-0 font-mono text-caption text-ink-low">0{index + 1}</span>
                                {question}
                            </li>
                        ))}
                    </ol>

                    <p className="max-w-2xl text-body text-ink-body">
                        Projects, technical scopes, and references gave the strongest answers. Broad company claims carried less weight without evidence.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        That set the hierarchy. Company information stayed brief, while project evidence had room for closer review.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        The client wanted to avoid platform fees and dependence on a website builder. I chose React so OFK could own and extend the website.
                    </p>
                </div>

                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
                    <CaseStudyImage
                        src={approachImage1}
                        alt="OFK source hierarchy for resolving conflicting company information"
                        caption="When sources conflicted, the most recent client confirmation took priority."
                        className="md:col-span-4"
                    />
                    <CaseStudyImage
                        src={approachImage2}
                        alt="OFK company facts, information gaps, and website goals"
                        caption="Confirmed facts and missing evidence set the limits before design began."
                        className="md:col-span-8"
                    />
                    <CaseStudyImage
                        src={approachImage3}
                        alt="OFK audience, company scope, and service taxonomy"
                        caption="The audience and service taxonomy defined what the site had to make scannable."
                        className="md:col-span-4"
                    />
                    <CaseStudyImage
                        src={approachImage4}
                        alt="OFK positioning notes separating confirmed proof from marketing claims"
                        caption="Positioning stayed separate from proof. Confirmed figures could be shown, but not attached to an unverified project."
                        className="md:col-span-8"
                    />
                </div>
            </motion.section>

            <motion.section
                id="solution"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="scroll-mt-32 space-y-16 md:space-y-20"
            >
                <div className="space-y-10">
                    <CaseStudySectionHeading number="03">Solution</CaseStudySectionHeading>
                    <div className="mx-auto max-w-page space-y-6">
                        <p className="max-w-2xl text-body text-ink-body">
                            I extended OFK’s logo into a digital identity. One blue accent, blue-gray neutrals, clear type, and firm spacing gave the website a technical voice.
                        </p>
                        <p className="max-w-2xl text-body text-ink-body">
                            The website follows one rule: state the point, show the proof, then offer more detail.
                        </p>
                    </div>
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">01</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Projects became the proof</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            A service list says what OFK offers. A named project shows that the company has delivered it. Each project connects its location, photography, technical scope, and execution details in one place.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={solutionProjects}
                        alt="OFK completed projects overview with locations, dates, and scope"
                        caption="Project summaries make comparable experience visible before a buyer opens the technical detail."
                        className="mx-auto max-w-5xl"
                    />
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">02</span>
                        <h3 className="mt-4 text-card-title text-ink-high">References stayed verifiable</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            A company name suggests credibility. A signed document lets a buyer inspect the claim. Each reference connects to its company, project, scope, and original file.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={solutionReferences}
                        alt="OFK references page with three companies and PDF downloads"
                        caption="Each reference stays attached to its company, project, scope, and original document."
                        className="mx-auto max-w-5xl"
                    />
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">03</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Two languages shared one system</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            Separate sites would double the work and invite mismatched content. English and Polish share one structure, persistent language choice, and stable navigation.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={solutionLanguages}
                        alt="OFK navigation with English and Polish language controls"
                        caption="Both languages change inside the same stable navigation."
                        className="ml-auto max-w-4xl"
                    />
                </div>
            </motion.section>

            <motion.section
                id="output"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="scroll-mt-32 space-y-10 md:space-y-14"
            >
                <CaseStudySectionHeading number="04">Output</CaseStudySectionHeading>
                <div className="mx-auto max-w-page space-y-6">
                    <p className="max-w-2xl text-body text-ink-body">
                        I led product strategy, identity, UX/UI, and the front-end build.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        I shipped a company overview, services, named projects, technical scopes, responsive galleries, downloadable references, and direct contact paths.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        The same website can introduce OFK online, guide a meeting, or support a project discussion with evidence.
                    </p>
                </div>

                <div className="mx-auto w-full max-w-6xl space-y-8">
                    <CaseStudyImage
                        src={outputHome}
                        alt="OFK Construction homepage presented in its visual system"
                        caption="The homepage establishes the digital identity and the two primary next steps: inspect projects or make contact."
                    />

                    <div className="columns-1 gap-8 md:columns-2">
                        <CaseStudyImage
                            src={outputAbout}
                            alt="OFK About page presented in its visual system"
                            caption="The identity gives company information a clear presentation hierarchy."
                            className="mb-8 break-inside-avoid"
                        />
                        <CaseStudyImage
                            src={outputCaseStudy}
                            alt="OFK proof page with project figures and execution scope"
                            caption="Confirmed project figures become presentation-ready proof."
                            className="mb-8 break-inside-avoid"
                        />
                        <CaseStudyImage
                            src={outputProjects}
                            alt="OFK project page presented in its visual system"
                            caption="Project pages connect site photography to the technical scope behind it."
                            className="mb-8 break-inside-avoid"
                        />
                        <CaseStudyImage
                            src={outputServices}
                            alt="OFK services page with construction categories and photography"
                            caption="Service categories stay visual and specific instead of becoming a long capability list."
                            className="mb-8 break-inside-avoid"
                        />
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="impact"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="scroll-mt-32"
            >
                <div className="mx-auto max-w-page space-y-10">
                    <div>
                        <span className="mb-8 block font-mono text-eyebrow text-ink-low">05</span>
                        <h2 className="text-display-md text-ink-high">Impact</h2>
                    </div>

                    <div className="space-y-6">
                        <p className="max-w-2xl text-body text-ink-body">
                            OFK moved from a logo and scattered files to a live bilingual website.
                        </p>
                        <p className="max-w-2xl text-body text-ink-body">
                            Buyers can now inspect projects, review technical scope, download signed references, and make contact in one place.
                        </p>
                        <p className="max-w-2xl text-body text-ink-body">
                            The website also gives OFK one presentation tool for pitches and meetings.
                        </p>
                        <p className="max-w-2xl text-body text-ink-body">
                            No before-and-after analytics were available. The verified change is that OFK’s work is now public and easier to inspect.
                        </p>
                    </div>

                    <Button href="https://ofkconstruction.com" external>
                        Visit OFK Construction
                    </Button>
                </div>
            </motion.section>
        </div>
    </div>
);

export default OfkCaseStudy;
