# 資格考複習知識庫 — 逐章 LLM Wiki 🦞

> NYCU 資工博士班資格考(AI + 演算法)逐章複習頁。每章由公開 CC 教材 ingest、每條主張可回原始來源。
> 🔴 全程公開資料,真題零碰。章節 = 教科書真實章序(演算法→CLRS 4e、AI→AIMA 4e)。
> 這是 TAICA 生成式AI 第十週「LLM Wiki」作業(A10)的延伸,升級成資格考逐章複習庫。
>
> 📎 **實作參考(程式碼對照)**:[implementations.md](implementations.md) — 每章對應 cp-algorithms(CC,C++)+ AlgoStar(F*驗證,僅參考)。概念頁不內嵌版權碼。

## 演算法（CLRS 4e）

> 星級=資格考重點:★★★ 核心高頻 / ★★ 常考 / ★ 一般。目標覆蓋 CLRS 4e 全 35 章(未建者陸續補)。

| CLRS 章 | 星 | 主題 | 頁 |
|---|---|---|---|
| Ch.3–4 | ★★★ | 複雜度 + 分治 + Master 定理 | [complexity-and-divide-conquer.md](complexity-and-divide-conquer.md) |
| Ch.5 | ★★ | 隨機化(Las Vegas / Monte Carlo / 期望分析) | [randomized-algorithms.md](randomized-algorithms.md) |
| Ch.6–8 | ★★★ | 排序(比較下界 / Quick / Heap / 線性) | [sorting.md](sorting.md) |
| Ch.9 | ★★ | 選擇 / 中位數(Quickselect / median-of-medians) | [selection.md](selection.md) |
| Ch.10–13 | ★★★ | 資料結構(雜湊 / BST / 紅黑樹) | [data-structures.md](data-structures.md) |
| Ch.14 | ★★★ | 動態規劃 DP | [dynamic-programming.md](dynamic-programming.md) |
| Ch.15 | ★★★ | 貪婪 Greedy | [greedy-algorithms.md](greedy-algorithms.md) |
| Ch.16 | ★★ | 攤還分析(aggregate / accounting / potential) | [amortized-analysis.md](amortized-analysis.md) |
| Ch.19+21 | ★★★ | MST + Union-Find(Kruskal / Prim / DSU) | [mst-union-find.md](mst-union-find.md) |
| Ch.20 | ★★★ | 圖遍歷 BFS/DFS/拓樸/SCC | [graph-traversal.md](graph-traversal.md) |
| Ch.22–23 | ★★★ | 最短路 Dijkstra/Bellman-Ford/Floyd | [shortest-path.md](shortest-path.md) |
| Ch.24 | ★★ | 網路流(最大流 / Ford-Fulkerson / 最小割) | [network-flow.md](network-flow.md) |
| Ch.32 | ★★ | 字串比對(KMP / Rabin-Karp) | [string-matching.md](string-matching.md) |
| Ch.34 | ★★★ | NP-完備性(歸約 / Cook-Levin / P vs NP) | [np-completeness.md](np-completeness.md) |

> 已 14 頁;待建:Ch.17 擴充DS★、18 B-tree★、25 二分圖匹配★★、26–31/33 專門、35 近似★★。

## AI（AIMA 4e）

| AIMA 章 | 主題 | 頁 |
|---|---|---|
| Ch.3 | 搜尋(無資訊 BFS/DFS/UCS/IDS + 有資訊 A*) | [ai-search.md](ai-search.md) |

（軌 B 建置中,逐章補)

## 教學簡報
- 動態規劃教學 HTML 簡報:https://mcwemw.github.io/acrobuster-lessons/genai/dp-dynamic-programming.html

---
_由 ACROBUSTER 研究講義站逐章建置;每章附公開 CC 來源與授權。_
