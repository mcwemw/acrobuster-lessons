---
question: 找第 k 小(中位數)不用整排怎麼做？Quickselect 為何平均 O(n)、最壞 O(n²)？median-of-medians 怎麼保證最壞 O(n)？
keywords: [selection-algorithm, quickselect, median-of-medians]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Selection algorithm [[raw:sel-overview-wikipedia]](CC BY-SA 4.0)、Quickselect [[raw:sel-quickselect-wikipedia]](CC BY-SA 4.0)、Median of medians [[raw:sel-mom-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.9。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 中位數與順序統計 Selection（CLRS Ch.9）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★★。
> 一句話:找「第 k 小」(中位數是第 n/2 小)**不必整排**;平均 O(n) 用 Quickselect,最壞 O(n) 用 median-of-medians。(sel-overview-wikipedia)

## 1. 問題

- 第 k 個順序統計量 = 排序後第 k 小的元素;中位數 = 第 ⌊n/2⌋(或上/下中位)。
- 樸素:**整排 O(n log n)** 再取第 k。能不能更快?

## 2. Quickselect（平均 O(n))

- 像 [[sorting]] 的 Quicksort,但 partition 後**只遞迴 k 所在的那一側**(另一側丟掉)。(sel-quickselect-wikipedia)
- 期望 **O(n)**(T(n)=T(n/2)+O(n) 幾何級數收斂);**最壞 O(n²)**(壞 pivot 每次只去掉一個)。
- 隨機化 pivot → 期望 O(n) 穩定。

## 3. median-of-medians / BFPRT（最壞 O(n))

- 選 pivot 的確定性法:把元素每 **5 個一組**求各組中位數,再遞迴求「這些中位數的中位數」當 pivot。(sel-mom-wikipedia)
- 保證 pivot 至少踢掉常數比例(~30%)→ 遞迴式 T(n) ≤ T(n/5) + T(7n/10) + O(n) → **最壞 O(n)**。
- 代價:常數大,實務常數比 Quickselect 差;理論價值(破最壞 O(n²))。

## 4. 對照(資格考)

- 要快、可接受隨機:**Quickselect**(期望 O(n))。
- 要最壞保證線性:**median-of-medians**(確定 O(n),常數大)。
- 都 beat「整排 O(n log n)」——**選擇不需要完全排序**是核心洞察。

## 5. 深化:期望推導 + MoM 遞迴 + trace

### 5.1 Quickselect 期望 O(n)
隨機 pivot 下,期望踢掉常數比例 → T(n)=T(cn)+O(n),c<1(期望 c≈3/4,因 pivot 落中間一半機率 1/2,那時較大側 ≤3n/4)。幾何級數 n+cn+c²n+…=n/(1−c)=**O(n)**。對比整排每元素都要定位,選擇只追 k 所在的一側。

### 5.2 median-of-medians 為何 T(n)≤T(n/5)+T(7n/10)+O(n)=O(n)
- 分 ⌈n/5⌉ 組、求各組中位 → 遞迴求「中位數的中位數」x:**T(n/5)**。
- x 的保證:至少一半組的中位 ≤ x,每組又有 2 個 ≤ 其中位 → 至少 **3·(n/10)=3n/10** 個元素 ≤ x;對稱另一端同理 → partition 後任一側 ≤ **7n/10**:**T(7n/10)**。
- 加 partition O(n)。因 1/5+7/10=9/10<1,遞迴樹每層功遞減 → **線性 O(n)**。(sel-mom-wikipedia)
🔴 用 5(非 3)是關鍵:組大小 3 時 1/3+2/3=1 不收斂;5 才讓 9/10<1。

### 5.3 Quickselect trace(找第 3 小 [7,2,9,4,1,5],pivot=末5)
partition 後 <5:[2,4,1],=5,>5:[7,9] → pivot 5 排名=4。要第 3<4 → 遞迴左 [2,4,1] 找第 3;pivot=1→排名1;遞迴 [2,4] 找第 2(3−1=2);pivot=4 排名2 → **答案 4**。只走一側,丟棄另一側。

### 5.4 陷阱
| 陷阱 | 正解 |
|---|---|
| Quickselect 最壞 O(n log n) | 最壞 **O(n²)**(壞 pivot 每次只去 1);隨機化保證**期望** O(n) |
| MoM 組大小可任意 | 必須 ≥5(3 不收斂);7 也行但常數差 |
| 選擇要先排序 | 核心洞察:**不必整排**,partition 一側遞迴 O(n) |
| MoM 實務比 Quickselect 快 | 否,常數大;MoM 的價值是**最壞保證**,非實務速度 |

## 6. 延伸:MoM 當 pivot + 多選 + 串流中位數

### 6.1 以 MoM 為 pivot 的「內省」選擇/排序
Quickselect 用隨機 pivot 期望 O(n)、最壞 O(n²);若 pivot 改用 median-of-medians,**最壞也 O(n)**(但常數大)。同理 Quicksort 用 MoM pivot → 最壞 O(n log n)(introselect/introsort 思路:先隨機,退化才切 MoM/Heap)。

### 6.2 多重選擇 + 分位數
一次求多個順序統計量(k₁<…<kₘ):遞迴 partition 共享,O(n log m)。求所有分位點 → 與 [[sorting]] 連續。

### 6.3 串流/線上中位數
資料流無法整存:用**雙堆**(大根堆存較小半、小根堆存較大半,平衡大小)→ 堆頂即中位數,每筆 O(log n) 插入、O(1) 查中位。這是 [[data-structures]] heap + [[parallel-and-online]] 線上的結合。

### 6.4 加權中位數 / 選擇的應用
加權中位數(最小化 Σwᵢ|x−xᵢ|,如最優設廠點)可由 selection 變形 O(n) 求。selection 也是 Quicksort pivot 品質、k-近鄰、top-k 查詢的底層。

## 我的想法 / 啟發

- **「平均 vs 最壞」第 N 次出現**(呼應 [[sorting]] Quick/Heap、[[data-structures]] 雜湊/樹、[[string-matching]] KMP/RK):Quickselect 賭平均、BFPRT 買保證——同一個權衡母題。
- **median-of-medians 可當 Quicksort 的 pivot** → 讓 Quicksort 最壞也 O(n log n)(雖常數大,是理論亮點)。
- 核心洞察拿分:**找第 k 不必整排**,partition 一側遞迴就夠。

## Next action / 下一步

1. 建隨機化演算法(Ch.5)——Quickselect/Quicksort 的期望分析根基。
2. 補 median-of-medians 的 T(n)≤T(n/5)+T(7n/10)+O(n) 完整推導。

## 交叉引用 / 出處
- raw:`wiki/raw/sel-overview-wikipedia.md`、`sel-quickselect-wikipedia.md`、`sel-mom-wikipedia.md`
- [[sorting]] — Quickselect=Quicksort 單側遞迴;pivot 選法共用
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.9)
