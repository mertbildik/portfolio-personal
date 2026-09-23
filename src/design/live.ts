/**
 * The painted side of the design system: what the browser actually resolves a
 * token to, once `var()` has been followed and alpha has been composited over
 * the canvas.
 *
 * A declaration can differ from what is painted — a translucent colour becomes
 * whatever tone it makes over the canvas — and contrast has to be measured
 * against what is painted. So this module measures rather than asserts.
 *
 * Development only — see src/design/DesignRoute.tsx.
 */

/** Values only change on reload, so each probe runs once. */
const cache = new Map<string, string>();

let bench: HTMLDivElement | null = null;

/** An offscreen element that still resolves styles, unlike `display: none`. */
const workbench = (): HTMLDivElement => {
    if (!bench) {
        bench = document.createElement('div');
        bench.setAttribute('aria-hidden', 'true');
        bench.style.cssText =
            'position:absolute;left:-9999px;top:0;width:0;height:0;overflow:hidden;visibility:hidden';
        document.body.appendChild(bench);
    }
    return bench;
};

/** One computed property of an element carrying `className`. */
export const computed = (className: string, property: string): string => {
    const key = `${className}|${property}`;
    const hit = cache.get(key);
    if (hit !== undefined) return hit;

    const element = document.createElement('div');
    element.className = className;
    workbench().appendChild(element);
    const value = getComputedStyle(element).getPropertyValue(property).trim();
    element.remove();

    cache.set(key, value);
    return value;
};

/** A custom property as the browser holds it on :root. '' if Tailwind never emitted it. */
export const variable = (name: string): string => {
    const hit = cache.get(`var:${name}`);
    if (hit !== undefined) return hit;

    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    cache.set(`var:${name}`, value);
    return value;
};

const rgba = (color: string): [number, number, number, number] => {
    const parts = color.match(/[\d.]+/g)?.map(Number) ?? [];
    const [r = 0, g = 0, b = 0, a = 1] = parts;
    return [r, g, b, a];
};

const hex = (r: number, g: number, b: number) =>
    `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;

/**
 * A colour as it is painted: `cssValue` resolved by the browser, then
 * composited over `over` so a translucent token reports the tone it becomes.
 */
export const painted = (cssValue: string, over = '#111111'): string => {
    const key = `paint:${cssValue}|${over}`;
    const hit = cache.get(key);
    if (hit !== undefined) return hit;

    const element = document.createElement('span');
    element.style.color = cssValue;
    workbench().appendChild(element);
    const resolved = getComputedStyle(element).color;
    element.remove();

    const [r, g, b, alpha] = rgba(resolved);
    const [br, bg, bb] = rgba(
        `rgb(${parseInt(over.slice(1, 3), 16)},${parseInt(over.slice(3, 5), 16)},${parseInt(over.slice(5, 7), 16)})`,
    );

    const value = hex(
        r * alpha + br * (1 - alpha),
        g * alpha + bg * (1 - alpha),
        b * alpha + bb * (1 - alpha),
    );
    cache.set(key, value);
    return value;
};

const luminance = (colour: string): number => {
    const channels = [1, 3, 5].map((i) => {
        const v = parseInt(colour.slice(i, i + 2), 16) / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

/** WCAG contrast between two opaque hexes, to one decimal place. */
export const contrast = (a: string, b: string): number => {
    const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return Math.round(((high + 0.05) / (low + 0.05)) * 10) / 10;
};

/** The WCAG grade a ratio earns for body-sized text. */
export const grade = (ratio: number): string =>
    ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large' : 'fails';

/*
 * APCA 0.98G-4g, the contrast model the inks are calibrated to. WCAG 2 is kept
 * above because it is still the legal floor, but it overstates contrast when one
 * colour is near black, so on a dark-only site it cannot be what the inks are
 * designed against.
 */
const apcaY = (colour: string): number => {
    const [r, g, b] = [1, 3, 5].map((i) => (parseInt(colour.slice(i, i + 2), 16) / 255) ** 2.4);
    const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
    return y < 0.022 ? y + (0.022 - y) ** 1.414 : y;
};

/** APCA lightness contrast of text on a background, as a positive Lc to one decimal. */
export const lc = (text: string, background: string): number => {
    const t = apcaY(text);
    const b = apcaY(background);
    if (Math.abs(b - t) < 0.0005) return 0;
    const raw = b > t ? (b ** 0.56 - t ** 0.57) * 1.14 : (b ** 0.65 - t ** 0.62) * 1.14;
    const clipped = Math.abs(raw) < 0.1 ? 0 : raw - Math.sign(raw) * 0.027;
    return Math.round(Math.abs(clipped) * 1000) / 10;
};

/** What an Lc permits, from APCA's own thresholds. */
export const permits = (value: number): string =>
    value >= 90
        ? 'fluent body text'
        : value >= 75
          ? 'body text'
          : value >= 60
            ? 'content text'
            : value >= 45
              ? 'large text, metadata'
              : value >= 30
                ? 'placeholders only'
                : 'non-text only';
