#!/usr/bin/env node
import path from "node:path";
import { githubClient } from "./lib/github.mjs";
import { DEFAULT_ROOT, isMain, loadSources, readJson, sanitizedError, writeJson } from "./lib/files.mjs";
import { isSafePath, isSafeRepo } from "./lib/sync-core.mjs";

export const DISCOVERY_QUERIES = [
  "topic:agent-skills stars:>=50 archived:false fork:false",
  "agent skills in:name,description stars:>=50 archived:false fork:false",
];
const MAX_REPOSITORIES = 10;
const MAX_SKILL_PATHS = 40;

export async function discoverSkills({ root = DEFAULT_ROOT, sources = loadSources(root), client = githubClient(), now = new Date().toISOString() } = {}) {
  const file = path.join(root, "src/data/discovery.json");
  const previous = readJson(file, { checkedAt: null, candidates: [] });
  let snapshot;
  try {
    const known = new Set(sources.map(source => source.repo.toLowerCase()));
    const repos = new Map();
    for (const query of DISCOVERY_QUERIES) {
      const response = await client.search(query);
      if (response.incomplete_results !== false || !Array.isArray(response.items)) throw new Error("Incomplete GitHub search results");
      for (const item of response.items) {
        if (!isSafeRepo(item.full_name) || item.fork !== false || item.archived !== false || !Number.isFinite(item.stargazers_count) || item.stargazers_count < 50) continue;
        const repo = item.full_name.toLowerCase();
        if (known.has(repo) || repos.has(repo)) continue;
        repos.set(repo, item);
      }
    }
    const selected = [...repos].sort((a, b) => b[1].stargazers_count - a[1].stargazers_count || a[0].localeCompare(b[0])).slice(0, MAX_REPOSITORIES);
    const candidates = [];
    for (const [repo, item] of selected) {
      const evidence = await client.repository(repo);
      const skillPaths = [...new Set(evidence.tree.filter(entry => entry.type === "blob" && isSafePath(entry.path) && /(?:^|\/)SKILL\.md$/.test(entry.path)).map(entry => entry.path))].sort();
      if (!skillPaths.length || evidence.stars < 50) continue;
      candidates.push({
        repo, url: `https://github.com/${repo}`, description: typeof item.description === "string" ? item.description.slice(0, 1000) : null,
        stars: evidence.stars, pushedAt: evidence.pushedAt, sha: evidence.sha,
        skillPaths: skillPaths.slice(0, MAX_SKILL_PATHS), skillCount: skillPaths.length, skillPathsTruncated: skillPaths.length > MAX_SKILL_PATHS,
        discoveredAt: previous.candidates?.find(candidate => candidate.repo.toLowerCase() === repo)?.discoveredAt ?? now,
      });
    }
    snapshot = { checkedAt: now, status: "ok", attemptedAt: now, queries: DISCOVERY_QUERIES, error: null, candidates };
  } catch (error) {
    snapshot = { checkedAt: previous.checkedAt ?? null, status: "stale", attemptedAt: now, queries: DISCOVERY_QUERIES, error: sanitizedError(error), candidates: previous.candidates ?? [] };
  }
  writeJson(file, snapshot);
  return snapshot;
}
if (isMain(import.meta.url)) discoverSkills().then(result => {
  console.log(`Discovery ${result.status}: ${result.candidates.length} candidates${result.error ? `; ${result.error}` : ""}`);
  if (result.status === "stale") process.exitCode = 1;
}).catch(error => { console.error(`discovery failed: ${sanitizedError(error)}`); process.exitCode = 1; });
