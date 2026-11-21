---
question: 監督式學習在學什麼?決策樹怎麼用資訊增益選分裂?過擬合如何偵測與防(偏差-變異、正則化、剪枝)?
keywords: [supervised-learning, decision-tree, overfitting-bias-variance]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Supervised learning [[raw:ai-supervised-wikipedia]](CC BY-SA 4.0)、Decision tree learning [[raw:ai-decisiontree-wikipedia]](CC BY-SA 4.0)、Overfitting [[raw:ai-overfitting-wikipedia]](CC BY-SA 4.0)。canonical=AIMA Ch.19(4e)/Ch.18(3e)(Learning from Examples)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 機器學習:從範例學習 Machine Learning（AIMA Ch.19 4e / Ch.18 3e）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
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
