import type { SkillOverlay } from "../types";

export const DATA_SCIENCE: SkillOverlay[] = [
  {
    slug: "aeon",
    name: "Aeon",
    description:
      "時間序列機器學習工具。分類、迴歸、分群、預測、異常偵測、分割與相似性搜尋。",
  },
  {
    slug: "arbor",
    name: "Arbor",
    description:
      "以假說樹精煉（HTR）自動反覆改進程式、訓練流程、agent 或 prompt，對照目標與評估器並避免過擬合。",
  },
  {
    slug: "astropy",
    name: "Astropy",
    description:
      "天文學與天體物理學 Python 函式庫。天體座標、物理單位、FITS 檔案、宇宙學計算。",
  },
  {
    slug: "cirq",
    name: "Cirq",
    description:
      "Google 量子計算框架。設計雜訊感知電路、量子特性化實驗，針對 Google Quantum AI 硬體優化。",
  },
  {
    slug: "dask",
    name: "Dask",
    description:
      "分散式運算，處理超過記憶體的 pandas/NumPy 工作流程。平行檔案處理、分散式 DataFrame。",
  },
  {
    slug: "datalad",
    name: "DataLad",
    description:
      "用 DataLad 與 git-annex 取得、版本控管與發佈科學資料集（OpenNeuro、DANDI 等），並記錄計算出處。",
  },
  {
    slug: "experimental-design",
    name: "Experimental Design",
    description:
      "在收集資料前設計實驗：隨機化、區組、分層、對照與（部分）因子設計，讓結果可被解讀。",
  },
  {
    slug: "fluidsim",
    name: "Fluidsim",
    description:
      "計算流體力學模擬框架。Navier-Stokes 方程式（2D/3D）、淺水方程式、分層流。",
  },
  {
    slug: "geomaster",
    name: "GeoMaster",
    description:
      "地理空間科學：遙測影像（Sentinel、Landsat、SAR）、GIS、空間統計、點雲與雲端原生工作流程。",
  },
  {
    slug: "geopandas",
    name: "Geopandas",
    description:
      "地理空間向量資料 Python 函式庫。處理 shapefiles、GeoJSON、GeoPackage，空間分析與幾何運算。",
  },
  {
    slug: "hugging-science",
    name: "Hugging Science",
    description:
      "科學領域 AI/ML 資源導覽：從 Hugging Science 目錄找出相關的資料集、模型與互動 Spaces。",
  },
  {
    slug: "hypogenic",
    name: "Hypogenic",
    description:
      "LLM 驅動的假說自動生成與測試。在表格資料集上系統性探索假說與模式。",
  },
  {
    slug: "matlab",
    name: "Matlab",
    description:
      "MATLAB 與 GNU Octave 數值計算。矩陣運算、資料分析、視覺化、科學計算。",
  },
  {
    slug: "modal",
    name: "Modal",
    description:
      "雲端無伺服器容器執行 Python 程式碼，支援 GPU 與自動縮放。部署 ML 模型、批次處理任務。",
  },
  {
    slug: "networkx",
    name: "Networkx",
    description:
      "Python 複雜網路與圖分析工具包。建立、分析與視覺化網路與圖結構。",
  },
  {
    slug: "openpiv",
    name: "OpenPIV",
    description:
      "以 OpenPIV 做粒子影像測速（PIV）：從影像對萃取速度場，計算渦度、應變率與紊流統計。",
  },
  {
    slug: "optimize-for-gpu",
    name: "Optimize for GPU",
    description:
      "在 NVIDIA GPU 上加速科學 Python（CuPy、cuDF、cuML 等），並驗證結果正確且確實更快。",
  },
  {
    slug: "pennylane",
    name: "Pennylane",
    description:
      "硬體無關量子 ML 框架，支援自動微分。訓練量子電路、建構混合量子-古典模型。",
  },
  {
    slug: "polars",
    name: "Polars",
    description:
      "高速記憶體內 DataFrame 函式庫。延遲求值、平行執行、Apache Arrow 後端，處理 1-100GB 資料。",
  },
  {
    slug: "pufferlib",
    name: "Pufferlib",
    description:
      "高效能強化學習框架，最佳化速度與規模。快速平行訓練、向量化環境、多代理系統。",
  },
  {
    slug: "pymc",
    name: "Pymc Bayesian Modeling",
    description:
      "PyMC 貝氏建模。建構階層模型、MCMC（NUTS）、變分推論、LOO/WAIC 比較、後驗檢查。",
  },
  {
    slug: "pymoo",
    name: "Pymoo",
    description:
      "多目標最佳化框架。NSGA-II、NSGA-III、MOEA/D、Pareto 前沿、約束處理，用於工程設計最佳化。",
  },
  {
    slug: "pytorch-lightning",
    name: "Pytorch Lightning",
    description:
      "深度學習框架（PyTorch Lightning）。組織 PyTorch 程式碼、多 GPU/TPU 訓練、資料管線、回呼、紀錄。",
  },
  {
    slug: "qiskit",
    name: "Qiskit",
    description:
      "IBM 量子計算框架。針對 IBM Quantum 硬體、Qiskit Runtime 生產工作負載、IBM 最佳化工具。",
  },
  {
    slug: "qutip",
    name: "Qutip",
    description:
      "開放量子系統物理模擬函式庫。主方程式、Lindblad 動力學、去同調、量子光學。",
  },
  {
    slug: "scikit-learn",
    name: "Scikit Learn",
    description:
      "Python 機器學習。監督式學習（分類、迴歸）、非監督式學習（分群、降維）、模型評估、超參數調整。",
  },
  {
    slug: "scikit-survival",
    name: "Scikit Survival",
    description:
      "存活分析與事件時間建模工具包。處理設限資料、Cox 比例風險模型、隨機存活森林。",
  },
  {
    slug: "shap",
    name: "Shap",
    description:
      "模型可解釋性（SHAP 值）。解釋 ML 模型預測、計算特徵重要性、生成 SHAP 圖表。",
  },
  {
    slug: "simpy",
    name: "Simpy",
    description:
      "Python 離散事件模擬框架。建構含流程、佇列、資源與時間事件的系統模擬。",
  },
  {
    slug: "stable-baselines3",
    name: "Stable Baselines3",
    description:
      "生產就緒強化學習演算法（PPO、SAC、DQN、TD3、A2C），scikit-learn 風格 API。",
  },
  {
    slug: "statistical-power",
    name: "Statistical Power",
    description:
      "研究規劃的樣本數與檢定力計算：t 檢定、ANOVA、比例、相關等的事前檢定力分析與最小可偵測效果。",
  },
  {
    slug: "statsmodels",
    name: "Statsmodels",
    description:
      "Python 統計模型函式庫。OLS、GLM、混合模型、ARIMA，含詳細診斷、殘差與推論。",
  },
  {
    slug: "sympy",
    name: "Sympy",
    description:
      "Python 符號數學。代數方程式求解、微積分運算（微分、積分）、線性代數、離散數學。",
  },
  {
    slug: "timesfm-forecasting",
    name: "TimesFM Forecasting",
    description:
      "用 Google TimesFM 基礎模型做零樣本時間序列預測，含點預測與預測區間，免訓練自訂模型。",
  },
  {
    slug: "torch-geometric",
    name: "Torch Geometric",
    description:
      "圖神經網路（PyG）。節點/圖分類、連結預測、GCN、GAT、GraphSAGE、異質圖、分子性質預測。",
  },
  {
    slug: "transformers",
    name: "Transformers",
    description:
      "預訓練 Transformer 模型。自然語言處理、電腦視覺、音訊、多模態任務，含文本生成、分類。",
  },
  {
    slug: "umap-learn",
    name: "Umap Learn",
    description:
      "UMAP 降維。快速非線性流形學習，用於 2D/3D 視覺化、分群前處理（HDBSCAN）。",
  },
  {
    slug: "uncertainty-and-units",
    name: "Uncertainty & Units",
    description:
      "用 pint 與 uncertainties 追蹤物理單位並傳遞量測不確定度：單位換算、GUM 不確定度預算與蒙地卡羅傳遞。",
  },
  {
    slug: "vaex",
    name: "Vaex",
    description:
      "處理超大表格資料集（數十億列），超出可用 RAM。核外 DataFrame 運算、延遲求值、快速聚合。",
  },
  {
    slug: "zarr-python",
    name: "Zarr Python",
    description:
      "分塊 N-D 陣列，用於雲端儲存。壓縮陣列、平行 I/O、S3/GCS 整合、NumPy/Dask/Xarray 相容。",
  },
];
