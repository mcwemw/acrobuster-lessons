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

## 6. 深化:邊分類 + Kosaraju 正確性 + 拓樸 trace

### 6.1 DFS 邊分類 + 括號定理
discovery d[]/finish f[] 滿足**括號結構**:任兩頂點的 [d,f] 區間要嘛包含、要嘛不相交(絕不交錯)。據此分類有向邊 u→v:
- **tree/forward**:v 在 u 的區間內(d[u]<d[v]<f[v]<f[u])。
- **back**:v 是 u 的祖先(d[v]<d[u]<f[u]<f[v])→ **存在 back edge ⟺ 有環**。
- **cross**:區間不相交(v 已完成,d[v]<f[v]<d[u])。
無向圖只有 tree/back 兩類。

### 6.2 Kahn 拓樸 trace(邊 A→C,B→C,C→D,B→D)
in-degree:A=0,B=0,C=2,D=2。佇列取 0 入度:{A,B}→ 輸出 A,移除 A→C(C 降 1);輸出 B,移除 B→C(C=0 入列)、B→D(D 降 1)→ 輸出 C,移除 C→D(D=0 入列)→ 輸出 D。序 **A,B,C,D**。若最後輸出數 < V ⟹ 有環(剩點入度永不歸零)。

### 6.3 Kosaraju 為何對(兩趟 DFS)
第一趟在原圖記 finish time。第二趟在**反圖**按 finish **遞減**序起 DFS,每棵樹=一個 SCC。直覺:縮點後的 condensation 是 DAG;finish 最大的點必在 condensation 的「源」SCC,反圖把邊反向使該 SCC 的 DFS 走不出自己 → 恰好圈出一個 SCC。O(V+E)。

### 6.4 陷阱
| 陷阱 | 正解 |
|---|---|
| BFS 能求有權最短路 | 只限**無權/等權**;有權要 Dijkstra([[shortest-path]]) |
| 拓樸序唯一 | 一般**不唯一**(多個 0 入度點時);唯一 ⟺ 存在哈密頓路徑 |
| 無向圖有 cross edge | 無向 DFS 只有 tree/back;cross/forward 僅有向圖 |
| DFS 遞迴深度 | 最壞 O(V) 堆疊,大圖要改顯式 stack 防爆 |

## 7. 延伸:Tarjan + 橋/割點 + 歐拉/雙連通

### 7.1 Tarjan SCC(一趟 DFS + low-link)
每點記 disc[v](發現序)、low[v]=v 經樹邊/至多一條回邊可達的最小 disc。DFS 中維護一個堆疊;當 **low[v]==disc[v]** 時,v 是一個 SCC 的「根」,彈出堆疊到 v 即一個 SCC。單趟 DFS **O(V+E)**(比 Kosaraju 的兩趟省)。low-link 是「能往回跳多遠」的度量。

### 7.2 橋與割點(無向圖)
- **割點(cut vertex)**:移除後連通塊增加。DFS 中 u 是割點 ⟺ u 是根且 ≥2 棵子樹,或非根且某子 v 有 low[v]≥disc[u](子樹跳不過 u)。
- **橋(bridge)**:移除後連通塊增加的邊,low[v]>disc[u]。皆 O(V+E) 一趟 DFS。

### 7.3 歐拉路徑/迴路
- **歐拉迴路**(走遍每邊一次回起點)⟺ 連通且**所有點偶度**(有向:每點入度=出度)。
- **歐拉路徑**(不必回起點)⟺ 恰 0 或 2 個奇度點。Hierholzer 演算法 O(E) 構造。別與 Hamilton(走遍每點,NP-hard)混淆。

### 7.4 雙連通分量(BCC)
無割點的極大子圖;用 DFS + 邊堆疊,遇割點條件彈出一個 BCC。用於網路可靠度(無單點故障)。

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
