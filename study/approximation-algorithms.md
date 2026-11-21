---
question: NP-hard 最佳化問題怎麼在多項式時間拿到「有保證」的近似解?近似比/APX/PTAS/FPTAS 怎麼分?頂點覆蓋為何只能逼近到 2?
keywords: [approximation-algorithms, approximation-ratio, ptas-vs-fptas]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Approximation algorithm [[raw:approx-overview-wikipedia]](CC BY-SA 4.0)、Vertex cover [[raw:approx-vertexcover-wikipedia]](CC BY-SA 4.0)、APX [[raw:approx-apx-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.35。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 近似演算法 Approximation Algorithms（CLRS Ch.35）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★★。
> 一句話:**NP-hard 最佳化問題**算不出最佳解,就退而求「多項式時間、且與最佳解差距有保證上界」的近似解——保證用**近似比 ρ**量化。(approx-overview-wikipedia)

## 1. 近似比（approximation ratio / factor)

- 對最小化問題:演算法輸出成本 C,最佳 C*,**近似比 ρ 滿足 C/C* ≤ ρ**(ρ≥1,越接近 1 越好)。最大化問題用 C*/C ≤ ρ。(approx-overview-wikipedia)
- 「ρ-近似演算法」=對**所有輸入**都保證不超過 ρ 倍——這是與啟發式(heuristic,無保證)的關鍵差別。
- 可能隨輸入大小變化:ρ(n)。例:集合覆蓋 greedy 給 **H(n)=O(log n)** 近似。

## 2. 分類階梯（資格考常考對照)

- **APX**:存在**常數因子** ρ 多項式近似的 NP 最佳化問題類(如頂點覆蓋 ρ=2)。(approx-apx-wikipedia)
- **PTAS**(多項式時間近似方案):對任意 ε>0 給 (1+ε)-近似,時間對 n 多項式(但可對 1/ε 爆炸,如 O(n^{1/ε}))。
- **FPTAS**(完全 PTAS):時間對 n **與 1/ε 都**多項式(如背包問題)。FPTAS ⊂ PTAS ⊂ APX。
- **不可近似性**:某些問題(如一般 TSP)除非 P=NP 否則無常數近似;頂點覆蓋在 **Unique Games Conjecture 下無法逼近到小於 2**。(approx-vertexcover-wikipedia)

## 3. 母題:頂點覆蓋 2-近似

- 頂點覆蓋 = 選最少頂點使每條邊至少一端被選;**NP-hard**(Karp 21 之一)。(approx-vertexcover-wikipedia)
- **演算法**:找任一**極大匹配(maximal matching)**,取所有被匹配邊的**兩端點**當覆蓋。
- **為何 ρ=2**:匹配的每條邊必須被覆蓋,最佳解至少含每條匹配邊一端 → C* ≥ |M|;我們取了 2|M| 個頂點 → C=2|M| ≤ 2C*。**用下界 |M| 夾出比值**,不需知道 C*。

## 4. 其他經典

- **集合覆蓋** greedy:每次選覆蓋最多未覆蓋元素的集合 → H(n)=ln n + O(1) 近似(緊)。
- **度量 TSP**:三角不等式下,MST→DFS 繞樹給 **2-近似**;Christofides(MST+最小權完美匹配)給 **3/2-近似**。
- **背包**:動態規劃 + 四捨五入值域 → **FPTAS**。

## 5. 深化:近似比證明 + 集合覆蓋 + 不可近似

### 5.1 頂點覆蓋 2-近似證明(用匹配下界)
演算法:找極大匹配 M,輸出其**所有端點** C(|C|=2|M|)。
- **可行**:M 極大 → 每條邊至少一端在某匹配邊上(否則可擴 M),故 C 覆蓋所有邊。
- **近似比**:任何頂點覆蓋須覆蓋 M 的每條邊、而 M 的邊兩兩不共點 → 每條至少一個不同頂點 → **OPT ≥ |M|**。故 |C|=2|M| ≤ 2·OPT。∎
關鍵:**用 |M| 當 OPT 下界**夾比值,不需算 OPT。

### 5.2 集合覆蓋 greedy = H(n) 近似
每次選「覆蓋最多未覆蓋元素」的集合。令第 i 個被覆蓋元素分攤成本 cost=1/(當時新覆蓋數)。因 greedy 每步最優,未覆蓋的 k 個元素可由 OPT 的 ≤OPT 個集合覆蓋 → 當步新覆蓋 ≥ k/OPT → 總成本 ≤ OPT·(1/k+1/(k−1)+…) = OPT·Hₙ = **(ln n+O(1))·OPT**。此界**緊**(除非 P=NP 無法更好)。

### 5.3 不可近似(gap 保留歸約)
有些問題除非 P=NP 否則無常數近似:一般 TSP(無三角不等式)——若有 ρ-近似可用來多項式判定 Hamiltonian cycle(NP-hard)。**PCP 定理**給出許多問題的近似硬度下界(如 MAX-3SAT 無法優於 7/8)。

### 5.4 陷阱
| 陷阱 | 正解 |
|---|---|
| 頂點覆蓋「選最高度數」貪婪 2-近似 | 否!該貪婪最壞 Θ(log n);**極大匹配法**才 2-近似 |
| PTAS=FPTAS | PTAS 時間可對 1/ε 指數(n^{1/ε});FPTAS 對 1/ε 也多項式 |
| 所有 NP-hard 有常數近似 | 否(一般 TSP 無,除非 P=NP);看問題 |
| 近似比 <1 | 最小化問題 ρ≥1(越接近 1 越好) |

## 我的想法 / 啟發

- **證近似比的套路=找 OPT 的下界/上界**(不是算出 OPT):頂點覆蓋用 |匹配| 當 C* 下界、集合覆蓋用 LP 鬆弛/對偶。這是 Ch.35 最核心技巧,資格考一定要會「不知 OPT 卻能夾出比值」。
- **APX↔PTAS↔FPTAS 的階梯**要分清:常數 vs 任意 ε vs 任意 ε 且對 1/ε 也多項式。問「有沒有 FPTAS」常是送分/送命題。
- **近似≠啟發式**:近似有最壞保證,啟發式(如 [[randomized-algorithms]] 外的貪婪瞎猜)沒有。頂點覆蓋「選最高度數頂點」的直覺貪婪反而**沒有常數保證**,極大匹配法才有——反直覺考點。

## Next action / 下一步

1. 補集合覆蓋 greedy 的 H(n) 完整證明 + LP 鬆弛 randomized rounding。
2. 建二分圖匹配(Ch.25,★★)接頂點覆蓋的 König 定理(二分圖最小覆蓋=最大匹配)。

## 交叉引用 / 出處
- raw:`wiki/raw/approx-overview-wikipedia.md`、`approx-vertexcover-wikipedia.md`、`approx-apx-wikipedia.md`
- [[np-completeness]] — 近似處理的正是 NP-hard 最佳化;[[network-flow]] — 匹配/覆蓋對偶;[[randomized-algorithms]] — randomized rounding
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.35)
