import fs from "fs";
import path from "path";

// Populated by `npm run sync` from the upstream repos and committed, so builds
// are reproducible on any machine.
const CONTENT_DIR = path.join(process.cwd(), "content/skills");

/** Mirrored SKILL.md body for a slug, or null when withheld (license) or missing. */
export function getSkillContent(slug: string): string | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8").trim();
}
