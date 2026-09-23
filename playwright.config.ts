import { defineConfig } from '@playwright/test';

const PORT = 4173;

// Runs against the production build, not the dev server: the bugs this catches
// (missing Tailwind classes, clipped layout) only show up in the built CSS.
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: process.env.CI ? 'list' : [['list'], ['html', { open: 'never' }]],
    // settle() waits on networkidle twice per page, which is a timing heuristic.
    // A single blip used to mean a red run with nothing to inspect: retry it on
    // CI, and keep the trace of the attempt that failed.
    retries: process.env.CI ? 2 : 0,
    use: {
        baseURL: `http://localhost:${PORT}`,
        channel: 'chromium',
        trace: 'on-first-retry',
    },
    webServer: {
        command: `npm run build && npm run start -- --port ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: false,
        timeout: 120_000,
        // The contact form only posts when it has a Formspree id, and the suite
        // stubs every request to formspree.io. A placeholder id lets the form
        // tests run where .env does not exist, as on CI; nothing is ever sent.
        env: { NEXT_PUBLIC_FORMSPREE_ID: 'playwright' },
    },
});
