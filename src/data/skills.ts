import type { SkillGroup } from './types';

/**
 * Deliberately no percentage bars. A number next to "Figma" tells a hiring
 * manager nothing; what each cluster is *for* tells them something.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'ux',
    title: 'UX',
    intent:
      'Finding out what is actually wrong before deciding what to build — and being able to show the evidence for it.',
    skills: [
      { name: 'User research', note: 'Interviews, contextual inquiry, heuristic and flow audits' },
      { name: 'Personas & scenarios', note: 'Built from research, used to settle arguments' },
      { name: 'Journey mapping', note: 'Including what people feel, not just what they do' },
      { name: 'Information architecture', note: 'Structure, naming, navigation models' },
      { name: 'User flows', note: 'Happy path and failure states drawn together' },
      { name: 'Usability testing', note: 'Moderated, task-based, measured on comprehension not preference' },
      { name: 'Service blueprinting', note: 'Where handovers between people break down' },
      { name: 'Content design', note: 'Copy as interface, especially where stakes are high' },
    ],
  },
  {
    id: 'ui',
    title: 'UI',
    intent:
      'Turning structure into something legible, hierarchical and pleasant — that still holds up at 320px, at 200% text and in sunlight.',
    skills: [
      { name: 'Visual design', note: 'Hierarchy, composition, restraint' },
      { name: 'Typography', note: 'Scales, measure, rhythm, variable fonts' },
      { name: 'Layout & grids', note: '12-column and intrinsic layouts' },
      { name: 'Responsive design', note: 'Re-thought per breakpoint, not scaled down' },
      { name: 'Interaction design', note: 'State, feedback, affordance' },
      { name: 'Motion design', note: 'Purposeful, reduced-motion aware' },
      { name: 'Accessibility / WCAG 2.1 AA', note: 'Contrast, focus, semantics, assistive technology' },
      { name: 'Data visualisation', note: 'Charts with accessible alternatives' },
    ],
  },
  {
    id: 'product',
    title: 'Product',
    intent:
      'Being useful in the conversation before the design brief exists — scope, sequence, trade-offs and what to measure.',
    skills: [
      { name: 'Product thinking', note: 'Connecting a user problem to a business consequence' },
      { name: 'Problem framing', note: 'Definition statements and how-might-we sets' },
      { name: 'Feature definition', note: 'Written so engineering can estimate it' },
      { name: 'MVP scoping', note: 'What to cut, and what cutting it costs' },
      { name: 'Prioritisation', note: 'Severity and consequence over enthusiasm' },
      { name: 'Design systems strategy', note: 'Tokens, governance, adoption' },
      { name: 'Metrics definition', note: 'Agreeing the measure before the first sprint' },
      { name: 'Stakeholder facilitation', note: 'Workshops that end in a decision' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    intent: 'Whatever gets the decision made fastest — including writing the code when a static frame cannot settle it.',
    skills: [
      { name: 'Figma', note: 'Components, variables, auto-layout, prototyping' },
      { name: 'Adobe Creative Suite', note: 'Photoshop, Illustrator, InDesign' },
      { name: 'Canva', note: 'For teams who will maintain it after I leave' },
      { name: 'HTML / CSS', note: 'Enough to prototype and to pair with engineers' },
      { name: 'Design tokens', note: 'CSS custom properties, shared with the front end' },
      { name: 'Version control', note: 'Git, so design lives beside the code it describes' },
      { name: 'Miro / FigJam', note: 'Mapping, blueprinting, workshops' },
      { name: 'Analytics & session tools', note: 'Turning a hunch into a measurement' },
    ],
  },
  {
    id: 'ai',
    title: 'AI in the workflow',
    intent:
      'Used where it compresses effort without outsourcing judgement — synthesis, breadth of exploration, and the unglamorous work around a design.',
    skills: [
      { name: 'Research synthesis', note: 'Clustering transcripts fast, then verifying against the source' },
      { name: 'Ideation breadth', note: 'More directions to reject, which is the point' },
      { name: 'Rapid prototyping', note: 'Coded prototypes in hours, for questions frames cannot answer' },
      { name: 'Content drafting', note: 'First passes on microcopy, then edited hard' },
      { name: 'Design exploration', note: 'Generating variants to pressure-test a layout decision' },
      { name: 'Workflow automation', note: 'Documentation, specs, handover artefacts' },
      { name: 'Knowing when not to', note: 'Sampling participants, clinical phrasing and accessibility calls stay human' },
    ],
  },
];
