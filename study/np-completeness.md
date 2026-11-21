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
