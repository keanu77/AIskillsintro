import Link from "next/link";
import SiteHeader from "@/components/periodic/SiteHeader";
import Footer from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-[1240px] flex-wrap items-center gap-12 px-5 py-16 sm:px-10">
        <div aria-hidden className="flex h-[200px] w-[180px] flex-col justify-between border-2 border-dashed border-ink p-4">
          <span className="font-mono text-sm">404</span>
          <span className="font-display text-[88px] font-black leading-none">?</span>
          <span className="text-sm">未知元素</span>
        </div>
        <div className="min-w-0 flex-[1_1_360px]">
          <h1 className="font-wider text-[clamp(36px,5vw,56px)] font-black leading-tight">找不到這個元素</h1>
          <p className="mt-4 max-w-md text-lg text-ink-soft">這個 Skill 可能已在上游改名或移除。回到週期表用搜尋找找看。</p>
          <Link href="/" className="mt-8 inline-flex min-h-11 items-center bg-accent px-6 font-bold text-white hover:bg-accent-strong">
            回到週期表
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
