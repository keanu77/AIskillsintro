import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CATEGORIES, OVERLAYS, SKILLS, UPSTREAM_SKILLS, buildSkills } from "./skills";
import type { UpstreamSkill } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/skills");

describe("catalog integrity", () => {
  it("has a zh-TW overlay for every synced upstream skill", () => {
    const listed = new Set(SKILLS.map((s) => s.slug));
    const untranslated = UPSTREAM_SKILLS.map((u) => u.slug).filter((s) => !listed.has(s));
    expect(untranslated).toEqual([]);
  });

  it("lists each overlay slug exactly once", () => {
    const slugs = Object.values(OVERLAYS).flat().map((o) => o.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("only uses known categories and non-empty zh descriptions", () => {
    const ids = new Set(CATEGORIES.map((c) => c.id));
    for (const skill of SKILLS) {
      expect(ids.has(skill.category)).toBe(true);
      expect(skill.description).toMatch(/[一-鿿]/);
    }
  });

  it("has mirrored content for exactly the redistributable skills", () => {
    for (const skill of SKILLS) {
      const exists = fs.existsSync(path.join(CONTENT_DIR, `${skill.slug}.md`));
      expect({ slug: skill.slug, exists }).toEqual({
        slug: skill.slug,
        exists: skill.upstream.mirrored,
      });
    }
  });
});

describe("buildSkills", () => {
  it("drops overlays whose skill disappeared upstream", () => {
    const upstream: UpstreamSkill[] = [
      { slug: "a", source: "k-dense", dir: "a", name: "a", license: null, plugin: null, mirrored: true },
    ];
    const overlays = {
      ...Object.fromEntries(CATEGORIES.map((c) => [c.id, []])),
      databases: [
        { slug: "a", name: "A", description: "甲" },
        { slug: "gone", name: "Gone", description: "已移除" },
      ],
    } as unknown as typeof OVERLAYS;
    expect(buildSkills(upstream, overlays).map((s) => s.slug)).toEqual(["a"]);
  });
});
