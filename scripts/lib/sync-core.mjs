// Pure helpers for scripts/sync-skills.mjs (kept I/O-free so they can be unit tested).

import matter from "gray-matter";

export const SOURCES = [
  {
    id: "anthropic",
    repo: "anthropics/skills",
    skillsDir: "skills",
    marketplace: ".claude-plugin/marketplace.json",
  },
  {
    id: "k-dense",
    repo: "K-Dense-AI/scientific-agent-skills",
    skillsDir: "skills",
    // Copies of Anthropic's proprietary document skills — listed once, under anthropic.
    exclude: ["docx", "pdf", "pptx", "xlsx"],
  },
];

// Anthropic's document skills keep their historical `document-skills--` slug so
// existing URLs (/skills/document-skills--pdf) stay valid.
const PREFIXED_PLUGINS = new Set(["document-skills"]);

const RESERVED_LICENSE = /all rights reserved|proprietary/i;

/** Paths like `skills/<dir>/SKILL.md` → `<dir>`; anything deeper is ignored. */
export function skillDirsFromTree(tree, skillsDir) {
  const pattern = new RegExp(`^${skillsDir}/([^/]+)/SKILL\\.md$`);
  return tree
    .filter((entry) => entry.type === "blob")
    .map((entry) => entry.path.match(pattern)?.[1])
    .filter(Boolean)
    .sort();
}

/** Map skill dir → Claude Code plugin name from a marketplace.json document. */
export function pluginIndex(marketplace) {
  const index = {};
  for (const plugin of marketplace?.plugins ?? []) {
    for (const skillPath of plugin.skills ?? []) {
      const dir = skillPath.split("/").filter(Boolean).pop();
      index[dir] = plugin.name;
    }
  }
  return index;
}

export function slugFor(dir, plugin) {
  return plugin && PREFIXED_PLUGINS.has(plugin) ? `${plugin}--${dir}` : dir;
}

/**
 * A skill body may be mirrored on the site unless its frontmatter license or
 * bundled LICENSE file reserves all rights.
 */
export function isRedistributable(frontmatterLicense, licenseText) {
  return ![frontmatterLicense, licenseText].some(
    (text) => typeof text === "string" && RESERVED_LICENSE.test(text),
  );
}

export function parseSkill(raw) {
  const { data, content } = matter(raw);
  if (typeof data.name !== "string" || typeof data.description !== "string") {
    throw new Error("SKILL.md frontmatter must include string name and description");
  }
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    license: typeof data.license === "string" ? data.license.trim() : null,
    body: content.trim(),
  };
}

export function assertUniqueSlugs(entries) {
  const seen = new Map();
  for (const entry of entries) {
    const previous = seen.get(entry.slug);
    if (previous) {
      throw new Error(
        `Slug collision "${entry.slug}" between ${previous} and ${entry.source}`,
      );
    }
    seen.set(entry.slug, entry.source);
  }
}
