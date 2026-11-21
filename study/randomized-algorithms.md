---
question: Las Vegas 與 Monte Carlo 隨機化演算法差在哪(對不對 vs 跑多久)？期望值分析怎麼算?為何隨機化能避最壞?
keywords: [randomized-algorithms, las-vegas-vs-monte-carlo, expected-analysis]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Randomized algorithm [[raw:rand-overview-wikipedia]](CC BY-SA 4.0)、Las Vegas [[raw:rand-lasvegas-wikipedia]](CC BY-SA 4.0)、Monte Carlo [[raw:rand-montecarlo-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.5。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 隨機化演算法 Randomized Algorithms（CLRS Ch.5）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★★。
> 一句話:用**隨機數**當輸入之一,把「某些輸入最壞」攤成「對任意輸入期望好」;分兩類—Las Vegas(永遠對、時間隨機)、Monte Carlo(時間定、偶爾錯)。(rand-overview-wikipedia)

## 1. 兩大類（資格考核心對照)

- **Las Vegas**:**結果永遠正確**,但**執行時間是隨機變數**(期望有界)。例:隨機化 Quicksort / Quickselect(見 [[sorting]]/[[selection]])。(rand-lasvegas-wikipedia)
- **Monte Carlo**:**時間固定(或有界)**,但**有一定機率答錯**(可重複執行把錯誤率壓到任意小)。例:Miller-Rabin 質數測試、Karger min-cut。(rand-montecarlo-wikipedia)
- 口訣:**LV 賭時間、MC 賭正確性**。Monte Carlo 可用「驗證器」轉成 Las Vegas(若驗證便宜)。

## 2. 期望值分析（怎麼算)

- 對**隨機選擇**(非輸入分佈)取期望 → 得「對任意輸入的期望成本」,與 [[amortized-analysis]]「最壞序列平均」不同、與「平均情形(對輸入分佈)」也不同。
- 工具:期望線性性(E[X+Y]=E[X]+E[Y])、指示變數(indicator random variable)。
- 例:隨機化 Quicksort 期望比較次數 O(n log n)——用指示變數算任兩元素被比較的機率 2/(j−i+1)。

## 3. 為什麼隨機化有用

- **避開最壞輸入**:固定 pivot 的 Quicksort 對已排序輸入最壞 O(n²);**隨機 pivot** 讓「壞情形」不綁定特定輸入 → 對手無法構造 → 期望 O(n log n)。(rand-overview-wikipedia)
- **簡化 + 加速**:很多問題隨機化後演算法更短更快(min-cut、質數測試、雜湊)。

## 4. 經典例

- 隨機化 Quicksort / Quickselect(LV);雇用問題(hiring problem,期望分析範本);Miller-Rabin 質數測試(MC);Karger 最小割(MC);通用雜湊(避對手碰撞)。

## 我的想法 / 啟發

- **三種「平均」要分清**(資格考最愛陷阱):**平均情形**=對輸入分佈取期望(假設輸入隨機);**攤還**=最壞序列的確定性平均([[amortized-analysis]]);**隨機化期望**=對演算法內部亂數取期望(輸入可任意、最壞)。隨機化的強處就是**不假設輸入分佈**。
- **指示變數 + 期望線性性**是算隨機化期望的萬用工具,務必會套(Quicksort 的 2/(j−i+1) 是母題)。
- LV↔MC 的轉換(驗證器)是高分觀念。

## Next action / 下一步

1. 建二分圖匹配(Ch.25)、近似演算法(Ch.35)補 ★★ 缺章。
2. 補 Miller-Rabin 錯誤率 + Karger min-cut 成功機率 + hiring problem 完整期望推導。

## 交叉引用 / 出處
- raw:`wiki/raw/rand-overview-wikipedia.md`、`rand-lasvegas-wikipedia.md`、`rand-montecarlo-wikipedia.md`
- [[sorting]] / [[selection]] — 隨機化 Quicksort/Quickselect=LV;[[amortized-analysis]] — 與攤還的「平均」區分
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.5)
