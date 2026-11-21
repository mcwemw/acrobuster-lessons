---
question: P / NP / NP-hard / NP-complete 怎麼分？多項式歸約證明 NP-complete 的邏輯是什麼？Cook-Levin 說了什麼？
keywords: [np-completeness, polynomial-reduction, cook-levin]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia NP-completeness [[raw:np-completeness-wikipedia]](CC BY-SA 4.0)、P vs NP [[raw:np-pvsnp-wikipedia]](CC BY-SA 4.0)、SAT [[raw:np-sat-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.34。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# NP-完備性 NP-Completeness（CLRS Ch.34）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法。
> 一句話:NP-complete = **NP 裡最難的一類**;若任一個有多項式解,則 P=NP。判一個問題 NPC = 證它在 NP 且能被已知 NPC 問題**多項式歸約**過來。(np-completeness-wikipedia)

## 1. 四個類別

- **P**:多項式時間**可解**。
- **NP**:給一個「證書」能多項式時間**驗證**(非決定性多項式)。P ⊆ NP。(np-pvsnp-wikipedia)
- **NP-hard**:**至少和 NP 中任何問題一樣難**(所有 NP 問題能多項式歸約到它);不一定在 NP 內。
- **NP-complete**:**在 NP 且 NP-hard**(= NP 裡最難的核心)。

## 2. 多項式歸約 (polynomial reduction)

- A ≤ₚ B:能用多項式時間把 A 的實例轉成 B 的實例,答案一致。→ 「B 不比 A 簡單」。
- **證 B 是 NPC**:① 證 B ∈ NP;② 取一個已知 NPC 問題 A,證 **A ≤ₚ B**。(np-completeness-wikipedia)
- 歸約有**傳遞性**:一個新 NPC 擴散出一串。

## 3. Cook-Levin 定理（起點)

**SAT(布林可滿足性)是第一個被證明的 NP-complete 問題**。(np-sat-wikipedia)
之後所有 NPC 都從 SAT(或其後代如 3-SAT)**歸約**而來 → 奠定整個 NPC 理論的根。

## 4. 經典 NP-complete 問題（資格考要認得)

3-SAT、團 Clique、頂點覆蓋 Vertex Cover、獨立集、Hamiltonian Cycle、TSP(決策版)、子集合加總 Subset-Sum、0-1 背包(決策版)、圖著色。

## 5. P vs NP + 實務意涵

- **P =? NP** 是未解大問題;普遍相信 P≠NP → NPC 問題**無已知多項式解**。(np-pvsnp-wikipedia)
- 遇到 NPC:不硬求最優,改走**近似演算法 / 啟發式 / 參數化 / 特例多項式解**。

## 6. 深化:歸約鏈 + worked 歸約 + 常見錯誤

### 6.1 經典歸約鏈(箭頭=≤ₚ)
SAT →(Cook-Levin 奠基)→ **3-SAT** → {Clique, Subset-Sum} → ...
- 3-SAT → **Clique**:每子句做一組 3 個頂點(代表其文字),不同子句間、非互補文字連邊;k 個子句 → 找大小 k 的團 ⟺ 每子句選一個真文字且相容 ⟺ 可滿足。
- 3-SAT → Clique → **Vertex Cover**(VC):G 有 k-團 ⟺ 補圖有 (n−k)-獨立集 ⟺ 補圖有 (n−k) 補集即 VC。VC → **Hamiltonian** → **TSP(決策版)**。

### 6.2 worked:3-SAT ≤ₚ 獨立集
公式 φ 有 m 子句、每句 3 文字。造圖:每句 3 頂點兩兩相連(三角形,強制每句最多選 1);不同句的互補文字(x 與 ¬x)連邊。**φ 可滿足 ⟺ 圖有大小 m 的獨立集**:獨立集每句恰挑 1 個為真文字,互補邊保證不選矛盾對。轉換多項式時間 ⟹ 獨立集 NP-hard。∎

### 6.3 證 NPC 的標準兩步(方向別搞反)
要證新問題 **B** 是 NPC:
1. **B ∈ NP**:給「證書」能多項式驗證(如 VC 給頂點集、驗每邊被覆蓋)。
2. **已知 NPC 的 A ≤ₚ B**:把 A 的任意實例多項式轉成 B 的實例且答案一致。🔴 方向是「**已知難的 A 歸約到新問題 B**」——證明 B 至少和 A 一樣難。反了(B≤ₚA)只證 B 不比 A 難,**無效**。

### 6.4 常見錯誤
| 錯誤 | 正解 |
|---|---|
| 歸約方向反(B≤ₚA 證 B 難) | 要 A≤ₚB,把**已知 NPC** 當來源 |
| NP = 「非多項式」 | NP=多項式**可驗證**;P⊆NP,NP 非「not P」 |
| NP-hard 一定在 NP | 不一定(如停機問題 NP-hard 但不可判定) |
| 分解整數是 NPC | 目前**未知**是否 NPC(在 NP∩co-NP,普遍認為不是 NPC)([[number-theoretic-algorithms]]) |
| NPC 就無解 | 有近似/啟發/參數化/特例多項式(如二分圖 VC 精確,見 [[bipartite-matching]] König) |

## 我的想法 / 啟發

- **NPC 的判法是「歸約」而非「從頭解」**:資格考要會「取一個已知 NPC → 多項式轉成目標問題」的證明骨架,方向別反(要 A≤ₚB,把已知難的歸約到新問題)。
- 這章是演算法軌的「天花板」:前面所有多項式演算法([[dynamic-programming]]/[[greedy-algorithms]]/[[network-flow]]…)的對照面——**知道一個問題 NPC,就別再找多項式最優解,改近似**。
- 背熟那組經典 NPC + 它們之間的歸約鏈(SAT→3SAT→Clique→VC…)是拿分關鍵。

## Next action / 下一步

1. 演算法軌至此覆蓋 CLRS 全部大章;接開 **AI 軌(AIMA Ch.3 搜尋)**。
2. 補 SAT→3-SAT→Clique→Vertex-Cover 的完整歸約鏈 + 近似比(VC 2-approx)。

## 交叉引用 / 出處
- raw:`wiki/raw/np-completeness-wikipedia.md`、`np-pvsnp-wikipedia.md`、`np-sat-wikipedia.md`
- [[dynamic-programming]]、[[greedy-algorithms]]、[[network-flow]] — 多項式可解的對照面;NPC=其天花板
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.34)
