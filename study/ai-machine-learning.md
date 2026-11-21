---
question: 監督式學習在學什麼?決策樹怎麼用資訊增益選分裂?過擬合如何偵測與防(偏差-變異、正則化、剪枝)?
keywords: [supervised-learning, decision-tree, overfitting-bias-variance]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Supervised learning [[raw:ai-supervised-wikipedia]](CC BY-SA 4.0)、Decision tree learning [[raw:ai-decisiontree-wikipedia]](CC BY-SA 4.0)、Overfitting [[raw:ai-overfitting-wikipedia]](CC BY-SA 4.0)。canonical=AIMA Ch.19(4e)/Ch.18(3e)(Learning from Examples)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 機器學習:從範例學習 Machine Learning（AIMA Ch.19 4e / Ch.18 3e）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★★。
> 一句話:監督式學習從 (x,y) 標註對學一個泛化到新輸入的函數 h;核心張力是**擬合訓練資料 vs 泛化**——偏差-變異權衡。(ai-supervised-wikipedia)

## 1. 監督式學習框架

- 給訓練集 {(xᵢ,yᵢ)},學假設 h:X→Y,使新資料誤差小。y 連續=迴歸、離散=分類。(ai-supervised-wikipedia)
- 要素:假設空間(模型族)、損失函數、最佳化。**歸納偏好(inductive bias)**:Ockham 剃刀——同樣能解釋資料時選最簡單假設。
- 泛化靠**訓練/驗證/測試**切分;交叉驗證估真實誤差。

## 2. 決策樹

- 由根到葉的測試序列;每內節點測一屬性、每葉給類別/值。(ai-decisiontree-wikipedia)
- **分裂準則**:選**資訊增益**(熵下降)最大的屬性——ID3/C4.5;或 **Gini 不純度**——CART。熵 H=−∑p log p,增益=H(父)−加權 H(子)。
- **貪婪遞迴**建樹(每步選當下最佳分裂,不保證全域最優);可讀性高、能處理混合型特徵。

## 3. 過擬合與偏差-變異

- **過擬合**:模型背下訓練雜訊 → 訓練誤差低但測試誤差高;**欠擬合**反之(模型太弱)。(ai-overfitting-wikipedia)
- **偏差-變異權衡**:總誤差 ≈ 偏差² + 變異 + 不可約雜訊。複雜模型低偏差高變異,簡單模型反之。
- **防過擬合**:決策樹**剪枝**(pre/post-pruning)、**正則化**(L1/L2 懲罰複雜度)、更多資料、early stopping、ensemble(隨機森林/boosting)。

## 5. 深化:資訊增益 worked + 偏差-變異分解 + 防過擬合

### 5.1 決策樹資訊增益 worked
14 筆打球資料,9 正 5 負。根熵 H=−(9/14)log₂(9/14)−(5/14)log₂(5/14)=**0.940**。
用「天氣」分裂:晴(2正3負,H=0.971)、陰(4正0負,H=0)、雨(3正2負,H=0.971)。
加權子熵 = (5/14)0.971+(4/14)0+(5/14)0.971=0.693。**增益=0.940−0.693=0.247**。選增益最大的屬性當分裂(ID3)。Gini 不純度 1−Σp² 是 CART 的替代準則。

### 5.2 偏差-變異分解
期望測試誤差 = **偏差²+變異+不可約雜訊**。
- 高偏差(欠擬合):模型太簡單,訓練/測試都差 → 增複雜度/特徵。
- 高變異(過擬合):模型太複雜,訓練好測試差 → 正則化/剪枝/更多資料/ensemble。
depth 深的決策樹=低偏差高變異;剪枝=犧牲一點偏差換降變異。

### 5.3 防過擬合各打哪端
| 方法 | 打擊 | 機制 |
|---|---|---|
| L1/L2 正則 | 變異 | 懲罰大權重,簡化模型 |
| 決策樹剪枝 | 變異 | 砍過細分支 |
| 更多資料 | 變異 | 攤平雜訊 |
| 隨機森林(bagging) | 變異 | 多樹平均降變異 |
| boosting | 偏差 | 序列修正殘差降偏差 |

### 5.4 陷阱
| 陷阱 | 正解 |
|---|---|
| 訓練誤差低=好模型 | 可能過擬合;看**驗證/測試**誤差 |
| 增複雜度總變好 | 過某點後變異升、測試誤差回升(U 形) |
| 資訊增益=熵 | 增益=**父熵−加權子熵**(熵的下降量) |
| 更多資料救欠擬合 | 欠擬合是高偏差,要**增模型複雜度**非加資料 |

## 6. 延伸:評估 + 正則化 + PAC + 深度學習

### 6.1 模型評估與選擇
- **交叉驗證(k-fold)**:估泛化誤差、調超參數,避免測試集洩漏。
- **混淆矩陣**:precision/recall/F1、ROC-AUC(不平衡類別關鍵)。
- **學習曲線**:診斷高偏差(訓練/驗證都高)vs 高變異(間隙大)。

### 6.2 正則化細節
L2(ridge)縮小權重、L1(lasso)**產生稀疏**(特徵選擇)。幾何:L1 的菱形約束尖角落在軸上 → 權重歸零。elastic net 混合兩者。dropout/early stopping 是神經網路的正則。

### 6.3 PAC 學習理論(泛化的理論底)
**可能近似正確**:樣本數 m ≥ (1/ε)(ln|H|+ln(1/δ)) → 以機率 1−δ 學到誤差 ≤ε 的假設。假設空間複雜度(**VC 維**)越大需越多樣本 → 形式化「模型太複雜易過擬合」。沒有歸納偏好(限制 H)就無法泛化(no free lunch)。

### 6.4 決策樹→現代
決策樹(§2)→ 隨機森林/GBDT(表格資料王者)→ 神經網路(影像/語言)。[[ml-algorithms]] 從最佳化角度補 GD/SVM/核。監督之外:半監督、自監督、遷移學習。

## 我的想法 / 啟發

- **偏差-變異是 ML 的中心對偶**,資格考必考:要能把「過擬合=高變異」「欠擬合=高偏差」對上,並說出三種防法(正則化/剪枝/更多資料)各打哪一端。
- **決策樹的資訊增益=熵的應用**,把 [[ai-probabilistic-reasoning]] 的機率/熵接到學習:選分裂=最大化標籤的確定性增量。
- **Ockham 剃刀=歸納偏好**:沒有偏好就無法泛化(no free lunch)。這跟 [[ai-search]] 的啟發式一樣,是「加入先驗知識換效率/泛化」。

## Next action / 下一步

1. 補隨機森林/AdaBoost ensemble + 交叉驗證完整流程。
2. 建強化學習(AIMA Ch.22),接「從範例學」到「從獎勵學」。

## 交叉引用 / 出處
- raw:`wiki/raw/ai-supervised-wikipedia.md`、`ai-decisiontree-wikipedia.md`、`ai-overfitting-wikipedia.md`
- [[ai-probabilistic-reasoning]] — 樸素貝氏分類器;熵/資訊增益;[[ai-search]] — 歸納偏好=啟發式先驗
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.18/19 學習)
