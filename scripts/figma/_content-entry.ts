/**
 * Barrel for the Figma export. Bundled to JS by `scripts/figma/build.mjs` so
 * the artboards are generated from the site's real content rather than a
 * hand-maintained copy that would drift.
 */
export { profile, site, navigation } from '../../src/data/site';
export { allProjects, featuredProjects, industriesCovered, industryFacets } from '../../src/data/projects';
export { skillGroups } from '../../src/data/skills';
export { processStages } from '../../src/data/process';
export { experience, education, certifications, coreSkills, resumeMeta } from '../../src/data/resume';
