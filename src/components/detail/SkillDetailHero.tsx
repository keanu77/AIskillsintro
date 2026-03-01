import type { Skill } from "@/data/skills";
import { getCategoryById } from "@/data/skills";

interface SkillDetailHeroProps {
  skill: Skill;
}

export default function SkillDetailHero({ skill }: SkillDetailHeroProps) {
  const category = getCategoryById(skill.category);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-6 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
          <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Installed
        </div>
        <div className="mb-4 text-6xl">{skill.icon}</div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {skill.name}
        </h1>
        {category && (
          <p className="mt-3 text-sm text-slate-400">
            {category.icon} {category.label}
          </p>
        )}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          {skill.description}
        </p>
        <div className="mt-10">
          <a
            href="#installation"
            className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
          >
            安裝方式
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
