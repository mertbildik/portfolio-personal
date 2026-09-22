/**
 * What the site actually uses, counted from its own source.
 *
 * A design system that lists the widths it *intends* drifts the moment a case
 * study reaches for a different one. This counts the classes as written across
 * src/, so the page shows the system as built — including the parts nobody
 * decided on. /design excludes itself: the catalogue is not a use of the system
 * in the sense that matters here.
 *
 * Development only — see src/design/DesignRoute.tsx.
 */
import { readSource } from './source';

const CORPUS = readSource().components;

/** A class name is bounded by anything that is not a word character or hyphen, so `md:max-w-lg` counts. */
const boundary = (className: string) =>
    new RegExp(`(?<![\\w-])${className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`, 'g');

/** How many times a class appears in src/, variant prefixes included. */
export const uses = (className: string): number => CORPUS.match(boundary(className))?.length ?? 0;

/**
 * Every class in the source matching a family, with its count, most-used first.
 * `family('max-w-')` answers "which measures does this site actually have?".
 */
export const family = (prefix: string): { className: string; count: number }[] => {
    const found = new Map<string, number>();
    const pattern = new RegExp(`(?<![\\w-])${prefix}[a-z0-9-]+`, 'g');

    for (const match of CORPUS.matchAll(pattern)) {
        found.set(match[0], (found.get(match[0]) ?? 0) + 1);
    }

    return [...found]
        .map(([className, count]) => ({ className, count }))
        .sort((a, b) => b.count - a.count || a.className.localeCompare(b.className));
};
