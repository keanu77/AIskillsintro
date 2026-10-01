#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { DEFAULT_ROOT, isMain } from "./lib/files.mjs";

const CHECKS = [
  ["lint", "npm", ["run", "lint"]],
  ["typecheck", "npm", ["run", "typecheck"]],
  ["test", "npm", ["test"]],
  ["build", "npm", ["run", "build"]],
  ["e2e", "npm", ["run", "e2e"]],
];
export function validateRefresh({ root = DEFAULT_ROOT, runner = spawnSync } = {}) {
  const rows = [];
  let passed = true;
  let buildPassed = false;
  for (const [label, command, args] of CHECKS) {
    if (label === "e2e" && !buildPassed) {
      passed = false;
      rows.push("| e2e | 略過（build 未通過，避免測到舊輸出） |");
      continue;
    }
    const result = runner(command, args, { cwd: root, shell: false, stdio: "inherit", timeout: 10 * 60 * 1000 });
    const success = result.status === 0;
    if (label === "build") buildPassed = success;
    passed &&= success;
    rows.push(`| ${label} | ${success ? "通過" : "失敗"} |`);
  }
  const reportPath = path.join(root, "content/sync-report.md");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.appendFileSync(reportPath, ["", "## 自動檢查結果", "", "| 檢查 | 結果 |", "| --- | --- |", ...rows, "", passed ? "所有必要檢查通過。" : "有必要檢查失敗；此 PR 需修正後重新驗證。詳見工作流程紀錄。", ""].join("\n"));
  return passed;
}
if (isMain(import.meta.url) && !validateRefresh()) process.exitCode = 1;
