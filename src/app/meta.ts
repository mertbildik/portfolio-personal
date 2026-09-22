import { PROJECTS, type Project } from '../portfolio/content/projects';

/**
 * Page metadata, in one place.
 *
 * Imported both by the app (for the document title during client-side
 * navigation) and by vite.config.ts (to bake the tags into a real HTML file per
 * route at build time). This file must stay free of asset imports so the Vite
 * config can load it in plain Node, for the same reason content/projects.ts
 * must.
 */
export const SITE_URL = 'https://mertbildik.com';

export interface PageMetadata {
    path: string;
    title: string;
    description: string;
    /** Path of the cover image inside src/portfolio/assets, if the page has one. */
    coverSource?: string;
}

export const HOME_META: PageMetadata = {
    path: '/',
    title: 'Mert Bildik | Product designer',
    description:
        'Digital products, websites, and visual experiences designed and built by Mert Bildik.',
};

export const projectMeta = (project: Project): PageMetadata => ({
    path: `/portfolio/${project.id}`,
    title: `${project.title} | Mert Bildik`,
    description: project.summary,
    // Confidential work blurs its cover on the homepage, so it does not get one
    // in a link preview either.
    coverSource: project.confidential ? undefined : `${project.id}/cover.webp`,
});

/** Every route that gets its own pre-built HTML file, in sitemap order. */
export const PAGES: readonly PageMetadata[] = [HOME_META, ...PROJECTS.map(projectMeta)];
