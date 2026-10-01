import type { Category, Skill } from "@/data/types";

/** A skill placed on the periodic table. */
export interface SkillElement {
  number: number;
  symbol: string;
  skill: Skill;
  category: Category;
}

/**
 * Symbols to try in order, like the periodic table resolving clashes:
 * first two letters, then first letter + a later word's initial, then
 * first letter + any later letter, then three-letter forms.
 */
export function symbolCandidates(name: string): string[] {
  const words = name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .flatMap((w) => w.split(/[^A-Za-z]+|(?<=[a-z])(?=[A-Z])/))
    .filter(Boolean);
  const letters = words.join("");
  if (!letters) return [];
  const head = letters.charAt(0).toUpperCase();
  const rest = letters.slice(1).toLowerCase();
  const initials = words.slice(1).map((w) => w.charAt(0).toLowerCase());
  const pairs = [...rest].flatMap((a, i) => [...rest.slice(i + 1)].map((b) => a + b));
  const all = [rest ? head + rest.charAt(0) : head, ...initials.map((c) => head + c), ...[...rest].map((c) => head + c), ...pairs.map((p) => head + p)];
  return [...new Set(all)];
}

/** Chinese display names have no letters; fall back to the upstream (English) name. */
function candidatesFor(skill: Skill): string[] {
  const fromName = symbolCandidates(skill.name);
  return fromName.length > 0 ? fromName : symbolCandidates(skill.upstream.name.replace(/[-_]+/g, " "));
}

function uniqueSymbol(skill: Skill, taken: Set<string>): string {
  const candidates = candidatesFor(skill);
  const base = candidates[0] ?? "?";
  const symbol = candidates.find((c) => !taken.has(c)) ?? findNumbered(base, taken);
  taken.add(symbol);
  return symbol;
}

function findNumbered(base: string, taken: Set<string>): string {
  let n = 2;
  while (taken.has(`${base}${n}`)) n++;
  return `${base}${n}`;
}

export function formatNumber(n: number): string {
  return String(n).padStart(3, "0");
}

/**
 * Number skills group by group in category order, keeping each group's
 * incoming order (the catalog is sorted by slug), like periods in a table.
 * Symbols are unique; earlier elements keep the plain two-letter form.
 */
export function buildElements(skills: Skill[], categories: Category[]): SkillElement[] {
  let next = 0;
  const taken = new Set<string>();
  return categories.flatMap((category) =>
    skills
      .filter((s) => s.category === category.id)
      .map((skill) => ({
        number: ++next,
        symbol: uniqueSymbol(skill, taken),
        skill,
        category,
      })),
  );
}
