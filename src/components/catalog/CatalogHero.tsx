import { SKILLS, CATEGORIES } from "@/data/skills";

export default function CatalogHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-6 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          {SKILLS.length} Skills / {CATEGORIES.length} Categories
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          AI Skills Catalog
        </h1>
        <p className="mt-3 text-xl text-blue-200 sm:text-2xl">
          Claude Code / Gemini CLI 技能目錄
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          已安裝 {SKILLS.length} 個 AI Skills，涵蓋資料庫存取、生物資訊、資料科學、學術寫作等領域。
          <br className="hidden sm:block" />
          點選卡片查看詳細說明與安裝方式。
        </p>
      </div>
    </section>
  );
}
