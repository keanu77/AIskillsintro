"use client";

import { CATEGORIES } from "@/data/categories";
import { SOURCES } from "@/data/sources";
import type { AgentId, CategoryId, SourceId } from "@/data/types";
import type { CatalogFilters } from "@/lib/catalogFilter";
import { AGENTS } from "@/lib/installCommands";

interface LegendProps {
  filters: CatalogFilters;
  counts: Record<CategoryId, number>;
  onChange: (next: CatalogFilters) => void;
}

const pill = (active: boolean) =>
  `inline-flex min-h-11 items-center gap-2 px-3 text-sm transition ${
    active ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-ink/5"
  }`;

const small = (active: boolean) => `${pill(active)} !min-h-9 !px-2.5 font-mono !text-xs`;

/** Group legend doubling as the category filter, plus source and platform filters. */
export default function Legend({ filters, counts, onChange }: LegendProps) {
  const sources: { id: SourceId | null; label: string }[] = [
    { id: null, label: "全部來源" },
    ...SOURCES.map((s) => ({ id: s.id, label: s.label })),
  ];
  const agents: { id: AgentId | null; label: string }[] = [
    { id: null, label: "全部平台" },
    ...AGENTS.map((a) => ({ id: a.id, label: a.label })),
  ];

  return (
    <div id="groups" className="flex scroll-mt-4 flex-col gap-3">
      <div role="group" aria-label="依族篩選" className="-ml-3 flex flex-wrap gap-1">
        {CATEGORIES.map((c) => {
          const active = filters.category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange({ ...filters, category: active ? null : c.id })}
              className={pill(active)}
            >
              <span aria-hidden className="h-3.5 w-3.5 outline outline-1 outline-ink/30" style={{ backgroundColor: c.color }} />
              <span>{c.shortLabel}</span>
              <span className={`font-mono text-xs ${active ? "text-paper/80" : "text-ink-muted"}`}>{counts[c.id]}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <div role="group" aria-label="依來源篩選" className="-ml-2.5 flex flex-wrap items-center gap-1">
          {sources.map((o) => (
            <button key={o.label} type="button" aria-pressed={filters.source === o.id} onClick={() => onChange({ ...filters, source: o.id })} className={small(filters.source === o.id)}>
              {o.label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="依平台篩選（來源文件宣告支援）" className="flex flex-wrap items-center gap-1">
          {agents.map((o) => (
            <button key={o.label} type="button" aria-pressed={filters.agent === o.id} onClick={() => onChange({ ...filters, agent: o.id })} className={small(filters.agent === o.id)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <p className="font-mono text-xs text-ink-muted">平台依來源文件宣告篩選；實際效果仍須依任務確認。</p>
    </div>
  );
}
