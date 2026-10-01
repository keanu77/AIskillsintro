import { describe, expect, it } from "vitest";
import { skillResourceUrl } from "./skillResourceUrl";

const source = "https://github.com/huggingface/skills/blob/abc123/skills/huggingface-gradio/SKILL.md";

describe("upstream Markdown resources", () => {
  it("resolves sibling and parent documents at the synced commit", () => {
    expect(skillResourceUrl("examples.md#chat", source)).toBe("https://github.com/huggingface/skills/blob/abc123/skills/huggingface-gradio/examples.md#chat");
    expect(skillResourceUrl("../README.md", source)).toBe("https://github.com/huggingface/skills/blob/abc123/skills/README.md");
    expect(skillResourceUrl("/README.md", source)).toBe("https://github.com/huggingface/skills/blob/abc123/README.md");
  });
  it("uses raw resources for relative images and preserves external URLs", () => {
    expect(skillResourceUrl("assets/demo.png", source, true)).toBe("https://raw.githubusercontent.com/huggingface/skills/abc123/skills/huggingface-gradio/assets/demo.png");
    expect(skillResourceUrl("https://example.com/docs", source)).toBe("https://example.com/docs");
    expect(skillResourceUrl("", source)).toBe("");
  });
});
