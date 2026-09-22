import { test, expect, Page } from '@playwright/test';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PROJECTS } from '../src/portfolio/content/projects';

const CASE_STUDIES = PROJECTS.map((p) => `/portfolio/${p.id}`);
const ALL = ['/', ...CASE_STUDIES];

const SITE_URL = 'https://mertbildik.com';
const MOBILE = { width: 390, height: 844 };
const SHORT_LAPTOP = { width: 1366, height: 625 };
const ASSET_ROOT = fileURLToPath(new URL('../src/portfolio/assets/', import.meta.url));

/**
 * Wait for the lazy page chunk, then scroll to the bottom so lazy images and
 * whileInView sections resolve. Scrolling before the chunk renders is a no-op,
 * because the document is still one screen tall at that point.
 */
async function settle(page: Page) {
    await page.locator('h1').first().waitFor();
    await page.waitForLoadState('networkidle');
    await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.75) {
            window.scrollTo(0, y);
            await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        }
        window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.waitForLoadState('networkidle');
}

for (const path of ALL) {
    test(`${path} renders without errors`, async ({ page }) => {
        const problems: string[] = [];
        page.on('console', (m) => m.type() === 'error' && problems.push(m.text()));
        page.on('pageerror', (e) => problems.push(e.message));

        await page.goto(path);
        await settle(page);

        expect(problems, `console errors on ${path}`).toEqual([]);
        await expect(page).toHaveURL(path);
        await expect(page.locator('h1').first()).toBeVisible();

        const broken = await page.evaluate(
            () =>
                [...document.querySelectorAll('img')].filter(
                    (i) => i.complete && i.naturalWidth === 0,
                ).length,
        );
        expect(broken, `broken images on ${path}`).toBe(0);
    });

    test(`${path} fits a phone`, async ({ page }) => {
        await page.setViewportSize(MOBILE);
        await page.goto(path);
        await settle(page);

        const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `${path} overflows sideways by ${overflow}px`).toBeLessThanOrEqual(1);
    });
}

// The whole page used to be locked to one screen with scrolling off, which put
// the contact details permanently out of reach on a short laptop.
test('contact details stay reachable on a short screen', async ({ page }) => {
    await page.setViewportSize(SHORT_LAPTOP);
    await page.goto('/#contact');

    // settle() scrolls the page the only way a visitor can. scrollIntoViewIfNeeded
    // would pass here even when the content sits in an unscrollable overflow-hidden box.
    await settle(page);

    for (const target of [
        page.getByText('mert.bildik@gmail.com'),
        page.getByRole('link', { name: 'LinkedIn' }),
    ]) {
        await expect(target).toBeInViewport();
    }
});

/**
 * The contact form is the only way the site converts, and it posts to a third
 * party. These drive it against a stubbed Formspree so the failure path is
 * exercised without sending anything.
 */
const FORMSPREE = 'https://formspree.io/**';

async function fillInquiry(page: Page) {
    await page.goto('/#contact');
    // By role, not by label: the "Copy email address" button's aria-label
    // contains "Email address" too.
    await page.getByRole('textbox', { name: 'Your name' }).fill('Test Sender');
    await page.getByRole('textbox', { name: 'Email address' }).fill('sender@example.com');
    await page
        .getByRole('textbox', { name: 'Project details' })
        .fill('A short brief about a project.');
}

test('a successful inquiry confirms back to the sender', async ({ page }) => {
    await page.route(FORMSPREE, (route) =>
        route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
    );

    await fillInquiry(page);
    await page.getByRole('button', { name: 'Send inquiry' }).click();

    await expect(page.getByRole('heading', { name: 'Request initiated.' })).toBeVisible();
    await expect(page.getByText('sender@example.com')).toBeVisible();
});

test('a failed inquiry offers the email address rather than only a retry', async ({ page }) => {
    await page.route(FORMSPREE, (route) => route.fulfill({ status: 500, body: 'nope' }));

    await fillInquiry(page);
    await page.getByRole('button', { name: 'Send inquiry' }).click();

    const alert = page.getByRole('alert');
    await expect(alert).toContainText('Sending failed');
    await expect(alert.getByRole('link', { name: 'mert.bildik@gmail.com' })).toHaveAttribute(
        'href',
        'mailto:mert.bildik@gmail.com',
    );
});

// The failure message used to survive every later edit, so "Ready to send."
// could never come back once a send had failed.
test('editing the form clears a previous failure', async ({ page }) => {
    await page.route(FORMSPREE, (route) => route.fulfill({ status: 500, body: 'nope' }));

    await fillInquiry(page);
    await page.getByRole('button', { name: 'Send inquiry' }).click();
    await expect(page.getByRole('alert')).toBeVisible();

    await page.getByRole('textbox', { name: 'Project details' }).fill('A revised brief.');

    await expect(page.getByRole('alert')).toHaveCount(0);
    await expect(page.getByText('Ready to send.')).toBeVisible();
});

test('homepage call to action scrolls to contact', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Get in touch' }).click();

    await expect(page).toHaveURL('/#contact');
    await expect(page.locator('#contact')).toBeInViewport();
});

test('homepage presents five work modules in two groups', async ({ page }) => {
    await page.goto('/');
    await settle(page);

    const portfolio = page.locator('#portfolio');
    await expect(portfolio.getByRole('heading', { name: 'Client work' })).toBeVisible();
    await expect(portfolio.getByRole('heading', { name: 'Experience' })).toBeVisible();

    for (const project of [
        'OFK Construction',
        'Sinerjik',
        'Dog & Ride',
        'Adclusive',
        'McKinsey & Co.',
    ]) {
        await expect(
            portfolio.getByRole('link', {
                name: new RegExp(project.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
            }),
        ).toBeVisible();
    }
});

test('homepage card outcomes remain visible on narrow screens', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto('/');
    await settle(page);

    await expect(
        page.getByText(
            'A bilingual brand and website that makes an established construction record',
        ),
    ).toBeVisible();
    await expect(page.getByText('A sales website used in four pitches')).toBeVisible();
    await expect(
        page.getByText(
            'High-stakes visual communication shaped from complex models, under strict NDA.',
        ),
    ).toBeVisible();
});

test('old case-study links still redirect', async ({ page }) => {
    await page.goto('/case-study/ofk');
    await expect(page).toHaveURL('/portfolio/ofk');
});

for (const section of ['portfolio', 'contact']) {
    test(`old /${section} link redirects to its homepage section`, async ({ page }) => {
        await page.goto(`/${section}`);
        await expect(page).toHaveURL(`/#${section}`);
        await expect(page.locator(`#${section}`)).toBeInViewport();
    });
}

// Covers are wired up by hand in assets/covers.ts, so a new project can reach the
// homepage with no image behind it. Vite cannot catch that; this can.
test('every project has a cover image on disk', () => {
    for (const project of PROJECTS) {
        expect(
            existsSync(`${ASSET_ROOT}${project.id}/cover.webp`),
            `${project.id} is missing assets/${project.id}/cover.webp`,
        ).toBe(true);
    }
});

test('direct case-study back navigation returns to portfolio', async ({ page }) => {
    await page.goto('/portfolio/ofk');
    await page.getByRole('link', { name: 'Back to portfolio' }).click();

    await expect(page).toHaveURL('/#portfolio');
    await expect(page.locator('#portfolio')).toBeInViewport();
});

test('case-study section navigation uses addressable native anchors', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/portfolio/ofk');
    await page.getByRole('navigation', { name: 'Case study sections' }).hover();
    await page.getByRole('link', { name: 'Approach', exact: true }).click();

    await expect(page).toHaveURL('/portfolio/ofk#approach');
    await expect(page.locator('#approach')).toBeInViewport();
});

for (const study of [
    { id: 'ofk', link: 'Visit OFK Construction', href: 'https://ofkconstruction.com' },
    { id: 'sinerjik', link: 'Visit Sinerjik', href: 'https://www.sinerjik.com.tr' },
    { id: 'dog-and-ride', link: 'Visit Dog & Ride', href: 'https://www.dogandride.com/' },
]) {
    test(`${study.id} presents the final case-study frame and live site`, async ({ page }) => {
        await page.goto(`/portfolio/${study.id}`);
        await settle(page);

        for (const label of ['Role', 'Timeline', 'Scope', 'Tools']) {
            await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
        }
        for (const section of ['Problem', 'Approach', 'Solution', 'Output', 'Impact']) {
            await expect(page.getByRole('heading', { name: section, exact: true })).toBeVisible();
        }
        await expect(page.getByRole('link', { name: study.link })).toHaveAttribute(
            'href',
            study.href,
        );
    });
}

test('Sinerjik presents the website as a sales tool', async ({ page }) => {
    await page.goto('/portfolio/sinerjik');
    await settle(page);

    await expect(page.getByText('Signed client', { exact: true })).toBeVisible();
    await expect(page.getByText('Pitches using the website', { exact: true })).toBeVisible();
    await expect(
        page.getByText('One of those pitches led to a signed client.', { exact: false }),
    ).toBeVisible();
    await expect(
        page.getByText('without exposing its production interface', { exact: false }),
    ).toBeVisible();
});

test('Dog & Ride presents supporting metrics for the first five months', async ({ page }) => {
    await page.goto('/portfolio/dog-and-ride');
    await settle(page);

    await expect(page.getByText('First five months after launch', { exact: true })).toBeVisible();
    for (const metric of ['56s', 'Instagram', '700+', '10K+', '100K+']) {
        await expect(page.getByText(metric, { exact: true })).toBeVisible();
    }
});

test('Adclusive presents the shipped two-sided product and honest outcome', async ({ page }) => {
    await page.goto('/portfolio/adclusive');
    await settle(page);

    for (const label of ['Role', 'Timeline', 'Scope', 'Tools']) {
        await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
    }
    for (const section of ['Problem', 'Approach', 'Solution', 'Output', 'Impact']) {
        await expect(page.getByRole('heading', { name: section, exact: true })).toBeVisible();
    }
    await expect(page.getByText('The MVP launched in June 2022.', { exact: false })).toBeVisible();
    await expect(page.getByText('~20', { exact: true })).toBeVisible();
    await expect(page.getByText('~50', { exact: true })).toBeVisible();
});

test('McKinsey keeps the narrow frame, its NDA header and section navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/portfolio/mckinsey');

    await expect(page.getByText('Status: Confidential', { exact: true })).toBeVisible();
    for (const tool of ['Slack', 'Microsoft 365', 'Affinity', 'think-cell']) {
        await expect(page.getByText(tool, { exact: true })).toBeVisible();
    }
    await expect(
        page.getByText('Work is under strict NDA. Process and outcomes can be shared on a call.'),
    ).toBeVisible();

    // This study asks CaseStudyLayout for the narrow `page` frame. Read the token
    // rather than its value, so retuning the scale in index.css is not a test failure.
    const frameWidth = await page
        .locator('main > div')
        .evaluate((element) => element.getBoundingClientRect().width);
    const pageColumn = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--container-page'),
    );
    expect(pageColumn.trim()).not.toBe('');
    expect(frameWidth).toBe(parseFloat(pageColumn));

    await page.getByRole('navigation', { name: 'Case study sections' }).hover();
    await page.getByRole('link', { name: 'Capabilities', exact: true }).click();
    await expect(page).toHaveURL('/portfolio/mckinsey#capabilities');
    await expect(page.locator('#capabilities')).toBeInViewport();
});

test('reduced motion disables smooth scrolling', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/portfolio/ofk');

    expect(
        await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe('auto');
});

test('reduced motion stops homepage ambient and hover movement', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await settle(page);

    const card = page.locator('a[href="/portfolio/ofk"]');
    await card.hover();

    expect(
        await card
            .locator('.work-card-image')
            .evaluate((image) => getComputedStyle(image).transform),
    ).toBe('none');
    expect(
        await page
            .locator('.animate-ring-spin')
            .evaluate((ring) => getComputedStyle(ring).animationName),
    ).toBe('none');
});

test('case-study section navigation changes at the layout breakpoint without overflow', async ({
    page,
}) => {
    for (const width of [767, 768, 1023, 1024]) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto('/portfolio/ofk');
        await page.locator('h1').waitFor();

        const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `case study overflows at ${width}px`).toBeLessThanOrEqual(1);
        await expect(page.getByRole('navigation')).toBeVisible({ visible: width >= 1024 });
    }
});

// An unknown path used to redirect to the homepage, which erased the URL the
// visitor actually asked for and left them to guess what happened.
test('an unknown path says the page does not exist', async ({ page }) => {
    await page.goto('/does-not-exist');

    await expect(page).toHaveURL('/does-not-exist');
    await expect(page.getByRole('heading', { name: 'This page does not exist.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Go to the homepage' })).toBeVisible();
});

/**
 * Every case study used to unfurl as the homepage, because the tags React
 * injects never reach a link unfurler: Slack, LinkedIn and WhatsApp read the
 * HTML and do not run the JavaScript.
 *
 * These assertions therefore read the raw HTML rather than the rendered page,
 * because that is the only thing those crawlers see.
 */
// "McKinsey & Co." and "Dog & Ride" reach the document as "&amp;".
const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

for (const project of PROJECTS) {
    test(`${project.id} unfurls as itself, not as the homepage`, async ({ request }) => {
        const html = await (await request.get(`/portfolio/${project.id}`)).text();
        const meta = (property: string) =>
            html.match(new RegExp(`<meta property="${property}" content="([^"]*)"`))?.[1];

        expect(html).toContain(`<title>${escapeHtml(project.title)} | Mert Bildik</title>`);
        expect(html).toContain(
            `<link rel="canonical" href="${SITE_URL}/portfolio/${project.id}" />`,
        );
        expect(meta('og:title')).toBe(`${escapeHtml(project.title)} | Mert Bildik`);
        expect(meta('og:description')).toBe(escapeHtml(project.summary));
        expect(meta('og:url')).toBe(`${SITE_URL}/portfolio/${project.id}`);

        // Exactly one of each: the marker is replaced, not appended to.
        expect(html.match(/<meta name="description"/g)).toHaveLength(1);
        expect(html.match(/<title>/g)).toHaveLength(1);

        if (project.confidential) {
            // Confidential work blurs its cover on the homepage, so it does not
            // get one in a link preview either.
            expect(meta('og:image')).toBeUndefined();
        } else {
            expect(meta('og:image')).toMatch(new RegExp(`^${SITE_URL}/.+\\.webp$`));
        }
    });
}

test('the homepage still unfurls as the homepage', async ({ request }) => {
    const html = await (await request.get('/')).text();

    expect(html).toContain('<title>Mert Bildik | Product designer</title>');
    expect(html).toContain(`<link rel="canonical" href="${SITE_URL}/" />`);
    expect(html).not.toContain('<!--seo-->');
});

// The title is the one tag React still owns, so that client-side navigation
// updates the browser tab.
test('navigating to a case study updates the browser tab', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'OFK Construction' }).click();

    await expect(page).toHaveTitle('OFK Construction | Mert Bildik');
});

test('the sitemap lists the homepage and every project', async ({ request }) => {
    const body = await (await request.get('/sitemap.xml')).text();

    expect(body).toContain(`<loc>${SITE_URL}/</loc>`);
    for (const project of PROJECTS) {
        expect(body, `sitemap is missing ${project.id}`).toContain(
            `<loc>${SITE_URL}/portfolio/${project.id}</loc>`,
        );
    }
});

// Retired projects keep their URLs public on old CVs and profiles, so a case study
// that no longer exists has to land on the work list rather than a blank page.
test('an unknown case study falls back to the portfolio', async ({ page }) => {
    await page.goto('/portfolio/not-a-project');
    await expect(page).toHaveURL('/#portfolio');
    await expect(page.locator('#portfolio')).toBeInViewport();
});
