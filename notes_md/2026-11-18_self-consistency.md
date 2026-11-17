---
date: 2026-11-18
tag: 提示工程
title: Self-Consistency — 取樣多條推理路徑，用多數一致挑最可信答案
title_en: Self-Consistency improves chain-of-thought reasoning in language models
source: Wang et al. 2022 · arXiv:2203.11171 · arXiv 預設授權（非 CC；重用前宜洽作者）
img: 2026-11-18_self-consistency.png
zotero: ZJVIMAHF
---

## 核心問題 · Question

CoT 只取貪婪解（一條推理路徑）就好嗎？能不能取樣多條推理路徑，再用「多數一致」挑最可信的答案？

## 🔴 背景與痛點 · Red

- Wang, Wei, Schuurmans, Le, Chi 等（2022），arXiv:2203.11171
- 背景：CoT + 預訓練 LLM 在複雜推理任務上已有好結果
- 痛點：原 CoT 用 naive greedy decoding，只走一條推理路徑
- 授權：arXiv 預設授權（非 CC）；重用前宜洽作者

## 🟡 概念 · Yellow

- self-consistency 自我一致性（新解碼策略）
- 取代 greedy decoding
- 取樣 diverse reasoning paths（多條推理路徑）
- marginalize 邊際化 → 選 most consistent answer（= majority vote 多數決）
- 直覺：複雜題有多種思路，但指向同一正解
- → 對應我的 deterministic gate / Maker-Checker

## 🔵 原文依據 · Blue (quotes)

> 「self-consistency, to replace the naive greedy decoding used in chain-of-thought prompting」
> 「samples a diverse set of reasoning paths instead of only taking the greedy one」
> 「selects the most consistent answer by marginalizing out the sampled reasoning paths」
> 「a complex reasoning problem typically admits multiple different ways of thinking leading to its unique correct answer」
> 「GSM8K (+17.9%), SVAMP (+11.0%), AQuA (+12.2%)」

## 🟠 我的想法 · Takeaway

- 想法：「取樣多條路徑→多數決挑最一致」= 把單次生成的隨機性，用集成一致性壓成可信答案，正合我驗證紀律的精神
- → 一致性可當 faithfulness 閘門的廉價代理：多路徑若收斂同一答案 → 提高信心（接 Maker/Checker 自評）
- → 連結 AlgoCoach：教練給題解可取樣多條，用一致性當自評分，不盲信單一生成（呼應 X-driven 驗證）
