import type { Category } from "./types";

// Order defines element numbering on the periodic table. Colors are light
// tints so #121212 text stays above 7:1; groups are also named in text
// everywhere, never told apart by color alone.
export const CATEGORIES: Category[] = [
  {
    id: "official",
    code: "OFF",
    label: "Anthropic 官方 Skills",
    shortLabel: "Anthropic 官方",
    description: "Anthropic 官方發布的文件處理、設計、API 與開發工具 Skills",
    color: "#F4D35E",
  },
  {
    id: "databases",
    code: "DB",
    label: "資料庫存取",
    shortLabel: "資料庫存取",
    description: "生物醫學、化學、基因體等線上資料庫的 API 存取工具",
    color: "#C6E3B5",
  },
  {
    id: "bioinformatics",
    code: "BIO",
    label: "生物資訊",
    shortLabel: "生物資訊",
    description: "基因體學、蛋白質、單細胞分析等生物資訊工具",
    color: "#8FD3D6",
  },
  {
    id: "chemistry",
    code: "CHM",
    label: "化學與藥物探索",
    shortLabel: "化學與藥物",
    description: "分子模擬、藥物設計、化學資訊學工具",
    color: "#F7B58C",
  },
  {
    id: "data-science",
    code: "DS",
    label: "資料科學與機器學習",
    shortLabel: "資料科學與 ML",
    description: "統計分析、機器學習、深度學習框架與工具",
    color: "#C9B6E4",
  },
  {
    id: "visualization",
    code: "VIS",
    label: "視覺化與圖表",
    shortLabel: "視覺化",
    description: "資料視覺化、科學圖表、圖像生成工具",
    color: "#F9C4D8",
  },
  {
    id: "writing",
    code: "WRT",
    label: "學術寫作與文獻",
    shortLabel: "寫作與文獻",
    description: "文獻回顧、論文撰寫、同儕審查、研究工具",
    color: "#E4E9B8",
  },
  {
    id: "clinical",
    code: "CLN",
    label: "臨床醫療",
    shortLabel: "臨床醫療",
    description: "臨床決策、法規品質、藥動學與病原體監測",
    color: "#F4A3A3",
  },
  {
    id: "productivity",
    code: "PRD",
    label: "生產力與文件工具",
    shortLabel: "生產力與工具",
    description: "文件解析、決策輔助、實驗室硬體與 agent 工具",
    color: "#D6D6D2",
  },
];
