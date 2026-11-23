---
date: 2026-11-24
tag: RAG
title: Rubric Semantics or Numerical Priors? — LLM 評審的量表方向偏誤
title_en: Rubric Semantics or Numerical Priors? Auditing Scale-Direction Bias in LLM Judges
source: Kim et al. 2026 · arXiv preprint · 非 CC 授權，僅供研究引用
img: 2026-11-24_rubric-semantics-llm-judge.png
zotero: D4JSTCVM
---

## 核心問題 · Question

LLM 評審真的按評分標準（rubric）的語意打分，還是只跟著分數的「大小感」走？

## 🔴 背景與痛點 · Red

- Kim, Kim, Song, Lee, Park（2026），arXiv preprint，2026-11-19 上傳
- 痛點：benchmark 越來越靠 LLM-as-a-judge，但這個典範預設「模型讀懂 rubric 語意」——本文質疑這點
- 實驗規模：5 個 meta-evaluation benchmarks × 7 個 LLM judges（開源＋私有）
- 授權：arXiv preprint，非 CC 授權，僅供研究引用

## 🟡 概念 · Yellow

- semantic faithfulness（新概念）：語意等價的 rubric 必須給出一致分數
- scale-reversal probe：翻轉分數錨（1=好 ↔ 5=好），評標準不變，看分數是否一致
- floor normalization：校正模型內建的隨機性，確保跨模型比較公平
- bidirectional anchor averaging：雙向平均 → 降低對單一錨方向的依賴，不損失與人類評分的對齊
- → 我的 faithfulness LLM-judge 設計
- → WARN 失效類別研究中的判官可信度問題

## 🔵 原文依據 · Blue (quotes)

> 「this paradigm assumes LLMs evaluate based on the rubric's semantic meaning rather than its numeric scale」

> 「widespread violations of semantic faithfulness」（5 benchmarks, 7 LLM judges）

> 「raw reversal agreement alone is misleading」

> 「bidirectional anchor averaging reduces dependence on any single anchor direction without compromising alignment with human judgments」

> 「trustworthy LLM judges must reliably follow rubric semantics, not just correlate with human ratings」

## 🟠 我的想法 · Takeaway

- 核心洞見：LLM 評審受「數字先驗」影響 — 1 分永遠像低分、5 分永遠像高分，不管文字說什麼
- → 我的 faithfulness judge 若用 1-5 Likert rubric，要用雙向平均（bidirectional averaging）才可靠
- → WARN 研究若採 LLM 評分，scale-reversal probe 是判官可信度的必要驗證手段；或改用 rubric-free comparative judge
