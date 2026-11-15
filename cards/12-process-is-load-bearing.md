---
id: "12"
slug: process-is-load-bearing
tag: 軟體工程
title: 流程不是官僚，是保命索：專業軟體工程 vs 作業
title_en: "Process Isn't Bureaucracy, It's a Lifeline: Professional SE vs. a Coding Assignment"
title_short: 流程不是官僚，是保命索：專業軟體工程 vs 作業
summary: 作業是一個人、交一次、交完就結束；專業軟體工程是多人、持續、有壓力的現實——版本控制與流程存在，就是為了讓這個現實活得下去。
summary_en: An assignment is one person, submitted once, done; professional software engineering is a multi-person, continuous, high-pressure reality — version control and process exist to make that reality survivable.
links: []
---
## 是什麼 · What it is

CSIC30216 Week 3 點出一個很多人沒想清楚的分界：**「寫程式作業」和「專業軟體工程」根本不是同一件事。**

      <p>
        <strong>作業</strong>：通常一個人、寫完交一次、評分完就結束，壞了也沒人要接手。<br>
        <strong>專業 SE</strong>：多人同時改<strong>同一份</strong> codebase、持續好幾個月、有 deadline 壓力、而且要長期維護——會衝突、會出錯、會吵架、會需要回到三週前某個版本。
      </p>

版本控制（git／branch／PR）**不是為了好看才存在，是為了讓上面那個現實「survivable」**：誰改了什麼、何時、為什麼，能追；壞了能回滾；多人同時動不會互相覆蓋。流程是把「多人、持續、會出錯」這件事變成撐得住的東西。

::: en
CSIC30216 Week 3 names a boundary many people never think through: **a "coding assignment" and "professional software engineering" are not the same activity.** **An assignment** is usually one person, submitted once, over when graded — if it breaks, no one inherits it. **Professional SE** is many people editing **the same** codebase, continuously, for months, under deadline pressure, and maintained long-term — it will conflict, break, spark disagreement, and need to return to some version from three weeks ago. Version control (git / branches / PRs) **exists not for looks but to make that reality survivable**: who changed what, when, and why is traceable; breakage can be rolled back; concurrent edits don't silently overwrite each other. Process turns "many people, continuous, error-prone" into something that holds.
:::

## 為什麼重要 · Why it matters

最該翻轉的觀念：**流程不是拖慢你的官僚，是你未來在壓力下的保命索。**一個團隊能不能在學期後段、deadline 逼近時「解決分歧 + 維持 codebase 不崩」，取決於**現在**有沒有把流程立起來——這正是 [[10-norms-before-building|開工前先立規矩]]的「為什麼」：規矩不是儀式，是你還沒遇到壓力時替未來的自己買的保險。

AI 進來只會把這件事放更大（接 [[11-ai-is-an-amplifier|AI 是放大器]]）：AI 讓產出更快更多，但多人協作下「誰改的、為什麼這樣決定、怎麼回滾、AI 的輸出最後誰拍板」的壓力只增不減。產出越快，**可追溯與可回滾越重要**，而不是越可以省。再加一條：工具的 **human-AI 決策邊界**——哪些 AI 說了算、哪些人說了算——直接決定「成功」是什麼、評估要量什麼，所以得先講明（見 [[10-norms-before-building|卡 10]]）。

::: src
出處 Source：CSIC30216《AI-in-the-Loop》Week 3 "Working with AI in a Team" 學習目標（專業 SE ≠ coding 作業、版本控制為使該現實 survivable 而存在、團隊流程決定能否在壓力下解決分歧與維護 codebase、工具的 human-AI 決策邊界塑造「成功」定義與評估；Dennis Wang 王邦任、顏羽君 Grace Yen）。作者改寫重述，未複製課程投影片。「流程是保命索非官僚、AI 放大可追溯的必要性」為作者綜述觀點（Author's view），與本站 [[10-norms-before-building|10]]／[[11-ai-is-an-amplifier|11]] 一致。
:::

## 一句話帶走 · Takeaway

coding 作業交完就沒事；專業軟體工程是多人、持續、有壓力的現實，版本控制與流程就是讓它活得下去的保命索——不是官僚。AI 讓產出更快，只會讓「可追溯、可回滾」更重要，不是更可以省。

::: en
A coding assignment ends at submission; professional SE is a multi-person, continuous, high-pressure reality, and version control and process are the lifeline that keeps it alive — not bureaucracy. AI making output faster only makes traceability and rollback more important, not more skippable.
:::
