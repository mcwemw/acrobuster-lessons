---
id: "15"
slug: prompt-structure-five-components
tag: 提示工程
title: 提示有結構，不只有技術：五個組件讓規格變成評測表
title_en: "Prompts Have Structure, Not Just Technique: Five Components That Turn a Spec into an Eval Checklist"
title_short: 提示有結構，不只有技術：五個組件讓規格變成評測表
summary: 大多數 prompt 失敗不是因為技術選錯——是結構出了問題。一個 prompt 有五個組件：角色、脈絡、任務、格式、限制條件；在下 prompt 之前先寫規格，那份規格就直接變成驗收清單。
summary_en: "Most prompt failures aren't about which technique you chose — they're structural. A prompt has five components: role, context, task, format, constraints; writing the spec before the prompt turns that spec into your evaluation checklist."
links: []
---
## 是什麼 · What it is

Week 5 講義有一句話直接點破：**「差別幾乎從來不是技術——是結構。prompt 有它的組件。」**（Slide 33）換句話說，同樣是 few-shot 或 CoT，寫得差的人輸在組件缺失或寫錯，不是輸在選錯技術——這正是[[03-intent-output-gap|卡 03 意圖落差]]的結構版解釋。

**五個組件（Slide 34）**：

      <ul>
        <li><strong>Role（角色）</strong>：給模型有用的脈絡身份。常見錯誤是用奉承取代真正的脈絡（「你是有史以來最厲害的專家！」）——有用的角色說的是「你有哪些背景、能存取哪些資訊」，不是在稱讚它（Slide 35）。</li>
        <li><strong>Context（背景）</strong>：給夠多的相關情境讓模型能正確推論。</li>
        <li><strong>Task（任務）</strong>：最重要也最容易出錯的組件。修法：<strong>一個 prompt 一個任務</strong>；任務描述要有<em>具體動作</em>加<em>可衡量結果</em>（Slide 40–41）。</li>
        <li><strong>Format（格式）</strong>：要具體指定，否則輸出會讓你驚到——「JSON 三個 key」比「幫我整理一下」好（Slide 42）。</li>
        <li><strong>Constraints（限制條件）</strong>：模型預設傾向冗長；若不限制，它會幫你把沒在問的一起答（Slide 43）。</li>
      </ul>

::: en
Week 5 makes this claim directly: **"The difference is almost never the technique — it is the structure; a prompt has components."** (Slide 33) The same few-shot or CoT prompt fails not because you picked the wrong technique, but because a component is missing or malformed — the structural explanation of the [[03-intent-output-gap|intent–output gap in card 03]].
:::

::: en
**The five components (Slide 34):** **Role** — give useful context-identity, not flattery ("you are the best expert who ever lived!"); useful role describes background and access, not compliments (Slide 35). **Context** — enough relevant situation for the model to reason correctly. **Task** — the most important and easiest to get wrong; fix: one task per prompt, with a *specific action* plus a *measurable outcome* (Slides 40–41). **Format** — be specific or be surprised; "JSON with three keys" beats "just summarize this" (Slide 42). **Constraints** — models default verbose; if you don't bound them, they'll answer more than you asked (Slide 43).
:::

## 為什麼重要 · Why it matters

結構帶出了一個更大的洞見：**先寫規格，規格自動變成評測表。**Slide 44 說：「Does the output satisfy each criterion?」——寫規格時定下的每個條件，直接是一道能拿來驗輸出的 checklist 項目。這把 [[06-ai-loop-discipline|卡 06「先定規格再對它驗」]]和 [[14-prompt-engineering-is-empirical|卡 14「先有評測才調 prompt」]]接在一起：規格不只是提示的輸入，規格 IS 評測的來源。先問「這輸出要滿足哪五個條件」，再動手下 prompt，最後對著那五條驗——這才是閉環。

另一個不能跳過的提醒：技術選型不是「哪個最強」，是「哪個符合這個任務和這個風險等級」（Slide 27 成本表，作者觀點 Author's view）。Zero-shot 1×；Few-shot 1.5–3×；CoT 1.5–2×；Self-correction 2–4×、2–3 次 API 呼叫。選技術要算成本，選錯不只浪費，還可能掩蓋真正的問題是結構而不是推理能力。

::: src
出處 Source：Dennis Wang 王邦任、顏羽君 Grace Yen，《Prompt Engineering I — Writing Prompts Well》，CSIC30216 AI-in-the-Loop in Software Project Cycle，Week 5 講義，NYCU，2026-10-05。Slide 33（結構不是技術是差異關鍵）、Slide 34（五組件 Role/Context/Task/Format/Constraints）、Slide 35（角色組件常見誤用=奉承≠脈絡）、Slide 40–41（Task 組件=一任務+具體動作+可衡量結果）、Slide 42（Format 要具體否則輸出出乎意料）、Slide 43（Constraints=模型預設冗長）、Slide 44（規格先行→每個條件即驗收項目）、Slide 27（技術成本表：非哪個最好而是哪個適合任務與風險）。作者改寫重述，未複製原文。「結構優先於技術」「規格即評測來源」「技術選型考成本與風險」為作者綜述觀點（Author's view），與本站 [[03-intent-output-gap|03]]／[[06-ai-loop-discipline|06]]／[[07-prompt-techniques-pitfalls|07]]／[[10-norms-before-building|10]]／[[14-prompt-engineering-is-empirical|14]] 一致。
:::

## 一句話帶走 · Takeaway

在問「我該用哪種技術」之前，先問「我的 prompt 五個組件齊了嗎」；在下 prompt 之前先寫規格——那份規格就是你的驗收清單。

::: en
Before asking "which technique should I use," ask "are all five components of my prompt in place?" And before you write the prompt, write the spec — that spec is your evaluation checklist.
:::
