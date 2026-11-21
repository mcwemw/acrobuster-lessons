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
