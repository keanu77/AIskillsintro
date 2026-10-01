import Link from "next/link";
import type { Skill } from "@/data/skills";
import { getSource, declaredAgents } from "@/data/sources";
import { AGENTS } from "@/lib/installCommands";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const source = getSource(skill.upstream.source);
  const supported = declaredAgents(skill.upstream);
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="card-glow group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-300/50 hover:shadow-xl hover:shadow-blue-100/50"
    >
      {/* Icon with gradient background */}
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 text-2xl shadow-sm ring-1 ring-slate-200/50 transition group-hover:from-blue-50 group-hover:to-indigo-50 group-hover:ring-blue-200/50">
        {skill.icon}
      </div>

      <h3 className="text-base font-semibold text-slate-900 transition group-hover:text-blue-600 leading-snug">
        {skill.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
        {skill.description}
      </p>
      <div className="mt-4 border-t border-slate-100 pt-3 text-xs leading-6 text-slate-500">
        <p className="font-medium text-slate-700">{source.label}</p>
        <p>{supported.length > 0 ? AGENTS.filter((a) => supported.includes(a.id)).map((a) => a.label).join(" · ") : "平台相容性待確認"}</p>
      </div>

      {/* Bottom action */}
      <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-all duration-300 group-hover:translate-x-1">
        查看詳情
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}
