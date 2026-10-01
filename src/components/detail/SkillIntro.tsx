import CopyButton from "@/components/shared/CopyButton";
import type { Skill } from "@/data/types";

/** zh primer above the install panel: when to use it, what to prepare, a prompt to try. */
export default function SkillIntro({ skill }: { skill: Skill }) {
  if (!skill.useCase) return null;
  const needsReview =
    skill.reviewedHash &&
    skill.upstream.contentHash &&
    skill.reviewedHash !== skill.upstream.contentHash;

  const rows = [
    { term: "適合的任務", body: skill.useCase },
    { term: "使用前確認", body: skill.limitations },
  ].filter((r) => r.body);

  return (
    <section aria-labelledby="intro-heading" className="flex flex-col gap-4">
      <h2 id="intro-heading" className="font-wide text-2xl font-black">
        開始之前
      </h2>
      {needsReview && (
        <p className="border-2 border-ink bg-[#F4D35E] p-3 text-sm">
          原始內容已更新，以下中文介紹待複核。請同時查看最新收錄版本。
        </p>
      )}
      <dl className="cell-grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))]">
        {rows.map((r) => (
          <div key={r.term} className="bg-white px-5 py-4">
            <dt className="font-mono text-xs text-ink-muted">{r.term}</dt>
            <dd className="mt-2 break-words leading-7 text-ink-soft">
              {r.body}
            </dd>
          </div>
        ))}
      </dl>
      {skill.starterPrompt && (
        <div className="bg-ink text-paper">
          <div className="flex items-center justify-between gap-3 border-b border-white/15 px-5 py-3">
            <p className="text-sm text-paper/80">
              起手提示：裝好後貼給你的 agent，替換「」或 &lt;&gt; 裡的內容
            </p>
            <div className="flex-none whitespace-nowrap">
              <CopyButton text={skill.starterPrompt} />
            </div>
          </div>
          <p className="px-5 py-4 leading-7 break-words">
            {skill.starterPrompt}
          </p>
        </div>
      )}
      <p className="font-mono text-xs text-ink-muted">
        依原始 SKILL.md 整理，本站尚未進行任務實測。
      </p>
    </section>
  );
}
