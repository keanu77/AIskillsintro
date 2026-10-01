import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/skills";
import { SYNCED_AT } from "@/data/sources";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SYNCED_AT);
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    ...getAllSlugs().map((slug) => ({
      url: `${SITE_URL}/skills/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
