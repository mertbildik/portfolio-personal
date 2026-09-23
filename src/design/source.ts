/**
 * The text the design system reads: the @theme block's file, and every
 * component the site is built from.
 *
 * The route reads both from disk on the server (src/app/design/[[...page]]/
 * page.dev.tsx) and DesignSystem hands them over here before any page of the
 * catalogue loads, since theme.ts and census.ts parse them as they are imported.
 *
 * Development only — see src/design/DesignRoute.tsx.
 */
export interface Source {
    /** src/index.css, as written. */
    css: string;
    /** Every .tsx file under src/ except this folder, concatenated. */
    components: string;
}

let current: Source | null = null;

export const provideSource = (source: Source) => {
    current = source;
};

export const readSource = (): Source => {
    if (!current) throw new Error('The design system read its source before it was provided.');
    return current;
};
