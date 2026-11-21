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
