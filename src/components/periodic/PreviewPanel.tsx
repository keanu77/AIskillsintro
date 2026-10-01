"use client";

import Link from "next/link";
import { SOURCES, declaredAgents, getSource } from "@/data/sources";
import type { SourceId } from "@/data/types";
import { formatNumber, type SkillElement } from "@/lib/elements";
import { AGENTS, buildInstallGuide } from "@/lib/installCommands";
import CopyButton from "@/components/shared/CopyButton";

const REPOS = Object.fromEntries(SOURCES.map((s) => [s.id, s.repo])) as Record<SourceId, string>;

/** Desktop side panel describing the hovered/focused element. */
export default function PreviewPanel({ element }: { element: SkillElement | null }) {
  if (!element) {
    return (
      <div className="border-2 border-dashed border-ink/40 p-6 text-sm leading-relaxed text-ink-muted">
        將游標移到元素上，或用 Tab 鍵瀏覽，這裡會顯示用途與安裝指令。點一下元素開啟完整說明。
      </div>
    );
  }

  const { skill, category, number, symbol } = element;
  const supported = declaredAgents(skill.upstream);
  // Preview the first platform the source documents; plugin skills have no CLI command.
  const agent = AGENTS.find((a) => a.id === (supported[0] ?? "claude-code"))!;
  const guide = buildInstallGuide(skill.upstream, agent.id, REPOS);

  return (
    <div className="border-2 border-ink bg-white">
      <div className="flex gap-4 p-5">
        <div aria-hidden className="flex h-[112px] w-[100px] flex-none flex-col justify-between p-2.5" style={{ backgroundColor: category.color }}>
          <span className="font-mono text-xs">{formatNumber(number)}</span>
          <span className="font-display text-[44px] font-extrabold leading-none">{symbol}</span>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-xs tracking-wider text-ink-muted">
            {category.shortLabel} · {getSource(skill.upstream.source).label}
          </p>
          <p className="font-wide mt-1 text-2xl font-black leading-tight break-words">{skill.name}</p>
        </div>
      </div>
      <p className="px-5 text-[15px] leading-relaxed text-ink-soft">{skill.description}</p>
      <p className="px-5 pt-3 font-mono text-xs text-ink-muted">
        宣告支援：{supported.length > 0 ? AGENTS.filter((a) => supported.includes(a.id)).map((a) => a.label).join(" · ") : "待確認"}
      </p>
      {guide.command ? (
        <>
          <div className="mx-5 mt-3 flex items-center gap-2 bg-ink p-3 text-paper">
            <code tabIndex={0} className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs">{guide.command}</code>
            <CopyButton text={guide.command} />
          </div>
          <p className="px-5 pt-2 text-xs text-ink-muted">以 {agent.label} 為例，其他平台的指令在說明頁。</p>
        </>
      ) : (
        guide.notice && <p className="mx-5 mt-3 border-l-4 border-ink pl-3 text-sm leading-relaxed text-ink-soft">{guide.notice}</p>
      )}
      <Link href={`/skills/${skill.slug}`} className="m-5 inline-block font-bold text-accent hover:text-accent-strong">
        查看完整說明 →
      </Link>
    </div>
  );
}
