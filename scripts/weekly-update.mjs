#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { syncCatalog } from "./sync-skills.mjs";
import { discoverSkills } from "./discover-skills.mjs";
import { DEFAULT_ROOT, isMain, readJson, sanitizedError, writeJson } from "./lib/files.mjs";
import { isSafeName } from "./lib/sync-core.mjs";

const COMPARED_FIELDS = ["source", "dir", "name", "license", "plugin", "mirrored", "path", "compatibility", "declaredAgents", "installMode", "contentHash", "bodyHash"];
function captureCatalog(root, manifest) {
  return manifest.skills.map(skill => {
    if (!isSafeName(skill.slug)) throw new Error("Unsafe catalog slug");
    const snapshot = { slug: skill.slug };
    for (const field of COMPARED_FIELDS) if (Object.hasOwn(skill, field)) snapshot[field] = skill[field];
    const file = path.join(root, "content/skills", `${skill.slug}.md`);
    if (skill.mirrored && fs.existsSync(file)) snapshot.bodyHash = createHash("sha256").update(fs.readFileSync(file)).digest("hex");
    return snapshot;
  });
}
function changes(before, after) {
  const old = new Map(before.map(skill => [skill.slug, skill]));
  const current = new Map(after.map(skill => [skill.slug, skill]));
  return {
    added: [...current.keys()].filter(slug => !old.has(slug)).sort(),
    changed: after.filter(skill => {
      const prior = old.get(skill.slug);
      // New evidence fields on the migration run do not imply changed content.
      return prior && COMPARED_FIELDS.some(field => Object.hasOwn(prior, field) && Object.hasOwn(skill, field) && JSON.stringify(prior[field]) !== JSON.stringify(skill[field]));
    }).map(skill => skill.slug).sort(),
    removed: [...old.keys()].filter(slug => !current.has(slug)).sort(),
    total: after.length,
  };
}
function renderReport(run, manifest, discovery) {
  const list = slugs => slugs.length ? slugs.map(slug => `\`${slug}\``).join(", ") : "無";
  return [
    `# 每週 Skills 更新 — ${run.date}`, "",
    `固定來源：${manifest.sources.length} 個；上游項目：${run.total} 個 Skills。`,
    ...(run.baseline ? ["首次建立比較基準；既有 Skills 不列為新增，新來源內容仍列入本次差異。"] : []), "",
    `- 新增（${run.added.length}）：${list(run.added)}`,
    `- 內容／中繼資料更新（${run.changed.length}）：${list(run.changed)}`,
    `- 移除（${run.removed.length}）：${list(run.removed)}`, "",
    ...manifest.sources.map(source => `- ${source.repo}: \`${source.sha}\``), "",
    `GitHub 候選探索：${discovery.status}；保留 ${discovery.candidates.length} 個候選。`,
    `最近成功確認：${discovery.checkedAt ?? "尚未成功"}。`,
    ...(discovery.error ? [`探索錯誤：${discovery.error}。既有候選保留，本次固定來源更新仍可審閱。`] : []), "",
    "新增項目中，尚無中文介紹者維持待整理狀態；中文摘要與人工審閱由維護者處理。程式僅讀取來源資料，未執行上游 Skill。", "",
    "## 驗證", "", "檢查結果由工作流程附於下方（lint、typecheck、test、build、e2e）。", "",
  ].join("\n");
}

export async function refreshWeekly({ root = DEFAULT_ROOT, now = new Date().toISOString(), sync = syncCatalog, discover = discoverSkills } = {}) {
  const date = now.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Invalid refresh date");
  const reportPath = path.join(root, "content/sync-report.md");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  try {
    const historyPath = path.join(root, "src/data/updates.json");
    const history = readJson(historyPath, { runs: [] });
    const priorRun = history.runs.find(run => run.date === date);
    const baselinePath = path.join(root, "content/weekly-baselines", `${date}.json`);
    const original = readJson(baselinePath, null);
    if (priorRun && !original) throw new Error("Missing same-day baseline snapshot");
    const previous = readJson(path.join(root, "src/data/upstream.json"), { skills: [] });
    const baseline = original ?? { date, skills: captureCatalog(root, previous) };
    const manifest = await sync({ root, now });
    const discovery = await discover({ root, now });
    const run = { date, baseline: priorRun?.baseline ?? history.runs.length === 0, ...changes(baseline.skills, captureCatalog(root, manifest)) };
    const runs = [run, ...history.runs.filter(item => item.date !== date)].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12);
    writeJson(baselinePath, baseline);
    writeJson(historyPath, { runs });
    const retainedDates = new Set(runs.map(item => `${item.date}.json`));
    for (const file of fs.readdirSync(path.dirname(baselinePath))) {
      if (/^\d{4}-\d{2}-\d{2}\.json$/.test(file) && !retainedDates.has(file)) fs.unlinkSync(path.join(path.dirname(baselinePath), file));
    }
    fs.writeFileSync(reportPath, renderReport(run, manifest, discovery));
    return { run, discovery, manifest };
  } catch (error) {
    fs.writeFileSync(reportPath, `# 每週 Skills 更新 — ${date}\n\n固定來源更新或紀錄產生失敗：${sanitizedError(error)}。\n\n未產生本次成功紀錄，請檢查工作流程。\n`);
    throw error;
  }
}
if (isMain(import.meta.url)) refreshWeekly().then(({ run, discovery }) => {
  console.log(`${run.date}: ${run.added.length} added, ${run.changed.length} changed, ${run.removed.length} removed; discovery ${discovery.status}.`);
}).catch(error => { console.error(`weekly refresh failed: ${sanitizedError(error)}`); process.exitCode = 1; });
