---
date: 2026-11-13
tag: 軟體工程
title: The Instruction Hierarchy — 教 LLM 分指令優先級、擋越權
title_en: The Instruction Hierarchy — teaching LLMs to prioritize privileged instructions
source: Wallace et al. 2024 · OpenAI · arXiv:2404.13208
img: 2026-11-13_instruction-hierarchy.png
zotero: UZ2E5I2I
---

## 核心問題 · Question

LLM 把 system prompt 和不受信任的使用者輸入當同優先級 → 怎麼讓它分優先級、擋越權？

## 🔴 背景與痛點 · Red

- Wallace et al. (2024, OpenAI)，arXiv:2404.13208
- 核心漏洞：指令沒有優先級——system／使用者／第三方 被同等看待
- 授權：arXiv（非 CC）；此筆記為作者原創導讀，未重製原文

## 🟡 概念 · Yellow

- instruction hierarchy 指令階層
- privileged instructions 特權指令
- prompt injection / jailbreak
- selectively ignore lower-privileged
- → A3-EMI 宣告式邊界 / 拒絕閘
- → trustworthy / 可稽核

## 🔵 原文依據 · Blue (quotes)

> 「LLMs often consider system prompts to be the same priority as text from untrusted users and third parties」
> 「an instruction hierarchy that explicitly defines how models should behave when instructions of different priorities conflict」
> 「teaches LLMs to selectively ignore lower-privileged instructions」
> 「applied to GPT-3.5 … drastically increases robustness — even for attack types not seen during training … minimal degradations」

## 🟠 我的想法 · Takeaway

- 想法：這跟我 A3-EMI 的「宣告式邊界／拒絕閘」同精神——系統級規則要壓得過使用者的越權請求
- → 對照我 coach 的 refusal gate 設計：優先級衝突時該聽誰，是可明定的
- → prompt injection 防禦 = trustworthy 一環；可當 lesson／論文相關工作素材
