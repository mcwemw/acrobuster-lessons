---
date: 2026-11-19
tag: 提示工程
title: Prompt Programming — 把 prompt 當自然語言寫的「程式」
title_en: Prompt Programming for Large Language Models — Beyond the Few-Shot Paradigm
source: Reynolds & McDonell 2021 · arXiv:2102.07350 · CC-BY-4.0
img: 2026-11-19_prompt-programming.png
zotero: RMDHNTT4
---

## 核心問題 · Question

few-shot 範例到底在做什麼？是讓模型「學新任務」，還是只是「定位到它本來就會的任務」？

## 🔴 背景與痛點 · Red

- Reynolds & McDonell (2021)，arXiv:2102.07350，以 GPT-3 為案例
- 痛點：把 LLM 硬套成監督式任務，可能沒充分挖出模型本有的能力
- 授權：CC BY 4.0（可商用重製，導讀／教材可用，需署名）

## 🟡 概念 · Yellow

- prompt programming：把 prompt 當「用自然語言寫的程式」
- 0-shot 有時勝過 few-shot（重估範例的角色）
- few-shot = 定位已學會的任務，非 meta-learning
- narratives / cultural anchors 編碼細膩意圖
- 先把問題拆解成元件，再下判斷
- metaprompt：讓模型自己生成 prompt

## 🔵 原文依據 · Blue (quotes)

> 「0-shot prompts can significantly outperform few-shot prompts」
> 「the function of few-shot examples … better described as locating an already learned task rather than meta-learning」
> 「considering prompts through the lens of natural language」
> 「encouraging deconstruction of a problem into components before producing a verdict」
> 「a metaprompt that seeds the model to generate its own natural language prompts for a range of tasks」

## 🟠 我的想法 · Takeaway

- 想法：「先把問題拆解成元件、再下判斷」正呼應我 answer-contract 的「推導先於結論」
- → metaprompt（模型自己寫 prompt）= coach 自生引導問句的學術母本
- → 「few-shot 只是定位任務」提醒我：檢索到的範例是「喚起已會」而非「教新東西」，檢索範例的角色該重新定位
