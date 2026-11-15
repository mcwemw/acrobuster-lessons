---
id: "06"
slug: ai-loop-discipline
tag: 軟體工程
title: AI 入迴圈，工程紀律不減反前移
title_en: AI in the Loop Doesn't Remove Engineering Discipline — It Moves It Forward
title_short: AI 入迴圈，工程紀律前移到規格與驗證
summary: 讓 AI 幫你寫，省掉的是打字，不是把關；紀律從「事後審 code」前移到「事前寫規格、當場對規格驗」。
summary_en: Letting AI write for you saves typing, not judgment; discipline moves forward — from reviewing code after the fact to writing a spec first and checking output against it as you go.
links: []
---
## 是什麼 · What it is

軟體工程有三個「先寫驗收標準、再動手」的老派紀律，它們差在**驗收的顆粒度**：

      <p>
        <strong>① TDD（測試驅動）</strong>：先寫一個會失敗的測試，再寫剛好讓它通過的程式，然後重構（Red → Green → Refactor）。驗的是「這段 code 對不對」。<br>
        <strong>② BDD（行為驅動）</strong>：把需求寫成人看得懂的行為情境「Given（前提）→ When（動作）→ Then（可觀察結果）」，利害關係人先對這份行為達成共識再自動化。驗的是「行為符不符需求」。<br>
        <strong>③ SDD（規格驅動）</strong>：把<strong>規格當唯一真相源</strong>，所有派生物（程式、文件、測試）都回去對規格驗，而不是對「作者的本意」驗。驗的是「所有產物忠不忠於同一份規格」。
      </p>

三者是同一條紀律的三種顆粒度：code → behavior → spec，由裡往外。<span class="tag-pass">先定標準</span> → <span class="tag-pass">產出</span> → <span class="tag-fail">對標準驗，不自評</span>。

::: en
Software engineering has three old-school "write the acceptance standard first, then build" disciplines; they differ in the **granularity** of what's checked. **① TDD (Test-Driven):** write a failing test, then just enough code to pass, then refactor (Red → Green → Refactor); it checks "is this code correct." **② BDD (Behavior-Driven):** express requirements as human-readable scenarios — "Given → When → Then" — that stakeholders agree on before automating; it checks "does the behavior meet the requirement." **③ SDD (Spec-Driven):** treat the **spec as the single source of truth**; every derived artifact (code, docs, tests) is validated against the spec, not against the author's intent; it checks "is every output faithful to one spec." The three are one discipline at three grains: code → behavior → spec, from inside out.
:::

## 為什麼重要 · Why it matters

當 AI 能自己跨步把 code 寫出來（見 [[04-agentic-three-responsibilities|代理時代三職責]]），風險不是「打字變慢」，而是**流暢但錯的輸出被信任、而非被驗證**——這正是 [[01-rag-faithfulness|RAG 忠實度]]裡 WARN／幻覺的同一個病。這三個紀律給的解法不是「更信任作者」，而是把驗收標準**前移**：先寫好一份獨立於產出者的標準，讓輸出回去對它驗。

CSIC30216 Week 1 的 lab〈Experiencing the Intent-Output Gap〉把這件事做成最小動作：要你**先用自己的話寫下對一段 <code>mystery()</code> 函式的理解，這份理解就是「benchmark」**，再拿 AI 的解釋去對它驗，看模型替你擅自決定了哪些你沒指定的事（受眾、深度、有沒有處理空陣列邊界）。接著**一次只改一個地方**收掉最大落差——這就是 prompt 版的 Red → Green。「先立標準、再判輸出、留下紀錄」正是 TDD／BDD／SDD 在沒有 IDE 的情況下的素描。

於是人的工作從「寫 code」挪到「定規格 + 評軌跡 + 收回控制」，AI 寫得越多，**規格與驗證這一層就越是護城河**，而不是被省掉的一環。

::: en
Once AI can execute and write code across steps on its own (see [[04-agentic-three-responsibilities|the engineer's three jobs]]), the risk isn't slower typing — it's that **fluent-but-wrong output gets trusted rather than verified**, the same ailment as WARN / hallucination in [[01-rag-faithfulness|RAG faithfulness]]. These disciplines don't answer it by "trusting the author more"; they move the acceptance standard **forward**: author a producer-independent standard first, then check output against it.
:::

::: en
CSIC30216 Week 1's lab, "Experiencing the Intent-Output Gap," boils this down to a minimal act: you **first write, in your own words, your understanding of a small <code>mystery()</code> function — and that understanding is the benchmark**; then you judge the AI's explanation against it, spotting what the model silently decided that you never specified (audience, depth, whether it handled the empty-list edge case). Then you **change exactly one thing** to close the biggest gap — a prompt-level Red → Green. "Set the standard first, judge the output, keep a record" is TDD/BDD/SDD sketched without an IDE.
:::

::: en
Human work shifts from writing code to specifying intent, evaluating the trajectory, and taking back control — and the more AI writes, the more **the spec-and-verification layer becomes the moat**, not the step that gets skipped.
:::

::: src
出處 Source：TDD＝Kent Beck,《Test-Driven Development: By Example》(2003)；BDD＝Dan North, "Introducing BDD" (2006, dannorth.net)；SDD 為近年規格優先實務（如 GitHub Spec Kit）。課堂實例＝CSIC30216《AI-in-the-Loop》Week 1 Lab "Experiencing the Intent-Output Gap"（csic30216-fall26.denniswang.net/labs/week1，Dennis Wang 王邦任、顏羽君 Grace Yen）。「AI 讓紀律前移到規格＋驗證、三者為同一紀律三顆粒度」為作者綜述與實作觀點（Author's view）。概念均經作者改寫重述，未複製課程投影片。
:::

## 一句話帶走 · Takeaway

AI 幫你寫，省的是打字不是把關。先寫規格（SDD）、先寫驗收（TDD／BDD）、對標準驗而非自評——AI 寫越多，這層紀律越值錢。

::: en
AI saves typing, not judgment. Write the spec first (SDD), write the acceptance first (TDD/BDD), check against the standard rather than self-grading — the more AI writes, the more this layer of discipline is worth.
:::
