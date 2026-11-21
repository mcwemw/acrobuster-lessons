---
question: Kruskal 與 Prim 怎麼求 MST、各 O 多少？cut property 為何讓貪婪成立？Union-Find 的 α(n) 從哪來？
keywords: [minimum-spanning-tree, union-find, kruskal-vs-prim]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Minimum spanning tree [[raw:mst-overview-wikipedia]](CC BY-SA 4.0)、cp-algorithms Disjoint Set Union [[raw:mst-dsu-cp]](CC BY-SA 4.0)、Wikipedia Prim's algorithm [[raw:mst-prim-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.21(MST)+ Ch.19(Union-Find)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 最小生成樹 MST + 互斥集 Union-Find（CLRS Ch.21 + Ch.19）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法。
> 一句話:在帶權連通無向圖上,MST = **連通所有點、總權重最小**的樹;Kruskal/Prim 都是**貪婪**,正確性由 **cut property** 保證。(mst-overview-wikipedia)

## 1. 關鍵定理:cut property（貪婪為何成立)

對任一把頂點分兩邊的**割 (cut)**,**跨割的最小權重邊**一定屬於某棵 MST。(mst-overview-wikipedia)
→ 所以「每步挑安全的最小邊」這種貪婪選擇是對的(接 [[greedy-algorithms]] 的貪婪選擇性質)。

## 2. Kruskal(邊導向)

- 把所有邊**由小到大**排序,依序加入;**若會成環就跳過**。(mst-overview-wikipedia)
- 「會不會成環」= 兩端點是否已同一連通塊 → 用 **Union-Find** O(α) 判。
- 複雜度 **O(E log E)**(排序主導)。稀疏圖好用。

## 3. Prim(點導向)

- 從一個點長樹,每次加入**連接樹與樹外、權重最小**的邊(用優先佇列)。(mst-prim-wikipedia)
- 複雜度 **O(E log V)**(二元堆)/ O(E + V log V)(斐波那契堆)。稠密圖相對好。
- 🔴 與 [[shortest-path]] 的 Dijkstra 幾乎同骨架(都貪婪 + 優先佇列),差別:Prim 比「邊權」、Dijkstra 比「起點累積距離」。

## 4. Union-Find / DSU（Ch.19)

- 維護不相交集合,兩操作:**find**(查代表)、**union**(合併)。(mst-dsu-cp)
- 兩個優化合用 → 近乎常數:
  - **路徑壓縮 path compression**:find 時把沿途節點直接指向根。
  - **按秩/大小合併 union by rank/size**:矮樹掛到高樹下。
- 合用後每操作**攤還 O(α(n))**,α = 反 Ackermann 函數,實務上 ≤ 4。
- 用途:Kruskal 連通性、連通塊、動態等價關係。

## 5. Kruskal vs Prim（資格考對照)

- **Kruskal**:排序邊 + Union-Find;**稀疏圖**(E 小)佳;O(E log E)。
- **Prim**:優先佇列從點長樹;**稠密圖**佳;O(E log V)。
- 兩者都貪婪、都靠 cut property;結果權重相同(邊權唯一時 MST 唯一)。

## 我的想法 / 啟發

- **MST 把「貪婪 + 圖 + Union-Find」三者綁一起考**:cut property=貪婪理論、Kruskal=排序+DSU、Prim=Dijkstra 同族 → 是串 [[greedy-algorithms]]/[[graph-traversal]]/[[shortest-path]] 的綜合題。
- **α(n) 是資格考亮點**:能講出「路徑壓縮+按秩合併 → 反 Ackermann 攤還」就是加分;只會 find/union 不夠。
- **Prim≈Dijkstra** 的對照最好拿分:同是貪婪+PQ,只差比較的量(邊權 vs 累積距離)。

## Next action / 下一步

1. 建網路流章(Ch.24,最大流 Ford-Fulkerson / Edmonds-Karp + min-cut max-flow)。
2. 補 cut property 完整證明 + Prim 斐波那契堆 O(E+V log V) + DSU 攤還分析(接 [[complexity-and-divide-conquer]])。

## 交叉引用 / 出處
- raw:`wiki/raw/mst-overview-wikipedia.md`、`mst-dsu-cp.md`、`mst-prim-wikipedia.md`
- [[greedy-algorithms]] — cut property=貪婪;[[shortest-path]] — Prim≈Dijkstra;[[graph-traversal]] — 連通性
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.21 + Ch.19)
