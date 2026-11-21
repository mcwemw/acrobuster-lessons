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

## 5. 深化:König 構造證明 + 增廣 trace + Hall 定理

### 5.1 König 定理構造證明(最大匹配=最小頂點覆蓋,二分圖)
設最大匹配 M。構造頂點覆蓋 C:令 U=左側未匹配點,Z=從 U 經**交替路徑**可達的所有點。取 **C =(左側∖Z)∪(右側∩Z)**。
- |C|=|M|:每條匹配邊恰貢獻一端入 C(可證 C 中無未匹配點、每匹配邊一端在 C)。
- C 是覆蓋:若有邊兩端都不在 C → 推出一條新交替增廣路,與 M 最大矛盾。
故 |最小覆蓋| ≤ |C| = |M| ≤ |最小覆蓋|(弱對偶)→ 相等。∎ 這是 [[network-flow]] max-flow min-cut 在二分圖的投影。

### 5.2 增廣路徑 trace(左{a,b} 右{x,y};邊 a-x,a-y,b-x)
- 初始 M=∅。找 a 的增廣路 a-x → M={a-x}。
- 找 b:b-x 已匹配(x 配 a)→ 走交替 b-x-a-y(x→a 是匹配邊,a-y 未匹配,y 自由)→ 增廣!翻轉 → M={b-x, a-y},大小 2=完美匹配。
反覆「找自由點的增廣路並翻轉」直到無路(Berge)。

### 5.3 Hall 婚姻定理(完美匹配存在條件)
二分圖左 L 存在**飽和 L 的匹配 ⟺ 對任意 S⊆L,|N(S)|≥|S|**(鄰居不少於自身)。違反 Hall 條件的 S(|N(S)|<|S|)就是瓶頸。與 König、max-flow min-cut 三者等價,都是「瓶頸=對偶最優」。

### 5.4 陷阱
| 陷阱 | 正解 |
|---|---|
| König 適用一般圖 | **僅二分圖**;一般圖需 Edmonds 開花(奇環) |
| 極大匹配=最大匹配 | 極大=不能再加;最大=邊數最多;前者不保證後者 |
| Hopcroft-Karp 任意圖 O(E√V) | 二分圖 O(E√V);一般圖需 Micali-Vazirani |
| 最大匹配唯一 | 通常不唯一;大小唯一 |

## 6. 延伸:Edmonds 開花 + 加權匹配 + 穩定匹配

### 6.1 一般圖匹配:Edmonds 開花(blossom)
一般圖的增廣路徑會遇**奇環(blossom)**,使 BFS/DFS 失效。Edmonds 的招:偵測到奇環就**收縮成單點**,在收縮圖找增廣路再展開。O(V³)(或 O(V²E))。這解釋「為何二分圖容易、一般圖難」——奇環是關鍵障礙(König 也僅限二分圖)。

### 6.2 加權匹配:匈牙利演算法(Kuhn-Munkres)
二分圖最大權完美匹配:維護頂點**位勢(label)**,只走「緊邊」(label 和=邊權)找增廣,調整 label 擴大相等子圖。O(V³)。等價於指派問題 LP 的對偶([[linear-programming]] 互補鬆弛)。

### 6.3 穩定匹配:Gale-Shapley
男女各有偏好序,求**穩定匹配**(無一對寧願私奔)。延遲接受:每輪未配對者向最偏好且未拒絕者求婚,被求者暫留最佳、拒其餘。O(n²),必存在且求婚方最優。與最大匹配不同目標(穩定 vs 數量),是機制設計經典。

### 6.4 匹配的對偶全景
二分圖:**最大匹配=最小頂點覆蓋(König)=n−最大獨立集=單位容量最大流**([[network-flow]])。Hall 定理給完美匹配存在條件。這組等價是「組合對偶」母題,全是 LP 對偶的特例。

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
