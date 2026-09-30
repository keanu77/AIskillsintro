import type { Skill } from "@/data/skills";
import { getCategoryById } from "@/data/skills";
import { getSource, repoUrl, skillFileUrl } from "@/data/sources";

interface SkillDetailHeroProps {
  skill: Skill;
}

export default function SkillDetailHero({ skill }: SkillDetailHeroProps) {
  const category = getCategoryById(skill.category);
  const source = getSource(skill.upstream.source);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-6 py-24 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/8 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-500/8 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Source badge */}
        <div>
          <a
            href={repoUrl(source.repo)}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-200 glass-dark transition hover:border-blue-300/40 hover:text-white"
          >
            <span aria-hidden>{source.icon}</span>
            來源：{source.label}
          </a>
        </div>

        {/* Icon */}
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 text-6xl shadow-lg ring-1 ring-white/10">
          {skill.icon}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {skill.name}
        </h1>

        {/* Category */}
        {category && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-slate-300 ring-1 ring-white/10">
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </div>
        )}

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300/90">
          {skill.description}
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#installation"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:brightness-110"
          >
            安裝方式
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
          <a
            href={skillFileUrl(source.repo, source.sha, skill.upstream.dir)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-slate-200 ring-1 ring-white/20 transition hover:bg-white/10 hover:text-white"
          >
            原始 SKILL.md
          </a>
        </div>
      </div>
    </section>
  );
}
