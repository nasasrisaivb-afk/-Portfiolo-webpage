import type { ProcessStage } from './types';

/** Discover → Define → Explore → Design → Validate → Deliver */
export const processStages: ProcessStage[] = [
  {
    id: 'discover',
    number: '01',
    name: 'Discover',
    promise: 'Find out what is actually wrong, before anyone decides what to build.',
    activities: [
      'Audit the existing product route by route, recording the exact moment it stops being obvious',
      'Interview people on every side of the transaction, not just the primary user',
      'Collect the workarounds — spreadsheets, paper lists, chat groups',
      'Read the support tickets; they are unsolicited usability findings',
    ],
    outputs: [
      'Findings with evidence attached',
      'A defect list that is already actionable',
      'Personas and scenarios built from what people said',
      'Journey map, including the emotional low points',
    ],
    collaboration:
      'I bring engineering and support into discovery early. Engineers know which constraints are real, and support has been hearing the problem for months.',
    feedbackLoop:
      'The audit usually pays for the whole phase. Two of my projects shipped fixes in week one purely from walking every route and writing down where I got stuck.',
  },
  {
    id: 'define',
    number: '02',
    name: 'Define',
    promise: 'Turn findings into one problem statement a team can agree to, and metrics we agree to before the work starts.',
    activities: [
      'Write a problem definition specific enough to be wrong',
      'Convert pain points into how-might-we questions',
      'Rank by severity and consequence, not by how interesting they are to solve',
      'Agree the measure of success while it is still cheap to argue about',
    ],
    outputs: [
      'Problem definition statement',
      'Prioritised how-might-we set',
      'Success metrics and how they will be instrumented',
      'Explicit scope — including what we are choosing not to do',
    ],
    collaboration:
      'This is the phase where I involve the business most. Framing is where design either earns its seat in the decision or gets handed a brief.',
    feedbackLoop:
      'Findings are read back to participants where possible. If my framing does not describe the problem they actually have, it is my framing that is wrong.',
  },
  {
    id: 'explore',
    number: '03',
    name: 'Explore',
    promise: 'Put up genuinely different options and kill the weak ones fast, in public.',
    activities: [
      'Sketch three structurally different approaches, not three variations of one',
      'Pressure-test each against the hardest real constraint — peak volume, worst connection, lowest literacy',
      'Write the pros and cons down, so the decision has a record',
      'Prototype only the part that the argument actually depends on',
    ],
    outputs: [
      'Option comparison with a recommendation',
      'Low-fidelity flows and wireframes including failure states',
      'A decision log explaining why the others were rejected',
    ],
    collaboration:
      'Options go to engineering before they are polished, because feasibility should change the design rather than arrive as a veto later.',
    feedbackLoop:
      'Rejected directions are as useful as the chosen one. What a stakeholder objects to in an option they dislike is often the real requirement surfacing.',
  },
  {
    id: 'design',
    number: '04',
    name: 'Design',
    promise: 'Make it legible, hierarchical and accessible — and make it consistent by construction, not by review.',
    activities: [
      'Design the loading, empty, error and not-found states alongside the populated one',
      'Build with tokens so a change lands everywhere at once',
      'Check contrast, focus order and touch targets as I go, not at the end',
      'Write the microcopy myself; in high-stakes products the copy is the interface',
    ],
    outputs: [
      'High-fidelity screens for every state',
      'Design tokens and components',
      'Responsive behaviour specified per breakpoint',
      'Accessibility annotations — semantics, order, announcements',
    ],
    collaboration:
      'I pair with engineers in the real front end for anything where feel decides the answer. It is faster than a spec and the result is the thing that ships.',
    feedbackLoop:
      'Accessibility is where user feedback arrives structurally. On one project the screen-reader order revealed the same hierarchy bug the visual design had — fixing it improved the product for everyone.',
  },
  {
    id: 'validate',
    number: '05',
    name: 'Validate',
    promise: 'Test comprehension and behaviour, not preference — and treat both false alarm and false reassurance as defects.',
    activities: [
      'Moderated task-based sessions on participants’ own devices',
      'Realistic data volumes and worst-case content, never tidy samples',
      'Ask what they would do, not whether they liked it',
      'Record the exact word or element where hesitation happens',
    ],
    outputs: [
      'Findings ranked by severity with evidence',
      'A change list, ordered by consequence',
      'An honest note on what testing did not cover',
    ],
    collaboration:
      'Engineers and the product owner observe sessions live. One watched session changes more minds than any report I could write.',
    feedbackLoop:
      'This is the loop. Findings become iterations, iterations get re-tested, and the ordering that comes out of it — clarity before efficiency, almost always — sets the roadmap.',
  },
  {
    id: 'deliver',
    number: '06',
    name: 'Deliver',
    promise: 'Ship it, measure it, and leave the team able to extend it without me.',
    activities: [
      'Hand over as tokens and components in the format the team actually uses',
      'Review the build against the designed states, including the unhappy ones',
      'Verify the accessibility claims on the real thing, not the mockup',
      'Set up the measurement agreed in Define',
    ],
    outputs: [
      'Shipped product',
      'Maintained design system with the reasoning attached',
      'Measurement in place and a baseline recorded',
      'A short honest retrospective — including what I would do differently',
    ],
    collaboration:
      'Handover is a conversation, not a document. I stay close through the first releases, because that is when the decisions that were never written down get tested.',
    feedbackLoop:
      'Production data is the last and best feedback. Where a project has no baseline — because the thing being measured was previously impossible — I say so rather than invent a percentage.',
  },
];
