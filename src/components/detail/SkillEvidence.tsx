import type { Skill } from "@/data/types";
import { declaredAgents, getSource, skillFileUrl, SYNCED_AT } from "@/data/sources";
import { AGENTS } from "@/lib/installCommands";

/** Why this skill is listed, what it is for, and what to check first. */
export default function SkillEvidence({ skill }: { skill: Skill }) {
  const source = getSource(skill.upstream.source);
  const supported = declaredAgents(skill.upstream);
  const skillUrl = skillFileUrl(source.repo, source.sha, skill.upstream.dir, skill.upstream.path);
  const needsReview = skill.reviewedHash && skill.upstream.contentHash && skill.reviewedHash !== skill.upstream.contentHash;

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
    { term: "適合的任務", body: skill.useCase ?? skill.description },
    { term: "使用前確認", body: skill.limitations ?? "請確認原始文件中的工具、套件、帳號與環境需求。本站未逐一驗證安裝及任務結果。" },
  ];
  if (skill.upstream.compatibility) rows.push({ term: "作者標示的環境需求", body: skill.upstream.compatibility, wide: true });

  return (
    <section aria-labelledby="evidence-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="evidence-heading" className="font-wide text-2xl font-black">收錄依據與使用條件</h2>
        <span className="border-2 border-ink px-3 py-1 font-mono text-xs">尚未進行任務實測</span>
      </div>
      {needsReview && (
        <p className="mb-4 border-2 border-ink bg-[#F4D35E] p-3 text-sm">原始內容已更新，以下中文介紹待複核。請同時查看最新收錄版本。</p>
      )}
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
