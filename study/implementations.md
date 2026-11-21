# 實作參考對照（章節 → 程式碼)

> 🔴 **IP 原則**:本庫概念頁只用 CC 授權公開教材,**不內嵌版權程式碼**。本頁僅列**外部連結**供對照。
> - **cp-algorithms**(CC BY-SA 4.0)= 可引用的真實 C++ 實作。
> - **AlgoStar / AutoCLRS**(github.com/FStarLang/AlgoStar)= CLRS 演算法的 **F\*/Pulse 形式化驗證版**;🔴 **repo 無 LICENSE 檔、且自述為 CLRS 衍生 → 僅外部參考、不照抄、不散布其碼**。agent 生成,驗證狀態見各章 `*.Review.md`。
> - **CLRS 4e 課本**:讀者自備(版權書,不在此散布)。

## 演算法（CLRS 4e）

| 章 | 概念頁 | cp-algorithms(CC,C++) | AlgoStar(F*驗證,僅參考) |
|---|---|---|---|
| Ch.3–4 複雜度/分治/Master | complexity-and-divide-conquer.md | —（分治例見排序 merge/quick) | autoclrs Ch.2/4 |
| Ch.6–8 排序 | sorting.md | — | autoclrs Ch.6(heap)/7(quick)/8(linear) |
| Ch.10–13 資料結構 | data-structures.md | [Disjoint Set Union](https://cp-algorithms.com/data_structures/disjoint_set_union.html)、[Treap](https://cp-algorithms.com/data_structures/treap.html) | autoclrs Ch.11/12/13 |
| Ch.14 DP | dynamic-programming.md | [DP 系列](https://cp-algorithms.com/dynamic_programming/intro-to-dp.html)、[0-1 Knapsack](https://cp-algorithms.com/dynamic_programming/knapsack.html) | autoclrs Ch.15 |
| Ch.15 貪婪 | greedy-algorithms.md | — | autoclrs Ch.16(活動選擇/Huffman) |
| Ch.16 攤還 | amortized-analysis.md | — | —（概念,無獨立實作) |
| Ch.19+21 MST/Union-Find | mst-union-find.md | [DSU](https://cp-algorithms.com/data_structures/disjoint_set_union.html)、[MST Kruskal](https://cp-algorithms.com/graph/mst_kruskal.html)、[MST Prim](https://cp-algorithms.com/graph/mst_prim.html) | autoclrs Ch.21/23 |
| Ch.20 圖遍歷 | graph-traversal.md | [BFS](https://cp-algorithms.com/graph/breadth-first-search.html)、[DFS](https://cp-algorithms.com/graph/depth-first-search.html)、[拓樸排序](https://cp-algorithms.com/graph/topological-sort.html) | autoclrs Ch.22 |
| Ch.22–23 最短路 | shortest-path.md | [Dijkstra](https://cp-algorithms.com/graph/dijkstra.html)、[Bellman-Ford](https://cp-algorithms.com/graph/bellman_ford.html)、[Floyd-Warshall](https://cp-algorithms.com/graph/all-pair-shortest-path-floyd-warshall.html) | autoclrs Ch.24/25 |
| Ch.24 網路流 | network-flow.md | [Edmonds-Karp 最大流](https://cp-algorithms.com/graph/edmonds_karp.html) | autoclrs Ch.26 |
| Ch.32 字串比對 | string-matching.md | [前綴函數/KMP](https://cp-algorithms.com/string/prefix-function.html)、[字串雜湊/Rabin-Karp](https://cp-algorithms.com/string/string-hashing.html) | autoclrs Ch.32 |
| Ch.34 NP-完備 | np-completeness.md | —（理論,無多項式實作) | autoclrs Ch.35(VC 2-approx) |

## AI（AIMA 4e）
AI 演算法的實作參考另行整理（AIMA 官方 aima-python 為 MIT 授權,可引用;待補)。

---
_每頁概念仍以 CC 來源接地;本頁只提供外部實作連結對照,不複製任何版權程式碼。_
