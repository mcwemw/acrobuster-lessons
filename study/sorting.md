---
question: 比較排序為何有 Ω(n log n) 下界？Quicksort/Heapsort/Mergesort 怎麼選，線性時間排序憑什麼更快？
keywords: [sorting, comparison-sort-lower-bound, quicksort-vs-heapsort]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Quicksort [[raw:sort-quicksort-wikipedia]](CC BY-SA 4.0)、Heapsort [[raw:sort-heapsort-wikipedia]](CC BY-SA 4.0)、Sorting algorithm 總覽 [[raw:sort-overview-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.6–8。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 排序 Sorting（比較下界 / Heap / Quick / 線性時間）

> 概念頁 · 資格考演算法逐章複習(CLRS Ch.6–8)· 軌 A 演算法。
> 一句話:**只靠比較**的排序最快就是 **Ω(n log n)**;要更快就得**不靠比較**、改用鍵值結構(計數/基數)。(sort-overview-wikipedia)

## 1. 比較排序的下界 Ω(n log n)（CLRS 8.1)

- 任何只用「兩兩比較」決定順序的排序,可畫成**決策樹**;n 個元素有 n! 種排列、樹至少 n! 個葉 → 樹高 ≥ log₂(n!) = **Ω(n log n)**。(sort-overview-wikipedia)
- 所以 Heap/Merge/Quick 的 n log n 已是比較排序的**理論最佳階**。

## 2. 三大比較排序

- **Quicksort**(Ch.7):分治,選 pivot 把陣列分兩半再遞迴。平均 **O(n log n)**、最壞 **O(n²)**(已排序+固定 pivot);**原地**、**不穩定**;常數小 → 實務最快。隨機化 pivot 可避最壞。(sort-quicksort-wikipedia)
- **Heapsort**(Ch.6):建 max-heap 後反覆取最大放尾端。**最壞 O(n log n)**、**原地**、不穩定;無最壞退化(勝 quicksort 的保證性)。(sort-heapsort-wikipedia)
- **Mergesort**(Ch.2.3):分治,合併兩已排序半。**最壞 O(n log n)**、**穩定**,但要 **O(n) 額外空間**。(見分治章,待建)

## 3. 三者對照（資格考必背)

- 時間:Quick 平均 n log n / 最壞 n²;Heap、Merge 最壞都 n log n。
- 空間:Quick、Heap **原地 O(1)**;Merge **O(n)**。
- 穩定:**Merge 穩定**;Quick、Heap 不穩定。
- 選:要保證最壞→Heap/Merge;要穩定→Merge;要實務快+原地→Quick(隨機化)。

## 4. 線性時間排序（Ch.8,不靠比較)

- **計數排序 Counting sort**:值域小(0..k),統計各值次數再放回,**O(n+k)**、穩定。
- **基數排序 Radix sort**:按位數由低到高用穩定子排序(常用計數),**O(d·(n+k))**。
- **桶排序 Bucket sort**:均勻分佈下分桶再排,平均 O(n)。
- 之所以能破 Ω(n log n):**不做比較**,直接用鍵的數值結構 → 下界不適用。(sort-overview-wikipedia)

## 5. 深化:下界證明 + Quicksort 期望 + 分割 trace

### 5.1 比較下界 Ω(n log n) 完整
決策樹每個內節點=一次比較(二分支),葉=一種輸出排列。正確排序須能區分全部 **n!** 種輸入排列 → 至少 n! 葉。高 h 的二元樹最多 2^h 葉,故 2^h ≥ n! → h ≥ log₂(n!)。由 Stirling,log₂(n!)=Θ(n log n)。樹高=最壞比較次數 ⟹ **任何比較排序最壞 Ω(n log n)**。∎

### 5.2 Quicksort 隨機化期望 O(n log n)
令指示變數 Xᵢⱼ=[第 i 小與第 j 小被比較]。兩者只在「pivot 先選到它倆之一、且在選到它們之間任何元素之前」才比較 → P(Xᵢⱼ=1)=**2/(j−i+1)**。期望總比較數 E[Σ Xᵢⱼ]=Σᵢ Σⱼ 2/(j−i+1) ≤ Σᵢ 2·Hₙ = **O(n log n)**(調和級數)。隨機 pivot 使此界與輸入無關(見 [[randomized-algorithms]])。

### 5.3 Lomuto 分割 trace(pivot=末元素,陣列 [3,8,2,5,1,4,7,6],pivot=6)
i 指向「<pivot 區」末端。掃 j:3<6→swap 自身 i=0;8≥6 跳;2<6→i=1 swap;5<6→i=2;1<6→i=3;4<6→i=4;7≥6 跳;最後把 pivot 換到 i+1=5。結果 [3,2,5,1,4,**6**,7,8],pivot 歸位索引 5。左 5 個 <6、右 2 個 >6,遞迴兩側。

### 5.4 線性排序 worked
計數排序 [2,5,2,1,5,1](k=5):計數 [_,2,2,0,0,2]→前綴 [_,2,4,4,4,6]→由後往前放保穩定 → [1,1,2,2,5,5],O(n+k)。基數排序把多位整數拆位、每位用計數(穩定)由低到高 → O(d(n+k))。

### 5.5 陷阱
| 陷阱 | 正解 |
|---|---|
| 「排序不可能快過 n log n」 | 只限**比較**排序;計數/基數不比較,可 O(n+k) |
| Heapsort 穩定 | 不穩定(堆取出打亂等值相對序) |
| Quicksort 最壞 O(n log n) | 最壞 O(n²)(已排序+固定pivot);隨機化只保證**期望** |
| 基數排序用不穩定子排序 | 會錯——各位子排序必須**穩定**才能保序 |

## 6. 延伸:其他排序 + 穩定性 + 外部排序

### 6.1 Heapsort 建堆 O(n)(反直覺)
BUILD-MAX-HEAP 由下往上 sift-down:高度 h 的節點有 ⌈n/2^{h+1}⌉ 個、各做 O(h) → Σ_{h} (n/2^{h+1})·O(h) = O(n·Σ h/2^h) = **O(n)**(非 O(n log n))。之後 n 次取最大各 O(log n) → 排序總 O(n log n)。「建堆線性」是高頻陷阱。

### 6.2 其他排序
- **Boyer-Moore 不在此**(那是字串);排序的 **Shell sort**(改良插入,O(n^{1.3~1.5}))、**Tim sort**(merge+insertion 混合,實務標準庫用,利用已排序 run)。
- **Introsort**:Quicksort + 遞迴過深轉 Heapsort → 兼得 Quick 常數與 Heap 最壞保證(C++ std::sort)。

### 6.3 穩定性的意義
穩定 = 等鍵元素保持原相對序。**多關鍵字排序**靠穩定(先排次要鍵、再穩定排主要鍵)。基數排序就靠每位穩定子排序。Quicksort/Heapsort 不穩定,需穩定時用 Merge 或加原索引當 tiebreak。

### 6.4 外部排序(資料超過記憶體)
**多路歸併**:切成能進記憶體的 run 各自排序寫回磁碟,再 k 路歸併。I/O 次數主導(呼應 [[augmented-data-structures]] B-tree 的 I/O 模型)。merge sort 的順序存取特性使它成為外部排序主力。

## 我的想法 / 啟發

- **「下界」是資格考最愛的觀念題**:要能說清「Ω(n log n) 只管比較排序;計數/基數不比較,所以不受限」——很多人背錯成「排序不可能快過 n log n」。
- **Quick vs Heap 的取捨 = 平均 vs 最壞保證**:Quick 常數小但有 n² 風險,Heap 犧牲常數換 n log n 保證。隨機化是化解 Quick 最壞的標準手法(接 [[dynamic-programming]] 旁的機率分析思路)。
- 排序也是 **[[greedy-algorithms]]/[[dynamic-programming]] 之外的分治代表**:Quick/Merge 都是分治(待建分治章串起來)。

## Next action / 下一步

1. 建分治與遞迴式章(Ch.4 + Master 定理)把 Merge/Quick 的遞迴式解法補上。
2. 補 Quicksort 隨機化期望 O(n log n) 證明 + 計數/基數穩定性細節。

## 交叉引用 / 出處
- raw:`wiki/raw/sort-quicksort-wikipedia.md`、`sort-heapsort-wikipedia.md`、`sort-overview-wikipedia.md`
- [[graph-traversal]]、[[shortest-path]]、[[greedy-algorithms]]、[[dynamic-programming]] — 演算法軌其他章
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.6–8)
