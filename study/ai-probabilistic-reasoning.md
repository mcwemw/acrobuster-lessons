---
question: Bayes 定理怎麼把先驗翻成後驗?貝氏網路如何用條件獨立壓縮聯合分布?d-分隔/Markov blanket 判什麼?
keywords: [bayes-theorem, bayesian-network, conditional-independence]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Bayes' theorem [[raw:ai-bayes-wikipedia]](CC BY-SA 4.0)、Bayesian network [[raw:ai-bayesnet-wikipedia]](CC BY-SA 4.0)、Conditional independence [[raw:ai-condindep-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.12-13(Quantifying Uncertainty / Probabilistic Reasoning)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 機率推論與貝氏網路 Probabilistic Reasoning（AIMA Ch.12-13）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
> 一句話:用機率量化不確定性,**Bayes 定理**把觀測轉成後驗信念;**貝氏網路**用條件獨立把指數大的聯合分布壓成每節點只依賴父節點的乘積。(ai-bayes-wikipedia)

## 1. Bayes 定理

- **P(H|E) = P(E|H)·P(H) / P(E)**:後驗 ∝ 概似 × 先驗。P(E)=∑_h P(E|h)P(h)(正規化)。(ai-bayes-wikipedia)
- 連鎖更新:多證據時逐步把後驗當新先驗。資格考常考「疾病檢測」假陽性直覺陷阱(低盛行率下即使高敏感度,陽性後驗仍可能低)。
- **樸素貝氏(Naive Bayes)**:假設各特徵在類別給定下條件獨立 → P(c|x)∝P(c)∏P(xi|c),簡單但常意外好用([[ai-machine-learning]] 分類)。

## 2. 條件獨立

- **X⊥Y | Z**:給定 Z 後 X 與 Y 無關,P(X,Y|Z)=P(X|Z)P(Y|Z)。(ai-condindep-wikipedia)
- 這是壓縮的鑰匙:沒有條件獨立,n 個二值變數聯合表要 2ⁿ 個數;有稀疏依賴就能大幅縮小。

## 3. 貝氏網路

- **結構**:有向無環圖(DAG),節點=隨機變數,邊=直接依賴;每節點帶 **CPT**(給定父節點的條件機率表)。(ai-bayesnet-wikipedia)
- **因子分解**:P(X₁,…,Xₙ) = ∏ᵢ P(Xᵢ | Parents(Xᵢ))。10 個二值變數、每點 ≤3 父 → 存 ~80 值 vs 樸素 2¹⁰=1024 值。(ai-bayesnet-wikipedia)
- **d-分隔(d-separation)**:圖準則判條件獨立——Z 阻斷 X↔Y 所有路徑則 X⊥Y|Z(鏈/叉型被中間觀測阻斷;對撞型 collider 反而被觀測打開)。
- **Markov blanket**:一節點的父+子+子的其他父;給定 blanket,該節點與其餘網路獨立。
- **推論**:精確(變數消去 variable elimination、團樹)NP-hard;近似(取樣:likelihood weighting、Gibbs MCMC)。

## 我的想法 / 啟發

- **Bayes 網的威力=條件獨立換儲存/推論**:跟 [[ai-csp]] 用結構剪枝、[[dynamic-programming]] 用子問題重疊同一哲學——顯式結構讓指數問題可解。
- **d-分隔的對撞型(collider)最反直覺**:X→Z←Y,觀測 Z 反而讓 X、Y 相關(解釋消去 explaining away)。資格考高頻陷阱,務必能畫三種連接判獨立。
- **精確推論 NP-hard → 近似取樣**,這條與 [[randomized-algorithms]] Monte Carlo 接得上:Gibbs/MCMC 就是隨機化近似。

## Next action / 下一步

1. 補變數消去完整 trace + d-分隔三型(鏈/叉/對撞)判定表。
2. 建決策論/MDP(AIMA Ch.16-17),接機率到效用最大化(expectiminimax→MDP)。

## 交叉引用 / 出處
- raw:`wiki/raw/ai-bayes-wikipedia.md`、`ai-bayesnet-wikipedia.md`、`ai-condindep-wikipedia.md`
- [[ai-adversarial-search]] — expectiminimax 的機率加權通往決策論;[[randomized-algorithms]] — 近似推論靠 MC 取樣
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.12-13)
