import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { discoverSkills } from "./discover-skills.mjs";
const roots = [];
const source = { id: "one", repo: "known/repo", skillsDir: "skills", layout: "standard", namespace: false, declaredAgents: [] };
const item = (repo, extra = {}) => ({ full_name: repo, description: "Example", stargazers_count: 100, pushed_at: "2026-09-30T00:00:00Z", fork: false, archived: false, ...extra });
function fixture(previous = {}) { const root = fs.mkdtempSync(path.join(os.tmpdir(), "discovery-")); roots.push(root); fs.mkdirSync(path.join(root, "src/data"), { recursive: true }); fs.writeFileSync(path.join(root, "src/data/discovery.json"), JSON.stringify(previous)); return root; }
const previous = { checkedAt: "2026-09-20T00:00:00Z", candidates: [{ repo: "old/repo" }] };
afterEach(() => roots.splice(0).forEach(root => fs.rmSync(root, { recursive: true, force: true })));
describe("bounded repository discovery", () => {
  it("deduplicates repos, excludes fork/archive/known/low-star and confirms pinned SKILL.md", async () => {
    const queried = [];
    const result = await discoverSkills({ root: fixture(), sources: [source], now: "2026-10-01T00:00:00Z", client: {
      search: async () => ({ incomplete_results: false, items: [item("Good/Skills"), item("good/skills"), item("known/repo"), item("fork/repo", { fork: true }), item("archive/repo", { archived: true }), item("low/repo", { stargazers_count: 49 }), item("unsafe/../../repo"), item("empty/repo")] }),
      repository: async repo => { queried.push(repo); return { sha: "a".repeat(40), stars: 101, pushedAt: "2026-09-30T00:00:00Z", tree: repo === "empty/repo" ? [] : [{ type: "blob", path: "skills/real/SKILL.md" }, { type: "tree", path: "skills/fake/SKILL.md" }] }; },
    } });
    expect(result.status).toBe("ok");
    expect(result.candidates.map(candidate => candidate.repo)).toEqual(["good/skills"]);
    expect(result.candidates[0]).toMatchObject({ url: "https://github.com/good/skills", skillPaths: ["skills/real/SKILL.md"], sha: "a".repeat(40), stars: 101 });
    expect(queried).toHaveLength(2);
  });
  it("preserves last good candidates and date on any failed search", async () => {
    const result = await discoverSkills({ root: fixture(previous), sources: [source], client: { search: async () => { throw new Error("GitHub HTTP 403 token=secret"); } } });
    expect(result).toMatchObject({ status: "stale", checkedAt: previous.checkedAt, candidates: previous.candidates, error: "GitHub HTTP 403" });
    expect(JSON.stringify(result)).not.toContain("secret");
  });
  it("does not report partial search or truncated tree as a successful empty result", async () => {
    const result = await discoverSkills({ root: fixture(previous), sources: [source], client: { search: async () => ({ incomplete_results: true, items: [] }) } });
    expect(result.status).toBe("stale");
    expect(result.candidates).toEqual(previous.candidates);
  });
  it("samples forty confirmed paths from large complete trees without discarding other candidates", async () => {
    const result = await discoverSkills({ root: fixture(), sources: [source], client: {
      search: async () => ({ incomplete_results: false, items: [item("large/repo")] }),
      repository: async () => ({ sha: "a".repeat(40), stars: 100, pushedAt: "2026-09-30T00:00:00Z", tree: Array.from({ length: 100 }, (_, i) => ({ type: "blob", path: `skills/demo-${i}/SKILL.md` })) }),
    } });
    expect(result.status).toBe("ok");
    expect(result.candidates[0]).toMatchObject({ skillCount: 100, skillPathsTruncated: true });
    expect(result.candidates[0].skillPaths).toHaveLength(40);
  });
  it("caps candidate repository checks at ten", async () => {
    let checks = 0;
    await discoverSkills({ root: fixture(), sources: [source], client: { search: async () => ({ incomplete_results: false, items: Array.from({ length: 20 }, (_, i) => item(`repo/name-${i}`)) }), repository: async () => { checks++; return { sha: "a".repeat(40), stars: 100, pushedAt: "2026-09-30T00:00:00Z", tree: [] }; } } });
    expect(checks).toBe(10);
  });
});
