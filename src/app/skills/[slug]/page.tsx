import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getSkillBySlug, getAllSlugs } from "@/data/skills";
import { SOURCES, getSource, skillFileUrl } from "@/data/sources";
import type { SourceId } from "@/data/types";
import { getSkillAttribution, getSkillContent } from "@/lib/getSkillContent";
import { translateContent } from "@/lib/translateContent";

// Template detail components
import SkillDetailHero from "@/components/detail/SkillDetailHero";
import SkillGuide from "@/components/detail/SkillGuide";
import SkillEvidence from "@/components/detail/SkillEvidence";

// Shared components
import Installation from "@/components/shared/Installation";
import Footer from "@/components/shared/Footer";
import BackToCatalog from "@/components/shared/BackToCatalog";

// ── Static params for SSG ──────────────────────────────

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ── Dynamic metadata ───────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return {};

  const path = `/skills/${skill.slug}`;
  return {
    title: skill.name,
    description: skill.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${skill.name} — AI Skills Catalog`,
      description: skill.description,
      // Child openGraph replaces the parent's, so re-attach the site card.
      images: ["/opengraph-image"],
    },
  };
}

// ── Page component ─────────────────────────────────────

const REPOS = Object.fromEntries(SOURCES.map((s) => [s.id, s.repo])) as Record<
  SourceId,
  string
>;

function WithheldNotice({ href }: { href: string }) {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        <p className="font-semibold">此 Skill 僅提供介紹與來源連結</p>
        <p className="mt-2 text-sm">
          尚未確認全文轉載條件，或來源授權有限制。請至{" "}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
          >
            原始 SKILL.md
          </a>{" "}
          閱讀完整使用說明。
        </p>
      </div>
    </section>
  );
}

export default async function SkillDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) notFound();

  const raw = getSkillContent(skill.slug);
  const content = raw ? translateContent(raw) : null;
  const attribution = getSkillAttribution(skill.slug);
  const source = getSource(skill.upstream.source);

  return (
    <>
      <BackToCatalog />
      <main>
        <SkillDetailHero skill={skill} />
        <SkillEvidence skill={skill} />
        <Installation skill={skill.upstream} repos={REPOS} />
        {content ? (
          <SkillGuide content={content} sourceUrl={skillFileUrl(source.repo, source.sha, skill.upstream.dir, skill.upstream.path)} />
        ) : (
          <WithheldNotice href={skillFileUrl(source.repo, source.sha, skill.upstream.dir, skill.upstream.path)} />
        )}
        {attribution && <section className="bg-white px-6 pb-12">
          <details className="mx-auto max-w-4xl rounded-xl border border-slate-200 p-5">
            <summary className="cursor-pointer text-sm font-medium text-slate-700">來源與授權資訊</summary>
            <pre tabIndex={0} className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-500">{attribution}</pre>
          </details>
        </section>}
      </main>
      <Footer title={skill.name} />
    </>
  );
}
