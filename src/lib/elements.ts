import type { Category, Skill } from "@/data/types";

/** A skill placed on the periodic table. */
export interface SkillElement {
  number: number;
  symbol: string;
  skill: Skill;
  category: Category;
}

/** Two-letter symbol from the first word that starts with a letter ("13C Metabolic Flux" → "Me"). */
export function elementSymbol(name: string): string {
  const word = name.split(/\s+/).find((w) => /^[A-Za-z]/.test(w));
  const letters = (word ?? "").replace(/[^A-Za-z]/g, "");
  if (!letters) return "?";
  return letters.charAt(0).toUpperCase() + letters.charAt(1).toLowerCase();
}

/** Chinese display names have no letters; fall back to the upstream (English) name. */
function symbolFor(skill: Skill): string {
  const fromName = elementSymbol(skill.name);
  return fromName !== "?" ? fromName : elementSymbol(skill.upstream.name.replace(/[-_]+/g, " "));
}

export function formatNumber(n: number): string {
  return String(n).padStart(3, "0");
}

/**
 * Number skills group by group in category order, keeping each group's
 * incoming order (the catalog is sorted by slug), like periods in a table.
 */
export function buildElements(skills: Skill[], categories: Category[]): SkillElement[] {
  let next = 0;
  return categories.flatMap((category) =>
    skills
      .filter((s) => s.category === category.id)
      .map((skill) => ({
        number: ++next,
        symbol: symbolFor(skill),
        skill,
        category,
      })),
  );
}
