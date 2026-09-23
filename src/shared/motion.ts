/**
 * The one easing curve, for the few things `motion` animates. See /design/motion.
 *
 * Motion on this site exists for feedback and causality only — a press, a hover,
 * a change of state — so nothing here describes an entrance. motion wants four
 * numbers, CSS wants a cubic-bezier() string, so this is the JS-side copy of
 * `--ease-out` in src/index.css. If one changes, the other has to change with it.
 */
export const EASE = [0.23, 1, 0.32, 1] as const;
