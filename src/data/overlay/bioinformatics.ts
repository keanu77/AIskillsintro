import type { SkillOverlay } from "../types";

export const BIOINFORMATICS: SkillOverlay[] = [
  {
    slug: "13c-metabolic-flux",
    name: "13C Metabolic Flux",
    description:
      "以碳-13 同位素示蹤資料估算細胞內代謝通量（13C-MFA），含原子映射、同位素模擬與多起點擬合診斷。",
  },
  {
    slug: "alphagenome",
    name: "AlphaGenome",
    description:
      "查詢 AlphaGenome Atlas 對 GRCh38 單核苷酸變異的預計算效應，或即時用 AlphaGenome 模型為人類與小鼠變異評分。",
  },
  {
    slug: "anndata",
    name: "Anndata",
    description:
      "單細胞分析中的標註矩陣資料結構。處理 .h5ad 檔案或與 scverse 生態系統整合時使用。",
  },
  {
    slug: "arboreto",
    name: "Arboreto",
    description:
      "從基因表現資料推斷基因調控網路（GRN），使用 GRNBoost2、GENIE3 等可擴展演算法。",
  },
  {
    slug: "bids",
    name: "BIDS",
    description:
      "處理腦影像資料結構（BIDS）資料集：整理 MRI/EEG/MEG/PET 等資料、驗證合規、DICOM 轉 BIDS 與衍生資料。",
  },
  {
    slug: "biopython",
    name: "Biopython",
    description:
      "綜合分子生物學工具包。序列操作、檔案解析（FASTA/GenBank/PDB）、系統發生學、NCBI/PubMed 程式化存取。",
  },
  {
    slug: "bioservices",
    name: "Bioservices",
    description:
      "統一 Python 介面存取 40+ 生物資訊服務。同時查詢 UniProt、KEGG、ChEMBL、Reactome 等多個資料庫。",
  },
  {
    slug: "bulk-rnaseq",
    name: "Bulk RNA-seq",
    description:
      "Bulk RNA-seq 端到端流程：FASTQ 品管與修剪、比對定量、建立計數矩陣，再串接差異表現、富集分析與出版圖表。",
  },
  {
    slug: "cellprofiler",
    name: "CellProfiler",
    description:
      "以可重現的 CellProfiler 流程分析顯微影像：細胞核分割、細胞計數、單一物件螢光量測與批次執行。",
  },
  {
    slug: "cellxgene-census",
    name: "Cellxgene Census",
    description:
      "程式化查詢 CELLxGENE Census（6,100 萬+ 細胞）。跨組織、疾病、細胞類型取得表現資料。",
  },
  {
    slug: "cobrapy",
    name: "Cobrapy",
    description:
      "基於約束的代謝建模（COBRA）。FBA、FVA、基因敲除、通量取樣、SBML 模型，用於系統生物學。",
  },
  {
    slug: "deepspot-m",
    name: "DeepSpot-M",
    description:
      "從 H&E 組織切片以 DeepSpot-M 生成全轉錄體虛擬空間轉錄體表現，可整張切片預測。",
  },
  {
    slug: "deeptools",
    name: "Deeptools",
    description:
      "NGS 分析工具包。BAM 轉 bigWig、品質控制（相關性、PCA）、熱圖/輪廓圖，用於 ChIP-seq、RNA-seq 視覺化。",
  },
  {
    slug: "depmap",
    name: "DepMap",
    description:
      "查詢癌症依賴圖譜（DepMap）的基因依賴分數、藥物敏感性與基因效應，找出癌症弱點與驗證藥物標靶。",
  },
  {
    slug: "etetoolkit",
    name: "Etetoolkit",
    description:
      "系統發生樹工具包（ETE）。樹操作（Newick/NHX）、演化事件偵測、直系/旁系同源、NCBI 分類學、視覺化。",
  },
  {
    slug: "flowio",
    name: "Flowio",
    description:
      "解析 FCS（流式細胞儀標準）檔案 v2.0-3.1。以 NumPy 陣列擷取事件、讀取元資料/通道。",
  },
  {
    slug: "flowkit",
    name: "FlowKit",
    description:
      "用 FlowKit 分析流式細胞儀資料：螢光補償、logicle 轉換、階層式設門與 FlowJo 工作區重現。",
  },
  {
    slug: "geniml",
    name: "Geniml",
    description:
      "處理基因體區間資料（BED 檔案）的機器學習工具。訓練區域嵌入（Region2Vec）、單細胞 ATAC-seq 分析。",
  },
  {
    slug: "genomic-coordinates",
    name: "Genomic Coordinates",
    description:
      "在 BED/GFF/VCF/BAM 等格式間轉換基因體座標、正規化變異表示，並偵測組裝版本或染色體命名不一致。",
  },
  {
    slug: "genomic-intelligence",
    name: "Genomic Intelligence",
    description:
      "用託管的 DNA 語言模型從序列預測啟動子、剪接位點、增強子、染色質狀態與基因表現，無需本地 GPU。",
  },
  {
    slug: "gget",
    name: "Gget",
    description:
      "快速 CLI/Python 查詢 20+ 生物資訊資料庫。基因資訊查詢、BLAST 搜尋、AlphaFold 結構、富集分析。",
  },
  {
    slug: "gtars",
    name: "Gtars",
    description:
      "高效能基因體區間分析工具（Rust + Python）。處理 BED 檔案、覆蓋度追蹤、重疊偵測、ML 模型代幣化。",
  },
  {
    slug: "histolab",
    name: "Histolab",
    description:
      "輕量全切片影像（WSI）切塊擷取與前處理。組織偵測、切塊擷取、H&E 染色正規化。",
  },
  {
    slug: "lamindb",
    name: "Lamindb",
    description:
      "LaminDB 生物學資料框架。管理生物資料集（scRNA-seq、影像、基因體學），使資料可查詢、可追蹤、可重現。",
  },
  {
    slug: "mageck",
    name: "MAGeCK",
    description:
      "以 MAGeCK 分析 pooled CRISPR 篩選（knockout、CRISPRi/a）：guide 計數、品管與基因排名、效應量與 FDR。",
  },
  {
    slug: "neuropixels-analysis",
    name: "Neuropixels Analysis",
    description:
      "Neuropixels 神經記錄分析。載入 SpikeGLX/OpenEphys 資料、前處理、運動校正、Kilosort4 尖峰排序。",
  },
  {
    slug: "nextflow",
    name: "Nextflow",
    description:
      "建立、執行與除錯 Nextflow 與 nf-core 流程，含模組測試、執行器與容器設定。",
  },
  {
    slug: "nwb-conversion",
    name: "NWB Conversion",
    description:
      "以 NeuroConv 與 PyNWB 將神經科學實驗資料轉為 NWB 格式，保留中繼資料與時間基準並做結構驗證。",
  },
  {
    slug: "pacsomatic",
    name: "pacsomatic",
    description:
      "nf-core/pacsomatic 腫瘤-正常配對流程操作工具：驗證輸入、產生樣本表、提交排程器與排除錯誤。",
  },
  {
    slug: "pathml",
    name: "Pathml",
    description:
      "全功能計算病理學工具包。進階 WSI 分析，含多重免疫螢光、細胞核分割、組織圖建構、ML 模型訓練。",
  },
  {
    slug: "pathway-enrichment",
    name: "Pathway Enrichment",
    description:
      "對基因清單或排序資料做通路與基因集富集分析（ORA、GSEA），並解讀 GO、KEGG 等結果。",
  },
  {
    slug: "phylogenetics",
    name: "Phylogenetics",
    description:
      "用 MAFFT、IQ-TREE 2、FastTree 建立與分析親緣樹，並以 ETE3 或 FigTree 視覺化。",
  },
  {
    slug: "polars-bio",
    name: "polars-bio",
    description:
      "在 Polars DataFrame 上進行高效能基因體區間運算（overlap、nearest、coverage）與 BED/VCF/BAM 檔案讀寫。",
  },
  {
    slug: "primer-design",
    name: "Primer Design",
    description:
      "以 Primer3 設計與檢核 PCR／RT-qPCR 引子：熱力學條件、脫靶擴增搜尋、跨外顯子與異構體專一設計。",
  },
  {
    slug: "pydeseq2",
    name: "Pydeseq2",
    description:
      "差異基因表現分析（Python DESeq2）。從批量 RNA-seq 計數識別差異表現基因、Wald 檢定、FDR 校正。",
  },
  {
    slug: "pyopenms",
    name: "Pyopenms",
    description:
      "完整質譜分析平台。蛋白質體學工作流程：特徵偵測、肽段鑑定、蛋白質定量、LC-MS/MS 管線。",
  },
  {
    slug: "pysam",
    name: "Pysam",
    description:
      "基因體檔案工具包。讀寫 SAM/BAM/CRAM 比對、VCF/BCF 變異、FASTA/FASTQ 序列，用於 NGS 資料處理。",
  },
  {
    slug: "qiime2-amplicon",
    name: "QIIME 2 Amplicon",
    description:
      "以 QIIME 2 處理雙端 16S 擴增子定序：引子方向、讀段重疊與中繼資料驗證，產出 ASV 與物種分類。",
  },
  {
    slug: "relion",
    name: "RELION",
    description:
      "驗證並執行 RELION 單顆粒冷凍電顯（cryo-EM）精修與半圖後處理，含 FSC 診斷與遮罩驗證。",
  },
  {
    slug: "scanpy",
    name: "Scanpy",
    description:
      "標準單細胞 RNA-seq 分析管線。品質控制、正規化、降維（PCA/UMAP/t-SNE）、分群、差異表現、視覺化。",
  },
  {
    slug: "scikit-bio",
    name: "Scikit Bio",
    description:
      "生物資料工具包。序列分析、比對、系統發生樹、多樣性指標（alpha/beta、UniFrac）、排序，用於微生物體分析。",
  },
  {
    slug: "scvelo",
    name: "scVelo",
    description:
      "用 scVelo 做 RNA velocity 分析：從未剪接/已剪接 mRNA 推斷細胞狀態轉移、軌跡方向與潛在時間。",
  },
  {
    slug: "scvi-tools",
    name: "Scvi Tools",
    description:
      "單細胞體學深度生成模型。機率性批次校正（scVI）、遷移學習、帶不確定性的差異表現、多模態整合。",
  },
  {
    slug: "tellurium",
    name: "Tellurium",
    description:
      "以 Tellurium 與 libRoadRunner 模擬 SBML／Antimony 生化動力學模型，並匯出可重現的 SED-ML COMBINE 封存檔。",
  },
  {
    slug: "tiledbvcf",
    name: "TileDB-VCF",
    description:
      "以 TileDB 高效儲存與查詢基因體變異資料：可擴充的 VCF/BCF 匯入、增量加入樣本與平行查詢。",
  },
  {
    slug: "waypoint-bio",
    name: "Waypoint Bio",
    description:
      "使用 Outpost Bio 的開源微生物體基礎模型 Waypoint：樣本嵌入、微調、Compass 基準評測。",
  },
];
