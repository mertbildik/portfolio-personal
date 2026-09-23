import type { MetadataRoute } from 'next';
import { PAGES, SITE_URL } from './meta';

/** Every page with its own metadata, so adding a project adds it here. */
const sitemap = (): MetadataRoute.Sitemap =>
    PAGES.map((page) => ({ url: `${SITE_URL}${page.path}` }));

export default sitemap;
