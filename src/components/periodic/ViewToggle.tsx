import type { CatalogView } from "@/lib/catalogFilter";

const VIEWS: { id: CatalogView; label: string }[] = [
  { id: "table", label: "週期表" },
  { id: "list", label: "清單" },
];

/** Switch between the periodic table and the full-name list. */
export default function ViewToggle({ view, onChange }: { view: CatalogView; onChange: (view: CatalogView) => void }) {
  return (
    <div role="group" aria-label="顯示方式" className="flex border-2 border-ink">
      {VIEWS.map((v) => (
        <button
          key={v.id}
          type="button"
          aria-pressed={view === v.id}
          onClick={() => onChange(v.id)}
          className={`min-h-11 px-4 text-sm font-bold ${view === v.id ? "bg-ink text-paper" : "bg-white hover:bg-ink/10"}`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
