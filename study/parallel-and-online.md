---
question: 平行演算法怎麼用 work/span 量分析?Brent 定理與加速比上限?線上演算法沒有未來資訊,競爭比怎麼衡量好壞?
keywords: [parallel-work-span, brent-theorem, online-competitive-ratio]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Analysis of parallel algorithms [[raw:para-analysis-wikipedia]](CC BY-SA 4.0)、Online algorithm [[raw:online-algo-wikipedia]](CC BY-SA 4.0)、Competitive analysis [[raw:online-competitive-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.26(Parallel Algorithms)+Ch.27(Online Algorithms)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 平行與線上演算法（CLRS Ch.26 + Ch.27）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · 一般。
> 一句話:平行演算法用 **work(總工作)與 span(最長相依鏈)**兩量分析可達加速;線上演算法沒有未來輸入,用**競爭比**衡量它比事後最優差幾倍。(para-analysis-wikipedia)

## 1. 平行演算法(Ch.26)

- **work T₁**=單處理器總運算量;**span T∞**=無限處理器下最長相依路徑(critical path)。(para-analysis-wikipedia)
- **平行度 = T₁/T∞**;p 個處理器執行時間下界 Tₚ ≥ max(T₁/p, T∞)。
- **Brent 定理**:Tₚ ≤ T₁/p + T∞ → 處理器夠多時受 span 支配;work 與 span 都要小才好。
- **Amdahl 定律**:序列比例 s 限制加速比 ≤ 1/s(再多處理器也救不了序列部分)。CLRS 用 fork-join / 動態多執行緒模型(如平行 merge sort:work O(n log n)、span O(log³n))。

## 2. 線上演算法(Ch.27)

- **線上**:輸入逐一到達,每步**不知未來**就要決策且不可反悔(vs 離線=一次看全部)。(online-algo-wikipedia)
- **競爭比(competitive ratio)**:線上演算法成本 ≤ **c × 離線最優成本 + 常數**,則 c-競爭。c 越接近 1 越好。(online-competitive-wikipedia)
- **對手論證**:像 [[randomized-algorithms]] 避最壞,分析常假設對手挑最糟輸入序列;隨機化線上演算法可降低競爭比。
- 經典:**滑雪租買問題**(2-競爭)、**頁面置換 LRU**(k-競爭)、**list update**、**k-server**。

## 3. 深化:work-span worked + Brent 證明 + 競爭比

### 3.1 平行 merge sort 的 work/span
work T₁=Θ(n log n)(同序列)。span:遞迴兩半可**並行**,但 merge 若序列化則 span=Θ(n);用平行 merge(二分找中點)可把 merge span 降到 Θ(log²n) → 總 **span T∞=Θ(log³n)**。平行度 T₁/T∞=Θ(n/log²n),高度可平行。

### 3.2 Brent 定理
Tₚ ≤ T₁/p + T∞。證明:把計算分成 T∞ 個「層」,第 i 層有 mᵢ 個單位工作(Σmᵢ=T₁),p 處理器做完該層需 ⌈mᵢ/p⌉ ≤ mᵢ/p+1 步 → Tₚ ≤ Σ(mᵢ/p+1)=T₁/p+T∞。∎ 意義:p 小時受 work/p 限、p 大時受 span 限。

### 3.3 滑雪租買 2-競爭(online worked)
租 1/天,買 B 元永久用。不知還要滑幾天。**策略**:前 B−1 天租,第 B 天買。
- 若實際滑 d<B 天:成本 d,離線最優也 d → 比 1。
- 若 d≥B:成本 (B−1)+B=2B−1,離線最優 min(d,B)=B → 比 (2B−1)/B <2。
故 **2-競爭**(最壞接近 2)。這是「無未來資訊下用對手論證定策略」的母題。

### 3.4 陷阱
| 陷阱 | 正解 |
|---|---|
| 加處理器一定線性加速 | 受 **span 下限**(T∞)卡;Amdahl 序列部分 |
| 競爭比要知未來 | 競爭比比的是**離線最優**(上帝視角);線上演算法本身無未來 |
| LRU 最優 | LRU 是 k-競爭(k=快取大小);無線上演算法能 <k-競爭(確定性下界) |
| 隨機化線上無用 | 隨機化可破確定性下界(如 paging O(log k)-競爭) |

## 4. 延伸:PRAM + 平行原語 + 線上進階

### 4.1 PRAM 模型與平行原語
**PRAM**:共享記憶體多處理器,按同時讀/寫分 EREW/CREW/CRCW。核心可平行原語:
- **prefix sum(scan)**:O(log n) span、O(n) work,平行前綴和是無數平行演算法的積木。
- **reduce**:O(log n) 樹狀歸約。
- 平行 merge/sort、list ranking、圖連通性皆建於 scan/reduce。

### 4.2 work-efficient 的意義
平行演算法理想:work 與最佳序列同階(work-efficient)+ span 小。例平行 prefix sum work O(n)=序列最佳、span O(log n)。work 爆掉(如 O(n log n) 做本可 O(n) 的事)即使 span 小也浪費處理器。

### 4.3 線上演算法進階
- **k-server 問題**:k 個移動伺服器服務請求序列,最小化移動距離;確定性下界 k-競爭。
- **paging/caching**:LRU/FIFO k-競爭;隨機化 marking 演算法 O(log k)-競爭(破確定性下界)。
- **yao's principle**:隨機化演算法下界 = 某輸入分佈上確定性演算法的期望成本下界(min-max),證隨機化競爭比下界的工具。

### 4.4 分散式/平行的現實模型
MapReduce、BSP(bulk synchronous）、work-stealing 排程(Cilk)。Brent 定理保證貪婪排程器接近最優。現代 GPU/多核把這些從理論帶進日常。

## 我的想法 / 啟發

- **平行的 work/span 二量是「總功 vs 關鍵路徑」**:span 是再多處理器也壓不掉的下限,呼應 Amdahl「序列部分卡住加速」。資格考要能由 work/span 算平行度與 Brent 界。
- **線上競爭比=「跟上帝視角比差幾倍」**:與 [[approximation-algorithms]] 近似比神似(都用「對最優的倍數保證」),差別是近似缺的是算力/NP-hard,線上缺的是**未來資訊**。
- 兩章共同點:都在「受限條件下仍給最壞保證」——平行受處理器/相依限制、線上受資訊限制,與近似/隨機化同屬「有保證的退讓」工程哲學。

## Next action / 下一步

1. 補平行 merge sort/scan 的 work-span 推導;Brent 定理證明。
2. 補滑雪租買/LRU 競爭比證明 + 隨機化線上下界;接 Ch.33 ML 演算法收尾演算法軌。

## 交叉引用 / 出處
- raw:`wiki/raw/para-analysis-wikipedia.md`、`online-algo-wikipedia.md`、`online-competitive-wikipedia.md`
- [[approximation-algorithms]] — 競爭比↔近似比(對最優倍數);[[randomized-algorithms]] — 對手論證/隨機化降競爭比;[[complexity-and-divide-conquer]] — 平行分治
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.26+27)
