import type { SkillOverlay } from "../types";

export const PRODUCTIVITY: SkillOverlay[] = [
  {
    slug: "autoskill",
    name: "Autoskill",
    icon: "🪄",
    description:
      "透過 screenpipe 觀察螢幕上重複的研究流程，比對既有 skill，並草擬尚未涵蓋的新 skill。",
  },
  {
    slug: "benchling-integration",
    name: "Benchling Integration",
    icon: "🔗",
    description:
      "Benchling R&D 平台整合。存取登記表（DNA、蛋白質）、庫存、電子實驗記錄本、工作流程。",
  },
  {
    slug: "consciousness-council",
    name: "Consciousness Council",
    icon: "🏛️",
    description:
      "召開多視角「心智議會」討論任何問題或決策，提供多元觀點、魔鬼代言人與綜合建議。",
  },
  {
    slug: "dhdna-profiler",
    name: "DHDNA Profiler",
    icon: "🧠",
    description:
      "從文字萃取思考模式與認知風格指紋，分析、比較不同人的推理方式。",
  },
  {
    slug: "dnanexus-integration",
    name: "Dnanexus Integration",
    icon: "🔗",
    description:
      "DNAnexus 雲端基因體平台。建構應用程式、管理資料、dxpy SDK、執行工作流程。",
  },
  {
    slug: "exploratory-data-analysis",
    name: "Exploratory Data Analysis",
    icon: "🔎",
    description:
      "對科學資料檔案執行綜合探索性資料分析，支援 200+ 檔案格式。理解資料結構、內容與品質。",
  },
  {
    slug: "fictiv",
    name: "Fictiv",
    icon: "🏭",
    description:
      "在瀏覽器中端到端操作 Fictiv 代工平台：上傳 CAD、設定製程材料、取得報價、處理 DFM 回饋與追蹤訂單。",
  },
  {
    slug: "get-available-resources",
    name: "Get Available Resources",
    icon: "💻",
    description:
      "偵測與報告可用系統資源（CPU 核心、GPU、記憶體、磁碟空間），適合運算密集任務前使用。",
  },
  {
    slug: "lab-hardware-cad",
    name: "Lab Hardware CAD",
    icon: "🔧",
    description:
      "用 build123d 參數化設計實驗室硬體，輸出 STEP/STL/DXF：微流道晶片、光學支架、試管架、3D 列印治具。",
  },
  {
    slug: "labarchive-integration",
    name: "Labarchive Integration",
    icon: "📓",
    description:
      "電子實驗記錄本 API 整合。存取筆記本、管理條目/附件、備份筆記本，整合 Protocols.io/Jupyter。",
  },
  {
    slug: "latchbio-integration",
    name: "Latchbio Integration",
    icon: "🔗",
    description:
      "Latch 生物資訊工作流程平台。Latch SDK 建構管線、部署無伺服器工作流程、Nextflow/Snakemake 整合。",
  },
  {
    slug: "latex-posters",
    name: "Latex Posters",
    icon: "🪧",
    description:
      "使用 LaTeX 建立專業研究海報（beamerposter、tikzposter、baposter），適合學術會議與科學傳播。",
  },
  {
    slug: "liteparse",
    name: "LiteParse",
    icon: "📄",
    description:
      "本地解析 PDF、Office 與圖片，輸出含座標框的文字與版面 JSON，支援 OCR 與批次匯入供 RAG 使用。",
  },
  {
    slug: "market-research-reports",
    name: "Market Research Reports",
    icon: "📊",
    description:
      "生成顧問等級市場研究報告（50+ 頁），專業 LaTeX 排版，含視覺化與資料分析。",
  },
  {
    slug: "markitdown",
    name: "Markitdown",
    icon: "📝",
    description:
      "將檔案與辦公文件轉換為 Markdown。支援 PDF、DOCX、PPTX、XLSX、圖片（OCR）、音訊（轉錄）等。",
  },
  {
    slug: "omero-integration",
    name: "Omero Integration",
    icon: "🔬",
    description:
      "顯微鏡資料管理平台。透過 Python 存取影像、擷取資料集、分析像素、管理 ROI/標註。",
  },
  {
    slug: "opentrons-integration",
    name: "Opentrons Integration",
    icon: "🤖",
    description:
      "Opentrons OT-2 與 Flex 機器人的官方 Protocol API。撰寫實驗室自動化協定。",
  },
  {
    slug: "pi-agent",
    name: "Pi Agent",
    icon: "🥧",
    description:
      "使用與擴充 Pi 極簡終端 coding harness：安裝、設定模型供應商、建立 skill/擴充套件與 SDK 整合。",
  },
  {
    slug: "pptx-posters",
    name: "PPTX Posters",
    icon: "🪧",
    description:
      "使用 HTML/CSS 建立研究海報，可匯出為 PDF 或 PPTX。僅在使用者明確要求 PowerPoint 格式時使用。",
  },
  {
    slug: "protocolsio-integration",
    name: "Protocolsio Integration",
    icon: "📋",
    description:
      "整合 protocols.io API。搜尋、建立、更新或發布科學實驗協定，管理步驟與材料。",
  },
  {
    slug: "scientific-slides",
    name: "Scientific Slides",
    icon: "📽️",
    description:
      "為研究演講建立投影片。會議簡報、研討會報告、論文口試投影片，或任何科學簡報。",
  },
  {
    slug: "statistical-analysis",
    name: "Statistical Analysis",
    icon: "📈",
    description:
      "引導式統計分析，含檢定選擇與報告。協助選擇適當檢定、假設檢查、檢定力分析、APA 格式結果。",
  },
  {
    slug: "what-if-oracle",
    name: "What-If Oracle",
    icon: "🔮",
    description:
      "結構化 What-If 情境分析：探索最佳、可能、最差、黑天鵝等 4–6 條分支，用於決策壓力測試。",
  },
];
