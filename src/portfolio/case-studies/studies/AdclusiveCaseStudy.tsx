import React from 'react';
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
import type { Project } from '../../content/projects';
import {
    CaseStudyDecision,
    CaseStudyImage,
    CaseStudyParagraph,
    CaseStudyProse,
} from '../CaseStudyElements';
import CaseStudyFrame from '../CaseStudyFrame';

const SHIPPED = [
    'Advertiser and publisher workspaces',
    'Account creation and onboarding',
    'Campaign creation and discovery',
    'Campaign applications and tracking links',
    'Performance dashboards',
    'Transaction, invoice, and payout states',
    'Desktop and mobile interfaces',
] as const;

const AdclusiveCaseStudy: React.FC<{ project: Project }> = ({ project }) => (
    <CaseStudyFrame
        project={project}
        summary="Adclusive connected advertisers with publishers and influencers. I designed both sides of the product so campaigns, tracking, performance, and payments worked in one system."
        role="Part-time product designer"
        timeline="Sep 2021 to Jan 2024"
        scope="Product structure, UX/UI, design system, front-end support"
        tools={['Figma', 'Slack', 'HTML', 'CSS', 'Angular']}
        sections={{
            problem: {
                description: 'Two sides of one campaign',
                rhythm: 'tight',
                children: (
                    <CaseStudyProse>
                        <CaseStudyParagraph>Every campaign had two sides.</CaseStudyParagraph>
                        <CaseStudyParagraph>
                            Advertisers needed to create an offer, set the commission, and review
                            results. Publishers and influencers needed to find campaigns, create
                            tracking links, and follow their earnings.
                        </CaseStudyParagraph>
                        <CaseStudyParagraph>
                            Both sides depended on the same campaign data but needed different
                            views. If the rules, links, or payment status were unclear, people could
                            not trust the platform.
                        </CaseStudyParagraph>
                    </CaseStudyProse>
                ),
            },
            approach: {
                description: 'Structure before visual design',
                children: (
                    <>
                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                The marketing team shared what they learned from potential clients
                                and stakeholders. The project manager and backend developer defined
                                the product requirements. I turned that input into flows and
                                screens.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                I started with a sitemap to separate the advertiser and publisher
                                journeys. I then made quick digital wireframes to settle the
                                navigation and content hierarchy before working on the visual
                                design.
                            </CaseStudyParagraph>
                        </CaseStudyProse>

                        <CaseStudyImage
                            src={sitemap}
                            alt="Adclusive sitemap separating advertiser and publisher workspaces"
                            caption="The shared entry split into separate advertiser and publisher workspaces."
                            className="mx-auto max-w-figure-wide"
                        />

                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                The wireframes were working sketches, not polished prototypes. They
                                helped us agree on the structure while changes were still easy to
                                make.
                            </CaseStudyParagraph>
                        </CaseStudyProse>

                        <div className="mx-auto grid w-full max-w-figure-wide grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
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

                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                I was the only product designer on an eight-person team. I worked
                                with two software engineers, a project manager, a senior project
                                manager, and three people on the marketing team.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                I also created the design system and built some components in code.
                                This helped keep the Figma files and product interface consistent.
                            </CaseStudyParagraph>
                        </CaseStudyProse>
                    </>
                ),
            },
            solution: {
                description: 'Four product decisions',
                rhythm: 'wide',
                children: (
                    <>
                        <div className="space-y-8 md:space-y-10">
                            <CaseStudyDecision number="01" title="One product, two workspaces">
                                <CaseStudyParagraph>
                                    Publishers and advertisers selected their role when creating an
                                    account. Each role then received its own navigation and tasks.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    The workspaces shared the same layout and component rules.
                                    People only saw the tools relevant to their side of the
                                    platform.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={createAccount}
                                alt="Adclusive account creation with publisher and advertiser roles"
                                caption="The account type determined which workspace and tools appeared next."
                                className="mx-auto max-w-figure-inset"
                            />
                        </div>

                        <div className="space-y-8 md:space-y-10">
                            <CaseStudyDecision number="02" title="Campaign setup in three parts">
                                <CaseStudyParagraph>
                                    Advertisers had to provide campaign details, define who could
                                    participate, and set the commission.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    I grouped those requirements into General information,
                                    Collaboration, and Commission. This made a long form easier to
                                    scan and complete.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <div className="mx-auto grid w-full max-w-figure-wide grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
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

                        <div className="space-y-8 md:space-y-10">
                            <CaseStudyDecision number="03" title="Tracking links ready to use">
                                <CaseStudyParagraph>
                                    Publishers could browse categories, find advertisers, and apply
                                    to campaigns.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    Once accepted, they could generate raw, cookie-based, and
                                    redirect-based tracking links. Each link had a direct copy
                                    action.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <div className="mx-auto grid w-full max-w-figure-wide grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
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
                                className="mx-auto max-w-figure"
                            />
                        </div>

                        <div className="space-y-8 md:space-y-10">
                            <CaseStudyDecision number="04" title="Clear financial states">
                                <CaseStudyParagraph>
                                    The advertiser dashboard connected sales, commissions, publisher
                                    performance, transactions, and invoices.
                                </CaseStudyParagraph>
                                <CaseStudyParagraph>
                                    The publisher dashboard separated estimated revenue from the
                                    available balance. It also showed whether earnings were awaiting
                                    approval, approved, invoiced, or ready for payment.
                                </CaseStudyParagraph>
                            </CaseStudyDecision>
                            <CaseStudyImage
                                src={advertiserDashboard}
                                alt="Adclusive advertiser dashboard with sales, commissions, transactions, and invoices"
                                caption="Advertisers could review sales, commissions, publisher activity, and invoice status together."
                                className="mx-auto max-w-figure-wide"
                            />
                        </div>
                    </>
                ),
            },
            output: {
                description: 'The shipped MVP',
                children: (
                    <>
                        <CaseStudyProse>
                            <CaseStudyParagraph>
                                I owned the product structure, wireframes, visual design, and design
                                system. I also supported the front end with tokens, HTML, CSS, and a
                                small number of coded components.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>The shipped MVP included:</CaseStudyParagraph>
                            <ul className="grid max-w-list grid-cols-1 gap-x-8 md:grid-cols-2">
                                {SHIPPED.map((item) => (
                                    <li key={item} className="rule-t py-4 text-small text-ink">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CaseStudyProse>

                        <div className="mx-auto grid w-full max-w-figure-narrow grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
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
                            className="mx-auto max-w-figure-wide"
                        />
                    </>
                ),
            },
            impact: {
                description: 'Launch and limits',
                rhythm: 'tight',
                children: (
                    <div className="mx-auto max-w-page space-y-8">
                        <div className="space-y-6">
                            <CaseStudyParagraph>
                                The MVP launched in June 2022. Four months later, it had around 70
                                accounts: approximately 20 advertisers and 50 publishers or
                                influencers.
                            </CaseStudyParagraph>
                        </div>

                        <div className="grid max-w-list grid-cols-1 gap-8 rule-y py-8 md:grid-cols-2">
                            <div>
                                <span className="block font-mono text-title text-ink-large">
                                    ~20
                                </span>
                                <span className="mt-3 block text-label text-ink-secondary">
                                    Advertiser accounts
                                </span>
                            </div>
                            <div>
                                <span className="block font-mono text-title text-ink-large">
                                    ~50
                                </span>
                                <span className="mt-3 block text-label text-ink-secondary">
                                    Publisher and influencer accounts
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <CaseStudyParagraph>
                                Adclusive stopped operating in January 2024. The platform needed
                                both sides to grow together: campaigns to attract creators, and
                                creators to attract advertisers. We never reached enough activity
                                for that cycle to sustain itself. Regulatory requirements made the
                                model harder to run.
                            </CaseStudyParagraph>
                            <CaseStudyParagraph>
                                I cannot link the account numbers to a specific design decision. The
                                verified result is that we launched a working MVP and brought early
                                advertisers, publishers, and influencers onto it.
                            </CaseStudyParagraph>
                        </div>
                    </div>
                ),
            },
        }}
    />
);

export default AdclusiveCaseStudy;
