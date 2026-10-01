import type { Skill } from "@/data/skills";
import SkillCard from "./SkillCard";

interface SearchResultsProps {
  skills: Skill[];
  query: string;
}

export default function SearchResults({ skills, query }: SearchResultsProps) {
  const trimmed = query.trim();

  return (
    <section aria-labelledby="results-heading" className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <h2 id="results-heading" className="sr-only">
          搜尋結果
        </h2>
        <p aria-live="polite" className="mb-8 text-sm text-slate-600">
          找到 <span className="font-semibold text-slate-800">{skills.length}</span> 個
          {trimmed && (
            <>
              符合「<span className="font-semibold text-blue-700">{trimmed}</span>」
            </>
          )}
          的 Skill
        </p>
        {skills.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skills.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div aria-hidden className="mb-4 text-5xl">🔍</div>
            <p className="text-lg text-slate-600">找不到符合的 Skill</p>
            <p className="mt-2 text-sm text-slate-500">試試其他關鍵字，或清除篩選條件</p>
          </div>
        )}
      </div>
    </section>
  );
}
