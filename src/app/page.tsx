"use client";

import CatalogHero from "@/components/catalog/CatalogHero";
import CategorySection from "@/components/catalog/CategorySection";
import FilterBar from "@/components/catalog/FilterBar";
import SearchResults from "@/components/catalog/SearchResults";
import SourceLinks from "@/components/catalog/SourceLinks";
import { useCatalogState } from "@/components/catalog/useCatalogState";
import Footer from "@/components/shared/Footer";
import { CATEGORIES, SKILLS, getSkillsByCategory } from "@/data/skills";
import { filterSkills, hasActiveFilters } from "@/lib/catalogFilter";

export default function Home() {
  const { filters, setFilters, open, toggle, jumpTo } = useCatalogState();
  const filtering = hasActiveFilters(filters);

  return (
    <>
      <CatalogHero
        query={filters.query}
        onQueryChange={(query) => setFilters({ ...filters, query })}
        onCategoryJump={jumpTo}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <SourceLinks />
        <FilterBar filters={filters} onChange={setFilters} />
        {filtering ? (
          <SearchResults skills={filterSkills(SKILLS, filters)} query={filters.query} />
        ) : (
          CATEGORIES.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              skills={getSkillsByCategory(category.id)}
              open={open.has(category.id)}
              onToggle={() => toggle(category.id)}
            />
          ))
        )}
      </main>

      <Footer title="AI Skills Catalog" />
    </>
  );
}
