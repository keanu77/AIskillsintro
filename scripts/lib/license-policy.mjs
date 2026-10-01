import fs from "node:fs";

const IDS = ["MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "CC0-1.0", "CC-BY-4.0", "CC-BY-SA-4.0", "0BSD", "Unlicense"];
const ALIASES = new Map(IDS.flatMap(id => [[id.toLowerCase(), id], [`${id.toLowerCase()} license`, id]]));
for (const [alias, id] of [
  ["apache license 2.0", "Apache-2.0"], ["apache license, version 2.0", "Apache-2.0"],
  ["bsd 2-clause license", "BSD-2-Clause"], ["bsd 3-clause license", "BSD-3-Clause"],
  ["cc0 1.0 universal", "CC0-1.0"], ["creative commons zero v1.0 universal", "CC0-1.0"],
]) ALIASES.set(alias, id);
const RESTRICTED = /proprietary|redistribution\s+(?:is\s+)?prohibited|may not (?:redistribute|distribute)|all rights reserved|(?:research|educational|personal|non-commercial|noncommercial)\s+(?:use\s+)?only|commercial use requires|separate agreement/i;
const REFERENCE = /^(?:(?:complete |full )?terms (?:in|at)|see(?: the)?)\s+LICENSE(?:\.txt|\.md)?[.]?$/i;

// Explicitly reviewed attribution lines from the fixed sources and templates.
// Do not generalize this to an owner-name regex: prose on the same line can
// impose new restrictions. New owners or years require review before mirroring.
const REVIEWED_ATTRIBUTIONS = new Map([
  ["MIT", new Set([
    "Copyright (c) 2015, Jon Schlinkert.",
    "Copyright (c) 2025 K-Dense Inc.",
    "Copyright (c) 2026 Beifang Niu",
    "Copyright 2025 Notion Labs, Inc.",
  ])],
  ["Apache-2.0", new Set([
    "Copyright 2026 Anthropic, PBC.",
    "Copyright [yyyy] [name of copyright owner]",
  ])],
]);

function declaration(text) { return ALIASES.get(text?.trim().toLowerCase()) ?? null; }
function normalizeLicense(text, id) {
  const lines = text.replace(/\r\n/g, "\n").trim().split("\n");
  return lines.filter(line => {
    const value = line.trim();
    if (id === "MIT" && /^(?:The )?MIT License(?: \(MIT\))?$/.test(value)) return false;
    if (REVIEWED_ATTRIBUTIONS.get(id)?.has(value)) return false;
    return true;
  }).join(" ").replace(/\s+/g, " ").trim();
}
const TEMPLATES = new Map(["MIT", "Apache-2.0"].map(id => {
  const text = fs.readFileSync(new URL(`../licenses/${id}.txt`, import.meta.url), "utf8");
  const full = normalizeLicense(text, id);
  return [id, [full, ...(id === "Apache-2.0" ? [full.split(" APPENDIX:")[0]] : [])]];
}));
function licenseFile(text) {
  if (!text || RESTRICTED.test(text)) return null;
  const exact = declaration(text);
  if (exact) return exact;
  for (const [id, templates] of TEMPLATES) if (templates.includes(normalizeLicense(text, id))) return id;
  return null;
}

export function licenseDecision(frontmatterLicense, files = []) {
  const nearest = files[0] ?? null;
  const declared = frontmatterLicense?.trim() || null;
  const explicit = declared && !REFERENCE.test(declared);
  const fromFile = nearest ? licenseFile(nearest.text) : null;
  const license = explicit ? declaration(declared) : fromFile;
  const reason = !license ? (explicit ? "unrecognized-declaration" : nearest ? "unrecognized-license-file" : "missing-license") :
    nearest && !fromFile ? "unrecognized-license-file" : "recognized-open-license";
  return {
    license: license ?? declared ?? null,
    mirrored: reason === "recognized-open-license",
    evidence: explicit ? { path: "SKILL.md frontmatter", text: declared } : nearest,
    reason,
  };
}
export function isRedistributable(frontmatterLicense, licenseText) {
  return licenseDecision(frontmatterLicense, licenseText ? [{ path: "LICENSE", text: licenseText }] : []).mirrored;
}
