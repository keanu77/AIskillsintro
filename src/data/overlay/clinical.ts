import type { SkillOverlay } from "../types";

export const CLINICAL: SkillOverlay[] = [
  {
    slug: "analytical-method-validation",
    name: "Analytical Method Validation",
    description:
      "依 ICH Q2(R2)/Q14、USP、ICH M10、ISO/IEC 17025 規劃與記錄分析方法確效、驗證與轉移（HPLC、LC-MS/MS、qPCR 等）。",
  },
  {
    slug: "clinical-decision-support",
    name: "Clinical Decision Support",
    description:
      "生成專業臨床決策支援文件，含病患群組分析（生物標記分層）與治療建議報告（實證指引）。",
  },
  {
    slug: "clinical-reports",
    name: "Clinical Reports",
    description:
      "撰寫臨床報告，含個案報告（CARE 指引）、診斷報告（放射/病理/檢驗）、臨床試驗報告（ICH-E3）。",
  },
  {
    slug: "folklore-variant-evidence",
    name: "Folklore Variant Evidence",
    description:
      "透過 Folklore MCP 取得 ClinGen 基因-疾病效度，並檢視 GRCh38 胚系 SNV/小 indel 的公開證據與文獻。",
  },
  {
    slug: "iso-standards-readiness",
    name: "ISO Standards Readiness",
    description:
      "整理並審閱 ISO 13485、14971、17025、15189 等標準的稽核準備證據（文件管制、風險管理、CAPA）。",
  },
  {
    slug: "neurokit2",
    name: "Neurokit2",
    description:
      "綜合生物訊號處理工具包。分析 ECG、EEG、EDA、呼吸、PPG、EMG 等生理資料。",
  },
  {
    slug: "pathogen-variant-surveillance",
    name: "Pathogen Variant Surveillance",
    description:
      "透過 GenSpectrum LAPIS API 查詢即時病原體基因體監測：目前流行的病毒譜系、成長速度與突變。",
  },
  {
    slug: "pkpd-modeling",
    name: "PK/PD Modeling",
    description:
      "藥動與藥效學建模：非房室分析、族群 PK、暴露-反應、生體相等性、首次人體劑量與治療藥物監測。",
  },
  {
    slug: "pydicom",
    name: "Pydicom",
    description:
      "處理 DICOM 醫學影像檔案的 Python 函式庫。讀寫醫學影像資料、擷取像素資料與元資料。",
  },
  {
    slug: "pyhealth",
    name: "Pyhealth",
    description:
      "醫療 AI 工具包。使用電子健康紀錄（EHR）、臨床資料開發與部署機器學習模型。",
  },
  {
    slug: "pylabrobot",
    name: "Pylabrobot",
    description:
      "跨廠商實驗室自動化框架。統一控制多種設備（Hamilton、Tecan、Opentrons、讀板機、幫浦）。",
  },
  {
    slug: "relsa-severity-assessment",
    name: "RELSA Severity Assessment",
    description:
      "以 RELSA 分數整合實驗動物的體重、體溫、臨床分數等指標，評估嚴重度並預測人道終點。",
  },
  {
    slug: "treatment-plans",
    name: "Treatment Plans",
    description:
      "生成簡潔（3-4 頁）醫療治療計畫，LaTeX/PDF 格式。支援一般醫療、復健、心理健康、慢性病管理。",
  },
];
