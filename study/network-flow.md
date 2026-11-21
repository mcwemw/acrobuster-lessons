---
question: 最大流怎麼用增廣路徑求？Ford-Fulkerson 與 Edmonds-Karp 複雜度差在哪？max-flow min-cut 定理說什麼？
keywords: [network-flow, max-flow-min-cut, ford-fulkerson]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Maximum flow problem [[raw:flow-maxflow-wikipedia]](CC BY-SA 4.0)、Ford-Fulkerson [[raw:flow-fordfulkerson-wikipedia]](CC BY-SA 4.0)、Max-flow min-cut theorem [[raw:flow-mincut-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.24。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 網路流 Network Flow（最大流 / Ford-Fulkerson / 最小割）

> 概念頁 · 資格考演算法逐章複習(CLRS Ch.24)· 軌 A 演算法。
> 一句話:在有容量的有向圖上,從源 s 到匯 t **塞進最多的流**;其值 = 最小割容量(max-flow min-cut)。(flow-maxflow-wikipedia)

## 1. 流網路與可行流

- 有向圖,每邊有**容量 c(u,v)**;源 s、匯 t。流 f 要滿足:**容量限制** 0≤f≤c、**守恆**(除 s,t 外流入=流出)。(flow-maxflow-wikipedia)
- **最大流問題**:最大化 s→t 的總流量 |f|。

## 2. 殘餘網路 + 增廣路徑(核心機制)

- **殘餘容量** c_f(u,v)=c(u,v)−f(u,v);反向邊可「退流」。
- **增廣路徑**:殘餘網路上 s→t 的一條路,沿路可再加 min 殘餘容量的流。
- 反覆找增廣路徑並增流,直到找不到 → 達最大流。

## 3. Ford-Fulkerson vs Edmonds-Karp

- **Ford-Fulkerson**:反覆找「任一條」增廣路徑增流。整數容量下會終止;但複雜度 **O(E·|f*|)**(依最大流值,壞容量下可能很慢)。(flow-fordfulkerson-wikipedia)
- **Edmonds-Karp**:FF 但用 **BFS 找最短(邊數最少)增廣路徑**(見 [[graph-traversal]])→ **O(V·E²)**,與容量大小無關。
- (更快:Dinic O(V²E)、push-relabel。)

## 4. 最大流最小割定理（Ch.24 重點)

**最大流的值 = 最小割的容量**。(flow-mincut-wikipedia)
- **割 (s-t cut)**:把頂點分成含 s 的一邊與含 t 的一邊;割容量 = 跨越邊的容量和。
- 直覺:流再大也不能超過任何一個瓶頸割;找到一個流=某割容量 ⇒ 兩者皆最優。
- 用途:求最小割 = 求最大流後看殘餘網路 s 可達的點集。

## 5. 應用（資格考愛考的化約)

- **二分圖最大匹配**:加超源超匯、容量 1 → 最大流。
- **邊/點連通度**、**專案選擇 / 最小點覆蓋**(König 定理)、影像分割等都化約成最大流/最小割。

## 我的想法 / 啟發

- **「化約成最大流」是網路流最常考的點**:題目看起來不像流,但加超源超匯 + 設容量就變最大流 → 二分匹配是經典。
- **Edmonds-Karp 勝在「與容量無關」**:FF 的 O(E|f*|) 會被大容量拖垮,換 BFS 最短增廣路徑就穩定 O(VE²)——這個對照是拿分點。
- **min-cut = max-flow** 是對偶思想的代表,呼應 [[greedy-algorithms]]/[[dynamic-programming]] 之外的「上下界互證」美學。

## Next action / 下一步

1. 建字串比對章(Ch.32,KMP / Rabin-Karp)。
2. 補 Dinic / push-relabel + 二分匹配 König 定理完整化約。

## 交叉引用 / 出處
- raw:`wiki/raw/flow-maxflow-wikipedia.md`、`flow-fordfulkerson-wikipedia.md`、`flow-mincut-wikipedia.md`
- [[graph-traversal]] — Edmonds-Karp 用 BFS;[[shortest-path]]、[[mst-union-find]] — 圖論綜合
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.24)
