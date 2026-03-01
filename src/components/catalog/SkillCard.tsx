import Link from "next/link";
import type { Skill } from "@/data/skills";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50"
    >
      <span className="text-3xl">{skill.icon}</span>

      <h3 className="mt-3 text-base font-semibold text-slate-900 group-hover:text-blue-600 transition leading-snug">
        {skill.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
        {skill.description}
      </p>

      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-500 opacity-0 transition group-hover:opacity-100">
        查看詳情
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}
