import type { SkillOverlay } from "../types";

export const DATABASES: SkillOverlay[] = [
  {
    slug: "database-lookup",
    name: "Database Lookup",
    icon: "🗄️",
    description:
      "以明確端點、篩選、分頁與出處查詢公開資料庫 API（PubMed、UniProt、ChEMBL、ClinicalTrials 等），可重現地取得事實。",
  },
  {
    slug: "imaging-data-commons",
    name: "Imaging Data Commons",
    icon: "🏥",
    description:
      "查詢與下載 NCI 影像資料共享中心的公開癌症影像資料，含 CT、MR、PET 與病理資料集。",
  },
  {
    slug: "ncats-arax",
    name: "NCATS ARAX",
    icon: "🕸️",
    description:
      "查詢 NCATS Translator ARAX 生醫知識圖譜，取得具類型與出處的一跳、兩跳關係。",
  },
  {
    slug: "onekgpd",
    name: "1000 Genomes (Individual-level)",
    icon: "🧬",
    description:
      "以個體層級查詢千人基因體計畫（3,202 人，GRCh38）：誰帶有特定變異、特定位點的基因型等。",
  },
  {
    slug: "ontology-term-resolution",
    name: "Ontology Term Resolution",
    icon: "🏷️",
    description:
      "將自由文字標籤對應到本體術語 ID，並透過 OLS4、Bioregistry、Identifiers.org 驗證 CURIE。",
  },
  {
    slug: "primekg",
    name: "PrimeKG",
    icon: "🕸️",
    description:
      "查詢精準醫學知識圖譜（PrimeKG）中的基因、藥物、疾病與表型等多尺度生物資料。",
  },
  {
    slug: "usfiscaldata",
    name: "US Fiscal Data",
    icon: "💵",
    description:
      "查詢美國財政部 Fiscal Data API：國債、每日/每月國庫報表、公債標售、利率與匯率，免 API key。",
  },
];
