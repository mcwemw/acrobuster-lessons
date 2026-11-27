---
date: 2026-11-28
tag: RAG
title: Faithful in Steps — QDRAG 拆題消 over-citation
title_en: Faithful in Steps — Improving Generalization and Citation in RAG via Query Decomposition
source: Liu et al. 2026 · arXiv preprint · Zotero RAG Evaluation (A46GMFFW)
img: 2026-11-28_qdrag-faithful-steps.png
zotero: A46GMFFW
---

## 核心問題 · Question

引文式 RAG 在 multi-hop 問題上過引、泛化差——問題出在哪？怎麼修？

## 🔴 背景與痛點 · Red

- Liu, Ru, Di, Zhang, Zhang, Zhou (2026-11-11)，arXiv preprint
- 痛點：RAGQ（帶 quote 的 RAG）遇 multi-hop / 多模態問題三大失效：over-citation / 隱式實體辨識失敗 / 跨域泛化差
- 授權：arXiv preprint，metadata 未列 CC 授權，導讀僅引 abstract 字句

## 🟡 概念 · Yellow

- RAGQ：生成帶 quotes 的可追溯答案，提升 verifiability
- QDRAG：把問題拆成 atomic subquestions，找出隱式實體
- QD-C：context knowledge 驅動的 zero-shot 拆題
- QD-R：retrieval reward 驅動的 zero-shot 拆題
- reranker 剪掉 context distractors，消除 over-citation
- 關鍵發現：QD task finetune 泛化 > 直接 RAGQ task finetune
- → 引文可追溯是閘門設計的一環（faithfulness-gate-backing）
- → 拆題粒度影響 judge 判斷準確性（llm-final-judge-candidates）

## 🔵 原文依據 · Blue (quotes)

> "The quotes indicate which input contexts support the RAG to derive the answers, enhancing the answer's verifiability and trustworthiness."

> "QDRAG breaks down the input question into atomic subquestions to identify the implicit entities."

> "the reranker prunes context distractors to eliminate the downstream over-citation"

> "finetuning on the QD task shows better generalizability compared to directly finetuning on the downstream RAGQ task"

> "significantly outperforms all the baselines on both in-domain and out-of-domain tests, even surpassing Gemini-Pro"

## 🟠 我的想法 · Takeaway

- 想法：三步驟拆解 over-citation 根因——複合問題 → 原子化 → 隱式實體辨識 → rerank 去雜訊
- → judge-pilot：複合評測題也先「原子化拆解再評」→ 減少假陰性 / 假陽性
- → Emma 的 WARN 分類：問題拆細後能更精確診斷「正確事實但脈絡外」這個失效類別
