---
question: 命題邏輯與一階邏輯差在哪?蘊涵/有效/可滿足怎麼分?歸結(resolution)為何是完備的推論程序?健全vs完備是什麼?
keywords: [propositional-vs-first-order, entailment-soundness-completeness, resolution]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Propositional calculus [[raw:ai-proplogic-wikipedia]](CC BY-SA 4.0)、First-order logic [[raw:ai-fol-wikipedia]](CC BY-SA 4.0)、Resolution(logic) [[raw:ai-resolution-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.7-9(Logical Agents / FOL / Inference in FOL)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 邏輯與知識表示 Logic（AIMA Ch.7-9）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
> 一句話:用邏輯語言表示知識、用推論規則導出結論;命題邏輯處理真假命題,一階邏輯加物件/關係/量詞表達力更強。(ai-proplogic-wikipedia)

## 1. 命題 vs 一階邏輯

- **命題邏輯**:原子命題(真/假)+ 連接詞 ¬∧∨→↔;表達力有限(無法說「所有」)。(ai-proplogic-wikipedia)
- **一階邏輯(FOL)**:加**物件、關係/謂詞、函數、量詞 ∀∃**;可說 ∀x King(x)→Person(x)。表達力強得多,是知識表示主力。(ai-fol-wikipedia)
- 代價:命題邏輯推論可判定(SAT,NP-complete);FOL **只半可判定**(有效式可枚舉證明,但不可滿足未必能停)。

## 2. 核心語意概念

- **蘊涵(entailment)KB ⊨ α**:凡 KB 為真的模型 α 皆真。推論=從 KB 導出被蘊涵的句子。
- **有效(valid)**:所有模型皆真(恆真式/套套邏輯);**可滿足(satisfiable)**:至少一模型真;**不可滿足**:無模型真。
- **演繹定理**:KB ⊨ α ⟺ (KB ∧ ¬α) 不可滿足 → 證蘊涵=證反面不可滿足(歸結的基礎)。

## 3. 推論程序:健全、完備、歸結

- **健全(sound)**:只導出真的結論(不亂推);**完備(complete)**:能導出所有被蘊涵的結論(不漏)。好的程序兩者兼具。
- **歸結(resolution)**:對 **CNF**(合取範式)子句,反覆套歸結規則(消去互補文字)求空子句 □ → 證不可滿足。(ai-resolution-wikipedia)
- **歸結反駁完備**:要證 KB⊨α,把 KB∧¬α 轉 CNF,歸結導出 □ 即證成。命題邏輯歸結完備;FOL 需**合一(unification)**+ Skolem 化,是**反駁完備(refutation-complete)**。

## 我的想法 / 啟發

- **「證蘊涵=證反面不可滿足」是邏輯推論的樞紐**,把 ⊨ 這個語意概念轉成可機械操作的 SAT/歸結。資格考常考 valid/satisfiable/unsatisfiable 三者判定與關係。
- **健全 vs 完備**必考對比:健全=不錯推、完備=不漏推。歸結是反駁完備(找得到空子句當且僅當不可滿足),但樸素歸結效率差 → 實務用 DPLL/CDCL。
- **命題(可判定)↔ FOL(半可判定)** 的跳變是表達力的代價,呼應 [[np-completeness]] 的可計算性階梯;符號 AI 與 [[ai-machine-learning]] 統計 AI 是互補兩支。

## Next action / 下一步

1. 補 DPLL/CDCL SAT 求解 + FOL 合一演算法完整步驟。
2. 建自動規劃(AIMA Ch.10),接邏輯表示到 STRIPS 動作。

## 交叉引用 / 出處
- raw:`wiki/raw/ai-proplogic-wikipedia.md`、`ai-fol-wikipedia.md`、`ai-resolution-wikipedia.md`
- [[np-completeness]] — SAT=命題可滿足性,NP-complete 原型;[[ai-csp]] — 命題約束;[[ai-machine-learning]] — 符號 vs 統計 AI
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.7-9)
