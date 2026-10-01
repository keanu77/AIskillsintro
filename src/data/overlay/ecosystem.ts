import type { SkillOverlay } from "../types";

// Source-grounded Chinese introductions, reviewed 2026-10-01; no task execution.
export const ECOSYSTEM: Record<"development" | "productivity" | "data-science" | "writing", SkillOverlay[]> = {
  "development": [
    {
      "slug": "openai--figma--figma-design-to-code",
      "name": "Figma 設計轉程式",
      "icon": "💻",
      "description": "讀取 Figma 節點的設計資訊，依現有專案框架、元件與設計 token 實作介面。",
      "useCase": "把指定 Figma 畫面轉成符合現有網站規範的程式碼。",
      "limitations": "已連線的 Figma 整合 / MCP get_design_context；含 node-id 的 Figma URL；目標程式庫。 工具回傳的 React + Tailwind 是參考；需適配專案。素材 URL 約 7 天失效，提交前需保存素材。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/openai/plugins/blob/5fd93af4cd0c623e020d0cc7e9ce178b4ac1f70f/plugins/figma/skills/figma-design-to-code/SKILL.md",
      "reviewedHash": "1b242a58c431695414e557fde5b6103c3641e572b2ec0e9cb5d05d13a98dd40a"
    },
    {
      "slug": "openai--figma--figma-generate-diagram",
      "name": "FigJam 圖表產生",
      "icon": "💻",
      "description": "使用 Mermaid 語法在 FigJam 建立可編輯的流程、架構、循序、狀態、ER 或甘特圖。",
      "useCase": "把 API 呼叫流程或系統資料關係整理成可分享的 FigJam 圖。",
      "limitations": "已連線的 Figma 整合 / MCP generate_diagram；進階註記或顏色需 use_figma。 不支援圓餅圖、心智圖、類別圖等 Mermaid 類型；生成後不能靠此工具逐節點修改。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/openai/plugins/blob/5fd93af4cd0c623e020d0cc7e9ce178b4ac1f70f/plugins/figma/skills/figma-generate-diagram/SKILL.md",
      "reviewedHash": "8c39c822e52d059fc3e8f0c74e7d5420ba64b47f0c2e7e3a4f29b1e4826cb1f8"
    },
    {
      "slug": "vercel--react-best-practices",
      "name": "React 效能檢查",
      "icon": "💻",
      "description": "依 Vercel 的 React / Next.js 規則檢查資料請求、套件大小、伺服器與渲染效能。",
      "useCase": "檢查 Next.js 頁面的連續等待、重複取資料與不必要重新渲染。",
      "limitations": "可讀取的 React / Next.js 專案；技能隨附 rules 與 AGENTS.md，未要求 Vercel 帳號。 規則需配合專案版本與量測結果；閱讀規則不代表已驗證效能提升。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/vercel-labs/agent-skills/blob/063bee94c3f4df8453406c830b0a7df0f2860278/skills/react-best-practices/SKILL.md",
      "reviewedHash": "f37f741322e4c7e4affb0ead092fe049d11a4bb818bbacc886d595cf1c2a0ecd"
    },
    {
      "slug": "vercel--web-design-guidelines",
      "name": "網頁介面規範檢查",
      "icon": "💻",
      "description": "取得最新 Web Interface Guidelines，檢查指定 UI 程式並以檔案與行號回報問題。",
      "useCase": "找出無障礙、表單、焦點狀態、互動與介面效能問題。",
      "limitations": "讀取專案檔案；可抓取 https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md 的網路工具（原文寫 WebFetch）。 每次審查需重新取得規則；程式檢查不能當成完整真人無障礙驗證。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/vercel-labs/agent-skills/blob/063bee94c3f4df8453406c830b0a7df0f2860278/skills/web-design-guidelines/SKILL.md",
      "reviewedHash": "c5fe651b764793b596c5c266fdab0cd1eb5c3806edbf95d1f80a170a211ae3af"
    },
    {
      "slug": "vercel--composition-patterns",
      "name": "React 元件組合設計",
      "icon": "💻",
      "description": "利用複合元件、狀態提升與內部組合，改善 React 元件 API 和可維護性。",
      "useCase": "重構充滿 boolean props 的元件，建立可重用元件庫。",
      "limitations": "可讀取的 React 專案與隨附規則；未要求外部服務。 React 19 API 章節僅適用 React 19 以上；舊版必須略過該章節。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/vercel-labs/agent-skills/blob/063bee94c3f4df8453406c830b0a7df0f2860278/skills/composition-patterns/SKILL.md",
      "reviewedHash": "6ae24777f49e3db192e2916cacd56edca1a8d2c502033753fc3582061ec1819e"
    },
    {
      "slug": "vercel--react-native-skills",
      "name": "React Native 開發規範",
      "icon": "💻",
      "description": "整理 React Native / Expo 的清單效能、動畫、導航、圖片、原生相依套件與平台模式。",
      "useCase": "檢查手機 app 的大型清單、手勢動畫與原生模組配置。",
      "limitations": "React Native / Expo 專案；套件需求依採用規則而定，如 FlashList、Reanimated、expo-image。 面向 React Native / Expo；技能不是 iOS / Android 建置或實機測試環境。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/vercel-labs/agent-skills/blob/063bee94c3f4df8453406c830b0a7df0f2860278/skills/react-native-skills/SKILL.md",
      "reviewedHash": "81e752eb775c6ca3a1bfb947c4e1e7dfb2a859caeba504fb26fd07393a7e9121"
    }
  ],
  "productivity": [
    {
      "slug": "openai--notion--notion-knowledge-capture",
      "name": "Notion 知識整理",
      "icon": "📋",
      "description": "將對話、筆記與決策整理為可連結的 Notion 知識頁、操作指南或 FAQ。",
      "useCase": "把專案討論轉成團隊 wiki，保留決策理由與來源連結。",
      "limitations": "已連線並授權的 Notion app / MCP；讀取、新建與更新頁面工具。 受工作區工具與頁面權限限制；不是僅安裝技能就能寫入 Notion。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/openai/plugins/blob/5fd93af4cd0c623e020d0cc7e9ce178b4ac1f70f/plugins/notion/skills/notion-knowledge-capture/SKILL.md",
      "reviewedHash": "3ff3a75bc2f5bafbbb1cf2184982be6958ae5dc759fd9d82ec4d0fabdfe94382"
    },
    {
      "slug": "openai--notion--notion-meeting-intelligence",
      "name": "Notion 會議準備",
      "icon": "📋",
      "description": "整理 Notion 背景資料，依會議目標與與會者製作議程、會前閱讀與待決事項。",
      "useCase": "準備專案決策會議的背景、議題、負責人與時間分配。",
      "limitations": "已連線並授權的 Notion app / MCP；補充外部研究時另需搜尋來源。 以會前資料整理為主；不能描述成自動錄音或逐字稿工具。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/openai/plugins/blob/5fd93af4cd0c623e020d0cc7e9ce178b4ac1f70f/plugins/notion/skills/notion-meeting-intelligence/SKILL.md",
      "reviewedHash": "c53ee53a482eca7b3befdd0ee99dc77ab70cb83b85226e95ae8c3a978c96a117"
    },
    {
      "slug": "openai--notion--notion-research-documentation",
      "name": "Notion 研究彙整",
      "icon": "📋",
      "description": "從多個 Notion 頁面擷取資訊，產生附引用與來源連結的摘要、比較或研究報告。",
      "useCase": "整合散落的規格與討論，整理方案差異、證據缺口及待確認事項。",
      "limitations": "已連線並授權的 Notion app / MCP；可讀取的來源頁面及輸出目的地。 涵蓋可存取的 Notion 內容；外部搜尋結果網址不能直接當成 Notion fetch 目標。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/openai/plugins/blob/5fd93af4cd0c623e020d0cc7e9ce178b4ac1f70f/plugins/notion/skills/notion-research-documentation/SKILL.md",
      "reviewedHash": "6fa6b788a9ac20dfa6f7d901096897e7b4c1f580b49c469df36e56eb0ffcb239"
    },
    {
      "slug": "openai--notion--notion-spec-to-implementation",
      "name": "Notion 規格轉任務",
      "icon": "📋",
      "description": "將 Notion 規格拆成實作計畫、任務與進度紀錄，連結規格、計畫和任務資料庫。",
      "useCase": "把功能 PRD 拆成含驗收條件、依賴與負責人的任務。",
      "limitations": "已連線並授權的 Notion app / MCP；規格頁與任務資料庫及其 schema。 主要產出計畫與追蹤資料；不能宣稱已完成程式實作或部署。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/openai/plugins/blob/5fd93af4cd0c623e020d0cc7e9ce178b4ac1f70f/plugins/notion/skills/notion-spec-to-implementation/SKILL.md",
      "reviewedHash": "1819b251eb177863e233ba2b843a64a1e357df2c3663de96927f0f5b12f81c1e"
    }
  ],
  "data-science": [
    {
      "slug": "huggingface--hf-cli",
      "name": "Hugging Face CLI 操作",
      "icon": "🤗",
      "description": "使用 hf 命令查找、下載、上傳及管理 Hub 模型、資料集、Spaces、儲存與運算工作。",
      "useCase": "查模型資訊、下載指定檔案或整理 Hub 資料集。",
      "limitations": "本機 hf CLI 與 Hub 網路；私有資源、寫入或雲端操作另需相應登入與權限。 CLI 功能與本機版本相關；雲端工作與端點屬外部資源操作，不能視為僅產生文字。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/huggingface/skills/blob/80f9fa530e46f4ae642fcb9e1725bad0e1979395/skills/hf-cli/SKILL.md",
      "reviewedHash": "2339e14590306fbe82a64a3ffdee25a0c63e0c935ef9947072a3bc5eeb4ed251"
    },
    {
      "slug": "huggingface--huggingface-datasets",
      "name": "Hugging Face 資料集探索",
      "icon": "🤗",
      "description": "透過 Dataset Viewer API 查詢資料分割、預覽與分頁資料、搜尋篩選、Parquet 連結及統計。",
      "useCase": "先檢查公開資料集欄位與樣本，再挑選需要的資料。",
      "limitations": "可呼叫 datasets-server.huggingface.co 的 HTTP 工具；私有或 gated 資料集需 HF_TOKEN。 核心為唯讀 API 探索，資料列端點通常每頁最多 100；上傳是另列的可選流程。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/huggingface/skills/blob/80f9fa530e46f4ae642fcb9e1725bad0e1979395/skills/huggingface-datasets/SKILL.md",
      "reviewedHash": "546a3d87ea9451830eb14694da82709da1d27a8120ed8d0ff7c1be1ccd83cb4c"
    },
    {
      "slug": "huggingface--huggingface-gradio",
      "name": "Gradio 展示介面",
      "icon": "🤗",
      "description": "用 Python Gradio 建立與修改互動網頁、ML 展示、版面、事件與聊天介面。",
      "useCase": "替 Python 推論函式加上文字、圖片或聊天操作介面。",
      "limitations": "Python 與 gradio；呼叫私有 Spaces 時另需 token，純本機介面不要求 Hub 服務。 產生介面不代表模型已備妥或服務已部署；遠端檔案輸入會上傳至該伺服器。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/huggingface/skills/blob/80f9fa530e46f4ae642fcb9e1725bad0e1979395/skills/huggingface-gradio/SKILL.md",
      "reviewedHash": "e77156518143fa0f69261063523a255a27e91d767e6a839ea1dd0f7ded62f93e"
    },
    {
      "slug": "huggingface--huggingface-local-models",
      "name": "本機 GGUF 模型",
      "icon": "🤗",
      "description": "尋找適合 llama.cpp 的 GGUF 模型，依硬體挑選量化版本並啟動本機 CLI 或伺服器。",
      "useCase": "為 Mac、CPU 或 GPU 環境找出能容納的模型與正確啟動指令。",
      "limitations": "llama.cpp / llama-cli 或 llama-server；GGUF 權重與足夠 RAM / VRAM；下載需網路，gated 模型需授權。 聚焦 llama.cpp + GGUF；可用量化與速度取決於硬體，不能保證任意模型都能順暢執行。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/huggingface/skills/blob/80f9fa530e46f4ae642fcb9e1725bad0e1979395/skills/huggingface-local-models/SKILL.md",
      "reviewedHash": "ce268577c79e0c5a6023790c5c34b569dbe3f108156dc95b51b4d72a7fc62b5c"
    }
  ],
  "writing": [
    {
      "slug": "vercel--writing-guidelines",
      "name": "技術文件寫作檢查",
      "icon": "📝",
      "description": "取得最新 Vercel 寫作規範，檢查文件語氣、結構、程式範例與格式。",
      "useCase": "檢查產品文件或 README，列出可定位的文字修正建議。",
      "limitations": "讀取指定文件；可抓取 https://raw.githubusercontent.com/vercel-labs/writing-guidelines/main/command.md 的網路工具（原文寫 WebFetch）。 檢查的是 Vercel 自家寫作手冊；不能當作所有語言或文體的通用標準。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/vercel-labs/agent-skills/blob/063bee94c3f4df8453406c830b0a7df0f2860278/skills/writing-guidelines/SKILL.md",
      "reviewedHash": "715dacd67fc93a39c65183d60559335f687196ca922ec4f6a9092da744bdccc7"
    },
    {
      "slug": "huggingface--huggingface-paper-publisher",
      "name": "Hugging Face 論文管理",
      "icon": "📝",
      "description": "將 arXiv 論文建立為 Hub Paper Pages，連結模型或資料集，協助作者認領與文章樣板。",
      "useCase": "把已公開的 arXiv 論文與模型、資料集卡片連結。",
      "limitations": "腳本建議以 uv run 執行；huggingface_hub、pyyaml、requests、markdown、python-dotenv；寫入 Hub 需 HF_TOKEN write 權限。 arXiv 投稿是外部流程；作者認領須審核，不能宣稱代替期刊投稿、審查或研究驗證。",
      "reviewedAt": "2026-10-01",
      "reviewedSourceUrl": "https://github.com/huggingface/skills/blob/80f9fa530e46f4ae642fcb9e1725bad0e1979395/skills/huggingface-paper-publisher/SKILL.md",
      "reviewedHash": "8afc4704ec3b54f1ec30be9db4d249df701d878eab6897eb3d9184a1e3c07489"
    }
  ]
};
