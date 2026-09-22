import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { PAGES, SITE_URL, type PageMetadata } from './src/app/meta';

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

const headFor = (page: PageMetadata, coverUrl?: string) => {
    const url = `${SITE_URL}${page.path}`;
    const title = escapeHtml(page.title);
    const description = escapeHtml(page.description);

    return [
        `<title>${title}</title>`,
        `<meta name="description" content="${description}" />`,
        `<link rel="canonical" href="${url}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="Mert Bildik" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:url" content="${url}" />`,
        ...(coverUrl ? [`<meta property="og:image" content="${SITE_URL}${coverUrl}" />`] : []),
        `<meta name="twitter:card" content="${coverUrl ? 'summary_large_image' : 'summary'}" />`,
        `<meta name="twitter:title" content="${title}" />`,
        `<meta name="twitter:description" content="${description}" />`,
        ...(coverUrl ? [`<meta name="twitter:image" content="${SITE_URL}${coverUrl}" />`] : []),
    ].join('\n    ');
};

/**
 * Writes a real HTML file per route, plus sitemap.xml.
 *
 * The site is a client-rendered SPA, so tags injected by React never reach a
 * link unfurler: Slack, LinkedIn and WhatsApp read the HTML and do not run the
 * JavaScript. Every case study therefore used to unfurl as the homepage. A
 * static file per route fixes that, and the host serves it ahead of the SPA
 * rewrite because the rewrite only applies when no file matches.
 */
const seo = (): Plugin => {
    let outDir = 'dist';
    const coverUrls = new Map<string, string>();

    return {
        name: 'seo',
        apply: 'build',

        configResolved(config) {
            outDir = resolve(config.root, config.build.outDir);
        },

        generateBundle(_options, bundle) {
            // Covers are content-hashed, so their public URL is only known once
            // the bundle exists.
            for (const chunk of Object.values(bundle)) {
                if (chunk.type !== 'asset') continue;
                for (const original of chunk.originalFileNames ?? []) {
                    const match = original.match(/portfolio\/assets\/(.+\/cover\.webp)$/);
                    if (match) coverUrls.set(match[1], `/${chunk.fileName}`);
                }
            }

            this.emitFile({
                type: 'asset',
                fileName: 'sitemap.xml',
                source:
                    '<?xml version="1.0" encoding="UTF-8"?>\n' +
                    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
                    PAGES.map((page) => `    <url><loc>${SITE_URL}${page.path}</loc></url>`).join(
                        '\n',
                    ) +
                    '\n</urlset>\n',
            });
        },

        async writeBundle() {
            const template = await readFile(resolve(outDir, 'index.html'), 'utf8');

            for (const page of PAGES) {
                const coverUrl = page.coverSource ? coverUrls.get(page.coverSource) : undefined;
                const html = template.replace('<!--seo-->', headFor(page, coverUrl));

                // "/" is index.html itself. A case study is written twice, as
                // portfolio/ofk.html and portfolio/ofk/index.html, because
                // static hosts disagree about which one answers the extension-
                // less URL we actually publish: Vercel resolves the .html
                // sibling, Netlify and Cloudflare Pages resolve the directory
                // index. Writing both means the link unfurls either way.
                const targets =
                    page.path === '/'
                        ? [resolve(outDir, 'index.html')]
                        : [
                              resolve(outDir, `.${page.path}.html`),
                              resolve(outDir, `.${page.path}`, 'index.html'),
                          ];

                for (const file of targets) {
                    await mkdir(dirname(file), { recursive: true });
                    await writeFile(file, html);
                }
            }
        },
    };
};

export default defineConfig({
    // Tailwind 4 runs as a Vite plugin. There is no tailwind.config.js and no
    // postcss.config.js: the whole theme lives in src/index.css.
    plugins: [react(), tailwindcss(), seo()],
    server: {
        port: 3000,
        host: '0.0.0.0',
        // Polling watcher: required for file changes to be seen from WSL.
        watch: {
            usePolling: true,
            interval: 1000,
        },
    },
});
