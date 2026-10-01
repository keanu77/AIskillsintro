import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getSkillBySlug, getAllSlugs } from "@/data/skills";
import { SOURCES, getSource, skillFileUrl } from "@/data/sources";
import type { SourceId } from "@/data/types";
import { getSkillContent } from "@/lib/getSkillContent";
import { translateContent } from "@/lib/translateContent";

// Template detail components
import SkillDetailHero from "@/components/detail/SkillDetailHero";
import SkillGuide from "@/components/detail/SkillGuide";

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

  return {
    title: skill.name,
    description: skill.description,
  };
}

// ── Page component ─────────────────────────────────────

const REPOS = Object.fromEntries(SOURCES.map((s) => [s.id, s.repo])) as Record<SourceId, string>;

function WithheldNotice({ href }: { href: string }) {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        <p className="font-semibold">此 Skill 的授權不允許轉載全文</p>
        <p className="mt-2 text-sm">
          請至{" "}
          <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline">
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
  const source = getSource(skill.upstream.source);

  return (
    <>
      <BackToCatalog />
      <SkillDetailHero skill={skill} />
      <Installation skill={skill.upstream} repos={REPOS} />
      {content ? (
        <SkillGuide content={content} />
      ) : (
        <WithheldNotice href={skillFileUrl(source.repo, source.sha, skill.upstream.dir)} />
      )}
      <Footer title={skill.name} />
    </>
  );
}
