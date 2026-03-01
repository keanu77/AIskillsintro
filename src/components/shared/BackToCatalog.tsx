import Link from "next/link";

export default function BackToCatalog() {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-white px-6 pt-6 pb-2">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          返回 Skills 目錄
        </Link>
      </div>
    </div>
  );
}
