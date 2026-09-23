/**
 * The authored side of the design system: the `@theme` block of src/index.css,
 * parsed from the file itself.
 *
 * Nothing here is retyped. A page that wants to show what `--text-hero` holds
 * asks this module, so the only way for the design system to be wrong is for
 * index.css to be wrong. Tailwind emits a theme variable only where the matching
 * utility is used, so reading `:root` back from the browser would show holes;
 * the source has no holes.
 *
 * Development only — see src/design/DesignRoute.tsx.
 */
import { readSource } from './source';

const source = readSource().css;

const withoutComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '');

/** The body of `@theme { … }`, brace-matched so the nested @keyframes survives. */
const themeBody = (css: string): string => {
    const at = css.indexOf('@theme');
    if (at === -1) return '';
    const open = css.indexOf('{', at);
    if (open === -1) return '';

    let depth = 0;
    for (let i = open; i < css.length; i += 1) {
        if (css[i] === '{') depth += 1;
        else if (css[i] === '}') {
            depth -= 1;
            if (depth === 0) return css.slice(open + 1, i);
        }
    }
    return '';
};

/**
 * Custom properties declared directly in the block. Anything inside a nested
 * block — the `@keyframes` — is skipped: those are not tokens.
 */
const declarations = (body: string): Map<string, string> => {
    const out = new Map<string, string>();
    let depth = 0;
    let buffer = '';

    for (const character of body) {
        if (character === '{') {
            depth += 1;
            buffer = '';
        } else if (character === '}') {
            depth -= 1;
            buffer = '';
        } else if (character === ';' && depth === 0) {
            const colon = buffer.indexOf(':');
            const name = buffer.slice(0, colon).trim();
            if (colon > 0 && name.startsWith('--')) {
                out.set(
                    name,
                    buffer
                        .slice(colon + 1)
                        .replace(/\s+/g, ' ')
                        .trim(),
                );
            }
            buffer = '';
        } else {
            buffer += character;
        }
    }

    return out;
};

const TOKENS = declarations(themeBody(withoutComments(source)));

/** One token's authored value, or '—' if index.css does not declare it. */
export const authored = (name: string): string => TOKENS.get(name) ?? '—';

/** Every token name under a prefix, in the order index.css declares them. */
export const tokensUnder = (prefix: string): string[] =>
    [...TOKENS.keys()].filter((name) => name.startsWith(prefix));

/**
 * The type scale, in source order. A step is a `--text-*` that is not itself one
 * of the `--text-*--line-height` style modifiers.
 */
export const TYPE_STEPS: {
    token: string;
    size: string;
    lineHeight: string;
    letterSpacing: string;
    weight: string;
}[] = tokensUnder('--text-')
    .filter((name) => !name.includes('--', 2))
    .map((name) => ({
        token: name.slice('--text-'.length),
        size: authored(name),
        lineHeight: authored(`${name}--line-height`),
        letterSpacing: authored(`${name}--letter-spacing`),
        weight: authored(`${name}--font-weight`),
    }));

/** The breakpoints, which Tailwind compiles into media queries and never emits as variables. */
export const BREAKPOINTS = tokensUnder('--breakpoint-').map((name) => ({
    name: name.slice('--breakpoint-'.length),
    value: authored(name),
}));
