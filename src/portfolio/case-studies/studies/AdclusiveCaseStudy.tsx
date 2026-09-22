import React from 'react';
import { motion } from 'motion/react';
import advertiserDashboard from '../../assets/adclusive/advertiser-dashboard.webp';
import applications from '../../assets/adclusive/applications.webp';
import createAccount from '../../assets/adclusive/create-account.webp';
import createCampaign from '../../assets/adclusive/create-campaign.webp';
import generalAccountSettings from '../../assets/adclusive/general-account-settings.webp';
import mobileLogin from '../../assets/adclusive/mobile-login.webp';
import mobileOnboarding from '../../assets/adclusive/mobile-onboarding.webp';
import publisherDashboard from '../../assets/adclusive/publisher-dashboard.webp';
import search from '../../assets/adclusive/search.webp';
import sitemap from '../../assets/adclusive/sitemap.webp';
import trackingLinks from '../../assets/adclusive/tracking-links.webp';
import wireframeCampaign from '../../assets/adclusive/wireframe-campaign.webp';
import wireframeDashboard from '../../assets/adclusive/wireframe-dashboard.webp';
import type { CustomProject } from '../../content/projects';
import { sectionVariants, VIEWPORT_ONCE } from '../../../shared/motion';
import { CaseStudyHeader, CaseStudyImage, CaseStudySectionHeading } from '../CaseStudyElements';
import CaseStudySectionNavigator from '../CaseStudySectionNavigator';

const SECTIONS = [
    { id: 'problem', label: 'Problem', description: 'Two sides of one campaign' },
    { id: 'approach', label: 'Approach', description: 'Structure before visual design' },
    { id: 'solution', label: 'Solution', description: 'Four product decisions' },
    { id: 'output', label: 'Output', description: 'The shipped MVP' },
    { id: 'impact', label: 'Impact', description: 'Launch and limits' },
] as const;

const AdclusiveCaseStudy: React.FC<{ project: CustomProject }> = ({ project }) => (
    <div className="w-full">
        <CaseStudyHeader
            title={project.title}
            summary="Adclusive connected advertisers with publishers and influencers. I designed both sides of the product so campaigns, tracking, performance, and payments worked in one system."
            role="Part-time product designer"
            timeline="Sep 2021 to Jan 2024"
            scope="Product structure, UX/UI, design system, front-end support"
            tools={['Figma', 'Slack', 'HTML', 'CSS', 'Angular']}
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
                    <p className="max-w-2xl text-body text-ink-body">Every campaign had two sides.</p>
                    <p className="max-w-2xl text-body text-ink-body">
                        Advertisers needed to create an offer, set the commission, and review results. Publishers and influencers needed to find campaigns, create tracking links, and follow their earnings.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        Both sides depended on the same campaign data but needed different views. If the rules, links, or payment status were unclear, people could not trust the platform.
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
                        The marketing team shared what they learned from potential clients and stakeholders. The project manager and backend developer defined the product requirements. I turned that input into flows and screens.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        I started with a sitemap to separate the advertiser and publisher journeys. I then made quick digital wireframes to settle the navigation and content hierarchy before working on the visual design.
                    </p>
                </div>

                <CaseStudyImage
                    src={sitemap}
                    alt="Adclusive sitemap separating advertiser and publisher workspaces"
                    caption="The shared entry split into separate advertiser and publisher workspaces."
                    className="mx-auto max-w-6xl"
                />

                <div className="mx-auto max-w-page space-y-6">
                    <p className="max-w-2xl text-body text-ink-body">
                        The wireframes were working sketches, not polished prototypes. They helped us agree on the structure while changes were still easy to make.
                    </p>
                </div>

                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
                    <CaseStudyImage
                        src={wireframeDashboard}
                        alt="Low-fidelity Adclusive publisher dashboard"
                        caption="The wireframe settled the block order before any visual design."
                    />
                    <CaseStudyImage
                        src={publisherDashboard}
                        alt="Shipped Adclusive publisher dashboard following the wireframe hierarchy"
                        caption="The shipped screen kept that order: overview, performance, graph, then supporting lists."
                    />
                </div>

                <div className="mx-auto max-w-page space-y-6">
                    <p className="max-w-2xl text-body text-ink-body">
                        I was the only product designer on an eight-person team. I worked with two software engineers, a project manager, a senior project manager, and three people on the marketing team.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">
                        I also created the design system and built some components in code. This helped keep the Figma files and product interface consistent.
                    </p>
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
                        <h3 className="mt-4 text-card-title text-ink-high">One product, two workspaces</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            Publishers and advertisers selected their role when creating an account. Each role then received its own navigation and tasks.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            The workspaces shared the same layout and component rules. People only saw the tools relevant to their side of the platform.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={createAccount}
                        alt="Adclusive account creation with publisher and advertiser roles"
                        caption="The account type determined which workspace and tools appeared next."
                        className="mx-auto max-w-sm"
                    />
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">02</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Campaign setup in three parts</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            Advertisers had to provide campaign details, define who could participate, and set the commission.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            I grouped those requirements into General information, Collaboration, and Commission. This made a long form easier to scan and complete.
                        </p>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
                        <CaseStudyImage
                            src={wireframeCampaign}
                            alt="Low-fidelity Adclusive campaign creation form"
                            caption="The wireframe grouped campaign details, collaboration, and commission."
                        />
                        <CaseStudyImage
                            src={createCampaign}
                            alt="Shipped Adclusive campaign creation form"
                            caption="The shipped form kept the same three-part structure."
                        />
                    </div>
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">03</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Tracking links ready to use</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            Publishers could browse categories, find advertisers, and apply to campaigns.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            Once accepted, they could generate raw, cookie-based, and redirect-based tracking links. Each link had a direct copy action.
                        </p>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
                        <CaseStudyImage
                            src={search}
                            alt="Adclusive advertiser search organized by campaign category"
                            caption="Publishers could browse the available campaigns by category."
                        />
                        <CaseStudyImage
                            src={applications}
                            alt="Adclusive campaign invitations with commission rates and expiry dates"
                            caption="Publishers could compare each invitation before accepting it."
                        />
                    </div>
                    <CaseStudyImage
                        src={trackingLinks}
                        alt="Adclusive modal with three customized tracking link formats"
                        caption="Each tracking format could be copied from one place."
                        className="mx-auto max-w-5xl"
                    />
                </div>

                <div className="space-y-10 md:space-y-14">
                    <div className="mx-auto max-w-page">
                        <span className="font-mono text-caption text-ink-low">04</span>
                        <h3 className="mt-4 text-card-title text-ink-high">Clear financial states</h3>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            The advertiser dashboard connected sales, commissions, publisher performance, transactions, and invoices.
                        </p>
                        <p className="mt-4 max-w-2xl text-body text-ink-body">
                            The publisher dashboard separated estimated revenue from the available balance. It also showed whether earnings were awaiting approval, approved, invoiced, or ready for payment.
                        </p>
                    </div>
                    <CaseStudyImage
                        src={advertiserDashboard}
                        alt="Adclusive advertiser dashboard with sales, commissions, transactions, and invoices"
                        caption="Advertisers could review sales, commissions, publisher activity, and invoice status together."
                        className="mx-auto max-w-6xl"
                    />
                    <CaseStudyImage
                        src={publisherDashboard}
                        alt="Adclusive publisher dashboard with estimated revenue, account balance, and earnings split across payment stages"
                        caption="Publishers could separate estimated revenue from the balance they could actually withdraw."
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
                        I owned the product structure, wireframes, visual design, and design system. I also supported the front end with tokens, HTML, CSS, and a small number of coded components.
                    </p>
                    <p className="max-w-2xl text-body text-ink-body">The shipped MVP included:</p>
                    <ul className="grid max-w-2xl grid-cols-1 gap-x-8 md:grid-cols-2">
                        {[
                            'Advertiser and publisher workspaces',
                            'Account creation and onboarding',
                            'Campaign creation and discovery',
                            'Campaign applications and tracking links',
                            'Performance dashboards',
                            'Transaction, invoice, and payout states',
                            'Desktop and mobile interfaces',
                        ].map((item) => (
                            <li key={item} className="border-t border-line py-4 text-body-sm text-ink-body">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
                    <CaseStudyImage
                        src={mobileLogin}
                        alt="Adclusive mobile login"
                        caption="The login flow adapted to smaller screens."
                    />
                    <CaseStudyImage
                        src={mobileOnboarding}
                        alt="Adclusive mobile advertiser onboarding checklist"
                        caption="Onboarding moved new advertisers toward their first campaign."
                    />
                </div>

                <CaseStudyImage
                    src={generalAccountSettings}
                    alt="Adclusive account settings for profile, notifications, payment, and password"
                    caption="Account settings kept profile, notification, payment, and password details together."
                    className="mx-auto max-w-6xl"
                />
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
                            The MVP launched in June 2022. Four months later, it had around 70 accounts: approximately 20 advertisers and 50 publishers or influencers.
                        </p>
                    </div>

                    <div className="grid max-w-2xl grid-cols-1 gap-8 border-y border-line py-8 md:grid-cols-2">
                        <div>
                            <span className="block font-mono text-display-md text-ink-high">~20</span>
                            <span className="mt-3 block text-eyebrow text-ink-low">Advertiser accounts</span>
                        </div>
                        <div>
                            <span className="block font-mono text-display-md text-ink-high">~50</span>
                            <span className="mt-3 block text-eyebrow text-ink-low">Publisher and influencer accounts</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="max-w-2xl text-body text-ink-body">
                            Adclusive stopped operating in January 2024. The platform needed both sides to grow together: campaigns to attract creators, and creators to attract advertisers. We never reached enough activity for that cycle to sustain itself. Regulatory requirements made the model harder to run.
                        </p>
                        <p className="max-w-2xl text-body text-ink-body">
                            I cannot link the account numbers to a specific design decision. The verified result is that we launched a working MVP and brought early advertisers, publishers, and influencers onto it.
                        </p>
                    </div>
                </div>
            </motion.section>
        </div>
    </div>
);

export default AdclusiveCaseStudy;
