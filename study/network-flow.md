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

## 6. 深化:max-flow min-cut 證明 + trace + FF 不終止陷阱

### 6.1 max-flow min-cut 定理三等價(證明骨架)
以下三者等價:(a) f 是最大流;(b) 殘餘網路無 s→t 增廣路徑;(c) 存在割 (S,T) 使 |f|=c(S,T)。
- **(a)⇒(b)**:若有增廣路徑可再增流,矛盾。
- **(b)⇒(c)**:令 S=殘餘網路中 s 可達的點集,T=其餘(t∈T 因無增廣路)。跨 S→T 的原邊皆**飽和**(否則有殘餘→可達矛盾)、T→S 的流皆 0 → |f|=流出S−流入S = c(S,T)。
- **(c)⇒(a)**:任何流 ≤ 任何割(弱對偶),既然 |f| 等於某割 → 兩者皆最優。∎
這是 [[linear-programming]] LP 強對偶的組合特例。

### 6.2 增廣 trace(s→a→t,s→b→t,a→b;容量 s-a=3,a-t=2,s-b=2,b-t=3,a-b=1)
- 增廣 s-a-t:min(3,2)=2 → |f|=2,a-t 飽和。
- 增廣 s-a-b-t:min(3−2,1,3)=1 → |f|=3,s-a 用 3。
- s-b-t:s-a 滿、無更多…實際 s-b=2 還可:s-b-t min(2,3)=2 → |f|=5?檢守恆:需 a,b 守恆——此處示意增廣法「反覆找殘餘路徑」直到無路。最終 |f| = 最小割容量。

### 6.3 Ford-Fulkerson 不終止/慢陷阱
- **無理數容量**:FF 選到壞增廣路徑序列可能**不收斂**(流值趨近但不達最大)。
- **整數大容量**:複雜度 O(E·|f*|) 依**流值**,如容量 10⁹ 的對稱圖每次只增 1 → 10⁹ 次。**Edmonds-Karp 用 BFS 最短增廣路** → O(VE²) 與容量無關,根治此病。

### 6.4 陷阱
| 陷阱 | 正解 |
|---|---|
| FF 一定多項式 | O(E·|f*|) 是**偽多項式**;無理容量甚至可能不終止 |
| 最小割唯一 | 最大流值唯一,但達成的**流/最小割可能多個** |
| 忘了反向邊 | 殘餘網路**必含反向退流邊**,否則求不到最優 |
| 二分匹配要特製演算法 | 加超源超匯+單位容量 → **直接化約最大流**([[bipartite-matching]]) |

## 7. 延伸:Dinic/push-relabel + 最小成本流 + 應用

### 7.1 更快的最大流
- **Dinic**:分層圖(BFS)+ 阻塞流(DFS 多路增廣)→ **O(V²E)**;單位容量圖 O(E√V)(含二分匹配 [[bipartite-matching]] Hopcroft-Karp 即其特例)。
- **Push-relabel**:維護預流 + 高度標籤,局部 push/relabel → O(V²E) 或 O(V³)(FIFO/最高標籤變體)。實務常勝增廣路徑法。

### 7.2 最小成本最大流(MCMF)
邊有容量 + 單位成本,求「最大流中成本最小」或「指定流量最小成本」。做法:反覆沿**最短(成本)增廣路徑**(SPFA/Bellman-Ford 容負反向邊)增流。用於指派問題、運輸問題、帶成本匹配。

### 7.3 流的建模套路(資格考高頻)
- **多源多匯**:加超級源/匯。
- **點容量**:拆點(vᵢₙ→vₒᵤₜ 容量=點容量)。
- **下界約束流**:轉成無下界的可行流問題。
- **最小割=專案選擇**:最大權閉合子圖 → 最小割。
- **最大獨立集(二分圖)**=n−最小頂點覆蓋=n−最大匹配(König,[[bipartite-matching]])。

### 7.4 流量分解
任何可行流可分解成 ≤E 條 **s-t 路徑 + 環** 的流。證明/構造用於理解流結構、找增廣。

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
