import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Representative pages: home (plain + filtered), mirrored guide, license-withheld,
// the longest guide, a renamed target, and the 404 page.
const PAGES = [
  "/",
  "/?q=rna&source=k-dense",
  "/skills/scanpy",
  "/skills/document-skills--pdf",
  "/skills/claude-api",
  "/skills/database-lookup",
  "/updates",
  "/skills/openai--notion--notion-knowledge-capture",
  "/skills/huggingface--huggingface-gradio",
  "/skills/vercel--react-best-practices",
  "/skills/does-not-exist",
];

const VIEWPORTS = [
  { name: "phone", width: 360, height: 780 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide", width: 1920, height: 1080 },
];

function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

/** Elements wider than the viewport, excluding ones inside horizontal scrollers. */
async function overflowingElements(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const scrollsX = (el: Element | null): boolean => {
      for (let n = el; n && n !== document.body; n = n.parentElement) {
        const ox = getComputedStyle(n).overflowX;
        if (ox === "auto" || ox === "scroll" || ox === "hidden" || ox === "clip") return true;
      }
      return false;
    };
    return [...document.body.querySelectorAll("*")]
      .filter((el) => el.getBoundingClientRect().right > vw + 1 && !scrollsX(el.parentElement))
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join(".")}`);
  });
}

for (const path of PAGES) {
  test.describe(path, () => {
    test("has no axe WCAG 2.1 AA violations", async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
        .analyze();
      const summary = violations.map(
        (v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`,
      );
      expect(summary).toEqual([]);
    });

    for (const vp of VIEWPORTS) {
      test(`no horizontal overflow or console errors @ ${vp.name}`, async ({ page }) => {
        const errors = collectConsoleErrors(page);
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(path);
        await page.waitForLoadState("networkidle");

        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth, `page scrolls horizontally: ${await overflowingElements(page)}`)
          .toBeLessThanOrEqual(vp.width);
        // The 404 page's own document request is the only expected failure.
        expect(errors.filter((e) => !/404/.test(e))).toEqual([]);
      });
    }
  });
}
