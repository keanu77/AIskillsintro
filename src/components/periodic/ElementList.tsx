import Link from "next/link";
import { getSource } from "@/data/sources";
import { formatNumber, type SkillElement } from "@/lib/elements";

/** List view of one family: a small element marker, the full name and the zh summary. */
export default function ElementList({ elements }: { elements: SkillElement[] }) {
  return (
    <ol className="grid gap-2 lg:grid-cols-2">
      {elements.map(({ skill, category, number, symbol }) => (
        <li key={skill.slug}>
          <Link
            href={`/skills/${skill.slug}`}
            className="flex h-full items-start gap-4 border-2 border-ink bg-white p-3 transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_#121212]"
          >
            <span aria-hidden className="flex size-14 flex-none flex-col justify-between p-1.5" style={{ backgroundColor: category.color }}>
              <span className="font-mono text-[10px] leading-none">{formatNumber(number)}</span>
              <span className="font-display text-xl font-extrabold leading-none">{symbol}</span>
            </span>
            <span className="min-w-0">
              <span className="block font-bold leading-snug break-words">{skill.name}</span>
              <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-soft">{skill.description}</span>
              <span className="mt-1 block font-mono text-xs text-ink-muted">{getSource(skill.upstream.source).label}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
