import { describe, expect, it } from "vitest";
import { softHyphenate } from "./softHyphenate";

const SHY = "­";
const show = (s: string) => s.replaceAll(SHY, "|");

describe("softHyphenate", () => {
  it("breaks long words before a consonant that starts a syllable", () => {
    expect(show(softHyphenate("Algorithmic Art"))).toBe("Algo|rith|mic Art");
    expect(show(softHyphenate("Discernment"))).toBe("Dis|cern|ment");
    expect(show(softHyphenate("Artifacts"))).toBe("Arti|facts");
  });

  it("does not split th / ch / sh / ph", () => {
    expect(show(softHyphenate("Pathogen"))).toBe("Patho|gen");
  });

  it("keeps at least three letters on each side of a break", () => {
    for (const part of softHyphenate("Algorithmic").split(SHY)) expect(part.length).toBeGreaterThanOrEqual(3);
  });

  it("leaves short words and non-Latin text alone", () => {
    expect(softHyphenate("Theme Factory")).toBe("Theme Factory");
    expect(softHyphenate("網頁介面規範檢查")).toBe("網頁介面規範檢查");
  });
});
