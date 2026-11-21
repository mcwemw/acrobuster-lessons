---
question: 二分圖最大匹配怎麼找?擴增路徑(augmenting path)為何是核心?Hopcroft-Karp 為何 O(E√V)?König 定理把匹配接到什麼?
keywords: [bipartite-matching, augmenting-path, konig-theorem]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Matching(graph theory) [[raw:match-overview-wikipedia]](CC BY-SA 4.0)、Hopcroft–Karp [[raw:match-hopcroftkarp-wikipedia]](CC BY-SA 4.0)、König's theorem [[raw:match-konig-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.25(26.3 二分圖匹配)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 二分圖匹配 Bipartite Matching（CLRS Ch.25 / §26.3）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★★。
> 一句話:匹配=沒有共用端點的邊集;二分圖最大匹配可用**擴增路徑**反覆增大,或化成**最大流**(源→L→R→匯,容量 1)解。(match-overview-wikipedia)

## 1. 基本定義

- **匹配 M**:邊集,任兩邊不共端點。**極大(maximal)**=不能再加邊;**最大(maximum)**=邊數最多(極大≠最大)。**完美(perfect)**=覆蓋所有頂點。(match-overview-wikipedia)
- **自由頂點(free)**:不是 M 中任何邊的端點。
- **交替路徑**:在未匹配邊與匹配邊之間交替;**擴增路徑(augmenting path)**=兩端都是自由頂點的交替路徑。

## 2. 核心定理:Berge

- **M 是最大匹配 ⟺ 不存在擴增路徑**。(match-hopcroftkarp-wikipedia 的演算法基礎)
- 用法:找到一條擴增路徑,對它做**對稱差(symmetric difference)** → 匹配邊數 +1。反覆到找不到為止。

## 3. 演算法

- **化為最大流**:加源 s→每個 L 頂點(容量 1)、每個 R 頂點→匯 t(容量 1)、原邊 L→R 容量 1;整數最大流值 = 最大匹配數([[network-flow]])。
- **匈牙利 / 擴增路徑法**:每次 BFS/DFS 找一條擴增路徑,O(V) 次增廣、每次 O(E) → **O(VE)**。
- **Hopcroft–Karp**:每個 phase 用 BFS 分層 + 找**一組頂點不相交的最短擴增路徑**(一次增廣多條),phase 數 O(√V) → 總 **O(E√V)**。(match-hopcroftkarp-wikipedia)
- **加權**(指派問題):匈牙利演算法 O(V³)。

## 4. König 定理（二分圖對偶)

- **二分圖**中:**最大匹配大小 = 最小頂點覆蓋大小**。(match-konig-wikipedia)
- 推論:最大獨立集 = n − 最大匹配(二分圖)。這把 [[approximation-algorithms]] 裡頂點覆蓋在一般圖只能 2-近似的困難,在二分圖變成**多項式可解精確**。
- 一般圖不成立(König 僅限二分);一般圖的最大匹配要用 Edmonds 開花(blossom)演算法。

## 我的想法 / 啟發

- **擴增路徑是整個匹配理論的引擎**:Berge 定理把「最大」這個全域性質化成「找不到一條路徑」的局部可檢查性質——跟 [[network-flow]] 的增廣路徑、[[shortest-path]] 的鬆弛同一套「局部最優化到全域」思路。
- **König 定理是資格考高頻對偶題**:二分圖裡「最大匹配=最小頂點覆蓋=n−最大獨立集」三者連動,常考「為何一般圖不行」(答:奇環 / 需開花)。
- Hopcroft-Karp 的 O(√V) phase 界是「一次增廣多條最短路」的攤還論證,值得理解不只背。

## Next action / 下一步

1. 補 König 定理的構造性證明(從最大流最小割導出覆蓋)。
2. 建 Edmonds 開花演算法(一般圖匹配)+ 指派問題匈牙利 O(V³) 完整步驟。

## 交叉引用 / 出處
- raw:`wiki/raw/match-overview-wikipedia.md`、`match-hopcroftkarp-wikipedia.md`、`match-konig-wikipedia.md`
- [[network-flow]] — 二分匹配=單位容量最大流;[[approximation-algorithms]] — König 讓二分圖頂點覆蓋精確解;[[graph-traversal]] — BFS/DFS 找擴增路徑
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.25)
