# AI Skills Catalog

每週更新的跨平台 Agent Skills 中文目錄，提供來源篩選、平台篩選、中文用途與限制、版本連結及安裝說明。

線上：https://aiskillsintro.pages.dev

## 資料來源

| 來源 | Repo |
|------|------|
| Anthropic 官方 | [anthropics/skills](https://github.com/anthropics/skills) |
| K-Dense | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) |
| OpenAI Plugins | [openai/plugins](https://github.com/openai/plugins)，第一版追蹤 Notion / Figma plugins |
| Vercel | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |
| Hugging Face | [huggingface/skills](https://github.com/huggingface/skills) |

- `content/sources.json` 是唯一的來源登錄表；新增來源同時擴充 `SourceId`。
- `npm run sync` 只同步追蹤來源，固定到 commit SHA；寫入實際目錄、skill 資料夾 hash、授權、plugin 及來源專案 stars。授權缺失、自訂或無法確認時僅提供摘要及來源連結。
- 全文保存在 `content/skills/*.md`；授權與來源證據保存在 `content/licenses/*.txt`，詳情頁可展開閱讀。
- 中文名稱、描述、分類 寫在 `src/data/overlay/<分類>.ts`。新增三個來源的第一批介紹在 `overlay/ecosystem.ts`，文件核對證據在 `content/editorial/`。
- 上游新增但缺中文 overlay 的 skill **不會直接出現在中文目錄**，而會出現在 `/updates` 的待整理清單。英文原文在 `content/upstream-descriptions.json`。
- 上游刪除或合併的 skill，舊網址在 `public/_redirects` 轉址。

## 每週更新

只有一個排程：每週一 **01:00 UTC／台灣 09:00**，由 `.github/workflows/sync.yml` 執行：

1. 同步上述五個追蹤來源。任一來源抓取失敗、tree 不完整或查無技能時，中止同步並保留原目錄。
2. 以 GitHub repository search 搜尋 Agent Skills 主題與關鍵字。篩選至少 50 stars、非 fork、未封存的專案；排除已追蹤來源，最多檢查 10 個專案，確認存在 SKILL.md。這是發掘線索，不是實測推薦或全面網路搜尋。
3. 寫入 `src/data/discovery.json` 及最近 12 次的 `src/data/updates.json`，並產生 `content/sync-report.md`。候選專案只提供來源連結，不會被自動安裝、執行或加入推薦目錄。
4. 執行 lint、typecheck、test、build、e2e，建立／更新 `bot/upstream-sync` PR。驗證失敗會在 PR 記錄並令 workflow 失敗。
5. 維護者審閱後合併，沿用 main CI 發布；**沒有自動合併**。尚未合併的快照不會改變正式站。

同步 PR 要能觸發必要檢查（`verify`、`lighthouse`），需要 repo secret `SYNC_PR_TOKEN`：建立 [fine-grained PAT](https://github.com/settings/personal-access-tokens/new)，Repository access 只選本 repo，權限 Contents 與 Pull requests 設為 Read and write，再到 Settings → Secrets and variables → Actions 新增。未設定時改用 `GITHUB_TOKEN` 開 PR，CI 不會自動執行，需要把 PR 關掉再重開。PAT 到期前記得換新。

搜尋暫時失敗時，保留上次成功結果及原日期，標示 `stale`；不把失敗寫成零候選的成功結果。來源快照本身可以繼續審閱。`content/weekly-baselines/` 保留同日第一次同步前的資料，確保同日重跑的差異一致；`baseline: true` 表示首次啟用紀錄，既有項目不會冒充新增。

```bash
# 登入 gh 後執行；token 只透過環境變數傳入，請勿寫入檔案。
GITHUB_TOKEN="$(gh auth token)" npm run refresh
```

此版本使用 GitHub API，不需要 LLM API key、搜尋付費方案或 skills.sh 認證。中文介紹為人工整理，不會每週覆蓋；原始 skill hash 改變時，已標記 `reviewedHash` 的介紹會提示待複核。

## 平台與推薦標示

- 平台選項包括 Claude Code、Codex、Gemini CLI、Cursor、Grok Build；篩選只使用來源文件明列的平台。沒有宣告的項目仍可從全部目錄瀏覽，不能解讀為不相容。
- 支援宣告以 `content/sources.json` 的 `declaredAgents` 與 `docsUrl` 為依據，需要人工核對，不由安裝指令反推。
- 安裝指令是使用方法，並非測試結果。OpenAI plugin 使用完整 plugin 安裝指引，保留連接器依賴；其他技能的通用指令在未知平台上標示未確認。
- 所有技能都標示尚未任務實測。GitHub stars 是整個來源專案的數字，非個別技能評分或推薦人數。
- 新的推薦介紹請附 `useCase`、`limitations`、`reviewedAt`、`reviewedSourceUrl`、`reviewedHash`；至少核對來源用途、依賴及平台文件。

## 開發

```bash
npm ci
npm run dev      # http://localhost:3000
npm test         # vitest
npm run lint
npm run typecheck
npm run build    # 靜態輸出到 out/
```

`tests/browser-smoke.py` 提供桌面／390px 手機、篩選分享連結、plugin 安裝邊界、候選頁與無 JS 內容檢查；需 Python Playwright 與 Chrome，並以支援 `/path` → `path.html` 的伺服器提供 `out/`。設定 `SITE_BASE` 可指向 PR 預覽站，`SMOKE_OUTPUT` 指定截圖目錄。

```bash
python3 tests/serve-export.py --port 4327
# 另一個終端機，以安裝有 Playwright 的 Python 執行：
python3 tests/browser-smoke.py
```

## 部署

Cloudflare Pages（Direct Upload 專案 `aiskillsintro`）由 `.github/workflows/ci.yml` 部署：

- PR：lint / typecheck / test / build / e2e 通過後部署到 `pr-<編號>.aiskillsintro.pages.dev`，並在 PR 留言附網址。
- push 到 `main`：部署正式站。
- 需要 repo secret `CLOUDFLARE_API_TOKEN`（權限：Account → Cloudflare Pages → Edit）；未設定時只跑檢查、跳過部署。

效能以 `.github/workflows/lighthouse.yml` 為準（不要量預覽站，網路浮動大）：PR 上 build 後用 `scripts/serve-static.mjs`（gzip）起站，
`/`、`/skills/scanpy`、`/skills/claude-api`、`/updates` 各跑 5 次取中位數，performance < 95 或 accessibility < 100 即失敗。
本機重現：`npm run build && npx @lhci/cli@0.15.1 autorun`（設定在 `lighthouserc.json`）。

`GITHUB_TOKEN=$(gh auth token) npm run sync` 可避開 GitHub API 匿名限流。
