import React from 'react';
import approachSourceMaterial from '../../assets/sinerjik/approach-source-material.webp';
import outputAbout from '../../assets/sinerjik/output-about.webp';
import outputWarehouse from '../../assets/sinerjik/output-warehouse.webp';
import solutionProductFlow from '../../assets/sinerjik/solution-product-flow.webp';
import solutionProof from '../../assets/sinerjik/solution-proof.webp';
import solutionSectorMap from '../../assets/sinerjik/solution-sector-map.webp';
import solutionWmsDemo from '../../assets/sinerjik/solution-wms-demo.webp';
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
    'What does Sinerjik help companies do?',
    'What proves its experience?',
    'How do the products work together?',
    'Which services fit each sector?',
] as const;

const SinerjikCaseStudy: React.FC<{ project: Project }> = ({ project }) => (
    <CaseStudyFrame
        project={project}
        summary="Sinerjik sells consulting services and MoBI Plus+, a software suite used in daily operations for more than 20 years. I designed a website that doubled as its sales presentation; the client used it in four pitches and signed one new client."
        role="UX/UI designer"
        timeline="Jul to Aug 2026"
        scope="Site structure, UX/UI, motion, front-end build"
        tools={['Next.js', 'Tailwind CSS', 'GSAP', 'Three.js', 'Claude Code']}
        sections={{
            problem: {
                description: 'Two offers, one sales story',
                rhythm: 'tight',
                children: (
                    <CaseStudyProse>
                        <CaseStudyParagraph>
                            Sinerjik's website had to explain two sides of the business.
                        </CaseStudyParagraph>
                        <CaseStudyParagraph>
                            The company provides management consulting. It also develops MoBI Plus+,
                            a suite for warehouses, sales, customer management, and reporting.
                        </CaseStudyParagraph>
                        <CaseStudyParagraph>
                            The old website did not explain either side clearly. It was also
                            difficult to use during client meetings.
                        </CaseStudyParagraph>
                        <CaseStudyParagraph>
                            MoBI Plus+ added another constraint. It is mature software with a dense
                            interface. The client did not want to show those screens on the new
                            site.
                        </CaseStudyParagraph>
                        <CaseStudyParagraph>
                            I needed to show what the software did without showing its actual
                            interface. The result also had to work for people browsing alone and for
                            the team presenting in a meeting.
                        </CaseStudyParagraph>
                    </CaseStudyProse>
                ),
            },
            approach: {
                description: 'Structure built for the room',
                children: (
                    <>
                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                I started with the company documents, product details, services,
                                customer references, and existing brand material.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                I used my visual communication background to turn that material into
                                a presentation. Each section made one point and showed the proof
                                behind it.
                            </CaseStudyParagraph>

                            <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                                {QUESTIONS.map((question, index) => (
                                    <li
                                        key={question}
                                        className="flex gap-4 rule-t py-4 text-small text-ink"
                                    >
                                        <span className="shrink-0 font-mono text-data text-ink-secondary">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        {question}
                                    </li>
                                ))}
                            </ol>

                            <CaseStudyParagraph>
                                The answers set the page order: promise, proof, business areas,
                                sector fit, and contact.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The client checked the content throughout the project. Their
                                feedback corrected company figures, contact details, and the link
                                between sectors and services.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                I did not conduct formal user research. The decisions came from the
                                client's product knowledge and sales needs.
                            </CaseStudyParagraph>
                        </CaseStudyProse>

                        <CaseStudyImage
                            src={approachSourceMaterial}
                            alt="Sinerjik source document covering the company, products, services, and site structure"
                            caption="Company facts, services, and product details were organised before they became page content."
                            className="mx-auto max-w-figure"
                        />
                    </>
                ),
            },
            solution: {
                description: 'Four UX/UI decisions',
                rhythm: 'wide',
                children: (
                    <>
                        <div className="space-y-8 md:space-y-10">
                            <CaseStudyDecision number="01" title="Put proof near the top">
                                <CaseStudyParagraph>
                                    Sinerjik had strong facts to support its offer. These included
                                    more than 20 years of software experience, long client
                                    relationships, and large volumes of operational data.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    The homepage shows this evidence before explaining every
                                    service. A visitor can judge the company early, while the team
                                    can point to the same facts during a pitch.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={solutionProof}
                                alt="Sinerjik company figures beside a particle helix and customer logos"
                                caption="Company figures and customer references appear before the detailed service content."
                                className="mx-auto max-w-figure-wide"
                            />
                        </div>

                        <div className="space-y-8 md:space-y-10">
                            <CaseStudyDecision
                                number="02"
                                title="Show the software through a working example"
                            >
                                <CaseStudyParagraph>
                                    Product screenshots were not available. A feature list alone
                                    would leave MoBI Plus+ hard to understand.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    I built a warehouse demonstration from the product's real
                                    behavior. A delivery arrives, receives a rack, moves through
                                    picking, reaches low stock, and triggers a new order.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    The labels and steps come from MoBI Plus+. The visual design is
                                    new, but the workflow is based on the real product.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={solutionWmsDemo}
                                alt="Sinerjik homepage with an interactive MoBI Plus+ warehouse flow"
                                caption="The warehouse example shows how MoBI Plus+ responds to a stock problem."
                                className="mx-auto max-w-figure-wide"
                            />
                        </div>

                        <div className="space-y-8 md:space-y-10">
                            <CaseStudyDecision number="03" title="Show how the products connect">
                                <CaseStudyParagraph>
                                    MoBI Plus+ includes four products. Listing them separately would
                                    make the suite harder to understand.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    I presented them as one flow. Mobile records field activity, WMS
                                    manages the warehouse, CRM handles customers, and Analytic
                                    connects the data to the customer's ERP.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    This gives the sales team one diagram for explaining the full
                                    suite.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={solutionProductFlow}
                                alt="MoBI Plus+ diagram connecting field, warehouse, customer, analytics, and ERP"
                                caption="The diagram follows data from field activity to the customer's existing ERP."
                                className="mx-auto max-w-figure-wide"
                            />
                        </div>

                        <div className="space-y-8 md:space-y-10">
                            <CaseStudyDecision
                                number="04"
                                title="Match sectors with the right offer"
                            >
                                <CaseStudyParagraph>
                                    Sinerjik works across manufacturing, food, energy, construction,
                                    automotive, retail, and education.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    A long capability list would make every sector look the same. I
                                    designed an interactive section that changes the standards,
                                    services, and products shown for each sector.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    This helps visitors find relevant information. It also lets the
                                    team adjust a pitch without changing pages.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={solutionSectorMap}
                                alt="Sinerjik sector map connecting manufacturing to standards, services, and products"
                                caption="Each sector reveals the services and products most relevant to it."
                                className="mx-auto max-w-figure-wide"
                            />
                        </div>
                    </>
                ),
            },
            output: {
                description: 'Website and presentation',
                children: (
                    <>
                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                I designed the site structure, interface, visual system, and motion.
                                I also directed the front-end build with Claude Code.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                I delivered a responsive Turkish website with five public pages:
                                homepage, company, consulting, products, and contact.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The website also includes coded product demonstrations, responsive
                                diagrams, a contact form, and a documented design system.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The same site can introduce Sinerjik, support a sales conversation,
                                or explain a product flow.
                            </CaseStudyParagraph>
                        </CaseStudyProse>

                        <div className="mx-auto grid w-full max-w-figure-wide grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
                            <CaseStudyImage
                                src={outputAbout}
                                alt="Sinerjik company page with experience and operating figures"
                                caption="The company page presents Sinerjik's experience and operating figures."
                            />
                            <CaseStudyImage
                                src={outputWarehouse}
                                alt="Sinerjik products page explaining warehouse wave picking"
                                caption="The products page turns warehouse operations into a visual explanation."
                            />
                        </div>
                    </>
                ),
            },
            impact: {
                description: 'One client from four pitches',
                rhythm: 'tight',
                children: (
                    <div className="mx-auto max-w-page space-y-8">
                        <div className="grid grid-cols-1 gap-8 rule-y py-8 md:grid-cols-2">
                            <div>
                                <span className="block font-mono text-title text-ink-large">1</span>
                                <span className="mt-3 block text-label text-ink-secondary">
                                    Signed client
                                </span>
                            </div>
                            <div>
                                <span className="block font-mono text-title text-ink-large">4</span>
                                <span className="mt-3 block text-label text-ink-secondary">
                                    Pitches using the website
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <CaseStudyParagraph>
                                The client used the website in four pitches after launch. One of
                                those pitches led to a signed client.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                During those meetings, the team could present the company, show how
                                MoBI Plus+ works, and explain which services fit the potential
                                client.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The website also removed a product marketing blocker. Sinerjik could
                                demonstrate MoBI Plus+ without exposing its production interface or
                                waiting for a full product redesign.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The coded demonstrations gave the software a clear visual layer
                                while the production product stayed unchanged. The client later
                                thanked me for making the business and software easier to explain.
                            </CaseStudyParagraph>
                        </div>

                        <Button href="https://www.sinerjik.com.tr" external>
                            Visit Sinerjik
                        </Button>
                    </div>
                ),
            },
        }}
    />
);

export default SinerjikCaseStudy;
