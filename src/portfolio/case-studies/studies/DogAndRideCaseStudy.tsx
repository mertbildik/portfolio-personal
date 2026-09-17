import React from 'react';
import { motion } from 'motion/react';
import contactAndFaq from '../../assets/dog-and-ride/contact-and-faq.webp';
import home from '../../assets/dog-and-ride/home.webp';
import presentation from '../../assets/dog-and-ride/presentation-1.webp';
import productFeatures from '../../assets/dog-and-ride/product-features.webp';
import testimonials from '../../assets/dog-and-ride/testimonials.webp';
import type { CustomProject } from '../../content/projects';
import Button from '../../../shared/Button';
import { sectionVariants, VIEWPORT_ONCE } from '../../../shared/motion';
import { CaseStudyHeader, CaseStudyImage, CaseStudySectionHeading } from '../CaseStudyElements';
import CaseStudySectionNavigator from '../CaseStudySectionNavigator';

const SECTIONS = [
    { id: 'problem', label: 'Problem', description: 'Questions before purchase' },
    { id: 'approach', label: 'Approach', description: 'Feedback set the page order' },
    { id: 'solution', label: 'Solution', description: 'Three landing-page decisions' },
    { id: 'output', label: 'Output', description: 'Brand, website, and sales tools' },
    { id: 'impact', label: 'Impact', description: 'One story across each channel' },
] as const;

const METRICS = [
    { value: '56s', label: 'Average website session' },
    { value: 'Instagram', label: 'Largest measured referral source' },
    { value: '700+', label: 'Instagram followers' },
    { value: '10K+', label: 'Views on typical posts' },
    { value: '100K+', label: 'Views on selected posts' },
] as const;

const DogAndRideCaseStudy: React.FC<{ project: CustomProject }> = ({ project }) => (
    <div className="w-full">
        <CaseStudyHeader
            title={project.title}
            summary="Dog & Ride makes custom carriers for people who ride with their dogs. I turned its logo and video content into a brand and landing page that answer fit and safety questions before consultation."
            role="Multidisciplinary designer"
            timeline="May to Jun 2025"
            scope="Identity, research, photography, web, social, pitch"
            tools={['Figma', 'Framer', 'PowerPoint', 'Adobe Creative Suite', 'Notion']}
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
                        Every dog and motorcycle needs a different setup. Riders needed clear answers about fit, safety, and daily use before trusting the product.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        A standard product page and checkout would hide that complexity. The website needed to explain the product and lead each rider to a consultation.
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
                        I gathered feedback from existing customers and people who tested the product. I asked what they liked, what they disliked, and what they needed before trusting it.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        I also asked what created confidence and which images drew the strongest response. Their answers set the content, page order, photography direction, and website decisions.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        I developed the wireframes and components directly in Framer. One focused landing page covered the full path from product introduction to contact.
                    </p>
                </div>

                <div className="mx-auto w-full max-w-page rounded-md bg-fill p-6 md:p-8">
                    <span className="block text-eyebrow text-ink-low">Reconstructed from project notes</span>
                    <ol className="mt-6 grid grid-cols-1 gap-x-8 md:grid-cols-2">
                        {[
                            'What did people like or dislike?',
                            'What did they need before trusting it?',
                            'What created confidence?',
                            'Which images created the strongest response?',
                        ].map((question, index) => (
                            <li key={question} className="flex gap-4 border-t border-line py-5 text-body-sm text-ink-body">
                                <span className="shrink-0 font-mono text-caption text-ink-low">0{index + 1}</span>
                                {question}
                            </li>
                        ))}
                    </ol>
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
                <CaseStudySectionHeading number="03">Solution</CaseStudySectionHeading>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">01</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Show the ride, not just the carrier</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            I used the image feedback to direct and edit photographs of dogs, riders, and the carrier in use. The images show both the carrier and the ride it enables.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={home}
                        alt="Dog & Ride landing page with a rider, dog, and brand message"
                        caption="The opening pairs the product with the experience of travelling together."
                        className="mx-auto max-w-6xl"
                    />
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">02</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Let buyer questions set the order</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            The page moves from riding together to product features, safety, customer experiences, common questions, and contact. Each section answers a question that could stop a rider from getting in touch.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={productFeatures}
                        alt="Dog & Ride product features beside photographs of riders and dogs"
                        caption="Product details follow the opening promise, when riders are ready to inspect how it works."
                        className="mx-auto max-w-6xl"
                    />
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">03</span>
                        <h3 className="mt-4 text-card-title text-ink-high">End with consultation</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            Dog & Ride does not have one setup for every rider. The page ends with direct contact instead of a standard checkout.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={contactAndFaq}
                        alt="Dog & Ride contact form and common product questions"
                        caption="The FAQ handles practical questions before the rider starts a consultation."
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
                        I delivered the brand identity, research, photography direction and editing, website design and Framer build, social media system, and pitch presentation.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        The website explains the product. Social media shows it in use. The pitch deck presents the same idea to potential partners.
                    </p>
                </div>

                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
                    <CaseStudyImage
                        src={testimonials}
                        alt="Dog & Ride customer quotes above a red scooter and carrier"
                        caption="Customer experiences add proof beside the product story."
                    />
                    <CaseStudyImage
                        src={presentation}
                        alt="Dog & Ride pitch presentation cover for Vespa"
                        caption="The pitch deck adapts the same story for a potential partner."
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

                    <div className="space-y-6">
                        <p className="max-w-2xl text-body text-ink-body">
                            Dog & Ride moved from a logo and video content to one identity and message across its website, social media, and pitch materials.
                        </p>
                        <p className="max-w-2xl text-body text-ink-body">
                            The website now explains the product, answers fit and safety questions, and gives riders a clear consultation path.
                        </p>
                    </div>

                    <div>
                        <span className="block text-eyebrow text-ink-low">First five months after launch</span>
                        <dl className="mt-6 grid grid-cols-2 gap-x-6 md:grid-cols-5">
                            {METRICS.map((metric) => (
                                <div key={metric.label} className="border-t border-line py-5">
                                    <dt className="text-caption text-ink-low">{metric.label}</dt>
                                    <dd className="mt-3 font-mono text-card-title text-ink-high">{metric.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <Button href="https://www.dogandride.com/" external>
                        Visit Dog & Ride
                    </Button>
                </div>
            </motion.section>
        </div>
    </div>
);

export default DogAndRideCaseStudy;
