import { describe, expect, it } from "vitest";
import type { Skill } from "@/data/types";
import {
  EMPTY_FILTERS,
  filterSkills,
  hasActiveFilters,
  parseFilters,
  serializeFilters,
} from "./catalogFilter";

function skill(overrides: Partial<Skill> & Pick<Skill, "slug">): Skill {
  return {
    name: overrides.slug,
    description: "描述",
    category: "bioinformatics",
    upstream: {
      slug: overrides.slug,
      source: "k-dense",
      dir: overrides.slug,
      name: overrides.slug,
      license: null,
      plugin: null,
      mirrored: true,
    },
    ...overrides,
  };
}

const SKILLS: Skill[] = [
  skill({ slug: "scanpy", name: "Scanpy", description: "單細胞 RNA-seq 分析" }),
  skill({
    slug: "pdf",
    name: "PDF",
    description: "PDF 工具",
    category: "official",
    upstream: {
      slug: "pdf",
      source: "anthropic",
      dir: "pdf",
      name: "pdf",
      license: null,
      plugin: null,
      mirrored: false,
    },
  }),
  skill({
    slug: "rdkit",
    name: "RDKit",
    description: "化學資訊學",
    category: "chemistry",
  }),
];

const slugs = (skills: Skill[]) => skills.map((s) => s.slug);

describe("filterSkills", () => {
  it("returns everything with no filters", () => {
    expect(slugs(filterSkills(SKILLS, EMPTY_FILTERS))).toEqual([
      "scanpy",
      "pdf",
      "rdkit",
    ]);
  });

  it("matches name, slug and zh description case-insensitively", () => {
    expect(
      slugs(filterSkills(SKILLS, { ...EMPTY_FILTERS, query: "SCAN" })),
    ).toEqual(["scanpy"]);
    expect(
      slugs(filterSkills(SKILLS, { ...EMPTY_FILTERS, query: "化學" })),
    ).toEqual(["rdkit"]);
  });

  it("matches Latin terms only at word starts, CJK terms anywhere", () => {
    const skills = [
      skill({
        slug: "internal-comms",
        name: "Internal Comms",
        description: "內部溝通文件",
      }),
      skill({
        slug: "scrna",
        name: "scRNA tools",
        description: "單細胞 RNA-seq",
      }),
    ];
    expect(
      slugs(filterSkills(skills, { ...EMPTY_FILTERS, query: "rna" })),
    ).toEqual(["scrna"]);
    expect(
      slugs(filterSkills(skills, { ...EMPTY_FILTERS, query: "comm" })),
    ).toEqual(["internal-comms"]);
    expect(
      slugs(filterSkills(skills, { ...EMPTY_FILTERS, query: "溝通" })),
    ).toEqual(["internal-comms"]);
    expect(
      slugs(filterSkills(skills, { ...EMPTY_FILTERS, query: "細胞" })),
    ).toEqual(["scrna"]);
  });

  it("requires every whitespace-separated term to match", () => {
    expect(
      slugs(filterSkills(SKILLS, { ...EMPTY_FILTERS, query: "單細胞 rna" })),
    ).toEqual(["scanpy"]);
    expect(
      slugs(filterSkills(SKILLS, { ...EMPTY_FILTERS, query: "單細胞 化學" })),
    ).toEqual([]);
  });

  it("filters by category and source together with the query", () => {
    expect(
      slugs(filterSkills(SKILLS, { ...EMPTY_FILTERS, category: "chemistry" })),
    ).toEqual(["rdkit"]);
    expect(
      slugs(filterSkills(SKILLS, { ...EMPTY_FILTERS, source: "anthropic" })),
    ).toEqual(["pdf"]);
    expect(
      slugs(
        filterSkills(SKILLS, {
          query: "pdf",
          category: "official",
          source: "k-dense",
        }),
      ),
    ).toEqual([]);
  });
});

describe("URL round trip", () => {
  it("parses known params and ignores invalid values", () => {
    expect(
      parseFilters("?q=rna%20seq&category=chemistry&source=anthropic"),
    ).toEqual({
      query: "rna seq",
      category: "chemistry",
      source: "anthropic",
    });
    expect(parseFilters("?category=nope&source=evil&q=")).toEqual(
      EMPTY_FILTERS,
    );
  });

  it("serializes only active filters", () => {
    expect(serializeFilters(EMPTY_FILTERS)).toBe("");
    expect(
      serializeFilters({ query: " rna ", category: null, source: "k-dense" }),
    ).toBe("?q=rna&source=k-dense");
  });

  it("detects active filters", () => {
    expect(hasActiveFilters(EMPTY_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...EMPTY_FILTERS, query: "   " })).toBe(false);
    expect(hasActiveFilters({ ...EMPTY_FILTERS, source: "anthropic" })).toBe(
      true,
    );
  });
});
