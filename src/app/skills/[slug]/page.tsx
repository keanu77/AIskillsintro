import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ElementHero from "@/components/detail/ElementHero";
import FamilyRow from "@/components/detail/FamilyRow";
import SkillEvidence from "@/components/detail/SkillEvidence";
import SkillGuide from "@/components/detail/SkillGuide";
import SiteHeader from "@/components/periodic/SiteHeader";
import Footer from "@/components/shared/Footer";
import Installation from "@/components/shared/Installation";
import { CATEGORIES, SKILLS, getAllSlugs, getSkillBySlug } from "@/data/skills";
import { SOURCES, getSource, skillFileUrl } from "@/data/sources";
import type { SourceId } from "@/data/types";
import { buildElements } from "@/lib/elements";
import { getSkillAttribution, getSkillContent } from "@/lib/getSkillContent";
import { translateContent } from "@/lib/translateContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ELEMENTS = buildElements(SKILLS, CATEGORIES);
const REPOS = Object.fromEntries(SOURCES.map((s) => [s.id, s.repo])) as Record<SourceId, string>;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
      title: `${skill.name} — Skills 週期表`,
      description: skill.description,
      // Child openGraph replaces the parent's, so re-attach the site card.
      images: ["/opengraph-image"],
    },
  };
}

function WithheldNotice({ href }: { href: string }) {
  return (
    <section aria-labelledby="withheld-heading" className="max-w-[820px] border-2 border-ink bg-white p-6">
      <h2 id="withheld-heading" className="font-bold">此 Skill 僅提供介紹與來源連結</h2>
      <p className="mt-2 text-ink-soft">
        尚未確認全文轉載條件，或來源授權有限制。請至{" "}
        <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-accent underline">
          原始 SKILL.md
        </a>{" "}
        閱讀完整使用說明。
      </p>
    </section>
  );
}

export default async function SkillDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const element = ELEMENTS.find((e) => e.skill.slug === slug);
  if (!element) notFound();

  const { skill } = element;
  const raw = getSkillContent(skill.slug);
  const content = raw ? translateContent(raw) : null;
  const attribution = getSkillAttribution(skill.slug);
  const source = getSource(skill.upstream.source);
  const fileUrl = skillFileUrl(source.repo, source.sha, skill.upstream.dir, skill.upstream.path);

  return (
    <>
      <SiteHeader>
        <Link href="/" className="text-[15px] hover:text-accent">
          ← 回到週期表
        </Link>
      </SiteHeader>
      <main className="mx-auto flex max-w-[1240px] flex-col gap-12 px-5 pt-6 pb-20 sm:px-10">
        <ElementHero element={element} />
        <Installation skill={skill.upstream} repos={REPOS} />
        <SkillEvidence skill={skill} />
        <FamilyRow element={element} all={ELEMENTS} />
        {content ? <SkillGuide content={content} sourceUrl={fileUrl} /> : <WithheldNotice href={fileUrl} />}
        {attribution && (
          <details className="max-w-[820px] border-2 border-ink bg-white">
            <summary className="cursor-pointer px-5 py-3 text-sm font-bold">來源與授權資訊</summary>
            <pre tabIndex={0} className="max-h-80 overflow-auto whitespace-pre-wrap break-words border-t-2 border-ink px-5 py-4 font-mono text-xs leading-6 text-ink-soft">
              {attribution}
            </pre>
          </details>
        )}
      </main>
      <Footer />
    </>
  );
}
