import type { Category } from "@/data/types";

interface FamilyNavProps {
  families: { category: Category; count: number }[];
}

/** Sticky row of family shortcuts; each jumps to that family's heading (#family-<id>). */
export default function FamilyNav({ families }: FamilyNavProps) {
  return (
    <nav aria-label="跳到族" className="sticky top-0 z-10 -mx-5 mb-4 bg-paper px-5 py-2 sm:-mx-10 sm:px-10">
      <ul className="flex gap-2 overflow-x-auto pb-1">
        {families.map(({ category, count }) => (
          <li key={category.id} className="flex-none">
            <a
              href={`#family-${category.id}`}
              className="flex min-h-9 items-center gap-1.5 border border-ink/30 bg-white px-2.5 text-xs whitespace-nowrap hover:border-ink"
            >
              <span aria-hidden className="size-2.5 flex-none border border-ink/40" style={{ backgroundColor: category.color }} />
              {category.shortLabel}
              <span className="font-mono text-ink-muted">{count}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
