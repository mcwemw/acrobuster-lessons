---
question: 多代理賽局怎麼分析?納許均衡/主導策略是什麼、囚徒困境為何合作難?機制設計與社會選擇怎麼「設計規則誘導好結果」?
keywords: [game-theory, nash-equilibrium, mechanism-design]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Game theory [[raw:aic18-gametheory-wikipedia]](CC BY-SA 4.0)、Nash equilibrium [[raw:aic18-nash-wikipedia]](CC BY-SA 4.0)、Mechanism design [[raw:aic18-mechanism-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.18(Multiagent Decision Making)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 多代理決策 Multiagent Decision Making（AIMA Ch.18）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:多個理性代理互動時,單一代理的最優依賴他人選擇 → 用**賽局論**分析均衡,用**機制設計**反過來設計規則誘導想要的集體結果。(aic18-gametheory-wikipedia)

## 1. 賽局基本

- **正規式賽局**:玩家、策略、報酬矩陣。**主導策略(dominant)**:不論他人怎麼做都最優的策略。(aic18-gametheory-wikipedia)
- **囚徒困境**:兩人各有「合作/背叛」,背叛是主導策略 → 雙背叛(次優)是均衡,雖雙合作更好 → **個人理性 ≠ 集體最優**。
- 零和兩人 = minimax([[ai-adversarial-search]]);一般和才需納許。

## 2. 納許均衡

- **納許均衡**:一組策略,**沒有玩家能單方偏離而獲益**。(aic18-nash-wikipedia)
- 純策略不一定存在(如剪刀石頭布);**混合策略**(機率化)下 **Nash 定理**保證有限賽局必有均衡。
- 一個賽局可能**多個**均衡(協調問題:靠左/靠右開車);均衡不保證效率(囚徒困境)。

## 3. 機制設計(反向賽局)

- **目標**:設計賽局規則(機制),使理性代理各自追求私利時,**集體達成設計者想要的結果**(如社會福利最大、誠實揭露)。(aic18-mechanism-wikipedia)
- **誘因相容(incentive compatible)**:說真話是(弱)主導策略 → **VCG 機制**(拍賣付「對他人造成的外部性」)達成。
- **社會選擇**:聚合個人偏好成集體決策;**Arrow 不可能定理**(無完美投票規則)、**Gibbard-Satterthwaite**(非獨裁投票難防策略操弄)。

## 深化:囚徒困境 worked + 混合均衡 + VCG

### 囚徒困境報酬 worked
報酬(我,對手),合作C/背叛D:(C,C)=(−1,−1)、(C,D)=(−3,0)、(D,C)=(0,−3)、(D,D)=(−2,−2)。不論對手選什麼,我選 D 都較好(0>−1 且 −2>−3)→ D 主導 → (D,D) 均衡,但 (C,C) 對雙方更佳。**重複賽局**(以牙還牙 tit-for-tat)可誘導合作——未來懲罰使合作理性。

### 混合策略均衡(剪刀石頭布)
無純策略均衡;均衡是**各 1/3 機率**:使對手無論出什麼期望報酬相同(無法利用)。混合均衡求法=讓對手對各純策略無差異(indifference)。

### VCG 拍賣
每個得標者付的不是出價,而是**他的存在對其他人造成的損失**(外部性)→ 誠實出價是主導策略。第二價格(Vickrey)拍賣是單物品特例:得標者付第二高價,說真話最優。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| 納許均衡=最優/帕累托 | 不保證效率(囚徒困境雙背叛是均衡) |
| 均衡唯一 | 常**多個**(協調賽局);純策略可能不存在 |
| 一次賽局=重複賽局 | 重複/有未來懲罰可誘導合作(tit-for-tat) |
| 有完美投票制度 | Arrow/G-S 定理:不可能同時滿足所有合理性質 |

## 我的想法 / 啟發

- **多代理把 [[ai-decision-making]] 的單代理效用最大化推廣到互動**:「最優」變成均衡(考慮他人反應)。零和特例就是 [[ai-adversarial-search]] 的 minimax。
- **機制設計=「反向賽局」**最有啟發:不是在給定規則下求最優,而是**設計規則**讓自利導向公益——這對我做的 agent 系統/平台激勵(OpenMAIC 計費、協作)有直接映射。
- **囚徒困境 + 重複賽局誘導合作**是「個人理性 vs 集體理性」的經典張力,也是多代理 AI 安全/對齊的縮影。

## Next action / 下一步

1. 補重複賽局 folk theorem + 相關均衡 + Shapley value(合作賽局分配)。
2. 接 [[ai-intelligent-agents]] 多代理環境 + [[ai-reinforcement-learning]] 多代理 RL(MARL)。

## 交叉引用 / 出處
- raw:`wiki/raw/aic18-gametheory-wikipedia.md`、`aic18-nash-wikipedia.md`、`aic18-mechanism-wikipedia.md`
- [[ai-decision-making]] — 單代理→多代理;[[ai-adversarial-search]] — 零和=minimax;[[ai-intelligent-agents]] — 多代理環境
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.18)
