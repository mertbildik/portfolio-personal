import { test, expect, Page } from '@playwright/test';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PROJECTS } from '../src/portfolio/content/projects';

const CASE_STUDIES = PROJECTS.map((p) => `/portfolio/${p.id}`);
const ALL = ['/', ...CASE_STUDIES];

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
            () => [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).length,
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

    for (const target of [page.getByText('mert.bildik@gmail.com'), page.getByRole('link', { name: 'LinkedIn' })]) {
        await expect(target).toBeInViewport();
    }
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

    for (const project of ['OFK Construction', 'Sinerjik', 'Dog & Ride', 'Adclusive', 'McKinsey & Co.']) {
        await expect(portfolio.getByRole('link', { name: new RegExp(project.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })).toBeVisible();
    }
});

test('homepage card outcomes remain visible on narrow screens', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto('/');
    await settle(page);

    await expect(page.getByText('A bilingual brand and website that makes an established construction record')).toBeVisible();
    await expect(page.getByText('A sales website used in four pitches')).toBeVisible();
    await expect(page.getByText('High-stakes visual communication shaped from complex models, under strict NDA.')).toBeVisible();
});

// The template used to drop any output block whose title contained "brand" or
// "social", so content written in projects.ts never appeared on the page.
test('every output block in the content file reaches the page', async ({ page }) => {
    for (const project of PROJECTS.filter((entry) => entry.renderer === 'template')) {
        await page.goto(`/portfolio/${project.id}`);
        await settle(page);

        for (const block of project.caseStudy.output) {
            await expect(
                page.getByRole('heading', { name: block.title, exact: true }),
                `${project.id} is missing the "${block.title}" block`,
            ).toBeVisible();
        }
    }
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

test('every referenced project image exists', () => {
    for (const project of PROJECTS.filter((entry) => entry.renderer === 'template')) {
        for (const block of project.caseStudy.output) {
            for (const image of block.images ?? []) {
                expect(
                    existsSync(`${ASSET_ROOT}${project.id}/${image}.webp`),
                    `${project.id} references missing image ${image}.webp`,
                ).toBe(true);
            }
        }
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
        await expect(page.getByRole('link', { name: study.link })).toHaveAttribute('href', study.href);
    });
}

test('Sinerjik presents the website as a sales tool', async ({ page }) => {
    await page.goto('/portfolio/sinerjik');
    await settle(page);

    await expect(page.getByText('Signed client', { exact: true })).toBeVisible();
    await expect(page.getByText('Pitches using the website', { exact: true })).toBeVisible();
    await expect(page.getByText('One of those pitches led to a signed client.', { exact: false })).toBeVisible();
    await expect(page.getByText('without exposing its production interface', { exact: false })).toBeVisible();
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

test('McKinsey uses the shared case-study header and section navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/portfolio/mckinsey');

    await expect(page.getByText('Status: Confidential', { exact: true })).toBeVisible();
    for (const tool of ['Slack', 'Microsoft 365', 'Affinity', 'think-cell']) {
        await expect(page.getByText(tool, { exact: true })).toBeVisible();
    }
    await expect(page.getByText('Work is under strict NDA. Process and outcomes can be shared on a call.')).toBeVisible();

    const frameWidth = await page.locator('main > div').evaluate((element) => element.getBoundingClientRect().width);
    expect(frameWidth).toBe(692);

    await page.getByRole('navigation', { name: 'Case study sections' }).hover();
    await page.getByRole('link', { name: 'Capabilities', exact: true }).click();
    await expect(page).toHaveURL('/portfolio/mckinsey#capabilities');
    await expect(page.locator('#capabilities')).toBeInViewport();
});

test('reduced motion disables smooth scrolling', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/portfolio/ofk');

    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('reduced motion stops homepage ambient and hover movement', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await settle(page);

    const card = page.locator('a[href="/portfolio/ofk"]');
    await card.hover();

    expect(await card.locator('.work-card-image').evaluate((image) => getComputedStyle(image).transform)).toBe('none');
    expect(await page.locator('.animate-ring-spin').evaluate((ring) => getComputedStyle(ring).animationName)).toBe('none');
});

test('case-study section navigation changes at the layout breakpoint without overflow', async ({ page }) => {
    for (const width of [767, 768, 1023, 1024]) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto('/portfolio/ofk');
        await page.locator('h1').waitFor();

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `case study overflows at ${width}px`).toBeLessThanOrEqual(1);
        await expect(page.getByRole('navigation')).toBeVisible({ visible: width >= 1024 });
    }
});

test('an unknown path falls back to home', async ({ page }) => {
    await page.goto('/does-not-exist');
    await expect(page).toHaveURL('/');
});
