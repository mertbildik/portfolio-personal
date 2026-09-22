import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import ActionCircle from '../shared/ActionCircle';
import { staggerVariants, itemVariants } from '../shared/motion';
import mertPhoto from './mert.webp';

const HeroSection: React.FC = () => (
    <motion.div
        className="relative z-20 flex min-w-0 flex-col"
        variants={staggerVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.div variants={itemVariants} className="flex items-center gap-8">
            <div className="relative ml-4 shrink-0 md:ml-5">
                <div className="relative z-10 h-24 w-24 overflow-hidden rounded-full border border-line md:h-28 md:w-28">
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
                    <text className="fill-current text-ink-low" style={{ fontSize: 8.5, letterSpacing: 0.4 }}>
                        <textPath href="#warsaw-ring-path" textLength={Math.PI * 90} lengthAdjust="spacing">
                            {'Based in Warsaw • Based in Warsaw • Based in Warsaw •\u00A0'}
                        </textPath>
                    </text>
                </svg>
            </div>

            <div>
                <span className="block text-headline text-ink-high">Mert Bildik</span>
                <span className="mt-2 block text-body-sm text-ink-low">Product designer</span>
            </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="mt-16 text-hero text-ink-high md:mt-20 md:text-hero-lg">
            <span>I design &amp; build </span>
            <span className="text-ink-max">digital products, websites, and visual experiences.</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-8 max-w-xl text-body text-ink-body">
            Today, I run my own company, taking B2B products from idea to shipped site. Previously, I was a visual
            communication specialist at{' '}
            <a
                href="https://www.mckinsey.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-transparent pb-0.5 text-ink-high transition-[color,border-color] duration-200 ease-entrance hover:border-ink-low hover:text-ink-max focus-visible:border-ink-low focus-visible:text-ink-max focus-visible:outline-none"
            >
                McKinsey &amp; Company
            </a>
            .
        </motion.p>

        <motion.blockquote variants={itemVariants} className="mt-12 max-w-lg text-headline text-ink-high">
            “Helping people spend less time clicking and more time living.”
        </motion.blockquote>

        <motion.a
            variants={itemVariants}
            href="#contact"
            className="group mt-14 flex w-full cursor-pointer items-center justify-between whitespace-nowrap focus-visible:outline-none"
        >
            <span className="flex shrink-0 flex-col">
                <span className="text-card-title text-ink-high transition-colors duration-200 ease-entrance group-hover:text-ink-max group-focus-visible:text-ink-max">
                    Get in touch
                </span>
                <span className="mt-1 flex items-center gap-2 text-caption text-ink-low transition-colors duration-200 ease-entrance group-hover:text-ink-body group-focus-visible:text-ink-body">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-ok" />
                    Available for new projects
                </span>
            </span>
            <ActionCircle>
                <ArrowUpRight size={20} />
            </ActionCircle>
        </motion.a>
    </motion.div>
);

export default HeroSection;
