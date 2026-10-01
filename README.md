# AI Skills Catalog

可搜尋、分類瀏覽的 Agent Skills 中文目錄，每個 skill 附 Claude Code / Codex / Gemini CLI / Grok 的安裝指令。

線上：https://aiskillsintro.pages.dev

## 資料來源

| 來源 | Repo |
|------|------|
| Anthropic 官方 | [anthropics/skills](https://github.com/anthropics/skills) |
| K-Dense | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) |

- `npm run sync` 從上游抓 SKILL.md → `content/skills/*.md`（授權為 proprietary / all rights reserved 的只列摘要、不轉載全文），並寫入 `src/data/upstream.json`（commit SHA、授權、plugin）。
- 中文名稱、描述、分類 寫在 `src/data/overlay/<分類>.ts`。
- 上游新增 skill 後，`npm test` 會列出缺中文 overlay 的 slug；英文原文在 `content/upstream-descriptions.json`。
- 上游刪除或合併的 skill，舊網址在 `public/_redirects` 轉址。

## 開發

```bash
npm ci
npm run dev      # http://localhost:3000
npm test         # vitest
npm run build    # 靜態輸出到 out/
```

## 部署

Cloudflare Pages（Direct Upload 專案 `aiskillsintro`）由 `.github/workflows/ci.yml` 部署：

- PR：lint / typecheck / test / build 通過後部署到 `pr-<編號>.aiskillsintro.pages.dev`，並在 PR 留言附網址。
- push 到 `main`：部署正式站。
- 需要 repo secret `CLOUDFLARE_API_TOKEN`（權限：Account → Cloudflare Pages → Edit）；未設定時只跑檢查、跳過部署。

`GITHUB_TOKEN=$(gh auth token) npm run sync` 可避開 GitHub API 匿名限流。
