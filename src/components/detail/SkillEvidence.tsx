import type { Skill } from "@/data/types";
import { declaredAgents, getSource, skillFileUrl, SYNCED_AT } from "@/data/sources";
import { AGENTS } from "@/lib/installCommands";

export default function SkillEvidence({ skill }: { skill: Skill }) {
  const source = getSource(skill.upstream.source);
  const supported = declaredAgents(skill.upstream);
  const skillUrl = skillFileUrl(source.repo, source.sha, skill.upstream.dir, skill.upstream.path);
  const needsReview = skill.reviewedHash && skill.upstream.contentHash && skill.reviewedHash !== skill.upstream.contentHash;
  return (
    <section aria-labelledby="evidence-heading" className="border-b border-slate-200 bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="evidence-heading" className="text-xl font-semibold text-slate-900">收錄依據與使用條件</h2>
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-600">尚未進行任務實測</span>
        </div>
        {needsReview && <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">原始內容已更新，以下中文介紹待複核。請同時查看最新收錄版本。</p>}
        <dl className="mt-6 grid gap-6 text-sm leading-7 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-slate-900">來源與依據</dt>
            <dd className="mt-1 text-slate-600">{source.label} 維護的技能目錄，依原始文件整理用途。
              <a href={skillUrl} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-700 underline">查看本次收錄版本</a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">來源文件宣告的平台</dt>
            <dd className="mt-1 text-slate-600">{supported.length > 0 ? AGENTS.filter((a) => supported.includes(a.id)).map((a) => a.label).join("、") : "來源未明列；尚待逐平台確認。"}
              <a href={source.docsUrl} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-700 underline">來源說明</a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">適合的任務</dt>
            <dd className="mt-1 text-slate-600">{skill.useCase ?? skill.description}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">使用前確認</dt>
            <dd className="mt-1 text-slate-600">{skill.limitations ?? "請確認原始文件中的工具、套件、帳號與環境需求。本站未逐一驗證安裝及任務結果。"}</dd>
          </div>
          {skill.upstream.compatibility && <div className="sm:col-span-2">
            <dt className="font-semibold text-slate-900">作者標示的環境需求</dt>
            <dd className="mt-1 break-words text-slate-600">{skill.upstream.compatibility}</dd>
          </div>}
        </dl>
        <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-6 text-slate-500">
          資料觀察：{source.observedAt?.slice(0, 10) ?? SYNCED_AT}
          {skill.reviewedAt && ` · 中文介紹整理：${skill.reviewedAt}`}
          {source.stars !== undefined && ` · 整個來源專案有 ${source.stars.toLocaleString("zh-TW")} 顆 GitHub stars（非此 skill 的評分或使用人數）`}
        </p>
        {skill.reviewedSourceUrl && <a href={skill.reviewedSourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-blue-700 underline">中文介紹依據的原始版本</a>}
      </div>
    </section>
  );
}
