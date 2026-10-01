import type { Skill } from "@/data/types";
import { declaredAgents, getSource, skillFileUrl, SYNCED_AT } from "@/data/sources";
import { AGENTS } from "@/lib/installCommands";

/** Why this skill is listed, where it comes from and which platforms it declares. */
export default function SkillEvidence({ skill }: { skill: Skill }) {
  const source = getSource(skill.upstream.source);
  const supported = declaredAgents(skill.upstream);
  const skillUrl = skillFileUrl(source.repo, source.sha, skill.upstream.dir, skill.upstream.path);

  const rows: { term: string; body: React.ReactNode; wide?: boolean }[] = [
    {
      term: "來源與依據",
      body: (
        <>
          {source.label} 維護的技能目錄，依原始文件整理用途。
          <a href={skillUrl} target="_blank" rel="noopener noreferrer" className="ml-1 font-bold text-accent underline">查看本次收錄版本</a>
        </>
      ),
    },
    {
      term: "來源文件宣告的平台",
      body: (
        <>
          {supported.length > 0
            ? AGENTS.filter((a) => supported.includes(a.id)).map((a) => a.label).join("、")
            : "來源未明列；尚待逐平台確認。"}
          <a href={source.docsUrl} target="_blank" rel="noopener noreferrer" className="ml-1 font-bold text-accent underline">來源說明</a>
        </>
      ),
    },
    // Use case and prerequisites moved to SkillIntro above the install panel.
  ];
  if (skill.upstream.compatibility) rows.push({ term: "作者標示的環境需求", body: skill.upstream.compatibility, wide: true });

  return (
    <section aria-labelledby="evidence-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="evidence-heading" className="font-wide text-2xl font-black">收錄依據與使用條件</h2>
        <span className="border-2 border-ink px-3 py-1 font-mono text-xs">尚未進行任務實測</span>
      </div>
      <dl className="cell-grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))]">
        {rows.map((r) => (
          <div key={r.term} className={`bg-white px-5 py-4 ${r.wide ? "col-span-full" : ""}`}>
            <dt className="font-mono text-xs text-ink-muted">{r.term}</dt>
            <dd className="mt-2 break-words leading-7 text-ink-soft">{r.body}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 font-mono text-xs leading-6 text-ink-muted">
        資料觀察：{source.observedAt?.slice(0, 10) ?? SYNCED_AT}
        {skill.reviewedAt && ` · 中文介紹整理：${skill.reviewedAt}`}
        {source.stars !== undefined && ` · 整個來源專案有 ${source.stars.toLocaleString("zh-TW")} 顆 GitHub stars（非此 skill 的評分或使用人數）`}
        {skill.reviewedSourceUrl && (
          <>
            {" · "}
            <a href={skill.reviewedSourceUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline">中文介紹依據的原始版本</a>
          </>
        )}
      </p>
    </section>
  );
}
