---
date: 2026-11-27
tag: RAG
title: 不確定性什麼時候能量測 RAG 幻覺風險?
title_en: When Does Uncertainty Measure RAG Hallucination Risk?
source: Ansari & Agrahari (2026) · arXiv preprint · Zotero RAG Evaluation (RJIEUA44)
img: 2026-11-27_uncertainty-rag-hallucination.png
zotero: RJIEUA44
---

## 核心問題 · Question

perplexity（模型不確定性）能偵測 RAG 幻覺嗎？什麼條件下才有效，答案在哪裡？

## 🔴 背景與痛點 · Red

- Ansari & Agrahari (2026)，arXiv preprint
- 痛點：現有幻覺偵測不清楚「不確定性」在什麼條件下才等於幻覺風險
- 當檢索覆蓋不足時，模型可用 parametric 知識蒙混，仍給出高置信度的錯誤答案
- 授權：arXiv 預印本（非 CC，導讀/學術引用可用）

## 🟡 概念 · Yellow

- uncertainty / perplexity 不確定性
- hallucination risk 幻覺風險
- retrieval coverage 檢索覆蓋率
- AUROC 判別力指標（receiver operating characteristic）
- semantic-drift score 語意漂移分數
- → 我的 WARN 閾值設計（faithfulness 分類）
- → 與 Emma 的 harness 共用同一資料集（RAGTruth）

## 🔵 原文依據 · Blue (quotes)

> 「Uncertainty can measure hallucination risk … but only when retrieved evidence constrains the answer」
> 「perplexity reaches 0.81–0.91 AUROC on targeted unsupported edits」
> 「detection can weaken with only the top-ranked passage, then recover after adding a second passage」
> 「A combined uncertainty and semantic-drift score improves calibration」
> 「measurements remain above chance on RAGTruth QA」

## 🟠 我的想法 · Takeaway

- perplexity 是條件性幻覺偵測器：有檢索覆蓋才可靠，否則模型用 parametric 知識蒙混過關
- retrieval depth 要夠（至少兩段）：一段不夠，第二段加入才讓 perplexity 鑑別力回升
- 純長度分類器接近隨機：幻覺偵測不能靠長度，要靠不確定性 + 語意漂移
- → Emma 的 harness 裡 NLI+LLM-judge 也是條件性的——檢索覆蓋差時 WARN 類別更難分離
- → 加 semantic-drift 分數 ≈ 我的 embedding 距離指標，可在 RAGTruth 上交叉對照此 AUROC 標竿
