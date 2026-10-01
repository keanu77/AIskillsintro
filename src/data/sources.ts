import manifest from "./upstream.json";
import registry from "../../content/sources.json";
import type { AgentId, SourceId, UpstreamSkill } from "./types";

export interface Source {
  id: SourceId;
  label: string;
  repo: string;
  blurb: string;
  /** Commit the catalog was last synced from. */
  sha: string;
  kind: "official" | "community";
  stars?: number;
  pushedAt?: string;
  observedAt?: string;
  declaredAgents: AgentId[];
  docsUrl: string;
}

export const SYNCED_AT: string = manifest.syncedAt;
export const SOURCE_IDS = registry.map((s) => s.id as SourceId);
export const SOURCES: Source[] = manifest.sources.map((meta) => {
  const config = registry.find((s) => s.id === meta.id);
  if (!config) throw new Error(`Unknown source: ${meta.id}`);
  return { ...config, ...meta, id: config.id as SourceId,
    kind: config.kind as Source["kind"], declaredAgents: config.declaredAgents as AgentId[] };
});

export function getSource(id: SourceId): Source {
  const source = SOURCES.find((s) => s.id === id);
  if (!source) throw new Error(`Unknown skill source: ${id}`);
  return source;
}

export function repoUrl(repo: string): string {
  return `https://github.com/${repo}`;
}

/** SKILL.md pinned to the synced commit, so the link matches what the site shows. */
export function skillFileUrl(repo: string, sha: string, dir: string, skillPath?: string): string {
  return `${repoUrl(repo)}/blob/${sha}/${skillPath ?? `skills/${dir}`}/SKILL.md`;
}

export function declaredAgents(skill: UpstreamSkill): AgentId[] {
  return skill.declaredAgents ?? getSource(skill.source).declaredAgents;
}
