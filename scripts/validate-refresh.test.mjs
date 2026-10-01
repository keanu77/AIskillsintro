import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { expect, it } from "vitest";
import { validateRefresh } from "./validate-refresh.mjs";
it("runs every required check and preserves failure in the report and result", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "validate-refresh-"));
  try {
    fs.mkdirSync(path.join(root, "content"));
    fs.writeFileSync(path.join(root, "content/sync-report.md"), "Weekly report\n");
    const calls = [];
    const result = validateRefresh({ root, runner: (command, args, options) => { calls.push({ command, args, shell: options.shell }); return { status: calls.length === 2 ? 1 : 0 }; } });
    expect(result).toBe(false);
    expect(calls).toHaveLength(5);
    expect(calls.every(call => call.shell === false)).toBe(true);
    expect(fs.readFileSync(path.join(root, "content/sync-report.md"), "utf8")).toContain("typecheck | 失敗");
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

it("does not test a stale export when the build fails", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "validate-refresh-"));
  try {
    const calls = [];
    const result = validateRefresh({ root, runner: (_command, args) => {
      calls.push(args.join(" "));
      return { status: args.includes("build") ? 1 : 0 };
    } });
    expect(result).toBe(false);
    expect(calls).not.toContain("run e2e");
    expect(fs.readFileSync(path.join(root, "content/sync-report.md"), "utf8")).toContain("e2e | 略過");
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
