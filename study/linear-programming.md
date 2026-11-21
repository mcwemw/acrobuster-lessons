---
question: 線性規劃標準式長怎樣?單純形法為何走頂點、最壞指數但實務快?對偶與弱/強對偶定理說什麼?
keywords: [linear-programming, simplex-algorithm, lp-duality]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Linear programming [[raw:lp-overview-wikipedia]](CC BY-SA 4.0)、Simplex algorithm [[raw:lp-simplex-wikipedia]](CC BY-SA 4.0)、Dual linear program [[raw:lp-duality-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.29(Linear Programming)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 線性規劃 Linear Programming（CLRS Ch.29）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★。
> 一句話:在線性約束下最佳化線性目標;可行域是凸多面體,最優必在**頂點**取得,單純形法沿邊走頂點、內點法穿內部。(lp-overview-wikipedia)

## 1. 形式

- **標準式**:max cᵀx s.t. Ax ≤ b, x ≥ 0。可行域=凸多面體(polytope);線性目標在凸多面體上最優落在**頂點(極點)**。(lp-overview-wikipedia)
- 任何 LP 可轉標準/鬆弛式(加 slack 變等式)。整數要求 → ILP(NP-hard,見 [[approximation-algorithms]] 頂點覆蓋 LP 鬆弛)。

## 2. 單純形法(Simplex)

- 從一個頂點出發,沿**改善目標的邊**走到相鄰頂點,直到無法再改善=最優。(lp-simplex-wikipedia)
- **最壞指數**(Klee–Minty 立方體可讓它走遍指數個頂點),但**實務上極快**(通常線性次迭代)——理論與實務落差的經典案例。
- 多項式時間法:**橢球法**(Khachiyan,理論首證 LP∈P)、**內點法**(Karmarkar,實務可與單純形競爭)。

## 3. 對偶(Duality)

- 每個 LP(primal)對應一個 **dual**;primal max 對 dual min,變數↔約束互換。(lp-duality-wikipedia)
- **弱對偶**:任何可行 primal 值 ≤ 任何可行 dual 值。
- **強對偶**:若兩者都有最優,則**最優值相等**(無間隙)。**互補鬆弛**刻畫最優:primal 約束鬆 ⟹ 對應 dual 變數=0。
- 用途:dual 給 primal 最優的**證書/下界**;很多組合最優(最大流=最小割、[[bipartite-matching]] König)是 LP 對偶的特例。

## 4. 深化:對偶構造 + 互補鬆弛 + 單純形退化

### 4.1 primal→dual 構造(worked)
Primal: max 3x₁+2x₂ s.t. x₁+x₂≤4, x₁+3x₂≤6, x≥0。
Dual(每約束配一個 dual 變數 y≥0): min 4y₁+6y₂ s.t. y₁+y₂≥3, y₁+3y₂≥2。
規則:primal max/≤約束 ↔ dual min/≥約束;primal 約束數=dual 變數數、primal 變數數=dual 約束數;目標係數↔約束右端互換。

### 4.2 弱/強對偶 + 互補鬆弛
- **弱對偶**:任何可行 (x,y) 有 cᵀx ≤ bᵀy(primal 值永 ≤ dual 值)。
- **強對偶**:兩者皆有最優 → 最優值相等(無間隙)。
- **互補鬆弛**(刻畫最優):最優時「primal 第 i 約束不緊(有鬆) ⟹ yᵢ=0」且「dual 第 j 約束不緊 ⟹ xⱼ=0」。即**鬆的約束對應零對偶變數**——用來驗證/求最優。

### 4.3 單純形退化與 Bland 規則
退化(某基變數=0)時,樞紐可能原地打轉**循環不終止**。**Bland 規則**(永遠選指標最小的進基/出基變數)保證不循環 → 單純形必終止。這是「最壞指數但實務快」之外的正確性保障。

### 4.4 陷阱
| 陷阱 | 正解 |
|---|---|
| 單純形多項式 | 最壞**指數**(Klee-Minty);實務快;多項式要橢球/內點 |
| 對偶的對偶≠primal | 對偶的對偶**=primal**(對合性) |
| 強對偶總成立 | 需兩者皆可行且有界;否則可能有間隙/無界 |
| LP 最優在內部 | 線性目標最優必在**頂點**(凸多面體極點) |

## 5. 延伸:內點法 + 整數規劃 + 對偶應用

### 5.1 內點法(多項式且實務強)
穿過可行域**內部**趨近最優(非沿邊)。**障礙函數法**:加 −μΣlog(sᵢ) 懲罰逼近邊界,沿「中心路徑」隨 μ→0 收斂;每步解 Newton 系統。Karmarkar(1984)首個實務可用多項式法;大型 LP 常勝單純形。橢球法(Khachiyan)理論首證 LP∈P 但實務慢。

### 5.2 整數線性規劃(ILP,NP-hard)
變數限整數 → NP-hard。解法:**分支定界**(LP 鬆弛給界 + 分裂分數變數)、**割平面**(加有效不等式切掉分數解,Gomory cut)、**分支切割**(商用求解器 CPLEX/Gurobi 核心)。LP 鬆弛是 ILP 下界,也是近似演算法基礎([[approximation-algorithms]] §6.1)。

### 5.3 對偶的實務意義
- **影子價格**:dual 變數 = 放寬第 i 約束一單位對最優值的邊際改善。
- **敏感度分析**:係數變動多少解仍最優。
- **Farkas 引理**:系統可行性的對偶刻畫(「無解」有一個證書)。

### 5.4 LP 統一的組合最優
最大流最小割、二分匹配 König([[bipartite-matching]])、最短路(LP 形式)、指派問題皆是 LP/其對偶的特例;整數性由**全幺模(totally unimodular)**矩陣保證——那時 LP 最優自動整數,不需 ILP。

## 我的想法 / 啟發

- **LP 對偶是資格考高槓桿觀念**:它統一了最大流最小割、König 定理、[[approximation-algorithms]] 的 LP 鬆弛下界——看到「min-max 相等」就該想到強對偶。
- **單純形最壞指數但實務快**是「最壞≠平均/實務」的教科書案例,呼應 [[randomized-algorithms]] 的期望分析觀:最壞界不是全部真相。
- **頂點最優**是凸性的直接後果:凸多面體+線性目標 → 不必搜內部,只看極點,這是整個 LP 可解的幾何根基。

## Next action / 下一步

1. 補單純形完整 pivot trace(含退化/Bland 規則防循環)+ 互補鬆弛推最優例。
2. 補 LP 建模範例(最大流/指派寫成 LP)接 [[network-flow]]/[[bipartite-matching]]。

## 交叉引用 / 出處
- raw:`wiki/raw/lp-overview-wikipedia.md`、`lp-simplex-wikipedia.md`、`lp-duality-wikipedia.md`
- [[network-flow]] — 最大流最小割=LP 對偶特例;[[bipartite-matching]] — König;[[approximation-algorithms]] — LP 鬆弛下界
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.29)
