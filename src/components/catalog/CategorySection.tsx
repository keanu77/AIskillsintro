import type { Category, Skill } from "@/data/skills";
import SkillCard from "./SkillCard";

interface CategorySectionProps {
  category: Category;
  skills: Skill[];
}

export default function CategorySection({ category, skills }: CategorySectionProps) {
  return (
    <section className="px-6 py-12 first:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {category.label}
            </h2>
            <p className="mt-1 text-slate-600">{category.description}</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
