import adclusive from './adclusive/cover.webp';
import dogAndRide from './dog-and-ride/cover.webp';
import mckinsey from './mckinsey/cover.webp';
import ofk from './ofk/cover.webp';
import sinerjik from './sinerjik/cover.webp';

import type { StaticImageData } from 'next/image';
import type { ProjectId } from '../content/projects';

/**
 * Homepage card images, one per project, keyed by project id.
 *
 * These live here rather than in content/projects.ts because that file is also
 * imported by the Playwright suite in plain Node, which cannot resolve .webp.
 * The index stays pure data; the bundler-dependent part stays with the assets.
 *
 * Keyed to ProjectId, so a project without a cover is a compile error rather
 * than a blank hole on the homepage.
 */
export const COVERS: Record<ProjectId, StaticImageData> = {
    ofk,
    sinerjik,
    'dog-and-ride': dogAndRide,
    adclusive,
    mckinsey,
};
