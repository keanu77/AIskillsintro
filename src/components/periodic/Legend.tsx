"use client";

import { CATEGORIES } from "@/data/categories";
import { SOURCES } from "@/data/sources";
import type { CategoryId, SourceId } from "@/data/types";
import type { CatalogFilters } from "@/lib/catalogFilter";

interface LegendProps {
  filters: CatalogFilters;
  counts: Record<CategoryId, number>;
  onChange: (next: CatalogFilters) => void;
}

const pill = (active: boolean) =>
  `inline-flex min-h-11 items-center gap-2 px-3 text-sm transition ${
    active ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-ink/5"
  }`;

/** Group legend doubling as the category filter, plus the source filter. */
export default function Legend({ filters, counts, onChange }: LegendProps) {
  const sourceOptions: { id: SourceId | null; label: string }[] = [
    { id: null, label: "全部來源" },
    ...SOURCES.map((s) => ({ id: s.id, label: s.id === "anthropic" ? "Anthropic" : "K-Dense" })),
  ];

  return (
    <div id="groups" className="flex scroll-mt-4 flex-col gap-3">
      <div role="group" aria-label="依族篩選" className="flex flex-wrap gap-x-1 gap-y-1">
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
      <div role="group" aria-label="依來源篩選" className="flex flex-wrap items-center gap-1 font-mono text-xs">
        {sourceOptions.map((o) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={filters.source === o.id}
            onClick={() => onChange({ ...filters, source: o.id })}
            className={`${pill(filters.source === o.id)} !min-h-9 !text-xs`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
