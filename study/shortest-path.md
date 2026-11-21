---
question: Dijkstra、Bellman-Ford、Floyd-Warshall 各解哪種最短路問題？負權、負環、單源 vs 全點對怎麼選？
keywords: [shortest-path, dijkstra-vs-bellman-ford, relaxation]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—cp-algorithms Dijkstra [[raw:sp-dijkstra-cp]](CC BY-SA 4.0)、cp-algorithms Bellman-Ford [[raw:sp-bellmanford-cp]](CC BY-SA 4.0)、Wikipedia Floyd-Warshall [[raw:sp-floyd-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.22–23。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 最短路徑 Shortest Paths（Dijkstra / Bellman-Ford / Floyd-Warshall）

> 概念頁 · 資格考演算法逐章複習(CLRS Ch.22–23)· 軌 A 演算法。
> 一句話:在**帶權圖**上求最小權重路徑;無權時退化成 [[graph-traversal]] 的 BFS。核心操作是 **鬆弛 (relaxation)**:若 `d[u]+w(u,v) < d[v]` 就更新 `d[v]`。(sp-dijkstra-cp)

## 1. 問題分類

- **單源最短路 SSSP**:固定起點到所有點 → Dijkstra / Bellman-Ford。
- **全點對 APSP**:任兩點 → Floyd-Warshall(或跑 V 次 SSSP)。

## 2. Dijkstra(SSSP,**非負權**,貪婪)

- 每步從未定案點中挑 **d 最小** 的定案、再鬆弛其鄰邊。本質是**貪婪**(見 [[greedy-algorithms]])。(sp-dijkstra-cp)
- 複雜度:二元堆 **O((V+E) log V)**;陣列 O(V²)。
- 🔴 **有負權邊會錯**(貪婪選擇性質被破壞)→ 改用 Bellman-Ford。

## 3. Bellman-Ford(SSSP,**容負權**,DP 式)

- 把所有邊**鬆弛 V−1 輪**(最短路最多 V−1 條邊,DP 層層放寬)。(sp-bellmanford-cp)
- 複雜度 **O(V·E)**(比 Dijkstra 慢,但能處理負權)。
- **負環偵測**:做第 V 輪若還能鬆弛 ⇒ 存在負權環(最短路無定義)。

## 4. Floyd-Warshall(APSP,DP over 中繼點)

- DP:`d[i][j]` 允許用前 k 個頂點當中繼 → `d[i][j]=min(d[i][j], d[i][k]+d[k][j])`。(sp-floyd-wikipedia)
- 複雜度 **O(V³)**、空間 O(V²);容負權(無負環)。
- 稠密圖 / 要全點對時最省事。

## 5. 選哪個(資格考對照)

- **無權圖** → BFS(O(V+E),見 [[graph-traversal]])。
- **非負權、單源** → Dijkstra(O((V+E)logV))。
- **有負權、單源 / 要偵測負環** → Bellman-Ford(O(VE))。
- **全點對** → Floyd-Warshall(O(V³))或 V×Dijkstra(稀疏圖更快)。

## 6. 深化:Dijkstra trace + 正確性 + 負權陷阱

### 6.1 Dijkstra 逐步(起點 A;邊 A-B:1,A-C:4,B-C:2,B-D:5,C-D:1)
```
初始 d: A=0 B=∞ C=∞ D=∞   已定案{}
取A(0)→鬆弛: B=1, C=4            定案{A}
取B(1)→鬆弛: C=min(4,1+2)=3, D=1+5=6  定案{A,B}
取C(3)→鬆弛: D=min(6,3+1)=4       定案{A,B,C}
取D(4)                           定案{A,B,C,D}
```
最短距離 A→D = **4**(路徑 A-B-C-D)。關鍵:每次取「未定案中 d 最小」者定案,之後不再改。

### 6.2 Dijkstra 正確性(非負權下貪婪選擇性質)
取出 d 最小的 u 時主張 d[u] 已是真最短。反證:若有更短路 P 到 u,P 必先經某未定案點 x,則 d[x] ≤ dist(x) ≤ dist(u) < d[u](**非負權**使前綴 ≤ 全長)⟹ d[x]<d[u],與「u 是未定案最小」矛盾。∎ **負權會讓「前綴≤全長」失效** → 正確性崩。

### 6.3 負權 worked 陷阱
圖 A→B=2, A→C=3, C→B=−2。Dijkstra 先定案 A,取 B(d=2)定案;但真最短 A→C→B=3−2=**1**<2,已定案的 B 不再更新 → **錯**。Bellman-Ford 鬆弛 V−1 輪就能抓到。

### 6.4 Johnson 演算法(稀疏圖 APSP)
Floyd O(V³) 在稀疏圖不划算。Johnson:用 Bellman-Ford 算一組 reweight 的位勢 h(v) 把所有邊變非負(不改最短路),再對每個源跑 Dijkstra → **O(V²logV+VE)**,稀疏圖優於 Floyd。

### 6.5 複雜度/適用速查
| 演算法 | 範式 | 負權 | 負環 | 複雜度 |
|---|---|---|---|---|
| BFS | 無權特例 | — | — | O(V+E) |
| Dijkstra | 貪婪 | ✗ | ✗ | O((V+E)logV) |
| Bellman-Ford | DP | ✓ | 可偵測 | O(VE) |
| Floyd-Warshall | DP(中繼) | ✓ | 可偵測(對角<0) | O(V³) |
| Johnson | reweight+Dijkstra | ✓ | 可偵測 | O(V²logV+VE) |

## 7. 延伸:DAG 最短路 + A* + 差分約束

### 7.1 DAG 最短路 O(V+E)
有向無環圖:先**拓樸排序**([[graph-traversal]]),再按拓樸序鬆弛每點出邊。因無環、拓樸序保證處理 u 時其所有前驅已定案 → 一遍 O(V+E),**容負權**(無環故無負環)。比 Dijkstra/Bellman-Ford 都快,是 DAG 專用。亦可求**最長路**(關鍵路徑/PERT)。

### 7.2 A* = Dijkstra + 啟發式
A*(見 [[ai-search]])用 f(n)=g(n)+h(n) 導向目標;h≡0 退化成 Dijkstra。admissible h 保證最優、consistent h 不需重展開。單目標最短路時 A* 比 Dijkstra 展開少很多(h 引導)。是演算法軌與 AI 軌的接點。

### 7.3 差分約束系統(Bellman-Ford 應用)
一組 xⱼ−xᵢ≤wᵢⱼ 的不等式 → 建圖(邊 i→j 權 wᵢⱼ)跑 Bellman-Ford:有負環 ⟺ 無解;否則最短路距離即一組可行解。把「排程/時序約束」化成最短路,是常見建模題。

### 7.4 Dijkstra 堆選型
二元堆 O((V+E)logV);**Fibonacci 堆** decrease-key 攤還 O(1) → O(E+VlogV),稠密圖理論更優(常數大實務少用);d-ary 堆可調。

## 我的想法 / 啟發

- **三演算法 = 三種設計範式的縮影**:Dijkstra=貪婪、Bellman-Ford/Floyd=動態規劃、BFS=無權特例。資格考把「最短路」當成**串起 [[greedy-algorithms]] / [[dynamic-programming]] / [[graph-traversal]] 的樞紐題**。
- **判題關鍵先看權重**:有沒有負邊 → 決定 Dijkstra 能不能用;要不要全點對 → 決定 SSSP vs APSP。
- 「鬆弛」是統一視角:三者都在反覆鬆弛,差別只在**鬆弛的順序與次數**(貪婪序 / V−1 輪 / 中繼點 DP)。

## Next action / 下一步

1. 建 MST 章(Ch.21)Kruskal/Prim(也是貪婪,與 Dijkstra 同族)。
2. 補 Dijkstra 正確性證明(非負權下貪婪選擇性質)+ Johnson 演算法(稀疏圖 APSP)。

## 交叉引用 / 出處
- raw:`wiki/raw/sp-dijkstra-cp.md`、`sp-bellmanford-cp.md`、`sp-floyd-wikipedia.md`
- [[graph-traversal]] — 無權最短路=BFS,本章是其帶權推廣
- [[greedy-algorithms]] — Dijkstra=貪婪;[[dynamic-programming]] — Bellman-Ford/Floyd=DP
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.22–23)
