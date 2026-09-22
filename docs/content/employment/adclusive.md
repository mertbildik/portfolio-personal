# Adclusive

Editorial reference only. Published project content lives in `src/portfolio/case-studies/studies/AdclusiveCaseStudy.tsx`.

- **Kind:** Long-term engagement
- **Role:** Part-time product designer
- **Year / Status:** 2021 – 2024
- **Timeline:** Sep 2021 to Jan 2024
- **Scope:** Product structure, UX/UI, design system, front-end support
- **Tools:** Figma, Slack, HTML, CSS, Angular

**Summary:** Adclusive connected advertisers with publishers and influencers. I designed both sides of the product so campaigns, tracking, performance, and payments worked in one system.

## Problem

Every campaign had two sides.

Advertisers needed to create an offer, set the commission, and review results. Publishers and influencers needed to find campaigns, create tracking links, and follow their earnings.

Both sides depended on the same campaign data but needed different views. If the rules, links, or payment status were unclear, people could not trust the platform.

## Approach

The marketing team shared what they learned from potential clients and stakeholders. The project manager and backend developer defined the product requirements. I turned that input into flows and screens.

I started with a sitemap to separate the advertiser and publisher journeys. I then made quick digital wireframes to settle the navigation and content hierarchy before working on the visual design.

**Visual:** `sitemap.webp`

*The shared entry split into separate advertiser and publisher workspaces.*

The wireframes were working sketches, not polished prototypes. They helped us agree on the structure while changes were still easy to make.

**Visual:** `wireframe-dashboard.webp`

*The wireframe settled the dashboard hierarchy before visual design.*

I was the only product designer on an eight-person team. I worked with two software engineers, a project manager, a senior project manager, and three people on the marketing team.

I also created the design system and built some components in code. This helped keep the Figma files and product interface consistent.

## Solution

### One product, two workspaces

Publishers and advertisers selected their role when creating an account. Each role then received its own navigation and tasks.

The workspaces shared the same layout and component rules. People only saw the tools relevant to their side of the platform.

**Visual:** `create-account.webp`

*The account type determined which workspace and tools appeared next.*

### Campaign setup in three parts

Advertisers had to provide campaign details, define who could participate, and set the commission.

I grouped those requirements into General information, Collaboration, and Commission. This made a long form easier to scan and complete.

**Visuals:** `wireframe-campaign.webp`, `create-campaign.webp`

*The final form kept the three-part structure established in the wireframe.*

### Tracking links ready to use

Publishers could browse categories, find advertisers, and apply to campaigns.

Once accepted, they could generate raw, cookie-based, and redirect-based tracking links. Each link had a direct copy action.

**Visuals:** `search.webp`, `applications.webp`, `tracking-links.webp`

*Publishers could browse campaigns, compare invitations, and copy each tracking format from one place.*

### Clear financial states

The advertiser dashboard connected sales, commissions, publisher performance, transactions, and invoices.

The publisher dashboard separated estimated revenue from the available balance. It also showed whether earnings were awaiting approval, approved, invoiced, or ready for payment.

**Visual:** `advertiser-dashboard.webp`

*Each side saw the financial information needed for its part of the transaction.*

## Output

I owned the product structure, wireframes, visual design, and design system. I also supported the front end with tokens, HTML, CSS, and a small number of coded components.

The shipped MVP included:

- Advertiser and publisher workspaces
- Account creation and onboarding
- Campaign creation and discovery
- Campaign applications and tracking links
- Performance dashboards
- Transaction, invoice, and payout states
- Desktop and mobile interfaces

**Visuals:** `mobile-login.webp`, `mobile-onboarding.webp`, `general-account-settings.webp`

*The shipped onboarding helped new advertisers verify their account, create a campaign, and complete their details.*

*Account settings kept profile, notification, payment, and password details together.*

## Impact

The MVP launched in June 2022. Four months later, it had around 70 accounts: approximately 20 advertisers and 50 publishers or influencers.

Adclusive stopped operating in January 2024. The platform needed both sides to grow together: campaigns to attract creators, and creators to attract advertisers. We never reached enough activity for that cycle to sustain itself. Regulatory requirements made the model harder to run.

I cannot link the account numbers to a specific design decision. The verified result is that we launched a working MVP and brought early advertisers, publishers, and influencers onto it.
