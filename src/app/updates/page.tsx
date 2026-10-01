import type { Metadata } from "next";
import Link from "next/link";
import discoveryData from "@/data/discovery.json";
import updateData from "@/data/updates.json";
import { SKILLS, UPSTREAM_SKILLS, getSkillBySlug } from "@/data/skills";
import { SOURCES, SYNCED_AT, getSource, skillFileUrl } from "@/data/sources";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "每週更新與新發現",
  description: "查看每週 Skills 目錄更新、GitHub 搜尋候選、收錄依據與平台支援的標示方式。",
  alternates: { canonical: "/updates" },
  openGraph: { title: "每週更新與新發現 — AI Skills Catalog", url: "/updates", images: ["/opengraph-image"] },
};

interface Candidate {
  repo: string; url: string; description: string | null; stars: number;
  pushedAt: string; sha: string; skillPaths: string[]; skillCount?: number; discoveredAt: string;
}
interface Discovery {
  checkedAt: string | null; attemptedAt: string | null; status: string;
  error: string | null; queries: string[]; candidates: Candidate[];
}
interface UpdateRun { date: string; baseline: boolean; added: string[]; changed: string[]; removed: string[]; total: number }

const discovery = discoveryData as Discovery;
const { runs } = updateData as { runs: UpdateRun[] };
const published = new Set(SKILLS.map((s) => s.slug));
const pending = UPSTREAM_SKILLS.filter((s) => !published.has(s.slug));
const date = (value: string | null) => value?.slice(0, 10) ?? "尚未取得";

function ChangeList({ title, slugs }: { title: string; slugs: string[] }) {
  if (slugs.length === 0) return null;
  return (
    <details className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <summary className="cursor-pointer text-sm font-medium text-slate-800">{title} · {slugs.length}</summary>
      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        {slugs.map((slug) => {
          const skill = getSkillBySlug(slug);
          return <li key={slug} className="break-words">{skill
            ? <Link href={`/skills/${slug}`} className="text-blue-700 hover:underline">{skill.name}</Link>
            : <span className="text-slate-500">{slug}（目前未列入中文目錄）</span>}</li>;
        })}
      </ul>
    </details>
  );
}

export default function UpdatesPage() {
  return (
    <>
      <header className="bg-slate-950 px-6 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-sm text-blue-200 hover:underline">← 返回 Skills 目錄</Link>
          <p className="mt-10 text-xs font-semibold tracking-[0.2em] text-blue-300">每週一更新來源</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">這週，有哪些新發現？</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">追蹤熟悉的工具，也發掘新的 skills。這裡保留每次更新的紀錄，讓你看見內容從哪裡來、哪些項目還需要確認。</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
            <span><strong className="text-white">{SOURCES.length}</strong> 個追蹤來源</span>
            <span><strong className="text-white">{SKILLS.length}</strong> 個中文介紹</span>
            <span>資料同步 <time dateTime={SYNCED_AT}>{SYNCED_AT}</time></span>
          </div>
        </div>
      </header>
      <main className="bg-slate-50 px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl space-y-14">
          <section aria-labelledby="how-heading" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 id="how-heading" className="text-xl font-semibold text-slate-900">更新與收錄方式</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">每週一台灣時間 09:00 檢查追蹤來源，並搜尋 GitHub 的 Agent Skills 主題與相關專案；整理後經審閱發布。頁面的日期代表已取得的資料，並非即時排行。</p>
            <div className="mt-6 grid gap-6 text-sm leading-7 sm:grid-cols-3">
              <div><h3 className="font-semibold text-slate-900">有來源的中文介紹</h3><p className="mt-1 text-slate-600">依原始文件整理任務、需求與限制。來源官方發布、社群維護與實際效果，分別看待。</p></div>
              <div><h3 className="font-semibold text-slate-900">可追溯的支援狀態</h3><p className="mt-1 text-slate-600">平台篩選依來源文件的宣告；本站尚未完成逐技能、逐平台的任務實測。</p></div>
              <div><h3 className="font-semibold text-slate-900">待評估的新來源</h3><p className="mt-1 text-slate-600">搜尋候選只提供發掘線索。GitHub stars 是整個專案的關注數，不代表個別 skill 的評分。</p></div>
            </div>
          </section>

          <section aria-labelledby="history-heading">
            <h2 id="history-heading" className="text-2xl font-semibold text-slate-900">目錄更新紀錄</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">新增與變更依收錄的來源版本比較；沒有中文介紹的項目仍保留待整理狀態。</p>
            {runs.length === 0 ? <p className="mt-5 text-sm text-slate-600">首次更新紀錄正在整理。</p> :
              <div className="mt-6 space-y-5">{runs.map((run) => (
                <article key={run.date} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-semibold text-slate-900"><time dateTime={run.date}>{run.date}</time></h3>
                    <span className="text-xs text-slate-500">{run.baseline ? "開始記錄來源版本" : "來源版本比較"} · {run.total} 個上游項目</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">新增 {run.added.length} · 內容或來源資訊變更 {run.changed.length} · 移除 {run.removed.length}</p>
                  <div className="mt-4 space-y-2">
                    <ChangeList title="新增項目" slugs={run.added} />
                    <ChangeList title="內容或來源資訊變更" slugs={run.changed} />
                    <ChangeList title="移除項目" slugs={run.removed} />
                  </div>
                </article>
              ))}</div>}
            {pending.length > 0 && <details className="mt-5 rounded-2xl border border-dashed border-slate-300 p-5">
              <summary className="cursor-pointer text-sm font-medium text-slate-700">待整理中文介紹 · {pending.length} 個</summary>
              <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">{pending.map((skill) => {
                const source = getSource(skill.source);
                return <li key={skill.slug}><a className="break-words text-blue-700 hover:underline" href={skillFileUrl(source.repo, source.sha, skill.dir, skill.path)} target="_blank" rel="noopener noreferrer">{skill.name}</a><span className="ml-2 text-xs text-slate-500">{source.label}</span></li>;
              })}</ul>
            </details>}
          </section>

          <section aria-labelledby="discover-heading">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="discover-heading" className="text-2xl font-semibold text-slate-900">網路新發現</h2>
              <span className="text-xs text-slate-500">最近成功搜尋：{date(discovery.checkedAt)}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">每週搜尋 GitHub，篩選至少 50 顆 stars、未封存且包含 SKILL.md 的專案；排除 fork、重複及已追蹤的來源。這些是待評估候選，尚未確認安全性、平台相容性或任務效果。</p>
            {discovery.status !== "ok" && <div role="status" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
              最近一次搜尋未完整完成（{date(discovery.attemptedAt)}）。保留上次成功取得的候選與日期。
            </div>}
            {discovery.candidates.length === 0 ? <p className="mt-6 text-sm text-slate-500">{discovery.status === "ok" ? "本次沒有符合條件的新來源。" : "目前尚無可顯示的搜尋結果。"}</p> :
              <div className="mt-6 grid gap-4 sm:grid-cols-2">{discovery.candidates.map((candidate) => (
                <article key={candidate.repo} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-3 text-xs"><span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-800">待評估來源</span><span className="text-slate-500">專案 stars {candidate.stars.toLocaleString("zh-TW")}</span></div>
                  <h3 className="mt-4 break-words font-semibold text-slate-900"><a href={candidate.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 hover:underline">{candidate.repo} ↗</a></h3>
                  <p className="mt-2 flex-1 break-words text-sm leading-7 text-slate-600">{candidate.description || "來源未提供簡介，請查看原始專案。"}</p>
                  <p className="mt-4 text-xs leading-6 text-slate-500">首次發現 {date(candidate.discoveredAt)} · 已找到 {candidate.skillCount ?? candidate.skillPaths.length} 個 skill 檔案<br />專案最近推送 {date(candidate.pushedAt)}</p>
                </article>
              ))}</div>}
            <details className="mt-5 text-xs leading-7 text-slate-500"><summary className="cursor-pointer">查看本次搜尋條件</summary><ul className="mt-2">{discovery.queries.map((query) => <li key={query} className="break-words font-mono">{query}</li>)}</ul></details>
          </section>
        </div>
      </main>
      <Footer title="每週更新與新發現" />
    </>
  );
}
