import React from 'react';
import { motion } from 'motion/react';
import approachSourceMaterial from '../../assets/sinerjik/approach-source-material.webp';
import outputAbout from '../../assets/sinerjik/output-about.webp';
import outputWarehouse from '../../assets/sinerjik/output-warehouse.webp';
import solutionProductFlow from '../../assets/sinerjik/solution-product-flow.webp';
import solutionProof from '../../assets/sinerjik/solution-proof.webp';
import solutionSectorMap from '../../assets/sinerjik/solution-sector-map.webp';
import solutionWmsDemo from '../../assets/sinerjik/solution-wms-demo.webp';
import type { CustomProject } from '../../content/projects';
import Button from '../../../shared/Button';
import { sectionVariants, VIEWPORT_ONCE } from '../../../shared/motion';
import { CaseStudyHeader, CaseStudyImage, CaseStudySectionHeading } from '../CaseStudyElements';
import CaseStudySectionNavigator from '../CaseStudySectionNavigator';

const SECTIONS = [
    { id: 'problem', label: 'Problem', description: 'Two offers, one sales story' },
    { id: 'approach', label: 'Approach', description: 'Structure built for the room' },
    { id: 'solution', label: 'Solution', description: 'Four UX/UI decisions' },
    { id: 'output', label: 'Output', description: 'Website and presentation' },
    { id: 'impact', label: 'Impact', description: 'One client from four pitches' },
] as const;

const QUESTIONS = [
    'What does Sinerjik help companies do?',
    'What proves its experience?',
    'How do the products work together?',
    'Which services fit each sector?',
] as const;

const SinerjikCaseStudy: React.FC<{ project: CustomProject }> = ({ project }) => (
    <div className="w-full">
        <CaseStudyHeader
            title={project.title}
            summary="Sinerjik sells consulting services and MoBI Plus+, a software suite used in daily operations for more than 20 years. I designed a website that doubled as its sales presentation; the client used it in four pitches and signed one new client."
            role="UX/UI designer"
            timeline="Jul to Aug 2026"
            scope="Site structure, UX/UI, motion, front-end build"
            tools={['Next.js', 'Tailwind CSS', 'GSAP', 'Three.js', 'Claude Code']}
        />

        <CaseStudySectionNavigator sections={SECTIONS} pageKey={project.id} />

        <div className="space-y-24 md:space-y-32">
            <motion.section
                id="problem"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="scroll-mt-32 space-y-10"
            >
                <CaseStudySectionHeading number="01">Problem</CaseStudySectionHeading>
                <div className="mx-auto max-w-page space-y-6">
                    <p className="max-w-2xl text-body text-ink-body">
                        Sinerjik's website had to explain two sides of the business.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        The company provides management consulting. It also develops MoBI Plus+, a suite for warehouses, sales, customer management, and reporting.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        The old website did not explain either side clearly. It was also difficult to use during client meetings.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        MoBI Plus+ added another constraint. It is mature software with a dense interface. The client did not want to show those screens on the new site.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        I needed to show what the software did without showing its actual interface. The result also had to work for people browsing alone and for the team presenting in a meeting.
                    </p>
                </div>
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
                        I started with the company documents, product details, services, customer references, and existing brand material.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        I used my visual communication background to turn that material into a presentation. Each section made one point and showed the proof behind it.
                    </p>

                    <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                        {QUESTIONS.map((question, index) => (
                            <li key={question} className="flex gap-4 border-t border-line py-5 text-body-sm text-ink-body">
                                <span className="shrink-0 font-mono text-caption text-ink-low">0{index + 1}</span>
                                {question}
                            </li>
                        ))}
                    </ol>

                    <p className="max-w-2xl text-body text-ink-body">
                        The answers set the page order: promise, proof, business areas, sector fit, and contact.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        The client checked the content throughout the project. Their feedback corrected company figures, contact details, and the link between sectors and services.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        I did not conduct formal user research. The decisions came from the client's product knowledge and sales needs.
                    </p>
                </div>

                <CaseStudyImage
                    src={approachSourceMaterial}
                    alt="Sinerjik source document covering the company, products, services, and site structure"
                    caption="Company facts, services, and product details were organised before they became page content."
                    className="mx-auto max-w-5xl"
                />
            </motion.section>

            <motion.section
                id="solution"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="scroll-mt-32 space-y-16 md:space-y-20"
            >
                <CaseStudySectionHeading number="03">Solution</CaseStudySectionHeading>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">01</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Put proof near the top</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            Sinerjik had strong facts to support its offer. These included more than 20 years of software experience, long client relationships, and large volumes of operational data.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            The homepage shows this evidence before explaining every service. A visitor can judge the company early, while the team can point to the same facts during a pitch.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={solutionProof}
                        alt="Sinerjik company figures beside a particle helix and customer logos"
                        caption="Company figures and customer references appear before the detailed service content."
                        className="mx-auto max-w-6xl"
                    />
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">02</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Show the software through a working example</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            Product screenshots were not available. A feature list alone would leave MoBI Plus+ hard to understand.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            I built a warehouse demonstration from the product's real behavior. A delivery arrives, receives a rack, moves through picking, reaches low stock, and triggers a new order.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            The labels and steps come from MoBI Plus+. The visual design is new, but the workflow is based on the real product.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={solutionWmsDemo}
                        alt="Sinerjik homepage with an interactive MoBI Plus+ warehouse flow"
                        caption="The warehouse example shows how MoBI Plus+ responds to a stock problem."
                        className="mx-auto max-w-6xl"
                    />
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">03</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Show how the products connect</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            MoBI Plus+ includes four products. Listing them separately would make the suite harder to understand.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            I presented them as one flow. Mobile records field activity, WMS manages the warehouse, CRM handles customers, and Analytic connects the data to the customer's ERP.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            This gives the sales team one diagram for explaining the full suite.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={solutionProductFlow}
                        alt="MoBI Plus+ diagram connecting field, warehouse, customer, analytics, and ERP"
                        caption="The diagram follows data from field activity to the customer's existing ERP."
                        className="mx-auto max-w-6xl"
                    />
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">04</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Match sectors with the right offer</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            Sinerjik works across manufacturing, food, energy, construction, automotive, retail, and education.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            A long capability list would make every sector look the same. I designed an interactive section that changes the standards, services, and products shown for each sector.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            This helps visitors find relevant information. It also lets the team adjust a pitch without changing pages.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={solutionSectorMap}
                        alt="Sinerjik sector map connecting manufacturing to standards, services, and products"
                        caption="Each sector reveals the services and products most relevant to it."
                        className="mx-auto max-w-6xl"
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
                        I designed the site structure, interface, visual system, and motion. I also directed the front-end build with Claude Code.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        I delivered a responsive Turkish website with five public pages: homepage, company, consulting, products, and contact.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        The website also includes coded product demonstrations, responsive diagrams, a contact form, and a documented design system.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        The same site can introduce Sinerjik, support a sales conversation, or explain a product flow.
                    </p>
                </div>

                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
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
                    <CaseStudySectionHeading number="05">Impact</CaseStudySectionHeading>

                    <div className="grid grid-cols-1 gap-8 border-y border-line py-8 md:grid-cols-2">
                        <div>
                            <span className="block font-mono text-display-md text-ink-high">1</span>
                            <span className="mt-3 block text-eyebrow text-ink-low">Signed client</span>
                        </div>
                        <div>
                            <span className="block font-mono text-display-md text-ink-high">4</span>
                            <span className="mt-3 block text-eyebrow text-ink-low">Pitches using the website</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="max-w-2xl text-body text-ink-body">
                            The client used the website in four pitches after launch. One of those pitches led to a signed client.
                        </p>
                        <p className="max-w-2xl text-body text-ink-body">
                            During those meetings, the team could present the company, show how MoBI Plus+ works, and explain which services fit the potential client.
                        </p>
                        <p className="max-w-2xl text-body text-ink-body">
                            The website also removed a product marketing blocker. Sinerjik could demonstrate MoBI Plus+ without exposing its production interface or waiting for a full product redesign.
                        </p>
                        <p className="max-w-2xl text-body text-ink-body">
                            The coded demonstrations gave the software a clear visual layer while the production product stayed unchanged. The client later thanked me for making the business and software easier to explain.
                        </p>
                    </div>

                    <Button href="https://www.sinerjik.com.tr" external>
                        Visit Sinerjik
                    </Button>
                </div>
            </motion.section>
        </div>
    </div>
);

export default SinerjikCaseStudy;
