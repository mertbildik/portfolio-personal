import { globSync, readFileSync } from 'node:fs';
import type { Metadata } from 'next';
import DesignSystem from '../../../design/DesignSystem';

/**
 * The living design system, local only: `.dev.tsx` is a page extension only
 * under `next dev` (see next.config.ts), so a build has no /design route.
 */
export const metadata: Metadata = { title: 'Design system — Mert Bildik' };

const read = (path: string) => readFileSync(path, 'utf8');

const DesignPage = () => (
    <DesignSystem
        css={read('src/index.css')}
        // The catalogue is not a use of the system in the sense that matters, so
        // it does not count itself: Type.tsx prints class names in its prose.
        components={globSync('src/**/*.tsx', { exclude: ['src/design/**'] })
            .map(read)
            .join('\n')}
    />
);

export default DesignPage;
