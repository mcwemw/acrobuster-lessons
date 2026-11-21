---
question: 圖的 BFS 與 DFS 差在哪、各 O(V+E) 怎麼來？拓樸排序與 SCC 又靠哪種遍歷做？
keywords: [graph-traversal, bfs-vs-dfs, topological-sort]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—cp-algorithms BFS [[raw:graph-bfs-cp]](CC BY-SA 4.0)、cp-algorithms DFS [[raw:graph-dfs-cp]](CC BY-SA 4.0)、Wikipedia Topological sorting [[raw:graph-toposort-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.20。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 圖遍歷 Graph Traversal（BFS / DFS / 拓樸 / SCC）

> 概念頁 · 資格考演算法逐章複習(CLRS Ch.20)· 軌 A 演算法。
> 一句話:從起點**有系統地走遍所有可達頂點與邊**,鄰接串列下兩種走法都是 **O(V+E)**。(graph-bfs-cp / graph-dfs-cp)

## 1. BFS 廣度優先(queue)

- 用**佇列**,一層一層往外擴;先訪離起點近的。(graph-bfs-cp)
- **關鍵性質**:在**無權圖**上,BFS 走到每個點的層數 = **最短路徑邊數** → 無權最短路用 BFS。
- 複雜度 **O(V+E)**:每個頂點進出佇列一次、每條邊看一次。

## 2. DFS 深度優先(stack / 遞迴)

- 用**遞迴/堆疊**,一條路走到底再回溯。(graph-dfs-cp)
- 記 **discovery / finish 時間**;邊可分類:tree / back / forward / cross edge。**有 back edge ⇔ 有環**(偵測環的基礎)。
- 複雜度 **O(V+E)**。
- 用途:環偵測、拓樸排序、SCC、連通性、找路徑。

## 3. BFS vs DFS(資格考對照)

- **BFS**:queue、逐層、**無權最短路**、找「最近的」。
- **DFS**:stack/遞迴、走到底、**環偵測 / 拓樸 / SCC**、記時間戳。
- 兩者同階 O(V+E);選哪個看要「最短層」還是「深層結構(環/順序/連通塊)」。

## 4. 拓樸排序 Topological Sort

- 僅對 **DAG(有向無環圖)**:把頂點排成線性序,使每條邊 u→v 都 u 在前。(graph-toposort-wikipedia)
- 兩種做法:**① DFS**:按 finish time 遞減輸出(逆後序);**② Kahn's**:反覆取 in-degree=0 的點(BFS 式)。
- **有環 ⇒ 無拓樸序**(Kahn 會剩點、DFS 會遇 back edge)。複雜度 O(V+E)。
- 用途:排課/相依建置順序/事件排程。

## 5. 強連通分量 SCC（有向圖)

- SCC = 兩兩互相可達的最大頂點集。
- **Kosaraju**(兩趟 DFS:原圖記 finish 序 → 反圖按該序 DFS)或 **Tarjan**(一趟 DFS + low-link),皆 **O(V+E)**。
- 用途:把有向圖縮成 DAG(condensation)再做拓樸/DP。

## 我的想法 / 啟發

- **O(V+E) 是圖演算法的「便宜基準」**:BFS/DFS/拓樸/SCC 全是這個階 → 資格考看到「線性於圖大小」先想這組。
- **一個 DFS 骨架長出三件事**:環偵測、拓樸、SCC 都是 DFS + 時間戳/反圖的變奏 → 記住 DFS 時間戳就打通一片。
- 接下章:**最短路**(Ch.22–23)把 BFS 從「無權」推廣到「有權」(Dijkstra 貪婪 / Bellman-Ford DP 式),是這章的自然延伸。

## Next action / 下一步

1. 建最短路章(Ch.22–23):Dijkstra(貪婪,見 [[greedy-algorithms]])、Bellman-Ford、Floyd-Warshall。
2. 補 SCC 的 Tarjan low-link 完整推導 + 拓樸兩法的正確性。

## 交叉引用 / 出處
- raw:`wiki/raw/graph-bfs-cp.md`、`graph-dfs-cp.md`、`graph-toposort-wikipedia.md`
- [[greedy-algorithms]] — 最短路/MST 的 Dijkstra/Kruskal/Prim 本質是貪婪,接在本章之後
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.20)
