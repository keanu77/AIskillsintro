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
    <div className="overflow-hidden rounded-2xl bg-slate-800/80 ring-1 ring-white/5">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
        <span className="text-sm font-medium text-slate-300">{title}</span>
        <CopyButton text={code} />
      </div>
      <pre tabIndex={0} aria-label={title} className="overflow-x-auto p-5 font-mono text-sm leading-7 text-slate-200">{code}</pre>
    </div>
  );
}

export default function Installation({ skill, repos }: InstallationProps) {
  const supported = declaredAgents(skill);
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
    <section id="installation" className="relative scroll-mt-4 bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-20 sm:py-24">
      <div aria-hidden className="absolute inset-0 grid-pattern" />
      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">安裝教學</h2>
          <p className="mt-4 text-lg text-slate-400">選擇你使用的 AI coding agent，複製指令到終端機執行</p>
        </div>

        <div role="tablist" aria-label="選擇 AI agent" onKeyDown={handleKeyDown} className="mt-12 flex flex-wrap gap-1">
          {AGENTS.map((agent, index) => {
            const selected = agent.id === agentId;
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
                className={`rounded-t-xl px-5 py-3 text-sm font-semibold transition-all ${
                  selected
                    ? "bg-slate-800/80 text-white shadow-inner"
                    : "bg-slate-800/30 text-slate-400 hover:bg-slate-800/50 hover:text-slate-300"
                }`}
              >
                {agent.label}
              </button>
            );
          })}
        </div>

        <div id="install-panel" role="tabpanel" aria-labelledby={`tab-${agentId}`} className="space-y-5 rounded-b-2xl rounded-tr-2xl bg-slate-800/40 p-5 ring-1 ring-white/5">
          <p className="text-sm leading-7 text-slate-300">
            {supported.includes(agentId) ? "來源文件宣告支援此平台；本站尚未進行安裝與任務實測。" : "尚未確認此 skill 在此平台的相容性。以下若有指令，僅為通用安裝範本。"}
          </p>
          {guide.notice && <p className="text-sm leading-7 text-blue-200">{guide.notice}</p>}
          {guide.command && <CodeBlock title="安裝指令（需要 Node.js）" code={guide.command} />}

          {guide.plugin && (
            <CodeBlock title={skill.installMode === "plugin" ? "在 Codex 開啟 Plugins" : "或在 Claude Code 中以 plugin 安裝"} code={guide.plugin} />
          )}

          {guide.manual && <details className="group rounded-2xl bg-slate-800/60 ring-1 ring-white/5">
            <summary className="cursor-pointer select-none px-5 py-3 text-sm font-medium text-slate-300 hover:text-white">
              手動安裝（不使用 npx）
            </summary>
            <div className="px-5 pb-5">
              <CodeBlock title="clone 後複製到 skills 目錄" code={guide.manual} />
            </div>
          </details>}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          安裝會取得來源的當前版本，可能與本站收錄版本不同。請先閱讀原始文件，確認執行權限與依賴需求。
        </p>
      </div>
    </section>
  );
}
