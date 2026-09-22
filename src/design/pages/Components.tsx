import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Chapter, Frame, Label, Mono, PageFoot, PageHeader } from '../chrome';
import Button from '../../shared/Button';
import ActionCircle from '../../shared/ActionCircle';
import SectionIntro from '../../shared/SectionIntro';
import BackLink from '../../portfolio/case-studies/BackLink';
import {
    CaseStudyDecision,
    CaseStudyHeader,
    CaseStudyImage,
    CaseStudyParagraph,
    CaseStudyProse,
    CaseStudySectionHeading,
} from '../../portfolio/case-studies/CaseStudyElements';
import { WorkCard } from '../../portfolio/PortfolioSection';
import { PROJECTS } from '../../portfolio/content/projects';
import { COVERS } from '../../portfolio/assets/covers';

/** The file a component lives in, under its heading. */
const Home: React.FC<{ path: string }> = ({ path }) => (
    <p className="-mt-2 mb-6">
        <Mono>{path}</Mono>
    </p>
);

const OFK = PROJECTS.find((project) => project.id === 'ofk');

const Components: React.FC = () => (
    <>
        <PageHeader
            crumb="Catalogue"
            title="Components"
            lede="The real components, imported from the site and rendered on the real canvas — not screenshots and not copies. Change one and it changes here and on the site at once. Hover, focus and press them."
        />

        <Chapter
            id="button"
            title="Button"
            lede="A pill with a label. Renders an anchor when given href and a button otherwise, so the element matches the job. External links gain the arrow and the safe rel."
        >
            <Home path="src/shared/Button.tsx" />
            <Frame>
                <div className="flex flex-wrap items-center gap-4">
                    <Button href="#button">Internal link</Button>
                    <Button href="https://example.com" external>
                        External link
                    </Button>
                    <Button onClick={() => undefined}>Native button</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </Frame>
        </Chapter>

        <Chapter
            id="action-circle"
            title="ActionCircle"
            lede="The one control that fills on hover — ink, icon to canvas — and presses to 0.97. It decorates the control around it: aria-hidden and driven by the parent’s group state, so it never carries the label itself."
        >
            <Home path="src/shared/ActionCircle.tsx" />
            <Frame>
                <div className="flex flex-col gap-8">
                    <a
                        href="#action-circle"
                        className="group flex w-full max-w-sm items-center justify-between"
                    >
                        <span className="flex flex-col">
                            <span className="text-heading text-ink transition-colors duration-120 ease-out">
                                Get in touch
                            </span>
                            <span className="mt-1 flex items-center gap-2 text-small text-ink-secondary transition-colors duration-120 ease-out group-hover:text-ink">
                                <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                                Available for new projects
                            </span>
                        </span>
                        <ActionCircle>
                            <ArrowUpRight size={20} />
                        </ActionCircle>
                    </a>

                    <div>
                        <Label>small — the contact form’s submit</Label>
                        <button className="group flex items-center gap-4">
                            <span className="text-label text-ink transition-colors duration-120 ease-out">
                                Send inquiry
                            </span>
                            <ActionCircle small>
                                <ArrowRight size={18} />
                            </ActionCircle>
                        </button>
                    </div>
                </div>
            </Frame>
        </Chapter>

        <Chapter
            id="back-link"
            title="BackLink"
            lede="The back control: a short rule that grows beside its label. The one width on the site that animates, deliberately."
        >
            <Home path="src/portfolio/case-studies/BackLink.tsx" />
            <Frame>
                <BackLink to="/#portfolio" ariaLabel="Back to portfolio">
                    Go back
                </BackLink>
            </Frame>
        </Chapter>

        <Chapter
            id="section-intro"
            title="SectionIntro"
            lede="A homepage section’s title and its one supporting sentence: title on ink-large, body on ink, held to the prose measure."
        >
            <Home path="src/shared/SectionIntro.tsx" />
            <Frame>
                <SectionIntro
                    title="Selected work."
                    description="A focused selection of client projects and long-term work across products, websites, and visual communication."
                />
            </Frame>
        </Chapter>

        {OFK && (
            <Chapter
                id="work-card"
                title="WorkCard"
                lede="The homepage project module, rendered here from the real project index. On a device that can hover, from md, the image settles, the relationship line swaps for the outcome and the arrow enters. Touch layouts show both lines and nothing moves."
            >
                <Home path="src/portfolio/PortfolioSection.tsx · .work-card-* in src/index.css" />
                <Frame>
                    <div className="max-w-md">
                        <WorkCard project={OFK} />
                    </div>
                </Frame>
            </Chapter>
        )}

        <Chapter
            id="case-study-header"
            title="CaseStudyHeader"
            lede="The opening of a standard study, every distance on the 4px grid: back link, title, summary, a space-free rule, the metadata, and the tools as chips on bg-raised. Sample content, so no study’s words are copied here."
        >
            <Home path="src/portfolio/case-studies/CaseStudyElements.tsx" />
            <Frame>
                <CaseStudyHeader
                    title="Project title"
                    summary="A one- or two-sentence summary that carries the project’s central story."
                    role="Product designer"
                    timeline="Mar–Apr 2026"
                    scope="Strategy, identity, build"
                    tools={['Figma', 'Notion', 'Claude Code']}
                />
            </Frame>
        </Chapter>

        <Chapter
            id="case-study"
            title="Case-study parts"
            lede="The shared frame every hand-written study fills. Paragraph styling lives in CaseStudyParagraph alone, and a figure numbers and measures itself."
        >
            <Home path="src/portfolio/case-studies/CaseStudyElements.tsx" />
            <Frame className="case-study">
                <CaseStudySectionHeading number="01">Problem</CaseStudySectionHeading>
                <div className="mt-8">
                    <CaseStudyProse>
                        <CaseStudyParagraph>
                            Body copy runs through one component, so the measure and the ink are set
                            in a single place rather than repeated on every paragraph.
                        </CaseStudyParagraph>
                        <CaseStudyParagraph>
                            A run of prose sits inside CaseStudyProse, which holds the column and
                            the space between paragraphs.
                        </CaseStudyParagraph>
                    </CaseStudyProse>
                </div>
                <div className="mt-12">
                    <CaseStudyDecision number="01" title="A numbered decision">
                        <CaseStudyParagraph>
                            Used inside Solution, where each decision that shaped the product gets
                            its reason and its visible result.
                        </CaseStudyParagraph>
                    </CaseStudyDecision>
                </div>
                <div className="mt-12 max-w-md">
                    <CaseStudyImage
                        src={COVERS.ofk}
                        alt="OFK Construction homepage"
                        caption="The figure counts itself and reads its own pixel size."
                    />
                </div>
            </Frame>
        </Chapter>

        <PageFoot path="/design/components" />
    </>
);

export default Components;
