import { CATEGORIES } from "@/data/categories";
import type { AgentId, CategoryId, Skill, SourceId } from "@/data/types";
import { SOURCE_IDS, declaredAgents } from "@/data/sources";
import { AGENTS } from "./installCommands";

export interface CatalogFilters {
  query: string;
  category: CategoryId | null;
  source: SourceId | null;
  agent: AgentId | null;
}

export const EMPTY_FILTERS: CatalogFilters = { query: "", category: null, source: null, agent: null };

const CATEGORY_IDS = new Set<string>(CATEGORIES.map((c) => c.id));

function terms(query: string): string[] {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

export function hasActiveFilters(filters: CatalogFilters): boolean {
  return terms(filters.query).length > 0 || filters.category !== null || filters.source !== null || filters.agent !== null;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Latin terms match at word starts only ("rna" finds "RNA-seq", not
 * "Internal"); terms with CJK or symbols match anywhere, since Chinese has
 * no word spacing.
 */
function termMatcher(term: string): (haystack: string) => boolean {
  if (!/^[a-z0-9]+$/.test(term)) return (h) => h.includes(term);
  const re = new RegExp(`(^|[^a-z0-9])${escapeRegExp(term)}`);
  return (h) => re.test(h);
}

export function filterSkills(skills: Skill[], filters: CatalogFilters): Skill[] {
  const matchers = terms(filters.query).map(termMatcher);
  return skills.filter((s) => {
    if (filters.category && s.category !== filters.category) return false;
    if (filters.source && s.upstream.source !== filters.source) return false;
    if (filters.agent && !declaredAgents(s.upstream).includes(filters.agent)) return false;
    const haystack = `${s.name} ${s.slug} ${s.description}`.toLowerCase();
    return matchers.every((m) => m(haystack));
  });
}

/** Read filters from a `location.search` string; unknown values are dropped. */
export function parseFilters(search: string): CatalogFilters {
  const params = new URLSearchParams(search);
  const category = params.get("category");
  const source = params.get("source");
  return {
    query: params.get("q")?.trim() ?? "",
    category: category && CATEGORY_IDS.has(category) ? (category as CategoryId) : null,
    source: SOURCE_IDS.find((id) => id === source) ?? null,
    agent: AGENTS.find((agent) => agent.id === params.get("agent"))?.id ?? null,
  };
}

export function serializeFilters(filters: CatalogFilters): string {
  const params = new URLSearchParams();
  const query = filters.query.trim();
  if (query) params.set("q", query);
  if (filters.category) params.set("category", filters.category);
  if (filters.source) params.set("source", filters.source);
  if (filters.agent) params.set("agent", filters.agent);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
