import Link from "next/link";
import { SOURCES, SYNCED_AT, repoUrl } from "@/data/sources";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-8 sm:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="font-wide text-base font-black">Skills 週期表 — 跨平台 Agent Skills 中文目錄</p>
          <Link href="/updates" className="font-bold text-accent hover:text-accent-strong">
            每週更新與收錄方式 →
          </Link>
        </div>
        <p className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-ink-muted">
          <span>資料來源</span>
          {SOURCES.map((s) => (
            <a key={s.id} href={repoUrl(s.repo)} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-2 hover:text-accent">
              {s.repo}
            </a>
          ))}
          <span>同步於 {SYNCED_AT}</span>
        </p>
      </div>
    </footer>
  );
}
