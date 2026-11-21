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

## 5. 深化:merge 不變式 + 插入排序精算 + trace + 陷阱

### 5.1 插入排序 trace([5,2,4,6,1,3])
```
j=2 key=2: [5,_,4,6,1,3]→插前 → [2,5,4,6,1,3]
j=3 key=4:               → [2,4,5,6,1,3]
j=4 key=6: 已 >5 不動     → [2,4,5,6,1,3]
j=5 key=1: 搬 6,5,4,2     → [1,2,4,5,6,3]
j=6 key=3: 搬 6,5,4       → [1,2,3,4,5,6]
```
搬移次數 = 逆序對數(inversions);此例 = 0+1+0+4+3 = 8。

### 5.2 精確計數 → 為何最壞 Θ(n²)
外層 j=2..n;內層 while 第 j 次最多比較 j−1 次。最壞(逆序)總比較 = Σⱼ₌₂ⁿ (j−1) = n(n−1)/2 = **Θ(n²)**。最佳(已排序)每次內層比 1 次即停 → Σ 1 = **Θ(n)**。平均 ≈ 半數 → 仍 Θ(n²)。**搬移次數 = 輸入的逆序對數**,這是插入排序複雜度的精確刻畫。

### 5.3 MERGE 子程序的迴圈不變式(Ch.2.3.2)
MERGE(A,p,q,r) 合併兩已排序段 A[p..q]、A[q+1..r]:
- **不變式**:每次主迴圈(k=p..r)前,A[p..k−1] 含兩段中**最小的 k−p 個元素且已排序**,且 L、R 各自下一個待取元素是其未取部分的最小。
- 初始:k=p,A[p..p−1] 空 ✓。
- 維持:比 L[i]、R[j] 取較小放 A[k],被取段指標前移 → A[p..k] 仍為最小且排序 ✓。
- 終止:k=r+1 時 A[p..r] 含全部且排序 ✓。∎
**哨兵(sentinel)技巧**:在 L、R 尾端各放 ∞,就不必每步檢查某段是否取空,簡化迴圈。合併 n 個元素 Θ(n)、穩定。

### 5.4 增量 vs 分治速查
| | 插入排序(增量) | merge sort(分治) |
|---|---|---|
| 最壞 | Θ(n²) | Θ(n log n) |
| 最佳 | Θ(n)(已排序) | Θ(n log n) |
| 空間 | 原地 O(1) | O(n) 輔助 |
| 穩定 | ✓ | ✓ |
| 遞迴式 | — | T(n)=2T(n/2)+Θ(n) → Master 情形2 |

### 5.5 陷阱
| 陷阱 | 正解 |
|---|---|
| 迴圈不變式只證「維持」 | 三步缺一不可:**初始+維持+終止**,終止那步才推出正確 |
| 插入排序永遠慢 | 近乎排序/小 n 極快(最佳 Θ(n)),Timsort 即用它 |
| merge sort 原地 | 標準版需 **O(n) 輔助**;原地 merge 複雜且慢 |
| 搬移與比較次數同 | 比較看 while 條件次數、搬移看逆序對;兩者不同 |

## 6. 延伸:迴圈不變式進階 + 終止度量 + 正確性全景

### 6.1 迴圈不變式選取技巧
好不變式要「夠強到推出終止正確、夠弱到初始成立且每步維持」。常見形式:「已處理部分滿足目標性質」。選太弱→終止推不出正確;選太強→維持步證不出來。設計 = 在兩者間找平衡,類似 [[dynamic-programming]] 選狀態。

### 6.2 終止性:良基度量(variant)
證終止用**遞減的良基度量**(well-founded measure):找一個對映到非負整數(或良基序)的量,每次迭代嚴格遞減 → 不能無限下降 → 必終止。例:插入排序外層 n−j 遞減;歐幾里得餘數遞減;遞迴用「輸入規模」遞減。**不變式管正確、度量管終止**,兩者合證完全正確([[algorithms-role]])。

### 6.3 前/後置條件 + 霍爾邏輯
形式化正確性:{前置} 程式 {後置} 的霍爾三元組;迴圈規則用不變式 I:{I∧條件}body{I},結束得 {I∧¬條件}。這是迴圈不變式的邏輯基礎,接 [[ai-logic]] 的程式驗證。

### 6.4 分析的三情形 + 遞迴式
Ch.2 已埋:最壞/最佳/平均;merge sort 的 T(n)=2T(n/2)+Θ(n) 是第一個遞迴式 → Ch.4 Master 定理([[complexity-and-divide-conquer]])正式解。增量法分析用求和(Σ),分治用遞迴式——兩種分析工具對應兩種設計範式。

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
