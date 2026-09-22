import { test, expect, Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PAGES, SITE_URL, projectMeta } from '../src/app/meta';
import { CONTACT_EMAIL, LINKEDIN_URL } from '../src/contact/details';
import { GROUPS, PROJECTS } from '../src/portfolio/content/projects';

/**
 * These tests protect behaviour, structure and real invariants, not copy. Every
 * fact they check is read from the module that owns it — the project index, the
 * page metadata, the contact details, the design tokens — so rewriting a
 * sentence never fails a test, and changing a fact changes what is expected.
 */

const CASE_STUDIES = PROJECTS.map((p) => `/portfolio/${p.id}`);
const ALL = ['/', ...CASE_STUDIES];

const MOBILE = { width: 390, height: 844 };
const SHORT_LAPTOP = { width: 1366, height: 625 };
const DESKTOP = { width: 1280, height: 800 };
const ASSET_ROOT = fileURLToPath(new URL('../src/portfolio/assets/', import.meta.url));

/** A breakpoint from the @theme block, in px. Tailwind compiles it into media queries without emitting the variable, so it is read from the source. */
const breakpoint = (name: string) => {
    const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
    const rem = css.match(new RegExp(`--breakpoint-${name}:\\s*([\\d.]+)rem`))?.[1];
    if (!rem) throw new Error(`--breakpoint-${name} is not defined in src/index.css`);
    return parseFloat(rem) * 16;
};

/**
 * Wait for the page's content, then scroll to the bottom so lazy images and
 * in-view sections resolve, and wait for every image to finish. Scrolling before
 * the content renders is a no-op, because the document is still one screen tall
 * at that point.
 */
async function settle(page: Page) {
    await page.locator('h1').first().waitFor();
    await page.waitForLoadState('networkidle');
    await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.75) {
            window.scrollTo(0, y);
            await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        }
        // A fast pass can outrun lazy loading, and each image that lands moves the
        // ones below it. Visit whatever is still pending until nothing is.
        for (let pending = 0; pending < 100; pending += 1) {
            const image = [...document.images].find((candidate) => !candidate.complete);
            if (!image) break;
            image.scrollIntoView({ block: 'center', behavior: 'instant' });
            await image.decode().catch(() => undefined);
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
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('h1')).toBeVisible();

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

// ---- homepage -----------------------------------------------------------------

test('homepage groups every project under its heading, in index order', async ({ page }) => {
    await page.goto('/');
    await settle(page);

    for (const group of GROUPS) {
        const region = page.getByRole('region', { name: group });
        await expect(region).toBeVisible();

        const expected = PROJECTS.filter((p) => p.group === group);
        const cards = region.locator('a[href^="/portfolio/"]');
        await expect(cards).toHaveCount(expected.length);
        for (const [index, project] of expected.entries()) {
            await expect(cards.nth(index)).toHaveAttribute('href', `/portfolio/${project.id}`);
            await expect(cards.nth(index)).toContainText(project.title);
        }
    }
});

test('homepage card outcomes remain visible on narrow screens', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto('/');
    await settle(page);

    for (const project of PROJECTS) {
        await expect(
            page.locator(`a[href="/portfolio/${project.id}"]`).getByText(project.summary),
        ).toBeVisible();
    }
});

test('homepage call to action scrolls to contact', async ({ page }) => {
    await page.goto('/');
    await page.locator('#home a[href="#contact"]').click();

    await expect(page).toHaveURL('/#contact');
    await expect(page.locator('#contact')).toBeInViewport();
});

// The whole page used to be locked to one screen with scrolling off, which put
// the contact details permanently out of reach on a short laptop.
test('contact details stay reachable on a short screen', async ({ page }) => {
    await page.setViewportSize(SHORT_LAPTOP);
    await page.goto('/#contact');

    // settle() scrolls the page the only way a visitor can. scrollIntoViewIfNeeded
    // would pass here even when the content sits in an unscrollable overflow-hidden box.
    await settle(page);

    await expect(page.locator('#contact').getByText(CONTACT_EMAIL)).toBeInViewport();
    await expect(page.locator(`#contact a[href="${LINKEDIN_URL}"]`)).toBeInViewport();
});

// ---- contact form ---------------------------------------------------------------

/**
 * The contact form is the only way the site converts, and it posts to a third
 * party. These drive it against a stubbed Formspree so the failure path is
 * exercised without sending anything.
 */
const FORMSPREE = 'https://formspree.io/**';
const SENDER = 'sender@example.com';

const contactForm = (page: Page) => page.locator('#contact form');

async function fillInquiry(page: Page) {
    await page.goto('/#contact');
    const form = contactForm(page);
    await form.locator('[name="name"]').fill('Test Sender');
    await form.locator('[name="email"]').fill(SENDER);
    await form.locator('[name="message"]').fill('A short brief about a project.');
}

const submit = (page: Page) => contactForm(page).locator('button[type="submit"]').click();

test('every contact form control has an accessible name', async ({ page }) => {
    await page.goto('/#contact');
    await contactForm(page).waitFor();
    const controls = contactForm(page).locator('input, textarea, button');

    expect(await controls.count()).toBeGreaterThan(0);
    for (const control of await controls.all()) {
        await expect(control).toHaveAccessibleName(/\S/);
    }
});

test('a successful inquiry replaces the form and confirms back to the sender', async ({ page }) => {
    await page.route(FORMSPREE, (route) =>
        route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
    );

    await fillInquiry(page);
    await submit(page);

    await expect(contactForm(page)).toHaveCount(0);
    await expect(page.locator('#contact').getByText(SENDER)).toBeVisible();
    await expect(page.locator('#contact').getByRole('alert')).toHaveCount(0);
});

test('a failed inquiry offers the email address rather than only a retry', async ({ page }) => {
    await page.route(FORMSPREE, (route) => route.fulfill({ status: 500, body: 'nope' }));

    await fillInquiry(page);
    await submit(page);

    const alert = page.locator('#contact').getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert.locator('a')).toHaveAttribute('href', `mailto:${CONTACT_EMAIL}`);
    // The brief is still there to retry with.
    await expect(contactForm(page).locator('[name="message"]')).not.toHaveValue('');
    await expect(contactForm(page).locator('button[type="submit"]')).toBeEnabled();
});

// The failure message used to survive every later edit, so the form could never
// return to a ready state once a send had failed.
test('editing the form clears a previous failure', async ({ page }) => {
    await page.route(FORMSPREE, (route) => route.fulfill({ status: 500, body: 'nope' }));

    await fillInquiry(page);
    await submit(page);
    await expect(page.locator('#contact').getByRole('alert')).toBeVisible();

    await contactForm(page).locator('[name="message"]').fill('A revised brief.');

    await expect(page.locator('#contact').getByRole('alert')).toHaveCount(0);
});

// ---- case studies -----------------------------------------------------------------

test('every project has a cover image on disk', () => {
    for (const project of PROJECTS) {
        expect(
            existsSync(`${ASSET_ROOT}${project.id}/cover.webp`),
            `${project.id} is missing assets/${project.id}/cover.webp`,
        ).toBe(true);
    }
});

test('direct case-study back navigation returns to portfolio', async ({ page }) => {
    await page.goto(CASE_STUDIES[0]);
    const back = page.locator('header a[href="/#portfolio"]');
    await expect(back).toHaveAccessibleName(/\S/);
    await back.click();

    await expect(page).toHaveURL('/#portfolio');
    await expect(page.locator('#portfolio')).toBeInViewport();
});

// The navigator and the sections are built from one list per study, so every
// anchor it offers has to land on a section that exists, headed as the anchor says.
for (const project of PROJECTS) {
    test(`${project.id} section navigation lands on every section it lists`, async ({ page }) => {
        await page.setViewportSize(DESKTOP);
        await page.goto(`/portfolio/${project.id}`);
        await settle(page);

        const nav = page.getByRole('navigation');
        const links = nav.locator('a[href^="#"]');
        expect(await links.count()).toBeGreaterThan(0);

        for (const link of await links.all()) {
            const id = (await link.getAttribute('href'))!.slice(1);
            const target = page.locator(`[id="${id}"]`);
            await expect(target, `#${id} is listed but not on the page`).toHaveCount(1);

            await nav.hover();
            await link.click();
            await expect(page).toHaveURL(`/portfolio/${project.id}#${id}`);
            await expect(target).toBeInViewport();
        }
    });
}

// A figure states its image's own pixel size, so the number cannot be typed wrong.
test('every case-study figure states the size of its image', async ({ page }) => {
    for (const path of CASE_STUDIES) {
        await page.goto(path);
        await settle(page);

        const figures = await page.locator('main figure').evaluateAll((all) =>
            all.map((figure) => {
                const image = figure.querySelector('img')!;
                return {
                    size: `${image.naturalWidth}×${image.naturalHeight}`,
                    caption: figure.querySelector('figcaption')?.textContent ?? '',
                };
            }),
        );
        for (const { size, caption } of figures) {
            expect(caption, `${path}: "${caption}"`).toContain(size);
        }
    }
});

/**
 * A study picks one of two frames: the wide shell, or the narrow page column.
 * Read the tokens rather than their values, so retuning the scale in index.css
 * is not a test failure.
 */
test('every case study sits in one of the two frames', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    for (const path of CASE_STUDIES) {
        await page.goto(path);
        await page.locator('h1').waitFor();

        const { frame, allowed } = await page.evaluate(() => {
            const style = getComputedStyle(document.documentElement);
            const token = (name: string) => parseFloat(style.getPropertyValue(name));
            const clamp = (width: number) => Math.min(width, document.documentElement.clientWidth);
            return {
                frame: document.querySelector('main > div')!.getBoundingClientRect().width,
                allowed: [token('--container-page'), token('--container-shell')]
                    .filter((width) => !Number.isNaN(width))
                    .map(clamp),
            };
        });
        expect(allowed, 'frame tokens are missing').toHaveLength(2);
        expect(allowed, `${path} frame is ${frame}px`).toContain(frame);
    }
});

test('case-study section navigation changes at the layout breakpoint without overflow', async ({
    page,
}) => {
    const md = breakpoint('md');
    const lg = breakpoint('lg');

    for (const width of [md - 1, md, lg - 1, lg]) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(CASE_STUDIES[0]);
        await page.locator('h1').waitFor();

        const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `case study overflows at ${width}px`).toBeLessThanOrEqual(1);
        await expect(page.getByRole('navigation')).toBeVisible({ visible: width >= lg });
    }
});

// ---- motion -----------------------------------------------------------------

test('reduced motion disables smooth scrolling', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(CASE_STUDIES[0]);

    expect(
        await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe('auto');
});

test('reduced motion stops ambient and hover movement on the homepage', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize(DESKTOP);
    await page.goto('/');
    await settle(page);

    const card = page.locator(`a[href="/portfolio/${PROJECTS[0].id}"]`);
    await card.hover();

    const transforms = await card
        .locator('img')
        .evaluateAll((images) => images.map((image) => getComputedStyle(image).transform));
    expect(transforms.length).toBeGreaterThan(0);
    expect(transforms.every((transform) => transform === 'none')).toBe(true);

    const endless = await page.evaluate(
        () =>
            document
                .getAnimations()
                .filter(
                    (animation) =>
                        animation.playState === 'running' &&
                        animation.effect?.getComputedTiming().iterations === Infinity,
                ).length,
    );
    expect(endless, 'endless animations still running').toBe(0);
});

// ---- routing ----------------------------------------------------------------

for (const project of PROJECTS) {
    test(`old /case-study/${project.id} link redirects to its case study`, async ({ page }) => {
        await page.goto(`/case-study/${project.id}`);
        await expect(page).toHaveURL(`/portfolio/${project.id}`);
    });
}

for (const section of ['portfolio', 'contact']) {
    test(`old /${section} link redirects to its homepage section`, async ({ page }) => {
        await page.goto(`/${section}`);
        await expect(page).toHaveURL(`/#${section}`);
        await expect(page.locator(`#${section}`)).toBeInViewport();
    });
}

// An unknown path used to redirect to the homepage, which erased the URL the
// visitor actually asked for and left them to guess what happened.
test('an unknown path keeps its URL and offers the way home', async ({ page }) => {
    await page.goto('/does-not-exist');

    await expect(page).toHaveURL('/does-not-exist');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main a[href="/"]')).toBeVisible();
});

// The design system is a development tool. In a build, /design is an unknown
// path like any other.
test('/design does not ship', async ({ page }) => {
    await page.goto('/does-not-exist');
    const notFound = await page.locator('h1').textContent();

    await page.goto('/design');
    await expect(page).toHaveURL('/design');
    await expect(page.locator('h1')).toHaveText(notFound!);
});

// Retired projects keep their URLs public on old CVs and profiles, so a case study
// that no longer exists has to land on the work list rather than a blank page.
test('an unknown case study falls back to the portfolio', async ({ page }) => {
    await page.goto('/portfolio/not-a-project');
    await expect(page).toHaveURL('/#portfolio');
    await expect(page.locator('#portfolio')).toBeInViewport();
});

// ---- metadata -----------------------------------------------------------------

/**
 * Link unfurlers — Slack, LinkedIn, WhatsApp — read the HTML as served and never
 * run the JavaScript. These load each page with JavaScript switched off, so they
 * see exactly what those crawlers see.
 */
for (const meta of PAGES) {
    test(`${meta.path} serves its own metadata to crawlers`, async ({ browser, request }) => {
        const context = await browser.newContext({ javaScriptEnabled: false });
        const page = await context.newPage();
        await page.goto(meta.path);

        const head = page.locator('head');
        const content = (selector: string) => head.locator(selector).getAttribute('content');
        // Compared as URLs: https://mertbildik.com and https://mertbildik.com/ are one address.
        const url = new URL(meta.path, SITE_URL).href;
        const absolute = (value: string | null) => value && new URL(value).href;

        // Exactly one of each: a second description would leave Google to pick one.
        for (const selector of [
            'title',
            'meta[name="description"]',
            'link[rel="canonical"]',
            'meta[property="og:title"]',
            'meta[property="og:description"]',
            'meta[property="og:url"]',
        ]) {
            await expect(head.locator(selector), selector).toHaveCount(1);
        }

        await expect(page).toHaveTitle(meta.title);
        expect(await content('meta[name="description"]')).toBe(meta.description);
        expect(absolute(await head.locator('link[rel="canonical"]').getAttribute('href'))).toBe(
            url,
        );
        expect(await content('meta[property="og:title"]')).toBe(meta.title);
        expect(await content('meta[property="og:description"]')).toBe(meta.description);
        expect(absolute(await content('meta[property="og:url"]'))).toBe(url);

        const image = head.locator('meta[property="og:image"]');
        if (meta.cover) {
            const src = await image.getAttribute('content');
            expect(src).toMatch(new RegExp(`^${SITE_URL}/`));
            // The preview image has to exist on this deployment, not only be named.
            const response = await request.get(src!.slice(SITE_URL.length));
            expect(response.status()).toBe(200);
            expect(response.headers()['content-type']).toMatch(/^image\//);
        } else {
            // Confidential work blurs its cover on the homepage, so it does not
            // get one in a link preview either.
            await expect(image).toHaveCount(0);
        }

        await context.close();
    });
}

// The title is the one tag that has to follow client-side navigation, so the
// browser tab names the page the visitor is on.
test('navigating to a case study updates the browser tab', async ({ page }) => {
    const project = PROJECTS[0];
    await page.goto('/');
    await page.locator(`a[href="/portfolio/${project.id}"]`).click();

    await expect(page).toHaveTitle(projectMeta(project).title);
});

test('the sitemap lists exactly the pages that have metadata', async ({ request }) => {
    const body = await (await request.get('/sitemap.xml')).text();
    const listed = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(listed.sort()).toEqual(PAGES.map((page) => `${SITE_URL}${page.path}`).sort());
});

test('robots.txt allows crawling and points at the sitemap', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text();

    expect(body).toMatch(/^Allow: \/$/m);
    expect(body).not.toMatch(/^Disallow: \/\s*$/m);
    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
});
