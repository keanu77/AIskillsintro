import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getSkillBySlug, getAllSlugs } from "@/data/skills";

// Template detail components
import SkillDetailHero from "@/components/detail/SkillDetailHero";

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

export default async function SkillDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) notFound();

  return (
    <>
      <BackToCatalog />
      <SkillDetailHero skill={skill} />
      <Installation slug={skill.slug} />
      <Footer skillName={skill.name} />
    </>
  );
}
