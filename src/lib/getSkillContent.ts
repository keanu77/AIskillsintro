import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SKILLS_DIR = path.join(process.env.HOME || "~", ".claude/skills");
const OFFICIAL_SKILLS_DIR = path.join(
  process.env.HOME || "~",
  "skills/skills",
);

/**
 * Read and parse a SKILL.md file for a given slug.
 * Returns the markdown body (without frontmatter).
 */
export function getSkillContent(slug: string): string | null {
  // Try multiple possible paths
  const candidates = [
    // Regular skill
    path.join(SKILLS_DIR, slug, "SKILL.md"),
    // document-skills--docx → document-skills/docx
    path.join(SKILLS_DIR, slug.replace("--", "/"), "SKILL.md"),
    // Official Anthropic skills
    path.join(OFFICIAL_SKILLS_DIR, slug, "SKILL.md"),
    // document-skills--docx → official docx
    path.join(OFFICIAL_SKILLS_DIR, slug.replace("document-skills--", ""), "SKILL.md"),
  ];

  for (const filePath of candidates) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const { content } = matter(raw);
        return content.trim();
      }
    } catch {
      continue;
    }
  }

  return null;
}
