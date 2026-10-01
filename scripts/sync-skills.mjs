#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { assertUniqueSlugs, contentHash, licenseDecision, parseSkill, pluginIndex, skillLocations, slugFor, validateSources, isSafeName } from "./lib/sync-core.mjs";
import { githubClient } from "./lib/github.mjs";
import { DEFAULT_ROOT, isMain, loadSources, readJson, writeJson } from "./lib/files.mjs";

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) { const index = next++; results[index] = await fn(items[index]); }
  }));
  return results;
}

function attributionPaths(tree, skillPath) {
  const dirs = [];
  let dir = skillPath;
  while (dir) { dirs.push(dir); dir = dir.includes("/") ? dir.slice(0, dir.lastIndexOf("/")) : ""; }
  dirs.push("");
  return dirs.flatMap(base => tree.filter(entry => entry.type === "blob" &&
    entry.path.slice(0, entry.path.lastIndexOf("/") + 1) === (base ? `${base}/` : "") &&
    /^(?:LICENSE|NOTICE)(?:\.txt|\.md)?$/i.test(entry.path.split("/").pop()))
    .map(entry => entry.path).sort());
}

async function syncSource(source, client, now) {
  const evidence = await client.repository(source.repo);
  const { sha, tree } = evidence;
  const rawCache = new Map();
  const raw = file => {
    if (!rawCache.has(file)) rawCache.set(file, client.raw(source.repo, sha, file));
    return rawCache.get(file);
  };
  const plugins = source.marketplace ? pluginIndex(JSON.parse(await raw(source.marketplace))) : {};
  const locations = skillLocations(tree, source);
  if (!locations.length) throw new Error(`No skills found for configured source ${source.id}; check upstream layout`);
  const skills = await mapLimit(locations, 8, async location => {
    const parsed = parseSkill(await raw(`${location.path}/SKILL.md`));
    const attribution = await Promise.all(attributionPaths(tree, location.path).map(async file => ({ path: file, text: await raw(file) })));
    const decision = licenseDecision(parsed.license, attribution.filter(file => /^LICENSE(?:\.txt|\.md)?$/i.test(file.path.split("/").pop())));
    const plugin = location.plugin ?? plugins[location.dir] ?? null;
    return {
      slug: slugFor(location.dir, plugin, source), source: source.id, dir: location.dir,
      path: location.path, name: parsed.name, license: decision.license, plugin,
      mirrored: decision.mirrored, compatibility: parsed.compatibility,
      declaredAgents: [...source.declaredAgents], installMode: source.layout === "plugins" ? "plugin" : "skill",
      contentHash: contentHash(tree, location.path),
      body: parsed.body, descriptionEn: parsed.description,
      attribution: [`Source: https://github.com/${source.repo}/tree/${sha}/${location.path}`, `Commit: ${sha}`, `Declared license: ${parsed.license ?? "not declared"}`, `Mirror decision: ${decision.reason}`, ...attribution.map(file => `\n--- ${file.path} ---\n${file.text}`)].join("\n"),
    };
  });
  return { meta: { id: source.id, repo: source.repo, sha, stars: evidence.stars, pushedAt: evidence.pushedAt, observedAt: now }, skills };
}

export async function syncCatalog({ root = DEFAULT_ROOT, sources = loadSources(root), client = githubClient(), now = new Date().toISOString() } = {}) {
  validateSources(sources);
  const results = [];
  // Fetch and validate every fixed source before making any catalog writes.
  for (const source of sources) results.push(await syncSource(source, client, now));
  const skills = results.flatMap(result => result.skills).sort((a, b) => a.slug.localeCompare(b.slug));
  assertUniqueSlugs(skills);
  const manifestPath = path.join(root, "src/data/upstream.json");
  const previous = readJson(manifestPath, { skills: [] });
  const keepBodies = new Set(skills.filter(skill => skill.mirrored).map(skill => skill.slug));
  const keepEvidence = new Set(skills.map(skill => skill.slug));
  const contentDir = path.join(root, "content/skills");
  const licenseDir = path.join(root, "content/licenses");
  fs.mkdirSync(contentDir, { recursive: true });
  fs.mkdirSync(licenseDir, { recursive: true });
  for (const skill of skills) {
    if (skill.mirrored) fs.writeFileSync(path.join(contentDir, `${skill.slug}.md`), `${skill.body}\n`);
    fs.writeFileSync(path.join(licenseDir, `${skill.slug}.txt`), `${skill.attribution}\n`);
  }
  for (const old of previous.skills) {
    if (!isSafeName(old.slug)) continue;
    const bodyFile = path.join(contentDir, `${old.slug}.md`);
    const licenseFile = path.join(licenseDir, `${old.slug}.txt`);
    if (!keepBodies.has(old.slug) && fs.existsSync(bodyFile)) fs.unlinkSync(bodyFile);
    if (!keepEvidence.has(old.slug) && fs.existsSync(licenseFile)) fs.unlinkSync(licenseFile);
  }
  const manifest = {
    syncedAt: now.slice(0, 10), sources: results.map(result => result.meta),
    skills: skills.map(skill => Object.fromEntries(Object.entries(skill).filter(([key]) => !["body", "descriptionEn", "attribution"].includes(key)))),
  };
  writeJson(manifestPath, manifest);
  writeJson(path.join(root, "content/upstream-descriptions.json"), Object.fromEntries(skills.map(skill => [skill.slug, skill.descriptionEn])));
  return manifest;
}

if (isMain(import.meta.url)) syncCatalog().then(manifest => {
  console.log(`Synced ${manifest.skills.length} skills from ${manifest.sources.length} sources; ${manifest.skills.filter(skill => !skill.mirrored).length} bodies withheld by license.`);
}).catch(error => { console.error(`sync failed: ${error.message}`); process.exitCode = 1; });
