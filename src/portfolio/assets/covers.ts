import adclusive from './adclusive/cover.webp';
import dogAndRide from './dog-and-ride/cover.webp';
import mckinsey from './mckinsey/cover.webp';
import ofk from './ofk/cover.webp';
import sinerjik from './sinerjik/cover.webp';

/**
 * Homepage card images, one per project, keyed by project id.
 *
 * These live here rather than in content/projects.ts because that file is also
 * imported by the Playwright suite in plain Node, which cannot resolve .webp.
 * The index stays pure data; the bundler-dependent part stays with the assets.
 */
export const COVERS: Record<string, string> = {
    ofk,
    sinerjik,
    'dog-and-ride': dogAndRide,
    adclusive,
    mckinsey,
};
