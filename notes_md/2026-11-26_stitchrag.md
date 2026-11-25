---
date: 2026-11-26
tag: RAG
title: StitchRAG — 壓縮 context 仍保真：anchor + diffusion 縫合
title_en: StitchRAG — Compact and Evidence-Preserving RAG Context via Diffusion-Based Stitching
source: Kim et al. 2026 · arXiv preprint
img: 2026-11-26_stitchrag.png
zotero: UIV7T8AT
---

## 核心問題 · Question

RAG 的 context 又長又雜，能壓縮又不失關鍵證據嗎？

## 🔴 背景與痛點 · Red

- Kim, Lim, Cho, Baek (2026)，arXiv preprint
- 痛點：長 context 帶來高計算開銷，noisy / 不相關內容反而傷 RAG 效能
- 授權：arXiv preprint（導讀用途屬合理使用）

## 🟡 概念 · Yellow

- compact context construction 緊密 context 建構
- utility maximization（保留資訊 vs 計算成本 trade-off）
- anchor = answer candidates + query-related keywords
- text diffusion stitching（縫合斷句為連貫 context）
- dynamic size allocation（每段動態壓縮比）
- → 壓縮忠實度研究（cross-lingual-compression-faithfulness）
- → AlgoCoach 檢索壓縮效能

## 🔵 原文依據 · Blue (quotes)

> "RAG improves factuality by grounding large language models (LLMs) in external evidence"
> "long retrieved contexts incur computational overhead and can even hurt performance due to noisy or irrelevant content"
> "StitchRAG builds a faithful, information-dense context while dynamically compressing the retrieved passages"
> "utility maximization trading-off the retained information and computation costs"
> "extract answer candidates and query-related keywords from passages as anchors"
> "connect or stitch the collected sentences together using text diffusion to form a coherent and natural context"
> "consistently outperforms diverse multi-step and compression baselines" (5 open-domain QA benchmarks)

## 🟠 我的想法 · Takeaway

- 想法：壓縮不能只看長度——以 anchor 為錨點保真再 stitch，這正是 faithfulness 的核心問題
- → WARN 類型：有事實但脈絡外的句子在壓縮時最易被截掉，anchor 機制正是保住這類句子的關鍵設計
- → diffusion stitching 讓壓縮後 context coherent：對下游 LLM-judge 的 faithfulness 判定更公平
- → dynamic size allocation 比固定壓縮比更貼近「每段資訊密度不同」的現實
