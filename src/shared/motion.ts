import type { Variants } from 'motion/react';

/**
 * The one entrance curve. See docs/design/motion.md.
 *
 * motion wants four numbers, CSS wants a cubic-bezier() string, so this
 * is the JS-side copy of `--ease-entrance` in src/index.css. If one changes, the
 * other has to change with it.
 */
export const EASE = [0.23, 1, 0.32, 1] as const;
export const VIEWPORT_ONCE = { once: true, margin: '-10%' } as const;

/**
 * Four entrances, one per job. Pick by what the thing is, not by how it feels:
 *
 * | Variant            | For                                          | Travel |
 * |--------------------|----------------------------------------------|--------|
 * | `staggerVariants`  | a container whose children enter in sequence | —      |
 * | `itemVariants`     | one child inside that container              | 12px   |
 * | `headerVariants`   | a page header, entering on load              | 10px   |
 * | `sectionVariants`  | a case-study section, entering on scroll     | 40px   |
 *
 * Nothing else should define its own. If a new element does not fit one of
 * these, the question is which of these it is, not which fifth one to add.
 */

export const staggerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.055, delayChildren: 0.08 },
    },
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, transform: 'translateY(12px)' },
    visible: {
        opacity: 1,
        transform: 'translateY(0)',
        transition: { duration: 0.55, ease: EASE },
    },
};

export const headerVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASE },
    },
};

export const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: EASE },
    },
};
