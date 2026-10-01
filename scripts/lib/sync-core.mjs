import { createHash } from "node:crypto";
import matter from "gray-matter";
export { licenseDecision, isRedistributable } from "./license-policy.mjs";

const NAME = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;
const SEGMENT = /^\.?[a-zA-Z0-9][a-zA-Z0-9._-]*$/;

export function isSafeName(value) {
  return typeof value === "string" && value.length <= 160 && NAME.test(value) && !value.includes("..");
}
export function isSafePath(value) {
  return typeof value === "string" && value.length <= 1024 && value.split("/").every(part => SEGMENT.test(part) && !part.includes(".."));
}
export function isSafeRepo(value) {
  return typeof value === "string" && value.split("/").length === 2 && value.split("/").every(isSafeName);
}
export function validateSources(sources) {
  if (!Array.isArray(sources) || !sources.length) throw new Error("Source registry must be a nonempty array");
  const ids = new Set();
  for (const source of sources) {
    if (!isSafeName(source.id)) throw new Error("Invalid source id");
    if (ids.has(source.id)) throw new Error(`duplicate source id: ${source.id}`);
    ids.add(source.id);
    if (!isSafeRepo(source.repo)) throw new Error(`Invalid source repo: ${source.id}`);
    if (!isSafePath(source.skillsDir) || (source.marketplace && !isSafePath(source.marketplace))) throw new Error(`Invalid source path: ${source.id}`);
    if (!["standard", "plugins"].includes(source.layout)) throw new Error(`Invalid source layout: ${source.id}`);
    if (typeof source.namespace !== "boolean" || !Array.isArray(source.declaredAgents) || !source.declaredAgents.every(isSafeName)) throw new Error(`Invalid source metadata: ${source.id}`);
    for (const list of [source.includePlugins, source.exclude]) {
      if (list !== undefined && (!Array.isArray(list) || !list.every(isSafeName))) throw new Error(`Invalid source allowlist: ${source.id}`);
    }
    if (source.layout === "plugins" && !source.includePlugins?.length) throw new Error(`Plugin source requires an allowlist: ${source.id}`);
  }
  return sources;
}

export function skillDirsFromTree(tree, skillsDir) {
  const prefix = `${skillsDir}/`;
  return [...new Set(tree.filter(entry => entry.type === "blob" && entry.path.startsWith(prefix))
    .map(entry => entry.path.slice(prefix.length).split("/"))
    .filter(parts => parts.length === 2 && parts[1] === "SKILL.md" && isSafeName(parts[0]))
    .map(parts => parts[0]))].sort();
}
export function skillLocations(tree, source) {
  const excluded = new Set(source.exclude ?? []);
  if (source.layout === "plugins") {
    return source.includePlugins.flatMap(plugin => {
      const base = `${source.skillsDir}/${plugin}/skills`;
      return skillDirsFromTree(tree, base).filter(dir => !excluded.has(dir)).map(dir => ({ dir, path: `${base}/${dir}`, plugin }));
    });
  }
  return skillDirsFromTree(tree, source.skillsDir).filter(dir => !excluded.has(dir)).map(dir => ({ dir, path: `${source.skillsDir}/${dir}`, plugin: null }));
}
export function pluginIndex(marketplace) {
  const index = Object.create(null);
  for (const plugin of marketplace?.plugins ?? []) {
    if (!isSafeName(plugin.name)) throw new Error("Invalid marketplace plugin name");
    for (const skillPath of plugin.skills ?? []) {
      if (typeof skillPath !== "string" || !isSafePath(skillPath.replace(/^\.\//, ""))) throw new Error("Invalid marketplace skill path");
      const dir = skillPath.split("/").pop();
      if (!isSafeName(dir)) throw new Error("Invalid marketplace skill name");
      index[dir] = plugin.name;
    }
  }
  return index;
}
export function slugFor(dir, plugin, source = {}) {
  if (source.namespace) return [source.id, source.layout === "plugins" ? plugin : null, dir].filter(Boolean).join("--");
  return plugin === "document-skills" ? `${plugin}--${dir}` : dir;
}


export function parseSkill(raw) {
  // gray-matter otherwise permits an executable `---javascript` engine label.
  const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  if (!/^---(?:yaml|yml)?[ \t]*\n/.test(normalized)) throw new Error("SKILL.md frontmatter must use YAML");
  const yamlOnly = normalized.replace(/^---(?:yaml|yml)?[ \t]*\n/, "---\n");
  const { data, content } = matter(yamlOnly, { language: "yaml" });
  if (!data || typeof data.name !== "string" || typeof data.description !== "string" || !data.name.trim() || !data.description.trim()) throw new Error("SKILL.md frontmatter must include string name and description");
  for (const field of ["license", "compatibility"]) {
    if (data[field] != null && typeof data[field] !== "string") throw new Error(`SKILL.md frontmatter ${field} must be a string`);
  }
  return { name: data.name.trim(), description: data.description.trim(), license: data.license?.trim() || null, compatibility: data.compatibility?.trim() || null, body: content.trim() };
}
export function contentHash(tree, skillPath) {
  const files = tree.filter(entry => entry.type === "blob" && entry.path.startsWith(`${skillPath}/`))
    .map(entry => `${entry.path.slice(skillPath.length + 1)}\0${entry.sha}`).sort();
  return createHash("sha256").update(files.join("\n")).digest("hex");
}
export function assertUniqueSlugs(entries) {
  const seen = new Map();
  for (const entry of entries) {
    if (!isSafeName(entry.slug)) throw new Error("Invalid generated slug");
    if (seen.has(entry.slug)) throw new Error(`Slug collision "${entry.slug}" between ${seen.get(entry.slug)} and ${entry.source}`);
    seen.set(entry.slug, entry.source);
  }
}
