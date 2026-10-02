import Link from "next/link";
import type { ReactNode } from "react";
import FollowLinks from "@/components/shared/FollowLinks";

/** Logo tile + wordmark; the right side is page-specific navigation, then the follow links. */
export default function SiteHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-10">
      <Link href="/" className="flex items-center gap-3 no-underline">
        <span aria-hidden className="font-display grid h-10 w-10 place-items-center bg-ink text-lg font-black text-paper">
          Sk
        </span>
        <span className="font-wide text-lg font-extrabold">Skills 週期表</span>
      </Link>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
        {children}
        <FollowLinks />
      </div>
    </header>
  );
}
