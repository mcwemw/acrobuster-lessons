---
date: 2026-11-25
tag: RAG
title: Copying Is Not Grounding — faithfulness reward 被複製 hack 了
title_en: Copying Is Not Grounding — Training Faithful Long-Form RAG with Authored-Sentence Credit
source: Pham et al. 2026-10-13 · arXiv preprint · 授權待查
img: 2026-11-25_copying-not-grounding.png
zotero: 245MJVU8
---

## 核心問題 · Question

RAG 模型「抄」檢索段落就算 supported — 怎麼分辨真忠實 vs. 複製湊數?

## 🔴 背景與痛點 · Red

- Pham, Vu, Doan, Nguyen, Luu (2026-10-13)，arXiv preprint，Zotero RAG Evaluation (245MJVU8)
- 痛點：faithfulness reward 被 copying hack——抄來的句子自動算 supported，模型學會複製而非真 grounding
- 授權：arXiv preprint（CC 授權待查）

## 🟡 概念 · Yellow

- faithfulness reward hacking 忠實度獎勵被破解
- Authored-Sentence Credit (ASC) 作者句子計分法
- GRPO sentence-level advantage（對比 GRPO 的答案級別 advantage）
- copying vs. grounding 的結構區分
- → 我的 faithfulness LLM-judge 設計
- → WARN 類別 = 真事實但無 retrieval 脈絡支撐

## 🔵 原文依據 · Blue (quotes)

> 「In search engines and assistants, long-form RAG answers can mislead readers with claims their sources do not support.」

> 「A sentence copied from the passages is supported almost by construction, so trained models learn to copy rather than ground what they write.」

> 「ASC credits only sentences that are authored rather than copied, say more than the question, and are supported by the passages.」

> 「Rewarding correct answers buys nothing in citation faithfulness, so faithfulness has to be trained and measured on its own terms.」

> 「only ASC lowers the error rate of authored sentences」

## 🟠 我的想法 · Takeaway

- 核心洞見：faithfulness reward ≠ correctness reward — copying hack 讓前者毫無意義
- → 我的接地三層分類研究：WARN（真事實但非脈絡內）正是「non-grounded but accurate」的子類，與本文洞見高度一致
- → 閘門設計要能區分「作者寫的句子 vs. 抄來的句子」，不能只看 supported/not supported
- → 對 AlgoCoach RAG pipeline 的啟示：評測忠實度時要用 authored-sentence 而非 coverage 指標
