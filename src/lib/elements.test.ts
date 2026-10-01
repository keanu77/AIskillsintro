import { describe, expect, it } from "vitest";
import { CATEGORIES } from "@/data/categories";
import { SKILLS } from "@/data/skills";
import type { Skill } from "@/data/types";
import { buildElements, elementSymbol, formatNumber } from "./elements";

function skill(slug: string, name: string, category: Skill["category"]): Skill {
  return {
    slug,
    name,
    description: "描述",
    category,
    upstream: { slug, source: "k-dense", dir: slug, name: slug, license: null, plugin: null, mirrored: true },
  };
}

describe("elementSymbol", () => {
  it("uses the first two letters of the first word that starts with a letter", () => {
    expect(elementSymbol("Scanpy")).toBe("Sc");
    expect(elementSymbol("RELION")).toBe("Re");
    expect(elementSymbol("13C Metabolic Flux")).toBe("Me");
    expect(elementSymbol("1000 Genomes (Individual-level)")).toBe("Ge");
    expect(elementSymbol("PK/PD Modeling")).toBe("Pk");
    expect(elementSymbol("scVelo")).toBe("Sc");
  });

  it("falls back to a single letter or ?", () => {
    expect(elementSymbol("R")).toBe("R");
    expect(elementSymbol("123")).toBe("?");
  });
});

describe("formatNumber", () => {
  it("zero-pads to three digits", () => {
    expect(formatNumber(7)).toBe("007");
    expect(formatNumber(196)).toBe("196");
  });
});

describe("buildElements", () => {
  it("numbers by category order, then by the order skills arrive", () => {
    const skills = [
      skill("rdkit", "Rdkit", "chemistry"),
      skill("pdf", "PDF", "official"),
      skill("scanpy", "Scanpy", "bioinformatics"),
      skill("anndata", "Anndata", "bioinformatics"),
    ];
    const els = buildElements(skills, CATEGORIES);
    expect(els.map((e) => [e.number, e.skill.slug, e.symbol])).toEqual([
      [1, "pdf", "Pd"],
      [2, "scanpy", "Sc"],
      [3, "anndata", "An"],
      [4, "rdkit", "Rd"],
    ]);
    expect(els[1].category.code).toBe("BIO");
  });

  it("falls back to the upstream name when the zh name has no Latin letters", () => {
    const zh = { ...skill("web-design-guidelines", "網頁介面設計準則", "development") };
    zh.upstream = { ...zh.upstream, name: "web-design-guidelines" };
    expect(buildElements([zh], CATEGORIES)[0].symbol).toBe("We");
  });

  it("gives every catalog element a real symbol", () => {
    const missing = buildElements(SKILLS, CATEGORIES).filter((e) => e.symbol === "?").map((e) => e.skill.slug);
    expect(missing).toEqual([]);
  });

  it("covers the whole catalog exactly once with unique numbers", () => {
    const els = buildElements(SKILLS, CATEGORIES);
    expect(els).toHaveLength(SKILLS.length);
    expect(new Set(els.map((e) => e.number)).size).toBe(SKILLS.length);
    expect(new Set(els.map((e) => e.skill.slug)).size).toBe(SKILLS.length);
  });
});
