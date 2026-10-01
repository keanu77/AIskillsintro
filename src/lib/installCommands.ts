import type { AgentId, SourceId, UpstreamSkill } from "@/data/types";

export type { AgentId } from "@/data/types";

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
  { id: "cursor", label: "Cursor", cliId: "cursor", globalDir: "~/.cursor/skills" },
  { id: "grok", label: "Grok Build", cliId: "grok", globalDir: "~/.grok/skills" },
];

// Marketplace name declared in anthropics/skills/.claude-plugin/marketplace.json.
const ANTHROPIC_MARKETPLACE = "anthropic-agent-skills";

export interface InstallGuide {
  /** One-line install via the cross-agent `skills` CLI. */
  command: string | null;
  /** Manual clone-and-copy fallback. */
  manual: string | null;
  /** Claude Code plugin marketplace route, when the skill ships as a plugin. */
  plugin: string | null;
  notice?: string;
}

export function buildInstallGuide(
  skill: UpstreamSkill,
  agentId: AgentId,
  repos: Partial<Record<SourceId, string>>,
): InstallGuide {
  const agent = AGENTS.find((a) => a.id === agentId);
  if (!agent) throw new Error(`Unknown agent: ${agentId}`);

  const repo = repos[skill.source];
  if (!repo || !/^[\w.-]+\/[\w.-]+$/.test(repo)) throw new Error("Invalid source repository");
  if (skill.installMode === "plugin") {
    return {
      command: null, manual: null,
      plugin: agentId === "codex" ? "/plugins" : null,
      notice: agentId === "codex"
        ? `在 Codex 的 Plugins 搜尋「${skill.plugin}」，選擇對應來源的 plugin 並完成連線設定。此 skill 依賴整包 plugin 的工具與服務。`
        : "此來源提供 Codex plugin；尚未確認在此平台的完整安裝方式。請參閱來源文件。",
    };
  }
  const skillPath = skill.path ?? `skills/${skill.dir}`;
  if (!/^[a-zA-Z0-9_.\/-]+$/.test(skillPath) || skillPath.split("/").some((p) => !p || p === "." || p === "..") || !/^[a-zA-Z0-9_-]+$/.test(skill.dir)) {
    throw new Error("Invalid skill path");
  }
  const shellQuote = (value: string) => /^[a-zA-Z0-9_.\/-]+$/.test(value) ? value : `'${value.replaceAll("'", "'\\''")}'`;
  const target = `${agent.globalDir}/${skill.dir}`;

  return {
    command: `npx skills add ${repo} --skill ${shellQuote(skill.name)} -g -a ${agent.cliId}`,
    manual: [
      "(",
      '  skill_checkout=$(mktemp -d) &&',
      `  git clone --depth 1 https://github.com/${repo}.git "$skill_checkout" &&`,
      `  mkdir -p ${target} &&`,
      `  cp -R "$skill_checkout/${skillPath}/." ${target}`,
      ")",
    ].join("\n"),
    plugin:
      agentId === "claude-code" && skill.source === "anthropic" && skill.plugin
        ? `/plugin marketplace add ${repo}\n/plugin install ${skill.plugin}@${ANTHROPIC_MARKETPLACE}`
        : null,
  };
}
