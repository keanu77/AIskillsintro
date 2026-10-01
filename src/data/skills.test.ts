import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CATEGORIES, OVERLAYS, SKILLS, UPSTREAM_SKILLS, buildSkills } from "./skills";
import type { UpstreamSkill } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/skills");

describe("catalog integrity", () => {
  it("only publishes skills with both source metadata and a Chinese overlay", () => {
    const upstream = new Set(UPSTREAM_SKILLS.map((s) => s.slug));
    const translated = new Set(Object.values(OVERLAYS).flat().map((s) => s.slug));
    for (const skill of SKILLS) {
      expect(upstream.has(skill.slug) && translated.has(skill.slug)).toBe(true);
    }
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

// Editorial guardrails for the zh intro shown above the install panel (#12).
const INTRO_LIMITS = { useCase: 60, limitations: 120, starterPrompt: 80 } as const;
// Absolute efficacy wording and 「病歷」 are off-limits in public copy.
const FORBIDDEN = /保證|完全|百分之百|一定能|徹底|根治|無副作用|病歷|實測有效/;

describe("zh intro", () => {
  it("gives every skill a use case, prerequisites and a starter prompt", () => {
    const missing = SKILLS.filter((s) => !s.useCase || !s.limitations || !s.starterPrompt).map((s) => s.slug);
    expect(missing).toEqual([]);
  });

  it("keeps intro fields short and free of forbidden wording", () => {
    for (const skill of SKILLS) {
      for (const [field, max] of Object.entries(INTRO_LIMITS)) {
        const text = skill[field as keyof typeof INTRO_LIMITS];
        if (!text) continue;
        expect(text.length, `${skill.slug}.${field}`).toBeLessThanOrEqual(max);
        expect(text, `${skill.slug}.${field}`).not.toMatch(FORBIDDEN);
      }
    }
  });

  it("records which upstream version each intro was written from", () => {
    for (const skill of SKILLS.filter((s) => s.useCase)) {
      expect(skill.reviewedHash, skill.slug).toMatch(/^[a-f0-9]{64}$/);
      expect(skill.reviewedSourceUrl, skill.slug).toMatch(/^https:\/\/github\.com\//);
    }
  });
});

describe("buildSkills", () => {
  it("keeps newly discovered untranslated skills out of the public catalog", () => {
    const candidate = { slug: "new-unreviewed", source: "k-dense", dir: "new-unreviewed", name: "New", license: null, plugin: null, mirrored: false } as UpstreamSkill;
    expect(buildSkills([candidate], OVERLAYS)).toEqual([]);
  });
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
