import { SKILLS } from "@/data/skills";
import { SOURCES, SYNCED_AT, repoUrl } from "@/data/sources";

export default function SourceLinks() {
  return (
    <section className="border-b border-slate-200/80 bg-white px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
          Skills 來源
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SOURCES.map((source) => {
            const count = SKILLS.filter((s) => s.upstream.source === source.id).length;
            return (
              <a
                key={source.id}
                href={repoUrl(source.repo)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-md"
              >
                <div aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 text-xl shadow-sm">
                  {source.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 transition group-hover:text-blue-600">
                    {source.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {source.blurb} · {count} 個
                  </p>
                  <p className="mt-1.5 break-all font-mono text-xs text-slate-500">
                    github.com/{source.repo}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">資料同步於 {SYNCED_AT}</p>
      </div>
    </section>
  );
}
