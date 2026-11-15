---
date: 2026-11-15
tag: 提示工程
title: 解釋不可盡信 — few-shot 的解釋可能不本於輸入，但能拿來事後驗證
title_en: The Unreliability of Explanations in Few-shot Prompting for Textual Reasoning
source: Ye & Durrett 2022 · arXiv:2205.03401 · arXiv 預設授權
img: 2026-11-15_unreliable-explanations.png
zotero: W3JTQ6UC
---

## 核心問題 · Question

LLM 自己給的解釋，可信嗎？加了解釋的 few-shot 真的讓推理更準嗎？

## 🔴 背景與痛點 · Red

- Ye & Durrett (2022)，arXiv:2205.03401
- 測 4 個 LLM × 3 個文字推理資料集（QA + NLI）
- 任務：few-shot prompt 加入不同風格的「解釋」
- 授權：arXiv 預設授權（非 CC）；重用前宜洽作者

## 🟡 概念 · Yellow

- explanation faithfulness 解釋忠實度
- entail 蘊含（解釋是否真的推得出預測）
- factually grounded 是否本於輸入文本
- post-hoc verification 事後驗證
- calibrator 可靠度校準器
- → 我的 WARN 類別母本
- → faithfulness 閘門

## 🔵 原文依據 · Blue (quotes)

> 「including explanations … only yields small to moderate accuracy improvements」（多數模型）
> 「explanations … may not entail the models' predictions nor be factually grounded in the input」
> 「even on simple tasks with extractive explanations」
> 「flawed explanations can still be useful as a way to verify LLMs' predictions post-hoc」
> 「good [explanations] … more likely cooccur with accurate predictions」→ 訓練 calibrator 事後提升

## 🟠 我的想法 · Takeaway

- 想法：解釋可以「聽起來對」卻不蘊含預測、也沒本於輸入 = 正是我 WARN 類別（真話但脫離脈絡）的學術母本
- → 不要 trust 解釋、要 verify：好解釋↔對答案的相關性，就是 faithfulness 閘門／校準器的設計依據
- → 連結 coach：把「解釋是否本於檢索段落」當閘門，不合格的推理不計分、改走事後驗證
