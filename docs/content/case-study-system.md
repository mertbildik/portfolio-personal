# Case Study System

This document defines the shared case-study frame. Use [`writing.md`](./writing.md) for voice, headings, captions, evidence checks, and UI text. Use `docs/design/` for presentation.

Every case study is a hand-written component. The frame below is a rule, not a template: it is held by hand, using the shared parts in `case-studies/CaseStudyElements.tsx`.

## Header

Every case study opens with:

- project title
- a one- or two-sentence summary
- role
- timeline
- scope
- main tools

The summary carries the project’s central story. Do not add separate Central Story or Project Context sections. Place useful context in the summary, metadata, or Problem.

Work that cannot show its output replaces timeline and scope with its confidentiality status, and says in the header what can be shared instead.

## Sections

Every case study follows the same order:

1. **Problem** — What needed to change, why it mattered, and what constrained the work.
2. **Approach** — What was examined, what it revealed, and how it changed the direction.
3. **Solution** — The few decisions that shaped the product, with reasons and visible results.
4. **Output** — What was designed and shipped, including personal ownership.
5. **Impact** — What changed after delivery, supported by evidence and honest limits.

The frame stays consistent. The narrative and decisions must come from the project itself.

A study whose subject is an ongoing role rather than a shipped project may use its own section names, but still runs Problem-to-Impact in spirit: what the work was for, how it was done, and what changed.

## Evidence And Visuals

Connect research to decisions: name the source, the finding, and what changed. Do not present assumptions as findings. Label later reconstructions and current demonstrations.

Use visuals as evidence. Prefer the smallest set that shows the starting point, a useful finding, the main decisions, and the shipped work. Place each visual beside the point it proves.

## Output And Impact

Output records delivered work. Impact records verified changes in behavior, business, operations, public access, or capability.

Deliverable counts are not impact. If outcome data is unavailable, state the narrow change that can be verified.
