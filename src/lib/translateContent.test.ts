import { describe, expect, it } from "vitest";
import { translateContent } from "./translateContent";

describe("translateContent install headings", () => {
  it("labels upstream install sections as the tool's own installation", () => {
    expect(translateContent("## Installation\n\nuv pip install scanpy")).toContain("## 工具本身的安裝");
    expect(translateContent("### Installation\n")).toContain("### 工具本身的安裝");
    expect(translateContent("## Install\n")).toContain("## 工具本身的安裝");
    expect(translateContent("## Installation and Setup\n")).toContain("## 工具本身的安裝與設定");
    expect(translateContent("## Installation and Authentication\n")).toContain("## 工具本身的安裝與驗證");
  });

  it("never reuses the install panel's wording for upstream sections", () => {
    expect(translateContent("## Installation\n")).not.toMatch(/安裝方式|安裝這個 skill/);
  });

  it("leaves code blocks untouched", () => {
    const code = "```\n## Installation\n```";
    expect(translateContent(code)).toBe(code);
  });
});
