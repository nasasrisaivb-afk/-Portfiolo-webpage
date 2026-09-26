/**
 * ===========================================================================
 * CONTENT MODEL
 *
 * Every project is one object that satisfies `CaseStudy`. The case-study page
 * template (`src/layouts/CaseStudyLayout.astro`) renders whatever sections are
 * present and silently skips the rest, so a new project can ship with an
 * overview and grow into a full 25-section study later.
 *
 * To add a project:
 *   1. create `src/data/case-studies/<slug>.ts` exporting a `CaseStudy`
 *   2. register it in `src/data/projects.ts`
 * Nothing else needs touching — cards, filters, routes, sitemap and social
 * metadata are all generated from that list.
 * ===========================================================================
 */

export type Industry =
  | 'Healthcare'
  | 'Logistics'
  | 'Agriculture'
  | 'SaaS'
  | 'Fintech'
  | 'E-commerce'
  | 'Branding';

export type ProjectType =
  | 'End-to-end product design'
  | 'UX research & strategy'
  | 'Design system'
  | 'Operations tooling'
  | 'Mobile app'
  | 'Web platform'
  | 'Brand & visual identity'
  | 'Concept / self-initiated';

export interface Metric {
  /** The number or short result, e.g. "−38%" or "8 weeks". */
  value: string;
  /** What the number measures, e.g. "Time to create a listing". */
  label: string;
  /** How it was measured, or the honest caveat. */
  note?: string;
}

export interface Insight {
  /** Short, quotable finding. */
  title: string;
  detail: string;
  /** Verbatim participant quote, where one exists. */
  quote?: string;
  /** e.g. "7 / 9 participants" */
  evidence?: string;
}

export interface Persona {
  name: string;
  role: string;
  context: string;
  goals: string[];
  frustrations: string[];
  /** Short defining sentence in the persona's own voice. */
  quote?: string;
  /** Digital confidence, used to justify interface decisions. */
  techComfort?: 'Low' | 'Medium' | 'High';
}

export interface JourneyStage {
  stage: string;
  doing: string;
  thinking: string;
  feeling: 'Frustrated' | 'Anxious' | 'Neutral' | 'Hopeful' | 'Confident';
  opportunity: string;
}

export interface PainPoint {
  title: string;
  detail: string;
  severity: 'Critical' | 'High' | 'Medium';
  /** Who it hurts. */
  who?: string;
}

export interface Flow {
  name: string;
  goal: string;
  steps: string[];
  decision?: string;
}

export interface NodeItem {
  label: string;
  children?: NodeItem[];
}

export interface Option {
  name: string;
  summary: string;
  pros: string[];
  cons: string[];
  chosen?: boolean;
}

export interface Finding {
  issue: string;
  severity: 'Critical' | 'Major' | 'Minor';
  evidence: string;
  fix: string;
}

export interface Iteration {
  version: string;
  changed: string;
  because: string;
  result?: string;
}

export interface Feature {
  name: string;
  detail: string;
  /** Which insight or pain point this answers. */
  answers?: string;
}

export interface Artefact {
  name: string;
  detail: string;
}

export interface CaseStudySection {
  narrative: string;
  /** Optional second paragraph, so sections can breathe without a rich-text pipeline. */
  narrativeExtra?: string;
}

export interface CaseStudy {
  // ---- identity -----------------------------------------------------------
  slug: string;
  title: string;
  /** One-line hook shown on the card and as the page's H1 subtitle. */
  tagline: string;
  /** Long-form card description. */
  description: string;
  industry: Industry;
  /** Extra filter facets, e.g. ['Marketplace', 'Design system']. */
  tags: string[];
  projectType: ProjectType;
  role: string;
  team: string[];
  timeline: string;
  year: number;
  /** Shown as a badge: Shipped / In progress / Concept. */
  status: 'Shipped' | 'In progress' | 'Concept';
  /** The single sentence a hiring manager should remember. */
  contribution: string;
  /** `true` puts the project in the home page's Selected Work rail. */
  featured?: boolean;
  /** Ordering within Selected Work (lower first). */
  order?: number;

  // ---- visuals ------------------------------------------------------------
  cover: {
    src: string;
    alt: string;
    /** Accent used for the card's tint + OG image. */
    tint: string;
  };

  /** External links: live product, repo, Behance case, prototype. */
  links?: { label: string; href: string; external?: boolean }[];

  // ---- the case study (all optional; the template skips what is missing) --
  overview?: CaseStudySection & { highlights?: Metric[] };
  businessProblem?: CaseStudySection;
  userProblem?: CaseStudySection;
  context?: CaseStudySection;
  research?: CaseStudySection & { methods?: string[]; participants?: string };
  insights?: Insight[];
  personas?: Persona[];
  journey?: JourneyStage[];
  painPoints?: PainPoint[];
  problemDefinition?: { statement: string; hmw: string[] };
  informationArchitecture?: CaseStudySection & { tree?: NodeItem[] };
  userFlows?: CaseStudySection & { flows?: Flow[] };
  wireframes?: CaseStudySection & { items?: Artefact[] };
  exploration?: CaseStudySection & { options?: Option[] };
  uiDesign?: CaseStudySection & { principles?: Artefact[] };
  designSystem?: CaseStudySection & { tokens?: Artefact[]; components?: string[] };
  prototyping?: CaseStudySection & { artefacts?: Artefact[] };
  usabilityTesting?: CaseStudySection & { setup?: string; findings?: Finding[] };
  iterations?: Iteration[];
  finalSolution?: CaseStudySection & { features?: Feature[] };
  impact?: CaseStudySection & { metrics?: Metric[] };
  learnings?: string[];
  nextSteps?: string[];
}

// ---------------------------------------------------------------------------
// Supporting content models
// ---------------------------------------------------------------------------

export interface SkillGroup {
  id: string;
  title: string;
  /** Why this cluster matters — no percentage bars anywhere. */
  intent: string;
  skills: { name: string; note?: string }[];
}

export interface ProcessStage {
  id: string;
  number: string;
  name: string;
  promise: string;
  /** What I actually do in this stage. */
  activities: string[];
  /** What leaves the stage. */
  outputs: string[];
  /** Who I work with and how. */
  collaboration: string;
  /** How user feedback changes the decision here. */
  feedbackLoop: string;
}

export interface ExperienceItem {
  role: string;
  organisation: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  domains: string[];
}

export interface EducationItem {
  qualification: string;
  institution: string;
  period: string;
  detail?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organisation?: string;
}
