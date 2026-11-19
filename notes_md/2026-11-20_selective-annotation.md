---
date: 2026-11-20
tag: RAG
title: Selective Annotation — 用圖挑「最少又最有代表」的範例來標
title_en: Selective Annotation Makes Language Models Better Few-Shot Learners
source: Su et al. 2022 · arXiv:2209.01975 · arXiv-license
img: 2026-11-20_selective-annotation.png
zotero: 873NN7KJ
---

## 核心問題 · Question

in-context learning 要先標一池範例，很貴。怎麼用最少標註挑出「最值得標」的範例，測試時又能檢索到對的？

## 🔴 背景與痛點 · Red

- Su, Kasai, Wu, Shi, Wang, Xin, Zhang, Ostendorf, Zettlemoyer, Smith, Yu (2022)，arXiv:2209.01975
- 痛點：in-context learning 要先標一池示範範例，標註成本高
- 授權：arXiv 預設授權（非 CC；導讀引用可，重製散布受限）

## 🟡 概念 · Yellow

- 兩步框架：先 selective annotation（事先選要標的池），後 prompt retrieval（測試時從池中檢索）
- vote-k：無監督、graph-based 的選樣法，挑「多樣且有代表性」的範例
- prompt retrieval：測試時從已標池檢索任務範例（近 embedding-kNN 思路）
- 省標註：10–100× 更少標註逼近 finetune 效果
- → 我的 AlgoCoach Graph-RAG：圖式檢索挑範例
- → 檢索器（embedding）選範例

## 🔵 原文依據 · Blue (quotes)

> 「a two-step framework: selective annotation that chooses a pool of examples to annotate from unlabeled data in advance」
> 「followed by prompt retrieval that retrieves task examples from the annotated pool at test time」
> 「an unsupervised, graph-based selective annotation method, vote-k, to select diverse, representative examples to annotate」
> 「it yields similar performance with 10-100x less annotation cost across 10 tasks」

## 🟠 我的想法 · Takeaway

- 想法：「先選要標的池、測試時再檢索」正是我 Graph-RAG coach 的兩段式檢索母本
- → vote-k 的 graph-based 多樣化選點 = 我挑教學範例／概念節點可借的選樣策略
- → 「少標註逼近 finetune」提醒：coach 的範例庫重質不重量，挑有代表的勝過全標
