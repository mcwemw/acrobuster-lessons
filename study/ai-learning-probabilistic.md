---
question: 怎麼從資料學機率模型的參數?最大概似(MLE)vs 貝氏學習(MAP/後驗)差在哪?有隱變數時 EM 怎麼交替收斂?樸素貝氏為何簡單卻好用?
keywords: [maximum-likelihood, bayesian-learning-map, em-algorithm]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Maximum likelihood estimation [[raw:aic20-mle-wikipedia]](CC BY-SA 4.0)、Expectation–maximization [[raw:aic20-em-wikipedia]](CC BY-SA 4.0)、Naive Bayes classifier [[raw:aic20-naivebayes-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.20(Learning Probabilistic Models)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 學習機率模型 Learning Probabilistic Models（AIMA Ch.20）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
> 一句話:從資料估機率模型參數——頻率派用**最大概似(MLE)**、貝氏派用**先驗+後驗(MAP/完整貝氏)**;隱變數下用 **EM** 交替求解。(aic20-mle-wikipedia)

## 1. 最大概似估計(MLE)

- 選參數 θ 使資料的概似 **L(θ)=∏ P(xᵢ|θ)** 最大(常取 log 相加)。(aic20-mle-wikipedia)
- 例:n 次拋硬幣 h 正,MLE p̂=h/n;高斯 MLE 即樣本均值/變異。
- 完全觀測 + 表格 CPT 的貝氏網:MLE = **數頻率**(各條件下的計數比例)。
- 缺點:小樣本過擬合(0 計數 → 機率 0),需**平滑**(Laplace/加一)。

## 2. 貝氏學習(先驗 + 後驗)

- **後驗** P(θ|data) ∝ P(data|θ)·P(θ):把先驗信念 + 資料更新成後驗。(aic20-mle-wikipedia 對照)
- **MAP**:取後驗眾數 argmax P(θ|data) = MLE + 先驗正則(相當於加懲罰,呼應 [[ai-machine-learning]] L2)。
- **完整貝氏**:對 θ 積分做預測(不選單一 θ),抗過擬合但計算貴。
- **共軛先驗**(如 Beta-二項、Dirichlet-多項)使後驗同族、更新封閉解。

## 3. EM 演算法(隱變數)

- 有隱變數(未觀測)時概似難直接最大化 → **EM 交替**:(aic20-em-wikipedia)
  - **E 步**:用當前 θ 算隱變數的後驗(期望 / 責任度 responsibility)。
  - **M 步**:當作「軟標籤」最大化期望完整對數概似,更新 θ。
- **單調**:每輪概似不減 → 收斂到**局部**最優(初始敏感,類 [[ml-algorithms]] K-means,K-means 即硬 EM)。
- 應用:高斯混合(GMM)、HMM 參數(Baum-Welch,見 [[ai-temporal-models]])、缺值填補。

## 深化:MLE worked + EM worked + 樸素貝氏

### MLE worked(高斯)
樣本 x₁..xₙ,log L = −(n/2)log(2πσ²) − Σ(xᵢ−μ)²/(2σ²)。對 μ 求導=0 → **μ̂=樣本均值**;對 σ² → **σ̂²=Σ(xᵢ−μ̂)²/n**(有偏,除 n 非 n−1)。MLE 系統化:寫 log 概似、求導、解零。

### EM for GMM(worked 概念)
兩高斯混合。E 步:每點 i 對群 k 的責任度 γᵢₖ=πₖN(xᵢ|μₖ,Σₖ)/Σ_j(...)。M 步:μₖ=Σγᵢₖxᵢ/Σγᵢₖ(加權均值)、更新 Σₖ、πₖ=平均責任。交替到對數概似收斂。硬指派(γ∈{0,1})退化成 K-means。

### 樸素貝氏分類
假設特徵在類別給定下**條件獨立**:P(c|x)∝P(c)∏P(xᵢ|c)。訓練=數頻率(+Laplace 平滑),預測=取最大。假設常不成立但分類仍準(只需 argmax 對);偏差高變異低,小資料穩健([[ai-probabilistic-reasoning]] 樸素貝氏)。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| MLE 無過擬合 | 小樣本 0 計數→機率 0;需平滑/先驗 |
| MAP=完整貝氏 | MAP 取點估計(眾數);完整貝氏對 θ 積分 |
| EM 到全域最優 | **局部**最優,初始敏感(多次重啟) |
| 樸素貝氏要特徵真獨立 | 假設常錯但分類仍常準(只需排序對) |

## 我的想法 / 啟發

- **MLE vs 貝氏是統計學習的根本二分**:頻率派點估計 vs 貝氏派分布;MAP 是橋(MLE+先驗正則)。資格考要能寫 MLE 推導 + 說 EM 的 E/M 各做什麼。
- **EM 的「軟標籤交替」= K-means 的機率版**([[ml-algorithms]]):把 [[ai-machine-learning]] 的分群/缺值/HMM 學習統一。單調收斂到局部最優是必考性質。
- **先驗=正則化**的對應很美:MAP 的先驗項就是 [[ai-machine-learning]] 的 L1/L2 懲罰——貝氏觀點下正則化有了機率解釋。

## Next action / 下一步

1. 補 EM 的 ELBO/下界單調性證明 + 共軛先驗完整推導。
2. 接 [ai-deep-learning](ai-deep-learning.md)（Ch.21）——參數學習從機率模型推到神經網路(MLE=交叉熵最小化)。

## 交叉引用 / 出處
- raw:`wiki/raw/aic20-mle-wikipedia.md`、`aic20-em-wikipedia.md`、`aic20-naivebayes-wikipedia.md`
- [[ai-machine-learning]] — 先驗=正則化;[[ml-algorithms]] — K-means=硬 EM;[[ai-temporal-models]] — Baum-Welch=HMM 的 EM
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.20)
