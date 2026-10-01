import type { Metadata } from "next";
import Link from "next/link";
import discoveryData from "@/data/discovery.json";
import updateData from "@/data/updates.json";
import { SKILLS, UPSTREAM_SKILLS, getSkillBySlug } from "@/data/skills";
import { SOURCES, SYNCED_AT, getSource, skillFileUrl } from "@/data/sources";
import SiteHeader from "@/components/periodic/SiteHeader";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "每週更新與新發現",
  description: "查看每週 Skills 目錄更新、GitHub 搜尋候選、收錄依據與平台支援的標示方式。",
  alternates: { canonical: "/updates" },
  openGraph: { title: "每週更新與新發現 — Skills 週期表", url: "/updates", images: ["/opengraph-image"] },
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
    <details className="border-2 border-ink bg-white px-4 py-3">
      <summary className="cursor-pointer text-sm font-medium text-ink">{title} · {slugs.length}</summary>
      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        {slugs.map((slug) => {
          const skill = getSkillBySlug(slug);
          return <li key={slug} className="break-words">{skill
            ? <Link href={`/skills/${slug}`} className="text-accent underline-offset-2 hover:underline">{skill.name}</Link>
            : <span className="text-ink-muted">{slug}（目前未列入中文目錄）</span>}</li>;
        })}
      </ul>
    </details>
  );
}

export default function UpdatesPage() {
  return (
    <>
      <SiteHeader>
        <Link href="/" className="text-[15px] hover:text-accent">← 回到週期表</Link>
      </SiteHeader>
      <main className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-10">
        <section className="pt-8 pb-14">
          <p className="font-mono text-xs tracking-widest text-ink-muted">每週一更新來源</p>
          <h1 className="font-wider mt-3 text-[clamp(36px,5vw,64px)] font-black leading-tight">這週，有哪些新發現？</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">追蹤熟悉的工具，也發掘新的 skills。這裡保留每次更新的紀錄，讓你看見內容從哪裡來、哪些項目還需要確認。</p>
          <dl className="mt-8 cell-grid max-w-2xl grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
            <div className="bg-white px-4 py-3"><dt className="font-mono text-xs text-ink-muted">追蹤來源</dt><dd className="font-wide mt-1 text-2xl font-black">{SOURCES.length}</dd></div>
            <div className="bg-white px-4 py-3"><dt className="font-mono text-xs text-ink-muted">中文介紹</dt><dd className="font-wide mt-1 text-2xl font-black">{SKILLS.length}</dd></div>
            <div className="bg-white px-4 py-3"><dt className="font-mono text-xs text-ink-muted">資料同步</dt><dd className="mt-1 font-mono text-lg"><time dateTime={SYNCED_AT}>{SYNCED_AT}</time></dd></div>
          </dl>
        </section>
        <div className="max-w-5xl space-y-14">
          <section aria-labelledby="how-heading" className="border-2 border-ink bg-white p-6 sm:p-8">
            <h2 id="how-heading" className="font-wide text-xl font-black text-ink">更新與收錄方式</h2>
            <p className="mt-3 text-sm leading-7 text-ink-soft">每週一台灣時間 09:00 檢查追蹤來源，並搜尋 GitHub 的 Agent Skills 主題與相關專案；整理後經審閱發布。頁面的日期代表已取得的資料，並非即時排行。</p>
            <div className="mt-6 grid gap-6 text-sm leading-7 sm:grid-cols-3">
              <div><h3 className="font-bold text-ink">有來源的中文介紹</h3><p className="mt-1 text-ink-soft">依原始文件整理任務、需求與限制。來源官方發布、社群維護與實際效果，分別看待。</p></div>
              <div><h3 className="font-bold text-ink">可追溯的支援狀態</h3><p className="mt-1 text-ink-soft">平台篩選依來源文件的宣告；本站尚未完成逐技能、逐平台的任務實測。</p></div>
              <div><h3 className="font-bold text-ink">待評估的新來源</h3><p className="mt-1 text-ink-soft">搜尋候選只提供發掘線索。GitHub stars 是整個專案的關注數，不代表個別 skill 的評分。</p></div>
            </div>
          </section>

          <section aria-labelledby="history-heading">
            <h2 id="history-heading" className="font-wide text-2xl font-black text-ink">目錄更新紀錄</h2>
            <p className="mt-2 text-sm leading-7 text-ink-muted">新增與變更依收錄的來源版本比較；沒有中文介紹的項目仍保留待整理狀態。</p>
            {runs.length === 0 ? <p className="mt-5 text-sm text-ink-soft">首次更新紀錄正在整理。</p> :
              <div className="mt-6 space-y-5">{runs.map((run) => (
                <article key={run.date} className="border-2 border-ink bg-white p-5 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-bold text-ink"><time dateTime={run.date}>{run.date}</time></h3>
                    <span className="text-xs text-ink-muted">{run.baseline ? "開始記錄來源版本" : "來源版本比較"} · {run.total} 個上游項目</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">新增 {run.added.length} · 內容或來源資訊變更 {run.changed.length} · 移除 {run.removed.length}</p>
                  <div className="mt-4 space-y-2">
                    <ChangeList title="新增項目" slugs={run.added} />
                    <ChangeList title="內容或來源資訊變更" slugs={run.changed} />
                    <ChangeList title="移除項目" slugs={run.removed} />
                  </div>
                </article>
              ))}</div>}
            {pending.length > 0 && <details className="mt-5 border-2 border-dashed border-ink/50 p-5">
              <summary className="cursor-pointer text-sm font-medium text-ink">待整理中文介紹 · {pending.length} 個</summary>
              <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">{pending.map((skill) => {
                const source = getSource(skill.source);
                return <li key={skill.slug}><a className="break-words text-accent underline-offset-2 hover:underline" href={skillFileUrl(source.repo, source.sha, skill.dir, skill.path)} target="_blank" rel="noopener noreferrer">{skill.name}</a><span className="ml-2 text-xs text-ink-muted">{source.label}</span></li>;
              })}</ul>
            </details>}
          </section>

          <section aria-labelledby="discover-heading">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="discover-heading" className="font-wide text-2xl font-black text-ink">網路新發現</h2>
              <span className="text-xs text-ink-muted">最近成功搜尋：{date(discovery.checkedAt)}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-ink-soft">每週搜尋 GitHub，篩選至少 50 顆 stars、未封存且包含 SKILL.md 的專案；排除 fork、重複及已追蹤的來源。這些是待評估候選，尚未確認安全性、平台相容性或任務效果。</p>
            {discovery.status !== "ok" && <div role="status" className="mt-5 border-2 border-ink bg-[#F4D35E] p-4 text-sm leading-7 text-ink">
              最近一次搜尋未完整完成（{date(discovery.attemptedAt)}）。保留上次成功取得的候選與日期。
            </div>}
            {discovery.candidates.length === 0 ? <p className="mt-6 text-sm text-ink-muted">{discovery.status === "ok" ? "本次沒有符合條件的新來源。" : "目前尚無可顯示的搜尋結果。"}</p> :
              <div className="mt-6 grid gap-4 sm:grid-cols-2">{discovery.candidates.map((candidate) => (
                <article key={candidate.repo} className="flex flex-col border-2 border-ink bg-white p-5">
                  <div className="flex items-center justify-between gap-3 text-xs"><span className="border border-ink bg-[#F4D35E] px-2.5 py-1 font-mono text-ink">待評估來源</span><span className="text-ink-muted">專案 stars {candidate.stars.toLocaleString("zh-TW")}</span></div>
                  <h3 className="mt-4 break-words font-bold text-ink"><a href={candidate.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent underline-offset-2 hover:underline">{candidate.repo} ↗</a></h3>
                  <p className="mt-2 flex-1 break-words text-sm leading-7 text-ink-soft">{candidate.description || "來源未提供簡介，請查看原始專案。"}</p>
                  <p className="mt-4 text-xs leading-6 text-ink-muted">首次發現 {date(candidate.discoveredAt)} · 已找到 {candidate.skillCount ?? candidate.skillPaths.length} 個 skill 檔案<br />專案最近推送 {date(candidate.pushedAt)}</p>
                </article>
              ))}</div>}
            <details className="mt-5 text-xs leading-7 text-ink-muted"><summary className="cursor-pointer">查看本次搜尋條件</summary><ul className="mt-2">{discovery.queries.map((query) => <li key={query} className="break-words font-mono">{query}</li>)}</ul></details>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
