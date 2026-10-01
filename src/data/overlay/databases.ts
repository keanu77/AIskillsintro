import type { SkillOverlay } from "../types";

export const DATABASES: SkillOverlay[] = [
  {
    slug: "database-lookup",
    name: "Database Lookup",
    description:
      "以明確端點、篩選、分頁與出處查詢公開資料庫 API（PubMed、UniProt、ChEMBL、ClinicalTrials 等），可重現地取得事實。",
    useCase: "想取得某基因、化合物或臨床試驗資料時，選定權威資料庫 API 分頁取齊，回傳附端點、參數、存取日期與筆數核對的結果。",
    limitations: "金鑰依資料庫而定，部分可免金鑰低速存取；DrugBank 需付費授權。超過 10,000 筆或 100 次呼叫前需確認；Open Targets、gnomAD 等 POST API 改用 curl。",
    starterPrompt: "用 database-lookup 從 ClinicalTrials.gov 列出 <膝骨關節炎 PRP> 的所有試驗，附查詢端點與筆數核對。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/database-lookup/SKILL.md",
    reviewedHash: "6c4a219ef68af6ffc5bc9fe9a4a338b1c9f6e77dd496d65f2656e45c01b6d5f3",
  },
  {
    slug: "imaging-data-commons",
    name: "Imaging Data Commons",
    description:
      "查詢與下載 NCI 影像資料共享中心的公開癌症影像資料，含 CT、MR、PET 與病理資料集。",
    useCase: "依癌別、模態或部位篩選 IDC 公開 CT、MR、PET 與病理研究影像，下載 DICOM 並查授權與引用。",
    limitations: "下載與 pandas 分析需安裝 idc-index，純中繼資料查詢可改用免驗證的 REST API；BigQuery 與 Google Healthcare DICOMweb 需 GCP 驗證；授權以系列為單位，部分為 CC BY-NC。",
    starterPrompt: "用 imaging-data-commons 找出 <乳癌> 的 MR 影像系列，列出授權後下載前 5 個系列。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/imaging-data-commons/SKILL.md",
    reviewedHash: "c72839af157486d01d07303544202bd02b772150b9ef49ba873512100f3378e5",
  },
  {
    slug: "ncats-arax",
    name: "NCATS ARAX",
    description:
      "查詢 NCATS Translator ARAX 生醫知識圖譜，取得具類型與出處的一跳、兩跳關係。",
    useCase: "以審核過的 CURIE 與 Biolink 類型查 ARAX 中藥物、基因、疾病的一跳或兩跳關係並保存出處。",
    limitations: "只能送公開、非敏感的研究問題，不可含病人資料或未發表內容；回傳路徑僅為候選，不是已驗證機轉或臨床建議，需另以文獻查核；每次最多 50 筆，不支援三跳。",
    starterPrompt: "用 ncats-arax 查 <CHEBI:31690 imatinib> 是否影響 <NCBIGene:25 ABL1>，並整理返回邊的出處。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/ncats-arax/SKILL.md",
    reviewedHash: "337dd5db5d4d0661726bee40922824874f0d3afe25f262db2a455946539510d3",
  },
  {
    slug: "onekgpd",
    name: "1000 Genomes (Individual-level)",
    description:
      "以個體層級查詢千人基因體計畫（3,202 人，GRCh38）：誰帶有特定變異、特定位點的基因型等。",
    useCase: "給定已核對的 GRCh38 區域與篩選條件，先計數再列出千人基因體中帶有符合變異的個體或變異。",
    limitations: "需安裝 uv；座標必須先以 Ensembl 等權威來源轉為 GRCh38，GRCh37 座標會不報錯地查到錯誤位置；僅涵蓋千人基因體世代；世代含親屬，頻率不等於族群盛行率。",
    starterPrompt: "用 onekgpd 計算 <BRCA1 的 GRCh38 區域> 帶 AlphaMissense 可能致病錯義變異的人數，再列出名單。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/onekgpd/SKILL.md",
    reviewedHash: "2e48a3c9033b2883cfaba39badc839502516144b8fb9f9fd7c0a4b77afffff71",
  },
  {
    slug: "ontology-term-resolution",
    name: "Ontology Term Resolution",
    description:
      "將自由文字標籤對應到本體術語 ID，並透過 OLS4、Bioregistry、Identifiers.org 驗證 CURIE。",
    useCase: "標註中繼資料時，把「liver」等自由文字經 OLS 查成本體 ID，或批次驗證既有 ID 是否過時或標籤不符。",
    limitations: "腳本只需 Python 標準函式庫，但需連網查詢 OLS；非精確比對的結果須人工確認；ZOOMA、Bioregistry 的結果不能取代 OLS 驗證；本體版本會變動，需記錄查詢日期。",
    starterPrompt: "用 ontology-term-resolution 把 <tissues.txt> 的組織名稱對應到 UBERON，只接受精確相符並輸出 TSV。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/ontology-term-resolution/SKILL.md",
    reviewedHash: "3b5b6988fdb1d8261add6727e7a025dd691e95c66200d804e3003a4c14301306",
  },
  {
    slug: "primekg",
    name: "PrimeKG",
    description:
      "查詢精準醫學知識圖譜（PrimeKG）中的基因、藥物、疾病與表型等多尺度生物資料。",
    useCase: "研究藥物重定位或疾病機轉時，在本機 PrimeKG 資料中搜尋疾病節點，取得相關基因、藥物、表型與藥物—疾病路徑。",
    limitations: "需自行從 Harvard Dataverse 下載 kg.csv、安裝 pandas 並設定 PRIMEKG_DATA（skill 不附資料集）；上游建議新研究改用 OptimusKG；重現分析需記錄資料版本與 checksum。",
    starterPrompt: "用 primekg 查 <Alzheimer's disease> 的相關基因、藥物與表型，整理成表格。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/primekg/SKILL.md",
    reviewedHash: "f9b728fe9c64f8d902503892005b6c64360809e819f82da8b79b81d41d4c054d",
  },
  {
    slug: "usfiscaldata",
    name: "US Fiscal Data",
    description:
      "查詢美國財政部 Fiscal Data API：國債、每日/每月國庫報表、公債標售、利率與匯率，免 API key。",
    useCase: "查美國國債、國庫報表、公債標售、利率或匯率時，用 Python 分頁呼叫 Fiscal Data API 取資料。",
    limitations: "需 requests、pandas，免 API 金鑰；所有值以字串回傳需自行轉型，空值為字串 \"null\"；端點路徑會變動，需對照各資料集的 API Quick Guide；匯率為政府報告匯率，非即時報價。",
    starterPrompt: "用 usfiscaldata 抓 <2024 年以來> 的 Debt to the Penny 資料，畫出國債總額趨勢圖。",
    reviewedAt: "2026-10-02",
    reviewedSourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/blob/91497e335489dcb544ec8ddc8f6b7ce5fd6d1121/skills/usfiscaldata/SKILL.md",
    reviewedHash: "9ccecaecbd37e71c6a98ae187d2d8f5231d5dd98d002fd2a961ebb84a45a9230",
  },
];
