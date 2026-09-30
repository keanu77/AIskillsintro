import type { SkillOverlay } from "../types";

export const CHEMISTRY: SkillOverlay[] = [
  {
    slug: "adaptyv",
    name: "Adaptyv",
    icon: "🧬",
    description:
      "自動化蛋白質測試與驗證的雲端實驗室平台。設計蛋白質時進行實驗驗證，含結合分析、表現測試。",
  },
  {
    slug: "datamol",
    name: "Datamol",
    icon: "⚗️",
    description:
      "RDKit 的 Python 友善包裝。標準藥物探索工具：SMILES 解析、標準化、描述子、指紋、分群、3D 構形。",
  },
  {
    slug: "deepchem",
    name: "Deepchem",
    icon: "🧪",
    description:
      "分子機器學習。多元特徵化器與預建資料集，用於性質預測（ADMET、毒性）、GNN、MoleculeNet 基準測試。",
  },
  {
    slug: "diffdock",
    name: "Diffdock",
    icon: "🔗",
    description:
      "基於擴散的分子對接。從 PDB/SMILES 預測蛋白質-配體結合姿態、信賴度評分、虛擬篩選，用於結構導向藥物設計。",
  },
  {
    slug: "esm",
    name: "Esm",
    icon: "🧬",
    description:
      "蛋白質語言模型工具包，含 ESM3（跨序列、結構、功能的生成式多模態蛋白質設計）與 ESM C（高效嵌入）。",
  },
  {
    slug: "ginkgo-cloud-lab",
    name: "Ginkgo Cloud Lab",
    icon: "🧫",
    description:
      "在 Ginkgo Bioworks 雲端實驗室提交與管理自動化實驗流程，如蛋白表現純化、mRNA 合成與酵素分析。",
  },
  {
    slug: "glycoengineering",
    name: "Glycoengineering",
    icon: "🍬",
    description:
      "分析與工程化蛋白質醣基化：掃描 N-醣基化序列、預測 O-醣基化熱點，用於抗體最佳化與疫苗設計。",
  },
  {
    slug: "matchms",
    name: "Matchms",
    icon: "⚗️",
    description:
      "質譜相似度與化合物鑑定。比較質譜、計算相似度分數（餘弦、修正餘弦），用於代謝體學。",
  },
  {
    slug: "medchem",
    name: "Medchem",
    icon: "⚗️",
    description:
      "藥物化學篩選。藥物相似性規則（Lipinski、Veber）、PAINS 過濾器、結構警示、複雜度指標，用於化合物優先排序。",
  },
  {
    slug: "molecular-dynamics",
    name: "Molecular Dynamics",
    icon: "⚛️",
    description:
      "以 OpenMM 與 MDAnalysis 執行並分析分子動力學模擬：建系統、力場、能量最小化與軌跡分析。",
  },
  {
    slug: "molfeat",
    name: "Molfeat",
    icon: "⚗️",
    description:
      "分子特徵化（100+ 特徵化器）。ECFP、MACCS、描述子、預訓練模型（ChemBERTa），SMILES 轉特徵，用於 QSAR。",
  },
  {
    slug: "pymatgen",
    name: "Pymatgen",
    icon: "⚗️",
    description:
      "材料科學工具包。晶體結構（CIF、POSCAR）、相圖、能帶結構、DOS、Materials Project 整合。",
  },
  {
    slug: "pytdc",
    name: "Pytdc",
    icon: "⚗️",
    description:
      "Therapeutics Data Commons。AI 就緒的藥物探索資料集（ADME、毒性、DTI）、基準測試、分子預言機。",
  },
  {
    slug: "rdkit",
    name: "Rdkit",
    icon: "⚗️",
    description:
      "化學資訊學工具包。SMILES/SDF 解析、描述子（MW、LogP、TPSA）、指紋、子結構搜尋、2D/3D 生成。",
  },
  {
    slug: "rowan",
    name: "Rowan",
    icon: "⚗️",
    description:
      "雲端量子化學平台。pKa 預測、幾何最佳化、構形搜尋、分子性質計算。",
  },
  {
    slug: "tamarind",
    name: "Tamarind",
    icon: "🧪",
    description:
      "透過 Tamarind Bio 平台使用 AlphaFold、Boltz、RFdiffusion、ProteinMPNN 等開源分子設計工具，無需本地 GPU。",
  },
  {
    slug: "torchdrug",
    name: "Torchdrug",
    icon: "⚗️",
    description:
      "PyTorch 原生圖神經網路，用於分子與蛋白質。建構自訂 GNN 架構，用於藥物探索與蛋白質建模。",
  },
];
