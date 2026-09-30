import type { SkillOverlay } from "../types";

export const OFFICIAL: SkillOverlay[] = [
  {
    slug: "academy-guide",
    name: "Academy Guide",
    icon: "🎓",
    description:
      "回答「怎麼用 Claude」類問題時，推薦 Claude Academy 上相符的課程、教學與使用案例。",
  },
  {
    slug: "algorithmic-art",
    name: "Algorithmic Art",
    icon: "🎨",
    description:
      "使用 p5.js 創作演算法藝術。支援種子隨機、互動參數探索、流場、粒子系統等生成式藝術。",
  },
  {
    slug: "brand-guidelines",
    name: "Brand Guidelines",
    icon: "🏷️",
    description:
      "套用 Anthropic 官方品牌色彩與字型到各種產出物。適用於需要品牌一致性的視覺設計。",
  },
  {
    slug: "canvas-design",
    name: "Canvas Design",
    icon: "🖼️",
    description:
      "以設計哲學創作精美視覺藝術。支援 .png 和 .pdf 輸出，適用於海報、藝術作品等靜態設計。",
  },
  {
    slug: "claude-api",
    name: "Claude API",
    icon: "🔌",
    description:
      "Claude API / Anthropic SDK 參考：模型 ID、定價、參數、串流、工具呼叫、MCP、agent、快取、token 計算與模型遷移。",
  },
  {
    slug: "discernment-nudge",
    name: "Discernment Nudge",
    icon: "🧭",
    description:
      "在給出可能被採用的建議、草稿或分析後，附上 2–3 個追問，幫使用者檢視假設與判斷依據。",
  },
  {
    slug: "doc-coauthoring",
    name: "Doc Co-authoring",
    icon: "✍️",
    description:
      "結構化文件共同撰寫工作流程。適用於撰寫文件、提案、技術規格書、決策文件等。",
  },
  {
    slug: "document-skills--docx",
    name: "DOCX",
    icon: "📄",
    description:
      "Word 文件工具包（.docx）。建立/編輯文件、追蹤修訂、註解、格式保留、文字擷取。",
  },
  {
    slug: "document-skills--pdf",
    name: "PDF",
    icon: "📕",
    description:
      "PDF 操作工具包。擷取文字/表格、建立 PDF、合併/分割、填寫表單、OCR 掃描。",
  },
  {
    slug: "document-skills--pptx",
    name: "PPTX",
    icon: "📊",
    description:
      "簡報工具包（.pptx）。建立/編輯投影片、版面配置、講者備忘稿、合併/分割檔案。",
  },
  {
    slug: "document-skills--xlsx",
    name: "XLSX",
    icon: "📗",
    description:
      "試算表工具包（.xlsx/.csv）。建立/編輯含公式/格式、資料清理、圖表視覺化。",
  },
  {
    slug: "frontend-design",
    name: "Frontend Design",
    icon: "💻",
    description:
      "建立高品質前端介面與 UI 設計。支援網站、Landing Page、儀表板、React 元件等，避免制式 AI 風格。",
  },
  {
    slug: "internal-comms",
    name: "Internal Comms",
    icon: "📨",
    description:
      "撰寫各類企業內部溝通文件。狀態報告、主管更新、公司通訊、FAQ、事件報告等。",
  },
  {
    slug: "mcp-builder",
    name: "MCP Builder",
    icon: "🔌",
    description:
      "建立高品質 MCP（Model Context Protocol）伺服器。支援 Python（FastMCP）和 Node/TypeScript SDK 整合外部 API。",
  },
  {
    slug: "skill-creator",
    name: "Skill Creator",
    icon: "🧩",
    description:
      "建立新 Skill、改善現有 Skill、執行評估測試。支援從零開始建立、效能基準測試與觸發精準度優化。",
  },
  {
    slug: "slack-gif-creator",
    name: "Slack GIF Creator",
    icon: "🎬",
    description:
      "建立針對 Slack 最佳化的動畫 GIF。提供尺寸限制、驗證工具與動畫概念參考。",
  },
  {
    slug: "theme-factory",
    name: "Theme Factory",
    icon: "🎭",
    description:
      "為各種產出物套用主題樣式。內建 10 種預設主題（色彩/字型），可套用於投影片、文件、網頁等。",
  },
  {
    slug: "web-artifacts-builder",
    name: "Web Artifacts Builder",
    icon: "🌐",
    description:
      "建立複雜的多元件網頁應用。使用 React、Tailwind CSS、shadcn/ui，支援狀態管理與路由。",
  },
  {
    slug: "webapp-testing",
    name: "Webapp Testing",
    icon: "🧪",
    description:
      "使用 Playwright 測試本地網頁應用。驗證前端功能、除錯 UI 行為、擷取螢幕截圖、檢視瀏覽器日誌。",
  },
];
