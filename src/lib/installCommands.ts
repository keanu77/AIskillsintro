import type { SourceId, UpstreamSkill } from "@/data/types";

export type AgentId = "claude-code" | "codex" | "gemini-cli" | "grok";

export interface Agent {
  id: AgentId;
  label: string;
  /** `--agent` value understood by the `skills` CLI (github.com/vercel-labs/skills). */
  cliId: string;
  /**
   * User-level skills directory, matching where `skills add -g` installs.
   * Codex and Gemini CLI both read the shared ~/.agents/skills location.
   */
  globalDir: string;
}

export const AGENTS: Agent[] = [
  { id: "claude-code", label: "Claude Code", cliId: "claude-code", globalDir: "~/.claude/skills" },
  { id: "codex", label: "Codex", cliId: "codex", globalDir: "~/.agents/skills" },
  { id: "gemini-cli", label: "Gemini CLI", cliId: "gemini-cli", globalDir: "~/.agents/skills" },
  { id: "grok", label: "Grok", cliId: "grok", globalDir: "~/.grok/skills" },
];

// Marketplace name declared in anthropics/skills/.claude-plugin/marketplace.json.
const ANTHROPIC_MARKETPLACE = "anthropic-agent-skills";

export interface InstallGuide {
  /** One-line install via the cross-agent `skills` CLI. */
  command: string;
  /** Manual clone-and-copy fallback. */
  manual: string;
  /** Claude Code plugin marketplace route, when the skill ships as a plugin. */
  plugin: string | null;
}

export function buildInstallGuide(
  skill: UpstreamSkill,
  agentId: AgentId,
  repos: Record<SourceId, string>,
): InstallGuide {
  const agent = AGENTS.find((a) => a.id === agentId);
  if (!agent) throw new Error(`Unknown agent: ${agentId}`);

  const repo = repos[skill.source];
  const clone = repo.split("/")[1];
  const target = `${agent.globalDir}/${skill.dir}`;

  return {
    command: `npx skills add ${repo} --skill ${skill.name} -g -a ${agent.cliId} -y`,
    manual: [
      `git clone --depth 1 https://github.com/${repo}.git`,
      `mkdir -p ${agent.globalDir}`,
      `cp -r ${clone}/skills/${skill.dir} ${target}`,
    ].join("\n"),
    plugin:
      agentId === "claude-code" && skill.source === "anthropic" && skill.plugin
        ? `/plugin marketplace add ${repo}\n/plugin install ${skill.plugin}@${ANTHROPIC_MARKETPLACE}`
        : null,
  };
}
