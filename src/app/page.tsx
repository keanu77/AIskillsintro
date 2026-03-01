import CatalogHero from "@/components/catalog/CatalogHero";
import CategorySection from "@/components/catalog/CategorySection";
import { CATEGORIES, getSkillsByCategory } from "@/data/skills";

export default function Home() {
  return (
    <>
      <CatalogHero />
      <div className="bg-slate-50">
        {CATEGORIES.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            skills={getSkillsByCategory(category.id)}
          />
        ))}
      </div>
      {/* Minimal catalog footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm text-slate-500">
            AI Skills Catalog — Built as{" "}
            <span className="font-medium text-slate-700">Claude Code / Gemini CLI Skills</span>
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Made with AI-assisted development
          </p>
        </div>
      </footer>
    </>
  );
}
