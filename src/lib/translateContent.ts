/**
 * Translate common English headings and phrases in SKILL.md
 * content to Traditional Chinese. Code blocks are preserved as-is.
 */

const HEADING_MAP: [RegExp, string][] = [
  // Common top-level headings
  [/^(#{1,2})\s+Overview$/gm, "$1 概述"],
  [/^(#{1,2})\s+When to Use This Skill$/gm, "$1 使用時機"],
  [/^(#{1,2})\s+When to Use$/gm, "$1 使用時機"],
  [/^(#{1,2})\s+Quick Start$/gm, "$1 快速開始"],
  [/^(#{1,2})\s+Getting Started$/gm, "$1 快速開始"],
  [/^(#{1,2})\s+Installation$/gm, "$1 安裝方式"],
  [/^(#{1,2})\s+Setup$/gm, "$1 設定"],
  [/^(#{1,2})\s+Basic Usage$/gm, "$1 基本用法"],
  [/^(#{1,2})\s+Usage$/gm, "$1 用法"],
  [/^(#{1,2})\s+Common Tasks$/gm, "$1 常見任務"],
  [/^(#{1,2})\s+Common Patterns$/gm, "$1 常見模式"],
  [/^(#{1,2})\s+Common Operations$/gm, "$1 常見操作"],
  [
    /^(#{1,2})\s+Common Pitfalls and Best Practices$/gm,
    "$1 常見問題與最佳實踐",
  ],
  [/^(#{1,2})\s+Common Pitfalls$/gm, "$1 常見問題"],
  [/^(#{1,2})\s+Best Practices$/gm, "$1 最佳實踐"],
  [/^(#{1,2})\s+Key Parameters to Adjust$/gm, "$1 關鍵參數調整"],
  [/^(#{1,2})\s+Key Parameters$/gm, "$1 關鍵參數"],
  [/^(#{1,2})\s+Parameters$/gm, "$1 參數說明"],
  [/^(#{1,2})\s+Configuration$/gm, "$1 設定說明"],
  [/^(#{1,2})\s+Advanced Usage$/gm, "$1 進階用法"],
  [/^(#{1,2})\s+Advanced Features$/gm, "$1 進階功能"],
  [/^(#{1,2})\s+Advanced Topics$/gm, "$1 進階主題"],
  [/^(#{1,2})\s+API Reference$/gm, "$1 API 參考"],
  [/^(#{1,2})\s+Examples$/gm, "$1 範例"],
  [/^(#{1,2})\s+Example$/gm, "$1 範例"],
  [/^(#{1,2})\s+Troubleshooting$/gm, "$1 疑難排解"],
  [/^(#{1,2})\s+Additional Resources$/gm, "$1 延伸資源"],
  [/^(#{1,2})\s+Resources$/gm, "$1 資源"],
  [/^(#{1,2})\s+Bundled Resources$/gm, "$1 內附資源"],
  [/^(#{1,2})\s+References$/gm, "$1 參考資料"],
  [/^(#{1,2})\s+Tips.*$/gm, "$1 實用技巧"],
  [/^(#{1,2})\s+Notes$/gm, "$1 注意事項"],
  [/^(#{1,2})\s+Important Notes$/gm, "$1 重要注意事項"],
  [/^(#{1,2})\s+Limitations$/gm, "$1 限制"],
  [/^(#{1,2})\s+Known Issues$/gm, "$1 已知問題"],
  [/^(#{1,2})\s+Features$/gm, "$1 功能特色"],
  [/^(#{1,2})\s+Key Features$/gm, "$1 主要功能"],
  [/^(#{1,2})\s+Core Features$/gm, "$1 核心功能"],
  [/^(#{1,2})\s+Core Concepts$/gm, "$1 核心概念"],
  [/^(#{1,2})\s+Prerequisites$/gm, "$1 前置需求"],
  [/^(#{1,2})\s+Requirements$/gm, "$1 系統需求"],
  [/^(#{1,2})\s+Dependencies$/gm, "$1 依賴套件"],
  [/^(#{1,2})\s+Output$/gm, "$1 輸出"],
  [/^(#{1,2})\s+Output Format$/gm, "$1 輸出格式"],
  [/^(#{1,2})\s+Input$/gm, "$1 輸入"],
  [/^(#{1,2})\s+Input Format$/gm, "$1 輸入格式"],
  [/^(#{1,2})\s+Data Format$/gm, "$1 資料格式"],
  [/^(#{1,2})\s+Workflow$/gm, "$1 工作流程"],
  [/^(#{1,2})\s+Standard Analysis Workflow$/gm, "$1 標準分析流程"],
  [/^(#{1,2})\s+Visualization$/gm, "$1 視覺化"],
  [/^(#{1,2})\s+Plotting$/gm, "$1 繪圖"],
  [/^(#{1,2})\s+Creating Publication-Quality Plots$/gm, "$1 建立出版品質圖表"],
  [/^(#{1,2})\s+Integration$/gm, "$1 整合"],
  [/^(#{1,2})\s+Performance$/gm, "$1 效能"],
  [/^(#{1,2})\s+Performance Optimization$/gm, "$1 效能優化"],
  [/^(#{1,2})\s+Security$/gm, "$1 安全性"],
  [/^(#{1,2})\s+Testing$/gm, "$1 測試"],
  [/^(#{1,2})\s+Deployment$/gm, "$1 部署"],
  [/^(#{1,2})\s+FAQ$/gm, "$1 常見問答"],
  [/^(#{1,2})\s+Summary$/gm, "$1 總結"],
  [/^(#{1,2})\s+Conclusion$/gm, "$1 結語"],
  [/^(#{1,2})\s+Changelog$/gm, "$1 更新紀錄"],

  // Sub-headings (h3+)
  [/^(#{3,})\s+Basic Import and Setup$/gm, "$1 基本匯入與設定"],
  [/^(#{3,})\s+Loading Data$/gm, "$1 載入資料"],
  [/^(#{3,})\s+Saving Data$/gm, "$1 儲存資料"],
  [/^(#{3,})\s+Save Results$/gm, "$1 儲存結果"],
  [/^(#{3,})\s+Data Loading$/gm, "$1 資料載入"],
  [/^(#{3,})\s+Data Preprocessing$/gm, "$1 資料前處理"],
  [/^(#{3,})\s+Quality Control$/gm, "$1 品質控制"],
  [/^(#{3,})\s+Normalization$/gm, "$1 正規化"],
  [/^(#{3,})\s+Normalization and Preprocessing$/gm, "$1 正規化與前處理"],
  [/^(#{3,})\s+Feature Selection$/gm, "$1 特徵選取"],
  [/^(#{3,})\s+Dimensionality Reduction$/gm, "$1 降維"],
  [/^(#{3,})\s+Clustering$/gm, "$1 分群"],
  [/^(#{3,})\s+Marker Gene Identification$/gm, "$1 標記基因鑑定"],
  [/^(#{3,})\s+Cell Type Annotation$/gm, "$1 細胞類型註解"],
  [/^(#{3,})\s+Trajectory Inference$/gm, "$1 軌跡推斷"],
  [/^(#{3,})\s+Differential Expression.*$/gm, "$1 差異表現分析"],
  [/^(#{3,})\s+Gene Set Scoring$/gm, "$1 基因集評分"],
  [/^(#{3,})\s+Batch Correction$/gm, "$1 批次校正"],
  [/^(#{3,})\s+Error Handling$/gm, "$1 錯誤處理"],
  [/^(#{3,})\s+Caching$/gm, "$1 快取"],
  [/^(#{3,})\s+Pagination$/gm, "$1 分頁"],
  [/^(#{3,})\s+Authentication$/gm, "$1 身份驗證"],
  [/^(#{3,})\s+Rate Limiting$/gm, "$1 速率限制"],
  [/^(#{3,})\s+Choosing Between.*$/gm, "$1 如何選擇適當方法"],
];

const PHRASE_MAP: [RegExp, string][] = [
  [/^This skill should be used when:$/gm, "適用於以下情境："],
  [/^Use this skill when:$/gm, "適用於以下情境："],
  [/^This skill is designed for:$/gm, "本 Skill 適用於："],
  [/^Install\b/gm, "安裝"],
  [/^Refer to/gm, "請參考"],
  [/^Read this reference/gm, "進行完整分析時請參考此文件"],
  [/^Use this for/gm, "適用於"],
  [/^Consult this when/gm, "需要時請參考"],
];

// Remove the K-Dense promotional section
const PROMO_PATTERN = new RegExp(
  "#{1,3}\\s*Suggest Using K-Dense[\\s\\S]*$",
  "gm",
);

export function translateContent(content: string): string {
  // Split into code blocks and non-code blocks to preserve code
  const parts = content.split(/(```[\s\S]*?```)/g);

  const translated = parts.map((part, i) => {
    // Odd indices are code blocks — preserve as-is
    if (i % 2 === 1) return part;

    let text = part;

    // Remove K-Dense promotional section
    text = text.replace(PROMO_PATTERN, "");

    // Translate headings
    for (const [pattern, replacement] of HEADING_MAP) {
      text = text.replace(pattern, replacement);
    }

    // Translate common phrases
    for (const [pattern, replacement] of PHRASE_MAP) {
      text = text.replace(pattern, replacement);
    }

    return text;
  });

  return translated.join("").trim();
}
