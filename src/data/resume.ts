import type { Certification, EducationItem, ExperienceItem } from './types';
import { profile } from './site';

/**
 * ⚠️  PLACEHOLDER CONTENT — this is the one file you must edit before publishing.
 * Dates, employers, education and certifications below are a scaffold in the
 * right shape, not your history. Everything that renders the resume (the page,
 * the timeline and the generated PDF) reads from here, so one edit updates all
 * three.
 */

export const experience: ExperienceItem[] = [
  {
    role: 'Product Designer (UX/UI)',
    organisation: 'CropVibe',
    period: '2026 — Present',
    location: 'Remote',
    summary:
      'Lead designer on a multi-sided agricultural marketplace: five commercial roles on one account, across marketplace, rentals, consultancy, courses and an admin console.',
    highlights: [
      'Designed the role-lens architecture that lets one account act as five businesses, making a sixth revenue line an extension rather than a new product',
      'Rebuilt the consultancy module from an un-bookable catalogue into a three-step booking flow with availability, verified credentials and a persistent record',
      'Built the token-based design system — 60/30/10 colour, 8px grid, 44px touch targets and contrast-checked pairings — used across seven modules',
      'Paired directly in the front end on the calendar and booking sheet, where coded prototypes settled decisions static frames could not',
    ],
    domains: ['Agriculture', 'Marketplace', 'Design systems'],
  },
  {
    role: 'Product Designer',
    organisation: 'Healthcare & diagnostics products',
    period: '2025 — 2026',
    location: 'Remote / hybrid',
    summary:
      'End-to-end design on a diagnostics platform and a care-coordination product, both safety-critical and both heavily constrained by clinical review.',
    highlights: [
      'Redesigned the diagnostic result experience from a clinical PDF into a plain-language, clinician-reviewed explanation with safety-tiered next steps',
      'Replaced undifferentiated red flags with three clinically defined severity tiers, calibrated against both false alarm and false reassurance',
      'Designed a shared patient view for four clinical roles, replacing a fragmented per-role model',
      'Delivered a WCAG 2.1 AA pass on the result flow, including screen-reader and 200%-text verification',
    ],
    domains: ['Healthcare', 'Diagnostics', 'Accessibility'],
  },
  {
    role: 'UX/UI Designer',
    organisation: 'Logistics operations tooling',
    period: '2025',
    location: 'Remote',
    summary:
      'Designed an exception-first operations view for dispatchers running live delivery operations from spreadsheets and chat groups.',
    highlights: [
      'Replaced an inventory-first table with a prioritised exception queue, moving triage out of the dispatcher’s head and into the product',
      'Put cause next to fact, removing a median of three window switches per delay investigation',
      'Made shift handover a by-product of recorded actions rather than a message written from memory',
      'Contributed a density scale and a colour-independent severity model to the internal design system',
    ],
    domains: ['Logistics', 'Operations', 'Data-dense interfaces'],
  },
  {
    role: 'Designer — brand & digital',
    organisation: 'Independent / freelance',
    period: '2024 — Present',
    location: 'Remote',
    summary:
      'Identity and interface work for founders and small product teams, delivered as tokens and rules rather than logo files.',
    highlights: [
      'Identity systems handed over as design tokens, so the brand survives contact with an engineering roadmap',
      'Contrast-checked palettes presented as approved pairings, removing the brand-versus-accessibility argument before it starts',
      'Marks designed from the smallest size up, because favicons are where identities fail',
    ],
    domains: ['Branding', 'E-commerce', 'SaaS'],
  },
];

export const education: EducationItem[] = [
  {
    qualification: 'Bachelor’s degree',
    institution: 'Update with your institution',
    period: 'Update with your years',
    detail:
      'Replace this entry in src/data/resume.ts — the resume page, the About timeline and the generated PDF all read from it.',
  },
];

export const certifications: Certification[] = [
  {
    name: 'Google UX Design Professional Certificate',
    issuer: 'Google / Coursera',
    year: 'Update',
  },
  {
    name: 'Web Accessibility (WCAG 2.1)',
    issuer: 'Update with issuer',
    year: 'Update',
  },
];

/** Core skills, as a flat list for the resume and for JSON-LD. */
export const coreSkills = [
  'UX research',
  'Information architecture',
  'User flows',
  'Wireframing',
  'Prototyping',
  'UI design',
  'Design systems',
  'Interaction design',
  'Usability testing',
  'Accessibility (WCAG 2.1 AA)',
  'Product thinking',
  'Content design',
  'Responsive design',
  'AI-assisted design workflows',
];

export const resumeMeta = {
  name: profile.name,
  title: profile.roleLong,
  email: profile.email,
  location: profile.location,
  summary: profile.summary,
  file: profile.resume.file,
  fileName: profile.resume.fileName,
  updated: profile.resume.updated,
  links: profile.social,
};
