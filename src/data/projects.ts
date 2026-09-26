/**
 * ===========================================================================
 * PROJECT REGISTRY
 *
 * The one list that drives: Selected Work on the home page, the /work index,
 * the filter facets, every /work/<slug> route, the sitemap and social cards.
 *
 * To add a project: create `src/data/case-studies/<slug>.ts`, import it here,
 * add it to `caseStudies`. That is the whole job.
 * ===========================================================================
 */
import type { CaseStudy, Industry } from './types';
import { cropvibe } from './case-studies/cropvibe';
import { dexa } from './case-studies/dexa';
import { mrYoda } from './case-studies/mr-yoda';
import { cianahealth } from './case-studies/cianahealth';
import { brandSystem } from './case-studies/brand-system';

export const caseStudies: CaseStudy[] = [cropvibe, dexa, mrYoda, cianahealth, brandSystem];

/** Selected Work, in the order defined by each project's `order`. */
export const featuredProjects = caseStudies
  .filter((p) => p.featured)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const allProjects = [...caseStudies].sort(
  (a, b) => (a.order ?? 99) - (b.order ?? 99) || b.year - a.year,
);

export function getProject(slug: string): CaseStudy | undefined {
  return caseStudies.find((p) => p.slug === slug);
}

/** Industry facets with counts, for the /work filter bar. */
export function industryFacets(): { value: Industry | 'All'; count: number }[] {
  const counts = new Map<Industry, number>();
  for (const p of allProjects) counts.set(p.industry, (counts.get(p.industry) ?? 0) + 1);
  return [
    { value: 'All' as const, count: allProjects.length },
    ...[...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, count })),
  ];
}

/** Previous / next, so a case study is never a dead end. */
export function siblings(slug: string): { prev?: CaseStudy; next?: CaseStudy } {
  const i = allProjects.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? allProjects[i - 1] : allProjects[allProjects.length - 1],
    next: i < allProjects.length - 1 ? allProjects[i + 1] : allProjects[0],
  };
}

/** Every industry the portfolio covers — used on About and in SEO copy. */
export const industriesCovered: Industry[] = [
  ...new Set(allProjects.map((p) => p.industry)),
] as Industry[];
