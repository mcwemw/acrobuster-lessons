---
question: 插入排序怎麼跑、為何 O(n²)?迴圈不變式三步(初始/維持/終止)怎麼證正確?增量法 vs 分治(merge sort)差在哪?
keywords: [insertion-sort, loop-invariant, incremental-vs-divide-conquer]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Insertion sort [[raw:start-insertion-wikipedia]](CC BY-SA 4.0)、Loop invariant [[raw:start-loopinvariant-wikipedia]](CC BY-SA 4.0)、Merge sort [[raw:start-mergesort-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.2(Getting Started)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 入門:插入排序與分析方法 Getting Started（CLRS Ch.2）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★。
> 一句話:用插入排序當第一個例子,學會**用迴圈不變式證正確、用漸進分析算效率**;再用 merge sort 引出**分治**,對比增量法。(start-insertion-wikipedia)

## 1. 插入排序(增量法 incremental)

- 像整理撲克牌:逐一取未排序元素,往**已排序前綴**裡插到正確位置。(start-insertion-wikipedia)
- 偽碼:`for j=2..n: key=A[j]; i=j-1; while i>0 and A[i]>key: A[i+1]=A[i]; i--; A[i+1]=key`。
- 複雜度:**最壞/平均 O(n²)**(逆序輸入每次搬整個前綴)、**最佳 O(n)**(已排序,內層不動);**原地、穩定**。小 n 或近乎排序時實務快。

## 2. 迴圈不變式(loop invariant)——證正確性的主力

一個在迴圈每次迭代前都成立的性質,三步論證(類似數學歸納):(start-loopinvariant-wikipedia)
- **初始化(initialization)**:第一次迭代前成立(base case)。
- **維持(maintenance)**:若某次迭代前成立,則下次迭代前仍成立(歸納步)。
- **終止(termination)**:迴圈結束時,不變式 + 終止條件 → **推出演算法正確**。

**插入排序的不變式**:「外層每次迭代前,子陣列 A[1..j−1] 是原 A[1..j−1] 的元素且**已排序**」。
- 初始:j=2 時 A[1..1] 單元素,已排序 ✓。
- 維持:內層把 A[j] 插到正確位置後,A[1..j] 排序 ✓。
- 終止:j=n+1 時 A[1..n] 全排序 ✓ → 正確。∎

## 3. 分析演算法

- **最壞情形(worst case)**:輸入最糟時的執行時間——通常是我們關心的保證(插入排序逆序 → Θ(n²))。
- **平均情形**:對輸入分佈取期望。
- 用 [[complexity-and-divide-conquer]] 的 O/Θ/Ω 表達;常以「基本操作次數」(比較/搬移)計。

## 4. 設計範式對比:增量 vs 分治

- **增量法(incremental)**:一次擴張一格已解部分(插入排序)。
- **分治(divide-and-conquer)**:拆成子問題遞迴再合併——**merge sort**:拆半 → 遞迴排兩半 → **merge 合併**。(start-mergesort-wikipedia)
  - 遞迴式 T(n)=2T(n/2)+Θ(n) → **Θ(n log n)**(用 Master 定理,見 [[complexity-and-divide-conquer]]),穩定但要 O(n) 輔助空間。
- 對比:插入排序 O(n²) 原地;merge sort O(n log n) 需額外空間——是「時間 vs 空間」與「增量 vs 分治」的第一個教學對照。

## 我的想法 / 啟發

- **迴圈不變式是「演算法版的歸納法」**,也是這門課教的第一個嚴謹工具:資格考證正確性十之八九靠它,三步(初始/維持/終止)要能對任一迴圈機械套用——別只會跑、要會證。
- **增量 vs 分治**在 Ch.2 就埋下整門課的兩條主線:後面 [[dynamic-programming]](增量式填表)、[[complexity-and-divide-conquer]]/[[sorting]](分治)都是這裡的延伸。
- **插入排序「最佳 O(n)」**常被忽略:近乎排序的輸入它極快,所以實務上小陣列/混合排序(如 Timsort)仍用它——提醒「漸進最壞不是全部」。

## Next action / 下一步

1. 補 merge 合併子程序的迴圈不變式證明 + 哨兵(sentinel)技巧。
2. 接 [[sorting]](Ch.6-8)把 merge sort 的分治推到 heap/quick 與比較下界。

## 交叉引用 / 出處
- raw:`wiki/raw/start-insertion-wikipedia.md`、`start-loopinvariant-wikipedia.md`、`start-mergesort-wikipedia.md`
- [[algorithms-role]] — Ch.1 的正確+高效兩軸在此具體化;[[complexity-and-divide-conquer]] — merge sort 遞迴式用 Master 解;[[sorting]] — 排序全景
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.2)
