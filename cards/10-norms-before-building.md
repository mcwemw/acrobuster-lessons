---
id: "10"
slug: norms-before-building
tag: 軟體工程
title: 開工前先立規矩：團隊 AI 準則與評估前移
title_en: "Set the Rules Before You Build: Team AI Norms and Up-Front Evaluation"
title_short: 開工前先立規矩：團隊 AI 準則與評估前移
summary: 在 AI 協作的專案裡，最該前移的不是寫 code，是「工具做什麼／不做什麼、分歧怎麼裁、成功長什麼樣」——這些要在開工前就定好。
summary_en: On an AI-assisted project, the thing to move earliest isn't writing code — it's deciding what tools are (and aren't) for, how disputes are settled, and what success looks like, all before building starts.
links: []
---
## 是什麼 · What it is

CSIC30216 Week 3 的 lab 要團隊在**動工之前**做兩層準備：

      <p>
        <strong>① 治理骨架（寫進 repo）</strong>：建公開 GitHub repo、加協作者，放 PR template 和 <code>DECISIONS.md</code>，開 branch protection——<code>main</code> 需一位核准、<strong>禁止直接 push</strong>，每人跑一次「開分支→PR→隊友審→合併」。規矩不是口頭，是變成 repo 的設定。<br>
        <strong>② 準則與評估（寫成文件）</strong>：三段 AI 使用準則＝<em>工具↔任務對應（含「這工具不該拿來做什麼」）</em>、<em>AI 互動怎麼記錄</em>、<em>對 AI 輸出有分歧怎麼裁</em>；外加一份評估計畫＝問題接地（真實使用者、他們現在怎麼做、工具成功後哪裡「看得出來不一樣」）＋四欄（成功定義含「AI 決定 vs 人決定」、目標使用者、方法與時機、最小說服證據）。
      </p>

::: en
CSIC30216's Week 3 lab asks the team to prepare on two levels **before building**. **① A governance skeleton, written into the repo:** create a public GitHub repo, add collaborators, add a PR template and a <code>DECISIONS.md</code>, and turn on branch protection so <code>main</code> needs one approval and **direct pushes are rejected**; everyone runs one "branch → PR → teammate review → merge." Rules aren't verbal — they become repo settings. **② Guidelines and an evaluation plan, written as docs:** three sections of AI-use guidelines — *tool-to-task mapping (including what a tool is NOT for)*, *how AI interactions are documented*, and *how disputes over AI output are settled* — plus an evaluation plan: problem grounding (a real user, what they do now, what would be observably different if it worked) and four fields (success definition including "AI decides vs human," target users, method and timing, minimum convincing evidence).
:::

## 為什麼重要 · Why it matters

這是 [[06-ai-loop-discipline|「紀律前移」]]升到團隊／專案層：把驗收標準在**開工前**立好，而不是寫完再吵。三個最尖的點：

      <p>
        <strong>① 分歧用「具名裁決者 + 證據」解，不用投票、不用「看起來不錯」。</strong>指定一位 code steward 當 tie-breaker，拿可觀察的證據判，而非人多或品味——這就是 <a href="01-rag-faithfulness.html">驗證而非信任</a>落到團隊決策。<br>
        <strong>② 決策要留「理由」，不只留「對話紀錄」。</strong><code>DECISIONS.md</code> 存的是「為什麼這樣選」，prompt log 存的是過程；兩者分開，因為一份能被稽核的決策需要理由、不是 transcript。<br>
        <strong>③ 「AI 決定還是人決定」會改變「成功」的定義</strong>，所以評估計畫必須寫明。這正是把人與 AI 的分工，在量測之前就講清楚。
      </p>

一句話：含糊的「我們會用 AI 寫 code」沒有用；**明確的「哪個工具做哪件事、不做哪件事、分歧拿什麼證據裁、成功要看到什麼」才有用。**

::: en
This is [[06-ai-loop-discipline|"discipline moved forward"]] raised to the team/project level: set the acceptance standard **before** building, not argue after. Three sharpest points: **① Settle disputes with a named tie-breaker plus evidence — not voting, not "looks good."** A designated code steward breaks ties using observable evidence rather than headcount or taste — [[01-rag-faithfulness|verify, don't trust]], applied to team decisions. **② Preserve the reasoning, not just the transcript.** <code>DECISIONS.md</code> holds "why we chose this"; the prompt log holds the process — kept apart because an auditable decision needs its reasoning, not a transcript. **③ "AI decides vs human decides" changes what "success" means**, so the evaluation plan must state it — making the human–AI division of labor explicit before measuring. In a line: a vague "we'll use AI for code" is useless; a specific "which tool does what, doesn't do what, which evidence breaks ties, what success must show" is what works.
:::

::: src
出處 Source：CSIC30216《AI-in-the-Loop》Week 3 Lab "Team Norms and Evaluation Methodology"（治理骨架：PR template／DECISIONS.md／branch protection；三段 AI 準則；問題接地＋四欄評估；具名裁決者＋證據、決策留理由、AI-vs-人決定塑造成功定義；csic30216-fall26.denniswang.net/labs/week3，Dennis Wang 王邦任、顏羽君 Grace Yen）。作者改寫重述，未複製課程投影片。「判準前移到團隊層、分歧用證據不用 vibes」為作者綜述觀點（Author's view），與本站 [[01-rag-faithfulness|01]]／[[06-ai-loop-discipline|06]] 一致。
:::

## 一句話帶走 · Takeaway

開工前就把「工具做什麼／不做什麼、分歧用證據怎麼裁、成功長什麼樣」定好，並把規矩寫進 repo（PR 審核、禁直推、DECISIONS.md）——驗收標準前移到團隊層，別等寫完才吵。

::: en
Before building, decide what tools are (and aren't) for, how evidence settles disputes, and what success looks like — and bake the rules into the repo (PR review, no direct push, DECISIONS.md). Move the acceptance standard forward to the team level; don't argue after the fact.
:::
