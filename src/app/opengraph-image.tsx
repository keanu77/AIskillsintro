import { ImageResponse } from "next/og";
import { SKILLS } from "@/data/skills";

export const dynamic = "force-static";
export const alt = "AI Skills Catalog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Latin-only copy: the bundled OG font has no CJK glyphs.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #020617 0%, #172554 55%, #1e1b4b 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 30, color: "#93c5fd", marginBottom: 24 }}>
          {`${SKILLS.length} Agent Skills`}
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05 }}>AI Skills Catalog</div>
        <div style={{ fontSize: 34, color: "#cbd5e1", marginTop: 32 }}>
          Install guides for Claude Code · Codex · Gemini CLI · Grok
        </div>
      </div>
    ),
    size,
  );
}
