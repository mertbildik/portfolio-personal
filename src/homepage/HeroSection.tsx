import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ActionCircle from '../shared/ActionCircle';
import mertPhoto from './mert.webp';

const HeroSection: React.FC = () => (
    <div className="relative z-20 flex min-w-0 flex-col">
        <div className="flex items-center gap-8">
            <div className="relative ml-4 shrink-0 md:ml-5">
                <div className="relative z-10 h-24 w-24 overflow-hidden rounded-full border border-edge md:h-28 md:w-28">
                    <img
                        src={mertPhoto}
                        alt="Mert Bildik"
                        className="h-full w-full scale-[1.2] object-cover object-[center_22%]"
                    />
                </div>
                <svg
                    viewBox="0 0 100 100"
                    className="animate-ring-spin absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] md:-inset-5 md:h-[calc(100%+2.5rem)] md:w-[calc(100%+2.5rem)]"
                    aria-hidden="true"
                >
                    <defs>
                        <path
                            id="warsaw-ring-path"
                            d="M 50,50 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                            fill="none"
                        />
                    </defs>
                    <text
                        className="fill-current text-ink-secondary"
                        style={{ fontSize: 8.5, letterSpacing: 0.4 }}
                    >
                        <textPath
                            href="#warsaw-ring-path"
                            textLength={Math.PI * 90}
                            lengthAdjust="spacing"
                        >
                            {'Based in Warsaw • Based in Warsaw • Based in Warsaw • '}
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* A name and what the person does read as one unit, so the two lines
                sit directly on each other and separate by ink alone. */}
            <div>
                <span className="block text-heading text-ink">Mert Bildik</span>
                <span className="block text-small text-ink-secondary">Product designer</span>
            </div>
        </div>

        <h1 className="mt-12 text-display text-ink-large md:mt-16">
            I design &amp; build digital products, websites, and visual experiences.
        </h1>

        <p className="mt-6 max-w-measure text-body text-ink">
            Today, I run my own company, taking B2B products from idea to shipped site. Previously,
            I was a visual communication specialist at{' '}
            <a
                href="https://www.mckinsey.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-edge-strong underline-offset-4 transition-colors duration-120 ease-out hover:decoration-ink-secondary"
            >
                McKinsey &amp; Company
            </a>
            .
        </p>

        <blockquote className="mt-8 max-w-measure text-lead text-ink">
            “Helping people spend less time clicking and more time living.”
        </blockquote>

        <a
            href="#contact"
            className="group mt-10 flex w-full cursor-pointer items-center justify-between whitespace-nowrap"
        >
            <span className="flex shrink-0 flex-col">
                <span className="text-heading text-ink transition-colors duration-120 ease-out">
                    Get in touch
                </span>
                <span className="mt-1 flex items-center gap-2 text-small text-ink-secondary transition-colors duration-120 ease-out group-hover:text-ink group-focus-visible:text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                    Available for new projects
                </span>
            </span>
            <ActionCircle>
                <ArrowUpRight size={20} />
            </ActionCircle>
        </a>
    </div>
);

export default HeroSection;
