import React from 'react';

/**
 * Sets the document title for a route.
 *
 * Title only, deliberately. Descriptions, canonicals and Open Graph tags are
 * baked into a real HTML file per route at build time (see the seo plugin in
 * vite.config.ts), because link unfurlers and most crawlers never run the
 * JavaScript that would inject them here. Rendering them here as well would
 * leave two of each tag in the document, which is worse than one correct one.
 *
 * React 19 hoists <title> into <head> on its own, so this needs no library.
 */
const PageMeta: React.FC<{ title: string }> = ({ title }) => <title>{title}</title>;

export default PageMeta;
