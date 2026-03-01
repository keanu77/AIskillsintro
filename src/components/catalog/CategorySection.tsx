import type { Category, Skill } from "@/data/skills";
import SkillCard from "./SkillCard";

interface CategorySectionProps {
  category: Category;
  skills: Skill[];
}

export default function CategorySection({
  category,
  skills,
}: CategorySectionProps) {
  if (skills.length === 0) return null;

  return (
    <section id={category.id} className="scroll-mt-4 px-6 py-14 first:pt-16">
      <div className="mx-auto max-w-7xl">
        {/* Category header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 text-3xl shadow-sm ring-1 ring-slate-200/50">
            {category.icon}
          </div>
          <div>
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
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
