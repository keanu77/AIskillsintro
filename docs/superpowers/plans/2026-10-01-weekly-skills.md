# Weekly Skills Implementation Plan

> **For agentic workers:** Use subagent-driven-development for isolated implementation and sequential spec / quality review. User approved the design in conversation; proceed without another approval gate.

**Goal:** 每週同步與發掘跨平台 skills，以繁體中文呈現來源依據及更新紀錄。

**Architecture:** 靜態 JSON snapshots + 人工中文 overlay；GitHub API 只讀蒐集，週排程開 PR，合併後沿用 CI 部署。

**Tech Stack:** Next.js 16 / React / TypeScript / Node.js scripts / Vitest / GitHub Actions.

- [x] Task 1 — `content/sources.json`, `scripts/lib/sync-core.mjs`, `scripts/sync-skills.mjs`: source registry、巢狀 skill path、namespaced slug、保守授權處理、folder hash、repository metrics；fixture tests 驗證舊網址與新命名。
- [x] Task 2 — `scripts/discover-skills.mjs`, `scripts/weekly-update.mjs`: 每週 GitHub search、受限候選數、SHA 固定的 SKILL.md 存在檢查；失敗保留快照；寫 `src/data/discovery.json`, `src/data/updates.json` 與 `content/sync-report.md`。測試去重、首次基線、重跑一致、變更與 stale 狀態。
- [x] Task 3 — `src/data/types.ts`, `src/data/sources.ts`, `src/data/overlay/ecosystem.ts`, `src/data/skills.ts`, `src/lib/installCommands.ts`, `src/lib/catalogFilter.ts`: 加入來源、平台、證據、人工挑選內容；未知 skill 留待整理；指令使用真實 path 且 plugin 保留完整依賴。測試 URL round trip、invalid params、unknown platform 及 plugin 安裝。
- [x] Task 4 — `src/components/catalog/*`, `src/components/detail/SkillEvidence.tsx`, `src/components/shared/Installation.tsx`, `src/app/updates/page.tsx`, `src/app/sitemap.ts`: 可分享平台篩選、來源標籤、相容性狀態、候選與更新頁。手機桌面手動瀏覽檢查。
- [x] Task 5 — `.github/workflows/sync.yml`, `package.json`, `README.md`: 單一週排程跑完整 refresh，驗證後開 PR、驗證失敗明確失敗，說明週更新仍需合併發布。
- [x] Task 6 — `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`; live API smoke for weekly refresh; offline build and browser smoke; spec review then quality review; local checks complete; branch and draft PR handoff follow these checks. Validation details: `docs/verification/2026-10-01-weekly-v1.md`.

## Data contracts

Source registry: `id,label,repo,icon,blurb,kind,skillsDir,layout,namespace,declaredAgents,docsUrl,includePlugins?,exclude?,marketplace?`.

Manifest skill additions: `path,contentHash,compatibility,declaredAgents,installMode` (alongside existing slug/source/dir/name/license/plugin/mirrored). Source metadata additions: `stars,pushedAt,observedAt`.

Discovery snapshot: `{ checkedAt, status: "ok" | "stale", attemptedAt, queries, error: string | null, candidates: [{repo,url,description,stars,pushedAt,sha,skillPaths,discoveredAt}] }`.

Update history: `{runs:[{date,baseline,added:string[],changed:string[],removed:string[],total:number}]}` newest first, 12 entries. Multiple refreshes on one date retain that date's original baseline for a consistent report.
