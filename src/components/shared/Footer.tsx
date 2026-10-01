import { SOURCES, SYNCED_AT, repoUrl } from "@/data/sources";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-5 py-8 font-mono text-xs text-ink-muted sm:px-10">
        <p>Skills 週期表 — Claude Code / Codex / Gemini CLI / Grok</p>
        <p className="flex flex-wrap gap-x-5 gap-y-1">
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
