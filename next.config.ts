import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

export default (phase: string): NextConfig => ({
    /**
     * The living design system at /design is local only. Its route files are
     * named page.dev.tsx, and only the dev server counts `dev.tsx` as a page
     * extension, so a build has no /design route at all: the path is a 404 like
     * any other unknown one, and nothing under src/design/ is bundled.
     */
    pageExtensions: phase === PHASE_DEVELOPMENT_SERVER ? ['dev.tsx', 'tsx', 'ts'] : ['tsx', 'ts'],

    // CLAUDE.md is the one place this repo keeps agent instructions; see the
    // note there on the version-matched docs Next.js ships in node_modules.
    agentRules: false,

    async redirects() {
        return [
            // Case studies lived at /case-study/:id before; those links are on
            // old CVs and profiles, so the move is permanent.
            { source: '/case-study/:id', destination: '/portfolio/:id', permanent: true },
            // /portfolio and /contact are homepage sections today, but either
            // could become a page, so browsers must not cache these for good.
            { source: '/portfolio', destination: '/#portfolio', permanent: false },
            { source: '/contact', destination: '/#contact', permanent: false },
        ];
    },
});
