import { describe, expect, it } from "vitest";
import { AGENTS, buildInstallGuide } from "./installCommands";
import type { UpstreamSkill } from "@/data/types";

const kdense: UpstreamSkill = {
  slug: "scanpy",
  source: "k-dense",
  dir: "scanpy",
  name: "scanpy",
  license: "BSD-3-Clause",
  plugin: null,
  mirrored: true,
};

const anthropicDoc: UpstreamSkill = {
  slug: "document-skills--pdf",
  source: "anthropic",
  dir: "pdf",
  name: "pdf",
  license: "Proprietary",
  plugin: "document-skills",
  mirrored: false,
};

const REPOS = {
  anthropic: "anthropics/skills",
  "k-dense": "K-Dense-AI/scientific-agent-skills",
} as const;

describe("AGENTS", () => {
  it("covers Claude Code, Codex, Gemini CLI and Grok with their skills CLI ids", () => {
    expect(AGENTS.map((a) => a.cliId)).toEqual(["claude-code", "codex", "gemini-cli", "grok"]);
  });
});

describe("buildInstallGuide", () => {
  it("uses the upstream repo and frontmatter name in the npx skills command", () => {
    const guide = buildInstallGuide(kdense, "codex", REPOS);
    expect(guide.command).toBe(
      "npx skills add K-Dense-AI/scientific-agent-skills --skill scanpy -g -a codex -y",
    );
  });

  it("targets each agent's global skills directory for manual install", () => {
    const paths = AGENTS.map((a) => buildInstallGuide(kdense, a.id, REPOS).manual);
    expect(paths[0]).toContain("~/.claude/skills/scanpy");
    expect(paths[1]).toContain("~/.agents/skills/scanpy");
    expect(paths[2]).toContain("~/.agents/skills/scanpy");
    expect(paths[3]).toContain("~/.grok/skills/scanpy");
    expect(paths[0]).toContain("K-Dense-AI/scientific-agent-skills.git");
    expect(paths[0]).toContain("skills/scanpy");
  });

  it("offers the plugin marketplace route only for Anthropic skills on Claude Code", () => {
    expect(buildInstallGuide(anthropicDoc, "claude-code", REPOS).plugin).toBe(
      "/plugin marketplace add anthropics/skills\n/plugin install document-skills@anthropic-agent-skills",
    );
    expect(buildInstallGuide(anthropicDoc, "codex", REPOS).plugin).toBeNull();
    expect(buildInstallGuide(kdense, "claude-code", REPOS).plugin).toBeNull();
  });

  it("rejects unknown agents", () => {
    // @ts-expect-error — runtime guard for bad input
    expect(() => buildInstallGuide(kdense, "cursor", REPOS)).toThrow(/Unknown agent/);
  });
});
