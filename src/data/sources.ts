import manifest from "./upstream.json";
import type { SourceId } from "./types";

export interface Source {
  id: SourceId;
  label: string;
  repo: string;
  icon: string;
  blurb: string;
  /** Commit the catalog was last synced from. */
  sha: string;
}

const PRESENTATION: Record<SourceId, Omit<Source, "id" | "repo" | "sha">> = {
  anthropic: {
    label: "Anthropic Official Skills",
    icon: "⭐",
    blurb: "Anthropic 官方的文件處理、設計與開發 Skills",
  },
  "k-dense": {
    label: "Scientific Agent Skills",
    icon: "🔬",
    blurb: "K-Dense 維護的科學研究與資料分析 Skills",
  },
};

export const SYNCED_AT: string = manifest.syncedAt;

export const SOURCES: Source[] = manifest.sources.map((s) => ({
  id: s.id as SourceId,
  repo: s.repo,
  sha: s.sha,
  ...PRESENTATION[s.id as SourceId],
}));

export function getSource(id: SourceId): Source {
  const source = SOURCES.find((s) => s.id === id);
  if (!source) throw new Error(`Unknown skill source: ${id}`);
  return source;
}

export function repoUrl(repo: string): string {
  return `https://github.com/${repo}`;
}

/** SKILL.md pinned to the synced commit, so the link matches what the site shows. */
export function skillFileUrl(repo: string, sha: string, dir: string): string {
  return `${repoUrl(repo)}/blob/${sha}/skills/${dir}/SKILL.md`;
}
