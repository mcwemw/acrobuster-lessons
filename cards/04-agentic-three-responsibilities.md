---
id: "04"
slug: agentic-three-responsibilities
tag: 代理工程
title: 代理時代工程師的三職責：指定意圖 → 評估軌跡 → 收回控制
title_en: "The Engineer's Three Jobs in the Agentic Era: Specify Intent → Evaluate Trajectory → Take Back Control"
title_short: 代理時代工程師的三職責
summary: 當 AI agent 能自己跨多步執行，工程師的工作從「自己寫 code」變成三件事。
summary_en: Once an AI agent can execute across multiple steps on its own, the engineer's job shifts from writing code to three things.
links: []
---
## 是什麼 · What it is

以前寫程式是你一行一行敲。當 AI agent 能**自己規劃、跨多步執行**之後，工程師的角色換成三個職責：

      <p>
        <strong>① 指定意圖（specify intent）</strong>：把模糊的想法，寫成<strong>精確到 agent 能可靠執行</strong>的規格——讓它做你「真正想要的」，不是只做你「字面寫的」。<br>
        <strong>② 評估軌跡（evaluate trajectory）</strong>：不只看單一輸出對不對，而是看 agent <strong>整條路徑</strong>有沒有朝對的目標走。<br>
        <strong>③ 知道何時收回控制（take back control）</strong>：察覺 agent 走偏時，把手動控制權拿回來。
      </p>

::: en
Programming used to mean typing it line by line. Once an AI agent can **plan and execute across multiple steps on its own**, the engineer takes on three responsibilities: **① Specify intent** — turn a vague idea into a spec precise enough for the agent to execute reliably, so it does what you *mean*, not just what you literally wrote; **② Evaluate trajectory** — judge not just whether a single output is right, but whether the agent's *whole path* is heading toward the right goal; **③ Take back control** — notice when the agent drifts and reclaim manual control.
:::

## 為什麼重要 · Why it matters

關鍵在第②點：**單一輸出可以「看起來對」，整條軌跡卻歪掉**。例如一個 agent 正確修好了眼前的 bug，卻在過程中引入一個安全漏洞——輸出合格，軌跡有害。所以「評估軌跡」比「評估輸出」更要命，而這正是**可信度／忠實度**的核心問題。

::: en
The crux is ②: **a single output can "look right" while the whole trajectory goes wrong**. An agent may correctly fix the bug in front of it yet introduce a security hole along the way — output fine, trajectory harmful. That's why "evaluate the trajectory" matters more than "evaluate the output," and it's exactly the core question of **trustworthiness / faithfulness**.
:::

而「把模糊意圖變成精確規格」不是軟實力，是**有可測產出影響的技術技能**，目前被嚴重低估。這條線接得起整站：[[03-intent-output-gap|意圖↔輸出落差]]就是職責①的微觀練習；而職責②（驗證生成內容是否真的可信）正是我 [[01-rag-faithfulness|RAG 忠實度]] 研究在做的事。

::: en
And turning vague intent into a precise spec is not a soft skill — it's a technical skill with measurable impact on output quality, and currently undervalued. This ties the whole site together: the [[03-intent-output-gap|intent–output gap]] is the micro-level practice of job ①, and job ② (verifying whether generated content is actually trustworthy) is exactly what my [[01-rag-faithfulness|RAG faithfulness]] work does.
:::

::: src
出處 Source：CSIC30216《AI-in-the-Loop in Software Project Cycle》Week 1 導論（Dennis Wang 王邦任、顏羽君），作者改寫重述。CSIC30216 "AI-in-the-Loop" Week 1 lecture (Dennis Wang, Yu-Chun Yen), paraphrased by the author.
:::

## 一句話帶走 · Takeaway

代理時代工程師的工作不是「會用 AI 工具」，而是：**指定意圖、評估軌跡、知道何時收回控制**。

::: en
In the agentic era, the engineer's job is not "using AI tools" — it's to specify intent, evaluate trajectories, and know when to take back control.
:::
