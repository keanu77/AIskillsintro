import Link from "next/link";
import { formatNumber, type SkillElement } from "@/lib/elements";

type Size = "sm" | "md" | "lg";

interface ElementTileProps {
  element: SkillElement;
  size?: Size;
  /** De-emphasised while a search/filter is active and this tile doesn't match. */
  dimmed?: boolean;
  /** Render as a static figure instead of a link (e.g. the detail-page hero). */
  asFigure?: boolean;
  onPreview?: (element: SkillElement) => void;
}

const SIZES: Record<Size, { box: string; num: string; sym: string; name: string }> = {
  sm: { box: "h-[72px] p-[6px_7px] gap-1", num: "text-[10px]", sym: "text-[22px]", name: "text-[9px]" },
  md: { box: "h-[100px] w-[92px] p-2.5", num: "text-[11px]", sym: "text-[30px]", name: "text-[11px]" },
  lg: {
    box: "h-[220px] w-full max-w-[200px] p-4 border-2 border-ink sm:h-[360px] sm:max-w-[320px] sm:p-6",
    num: "text-sm sm:text-lg",
    sym: "text-[96px] tracking-[-0.04em] sm:text-[160px]",
    name: "text-lg sm:text-[26px]",
  },
};

export default function ElementTile({ element, size = "sm", dimmed = false, asFigure = false, onPreview }: ElementTileProps) {
  const { skill, category, number, symbol } = element;
  const s = SIZES[size];
  const label = `${skill.name}，${category.label}，元素 ${formatNumber(number)}`;

  const body = (
    <>
      <span className={`flex justify-between font-mono leading-none ${s.num}`}>
        <span>{formatNumber(number)}</span>
        {size !== "sm" && <span>{category.code}</span>}
      </span>
      <span className={`font-display font-extrabold leading-[0.85] ${s.sym}`}>{symbol}</span>
      <span className={`truncate leading-tight ${s.name} ${size === "lg" ? "font-wide font-extrabold" : ""}`}>{skill.name}</span>
    </>
  );

  // Dimmed tiles drop their fill (so they can't be mistaken for the grey
  // productivity group) and keep AA text contrast: #4D4D4D on paper ≈ 8:1.
  const style = dimmed ? undefined : { backgroundColor: category.color };
  const base = `flex flex-col justify-between ${
    dimmed ? "text-ink-muted outline outline-1 -outline-offset-1 outline-ink/25" : "text-ink"
  } ${s.box}`;

  if (asFigure) {
    return (
      <div role="img" aria-label={label} style={style} className={base}>
        {body}
      </div>
    );
  }

  return (
    <Link
      href={`/skills/${skill.slug}`}
      aria-label={label}
      style={style}
      tabIndex={dimmed ? -1 : undefined}
      onMouseEnter={onPreview && (() => onPreview(element))}
      onFocus={onPreview && (() => onPreview(element))}
      className={`${base} transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_#121212]`}
    >
      {body}
    </Link>
  );
}
