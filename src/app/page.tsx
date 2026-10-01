"use client";

import { useMemo, useState } from "react";
import ElementTile from "@/components/periodic/ElementTile";
import Legend from "@/components/periodic/Legend";
import PreviewPanel from "@/components/periodic/PreviewPanel";
import SiteHeader from "@/components/periodic/SiteHeader";
import { useCatalogFilters } from "@/components/periodic/useCatalogFilters";
import Footer from "@/components/shared/Footer";
import { CATEGORIES, SKILLS } from "@/data/skills";
import type { CategoryId } from "@/data/types";
import { EMPTY_FILTERS, filterSkills, hasActiveFilters } from "@/lib/catalogFilter";
import { buildElements, type SkillElement } from "@/lib/elements";

const ELEMENTS = buildElements(SKILLS, CATEGORIES);
const COUNTS = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, SKILLS.filter((s) => s.category === c.id).length]),
) as Record<CategoryId, number>;

export default function Home() {
  const { filters, setFilters } = useCatalogFilters();
  const [preview, setPreview] = useState<SkillElement | null>(null);

  const filtering = hasActiveFilters(filters);
  const matches = useMemo(
    () => new Set(filterSkills(SKILLS, filters).map((s) => s.slug)),
    [filters],
  );

  return (
    <>
      <SiteHeader>
        <nav aria-label="主選單" className="flex gap-7 text-[15px]">
          <a href="#groups" className="hover:text-accent">九大族</a>
          <a href="#table" className="hover:text-accent">元素表</a>
        </nav>
      </SiteHeader>

      <main>
        <section className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-10 px-5 pt-10 pb-8 sm:px-10 sm:pt-12">
          <div className="min-w-0 flex-[1_1_520px]">
            <h1 className="font-wider text-[clamp(48px,7vw,92px)] font-black leading-none tracking-[-0.02em]">
              Agent Skills
              <span className="mt-2 block font-sans tracking-normal">週期表</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-ink-soft">
              {SKILLS.length} 個元素、{CATEGORIES.length} 個族。點一格就能看用途，並取得 Claude Code、Codex、Gemini CLI、Cursor、Grok 的安裝指令。
            </p>
          </div>
          <form role="search" onSubmit={(e) => e.preventDefault()} className="flex min-w-0 flex-[0_1_380px] flex-col gap-2">
            <label htmlFor="q" className="font-mono text-xs tracking-widest text-ink-muted">
              搜尋元素
            </label>
            <input
              id="q"
              type="search"
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              placeholder="例如：單細胞、PDF、蛋白質"
              className="h-14 min-w-0 border-2 border-ink bg-white px-4 text-base text-ink placeholder:text-ink-muted"
            />
          </form>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 pb-5 sm:px-10">
          <Legend filters={filters} counts={COUNTS} onChange={setFilters} />
        </section>

        <section id="table" aria-labelledby="table-heading" className="mx-auto max-w-[1240px] scroll-mt-4 px-5 pb-20 sm:px-10">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="table-heading" className="font-wide text-xl font-black">元素表</h2>
            <p aria-live="polite" className="font-mono text-xs text-ink-muted">
              {filtering ? `符合 ${matches.size} / ${SKILLS.length}` : `${SKILLS.length} 個元素`}
            </p>
          </div>
          <div className="flex items-start gap-8">
            <ol className="grid min-w-0 flex-1 grid-cols-[repeat(auto-fill,minmax(62px,1fr))] gap-1">
              {ELEMENTS.map((el) => {
                const dimmed = filtering && !matches.has(el.skill.slug);
                return (
                  // Non-matching tiles stay visible for context but leave the a11y tree.
                  <li key={el.skill.slug} aria-hidden={dimmed || undefined}>
                    <ElementTile element={el} dimmed={dimmed} onPreview={setPreview} />
                  </li>
                );
              })}
            </ol>
            <aside aria-label="元素預覽" className="sticky top-6 hidden w-[340px] flex-none lg:block">
              <PreviewPanel element={preview} />
            </aside>
          </div>
          {filtering && matches.size === 0 && (
            <p className="mt-6 text-ink-soft">
              沒有符合的元素。
              <button type="button" onClick={() => setFilters(EMPTY_FILTERS)} className="font-bold text-accent underline">
                清除篩選
              </button>
            </p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
