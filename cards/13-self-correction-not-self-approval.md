---
id: "13"
slug: self-correction-not-self-approval
tag: 模型原理
title: 自我修正不是自我感覺良好：讓 AI 的 loop 真的變好
title_en: "Self-Correction Isn't Self-Approval: Making an AI Loop Actually Improve"
title_short: 自我修正不是自我感覺良好：讓 AI 的 loop 真的變好
summary: 天真地叫 AI「檢查一下你的答案」，常常只換來「看起來沒問題！」卻什麼都沒改；要真的變好，批判得具體、得「難過關」、得封頂加人審。
summary_en: Naively telling an AI to "check your answer" often just yields "looks fine!" with nothing changed; to actually improve, the critique must be specific, hard to pass, capped, and backed by human review.
links: []
---
## 是什麼 · What it is

CSIC30216 Week 5 的進階技巧，核心問題是：怎麼讓 AI 的「自我修正」真的產生改善，而不是 approval without change（批准了、卻沒改）。要做對四件事：

      <p>
        <strong>① 具體、二元的批判標準</strong>：能判「過／不過」，不是「好不好」。<br>
        <strong>② 把批判框成「難過關」</strong>：要模型「找出<em>最嚴重</em>的問題，假設一定有一個」，而不是問「這樣可以嗎」——讓否決比批准容易。<br>
        <strong>③ 窄的修正指令</strong>：只修剛剛指認的那一點，別全部重寫。<br>
        <strong>④ loop 封頂兩輪</strong>，然後接受，或<strong>送人審</strong>。
      </p>

再加兩招：**任務拆解**（least-to-most、successive prompting，每步接上一步＋人工檢查點）——拆了才知道「是哪一步壞的」，debug 才可行；**self-consistency**（同一題多抽幾次取多數）——但這只在錯誤是**隨機**時有用。

::: en
CSIC30216's Week 5 advanced techniques center on one question: how to make an AI's "self-correction" actually improve things, rather than approval without change. Do four things right. **① Specific, binary critique criteria** — pass/fail, not "good or not." **② Frame the critique to be hard to pass** — ask the model to "identify the *most significant* problem, assuming one exists," not "is this okay," so rejecting is easier than approving. **③ A narrow revision instruction** — fix only the identified issue, don't rewrite everything. **④ Cap the loop at two cycles**, then accept — or **send to human review**. Plus two moves: **task decomposition** (least-to-most, successive prompting with human checkpoints) so you can tell *which step* failed, making debugging feasible; and **self-consistency** (sample a prompt many times, take the majority) — which helps only when errors are **random**.
:::

## 為什麼重要 · Why it matters

最該帶走的一句：**一個不會失敗的自我檢查，是演戲。**模型批判自己時會漂向「拍馬屁式批准」——說「看起來很好」卻沒改任何東西。這正是本站紀律的另一面：[[06-ai-loop-discipline|自評會漂向通過]]，所以自我修正要嘛把批判做成**對抗性**（更難過關），要嘛送**獨立**的人或流程審。self-correction 的失效模式——拍馬屁批判、修 A 壞 B、模型根本解不了的問題、它看不見自己的系統性錯誤——全指向同一件事：**模型驗自己有上限。**

兩個延伸陷阱：**① 多數決不修系統性錯誤。**self-consistency 只在錯誤隨機時有效；若錯是系統性的，多抽幾次只會「對一個錯答案有信心地一致」（接 [[07-prompt-techniques-pitfalls|提示技巧的陷阱]]）。**② reliability ≠ performance。**可靠度是「跨不同輸入都穩」，效能是「在這個輸入上最好」；為了在幾個例子上衝到最好去調，可能讓你在更廣的輸入上更不穩——所以要廣測，還要把自動生成的 prompt 拿到**沒選過它的 held-out 例子**上驗。

::: src
出處 Source：CSIC30216《AI-in-the-Loop》Week 5 自學模組 "Advanced Techniques"（自我修正的具體二元標準／難過關框架／窄修正／封頂＋人審、失效模式；任務拆解 least-to-most／successive；APE 要在 held-out 驗；self-consistency 只修隨機錯；reliability vs performance；指定閱讀含 Lilian Weng 的 Self-Consistency／APE 段與一份 Claude model card 訓練段；Dennis Wang 王邦任、顏羽君 Grace Yen）。作者改寫重述，未複製課程內容。「不會失敗的自我檢查是演戲、模型驗自己有上限」為作者綜述觀點（Author's view），與本站 [[06-ai-loop-discipline|06]]／[[07-prompt-techniques-pitfalls|07]] 一致。
:::

## 一句話帶走 · Takeaway

要 AI 自我修正真的變好：批判標準具體、框成「難過關」、窄修正、封頂加人審。一個不會失敗的自我檢查只是演戲；多數決不修系統性錯誤；別為少數例子犧牲整體可靠度。

::: en
To make AI self-correction actually improve: specific criteria, framed hard-to-pass, narrow fixes, capped with human review. A self-check that can't fail is theater; majority voting won't fix systematic errors; don't trade broad reliability for performance on a few examples.
:::
