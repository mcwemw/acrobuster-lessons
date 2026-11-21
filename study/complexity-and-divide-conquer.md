---
question: O/Θ/Ω 怎麼分？分治遞迴式 T(n)=aT(n/b)+f(n) 怎麼用 Master 定理三情形直接解？
keywords: [asymptotic-notation, master-theorem, divide-and-conquer]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Big O notation [[raw:complexity-bigo-wikipedia]](CC BY-SA 4.0)、Master theorem [[raw:complexity-master-wikipedia]](CC BY-SA 4.0)、Divide-and-conquer [[raw:complexity-dc-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.3–4。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 複雜度分析 + 分治 / Master 定理（CLRS Ch.3–4）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法。
> 一句話:用**漸進符號**描述成長率;**分治**把問題拆成同型子問題,其成本寫成**遞迴式**,再用 **Master 定理**一眼解出階。(complexity-bigo-wikipedia / complexity-master-wikipedia)

## 1. 漸進符號（Ch.3)

- **O(g)**:漸進**上界**(最多這麼大)。**Ω(g)**:漸進**下界**。**Θ(g)**:上下界皆同(緊)。(complexity-bigo-wikipedia)
- 嚴格版:**o**(嚴格小於)、**ω**(嚴格大於)。
- 口訣:O 像 ≤、Ω 像 ≥、Θ 像 =;只看**最高階項、丟常數**。
- 🔴 資格考常混淆:「最壞 O(n²)」不代表「一定要 n²」;O 只是上界。要「緊」用 Θ。

## 2. 分治 Divide and Conquer（Ch.4)

三步:**Divide**(拆成子問題)→ **Conquer**(遞迴解)→ **Combine**(合併)。(complexity-dc-wikipedia)
例:Merge sort、Quicksort(見 [[sorting]])、二分搜尋、Strassen 矩陣乘、Karatsuba 大數乘。

## 3. 遞迴式 + Master 定理（Ch.4.5)

分治成本常寫成 **T(n) = a·T(n/b) + f(n)**(a 個子問題、各 n/b 大、合併成本 f(n))。
比較 f(n) 與 **n^(log_b a)**:(complexity-master-wikipedia)

- **情形 1**:f(n) = O(n^(log_b a − ε)) → **T(n) = Θ(n^(log_b a))**(葉子主導)。
- **情形 2**:f(n) = Θ(n^(log_b a)) → **T(n) = Θ(n^(log_b a) · log n)**(各層等重)。
- **情形 3**:f(n) = Ω(n^(log_b a + ε)) 且滿足正則條件 → **T(n) = Θ(f(n))**(根主導)。

## 4. 套用例（資格考必練)

- **Merge sort**:T(n)=2T(n/2)+Θ(n);n^(log₂2)=n,f=Θ(n) → **情形 2 → Θ(n log n)**。
- **二分搜尋**:T(n)=T(n/2)+Θ(1);n^(log₂1)=n⁰=1,f=Θ(1) → **情形 2 → Θ(log n)**。
- **Strassen**:T(n)=7T(n/2)+Θ(n²);n^(log₂7)≈n^2.807 > n² → **情形 1 → Θ(n^2.807)**。
- 🔴 Master **不適用**的情形:a 非常數、f 非多項式差距(落在兩情形「間隙」)→ 改用遞迴樹 / 代換法 / Akra-Bazzi。

## 我的想法 / 啟發

- **Master 定理是資格考的「送分題」也是「陷阱題」**:套三情形快,但要會判「有沒有落在間隙、正則條件過不過」——考官最愛在這出錯點。
- **漸進符號分清 O/Θ/Ω** 是所有複雜度題的地基:講「下界」用 Ω、「緊」用 Θ,別一律 O。
- 這章是地基:[[sorting]] 的 Merge/Quick、[[shortest-path]] 的複雜度全靠這套符號與遞迴式表達。

## Next action / 下一步

1. 建資料結構章(Ch.10–13:heap/hash/BST/紅黑樹)——接 Heapsort 的 heap、排序後的查找結構。
2. 補遞迴樹法 + 代換法(Master 不適用時)+ Akra-Bazzi 概念。

## 交叉引用 / 出處
- raw:`wiki/raw/complexity-bigo-wikipedia.md`、`complexity-master-wikipedia.md`、`complexity-dc-wikipedia.md`
- [[sorting]] — Merge/Quick 的遞迴式用本章 Master 解;[[shortest-path]]、[[graph-traversal]] 複雜度表達
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.3–4)
