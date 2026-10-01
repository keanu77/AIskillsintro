import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { syncCatalog } from "./sync-skills.mjs";

const roots = [];
const mitText = fs.readFileSync(new URL("../node_modules/is-extendable/LICENSE", import.meta.url), "utf8");
const source = { id: "one", repo: "owner/repo", skillsDir: "skills", layout: "standard", namespace: true, declaredAgents: ["codex"] };
const sha = "a".repeat(40);
const tree = [{ type: "blob", path: "skills/demo/SKILL.md", sha: "1" }, { type: "blob", path: "skills/demo/reference.txt", sha: "2" }, { type: "blob", path: "LICENSE", sha: "3" }];
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "skills-sync-")); roots.push(root);
  fs.mkdirSync(path.join(root, "src/data"), { recursive: true });
  fs.mkdirSync(path.join(root, "content/skills"), { recursive: true });
  fs.writeFileSync(path.join(root, "src/data/upstream.json"), JSON.stringify({ sources: [], skills: [{ slug: "old", mirrored: true }] }));
  fs.writeFileSync(path.join(root, "content/skills/old.md"), "old");
  return root;
}
function client(overrides = {}) {
  return {
    repository: async () => ({ sha, stars: 42, pushedAt: "2026-09-30T00:00:00Z", tree }),
    raw: async (_repo, pinned, file) => {
      expect(pinned).toBe(sha);
      return file === "LICENSE" ? mitText : "---\nname: Demo\ndescription: Example.\ncompatibility: Requires Python\n---\n# Body";
    },
    ...overrides,
  };
}
afterEach(() => roots.splice(0).forEach(root => fs.rmSync(root, { recursive: true, force: true })));

describe("source sync transaction", () => {
  it("pins source reads and retains attribution plus full skill-tree evidence", async () => {
    const root = fixture();
    const result = await syncCatalog({ root, sources: [source], client: client(), now: "2026-10-01T00:00:00Z" });
    expect(result.skills[0]).toMatchObject({ slug: "one--demo", path: "skills/demo", compatibility: "Requires Python", license: "MIT", mirrored: true, installMode: "skill", declaredAgents: ["codex"] });
    expect(result.skills[0].contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(result.sources[0]).toMatchObject({ sha, stars: 42, observedAt: "2026-10-01T00:00:00Z" });
    expect(fs.readFileSync(path.join(root, "content/licenses/one--demo.txt"), "utf8")).toContain("Copyright (c) 2015, Jon Schlinkert.");
    expect(fs.existsSync(path.join(root, "content/skills/old.md"))).toBe(false);
  });
  it("does not modify any catalog files when a fixed source fails", async () => {
    const root = fixture();
    await expect(syncCatalog({ root, sources: [source, { ...source, id: "two", repo: "other/repo" }], client: client({ repository: async repo => { if (repo === "other/repo") throw new Error("403"); return { sha, stars: 42, pushedAt: "2026-09-30T00:00:00Z", tree }; } }) })).rejects.toThrow("403");
    expect(fs.readFileSync(path.join(root, "content/skills/old.md"), "utf8")).toBe("old");
    expect(fs.existsSync(path.join(root, "content/skills/one--demo.md"))).toBe(false);
  });
  it("fails closed when a configured source layout discovers zero skills", async () => {
    const root = fixture();
    await expect(syncCatalog({ root, sources: [source], client: client({ repository: async () => ({ sha, stars: 42, pushedAt: "2026-09-30", tree: [] }) }) })).rejects.toThrow(/No skills found/);
    expect(fs.readFileSync(path.join(root, "content/skills/old.md"), "utf8")).toBe("old");
  });
  it("retains current withheld license evidence while pruning its formerly mirrored body", async () => {
    const root = fixture();
    await syncCatalog({ root, sources: [source], client: client() });
    await syncCatalog({ root, sources: [source], client: client({ raw: async (_r, _s, file) => file === "LICENSE" ? "Custom license: research only" : "---\nname: Demo\ndescription: Example.\n---\n# Body" }) });
    expect(fs.existsSync(path.join(root, "content/skills/one--demo.md"))).toBe(false);
    expect(fs.readFileSync(path.join(root, "content/licenses/one--demo.txt"), "utf8")).toContain("research only");
  });
  it("lists metadata but withholds a body for an unknown nearest license", async () => {
    const root = fixture();
    const result = await syncCatalog({ root, sources: [source], client: client({ raw: async (_r, _s, file) => file === "LICENSE" ? "Custom terms" : "---\nname: Demo\ndescription: Example.\n---\n# Body" }) });
    expect(result.skills[0].mirrored).toBe(false);
    expect(fs.readFileSync(path.join(root, "content/licenses/one--demo.txt"), "utf8")).toContain("Custom terms");
    expect(fs.existsSync(path.join(root, "content/skills/one--demo.md"))).toBe(false);
  });
});
