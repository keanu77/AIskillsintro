// Auto-generated from ~/.claude/skills/ + Anthropic official skills — 159 skills
// Last updated: 2026-03-01

// ── Types ──────────────────────────────────────────────

export interface Skill {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: CategoryId;
  status: "live";
}

export type CategoryId =
  | "official"
  | "databases"
  | "bioinformatics"
  | "chemistry"
  | "data-science"
  | "visualization"
  | "writing"
  | "clinical"
  | "productivity";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  icon: string;
}

// ── Categories ─────────────────────────────────────────

export const CATEGORIES: Category[] = [
  {
    id: "official",
    label: "Anthropic 官方 Skills",
    description: "Anthropic 官方發布的文件處理、設計、開發工具 Skills",
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
    description: "臨床決策支援、治療計畫、醫學影像工具",
    icon: "🏥",
  },
  {
    id: "productivity",
    label: "生產力與文件工具",
    description: "文件處理、簡報、設計、搜尋與平台整合",
    icon: "🛠️",
  },
];

// ── Skills Data ────────────────────────────────────────

export const SKILLS: Skill[] = [
  {
    slug: "adaptyv",
    name: "Adaptyv",
    description:
      "自動化蛋白質測試與驗證的雲端實驗室平台。設計蛋白質時進行實驗驗證，含結合分析、表現測試。",
    icon: "🧬",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "aeon",
    name: "Aeon",
    description:
      "時間序列機器學習工具。分類、迴歸、分群、預測、異常偵測、分割與相似性搜尋。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "alphafold-database",
    name: "Alphafold Database",
    description:
      "存取 AlphaFold 2 億+ AI 預測蛋白質結構。透過 UniProt ID 擷取結構、下載 PDB/mmCIF 檔案，分析信賴度指標。",
    icon: "🧬",
    category: "databases",
    status: "live",
  },
  {
    slug: "anndata",
    name: "Anndata",
    description:
      "單細胞分析中的標註矩陣資料結構。處理 .h5ad 檔案或與 scverse 生態系統整合時使用。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "arboreto",
    name: "Arboreto",
    description:
      "從基因表現資料推斷基因調控網路（GRN），使用 GRNBoost2、GENIE3 等可擴展演算法。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "astropy",
    name: "Astropy",
    description:
      "天文學與天體物理學 Python 函式庫。天體座標、物理單位、FITS 檔案、宇宙學計算。",
    icon: "🔭",
    category: "data-science",
    status: "live",
  },
  {
    slug: "benchling-integration",
    name: "Benchling Integration",
    description:
      "Benchling R&D 平台整合。存取登記表（DNA、蛋白質）、庫存、電子實驗記錄本、工作流程。",
    icon: "🔗",
    category: "productivity",
    status: "live",
  },
  {
    slug: "biopython",
    name: "Biopython",
    description:
      "綜合分子生物學工具包。序列操作、檔案解析（FASTA/GenBank/PDB）、系統發生學、NCBI/PubMed 程式化存取。",
    icon: "🧪",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "biorxiv-database",
    name: "Biorxiv Database",
    description:
      "搜尋 bioRxiv 生命科學預印本伺服器。依關鍵字、作者、日期範圍搜尋，擷取論文元資料。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "bioservices",
    name: "Bioservices",
    description:
      "統一 Python 介面存取 40+ 生物資訊服務。同時查詢 UniProt、KEGG、ChEMBL、Reactome 等多個資料庫。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "brenda-database",
    name: "Brenda Database",
    description:
      "存取 BRENDA 酶資料庫。擷取動力學參數（Km、kcat）、反應方程式、物種資料與底物特異性酵素資訊。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "cellxgene-census",
    name: "Cellxgene Census",
    description:
      "程式化查詢 CELLxGENE Census（6,100 萬+ 細胞）。跨組織、疾病、細胞類型取得表現資料。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "chembl-database",
    name: "Chembl Database",
    description:
      "查詢 ChEMBL 生物活性分子與藥物探索資料。依結構/性質搜尋化合物，擷取生物活性數據（IC50、Ki）。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "cirq",
    name: "Cirq",
    description:
      "Google 量子計算框架。設計雜訊感知電路、量子特性化實驗，針對 Google Quantum AI 硬體優化。",
    icon: "⚛️",
    category: "data-science",
    status: "live",
  },
  {
    slug: "citation-management",
    name: "Citation Management",
    description:
      "學術研究引文管理。搜尋 Google Scholar 與 PubMed 論文、擷取元資料、驗證引文、生成 BibTeX。",
    icon: "📎",
    category: "writing",
    status: "live",
  },
  {
    slug: "clinical-decision-support",
    name: "Clinical Decision Support",
    description:
      "生成專業臨床決策支援文件，含病患群組分析（生物標記分層）與治療建議報告（實證指引）。",
    icon: "🩺",
    category: "clinical",
    status: "live",
  },
  {
    slug: "clinical-reports",
    name: "Clinical Reports",
    description:
      "撰寫臨床報告，含個案報告（CARE 指引）、診斷報告（放射/病理/檢驗）、臨床試驗報告（ICH-E3）。",
    icon: "📋",
    category: "clinical",
    status: "live",
  },
  {
    slug: "clinicaltrials-database",
    name: "Clinicaltrials Database",
    description:
      "透過 API v2 查詢 ClinicalTrials.gov。依疾病、藥物、地點、狀態或期別搜尋臨床試驗。",
    icon: "🏥",
    category: "databases",
    status: "live",
  },
  {
    slug: "clinpgx-database",
    name: "Clinpgx Database",
    description:
      "存取 ClinPGx 藥物基因體學資料。查詢基因-藥物交互作用、CPIC 指引、等位基因功能，支援精準醫療。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "clinvar-database",
    name: "Clinvar Database",
    description:
      "查詢 NCBI ClinVar 變異臨床意義。依基因/位置搜尋，解讀致病性分類，用於基因體醫學。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "cobrapy",
    name: "Cobrapy",
    description:
      "基於約束的代謝建模（COBRA）。FBA、FVA、基因敲除、通量取樣、SBML 模型，用於系統生物學。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "cosmic-database",
    name: "Cosmic Database",
    description:
      "存取 COSMIC 癌症突變資料庫。查詢體細胞突變、癌症基因普查、突變特徵、基因融合。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "dask",
    name: "Dask",
    description:
      "分散式運算，處理超過記憶體的 pandas/NumPy 工作流程。平行檔案處理、分散式 DataFrame。",
    icon: "⚡",
    category: "data-science",
    status: "live",
  },
  {
    slug: "datacommons-client",
    name: "Datacommons Client",
    description:
      "存取 Data Commons 平台公開統計資料，含人口統計、經濟指標、健康統計、環境資料。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "datamol",
    name: "Datamol",
    description:
      "RDKit 的 Python 友善包裝。標準藥物探索工具：SMILES 解析、標準化、描述子、指紋、分群、3D 構形。",
    icon: "⚗️",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "deepchem",
    name: "Deepchem",
    description:
      "分子機器學習。多元特徵化器與預建資料集，用於性質預測（ADMET、毒性）、GNN、MoleculeNet 基準測試。",
    icon: "🧪",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "deeptools",
    name: "Deeptools",
    description:
      "NGS 分析工具包。BAM 轉 bigWig、品質控制（相關性、PCA）、熱圖/輪廓圖，用於 ChIP-seq、RNA-seq 視覺化。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "denario",
    name: "Denario",
    description:
      "科學研究輔助的多代理 AI 系統。自動化從資料分析到發表的研究工作流程。",
    icon: "🤖",
    category: "productivity",
    status: "live",
  },
  {
    slug: "diffdock",
    name: "Diffdock",
    description:
      "基於擴散的分子對接。從 PDB/SMILES 預測蛋白質-配體結合姿態、信賴度評分、虛擬篩選，用於結構導向藥物設計。",
    icon: "🔗",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "dnanexus-integration",
    name: "Dnanexus Integration",
    description:
      "DNAnexus 雲端基因體平台。建構應用程式、管理資料、dxpy SDK、執行工作流程。",
    icon: "🔗",
    category: "productivity",
    status: "live",
  },
  {
    slug: "document-skills--docx",
    name: "DOCX",
    description:
      "Word 文件工具包（.docx）。建立/編輯文件、追蹤修訂、註解、格式保留、文字擷取。",
    icon: "📄",
    category: "official",
    status: "live",
  },
  {
    slug: "document-skills--pdf",
    name: "PDF",
    description:
      "PDF 操作工具包。擷取文字/表格、建立 PDF、合併/分割、填寫表單、OCR 掃描。",
    icon: "📕",
    category: "official",
    status: "live",
  },
  {
    slug: "document-skills--pptx",
    name: "PPTX",
    description:
      "簡報工具包（.pptx）。建立/編輯投影片、版面配置、講者備忘稿、合併/分割檔案。",
    icon: "📊",
    category: "official",
    status: "live",
  },
  {
    slug: "document-skills--xlsx",
    name: "XLSX",
    description:
      "試算表工具包（.xlsx/.csv）。建立/編輯含公式/格式、資料清理、圖表視覺化。",
    icon: "📗",
    category: "official",
    status: "live",
  },
  {
    slug: "algorithmic-art",
    name: "Algorithmic Art",
    description:
      "使用 p5.js 創作演算法藝術。支援種子隨機、互動參數探索、流場、粒子系統等生成式藝術。",
    icon: "🎨",
    category: "official",
    status: "live",
  },
  {
    slug: "brand-guidelines",
    name: "Brand Guidelines",
    description:
      "套用 Anthropic 官方品牌色彩與字型到各種產出物。適用於需要品牌一致性的視覺設計。",
    icon: "🏷️",
    category: "official",
    status: "live",
  },
  {
    slug: "canvas-design",
    name: "Canvas Design",
    description:
      "以設計哲學創作精美視覺藝術。支援 .png 和 .pdf 輸出，適用於海報、藝術作品等靜態設計。",
    icon: "🖼️",
    category: "official",
    status: "live",
  },
  {
    slug: "doc-coauthoring",
    name: "Doc Co-authoring",
    description:
      "結構化文件共同撰寫工作流程。適用於撰寫文件、提案、技術規格書、決策文件等。",
    icon: "✍️",
    category: "official",
    status: "live",
  },
  {
    slug: "frontend-design",
    name: "Frontend Design",
    description:
      "建立高品質前端介面與 UI 設計。支援網站、Landing Page、儀表板、React 元件等，避免制式 AI 風格。",
    icon: "💻",
    category: "official",
    status: "live",
  },
  {
    slug: "internal-comms",
    name: "Internal Comms",
    description:
      "撰寫各類企業內部溝通文件。狀態報告、主管更新、公司通訊、FAQ、事件報告等。",
    icon: "📨",
    category: "official",
    status: "live",
  },
  {
    slug: "mcp-builder",
    name: "MCP Builder",
    description:
      "建立高品質 MCP（Model Context Protocol）伺服器。支援 Python（FastMCP）和 Node/TypeScript SDK 整合外部 API。",
    icon: "🔌",
    category: "official",
    status: "live",
  },
  {
    slug: "skill-creator",
    name: "Skill Creator",
    description:
      "建立新 Skill、改善現有 Skill、執行評估測試。支援從零開始建立、效能基準測試與觸發精準度優化。",
    icon: "🧩",
    category: "official",
    status: "live",
  },
  {
    slug: "slack-gif-creator",
    name: "Slack GIF Creator",
    description:
      "建立針對 Slack 最佳化的動畫 GIF。提供尺寸限制、驗證工具與動畫概念參考。",
    icon: "🎬",
    category: "official",
    status: "live",
  },
  {
    slug: "theme-factory",
    name: "Theme Factory",
    description:
      "為各種產出物套用主題樣式。內建 10 種預設主題（色彩/字型），可套用於投影片、文件、網頁等。",
    icon: "🎭",
    category: "official",
    status: "live",
  },
  {
    slug: "web-artifacts-builder",
    name: "Web Artifacts Builder",
    description:
      "建立複雜的多元件網頁應用。使用 React、Tailwind CSS、shadcn/ui，支援狀態管理與路由。",
    icon: "🌐",
    category: "official",
    status: "live",
  },
  {
    slug: "webapp-testing",
    name: "Webapp Testing",
    description:
      "使用 Playwright 測試本地網頁應用。驗證前端功能、除錯 UI 行為、擷取螢幕截圖、檢視瀏覽器日誌。",
    icon: "🧪",
    category: "official",
    status: "live",
  },
  {
    slug: "drugbank-database",
    name: "Drugbank Database",
    description:
      "存取 DrugBank 綜合藥物資訊，包含藥物性質、交互作用、標靶、途徑、化學結構與藥理資料。",
    icon: "💊",
    category: "databases",
    status: "live",
  },
  {
    slug: "ena-database",
    name: "Ena Database",
    description:
      "透過 API/FTP 存取歐洲核苷酸檔案庫。擷取 DNA/RNA 序列、原始讀取（FASTQ）、基因體組裝。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "ensembl-database",
    name: "Ensembl Database",
    description:
      "查詢 Ensembl 基因體資料庫 REST API，支援 250+ 物種。基因查詢、序列擷取、變異分析、比較基因體學。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "esm",
    name: "Esm",
    description:
      "蛋白質語言模型工具包，含 ESM3（跨序列、結構、功能的生成式多模態蛋白質設計）與 ESM C（高效嵌入）。",
    icon: "🧬",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "etetoolkit",
    name: "Etetoolkit",
    description:
      "系統發生樹工具包（ETE）。樹操作（Newick/NHX）、演化事件偵測、直系/旁系同源、NCBI 分類學、視覺化。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "exploratory-data-analysis",
    name: "Exploratory Data Analysis",
    description:
      "對科學資料檔案執行綜合探索性資料分析，支援 200+ 檔案格式。理解資料結構、內容與品質。",
    icon: "🔎",
    category: "productivity",
    status: "live",
  },
  {
    slug: "fda-database",
    name: "FDA Database",
    description:
      "查詢 openFDA API，含藥品、醫材、不良事件、召回、法規送件（510k、PMA）等資料。",
    icon: "💊",
    category: "databases",
    status: "live",
  },
  {
    slug: "flowio",
    name: "Flowio",
    description:
      "解析 FCS（流式細胞儀標準）檔案 v2.0-3.1。以 NumPy 陣列擷取事件、讀取元資料/通道。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "fluidsim",
    name: "Fluidsim",
    description:
      "計算流體力學模擬框架。Navier-Stokes 方程式（2D/3D）、淺水方程式、分層流。",
    icon: "🌊",
    category: "data-science",
    status: "live",
  },
  {
    slug: "fred-economic-data",
    name: "Fred Economic Data",
    description:
      "查詢 FRED 聯邦準備經濟資料 API，含 80 萬+ 經濟時間序列，涵蓋 GDP、失業率、通膨、利率等。",
    icon: "💹",
    category: "databases",
    status: "live",
  },
  {
    slug: "gene-database",
    name: "Gene Database",
    description:
      "透過 E-utilities/Datasets API 查詢 NCBI Gene。依基因符號/ID 搜尋，擷取基因資訊（RefSeqs、GO、位置）。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "generate-image",
    name: "Generate Image",
    description:
      "使用 AI 模型（FLUX、Gemini）生成或編輯圖片。照片、插圖、藝術作品、視覺素材、概念藝術。",
    icon: "🖼️",
    category: "visualization",
    status: "live",
  },
  {
    slug: "geniml",
    name: "Geniml",
    description:
      "處理基因體區間資料（BED 檔案）的機器學習工具。訓練區域嵌入（Region2Vec）、單細胞 ATAC-seq 分析。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "geo-database",
    name: "GEO Database",
    description:
      "存取 NCBI GEO 基因表現/基因體資料。搜尋/下載微陣列與 RNA-seq 資料集（GSE、GSM、GPL）。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "geopandas",
    name: "Geopandas",
    description:
      "地理空間向量資料 Python 函式庫。處理 shapefiles、GeoJSON、GeoPackage，空間分析與幾何運算。",
    icon: "🗺️",
    category: "data-science",
    status: "live",
  },
  {
    slug: "get-available-resources",
    name: "Get Available Resources",
    description:
      "偵測與報告可用系統資源（CPU 核心、GPU、記憶體、磁碟空間），適合運算密集任務前使用。",
    icon: "💻",
    category: "productivity",
    status: "live",
  },
  {
    slug: "gget",
    name: "Gget",
    description:
      "快速 CLI/Python 查詢 20+ 生物資訊資料庫。基因資訊查詢、BLAST 搜尋、AlphaFold 結構、富集分析。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "gtars",
    name: "Gtars",
    description:
      "高效能基因體區間分析工具（Rust + Python）。處理 BED 檔案、覆蓋度追蹤、重疊偵測、ML 模型代幣化。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "gwas-database",
    name: "Gwas Database",
    description:
      "查詢 NHGRI-EBI GWAS Catalog，搜尋 SNP-性狀關聯。依 rs ID、疾病/性狀、基因搜尋，擷取 p 值與統計摘要。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "histolab",
    name: "Histolab",
    description:
      "輕量全切片影像（WSI）切塊擷取與前處理。組織偵測、切塊擷取、H&E 染色正規化。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "hmdb-database",
    name: "Hmdb Database",
    description:
      "存取人類代謝體資料庫（22 萬+ 代謝物）。依名稱/ID/結構搜尋，擷取化學性質、生物標記資料、NMR/MS 光譜。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "hypogenic",
    name: "Hypogenic",
    description:
      "LLM 驅動的假說自動生成與測試。在表格資料集上系統性探索假說與模式。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "hypothesis-generation",
    name: "Hypothesis Generation",
    description:
      "從觀察結果進行結構化假說形成。制定可測試假說與預測、提出機制、設計實驗。",
    icon: "💡",
    category: "writing",
    status: "live",
  },
  {
    slug: "imaging-data-commons",
    name: "Imaging Data Commons",
    description:
      "查詢與下載 NCI 影像資料共享中心的公開癌症影像資料，含 CT、MR、PET 與病理資料集。",
    icon: "🏥",
    category: "databases",
    status: "live",
  },
  {
    slug: "infographics",
    name: "Infographics",
    description:
      "使用 AI 建立專業資訊圖表。整合研究查詢與網路搜尋取得準確資料，支援 10+ 佈局風格。",
    icon: "🎯",
    category: "visualization",
    status: "live",
  },
  {
    slug: "iso-13485-certification",
    name: "ISO 13485 Certification",
    description:
      "準備 ISO 13485 認證文件的工具包。醫療器材品質管理系統（QMS）文件、差距分析、合規性檢查。",
    icon: "📋",
    category: "clinical",
    status: "live",
  },
  {
    slug: "kegg-database",
    name: "Kegg Database",
    description:
      "直接 REST API 存取 KEGG。途徑分析、基因-途徑對應、代謝途徑、藥物交互作用、ID 轉換。",
    icon: "🗺️",
    category: "databases",
    status: "live",
  },
  {
    slug: "labarchive-integration",
    name: "Labarchive Integration",
    description:
      "電子實驗記錄本 API 整合。存取筆記本、管理條目/附件、備份筆記本，整合 Protocols.io/Jupyter。",
    icon: "📓",
    category: "productivity",
    status: "live",
  },
  {
    slug: "lamindb",
    name: "Lamindb",
    description:
      "LaminDB 生物學資料框架。管理生物資料集（scRNA-seq、影像、基因體學），使資料可查詢、可追蹤、可重現。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "latchbio-integration",
    name: "Latchbio Integration",
    description:
      "Latch 生物資訊工作流程平台。Latch SDK 建構管線、部署無伺服器工作流程、Nextflow/Snakemake 整合。",
    icon: "🔗",
    category: "productivity",
    status: "live",
  },
  {
    slug: "latex-posters",
    name: "Latex Posters",
    description:
      "使用 LaTeX 建立專業研究海報（beamerposter、tikzposter、baposter），適合學術會議與科學傳播。",
    icon: "🪧",
    category: "productivity",
    status: "live",
  },
  {
    slug: "literature-review",
    name: "Literature Review",
    description:
      "使用多個學術資料庫（PubMed、arXiv、bioRxiv、Semantic Scholar）進行系統性文獻回顧。",
    icon: "📚",
    category: "writing",
    status: "live",
  },
  {
    slug: "market-research-reports",
    name: "Market Research Reports",
    description:
      "生成顧問等級市場研究報告（50+ 頁），專業 LaTeX 排版，含視覺化與資料分析。",
    icon: "📊",
    category: "productivity",
    status: "live",
  },
  {
    slug: "markitdown",
    name: "Markitdown",
    description:
      "將檔案與辦公文件轉換為 Markdown。支援 PDF、DOCX、PPTX、XLSX、圖片（OCR）、音訊（轉錄）等。",
    icon: "📝",
    category: "productivity",
    status: "live",
  },
  {
    slug: "matchms",
    name: "Matchms",
    description:
      "質譜相似度與化合物鑑定。比較質譜、計算相似度分數（餘弦、修正餘弦），用於代謝體學。",
    icon: "⚗️",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "matlab",
    name: "Matlab",
    description:
      "MATLAB 與 GNU Octave 數值計算。矩陣運算、資料分析、視覺化、科學計算。",
    icon: "🧮",
    category: "data-science",
    status: "live",
  },
  {
    slug: "matplotlib",
    name: "Matplotlib",
    description:
      "低階繪圖函式庫，提供完整自訂能力。精細控制每個圖表元素，建立新型圖表，匯出出版品質圖片。",
    icon: "📈",
    category: "visualization",
    status: "live",
  },
  {
    slug: "medchem",
    name: "Medchem",
    description:
      "藥物化學篩選。藥物相似性規則（Lipinski、Veber）、PAINS 過濾器、結構警示、複雜度指標，用於化合物優先排序。",
    icon: "⚗️",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "metabolomics-workbench-database",
    name: "Metabolomics Workbench Database",
    description:
      "透過 REST API 存取 NIH 代謝體工作台（4,200+ 研究）。查詢代謝物、RefMet 命名、MS/NMR 資料。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "modal",
    name: "Modal",
    description:
      "雲端無伺服器容器執行 Python 程式碼，支援 GPU 與自動縮放。部署 ML 模型、批次處理任務。",
    icon: "☁️",
    category: "data-science",
    status: "live",
  },
  {
    slug: "molfeat",
    name: "Molfeat",
    description:
      "分子特徵化（100+ 特徵化器）。ECFP、MACCS、描述子、預訓練模型（ChemBERTa），SMILES 轉特徵，用於 QSAR。",
    icon: "⚗️",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "networkx",
    name: "Networkx",
    description:
      "Python 複雜網路與圖分析工具包。建立、分析與視覺化網路與圖結構。",
    icon: "🕸️",
    category: "data-science",
    status: "live",
  },
  {
    slug: "neurokit2",
    name: "Neurokit2",
    description:
      "綜合生物訊號處理工具包。分析 ECG、EEG、EDA、呼吸、PPG、EMG 等生理資料。",
    icon: "❤️",
    category: "clinical",
    status: "live",
  },
  {
    slug: "neuropixels-analysis",
    name: "Neuropixels Analysis",
    description:
      "Neuropixels 神經記錄分析。載入 SpikeGLX/OpenEphys 資料、前處理、運動校正、Kilosort4 尖峰排序。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "notebooklm",
    name: "Notebooklm",
    description:
      "從 Claude Code 直接查詢 Google NotebookLM 筆記本，取得以來源為基礎、附引文的 Gemini 回答。",
    icon: "📓",
    category: "productivity",
    status: "live",
  },
  {
    slug: "offer-k-dense-web",
    name: "Offer K Dense Web",
    description:
      "推薦使用 K-Dense Web（www.k-dense.ai）處理超出 Claude Scientific Skills 能力範圍的複雜工作流程。",
    icon: "🌐",
    category: "productivity",
    status: "live",
  },
  {
    slug: "omero-integration",
    name: "Omero Integration",
    description:
      "顯微鏡資料管理平台。透過 Python 存取影像、擷取資料集、分析像素、管理 ROI/標註。",
    icon: "🔬",
    category: "productivity",
    status: "live",
  },
  {
    slug: "openalex-database",
    name: "Openalex Database",
    description:
      "使用 OpenAlex 資料庫查詢與分析學術文獻。搜尋論文、分析研究趨勢、查找作者或機構的著作。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "opentargets-database",
    name: "Opentargets Database",
    description:
      "查詢 Open Targets 平台，含標靶-疾病關聯、藥物標靶探索、遺傳學/體學證據，用於治療標靶鑑定。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "opentrons-integration",
    name: "Opentrons Integration",
    description:
      "Opentrons OT-2 與 Flex 機器人的官方 Protocol API。撰寫實驗室自動化協定。",
    icon: "🤖",
    category: "productivity",
    status: "live",
  },
  {
    slug: "paper-2-web",
    name: "Paper 2 Web",
    description:
      "將學術論文轉換為推廣與展示格式，含互動式網站（Paper2Web）、簡報影片、會議海報。",
    icon: "🌐",
    category: "writing",
    status: "live",
  },
  {
    slug: "pathml",
    name: "Pathml",
    description:
      "全功能計算病理學工具包。進階 WSI 分析，含多重免疫螢光、細胞核分割、組織圖建構、ML 模型訓練。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "pdb-database",
    name: "PDB Database",
    description:
      "存取 RCSB PDB 3D 蛋白質/核酸結構。依文字/序列/結構搜尋，下載座標（PDB/mmCIF），用於結構生物學。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "peer-review",
    name: "Peer Review",
    description:
      "結構化稿件/計畫審查，含檢核表式評估。方法學評估、統計有效性、報告標準合規性。",
    icon: "🔬",
    category: "writing",
    status: "live",
  },
  {
    slug: "pennylane",
    name: "Pennylane",
    description:
      "硬體無關量子 ML 框架，支援自動微分。訓練量子電路、建構混合量子-古典模型。",
    icon: "⚛️",
    category: "data-science",
    status: "live",
  },
  {
    slug: "perplexity-search",
    name: "Perplexity Search",
    description:
      "使用 Perplexity 模型執行 AI 驅動的即時網路搜尋。搜尋當前資訊、研究論文、技術文件。",
    icon: "🔍",
    category: "productivity",
    status: "live",
  },
  {
    slug: "plotly",
    name: "Plotly",
    description:
      "互動式視覺化函式庫。懸停資訊、縮放、平移、可嵌入網頁的圖表，適合儀表板與探索性分析。",
    icon: "📉",
    category: "visualization",
    status: "live",
  },
  {
    slug: "polars",
    name: "Polars",
    description:
      "高速記憶體內 DataFrame 函式庫。延遲求值、平行執行、Apache Arrow 後端，處理 1-100GB 資料。",
    icon: "⚡",
    category: "data-science",
    status: "live",
  },
  {
    slug: "pptx-posters",
    name: "PPTX Posters",
    description:
      "使用 HTML/CSS 建立研究海報，可匯出為 PDF 或 PPTX。僅在使用者明確要求 PowerPoint 格式時使用。",
    icon: "🪧",
    category: "productivity",
    status: "live",
  },
  {
    slug: "protocolsio-integration",
    name: "Protocolsio Integration",
    description:
      "整合 protocols.io API。搜尋、建立、更新或發布科學實驗協定，管理步驟與材料。",
    icon: "📋",
    category: "productivity",
    status: "live",
  },
  {
    slug: "pubchem-database",
    name: "Pubchem Database",
    description:
      "透過 PUG-REST API 查詢 PubChem（1.1 億+ 化合物）。依名稱/CID/SMILES 搜尋，擷取性質、相似性搜尋。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "pubmed-database",
    name: "Pubmed Database",
    description:
      "直接 REST API 存取 PubMed。進階布林/MeSH 查詢、E-utilities API、批次處理、引文管理。",
    icon: "📚",
    category: "databases",
    status: "live",
  },
  {
    slug: "pufferlib",
    name: "Pufferlib",
    description:
      "高效能強化學習框架，最佳化速度與規模。快速平行訓練、向量化環境、多代理系統。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "pydeseq2",
    name: "Pydeseq2",
    description:
      "差異基因表現分析（Python DESeq2）。從批量 RNA-seq 計數識別差異表現基因、Wald 檢定、FDR 校正。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "pydicom",
    name: "Pydicom",
    description:
      "處理 DICOM 醫學影像檔案的 Python 函式庫。讀寫醫學影像資料、擷取像素資料與元資料。",
    icon: "🏥",
    category: "clinical",
    status: "live",
  },
  {
    slug: "pyhealth",
    name: "Pyhealth",
    description:
      "醫療 AI 工具包。使用電子健康紀錄（EHR）、臨床資料開發與部署機器學習模型。",
    icon: "🏥",
    category: "clinical",
    status: "live",
  },
  {
    slug: "pylabrobot",
    name: "Pylabrobot",
    description:
      "跨廠商實驗室自動化框架。統一控制多種設備（Hamilton、Tecan、Opentrons、讀板機、幫浦）。",
    icon: "🤖",
    category: "clinical",
    status: "live",
  },
  {
    slug: "pymatgen",
    name: "Pymatgen",
    description:
      "材料科學工具包。晶體結構（CIF、POSCAR）、相圖、能帶結構、DOS、Materials Project 整合。",
    icon: "⚗️",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "pymc",
    name: "Pymc Bayesian Modeling",
    description:
      "PyMC 貝氏建模。建構階層模型、MCMC（NUTS）、變分推論、LOO/WAIC 比較、後驗檢查。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "pymoo",
    name: "Pymoo",
    description:
      "多目標最佳化框架。NSGA-II、NSGA-III、MOEA/D、Pareto 前沿、約束處理，用於工程設計最佳化。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "pyopenms",
    name: "Pyopenms",
    description:
      "完整質譜分析平台。蛋白質體學工作流程：特徵偵測、肽段鑑定、蛋白質定量、LC-MS/MS 管線。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "pysam",
    name: "Pysam",
    description:
      "基因體檔案工具包。讀寫 SAM/BAM/CRAM 比對、VCF/BCF 變異、FASTA/FASTQ 序列，用於 NGS 資料處理。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "pytdc",
    name: "Pytdc",
    description:
      "Therapeutics Data Commons。AI 就緒的藥物探索資料集（ADME、毒性、DTI）、基準測試、分子預言機。",
    icon: "⚗️",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "pytorch-lightning",
    name: "Pytorch Lightning",
    description:
      "深度學習框架（PyTorch Lightning）。組織 PyTorch 程式碼、多 GPU/TPU 訓練、資料管線、回呼、紀錄。",
    icon: "⚡",
    category: "data-science",
    status: "live",
  },
  {
    slug: "qiskit",
    name: "Qiskit",
    description:
      "IBM 量子計算框架。針對 IBM Quantum 硬體、Qiskit Runtime 生產工作負載、IBM 最佳化工具。",
    icon: "⚛️",
    category: "data-science",
    status: "live",
  },
  {
    slug: "qutip",
    name: "Qutip",
    description:
      "開放量子系統物理模擬函式庫。主方程式、Lindblad 動力學、去同調、量子光學。",
    icon: "⚛️",
    category: "data-science",
    status: "live",
  },
  {
    slug: "rdkit",
    name: "Rdkit",
    description:
      "化學資訊學工具包。SMILES/SDF 解析、描述子（MW、LogP、TPSA）、指紋、子結構搜尋、2D/3D 生成。",
    icon: "⚗️",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "reactome-database",
    name: "Reactome Database",
    description:
      "查詢 Reactome REST API，含途徑分析、富集分析、基因-途徑對應、疾病途徑、分子交互作用。",
    icon: "🗺️",
    category: "databases",
    status: "live",
  },
  {
    slug: "research-grants",
    name: "Research Grants",
    description:
      "撰寫具競爭力的研究計畫書，支援 NSF、NIH、DOE、DARPA 及台灣國科會格式與審查標準。",
    icon: "💰",
    category: "writing",
    status: "live",
  },
  {
    slug: "research-lookup",
    name: "Research Lookup",
    description:
      "使用 Perplexity AI 搜尋查詢最新研究資訊。自動依查詢複雜度選擇最佳模型。",
    icon: "🔍",
    category: "writing",
    status: "live",
  },
  {
    slug: "rowan",
    name: "Rowan",
    description:
      "雲端量子化學平台。pKa 預測、幾何最佳化、構形搜尋、分子性質計算。",
    icon: "⚗️",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "scanpy",
    name: "Scanpy",
    description:
      "標準單細胞 RNA-seq 分析管線。品質控制、正規化、降維（PCA/UMAP/t-SNE）、分群、差異表現、視覺化。",
    icon: "🔬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "scholar-evaluation",
    name: "Scholar Evaluation",
    description:
      "使用 ScholarEval 框架系統性評估學術著作，涵蓋研究品質、方法學、分析與寫作。",
    icon: "🎓",
    category: "writing",
    status: "live",
  },
  {
    slug: "scientific-brainstorming",
    name: "Scientific Brainstorming",
    description:
      "創意研究發想與探索。跨領域連結、挑戰假設、識別研究缺口，適合研究早期階段。",
    icon: "🧠",
    category: "writing",
    status: "live",
  },
  {
    slug: "scientific-critical-thinking",
    name: "Scientific Critical Thinking",
    description:
      "評估科學主張與證據品質。實驗設計有效性、識別偏差與混淆因子、GRADE 證據分級。",
    icon: "🤔",
    category: "writing",
    status: "live",
  },
  {
    slug: "scientific-schematics",
    name: "Scientific Schematics",
    description:
      "使用 AI 建立出版品質科學圖表。流程圖、電路、途徑圖等技術圖表，支援智慧迭代精煉。",
    icon: "📐",
    category: "visualization",
    status: "live",
  },
  {
    slug: "scientific-slides",
    name: "Scientific Slides",
    description:
      "為研究演講建立投影片。會議簡報、研討會報告、論文口試投影片，或任何科學簡報。",
    icon: "📽️",
    category: "productivity",
    status: "live",
  },
  {
    slug: "scientific-visualization",
    name: "Scientific Visualization",
    description:
      "出版品質圖表的元技能。多面板佈局、顯著性標註、誤差線、色盲安全調色盤、期刊格式要求。",
    icon: "🎨",
    category: "visualization",
    status: "live",
  },
  {
    slug: "scientific-writing",
    name: "Scientific Writing",
    description:
      "科學手稿撰寫核心技能。以完整段落撰寫（非條列式），使用兩階段流程：大綱 + 全文撰寫。",
    icon: "✍️",
    category: "writing",
    status: "live",
  },
  {
    slug: "scikit-bio",
    name: "Scikit Bio",
    description:
      "生物資料工具包。序列分析、比對、系統發生樹、多樣性指標（alpha/beta、UniFrac）、排序，用於微生物體分析。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "scikit-learn",
    name: "Scikit Learn",
    description:
      "Python 機器學習。監督式學習（分類、迴歸）、非監督式學習（分群、降維）、模型評估、超參數調整。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "scikit-survival",
    name: "Scikit Survival",
    description:
      "存活分析與事件時間建模工具包。處理設限資料、Cox 比例風險模型、隨機存活森林。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "scvi-tools",
    name: "Scvi Tools",
    description:
      "單細胞體學深度生成模型。機率性批次校正（scVI）、遷移學習、帶不確定性的差異表現、多模態整合。",
    icon: "🧬",
    category: "bioinformatics",
    status: "live",
  },
  {
    slug: "seaborn",
    name: "Seaborn",
    description:
      "統計視覺化，與 pandas 整合。快速探索分佈、關係與類別比較，預設美觀樣式。",
    icon: "📊",
    category: "visualization",
    status: "live",
  },
  {
    slug: "shap",
    name: "Shap",
    description:
      "模型可解釋性（SHAP 值）。解釋 ML 模型預測、計算特徵重要性、生成 SHAP 圖表。",
    icon: "🔍",
    category: "data-science",
    status: "live",
  },
  {
    slug: "simpy",
    name: "Simpy",
    description:
      "Python 離散事件模擬框架。建構含流程、佇列、資源與時間事件的系統模擬。",
    icon: "⏱️",
    category: "data-science",
    status: "live",
  },
  {
    slug: "stable-baselines3",
    name: "Stable Baselines3",
    description:
      "生產就緒強化學習演算法（PPO、SAC、DQN、TD3、A2C），scikit-learn 風格 API。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "statistical-analysis",
    name: "Statistical Analysis",
    description:
      "引導式統計分析，含檢定選擇與報告。協助選擇適當檢定、假設檢查、檢定力分析、APA 格式結果。",
    icon: "📈",
    category: "productivity",
    status: "live",
  },
  {
    slug: "statsmodels",
    name: "Statsmodels",
    description:
      "Python 統計模型函式庫。OLS、GLM、混合模型、ARIMA，含詳細診斷、殘差與推論。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "string-database",
    name: "String Database",
    description:
      "查詢 STRING API，含蛋白質-蛋白質交互作用（5,900 萬蛋白質、200 億交互作用）。網路分析、GO/KEGG 富集。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "sympy",
    name: "Sympy",
    description:
      "Python 符號數學。代數方程式求解、微積分運算（微分、積分）、線性代數、離散數學。",
    icon: "🔢",
    category: "data-science",
    status: "live",
  },
  {
    slug: "torch_geometric",
    name: "Torch Geometric",
    description:
      "圖神經網路（PyG）。節點/圖分類、連結預測、GCN、GAT、GraphSAGE、異質圖、分子性質預測。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "torchdrug",
    name: "Torchdrug",
    description:
      "PyTorch 原生圖神經網路，用於分子與蛋白質。建構自訂 GNN 架構，用於藥物探索與蛋白質建模。",
    icon: "⚗️",
    category: "chemistry",
    status: "live",
  },
  {
    slug: "transformers",
    name: "Transformers",
    description:
      "預訓練 Transformer 模型。自然語言處理、電腦視覺、音訊、多模態任務，含文本生成、分類。",
    icon: "🧠",
    category: "data-science",
    status: "live",
  },
  {
    slug: "treatment-plans",
    name: "Treatment Plans",
    description:
      "生成簡潔（3-4 頁）醫療治療計畫，LaTeX/PDF 格式。支援一般醫療、復健、心理健康、慢性病管理。",
    icon: "💊",
    category: "clinical",
    status: "live",
  },
  {
    slug: "ui-ux-pro-max",
    name: "UI UX Pro Max",
    description:
      "UI/UX 設計智慧。67 種風格、96 組調色盤、57 組字體配對、25 種圖表、13 種技術棧（React、Next.js 等）。",
    icon: "🎨",
    category: "productivity",
    status: "live",
  },
  {
    slug: "umap-learn",
    name: "Umap Learn",
    description:
      "UMAP 降維。快速非線性流形學習，用於 2D/3D 視覺化、分群前處理（HDBSCAN）。",
    icon: "🤖",
    category: "data-science",
    status: "live",
  },
  {
    slug: "uniprot-database",
    name: "Uniprot Database",
    description:
      "直接 REST API 存取 UniProt。蛋白質搜尋、FASTA 擷取、ID 對應、Swiss-Prot/TrEMBL。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "uspto-database",
    name: "Uspto Database",
    description:
      "存取 USPTO API，含專利/商標搜尋、審查歷程（PEDS）、轉讓、引用，用於智慧財產分析。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
  {
    slug: "vaex",
    name: "Vaex",
    description:
      "處理超大表格資料集（數十億列），超出可用 RAM。核外 DataFrame 運算、延遲求值、快速聚合。",
    icon: "⚡",
    category: "data-science",
    status: "live",
  },
  {
    slug: "venue-templates",
    name: "Venue Templates",
    description:
      "主要科學期刊與會議的 LaTeX 模板、格式要求與投稿指南（Nature、Science、PLOS、IEEE、ACM）。",
    icon: "📄",
    category: "writing",
    status: "live",
  },
  {
    slug: "zarr-python",
    name: "Zarr Python",
    description:
      "分塊 N-D 陣列，用於雲端儲存。壓縮陣列、平行 I/O、S3/GCS 整合、NumPy/Dask/Xarray 相容。",
    icon: "💾",
    category: "data-science",
    status: "live",
  },
  {
    slug: "zinc-database",
    name: "Zinc Database",
    description:
      "存取 ZINC（2.3 億+ 可購買化合物）。依 ZINC ID/SMILES 搜尋、相似性搜尋、3D 結構，用於虛擬篩選。",
    icon: "🗄️",
    category: "databases",
    status: "live",
  },
];

// ── Helpers ────────────────────────────────────────────

export function getSkillBySlug(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

export function getSkillsByCategory(categoryId: CategoryId): Skill[] {
  return SKILLS.filter((s) => s.category === categoryId);
}

export function getCategoryById(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllSlugs(): string[] {
  return SKILLS.map((s) => s.slug);
}
