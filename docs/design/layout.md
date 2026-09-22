# Layout

The site is a narrow single scroll first, with wider case studies as a second shape.

## Frame

The shared frames set max width, gutters and vertical padding. `HomePageSection` owns the narrow homepage frame. `CaseStudyLayout` takes a `width`: `shell` for studies carrying screenshots, `page` for the narrow column used by text-and-data studies.

## Breakpoints

| Name | What changes |
|---|---|
| `md` | Content splits into two or three columns inside a block. Gutters widen. |
| `lg` | Case-study grids and the fixed section navigator switch on. |
| `xl` | Gutters become symmetric. |

`sm` is not used. The homepage stays one narrow column. Internal content grids collapse below their declared breakpoint.

## The single scroll

The homepage is one column: hero, selected work, and contact, stacked. Sections use direct headings without eyebrow chrome. Selected work contains two explicit groups, Client work and Experience, and all project modules remain full width. Nothing is hidden behind tabs or separate pages.

## Case studies

Every case study is a hand-written page built from the same parts: a header carrying metadata and tools, then numbered sections in one order. From `lg`, a fixed right-edge section indicator expands on hover or keyboard focus to show the section names and descriptions. Sections carry a scroll margin for anchored jumps.

## Grid

Case studies on the `shell` frame may use a 12-column grid from `lg`; the `page` frame does not. Homepage project metadata and case-study headers use local metadata grids without changing the page shape.

## Measure

There is no measure token. Widths are Tailwind's `max-w-*` utilities, chosen by what the text is:

| Cap | For |
|---|---|
| `max-w-xs` | A section's lead paragraph |
| `max-w-md` | A paragraph inside a grid cell |
| `max-w-xl` | The one-line summary under a page heading |
| `max-w-2xl` | Case-study body copy. The default for prose. |
| `max-w-page` | The complete homepage section |

Prose never runs wider than `max-w-2xl`. If a block of text has no cap, add one.

A `min-width` is a guard, not a measure. The few that exist each stop one column collapsing under its own content.

## Stacking order

From back to front: the fixed background, then page content, then the fixed section navigator.

There are no modals, dropdowns or tooltips in the system, so nothing else claims a layer in this ladder. A local `z-10` inside a component, to lift a label above its own decoration, is not part of it.

## Fixed navigation

The case-study section navigator is fixed to the right viewport edge from `lg`. Its resting state keeps only the section indicator visible so it does not compete with the content.
