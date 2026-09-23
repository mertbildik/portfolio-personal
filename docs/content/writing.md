# Portfolio Writing System

Writing is part of the interface. Help the reader understand the work, decide what matters, and know where to look next. Prefer clear thinking in a small space over more detail.

These rules govern the words on the site. The words themselves live in one place only: the case-study component in `src/portfolio/case-studies/studies/`, or the homepage section that renders them. There is no second copy to keep in step.

## Voice And Clarity

Write like a thoughtful practitioner explaining real work to an intelligent peer.

- Start with the thing, problem, or decision.
- Let evidence create authority; avoid pitch-deck language.
- Use "I" for your decisions, observations, and lessons.
- State opinions when they clarify a choice, then explain why.
- Use ordinary words, active verbs, and occasional warmth. Do not perform personality.
- Name the audience, action, constraint, artifact, or result.
- Give each sentence one job. Keep most paragraphs to one to three sentences.
- Keep most sentences under 18 words; split anything over 25.
- Use short sentences to land an idea: "The product was strong. The buying experience was not."
- Cut filler, repetition, and adjectives that evidence can replace.

Prefer:

> The work was real. The proof of it was not visible anywhere online.

Avoid:

> We created a cutting-edge, user-centric digital ecosystem that empowers businesses to thrive.

Choose concrete words: `buyers` instead of `users`, `website` instead of `solution`, `questions` instead of `pain points`. Use `feel` only when you can explain the feeling: faster, safer, calmer, or more trustworthy.

Do not invent metrics, quotes, research findings, or outcomes. If the result is unknown, leave it unknown.

## Structure

### Headings

Headings should orient the reader or make a clear promise. Keep them short: `The problem`, `A system before the pages`, `Making contact one tap away`.

Avoid structural headings that say nothing: `Overview`, `Our process`, `The solution`, `Final thoughts`.

Begin a section with its point, not its history. Then add the evidence, decision, or example. Do not repeat the heading in the first sentence.

### Story Spine

Build a chain of decisions, not a diary of activities:

1. **Situation:** What existed, and for whom?
2. **Tension:** What was unclear, missing, slow, risky, or hard?
3. **Observation:** What did you learn?
4. **Decision:** What did you choose, and why?
5. **Result:** What changed, and what will you carry forward?

Use the smallest complete version. Not every project needs a long process section.

For important decisions:

> **Choice:** Projects became the main trust signal. **Reason:** Prospects needed proof before calling. **Result:** The first visit answered the credibility question faster.

Do not list activities without purpose. Replace `Research, wireframes, visual design, development` with `I started with questions from sales chats, then used them to shape the page structure.`

## Explain Technical Work

Explain technical work through what the reader can see:

1. Name the behavior.
2. Explain the implementation.
3. Explain why it was better, including a relevant limitation.

> The drawer stayed smooth with a long list. I updated its transform directly instead of changing an inherited CSS variable, because the variable caused recalculation across every child.

Use technical terms when they matter. Explain them at first use. Add code only when it proves or clarifies a decision.

## Write For Hierarchy

Give every text block one visual job:

- **Title:** Name the work.
- **Summary:** Say what was made, for whom, and why it mattered.
- **Heading:** Mark a new question or idea.
- **Body:** Explain one decision, observation, or result.
- **Stat:** Show one meaningful number with context.
- **Caption:** Tell the reader what to notice and why it matters.
- **Label:** Identify metadata or an action.

Do not repeat the same claim in the title, summary, caption, and body. Each layer should add information.

## Content Patterns

### Homepage

Answer quickly: who are you, what do you make, and how do you think.

> I make complex offers easier to understand and act on.

Give each project one sentence focused on its clearest outcome or tension:

> **OFK Construction**
> A bilingual website and design system that helps B2B clients verify the work in one visit.

Avoid stacked titles and adjectives: `Multidisciplinary creative strategist and visionary product designer.`

### Case Studies

Open with the project and its problem before describing the work:

> [Project] was [what existed or was missing]. I worked on [role] to [change], so [audience] could [outcome].

Make sections answer the next natural question: What was happening? Why did it matter? What did you find? What did you decide? What changed?

Use "we" only when collaboration matters and roles are clear.

### Project Explanations

Use: **what it is + the job it does + the useful difference**.

> A reusable sales deck for client meetings. It makes the offer easy to skim and gives the team one story to present.

Avoid: `A high-quality, modern website with responsive layouts and engaging animations.`

### Captions

A caption directs attention; it does not label the obvious.

- **Artifact + significance:** `The first mobile flow, where the purchase path became one clear question at a time.`
- **Detail + reason:** `The reference list sits early so a buyer can verify the work before reaching out.`
- **Before + after:** `The wireframe resolved navigation before visual styling began.`

Keep captions shorter than the explanation they support. If the image has no useful story, use a factual label or no caption.

### UI Text

Interface text helps someone act. Make it more direct than portfolio prose.

- Use sentence case and specific nouns.
- Buttons are actions: `View projects`, `Send message`, `Open case study`.
- Labels are nouns: `Email address`, `Project type`, `Message`.
- Links describe their destination: `Read the OFK case study`, not `Click here`.
- Confirm results: `Message sent`, not `Success`.
- Explain failures and recovery: `Message could not be sent. Try again or email me directly.`
- Validate fields inline: `Email is required to reach you.`
- Do not use jokes or vague labels where the reader needs an instruction.

## AI Brief

Before drafting, extract only verified facts:

- audience and situation
- project and your role
- problem or tension
- important decision and reason
- result or evidence
- limitation, tradeoff, or open question

Tell the AI to lead with the clearest point, use short paragraphs and concrete verbs, connect decisions to consequences, preserve uncertainty, and remove hype or process theatre.

Then edit in four passes:

1. **Purposeful:** Does it help the reader and the point?
2. **Concise:** Cut every word that does not earn its place.
3. **Conversational:** Would you say this out loud?
4. **Clear:** Is the meaning unambiguous?

Before publishing, check:

- Can the reader name the project and its purpose after the first paragraph?
- Does every claim have evidence, an example, or a visible artifact?
- Is your contribution clear?
- Does each heading introduce a new idea?
- Does the text tell the reader what to notice in the visual work?
- Could any sentence be shorter?
- Does the ending leave a result or lesson instead of a generic conclusion?
