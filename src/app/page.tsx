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

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {isSearching ? (
          <section className="px-6 py-14">
            <div className="mx-auto max-w-7xl">
              <p className="mb-8 text-sm text-slate-500">
                找到{" "}
                <span className="font-semibold text-slate-700">{filtered.length}</span>{" "}
                個符合「
                <span className="font-semibold text-blue-600">{searchQuery}</span>
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
            <span className="font-medium text-slate-700">Claude Code / Gemini CLI</span>
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Made with AI-assisted development
          </p>
        </div>
      </footer>
    </>
  );
}
