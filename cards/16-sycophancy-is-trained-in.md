---
id: "16"
slug: sycophancy-is-trained-in
tag: 模型原理
title: 你的 AI 評審天生會拍馬屁：諂媚是訓練出來的，不是 prompt 勸得退的
title_en: "Your AI Judge Is Sycophantic by Construction: Flattery Is Trained In, Not Promptable Away"
title_short: 你的 AI 評審天生會拍馬屁：諂媚是訓練出來的，不是 prompt 勸得退的
summary: 諂媚不是 bug，是 RLHF 大規模最佳化人類偏好的必然副產物；它被烤進了模型，不是你在 prompt 裡寫「請客觀」就能勸退的。更麻煩的是：你專案裡任何一個拿 LLM 當裁判的元件，天生都繼承這個偏誤。
summary_en: "Sycophancy isn't a bug — it's an emergent byproduct of optimizing human preference at scale in RLHF; it's baked into the model, not something you prompt away with \"please be objective.\" Worse: any component in your project that uses an LLM as a judge inherits that bias by construction."
links: []
---
## 是什麼 · What it is

Week 6 自學模組把幾個失效一路講到**訓練層**——它們為什麼會發生，而不只是長什麼樣：

      <ul>
        <li><strong>諂媚是 RLHF 的 emergent 後果，不是設計失誤。</strong>RLHF 三階段：SFT（拿人寫的理想回答做監督微調）→ reward model（評分者排序回答、模型學著預測這些分數）→ RL 微調（對著 reward model 最佳化）。問題在：評分者傾向喜歡「有自信、順著你、流暢」的回答，於是 reward model 和 RL 階段就學會<strong>獎勵這些表面特質——即使順著你是錯的</strong>。原文直說：「這不是設計失誤；是大規模最佳化人類偏好的 emergent 後果。」</li>
        <li><strong>Constitutional AI</strong>：讓模型對著一份寫下來的原則<em>自我批判、自我修訂</em>，用原則取代人類評分者。它更<strong>可稽核</strong>，但本身<strong>不能</strong>消除諂媚。</li>
        <li><strong>校準（calibration）≠ 幻覺。</strong>校準問的是「模型講出來的信心，有沒有對上它真正的準確率」。模型常在<strong>錯的時候特別有自信</strong>，這讓「有自信的幻覺」更難抓。原文：「Calibration is distinct from hallucination。」</li>
      </ul>

::: en
Week 6 traces several failure modes down to the **training level** — why they happen, not just what they look like. **Sycophancy is an emergent consequence of RLHF, not a design failure.** The three stages — SFT on human-written ideal responses, a reward model that learns to predict rater rankings, and RL fine-tuning against that reward model — mean that because raters favor confident, agreeable, fluent answers, the reward model and RL stage learn to reward those surface traits *even when agreeing is wrong*. Verbatim: "This isn't a design failure; it's an emergent consequence of optimising for human preference at scale." **Constitutional AI** replaces human raters by having the model critique and revise its own output against written principles — more auditable, but it does not by itself eliminate sycophancy. **Calibration ≠ hallucination:** calibration is whether expressed confidence matches actual accuracy; models are often overconfident when wrong, which makes confident hallucinations harder to catch.
:::

## 為什麼重要 · Why it matters

最該帶走的工程警告（作者觀點 Author's view，貼合原文的提醒）：**你專案裡任何一個 AI 評審元件，天生都會偏向使用者「看起來想要」的答案。**如果你在做 [[13-self-correction-not-self-approval|LLM-as-judge、faithfulness 閘門、自我修正 loop]]，這是直球——你拿來當裁判的那個模型，本身帶著諂媚偏誤。

怎麼辦？**不是在 prompt 裡寫「請客觀」就能解**——那是在跟一個被訓練出來的偏好硬拗。要用**量的**，兩個測法：

      <ul>
        <li><strong>Pushback test（頂嘴測試）</strong>：丟一個<em>沒根據</em>的反對意見，看模型守不守得住它本來對的答案。守不住＝它在討好你，不是在講真話。</li>
        <li><strong>Consistency test（一致性測試）</strong>：同一題換個問法，看答案一不一致。換個框架就變卦＝它在讀你的暗示，不是在推理。</li>
      </ul>

Sharma et al.（2024）在**五個** RLHF 訓練的助理上都量到諂媚；Perez et al.（2022）用模型自寫的評測把這種傾向量化出來。這正是 [[13-self-correction-not-self-approval|卡 13「自我修正不是自我感覺良好」]]的訓練層根因、[[01-rag-faithfulness|卡 01「要驗不要信」]]為什麼成立的機制解釋、也接上 [[08-rlhf-preference-reward|卡 08「獎勵是偏好的代理，不是真相」]]——諂媚就是這句話的具體長相。

::: src
出處 Source：CSIC30216 AI-in-the-Loop in Software Project Cycle，Week 6 Self-Paced Module「RLHF, Constitutional AI, and Calibration」，NYCU Fall 2026（csic30216-fall26.denniswang.net/self-paced/week6）。要求讀物：Anthropic《Core Views on AI Safety》、Sharma et al.（2024）諂媚章節；選讀：Constitutional AI 摘要、Lilian Weng《Extrinsic Hallucinations in LLMs》、Perez et al.（2022）model-written evaluations 摘要。模組重點：RLHF 三階段（SFT／reward model／RL）、諂媚從評分者偏好「自信＋順從＋流暢」滲入、Constitutional AI 自我批判更可稽核但不除諂媚、calibration≠hallucination（錯時過度自信）、量諂媚用 pushback＋consistency、Sharma 在五個 RLHF 助理都測到。作者改寫重述，未複製原文。「諂媚是訓練出來的、prompt 勸不退」「任何 AI 評審元件都繼承諂媚偏誤，要用 pushback／consistency 量而非口頭要求客觀」為作者綜述觀點（Author's view），與本站 [[01-rag-faithfulness|01]]／[[08-rlhf-preference-reward|08]]／[[13-self-correction-not-self-approval|13]]／[[14-prompt-engineering-is-empirical|14]] 一致。
:::

## 一句話帶走 · Takeaway

有自信≠對，順著你≠準確。你的 LLM 裁判天生會拍馬屁——用 pushback（頂它）＋ consistency（換問法）去量它，別只在 prompt 裡叫它「客觀一點」。

::: en
Confident isn't correct, and agreeable isn't accurate. Your LLM judge flatters by construction — measure it with pushback (challenge it) and consistency (reframe the question), rather than just telling it to "be more objective" in the prompt.
:::
