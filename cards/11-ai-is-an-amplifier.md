---
id: "11"
slug: ai-is-an-amplifier
tag: 軟體工程
title: AI 是放大器，不是均值回歸
title_en: AI Is an Amplifier, Not a Great Equalizer
title_short: AI 是放大器，不是均值回歸
summary: 90% 的開發者在用 AI、八成覺得更快，但只約四分之一真的信任它的輸出；AI 不會把爛團隊拉到平均，它放大你本來就有的系統。
summary_en: 90% of developers use AI and most feel faster — but only about a quarter actually trust its output; AI doesn't level teams up, it amplifies the system you already have.
links: []
---
## 是什麼 · What it is

Google 的 **DORA 2025《State of AI-assisted Software Development》**調查了近 5,000 位技術專業人士，幾個數字：

      <p>
        AI 採用率從 2024 的 76% 升到 <strong>90%</strong>，65% 自稱「重度依賴」；<strong>80%+ 覺得生產力提升</strong>、59% 覺得程式品質變好；最大用途是「寫新 code」（約 71%）。<br>
        但信任是另一回事：<strong>真正信任 AI 產出資訊的只有約 24%</strong>（另有口徑指約 30% 對 AI 生成的 code 幾乎不信任）。
      </p>

報告的核心結論是一句話：**AI 是「放大器（amplifier）」**——架構鬆耦合、回饋迴圈快的團隊獲益最大；系統緊耦合、流程慢的團隊幾乎沒好處。

::: en
Google's **DORA 2025 "State of AI-assisted Software Development"** surveyed nearly 5,000 technology professionals. A few numbers: adoption rose from 76% in 2024 to **90%**, with 65% self-describing as "heavily reliant"; **80%+ report higher productivity** and 59% report better code quality; the top use is writing new code (~71%). But trust is another matter: **only about 24% actually trust the information these tools produce** (a separate reading puts ~30% at little-to-no trust in AI-generated code). The report's core finding in one line: **AI is an "amplifier"** — teams with loosely coupled architectures and fast feedback loops gain the most, while tightly coupled, slow-process teams see little benefit.
:::

## 為什麼重要 · Why it matters

兩個落差最該記住：

      <p>
        <strong>① 「用」和「信」是兩回事。</strong>九成在用、八成覺得更快，但真正信任輸出的只有約四分之一。這不是矛盾——正是本站的主旋律：<a href="07-prompt-techniques-pitfalls.html">看起來對</a>、<a href="08-rlhf-preference-reward.html">討人喜歡</a>都不等於值得信，所以 <a href="01-rag-faithfulness.html">要驗不要信</a>。<br>
        <strong>② AI 不把團隊拉到平均，而是放大既有結構。</strong>有快回饋、有<a href="10-norms-before-building.html">治理紀律</a>的團隊被正向放大；混亂的團隊被放大混亂。所以「導入 AI」不是買一份生產力，是<strong>把你現有工程紀律的槓桿倍率調大</strong>——紀律好，倍率是助力；紀律差，倍率是災難。
      </p>

報告也點出：AI 讓交付吞吐上升，但「**發布前確認軟體真的照預期運作**」仍是未解難題——這正是 [[06-ai-loop-discipline|規格與驗證]]那一層，報告用全產業的數據，再說了一次。

::: src
出處 Source：Google Cloud / DORA, "2025 State of AI-assisted Software Development Report"（2025-09-23，近 5,000 位技術專業人士；AI 為 amplifier、採用 76%→90%、80%+ 生產力提升、信任約 24%／低信任約 30%、交付吞吐上升但「發布前確認正確」仍為挑戰）。🔴 數字引自報告與官方／二手報導，正式引用前以 research.google 報告原文為準；兩個信任數字口徑不同。「用≠信、AI 放大既有結構」為作者綜述觀點（Author's view），與本站 [[01-rag-faithfulness|01]]／[[06-ai-loop-discipline|06]]／[[10-norms-before-building|10]] 一致。
:::

## 一句話帶走 · Takeaway

九成在用 AI、八成覺得更快，但只約四分之一真信任它的輸出。AI 是放大器不是均值回歸——它放大你本來的系統，所以紀律與驗證決定你被放大的是助力還是災難。

::: en
Nine in ten use AI and most feel faster, but only about a quarter trust its output. AI amplifies rather than equalizes — it magnifies the system you already have, so discipline and verification decide whether you amplify help or harm.
:::
