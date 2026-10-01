import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { refreshWeekly } from "./weekly-update.mjs";
const roots = [];
const base = { slug: "existing", source: "a", dir: "existing", name: "Existing", license: "MIT", plugin: null, mirrored: false };
function fixture(skills = [base]) { const root = fs.mkdtempSync(path.join(os.tmpdir(), "weekly-")); roots.push(root); fs.mkdirSync(path.join(root, "src/data"), { recursive: true }); fs.mkdirSync(path.join(root, "content"), { recursive: true }); fs.writeFileSync(path.join(root, "src/data/upstream.json"), JSON.stringify({ syncedAt: "2026-09-01", sources: [], skills })); return root; }
const discover = async () => ({ checkedAt: "2026-10-01", status: "ok", candidates: [] });
const synced = skills => async ({ root }) => { const manifest = { syncedAt: "2026-10-01", sources: [{ id: "a", repo: "owner/repo", sha: "a".repeat(40) }], skills }; fs.writeFileSync(path.join(root, "src/data/upstream.json"), JSON.stringify(manifest)); return manifest; };
afterEach(() => roots.splice(0).forEach(root => fs.rmSync(root, { recursive: true, force: true })));
describe("weekly change history", () => {
  it("initializes against existing skills without claiming they are new or changed only due to new metadata", async () => {
    const root = fixture();
    const result = await refreshWeekly({ root, now: "2026-10-01T00:00:00Z", sync: synced([{ ...base, contentHash: "first", path: "skills/existing", compatibility: null }, { ...base, slug: "new" }]), discover });
    expect(result.run).toEqual({ date: "2026-10-01", baseline: true, added: ["new"], changed: [], removed: [], total: 2 });
    const report = fs.readFileSync(path.join(root, "content/sync-report.md"), "utf8");
    expect(report).toContain("上游項目：2 個 Skills");
    expect(report).toContain("尚無中文介紹者維持待整理狀態");
  });
  it("preserves the original delta on same-day reruns and notices later content changes", async () => {
    const root = fixture([{ ...base, contentHash: "one" }]);
    const skills = [{ ...base, contentHash: "two" }, { ...base, slug: "new", contentHash: "new" }];
    await refreshWeekly({ root, now: "2026-10-01T00:00:00Z", sync: synced(skills), discover });
    const result = await refreshWeekly({ root, now: "2026-10-01T06:00:00Z", sync: synced(skills), discover });
    expect(result.run).toMatchObject({ added: ["new"], changed: ["existing"] });
    expect(JSON.parse(fs.readFileSync(path.join(root, "src/data/updates.json"))).runs).toHaveLength(1);
  });
  it("records removals, ignores timestamps and retains only twelve runs", async () => {
    const root = fixture([{ ...base, contentHash: "one" }, { ...base, slug: "gone" }]);
    for (let day = 1; day <= 13; day++) await refreshWeekly({ root, now: `2026-10-${String(day).padStart(2, "0")}T00:00:00Z`, sync: synced([{ ...base, contentHash: "one" }]), discover });
    const history = JSON.parse(fs.readFileSync(path.join(root, "src/data/updates.json")));
    expect(history.runs).toHaveLength(12);
    expect(history.runs[0]).toMatchObject({ date: "2026-10-13", added: [], changed: [], removed: [] });
    expect(fs.readdirSync(path.join(root, "content/weekly-baselines"))).toHaveLength(12);
  });
  it("continues fixed-source updates with a visibly stale discovery report", async () => {
    const root = fixture();
    await refreshWeekly({ root, now: "2026-10-01T00:00:00Z", sync: synced([base]), discover: async () => ({ checkedAt: "2026-09-20", status: "stale", error: "GitHub HTTP 403", candidates: [] }) });
    expect(fs.readFileSync(path.join(root, "content/sync-report.md"), "utf8")).toContain("stale");
  });
  it("writes a failure report but no history when fixed sources fail", async () => {
    const root = fixture();
    await expect(refreshWeekly({ root, sync: async () => { throw new Error("GitHub HTTP 403"); }, discover })).rejects.toThrow("403");
    expect(fs.existsSync(path.join(root, "src/data/updates.json"))).toBe(false);
    expect(fs.readFileSync(path.join(root, "content/sync-report.md"), "utf8")).toContain("失敗");
  });
});
