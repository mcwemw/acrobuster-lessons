---
id: "30"
slug: define-success-before-you-build
tag: AI 工程
title: 先定義「怎樣算成功」再開始蓋：驗收標準、最低證據門檻、human-AI 邊界，都在 discovery 就定下
title_en: "Define Success Before You Build: Fix the Acceptance Bar, the Minimum Evidence Threshold, and the Human-AI Boundary at Discovery"
title_short: 先定義「怎樣算成功」再開始蓋
summary: CP1 把「評估」放在「建造」**之前**：在認真開蓋前，先寫下「我們怎麼知道這工具有用」——一個成功定義、一個**最低證據門檻**、以及用 AI 時的 **human-AI 邊界**；而且問題要用**真實使用者證據**撐（≥2 次真人對話），不是自己斷言。評分鐵律一句話：**「不確定從不扣分，超出你證據的宣稱才扣分。」** 設這條標準，在 discovery 階段最便宜。
summary_en: "CP1 puts evaluation **before** building: before serious work, you write down how you'll know the tool worked — a success definition, a **minimum evidence threshold**, and the **human-AI boundary** if AI is in the loop — and you ground the problem in **real-user evidence** (≥2 real conversations), not assertion. The grading rule says it in one line: **\"Uncertainty is never penalised; claims that go beyond your evidence are.\"** Setting that bar is cheapest at discovery."
links: []
---
## 是什麼 · What it is

CP1（Checkpoint 1：Phase 1, Discovery，佔 5% 團隊分，Week 7 繳交）是期末專案的第一關，**刻意做得輕**——「對齊比詳盡文件更重要」。它不要你先蓋東西，而是交五個部分，核心是逼團隊**先想清楚評估**：

| 部分（配分） | 要你定下什麼 |
|---|---|
| **問題陳述＋證據（30）** | 具體問題＋誰有這問題；**≥2 次團隊外真實使用者對話**；為什麼現有工具不夠 |
| **草擬評估計畫（30）** | 成功定義（以「We will know our tool works if…」開頭）＋目標使用者與如何接觸＋評估方法與時機＋**最低證據門檻**＋（若用 AI）**human-AI 邊界** |
| 互動設計草圖（15） | 工具做什麼、輸入/輸出、**兩個人怎麼一起用** |
| 團隊章程（15） | 分歧決策流程、definition of done、課外溝通約定 |
| Repository（10） | main 分支保護、PR 範本、<code>DECISIONS.md</code>（≥1 筆真紀錄）、現任 **code steward** |

評估方法要是三者之一：結構化觀察／前後測問卷／簡短訪談。

::: en
CP1 (Checkpoint 1: Phase 1, Discovery; 5% team grade; due Week 7) is the first gate of the final project, deliberately light — "alignment valued over exhaustive documentation." It doesn't ask you to build; it asks for five sections whose core is to make the team **think about evaluation first**: a Problem Statement with Evidence (specific problem + who has it; ≥2 real-user conversations outside the team; why existing tools fall short), a Draft Evaluation Plan (a success definition starting "We will know our tool works if…" + target users + method + timing + a minimum evidence threshold + the human-AI boundary if AI is used), an Interaction Design Sketch (inputs/outputs, how two people use it together), a Team Charter (decision process, definition of done, comms), and a Repository (branch protection, PR template, <code>DECISIONS.md</code>, a recorded code steward).
:::

## 為什麼重要 · Why it matters

      <ul>
        <li><strong>評估先於建造（evaluation-first discovery）。</strong>你在<strong>蓋任何東西之前</strong>就把「怎樣算成功」和「最少要多少證據」釘死——而這正是改動成本最低的時刻。這是 <a href="28-already-testing-badly-silent-failures.html">卡 28「先寫下『對』長什麼樣」</a>搬到<strong>專案層</strong>：卡 28 是每個 prompt 層級、這張是整個產品層級，在 discovery 就先立驗收標準。先定驗收、再做——不是做完才回頭找指標。</li>
        <li><strong>證據勝於斷言，而這條被寫進評分。</strong>CP1 的鐵律：<strong>「不確定從不扣分，超出你證據的宣稱才扣分。」</strong> 你不會因為「還不知道」被罰，只會因為「說了超過你能證明的話」被罰。所以問題陳述要有 ≥2 次真人對話撐著，不能用創辦人的想像。這和 <a href="29-prompt-broke-check-withheld-context.html">卡 29</a> 的評分（分數只給可查證的過程）是同一條「言而有據」紀律，現在升到產品決策層。</li>
        <li><strong>human-AI 邊界要明寫。</strong>只要 AI 進了 loop，你就得說清楚「人的判斷在哪裡停、AI 從哪裡開始」——這是 <a href="04-agentic-three-responsibilities.html">卡 04「知道何時收回控制」</a>的 discovery 版，配上治理骨架（code steward、<code>DECISIONS.md</code>、PR 範本、分支保護）讓這條邊界可追溯。</li>
        <li><strong>輕，是刻意的。</strong>CP1 不要完美計畫（「之後改設計不扣分」），要的是一個<strong>共享、可量測的標準</strong>，趁它還便宜改時先立起來。discovery 的產出不是厚文件，是一把大家同意的尺。</li>
      </ul>

把這張卡接回本站（作者觀點 Author's view）：[[23-rag-two-failure-layers|卡 23]]～[[28-already-testing-badly-silent-failures|28]] 教你怎麼**量**一個已經存在的東西（檢索、prompt、答案、誤差棒）；這張卡往前站一步——**在東西還不存在時，先決定要量什麼、量到多少才算數**。這就是 SDD/TDD/BDD「先定驗收再做」的專案級版本：把成功標準和證據門檻當成**第一個產出**，不是最後的檢查。

::: src
出處 Source：CSIC30216 AI-in-the-Loop in Software Project Cycle，Final Project CP1《Checkpoint 1: Phase 1, Discovery》，NYCU Fall 2026（csic30216-fall26.denniswang.net/project/cp1/，佔 5% 團隊分，繳交期限 2026-10-25 Week 7，async 到 E3）。素材：目標原文「establishes your team's shared direction and evaluation thinking before serious building begins」「alignment valued over exhaustive documentation」；繳交物 `GroupXX_CP1`（PDF/zip）五個計分部分——Team Charter（15；分歧決策流程/definition of done/課外溝通）、Problem Statement with Evidence（30；具體問題＋誰有／≥2 次團隊外真實使用者對話／為何現有工具不足）、Interaction Design Sketch（15；輸入輸出/兩人協作）、Draft Evaluation Plan（30；成功定義「We will know our tool works if…」＋目標使用者與接觸方式＋評估方法＋時機＋最低證據門檻＋human-AI 邊界）、Repository（10；main 分支保護/PR 範本/`DECISIONS.md` ≥1 筆/現任 code steward）；評估方法須為結構化觀察/前後測問卷/簡短訪談三選一；評分鐵律原文「uncertainty is never penalised」「Claims that go beyond your evidence are」；「後續設計變更不罰」「兩次對話＝拿滿證據分的最低標」。作者改寫重述，未複製原文。「evaluation-first discovery」「先定義成功與證據門檻＝SDD/TDD/BDD 專案版」「證據勝於斷言寫進 rubric」為作者綜述觀點（Author's view），與本站 [[04-agentic-three-responsibilities|04]]／[[27-error-bars-on-evals|27]]／[[28-already-testing-badly-silent-failures|28]]／[[29-prompt-broke-check-withheld-context|29]] 一致。
:::

## 一句話帶走 · Takeaway

認真開蓋之前，先寫下「怎樣算成功」——一個成功定義、一個最低證據門檻、以及用 AI 時的 human-AI 邊界；問題要用真實使用者證據撐，不是自己斷言。記住那條鐵律：不確定不扣分，超出證據的宣稱才扣分。量一個還不存在的東西的方法，就是在它存在前先決定要量什麼、量到多少才算數——而這在 discovery 階段最便宜。

::: en
Before serious building, write down how you'll know it worked — a success definition, a minimum evidence threshold, and the human-AI boundary if AI is in the loop — and ground the problem in real-user evidence, not assertion. Keep the rule: uncertainty isn't penalized, claims beyond your evidence are. The way to measure a thing that doesn't exist yet is to decide, before it exists, what you'll measure and how much counts — and that's cheapest at discovery.
:::
