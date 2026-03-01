"use client";

import { useState } from "react";
import type { Category, Skill } from "@/data/skills";
import SkillCard from "./SkillCard";

interface CategorySectionProps {
  category: Category;
  skills: Skill[];
  defaultOpen?: boolean;
}

export default function CategorySection({
  category,
  skills,
  defaultOpen = false,
}: CategorySectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (skills.length === 0) return null;

  return (
    <section id={category.id} className="scroll-mt-4 px-6 py-4 first:pt-10">
      <div className="mx-auto max-w-7xl">
        {/* Clickable header */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="group flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-colors hover:bg-slate-100/80"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 text-3xl shadow-sm ring-1 ring-slate-200/50">
            {category.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {category.label}
              </h2>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {skills.length}
              </span>
            </div>
            <p className="mt-1 text-slate-500">{category.description}</p>
          </div>
          {/* Chevron */}
          <svg
            className={`h-6 w-6 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Collapsible cards grid */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            open
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-6">
              {skills.map((skill) => (
                <SkillCard key={skill.slug} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
