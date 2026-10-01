import Link from "next/link";
import Footer from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-6 py-24 text-center">
        <p className="text-sm font-semibold tracking-wider text-blue-700">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">找不到這個頁面</h1>
        <p className="mt-4 max-w-md text-slate-600">
          這個 Skill 可能已在上游改名或移除。回到目錄用搜尋找找看。
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          返回 Skills 目錄
        </Link>
      </main>
      <Footer title="AI Skills Catalog" />
    </>
  );
}
