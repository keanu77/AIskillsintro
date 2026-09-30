#!/usr/bin/env node
// Pull SKILL.md files from the upstream repos into content/skills/ and write
// src/data/upstream.json. Run with `npm run sync`; set GITHUB_TOKEN to avoid
// the anonymous API rate limit.

import fs from "node:fs";
import path from "node:path";
import {
  SOURCES,
  assertUniqueSlugs,
  isRedistributable,
  parseSkill,
  pluginIndex,
  skillDirsFromTree,
  slugFor,
} from "./lib/sync-core.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content/skills");
// Slim manifest imported by the app (bundled client-side) vs. English
// descriptions kept out of the bundle, used when writing zh overlays.
const MANIFEST_PATH = path.join(ROOT, "src/data/upstream.json");
const DESCRIPTIONS_PATH = path.join(ROOT, "content/upstream-descriptions.json");
const CONCURRENCY = 8;

const apiHeaders = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};

async function fetchOk(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res;
}

async function fetchRaw(repo, sha, filePath, { optional = false } = {}) {
  const url = `https://raw.githubusercontent.com/${repo}/${sha}/${filePath}`;
  const res = await fetch(url);
  if (res.status === 404 && optional) return null;
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.text();
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return results;
}

async function syncSource(source) {
  const api = `https://api.github.com/repos/${source.repo}`;
  const commit = await (await fetchOk(`${api}/commits/HEAD`, { headers: apiHeaders })).json();
  const sha = commit.sha;
  const tree = await (
    await fetchOk(`${api}/git/trees/${sha}?recursive=1`, { headers: apiHeaders })
  ).json();
  if (tree.truncated) throw new Error(`Tree listing truncated for ${source.repo}`);

  const plugins = source.marketplace
    ? pluginIndex(JSON.parse(await fetchRaw(source.repo, sha, source.marketplace)))
    : {};

  const excluded = new Set(source.exclude ?? []);
  const dirs = skillDirsFromTree(tree.tree, source.skillsDir).filter((dir) => !excluded.has(dir));
  const skills = await mapLimit(dirs, CONCURRENCY, async (dir) => {
    const base = `${source.skillsDir}/${dir}`;
    const [raw, licenseText] = await Promise.all([
      fetchRaw(source.repo, sha, `${base}/SKILL.md`),
      fetchRaw(source.repo, sha, `${base}/LICENSE.txt`, { optional: true }),
    ]);
    const parsed = parseSkill(raw);
    const plugin = plugins[dir] ?? null;
    return {
      slug: slugFor(dir, plugin),
      source: source.id,
      dir,
      name: parsed.name,
      descriptionEn: parsed.description,
      license: parsed.license,
      plugin,
      mirrored: isRedistributable(parsed.license, licenseText),
      body: parsed.body,
    };
  });

  console.log(`${source.repo}@${sha.slice(0, 7)}: ${skills.length} skills`);
  return { meta: { id: source.id, repo: source.repo, sha }, skills };
}

function writeContent(skills) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  const keep = new Set();
  for (const skill of skills.filter((s) => s.mirrored)) {
    const file = `${skill.slug}.md`;
    keep.add(file);
    fs.writeFileSync(path.join(CONTENT_DIR, file), `${skill.body}\n`);
  }
  for (const file of fs.readdirSync(CONTENT_DIR)) {
    // Only prune stale skill bodies; other files in the dir are not ours.
    if (!file.endsWith(".md")) continue;
    if (!keep.has(file)) fs.unlinkSync(path.join(CONTENT_DIR, file));
  }
}

async function main() {
  const results = [];
  for (const source of SOURCES) results.push(await syncSource(source));

  const skills = results.flatMap((r) => r.skills);
  assertUniqueSlugs(skills);
  writeContent(skills);

  const manifest = {
    syncedAt: new Date().toISOString().slice(0, 10),
    sources: results.map((r) => r.meta),
    skills: skills.map(({ slug, source, dir, name, license, plugin, mirrored }) => ({
      slug,
      source,
      dir,
      name,
      license,
      plugin,
      mirrored,
    })),
  };
  const descriptions = Object.fromEntries(skills.map((s) => [s.slug, s.descriptionEn]));
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  fs.writeFileSync(DESCRIPTIONS_PATH, `${JSON.stringify(descriptions, null, 2)}\n`);

  const withheld = skills.filter((s) => !s.mirrored).map((s) => s.slug);
  console.log(`Wrote ${skills.length} skills; body withheld (license): ${withheld.join(", ") || "none"}`);
}

main().catch((error) => {
  console.error(`sync failed: ${error.message}`);
  process.exit(1);
});
