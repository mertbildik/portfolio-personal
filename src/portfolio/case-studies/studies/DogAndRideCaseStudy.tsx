import React from 'react';
import contactAndFaq from '../../assets/dog-and-ride/contact-and-faq.webp';
import home from '../../assets/dog-and-ride/home.webp';
import presentation from '../../assets/dog-and-ride/presentation-1.webp';
import productFeatures from '../../assets/dog-and-ride/product-features.webp';
import testimonials from '../../assets/dog-and-ride/testimonials.webp';
import type { Project } from '../../content/projects';
import Button from '../../../shared/Button';
import {
    CaseStudyDecision,
    CaseStudyImage,
    CaseStudyParagraph,
    CaseStudyProse,
} from '../CaseStudyElements';
import CaseStudyFrame from '../CaseStudyFrame';

const METRICS = [
    { value: '56s', label: 'Average website session' },
    { value: 'Instagram', label: 'Largest measured referral source' },
    { value: '700+', label: 'Instagram followers' },
    { value: '10K+', label: 'Views on typical posts' },
    { value: '100K+', label: 'Views on selected posts' },
] as const;

const QUESTIONS = [
    'What did people like or dislike?',
    'What did they need before trusting it?',
    'What created confidence?',
    'Which images created the strongest response?',
] as const;

const DogAndRideCaseStudy: React.FC<{ project: Project }> = ({ project }) => (
    <CaseStudyFrame
        project={project}
        summary="Dog & Ride makes custom carriers for people who ride with their dogs. I turned its logo and video content into a brand and landing page that answer fit and safety questions before consultation."
        role="Multidisciplinary designer"
        timeline="May to Jun 2025"
        scope="Identity, research, photography, web, social, pitch"
        tools={['Figma', 'Framer', 'PowerPoint', 'Adobe Creative Suite', 'Notion']}
        sections={{
            problem: {
                description: 'Questions before purchase',
                rhythm: 'tight',
                children: (
                    <CaseStudyProse>
                        <CaseStudyParagraph>
                            Every dog and motorcycle needs a different setup. Riders needed clear
                            answers about fit, safety, and daily use before trusting the product.
                        </CaseStudyParagraph>
                        <CaseStudyParagraph>
                            A standard product page and checkout would hide that complexity. The
                            website needed to explain the product and lead each rider to a
                            consultation.
                        </CaseStudyParagraph>
                    </CaseStudyProse>
                ),
            },
            approach: {
                description: 'Feedback set the page order',
                children: (
                    <>
                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                I gathered feedback from existing customers and people who tested
                                the product. I asked what they liked, what they disliked, and what
                                they needed before trusting it.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                I also asked what created confidence and which images drew the
                                strongest response. Their answers set the content, page order,
                                photography direction, and website decisions.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                I developed the wireframes and components directly in Framer. One
                                focused landing page covered the full path from product introduction
                                to contact.
                            </CaseStudyParagraph>
                        </CaseStudyProse>

                        <div className="mx-auto w-full max-w-page rounded-md bg-fill p-6 md:p-8">
                            <span className="block text-eyebrow text-ink-low">
                                Reconstructed from project notes
                            </span>
                            <ol className="mt-6 grid grid-cols-1 gap-x-8 md:grid-cols-2">
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
                        </div>
                    </>
                ),
            },
            solution: {
                description: 'Three landing-page decisions',
                rhythm: 'wide',
                children: (
                    <>
                        <div className="space-y-10 md:space-y-14">
                            <CaseStudyDecision
                                number="01"
                                title="Show the ride, not just the carrier"
                            >
                                <CaseStudyParagraph>
                                    I used the image feedback to direct and edit photographs of
                                    dogs, riders, and the carrier in use. The images show both the
                                    carrier and the ride it enables.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={home}
                                alt="Dog & Ride landing page with a rider, dog, and brand message"
                                caption="The opening pairs the product with the experience of travelling together."
                                className="mx-auto max-w-6xl"
                            />
                        </div>

                        <div className="space-y-10 md:space-y-14">
                            <CaseStudyDecision
                                number="02"
                                title="Let buyer questions set the order"
                            >
                                <CaseStudyParagraph>
                                    The page moves from riding together to product features, safety,
                                    customer experiences, common questions, and contact. Each
                                    section answers a question that could stop a rider from getting
                                    in touch.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={productFeatures}
                                alt="Dog & Ride product features beside photographs of riders and dogs"
                                caption="Product details follow the opening promise, when riders are ready to inspect how it works."
                                className="mx-auto max-w-6xl"
                            />
                        </div>

                        <div className="space-y-10 md:space-y-14">
                            <CaseStudyDecision number="03" title="End with consultation">
                                <CaseStudyParagraph>
                                    Dog & Ride does not have one setup for every rider. The page
                                    ends with direct contact instead of a standard checkout.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={contactAndFaq}
                                alt="Dog & Ride contact form and common product questions"
                                caption="The FAQ handles practical questions before the rider starts a consultation."
                                className="mx-auto max-w-6xl"
                            />
                        </div>
                    </>
                ),
            },
            output: {
                description: 'Brand, website, and sales tools',
                children: (
                    <>
                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                I delivered the brand identity, research, photography direction and
                                editing, website design and Framer build, social media system, and
                                pitch presentation.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The website explains the product. Social media shows it in use. The
                                pitch deck presents the same idea to potential partners.
                            </CaseStudyParagraph>
                        </CaseStudyProse>

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
                    </>
                ),
            },
            impact: {
                description: 'One story across each channel',
                rhythm: 'tight',
                children: (
                    <div className="mx-auto max-w-page space-y-10">
                        <div className="space-y-6">
                            <CaseStudyParagraph>
                                Dog & Ride moved from a logo and video content to one identity and
                                message across its website, social media, and pitch materials.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                The website now explains the product, answers fit and safety
                                questions, and gives riders a clear consultation path.
                            </CaseStudyParagraph>
                        </div>

                        <div>
                            <span className="block text-eyebrow text-ink-low">
                                First five months after launch
                            </span>
                            <dl className="mt-6 grid grid-cols-2 gap-x-6 md:grid-cols-5">
                                {METRICS.map((metric) => (
                                    <div key={metric.label} className="border-t border-line py-5">
                                        <dt className="text-caption text-ink-low">
                                            {metric.label}
                                        </dt>
                                        <dd className="mt-3 font-mono text-card-title text-ink-high">
                                            {metric.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <Button href="https://www.dogandride.com/" external>
                            Visit Dog & Ride
                        </Button>
                    </div>
                ),
            },
        }}
    />
);

export default DogAndRideCaseStudy;
