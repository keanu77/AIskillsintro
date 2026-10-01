# 每週跨平台 Skills 目錄第一版

使用者已同意 2026-10-01 的分析方案，並指定所有更新每週一次。沿用 Next.js 靜態輸出、GitHub Actions 與 Cloudflare Pages；不新增常駐後端或付費模型依賴。

## 範圍與資料

- 保留既有 Anthropic / K-Dense 的網址與人工中文 overlay。新增 OpenAI Plugins（目前官方 skills repository 已棄用）、Vercel、Hugging Face。
- 單一 `content/sources.json` 定義來源名稱、repo、目錄布局、允許收錄的 plugin、來源文件及作者宣告的平台。所有新來源使用命名空間，避免同名衝突。
- `upstream.json` 保留 commit、skill 真實相對路徑、skill 資料夾內容 hash、授權與平台宣告；source 加入 repository stars（清楚標示為整庫）與觀察日期。
- 新來源先人工整理一批中文介紹、適用任務與限制。每週新增但尚無中文 overlay 的 skill 留在待整理清單，不自動宣稱已推薦或已實測，也不阻擋已發布項目的更新。
- 每週以 GitHub repository search 查詢 skills 主題及關鍵字，去除 fork、archived、已追蹤來源和重複項目；限量確認 SKILL.md 確實存在。公開候選區只顯示來源連結、stars、發現日期與待評估標記，不產生安裝指令。
- 搜尋失敗保留上一次成功的資料與原日期，明示失敗；已追蹤來源失敗則同步整體中止，不刪除舊資料。

## 使用者介面

- 首頁增加平台篩選、來源標籤、每週更新入口；保留現有分類與搜尋。
- 詳情頁列收錄依據、來源、作者宣告的平台、尚未實測、限制、觀察日期。安裝 UI 明示未確認的平台；OpenAI plugin 只提供整包安裝指引，避免遺漏 MCP / app 依賴。
- `/updates` 展示最近 12 次同步的新增、變更、移除及待整理資料，並列出本次搜尋候選；基線只列作基線，不把既有目錄冒充新發布。
- 所有新頁面使用繁體中文，手機可用，靜態 HTML 能看到內容與來源。

## 更新與發布

唯一排程為每週一 01:00 UTC（台灣 09:00）。一次執行同步、搜尋與紀錄，建立同一個 PR。測試失敗的 PR 留作檢查並讓 workflow 失敗，禁止自動合併。既有 main CI 在合併後部署；本次交付以分支與可審查 PR 為界，正式合併是發布步驟。

## 檢查

以 fixture 驗證命名衝突、巢狀路徑、授權不明不鏡像、變更紀錄、搜尋去重/失敗保留、平台 URL round trip 與 plugin 安裝邊界。執行 lint、typecheck、完整測試、靜態 build，再檢查桌面/手機篩選、更新頁與代表性詳情頁。公開推薦標記不宣稱未進行的 skill 任務測試。
