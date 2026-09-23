import type { Metadata } from 'next';
import { PROJECTS, type Project, type ProjectId } from '../portfolio/content/projects';

/**
 * Page metadata, in one place.
 *
 * The routes turn these into Next.js metadata, which is rendered into the HTML
 * each page is served with — the only thing link unfurlers read. The Playwright
 * suite imports this file too, in plain Node, so it must stay free of asset
 * imports for the same reason content/projects.ts must.
 */
export const SITE_URL = 'https://www.mertbildik.com';

export interface PageMetadata {
    path: string;
    title: string;
    description: string;
    /** The project whose cover previews this page when it is shared, if any. */
    cover?: ProjectId;
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
    cover: project.confidential ? undefined : project.id,
});

/** Every route that gets its own pre-built HTML file, in sitemap order. */
export const PAGES: readonly PageMetadata[] = [HOME_META, ...PROJECTS.map(projectMeta)];

/**
 * The tags a page is served with. `image` is the cover's URL; the metadataBase
 * set in the root layout turns it, and the canonical, into absolute URLs.
 *
 * Built whole for each page rather than merged from the layout: Next.js
 * replaces a nested object like openGraph outright instead of merging it.
 */
export const toMetadata = (page: PageMetadata, image?: string): Metadata => ({
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
        type: 'website',
        siteName: 'Mert Bildik',
        title: page.title,
        description: page.description,
        url: page.path,
        ...(image ? { images: [image] } : {}),
    },
    twitter: {
        card: image ? 'summary_large_image' : 'summary',
        title: page.title,
        description: page.description,
        ...(image ? { images: [image] } : {}),
    },
});
