import { ImageResponse } from "next/og";
import { CATEGORIES, SKILLS } from "@/data/skills";
import { buildElements, formatNumber } from "@/lib/elements";

export const dynamic = "force-static";
export const alt = "Agent Skills Periodic Table";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Latin-only copy: the bundled OG font has no CJK glyphs.
export default function OpengraphImage() {
  const elements = buildElements(SKILLS, CATEGORIES);
  // One sample tile per group, like a legend strip.
  const samples = CATEGORIES.map((c) => elements.find((e) => e.category.id === c.id)!).filter(Boolean);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#F7F7F4", color: "#121212" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#4D4D4D" }}>{`${SKILLS.length} elements · ${CATEGORIES.length} groups`}</div>
          <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 1, marginTop: 12 }}>Agent Skills</div>
          <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 1 }}>Periodic Table</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {samples.map((e) => (
            <div key={e.skill.slug} style={{ width: 112, height: 124, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 12, background: e.category.color }}>
              <div style={{ fontSize: 16 }}>{formatNumber(e.number)}</div>
              <div style={{ fontSize: 48, fontWeight: 800 }}>{e.symbol}</div>
              <div style={{ fontSize: 13 }}>{e.category.code}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
