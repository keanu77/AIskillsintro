// Catalog = upstream manifest (scripts/sync-skills.mjs) + zh-TW overlays.
// To add a newly synced skill, add an entry to the matching overlay file.

import manifest from "./upstream.json";
import { CATEGORIES } from "./categories";
import type { Category, CategoryId, Skill, SkillOverlay, UpstreamSkill } from "./types";
import { OFFICIAL } from "./overlay/official";
import { DATABASES } from "./overlay/databases";
import { BIOINFORMATICS } from "./overlay/bioinformatics";
import { CHEMISTRY } from "./overlay/chemistry";
import { DATA_SCIENCE } from "./overlay/data-science";
import { VISUALIZATION } from "./overlay/visualization";
import { WRITING } from "./overlay/writing";
import { CLINICAL } from "./overlay/clinical";
import { PRODUCTIVITY } from "./overlay/productivity";

export type { Category, CategoryId, Skill } from "./types";
export { CATEGORIES } from "./categories";

export const OVERLAYS: Record<CategoryId, SkillOverlay[]> = {
  official: OFFICIAL,
  databases: DATABASES,
  bioinformatics: BIOINFORMATICS,
  chemistry: CHEMISTRY,
  "data-science": DATA_SCIENCE,
  visualization: VISUALIZATION,
  writing: WRITING,
  clinical: CLINICAL,
  productivity: PRODUCTIVITY,
};

export const UPSTREAM_SKILLS = manifest.skills as UpstreamSkill[];

export function buildSkills(
  upstream: UpstreamSkill[],
  overlays: Record<CategoryId, SkillOverlay[]>,
): Skill[] {
  const bySlug = new Map(upstream.map((u) => [u.slug, u]));
  const skills = (Object.entries(overlays) as [CategoryId, SkillOverlay[]][]).flatMap(
    ([category, entries]) =>
      entries.flatMap((entry) => {
        const source = bySlug.get(entry.slug);
        // Overlays for skills removed upstream are ignored rather than listed
        // with install commands that no longer work.
        return source ? [{ ...entry, category, upstream: source }] : [];
      }),
  );
  return skills.sort((a, b) => a.slug.localeCompare(b.slug));
}

export const SKILLS: Skill[] = buildSkills(UPSTREAM_SKILLS, OVERLAYS);

export function getSkillBySlug(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

export function getSkillsByCategory(categoryId: CategoryId): Skill[] {
  return SKILLS.filter((s) => s.category === categoryId);
}

export function getCategoryById(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllSlugs(): string[] {
  return SKILLS.map((s) => s.slug);
}

