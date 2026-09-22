import React from 'react';
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
import type { Project } from '../../content/projects';
import Button from '../../../shared/Button';
import {
    CaseStudyDecision,
    CaseStudyImage,
    CaseStudyParagraph,
    CaseStudyProse,
} from '../CaseStudyElements';
import CaseStudyFrame from '../CaseStudyFrame';

const QUESTIONS = [
    'Can OFK perform the required work?',
    'Has it delivered something comparable?',
    'Who can verify that experience?',
    'How can a buyer start a conversation?',
] as const;

const OfkCaseStudy: React.FC<{ project: Project }> = ({ project }) => (
    <CaseStudyFrame
        project={project}
        summary="OFK had completed projects and signed references, but no digital home for either. I built a bilingual website that helps corporate buyers inspect the work before making contact."
        role="Product designer"
        timeline="Mar to Apr 2026"
        scope="Strategy, identity, UX/UI, build"
        tools={['Figma', 'Notion', 'Claude Code', 'Affinity']}
        sections={{
            problem: {
                description: 'The missing digital proof',
                children: (
                    <>
                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                OFK’s reputation lived in completed projects, client relationships,
                                photographs, and signed references. Online, the company had little
                                more than a logo.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                A buyer could not assess OFK in one place. They had to piece the
                                story together from files and conversations.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The website also needed to support pitches, meetings, and early
                                project discussions.
                            </CaseStudyParagraph>
                        </CaseStudyProse>

                        <CaseStudyImage
                            src={problemImage1}
                            alt="OFK source folders for the logo, project photography, and reference documents"
                            caption="The proof existed, but it was scattered across documents and folders."
                            className="mx-auto max-w-2xl"
                        />
                    </>
                ),
            },
            approach: {
                description: 'Evidence shaped the structure',
                children: (
                    <>
                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                I reviewed company documents, project records, photographs, service
                                information, and three signed references.
                            </CaseStudyParagraph>

                            <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                                {QUESTIONS.map((question, index) => (
                                    <li
                                        key={question}
                                        className="flex gap-4 border-t border-line py-5 text-body-sm text-ink-body"
                                    >
                                        <span className="shrink-0 font-mono text-caption text-ink-low">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        {question}
                                    </li>
                                ))}
                            </ol>

                            <CaseStudyParagraph>
                                Projects, technical scopes, and references gave the strongest
                                answers. Broad company claims carried less weight without evidence.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                That set the hierarchy. Company information stayed brief, while
                                project evidence had room for closer review.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The client wanted to avoid platform fees and dependence on a website
                                builder. I chose React so OFK could own and extend the website.
                            </CaseStudyParagraph>
                        </CaseStudyProse>

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
                    </>
                ),
            },
            solution: {
                description: 'Three product decisions',
                rhythm: 'wide',
                children: (
                    <>
                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                I extended OFK’s logo into a digital identity. One blue accent,
                                blue-gray neutrals, clear type, and firm spacing gave the website a
                                technical voice.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The website follows one rule: state the point, show the proof, then
                                offer more detail.
                            </CaseStudyParagraph>
                        </CaseStudyProse>

                        <div className="space-y-10 md:space-y-14">
                            <CaseStudyDecision number="01" title="Projects became the proof">
                                <CaseStudyParagraph>
                                    A service list says what OFK offers. A named project shows that
                                    the company has delivered it. Each project connects its
                                    location, photography, technical scope, and execution details in
                                    one place.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={solutionProjects}
                                alt="OFK completed projects overview with locations, dates, and scope"
                                caption="Project summaries make comparable experience visible before a buyer opens the technical detail."
                                className="mx-auto max-w-5xl"
                            />
                        </div>

                        <div className="space-y-10 md:space-y-14">
                            <CaseStudyDecision number="02" title="References stayed verifiable">
                                <CaseStudyParagraph>
                                    A company name suggests credibility. A signed document lets a
                                    buyer inspect the claim. Each reference connects to its company,
                                    project, scope, and original file.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={solutionReferences}
                                alt="OFK references page with three companies and PDF downloads"
                                caption="Each reference stays attached to its company, project, scope, and original document."
                                className="mx-auto max-w-5xl"
                            />
                        </div>

                        <div className="space-y-10 md:space-y-14">
                            <CaseStudyDecision number="03" title="Two languages shared one system">
                                <CaseStudyParagraph>
                                    Separate sites would double the work and invite mismatched
                                    content. English and Polish share one structure, persistent
                                    language choice, and stable navigation.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={solutionLanguages}
                                alt="OFK navigation with English and Polish language controls"
                                caption="Both languages change inside the same stable navigation."
                                className="ml-auto max-w-4xl"
                            />
                        </div>
                    </>
                ),
            },
            output: {
                description: 'Identity and shipped product',
                children: (
                    <>
                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                I led product strategy, identity, UX/UI, and the front-end build.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                I shipped a company overview, services, named projects, technical
                                scopes, responsive galleries, downloadable references, and direct
                                contact paths.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The same website can introduce OFK online, guide a meeting, or
                                support a project discussion with evidence.
                            </CaseStudyParagraph>
                        </CaseStudyProse>

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
                    </>
                ),
            },
            impact: {
                description: 'The verified change',
                rhythm: 'tight',
                children: (
                    <div className="mx-auto max-w-page space-y-10">
                        <div className="space-y-6">
                            <CaseStudyParagraph>
                                OFK moved from a logo and scattered files to a live bilingual
                                website.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                Buyers can now inspect projects, review technical scope, download
                                signed references, and make contact in one place.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The website also gives OFK one presentation tool for pitches and
                                meetings.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                No before-and-after analytics were available. The verified change is
                                that OFK’s work is now public and easier to inspect.
                            </CaseStudyParagraph>
                        </div>

                        <Button href="https://ofkconstruction.com" external>
                            Visit OFK Construction
                        </Button>
                    </div>
                ),
            },
        }}
    />
);

export default OfkCaseStudy;
