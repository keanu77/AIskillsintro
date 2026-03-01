"use client";

import { useState } from "react";
import CatalogHero from "@/components/catalog/CatalogHero";
import CategorySection from "@/components/catalog/CategorySection";
import SkillCard from "@/components/catalog/SkillCard";
import { CATEGORIES, SKILLS, getSkillsByCategory } from "@/data/skills";
import type { Skill } from "@/data/skills";

function filterSkills(skills: Skill[], query: string): Skill[] {
  if (!query.trim()) return skills;
  const q = query.toLowerCase();
  return skills.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.slug.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q),
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = filterSkills(SKILLS, searchQuery);
  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <CatalogHero onSearch={setSearchQuery} />

      {/* 下載來源 */}
      <section className="border-b border-slate-200/80 bg-white px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Skills 來源
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Anthropic 官方 */}
            <a
              href="https://github.com/anthropics/skills"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 text-xl shadow-sm">
                ⭐
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    Anthropic Official Skills
                  </p>
                  <svg
                    className="h-4 w-4 text-slate-400 transition group-hover:text-blue-500 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  anthropics/skills — 官方 16 個文件處理與設計 Skills
                </p>
                <p className="mt-1.5 font-mono text-xs text-slate-400">
                  github.com/anthropics/skills
                </p>
              </div>
            </a>

            {/* K-Dense Scientific Skills */}
            <a
              href="https://github.com/anthropics/claude-scientific-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 text-xl shadow-sm">
                🔬
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    Claude Scientific Skills
                  </p>
                  <svg
                    className="h-4 w-4 text-slate-400 transition group-hover:text-blue-500 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  anthropics/claude-scientific-skills — 143 個科學研究與資料分析
                  Skills
                </p>
                <p className="mt-1.5 font-mono text-xs text-slate-400">
                  github.com/anthropics/claude-scientific-skills
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {isSearching ? (
          <section className="px-6 py-14">
            <div className="mx-auto max-w-7xl">
              <p className="mb-8 text-sm text-slate-500">
                找到{" "}
                <span className="font-semibold text-slate-700">
                  {filtered.length}
                </span>{" "}
                個符合「
                <span className="font-semibold text-blue-600">
                  {searchQuery}
                </span>
                」的 Skill
              </p>
              {filtered.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((skill) => (
                    <SkillCard key={skill.slug} skill={skill} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="text-lg text-slate-400">找不到符合的 Skill</p>
                  <p className="mt-2 text-sm text-slate-400">試試其他關鍵字</p>
                </div>
              )}
            </div>
          </section>
        ) : (
          CATEGORIES.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              skills={getSkillsByCategory(category.id)}
            />
          ))
        )}
      </div>

      <footer className="border-t border-slate-200/80 bg-white px-6 py-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm text-slate-500">
            AI Skills Catalog — Built for{" "}
            <span className="font-medium text-slate-700">
              Claude Code / Gemini CLI
            </span>
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Made with AI-assisted development
          </p>
        </div>
      </footer>
    </>
  );
}
