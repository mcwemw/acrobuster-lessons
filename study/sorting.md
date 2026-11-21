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
