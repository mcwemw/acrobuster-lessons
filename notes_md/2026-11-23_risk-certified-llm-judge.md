---
date: 2026-11-23
tag: RAG
title: Risk-certified LLM-as-a-judge — 有統計保證的裁判 prompt 選擇
title_en: Risk-certified prompt optimization for LLM-as-a-judge guardrails
source: Jawad et al. 2026 · arXiv · RAG Evaluation (UQUHTUCQ)
img: 2026-11-23_risk-certified-llm-judge.png
zotero: UQUHTUCQ
---

## 核心問題 · Question

LLM 當裁判時，怎麼保證它自己不被繞過？有沒有統計上可認證的方法？

## 🔴 背景與痛點 · Red

- Jawad, Landeau, Iradukunda, Beaumont, Rezel, Schaack, Brunel (2026)，arXiv
- 痛點：system prompt 控的 LLM-judge 只優化平均準確率，沒有安全保證
- 授權：CC（需查原文；以 abstract 為準）

## 🟡 概念 · Yellow

- constrained optimization：最大化 benign pass rate，同時限 missed-attack ≤ α
- CPS：固定 prompt pool + upper confidence bound 認證
- CRISP：自適應搜尋 + risk feedback rewriting
- distribution-free risk certification 免分布假設
- → 我的 faithfulness judge 可加 α 誤判閾值設計
- → Maker/Checker 紀律的統計版

## 🔵 原文依據 · Blue (quotes)

> 「LLM-as-a-judge guardrails are often controlled primarily through system prompts」
> 「maximize benign pass rate while keeping the missed-attack rate below a user-specified level α with finite-sample statistical control」
> 「CPS … certifies candidates on a held-out evaluation set using simultaneous upper confidence bounds」
> 「CRISP … hard example-guided rewriting and a reusable-holdout interface」
> 「risk-certified selection consistently respects the target missed-attack level on heldout tests」

## 🟠 我的想法 · Takeaway

- 想法：LLM-judge 本身就是攻擊面——用「有統計認證的 prompt 選擇」來收緊安全邊界
- → 我的 faithfulness judge 也能借這個框架加 α 閾值設計，不只是「調出最高準確率」
- → CRISP 的 hard-example rewriting 像我的 Maker/Checker：先找難例再修正
- → distribution-free = 樣本有限時也能認證，適合研究早期小 n 實驗
