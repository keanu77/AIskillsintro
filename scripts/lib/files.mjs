import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { validateSources } from "./sync-core.mjs";

export const DEFAULT_ROOT = path.resolve(import.meta.dirname, "../..");
export function isMain(url) { return Boolean(process.argv[1]) && pathToFileURL(path.resolve(process.argv[1])).href === url; }
export function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { if (error.code === "ENOENT" && fallback !== undefined) return fallback; throw error; }
}
export function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}
export function loadSources(root) { return validateSources(readJson(path.join(root, "content/sources.json"))); }
export function sanitizedError(error) {
  // Do not persist response bodies, arbitrary URLs or tokens from upstream errors.
  const message = String(error?.message ?? error);
  if (/GitHub HTTP \d{3}/.test(message)) return message.match(/GitHub HTTP \d{3}/)[0];
  if (/Incomplete|truncated|partial/i.test(message)) return "Incomplete GitHub results; previous candidates retained";
  if (/timeout|aborted/i.test(message)) return "GitHub request timed out";
  return "GitHub refresh failed; inspect the workflow logs";
}
