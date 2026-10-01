export type CategoryId =
  | "official"
  | "databases"
  | "bioinformatics"
  | "chemistry"
  | "data-science"
  | "visualization"
  | "writing"
  | "clinical"
  | "productivity";

export interface Category {
  id: CategoryId;
  /** Short group code shown on tiles and in element IDs, e.g. "BIO". */
  code: string;
  label: string;
  /** Compact label for the legend. */
  shortLabel: string;
  description: string;
  /** Tile tint; always paired with text, never the only signal. */
  color: string;
}

export type SourceId = "anthropic" | "k-dense";

/** Hand-written zh-TW presentation data, keyed by slug (src/data/overlay/). */
export interface SkillOverlay {
  slug: string;
  name: string;
  description: string;
}

/** One entry of src/data/upstream.json, written by scripts/sync-skills.mjs. */
export interface UpstreamSkill {
  slug: string;
  source: SourceId;
  /** Directory name under the source repo's skills dir. */
  dir: string;
  /** Frontmatter `name` — what installers match on. */
  name: string;
  license: string | null;
  /** Claude Code plugin that bundles this skill, if any. */
  plugin: string | null;
  /** Whether the SKILL.md body may be mirrored on this site. */
  mirrored: boolean;
}

export interface Skill {
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  upstream: UpstreamSkill;
}
