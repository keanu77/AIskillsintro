import ElementTile from "@/components/periodic/ElementTile";
import type { SkillElement } from "@/lib/elements";

/** Neighbouring elements in the same group (up to 3 on each side). */
export default function FamilyRow({ element, all }: { element: SkillElement; all: SkillElement[] }) {
  const group = all.filter((e) => e.category.id === element.category.id);
  const index = group.findIndex((e) => e.number === element.number);
  const neighbours = [...group.slice(Math.max(0, index - 3), index), ...group.slice(index + 1, index + 4)];
  if (neighbours.length === 0) return null;

  return (
    <section aria-labelledby="family-heading">
      <h2 id="family-heading" className="font-wide mb-4 text-2xl font-black">
        同族元素 <span className="font-sans text-base font-normal text-ink-muted">· {element.category.label}</span>
      </h2>
      <ul className="flex flex-wrap gap-1.5">
        {neighbours.map((n) => (
          <li key={n.skill.slug}>
            <ElementTile element={n} size="md" />
          </li>
        ))}
      </ul>
    </section>
  );
}
