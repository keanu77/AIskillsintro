import ElementTile from "@/components/periodic/ElementTile";
import { getSource, repoUrl, skillFileUrl } from "@/data/sources";
import { formatNumber, type SkillElement } from "@/lib/elements";

/** Big element card + identity + properties grid for a skill page. */
export default function ElementHero({ element }: { element: SkillElement }) {
  const { skill, category, number } = element;
  const source = getSource(skill.upstream.source);
  const fileUrl = skillFileUrl(source.repo, source.sha, skill.upstream.dir);

  const props: { term: string; value: React.ReactNode; mono?: boolean }[] = [
    {
      term: "來源",
      value: (
        <a href={repoUrl(source.repo)} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-accent">
          {source.label}
        </a>
      ),
    },
    { term: "授權", value: skill.upstream.license ?? "未標示" },
    { term: "上游路徑", value: `skills/${skill.upstream.dir}`, mono: true },
    { term: "同步", value: source.sha.slice(0, 7), mono: true },
  ];

  return (
    <section className="flex flex-wrap items-stretch gap-12">
      <ElementTile element={element} size="lg" asFigure />
      <div className="flex min-w-0 flex-[1_1_480px] flex-col justify-between gap-7">
        <div>
          <p className="font-mono text-[13px] tracking-widest text-ink-muted">
            ELEMENT {formatNumber(number)} · {category.shortLabel}
          </p>
          <h1 className="font-wider mt-2 text-[clamp(44px,6vw,72px)] font-black leading-none tracking-[-0.02em] break-words">
            {skill.name}
          </h1>
          <p className="mt-5 max-w-[620px] text-[19px] leading-relaxed text-ink-soft">{skill.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#installation" className="inline-flex min-h-11 items-center bg-accent px-5 font-bold text-white hover:bg-accent-strong">
              安裝方式
            </a>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border-2 border-ink px-5 font-bold hover:bg-ink hover:text-paper">
              原始 SKILL.md ↗
            </a>
          </div>
        </div>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-0.5 border-2 border-ink bg-ink">
          {props.map((p) => (
            <div key={p.term} className="bg-white px-4 py-3.5">
              <dt className="font-mono text-[11px] text-ink-muted">{p.term}</dt>
              <dd className={`mt-1.5 break-words ${p.mono ? "font-mono" : "font-bold"}`}>{p.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
