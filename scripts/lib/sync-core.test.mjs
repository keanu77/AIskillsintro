import { describe, expect, it } from "vitest";
import {
  assertUniqueSlugs,
  isRedistributable,
  parseSkill,
  pluginIndex,
  skillDirsFromTree,
  slugFor,
} from "./sync-core.mjs";

describe("skillDirsFromTree", () => {
  it("keeps only top-level SKILL.md blobs under the skills dir", () => {
    const tree = [
      { type: "blob", path: "skills/scanpy/SKILL.md" },
      { type: "blob", path: "skills/scanpy/references/SKILL.md" },
      { type: "blob", path: "skills/aeon/README.md" },
      { type: "tree", path: "skills/aeon" },
      { type: "blob", path: "template/SKILL.md" },
      { type: "blob", path: "skills/aeon/SKILL.md" },
    ];
    expect(skillDirsFromTree(tree, "skills")).toEqual(["aeon", "scanpy"]);
  });
});

describe("pluginIndex / slugFor", () => {
  const index = pluginIndex({
    plugins: [
      { name: "document-skills", skills: ["./skills/pdf", "./skills/docx"] },
      { name: "example-skills", skills: ["./skills/canvas-design"] },
    ],
  });

  it("maps skill dirs to plugin names", () => {
    expect(index).toEqual({
      pdf: "document-skills",
      docx: "document-skills",
      "canvas-design": "example-skills",
    });
  });

  it("prefixes only document-skills to preserve legacy URLs", () => {
    expect(slugFor("pdf", index.pdf)).toBe("document-skills--pdf");
    expect(slugFor("canvas-design", index["canvas-design"])).toBe("canvas-design");
    expect(slugFor("scanpy", null)).toBe("scanpy");
  });

  it("tolerates a missing marketplace", () => {
    expect(pluginIndex(undefined)).toEqual({});
  });
});

describe("isRedistributable", () => {
  it("blocks all-rights-reserved or proprietary licenses", () => {
    expect(isRedistributable(null, "© 2025 Anthropic, PBC. All rights reserved.")).toBe(false);
    expect(isRedistributable("Proprietary. LICENSE.txt has terms", null)).toBe(false);
  });

  it("allows open licenses and missing license info", () => {
    expect(isRedistributable("MIT", "Apache License Version 2.0")).toBe(true);
    expect(isRedistributable(null, null)).toBe(true);
  });
});

describe("parseSkill", () => {
  it("extracts frontmatter fields and body", () => {
    const skill = parseSkill("---\nname: scanpy\ndescription: Single-cell.\nlicense: BSD-3-Clause\n---\n\n# Scanpy\n");
    expect(skill).toEqual({
      name: "scanpy",
      description: "Single-cell.",
      license: "BSD-3-Clause",
      body: "# Scanpy",
    });
  });

  it("rejects SKILL.md without name/description", () => {
    expect(() => parseSkill("---\nname: x\n---\nbody")).toThrow(/frontmatter/);
  });
});

describe("assertUniqueSlugs", () => {
  it("throws on cross-source collisions", () => {
    expect(() =>
      assertUniqueSlugs([
        { slug: "pdf", source: "anthropic" },
        { slug: "pdf", source: "k-dense" },
      ]),
    ).toThrow(/collision "pdf"/);
  });
});
