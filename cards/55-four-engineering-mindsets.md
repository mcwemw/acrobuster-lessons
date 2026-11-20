---
id: "55"
slug: four-engineering-mindsets
tag: AI 工程
title: 四大工程思維：一層疊一層的能力槓桿階梯
title_en: Four Engineering Mindsets — A Layered Leverage Ladder for AI Capability
title_short: 四大工程思維（Prompt/Context/Harness/Loop）
summary: 讓 AI 從「只能接話」變成「能自主完成任務並越做越好」的四層槓桿：Prompt → Context → Harness → Loop，不是並列選項，是一層墊一層。
summary_en: Four layers of leverage that take AI from "just completing text" to "finishing tasks autonomously and improving over time" — Prompt → Context → Harness → Loop — not parallel options but a stack where each rests on the one below.
links: []
---
## 是什麼 · What it is

把 AI 從玩具變成能幹活的系統，有四層工程思維。它們**不是四選一的並列選項，而是一條由下往上、一層墊一層的槓桿階梯**：

      <p>
        <strong>① Prompt Engineering（提示工程）</strong>：不動底層模型，只改輸入提示詞，就低成本地改變輸出。它其實是 Context 的特例。<br>
        <strong>② Context Engineering（脈絡工程）</strong>：模型像被關在密室裡的人，不知道外部即時資訊；靠 System Prompt、檢索把對的上下文餵進去，它才接得對。<br>
        <strong>③ Harness Engineering（框架工程）</strong>：給 AI 手腳——能執行程式、操作電腦——從「只能動口」升級成能自主完成任務的 Agent。Harness 不只是手腳，更是<strong>治理層</strong>：權限、沙箱、工具路由、上下文管理都在這層。<br>
        <strong>④ Loop Engineering（迴圈工程）</strong>：人在旁邊即時回饋與引導，讓 AI 邊做邊修，再把經驗沉澱成 SOP（Skill）存檔，避免重蹈覆轍。
      </p>

第四層內含**兩個迴圈**：<strong>內迴圈</strong>＝任務內的自我修正（如 Maker/Checker 盲評驗證，見 [[24-evaluate-the-evaluator|評估那個評估者]]）；<strong>外迴圈</strong>＝跨 session 累積 SOP（lessons.md／memory／交付驗證紀律）。<span class="tag-pass">Prompt</span> → <span class="tag-pass">Context</span> → <span class="tag-pass">Harness</span> → <span class="tag-pass">Loop</span>，越往上，AI 越自主、越能自我改進。

::: en
Turning AI from a toy into a system that does real work takes four engineering mindsets. They are **not four parallel choices but a leverage ladder from the bottom up, each layer resting on the one below**. **① Prompt Engineering:** leave the base model untouched, change only the input prompt to change the output cheaply — really a special case of Context. **② Context Engineering:** the model is like a person sealed in a room with no live outside information; feed the right context via system prompt and retrieval so it can complete correctly. **③ Harness Engineering:** give the AI hands and feet — run code, operate a computer — upgrading it from "mouth only" to an agent that finishes tasks on its own. The harness is not just limbs but a **governance layer**: permissions, sandbox, tool routing, context management. **④ Loop Engineering:** a human gives real-time feedback and guidance so the AI fixes as it goes, then distills the experience into a stored SOP (a Skill) to avoid repeating mistakes.
:::

::: en
The fourth layer contains **two loops**: an **inner loop** = in-task self-correction (e.g. blind Maker/Checker verification, see [[24-evaluate-the-evaluator|evaluate the evaluator]]); and an **outer loop** = cross-session SOP accumulation (lessons.md / memory / delivery-verification discipline). Prompt → Context → Harness → Loop: the higher you climb, the more autonomous and self-improving the system becomes.
:::

## 為什麼重要 · Why it matters

多數人卡在第一層——不斷調 prompt，卻怪模型笨。真正的槓桿在往上爬：同一個模型、同一條 prompt，只差有沒有把對的**脈絡**塞進去，忠實度就能從 1 分跳到 5 分（這正是 [[01-rag-faithfulness|RAG 忠實度]]要解的問題）。再往上，**Harness** 決定 AI 到底能不能動手、動手時有沒有護欄；**Loop** 決定它會不會把今天踩的坑變成明天的 SOP，而不是每次從零重犯。

這也說明為什麼「能跑的 demo」不等於「可信的系統」：Harness 給了能力，但可信度是 Loop 這層用**獨立驗證**（不可自評，見 [[13-self-correction-not-self-approval|自我修正不是自我核可]]）一次次掙來的。四層對齊，AI 寫得越多，**規格、脈絡、治理、驗證這幾層就越是護城河**，而不是被省掉的環節（呼應 [[06-ai-loop-discipline|AI 入迴圈，紀律前移]]）。

::: en
Most people get stuck on layer one — endlessly tweaking prompts while blaming the model. The real leverage is climbing up: with the same model and the same prompt, merely supplying the right **context** can lift faithfulness from 1 to 5 (the very problem [[01-rag-faithfulness|RAG faithfulness]] addresses). Higher still, the **harness** decides whether the AI can act at all and whether there are guardrails when it does; the **loop** decides whether it turns today's mistake into tomorrow's SOP instead of repeating it from scratch every time.
:::

::: en
This is also why a "demo that runs" is not a "system you can trust": the harness grants capability, but trustworthiness is earned by the loop layer through **independent verification** (no self-grading, see [[13-self-correction-not-self-approval|self-correction isn't self-approval]]), one pass at a time. With the four layers aligned, the more AI writes, the more **spec, context, governance, and verification become the moat** rather than the step that gets skipped (echoing [[06-ai-loop-discipline|AI in the loop moves discipline forward]]).
:::

::: src
出處 Source：「四大關鍵工程思維」為 Emma Wu 2026-07-11 提出並分享的框架（Prompt／Context／Harness／Loop Engineering，分層槓桿階梯；Loop 含內／外雙迴圈）。活教材與忠實度數據（同模型同 prompt、只差脈絡 → faithful 1.0→5.0）出自作者 AlgoCoach Step7 交付之自評紀錄。本頁為作者框架之改寫重述（Author's framework），非引用第三方論文。
:::

## 一句話帶走 · Takeaway

別只會調 prompt。往上爬：給對脈絡（Context）、給手腳與護欄（Harness）、用獨立驗證＋沉澱 SOP 讓它越做越好（Loop）。四層是階梯不是選單——越往上，AI 越自主、越可信。

::: en
Don't just tune prompts. Climb: give the right context (Context), give hands and guardrails (Harness), use independent verification and distilled SOPs so it improves (Loop). The four are a ladder, not a menu — the higher you go, the more autonomous and trustworthy the AI.
:::
