import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "official",
    label: "Anthropic 官方 Skills",
    description: "Anthropic 官方發布的文件處理、設計、API 與開發工具 Skills",
    icon: "⭐",
  },
  {
    id: "databases",
    label: "資料庫存取",
    description: "生物醫學、化學、基因體等線上資料庫的 API 存取工具",
    icon: "🗄️",
  },
  {
    id: "bioinformatics",
    label: "生物資訊",
    description: "基因體學、蛋白質、單細胞分析等生物資訊工具",
    icon: "🧬",
  },
  {
    id: "chemistry",
    label: "化學與藥物探索",
    description: "分子模擬、藥物設計、化學資訊學工具",
    icon: "⚗️",
  },
  {
    id: "data-science",
    label: "資料科學與機器學習",
    description: "統計分析、機器學習、深度學習框架與工具",
    icon: "🤖",
  },
  {
    id: "visualization",
    label: "視覺化與圖表",
    description: "資料視覺化、科學圖表、圖像生成工具",
    icon: "📊",
  },
  {
    id: "writing",
    label: "學術寫作與文獻",
    description: "文獻回顧、論文撰寫、同儕審查、研究工具",
    icon: "📝",
  },
  {
    id: "clinical",
    label: "臨床醫療",
    description: "臨床決策、法規品質、藥動學與病原體監測",
    icon: "🏥",
  },
  {
    id: "productivity",
    label: "生產力與文件工具",
    description: "文件解析、決策輔助、實驗室硬體與 agent 工具",
    icon: "🛠️",
  },
];
