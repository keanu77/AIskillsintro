"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { SourceId, UpstreamSkill } from "@/data/types";
import { AGENTS, buildInstallGuide, type AgentId } from "@/lib/installCommands";
import { declaredAgents } from "@/data/sources";
import CopyButton from "./CopyButton";

interface InstallationProps {
  skill: UpstreamSkill;
  repos: Record<SourceId, string>;
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="border border-white/30">
      <div className="flex items-center justify-between gap-3 border-b border-white/20 px-4 py-2.5">
        <span className="text-sm text-paper/85">{title}</span>
        <CopyButton text={code} />
      </div>
      <pre tabIndex={0} aria-label={title} className="whitespace-pre-wrap break-all p-4 font-mono text-sm leading-7 text-paper">
        {code}
      </pre>
    </div>
  );
}

export default function Installation({ skill, repos }: InstallationProps) {
  const supported = declaredAgents(skill);
  // Open on a platform the source documents, so the first command shown is a supported one.
  const [agentId, setAgentId] = useState<AgentId>(supported[0] ?? "claude-code");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const guide = buildInstallGuide(skill, agentId, repos);

  // Arrow/Home/End move between tabs (WAI-ARIA tabs pattern).
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = AGENTS.findIndex((a) => a.id === agentId);
    const last = AGENTS.length - 1;
    const target =
      e.key === "ArrowRight" ? (current + 1) % AGENTS.length
      : e.key === "ArrowLeft" ? (current - 1 + AGENTS.length) % AGENTS.length
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    setAgentId(AGENTS[target].id);
    tabRefs.current[target]?.focus();
  };

  return (
    <section id="installation" aria-labelledby="install-heading" className="scroll-mt-4 bg-ink p-5 text-paper sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="install-heading" className="font-wide text-[28px] font-black">安裝</h2>
        <div role="tablist" aria-label="選擇 AI agent" onKeyDown={handleKeyDown} className="flex flex-wrap gap-1.5">
          {AGENTS.map((agent, index) => {
            const selected = agent.id === agentId;
            const declared = supported.includes(agent.id);
            return (
              <button
                key={agent.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={`tab-${agent.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                aria-controls="install-panel"
                onClick={() => setAgentId(agent.id)}
                className={`inline-flex min-h-11 items-center gap-2 px-4 text-sm transition ${
                  selected ? "bg-paper font-bold text-ink" : "border border-white/40 text-paper hover:bg-white/10"
                }`}
              >
                {/* Filled dot = the source documents this platform; text equivalent below. */}
                <span aria-hidden className={`h-2 w-2 rounded-full ${declared ? "bg-current" : "border border-current"}`} />
                {agent.label}
                {declared && <span className="sr-only">（來源宣告支援）</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div id="install-panel" role="tabpanel" aria-labelledby={`tab-${agentId}`} className="mt-5 space-y-4">
        <p className="text-sm leading-7 text-paper/85">
          {supported.includes(agentId)
            ? "來源文件宣告支援此平台；本站尚未進行安裝與任務實測。"
            : "尚未確認此 skill 在此平台的相容性。以下若有指令，僅為通用安裝範本。"}
        </p>
        {guide.notice && <p className="border-l-4 border-paper/60 pl-3 text-sm leading-7 text-paper">{guide.notice}</p>}
        {guide.command && <CodeBlock title="安裝指令（需要 Node.js）" code={guide.command} />}
        {guide.plugin && (
          <CodeBlock
            title={skill.installMode === "plugin" ? "在 Codex 開啟 Plugins" : "或在 Claude Code 中以 plugin 安裝"}
            code={guide.plugin}
          />
        )}
        {guide.manual && (
          <details className="border border-white/30">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm text-paper/85 hover:text-paper">手動安裝（不使用 npx）</summary>
            <div className="px-4 pb-4">
              <CodeBlock title="clone 後複製到 skills 目錄" code={guide.manual} />
            </div>
          </details>
        )}
      </div>

      <p className="mt-4 text-sm text-paper/75">
        實心圓點表示來源文件宣告支援該平台。安裝會取得來源的當前版本，可能與本站收錄版本不同；請先閱讀原始文件，確認執行權限與依賴需求。
      </p>
    </section>
  );
}
