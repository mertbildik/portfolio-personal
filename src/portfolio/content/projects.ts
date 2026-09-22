import { EMPLOYMENT_CONTENT, type EmploymentData } from './employment';

export interface ImpactStat {
    number: string;
    title: string;
    description: string;
}

export interface OutputBlock {
    title: string;
    description: string;
    /** Filenames (without extension) from src/portfolio/assets/<project id>/ */
    images?: string[];
    columns?: 1 | 2;
}

export interface CaseStudy {
    timeline: string;
    tools: string[];
    oneLineSummary: string;
    problem: string;
    context: string;
    goals: string[];
    usersScenario: string;
    approach: string;
    solution: string;
    keyDecisions: string[];
    output: OutputBlock[];
    impact: {
        user: string | ImpactStat[];
        business: string | ImpactStat[];
    };
    learnings: string;
}

interface ProjectBase {
    id: string;
    kind: 'clientProject' | 'employment' | 'venture';
    title: string;
    role: string;
    yearOrStatus: string;
}

export interface TemplateProject extends ProjectBase {
    renderer: 'template';
    caseStudy: CaseStudy;
}

export interface EmploymentProject extends ProjectBase {
    renderer: 'employment';
    employment: EmploymentData;
}

export interface CustomProject extends ProjectBase {
    renderer: 'custom';
    page: 'ofk' | 'dog-and-ride' | 'adclusive' | 'curvix' | 'gala-network';
}

export type Project = TemplateProject | EmploymentProject | CustomProject;
export type ProjectKind = Project['kind'];

export const PROJECTS: Project[] = [
    {
        id: 'ofk',
        kind: 'clientProject',
        title: 'OFK Construction',
        role: 'Product designer',
        yearOrStatus: '2026',
        renderer: 'custom',
        page: 'ofk',
    },
    {
        id: 'dog-and-ride',
        kind: 'clientProject',
        title: 'Dog & Ride',
        role: 'Multidisciplinary designer',
        yearOrStatus: '2025',
        renderer: 'custom',
        page: 'dog-and-ride',
    },
    {
        id: 'bunect',
        kind: 'clientProject',
        title: 'Bunect',
        role: 'Design lead',
        yearOrStatus: '2025',
        renderer: 'template',
        caseStudy: {
            timeline: 'Jan 2025 to Present (ongoing)',
            tools: ['Framer', 'Notion', 'Adobe Creative Suite', 'Canva', 'PowerPoint'],
            oneLineSummary: 'A word of mouth service business turned into a clear digital system with a website, sales deck, and improved branding that converts traffic into inquiries.',
            problem: 'Bunect was growing mainly through word of mouth.\nThere was no website to explain services clearly.\nThere was no deck to present the offer in meetings.',
            context: 'Core problem statement\nThe service was real, but there was no clear digital path to educate and convert new clients.',
            goals: ['Make services easy to understand', 'Make contact one tap away'],
            usersScenario: 'People had to ask everything in chat.\nThat slowed down decisions and cost leads.',
            approach: 'Services were grouped into clear categories.\nContent was written from real client questions.\nA landing flow was built to push high intent users to action fast.',
            solution: 'The goal was simple.\nLet people understand the offer in seconds and reach the team instantly.',
            keyDecisions: [
                'Landing page website — Clear service categories. Short explanations for each service. Contact form for warm leads.',
                'One click conversion path — A direct button that opens WhatsApp in one tap. Built for fast mobile decisions.',
                'Sales presentation deck — A deck for meetings and outreach. Clear structure. Easy to skim.',
                'Brand refinement — A base identity existed. The system was improved and made more consistent across touchpoints.',
            ],
            output: [
                {
                    title: 'Website',
                    description: 'A single landing page that explains services and converts traffic into inquiries. Built to work with social and Google Ads.',
                    images: ['home', 'services', 'contact'],
                },
                {
                    title: 'Presentation deck',
                    description: 'A reusable deck for client meetings and outreach.',
                    images: ['presentation-1', 'presentation-2'],
                },
                {
                    title: 'Brand system',
                    description: 'Cleaner visuals and more consistent use of type and color.',
                },
            ],
            impact: {
                user: [
                    {
                        number: '+20',
                        title: 'WhatsApp clicks per month',
                        description: 'People don’t hunt for info. They tap once and ask the right question.',
                    },
                    {
                        number: '3',
                        title: 'Clear service paths',
                        description: 'Accounting, TRC, and company setup each has a direct route. People land, pick, and move.',
                    },
                ],
                business: [
                    {
                        number: '+2000',
                        title: 'Website visits per month',
                        description: 'A steady stream of intent in one place. Easier to answer questions and convert interest.',
                    },
                    {
                        number: '+8',
                        title: 'Meetings booked per month',
                        description: 'The deck and site make the first conversation shorter, clearer, and easier to lead.',
                    },
                ],
            },
            learnings: 'Small businesses do not need complex funnels.\nThey need clear offers and fast contact paths.',
        },
    },
    {
        id: 'adclusive',
        kind: 'employment',
        title: 'Adclusive',
        role: 'Product designer',
        yearOrStatus: '2021 – 2024',
        renderer: 'custom',
        page: 'adclusive',
    },
    {
        id: 'mckinsey',
        kind: 'employment',
        title: 'McKinsey & Co.',
        role: 'Visual communication',
        yearOrStatus: '2021 – 2024',
        renderer: 'employment',
        employment: EMPLOYMENT_CONTENT.mckinsey,
    },
    {
        id: 'curvix',
        kind: 'venture',
        title: 'Curvix',
        role: 'Founder',
        yearOrStatus: 'Current',
        renderer: 'custom',
        page: 'curvix',
    },
    {
        id: 'gala-network',
        kind: 'venture',
        title: 'GalaNetwork',
        role: 'Co-founder',
        yearOrStatus: 'Current',
        renderer: 'custom',
        page: 'gala-network',
    },
];
