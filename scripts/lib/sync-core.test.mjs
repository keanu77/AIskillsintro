import { describe, expect, it } from "vitest";
import fs from "node:fs";
const apacheText = fs.readFileSync(new URL("../licenses/Apache-2.0.txt", import.meta.url), "utf8");
const mitText = fs.readFileSync(new URL("../../node_modules/is-extendable/LICENSE", import.meta.url), "utf8");
import {
  assertUniqueSlugs, contentHash, isRedistributable, licenseDecision,
  parseSkill, pluginIndex, skillDirsFromTree, skillLocations, slugFor, validateSources,
} from "./sync-core.mjs";

const source = { id: "openai", repo: "openai/plugins", layout: "plugins", skillsDir: "plugins", namespace: true, declaredAgents: ["codex"], includePlugins: ["notion"] };

describe("safe source and skill paths", () => {
  it("keeps only direct SKILL.md blobs and rejects unsafe path names", () => {
    const tree = ["skills/z/SKILL.md", "skills/a/SKILL.md", "skills/a/references/SKILL.md", "skills/../SKILL.md", "skills/$(bad)/SKILL.md"].map(path => ({ type: "blob", path }));
    expect(skillDirsFromTree(tree, "skills")).toEqual(["a", "z"]);
  });
  it("discovers only allowlisted plugin skill folders with namespaced slugs", () => {
    const tree = ["plugins/notion/skills/search/SKILL.md", "plugins/other/skills/search/SKILL.md", "plugins/notion/skills/search/refs/SKILL.md"].map(path => ({ type: "blob", path }));
    expect(skillLocations(tree, source)).toEqual([{ dir: "search", path: "plugins/notion/skills/search", plugin: "notion" }]);
    expect(slugFor("search", "notion", source)).toBe("openai--notion--search");
    expect(slugFor("search", null, { id: "vercel", namespace: true, layout: "standard" })).toBe("vercel--search");
  });
  it("preserves old document plugin slugs", () => {
    expect(slugFor("pdf", "document-skills")).toBe("document-skills--pdf");
    expect(slugFor("scanpy", null)).toBe("scanpy");
    expect(pluginIndex({ plugins: [{ name: "document-skills", skills: ["./skills/pdf"] }] })).toEqual({ pdf: "document-skills" });
  });
  it("rejects unsafe registries and duplicate IDs", () => {
    expect(() => validateSources([{ ...source, repo: "evil/x/../../y" }])).toThrow(/repo/);
    expect(() => validateSources([{ ...source, skillsDir: "../skills" }])).toThrow(/path/);
    expect(() => validateSources([source, source])).toThrow(/duplicate/);
  });
});

describe("license decisions", () => {
  it("blocks unknown, missing and explicitly custom terms", () => {
    expect(isRedistributable(null, null)).toBe(false);
    expect(isRedistributable("My custom license", "MIT License")).toBe(false);
    expect(isRedistributable("Proprietary", "MIT License")).toBe(false);
    expect(isRedistributable("MIT", "All rights reserved; redistribution prohibited.")).toBe(false);
  });
  it("blocks custom frontmatter even when it mentions a known open license", () => {
    expect(licenseDecision("MIT License - for research use only").mirrored).toBe(false);
    expect(licenseDecision("Custom license based on Apache License 2.0; commercial use requires a separate agreement.").mirrored).toBe(false);
    expect(licenseDecision("MIT License - for research use only", [{ path: "LICENSE", text: mitText }]).mirrored).toBe(false);
    expect(licenseDecision("MIT license").mirrored).toBe(true);
    expect(licenseDecision("BSD-3-Clause license").mirrored).toBe(true);
  });
  it("rejects modified full license files rather than matching a familiar title", () => {
    expect(licenseDecision(null, [{ path: "LICENSE", text: mitText }]).mirrored).toBe(true);
    expect(licenseDecision(null, [{ path: "LICENSE", text: mitText.replace("Copyright (c) 2015, Jon Schlinkert.", "Copyright (c) 2025 K-Dense Inc.") }]).mirrored).toBe(true);
    expect(licenseDecision(null, [{ path: "LICENSE", text: mitText + "\nFor research use only." }]).mirrored).toBe(false);
    expect(licenseDecision(null, [{ path: "LICENSE", text: mitText.replace("without restriction", "for educational use only") }]).mirrored).toBe(false);
    expect(licenseDecision(null, [{ path: "LICENSE", text: "Apache License\nVersion 2.0, January 2004\nCommercial use requires a separate agreement." }]).mirrored).toBe(false);
  });
  it.each([
    "Copyright (c) 2015, Jon Schlinkert. Distribution is forbidden.",
    "Copyright (c) 2015, Jon Schlinkert. Redistribution requires written permission.",
    "Copyright (c) 2015, Jon Schlinkert Redistribution Requires Written Permission",
    "Copyright (c) 2026 Unreviewed Owner",
  ])("withholds unreviewed or extended attribution lines: %s", copyrightLine => {
    const modified = mitText.replace("Copyright (c) 2015, Jon Schlinkert.", copyrightLine);
    expect(licenseDecision(null, [{ path: "LICENSE", text: modified }]).mirrored).toBe(false);
    expect(licenseDecision("MIT", [{ path: "LICENSE", text: modified }]).mirrored).toBe(false);
  });
  it("recognizes explicit open identifiers and follows a local license reference", () => {
    expect(isRedistributable("MIT", null)).toBe(true);
    expect(licenseDecision("Complete terms in LICENSE.txt", [{ path: "skills/foo/LICENSE.txt", text: apacheText }])).toMatchObject({ mirrored: true, license: "Apache-2.0" });
    expect(licenseDecision(null, [{ path: "skills/foo/LICENSE", text: "custom terms" }, { path: "LICENSE", text: "MIT License" }]).mirrored).toBe(false);
  });
});

describe("safe frontmatter and hashes", () => {
  it("extracts YAML and declared compatibility", () => {
    expect(parseSkill("---\nname: scanpy\ndescription: Single-cell.\nlicense: BSD-3-Clause\ncompatibility: Requires Python\n---\n# Scanpy\n")).toEqual({ name: "scanpy", description: "Single-cell.", license: "BSD-3-Clause", compatibility: "Requires Python", body: "# Scanpy" });
  });
  it("rejects executable frontmatter before an engine can evaluate it", () => {
    expect(() => parseSkill("---javascript\n({name:'x',description:'x'})\n---\nbody")).toThrow(/YAML/);
    expect(() => parseSkill("---\nname: !!js/function >\n  function() {}\ndescription: x\n---\nbody")).toThrow();
    expect(() => parseSkill("---\nname: x\n---\nbody")).toThrow(/frontmatter/);
  });
  it("hashes the full skill subtree independent of API order", () => {
    const tree = [{ type: "blob", path: "skills/x/SKILL.md", sha: "a" }, { type: "blob", path: "skills/x/scripts/run.py", sha: "b" }, { type: "blob", path: "skills/xy/no", sha: "c" }];
    expect(contentHash(tree, "skills/x")).toBe(contentHash([...tree].reverse(), "skills/x"));
    expect(contentHash(tree, "skills/x")).not.toBe(contentHash([{ ...tree[0] }, { ...tree[1], sha: "d" }], "skills/x"));
  });
  it("rejects duplicate slugs", () => expect(() => assertUniqueSlugs([{ slug: "x", source: "a" }, { slug: "x", source: "b" }])).toThrow(/collision/));
});
