---
id: "03"
slug: intent-output-gap
tag: 提示工程
title: 提示工程的核心：意圖 vs 輸出的落差
title_en: "The Heart of Prompt Engineering: the Intent–Output Gap"
title_short: 意圖 vs 輸出的落差
summary: 模型回的是你「寫出來的」，不是你「心裡想的」。兩者之間的縫，就是提示工程要收的。
summary_en: The model answers what you *wrote*, not what you *meant*. That gap is what prompt engineering closes.
links: []
---
## 是什麼 · What it is

你寫 prompt 時，心裡其實已經有個「想要的答案」。但模型看不到你的意圖，它只看到你**實際寫出的字**。凡是你沒講清楚的地方，它都會自己替你做決定——讀者是誰？要多深入？要不要點名「遞迴」這個技術？要不要處理空輸入的邊界情況？這些**你沒明說、模型替你決定**的選擇，加起來就是「意圖」與「輸出」之間的落差。

::: en
When you write a prompt, you already have a desired answer in mind. But the model can't see your intent — it only sees the **words you actually wrote**. Wherever you were vague, it decides for you: who's the reader? how deep? name "recursion" or not? handle the empty-input edge case or not? Each of these **implicit decisions you delegated** adds up to the gap between intent and output.
:::

## 為什麼重要 · Why it matters

這個落差**不是模型「錯」**——它只是對你寫的字做了最可能的解讀。真正的工程功夫在於：先看出模型替你做了哪些隱性決定，然後**一次只改一件事**（補上讀者、補上格式、補上重點），把落差一步步收窄。它是**迭代**，不是一次到位——收掉一個隱性決定，常常會冒出另一個你原本沒注意到的。

::: en
The gap is **not the model being "wrong"** — it just made the most probable reading of your words. The real engineering move: first spot which implicit decisions the model made for you, then **change only one thing at a time** (add the reader, add a format, add a focus) and narrow the gap step by step. It's **iterative**, not one-shot — closing one implicit decision often reveals another you hadn't noticed.
:::

這跟我研究的 [[01-rag-faithfulness|RAG 忠實度]] 其實同源：一個是「意圖 vs 輸出」的 gap，一個是「主張 vs 來源支持」的 gap，本質都是**生成內容與應有依據之間的落差**。

::: en
This shares a root with my [[01-rag-faithfulness|RAG faithfulness]] work: one is the "intent vs output" gap, the other the "claim vs source-support" gap — both are, at heart, the gap between what was generated and what it should rest on.
:::

::: src
出處 Source：作者觀點（延伸自 CSIC30216《AI-in-the-Loop》課堂 Lab 的 intent↔output 概念）。Author's view, extending the intent–output concept from the CSIC30216 "AI-in-the-Loop" lab.
:::

## 一句話帶走 · Takeaway

模型給的是你「寫的」，不是你「想的」。提示工程＝看出它替你做了哪些隱性決定，然後一次改一個、把落差收窄。

::: en
The model gives you what you wrote, not what you thought. Prompt engineering = spotting the implicit decisions it made for you, then changing one at a time to close the gap.
:::
