"use client";

import { useState } from "react";
import type { SourceId, UpstreamSkill } from "@/data/types";
import { AGENTS, buildInstallGuide, type AgentId } from "@/lib/installCommands";
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
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-slate-200">{code}</pre>
    </div>
  );
}

export default function Installation({ skill, repos }: InstallationProps) {
  const [agentId, setAgentId] = useState<AgentId>("claude-code");
  const guide = buildInstallGuide(skill, agentId, repos);

  return (
    <section id="installation" className="relative scroll-mt-4 bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-20 sm:py-24">
      <div className="absolute inset-0 grid-pattern" />
      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">安裝教學</h2>
          <p className="mt-4 text-lg text-slate-400">選擇你使用的 AI coding agent，複製指令到終端機執行</p>
        </div>

        <div role="tablist" aria-label="選擇 AI agent" className="mt-12 flex flex-wrap gap-1">
          {AGENTS.map((agent) => {
            const selected = agent.id === agentId;
            return (
              <button
                key={agent.id}
                type="button"
                role="tab"
                aria-selected={selected}
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

        <div id="install-panel" role="tabpanel" className="space-y-5 rounded-b-2xl rounded-tr-2xl bg-slate-800/40 p-5 ring-1 ring-white/5">
          <CodeBlock title="一鍵安裝（需要 Node.js）" code={guide.command} />

          {guide.plugin && (
            <CodeBlock title="或在 Claude Code 中以 plugin 安裝" code={guide.plugin} />
          )}

          <details className="group rounded-2xl bg-slate-800/60 ring-1 ring-white/5">
            <summary className="cursor-pointer select-none px-5 py-3 text-sm font-medium text-slate-300 hover:text-white">
              手動安裝（不使用 npx）
            </summary>
            <div className="px-5 pb-5">
              <CodeBlock title="clone 後複製到 skills 目錄" code={guide.manual} />
            </div>
          </details>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Skills 會以 agent 的完整權限執行，安裝前請先閱讀原始 SKILL.md。安裝後重新啟動 agent 即可使用。
        </p>
      </div>
    </section>
  );
}
