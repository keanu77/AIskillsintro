import type { SkillOverlay } from "../types";

export const VISUALIZATION: SkillOverlay[] = [
  {
    slug: "generate-image",
    name: "Generate Image",
    description:
      "使用 AI 模型（FLUX、Gemini）生成或編輯圖片。照片、插圖、藝術作品、視覺素材、概念藝術。",
    useCase: "用一句描述透過 OpenRouter 生成海報主視覺、插圖或向量 logo，或以參考圖修圖與合成，執行後印出每次花費。",
    limitations: "需 OpenRouter API 金鑰，生成按次付費；可用參數依模型而異；圖中文字常出錯；生成圖僅為示意，不可當實驗數據；參考圖會上傳，勿傳病人影像或未發表資料。",
    starterPrompt: "用 generate-image 生成一張 16:9 的 <清晨跑者> 寫實照片，右側留白放標題、不要文字。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/generate-image/SKILL.md",
    reviewedHash: "3b8ecd617f5b7ee9c44a32309908bb5e87ef444863b8a040c8eea35e3ef0c12c",
  },
  {
    slug: "infographics",
    name: "Infographics",
    description:
      "使用 AI 建立專業資訊圖表。整合研究查詢與網路搜尋取得準確資料，支援 10+ 佈局風格。",
    useCase: "輸入主題與類型（時間軸、比較、統計等），由 AI 生成資訊圖表，評分未達門檻時自動重繪，可選先查資料。",
    limitations: "需設定 API 金鑰；圖中數字、單位、標籤與來源須人工逐一比對，AI 品質分數不等於事實查核；技術流程圖或生物路徑圖應改用 scientific-schematics。",
    starterPrompt: "用 infographics 做一張 <五個降低跑步受傷風險的習慣> 的 list 型資訊圖表，用 wong 色盲友善配色。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/infographics/SKILL.md",
    reviewedHash: "7de114942c62b9429975f815a0d517c6105a983d9ecc86f7fa22d3b27be311c5",
  },
  {
    slug: "matplotlib",
    name: "Matplotlib",
    description:
      "低階繪圖函式庫，提供完整自訂能力。精細控制每個圖表元素，建立新型圖表，匯出出版品質圖片。",
    useCase: "需精細控制圖表時，用 Matplotlib 物件導向 API 畫多面板、熱圖或 3D 圖並匯出 PNG／PDF。",
    limitations: "需 Python 3.10+ 與 Matplotlib 3.10.x（建議 uv add matplotlib）；Jupyter 互動需 ipympl；快速統計圖建議改用 seaborn。",
    starterPrompt: "用 matplotlib 讀 <data.csv> 畫 2x2 子圖（折線、散佈、長條、直方圖），存成 300 dpi PNG。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/matplotlib/SKILL.md",
    reviewedHash: "358758d8550effbb2174ac8e78106106343e93ffdf2c5694de202fab56c40e39",
  },
  {
    slug: "scientific-schematics",
    name: "Scientific Schematics",
    description:
      "使用 AI 建立出版品質科學圖表。流程圖、電路、途徑圖等技術圖表，支援智慧迭代精煉。",
    useCase: "以文字生成科學流程、架構或訊號路徑 PNG 圖；含首次生成最多 2 輪，未達評分門檻才重繪。",
    limitations: "需 OpenRouter API 金鑰，提示詞與圖片會送往 OpenRouter，勿含病人或未發表資料；只輸出 PNG，無向量格式與 DPI 控制；標籤常拼錯，須逐一人工檢查。",
    starterPrompt: "用 scientific-schematics 畫 CONSORT 流程圖：<篩選 500 人、排除 150 人、隨機分派 350 人>。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/scientific-schematics/SKILL.md",
    reviewedHash: "e97232bd23199d7e611f3998463b845257640dc767418cbef7e6331393ebf68f",
  },
  {
    slug: "scientific-visualization",
    name: "Scientific Visualization",
    description:
      "出版品質圖表的元技能。多面板佈局、顯著性標註、誤差線、色盲安全調色盤、期刊格式要求。",
    useCase: "製作投稿圖表時，依期刊與欄寬用 Matplotlib 繪圖、標明誤差定義與色盲友善配色，並記錄資料來源。",
    limitations: "範例依賴 uv 與固定版本的 matplotlib、seaborn、plotly 等套件；期刊規範需針對確切期刊與投稿階段查核官方最新指引；自動報告不代表已符合期刊或無障礙要求。",
    starterPrompt: "用 scientific-visualization 把 <results.csv> 畫成單欄寬折線圖加 95% CI，匯出 PDF。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/scientific-visualization/SKILL.md",
    reviewedHash: "58239e220cdceddd4e29c3cf727ee22d94816f194df5dc8dc5a30792fba2b0ac",
  },
  {
    slug: "seaborn",
    name: "Seaborn",
    description:
      "統計視覺化，與 pandas 整合。快速探索分佈、關係與類別比較，預設美觀樣式。",
    useCase: "拿長格式 DataFrame 快速畫分布、類別比較或關係圖，以 hue、col 分組分面並自動算平均與信賴區間。",
    limitations: "範例採 seaborn 0.13.2，需 NumPy、pandas、matplotlib；範例資料未快取時才下載，私密檔用 pandas 讀取；部分函式改用 errorbar，regplot/lmplot 仍用 ci。",
    starterPrompt: "用 seaborn 讀 <data.csv>，依 <treatment> 分色畫小提琴圖，並以 <visit> 分面。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/seaborn/SKILL.md",
    reviewedHash: "88eb1733e7314357142305c9a6d9503266fbc320de978b4ee0d033e0469fcc7a",
  },
];
