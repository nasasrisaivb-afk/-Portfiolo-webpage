import type { CaseStudy } from '../types';

/**
 * Branding & visual design — a deliberately shorter study.
 * Demonstrates that the case-study template degrades gracefully: it renders
 * the sections that exist and skips the rest, no empty headings.
 */
export const brandSystem: CaseStudy = {
  slug: 'branding-visual-design',
  title: 'Branding & Visual Design',
  tagline: 'Identity systems built to survive contact with a product team',
  description:
    'Brand and visual identity work for products and small businesses — marks, type systems, colour and the component-level rules that keep an identity intact once engineers, not designers, are the ones applying it.',
  industry: 'Branding',
  tags: ['Brand identity', 'Visual system', 'Typography', 'Design tokens'],
  projectType: 'Brand & visual identity',
  role: 'Designer — identity, type and colour systems, application guidelines',
  team: ['Me (design)', 'Founders and product teams as clients'],
  timeline: 'Ongoing, 2 – 5 weeks per engagement',
  year: 2026,
  status: 'Shipped',
  contribution:
    'Identities delivered as tokens and rules rather than logo files, so the brand still looks like itself six months into a product roadmap.',
  featured: true,
  order: 5,
  cover: {
    src: '/media/brand-cover.svg',
    alt: 'Branding composition: a wordmark and monogram, a type-scale specimen, and a colour-token sheet with usage proportions.',
    tint: '#7A4A86',
  },

  overview: {
    narrative:
      'Most identity work I am handed has the same failure ahead of it: a beautiful set of logo files and a PDF of rules that nobody on the engineering team will ever open. Six months later the product has eleven greys, four button styles and a brand colour used as a background.',
    narrativeExtra:
      'I treat identity as the top layer of a design system rather than a separate discipline. The deliverable is a mark and a voice, but also the tokens, the proportions and the component-level decisions that let a team apply it correctly without asking me.',
  },

  businessProblem: {
    narrative:
      'For a small team, brand inconsistency is not an aesthetic problem — it reads as inexperience at exactly the moment a founder is trying to look credible to a customer or an investor. The cost is trust, and it accumulates quietly.',
  },

  context: {
    narrative:
      'These engagements are short, budgets are real, and the people applying the identity afterwards are usually engineers with no design support. Anything that depends on ongoing designer involvement will not survive, so the system has to be legible to whoever picks it up next.',
  },

  exploration: {
    narrative:
      'Every engagement starts with three directions that are genuinely different — not three shades of the same idea — each argued from what the business needs to signal rather than from what is currently fashionable.',
    options: [
      {
        name: 'Logo package',
        summary: 'Marks, lockups and a usage PDF.',
        pros: ['Fast', 'Familiar deliverable', 'Cheap'],
        cons: ['Decays immediately in product', 'Nothing an engineer can consume', 'Guarantees drift'],
      },
      {
        name: 'Full brand guidelines document',
        summary: 'A comprehensive document covering every application.',
        pros: ['Thorough', 'Impressive to present'],
        cons: ['Rarely read past page four', 'Expensive relative to a small team’s needs', 'Still not consumable in code'],
      },
      {
        name: 'Identity as tokens and rules',
        summary:
          'Mark and voice, plus colour and type as named tokens, proportional usage rules, and decisions made at component level.',
        pros: [
          'Applies itself — the constraints live where the work happens',
          'Survives handover to engineers',
          'Scales into the product design system instead of fighting it',
        ],
        cons: ['Requires the client to have or accept a token-based front end', 'Less impressive as a presentation artefact'],
        chosen: true,
      },
    ],
  },

  uiDesign: {
    narrative:
      'The visual decisions I hold to across engagements: type carries most of the personality, colour is rationed, and the identity should still be recognisable in greyscale. If an identity only works in full colour at full size, it does not work.',
    principles: [
      { name: 'Type does the heavy lifting', detail: 'A distinctive type pairing outlives a decorative mark and costs nothing to apply' },
      { name: 'Ration the accent', detail: 'A 60/30/10 proportion, specified as a rule rather than suggested as a mood' },
      { name: 'Greyscale first', detail: 'If the hierarchy fails without colour, the hierarchy is being carried by colour' },
      { name: 'Contrast is part of the brand', detail: 'Palettes are contrast-checked before they are presented, so nobody has to choose between brand and accessibility later' },
      { name: 'One mark, three sizes', detail: 'Full lockup, compact and monogram — designed together, because favicons are where identities die' },
    ],
  },

  designSystem: {
    narrative:
      'The handover is a token set and a short set of rules, in the format the team will actually use — CSS custom properties, a Figma library, or both — with the reasoning attached so the next person can extend it rather than guess.',
    tokens: [
      { name: 'Colour tokens with usage proportions', detail: 'Named by role, with the 60/30/10 split stated as a constraint' },
      { name: 'Type scale', detail: 'A fixed, fluid scale rather than a list of permitted fonts' },
      { name: 'Spacing grid', detail: 'One base unit, so layout stays consistent without supervision' },
      { name: 'Contrast-checked pairings', detail: 'Every approved text-on-surface combination verified against WCAG AA' },
      { name: 'Mark variants', detail: 'Lockup, compact and monogram with minimum sizes and clear space' },
    ],
    components: ['Buttons', 'Cards', 'Tags & badges', 'Form fields', 'Navigation', 'Empty states'],
  },

  learnings: [
    'Identity work that is not consumable in code will drift, however good it is. The format of the handover matters as much as the design in it.',
    'Contrast-checking the palette before presenting it removes a fight that would otherwise happen months later, when someone has to choose between the brand and an accessibility audit.',
    'Three genuinely different directions produce a better conversation than five variations of one. The client’s reaction to a direction they reject is usually the most useful information in the project.',
    'Favicons and 24px marks are where identities fail. Designing the smallest size first changes the mark you end up with.',
  ],
};
