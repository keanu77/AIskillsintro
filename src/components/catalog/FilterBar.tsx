"use client";

import { CATEGORIES } from "@/data/categories";
import { SOURCES } from "@/data/sources";
import type { AgentId, CategoryId, SourceId } from "@/data/types";
import { AGENTS } from "@/lib/installCommands";
import { EMPTY_FILTERS, hasActiveFilters, type CatalogFilters } from "@/lib/catalogFilter";

interface FilterBarProps {
  filters: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
}

const chip = (active: boolean) =>
  `rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
    active
      ? "bg-blue-600 text-white shadow-sm"
      : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900"
  }`;

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const sourceOptions: { id: SourceId | null; label: string }[] = [
    { id: null, label: "全部來源" },
    ...SOURCES.map((s) => ({ id: s.id, label: s.label })),
  ];

  return (
    <div className="border-b border-slate-200/80 bg-white/80 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
        <div role="group" aria-label="依來源篩選" className="flex flex-wrap gap-2">
          {sourceOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={filters.source === option.id}
              onClick={() => onChange({ ...filters, source: option.id })}
              className={chip(filters.source === option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <span>分類</span>
          <select
            value={filters.category ?? ""}
            onChange={(e) =>
              onChange({ ...filters, category: (e.target.value || null) as CategoryId | null })
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">全部分類</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <span>平台</span>
          <select
            aria-label="平台（來源文件宣告支援）"
            value={filters.agent ?? ""}
            onChange={(e) => onChange({ ...filters, agent: (e.target.value || null) as AgentId | null })}
            className="max-w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800"
          >
            <option value="">全部平台</option>
            {AGENTS.map((agent) => <option key={agent.id} value={agent.id}>{agent.label}</option>)}
          </select>
        </label>
        <span className="text-xs text-slate-500">依來源文件宣告篩選；實際效果仍須依任務確認。</span>

        {hasActiveFilters(filters) && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            清除篩選
          </button>
        )}
      </div>
    </div>
  );
}
