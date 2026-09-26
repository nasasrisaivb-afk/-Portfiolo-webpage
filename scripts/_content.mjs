/**
 * Plain-JS mirror of the project list, so the asset scripts can read content
 * without a TypeScript build step. Keep the slugs in sync with
 * src/data/projects.ts — `npm run assets` is the only consumer.
 */
export const caseStudies = [
  {
    slug: 'cropvibe',
    title: 'CropVibe',
    industry: 'Agriculture',
    projectType: 'End-to-end product design',
    tagline: 'Five businesses, one account: designing a multi-sided agricultural marketplace',
    tint: '#4C7A34',
  },
  {
    slug: 'dexa',
    title: 'DEXA',
    industry: 'Logistics',
    projectType: 'Operations tooling',
    tagline: 'Designing for the dispatcher: a control tower for delivery operations',
    tint: '#2B5F7E',
  },
  {
    slug: 'mr-yoda',
    title: 'Mr. Yoda',
    industry: 'Healthcare',
    projectType: 'End-to-end product design',
    tagline: 'Diagnostics you can actually read: designing for the ten minutes after a result arrives',
    tint: '#3D6B5E',
  },
  {
    slug: 'cianahealth',
    title: 'CianaHealth',
    industry: 'Healthcare',
    projectType: 'Web platform',
    tagline: 'Care coordination without the clipboard: designing a shared view for clinical teams',
    tint: '#3E5A99',
  },
  {
    slug: 'branding-visual-design',
    title: 'Branding & Visual Design',
    industry: 'Branding',
    projectType: 'Brand & visual identity',
    tagline: 'Identity systems built to survive contact with a product team',
    tint: '#7A4A86',
  },
];
