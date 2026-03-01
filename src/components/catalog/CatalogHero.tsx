"use client";

import { useState } from "react";
import { SKILLS, CATEGORIES } from "@/data/skills";

interface CatalogHeroProps {
  onSearch?: (query: string) => void;
}

export default function CatalogHero({ onSearch }: CatalogHeroProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-6 py-24 sm:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl animate-float delay-300" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300 glass-dark animate-fade-in-up">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {SKILLS.length} Skills &middot; {CATEGORIES.length} Categories
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up delay-100 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl opacity-0">
          <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            AI Skills
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Catalog
          </span>
        </h1>

        <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300/90 opacity-0">
          Claude Code / Gemini CLI 技能目錄 — 已安裝{" "}
          <span className="font-semibold text-blue-300">{SKILLS.length}</span>{" "}
          個 AI Skills，涵蓋資料庫存取、生物資訊、資料科學、學術寫作等領域。
        </p>

        {/* Search bar */}
        <div className="animate-fade-in-up delay-300 mt-10 mx-auto max-w-xl opacity-0">
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur transition group-focus-within:opacity-40" />
            <div className="relative flex items-center rounded-2xl bg-white/10 ring-1 ring-white/20 transition focus-within:bg-white/15 focus-within:ring-blue-400/50">
              <svg
                className="ml-4 h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="搜尋 Skills..."
                className="w-full bg-transparent px-4 py-4 text-base text-white placeholder:text-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    onSearch?.("");
                  }}
                  className="mr-4 rounded-lg p-1 text-slate-400 transition hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 opacity-0">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-all hover:bg-white/10 hover:text-blue-300"
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
