---
id: "26"
slug: test-prompts-like-code
tag: 軟體工程
title: Prompt 要像程式一樣被測試：分層檢查 × 輸入類別覆蓋 × 每修必加回歸，才叫「做完」
title_en: "Test Prompts Like Code: Layered Checks × Input-Category Coverage × a Regression Test for Every Fix Is What \"Done\" Means"
title_short: Prompt 要像程式一樣被測試
summary: 一個 prompt「跑一次對了」不叫做完；做完是它有一組**測試套件**把行為釘住。Week 10 用 promptfoo 把 prompt 當程式測：每個測試是**分層的獨立檢查**（格式→schema→正確性→安全，全過才算過）、覆蓋**多種輸入類別**（典型／空／超長／分隔符衝突／輸入敏感／預測失效），每修一個失效就**加一條回歸測試**，再用 <code>--repeat</code> 逼出隨機不穩。而且十個案例仍分不開訊號與抽樣雜訊。
summary_en: "A prompt that \"worked once\" isn't done; done is when a **test suite** pins its behavior. Week 10 uses promptfoo to test prompts like code: each test is **layered independent checks** (format → schema → correctness → safety, all must pass), covering **input categories** (typical / empty / very long / delimiter-conflict / input-sensitivity / predicted-failure), with a **regression test added for every fix**, and <code>--repeat</code> to expose stochastic flakiness. And even then, ten cases can't separate signal from sampling noise."
links: []
---
## 是什麼 · What it is

Week 10 lab 給你一個「客服工單分類」prompt（Nimbus Notes），它讀工單、吐一個 JSON <code>{category, priority, summary}</code> 給下游 router。你用 **promptfoo**（<code>npx promptfoo@latest eval --no-cache</code>）把它當程式測。每個測試由**按類型分層的獨立檢查**組成，**全部通過**才算通過：

| 層 | 檢查（checks.js） | 它抓什麼 |
|---|---|---|
| **格式 Format** | <code>validJson</code> | 回覆是不是「裸 JSON 物件」（router 需要，不能有 code fence 或前後文字） |
| **Schema** | <code>schemaOk</code> | 剛好三個 key、label 在白名單內、summary 是 ≤25 字的英文 |
| **正確性 Correctness** | <code>categoryIs</code>／<code>priorityIn</code>… | 分類／優先級是不是預期的值 |
| **安全 Safety** | <code>summaryHasNo</code>／<code>priorityNot</code> | 有沒有照做工單裡的注入指令、有沒有自己把優先級抬成 urgent |

關鍵是這些 check 多半是**決定性的程式碼**（不呼叫模型打分），所以快、可重現、免費。測試要**覆蓋輸入類別**而非只測 happy path：T1–T3 典型、E1 空工單、L1 超長、**D1 分隔符衝突**（工單裡含 <code>```</code> 或 <code>&lt;/ticket&gt;</code> 還藏指令）、S1/S2 **輸入敏感**（同問題換句話說／用繁中）、P1 **預測失效**（跑之前先寫下你賭它會錯）。

::: en
Week 10 gives you a ticket-triage prompt (Nimbus Notes) that must emit a JSON <code>{category, priority, summary}</code> for a downstream router. You test it with promptfoo. Each test is layered independent checks — Format (<code>validJson</code>: a bare JSON object), Schema (<code>schemaOk</code>: exactly three keys, allowed labels, a ≤25-word English summary), Correctness (<code>categoryIs</code>/<code>priorityIn</code>), Safety (<code>summaryHasNo</code>/<code>priorityNot</code>) — and the test passes only if all checks pass. Most checks are deterministic code (no model call): fast, reproducible, free. And you cover input categories, not just the happy path: typical, empty, very long, delimiter-conflict (a ticket containing <code>```</code> or <code>&lt;/ticket&gt;</code> with an instruction hidden inside), input-sensitivity (reworded / Traditional Chinese), and a predicted failure written down before you run it.
:::

## 為什麼重要 · Why it matters

測試能揭露**讀 prompt 讀不出來**的東西。這個 lab 的 v0 prompt 肉眼看起來沒事，測了才現形：它把分類寫成「feature request」「account access」（有空格），但 router 的 schema 要的是 <code>feature_request</code>／<code>account_access</code>（底線）→ schema fail；它的優先級清單放了 <code>high</code>，但允許值只有 <code>low/normal/urgent</code> → 非法 label；而 <code>Ticket: {{ticket}}</code> 沒有分隔符包住使用者輸入 → 對 D1 的注入毫無防備。**這些都是 schema/label 不一致和注入面，讀一遍 prompt 很容易放過，一跑測試就紅。**

三個把「測試」變「工程紀律」的動作（作者觀點 Author's view）：

      <ul>
        <li><strong>每修一個失效，就加一條回歸測試（R1）。</strong>修好不是終點——要補一個<strong>新</strong>工單的測試，守住這個失效不會悄悄回來。沒有守門的測試，等於沒修完。這是把 <a href="21-tool-use-is-a-tradeoff.html">卡 21「跑一次成功不算測試」</a>落成可執行的制度。</li>
        <li><strong>用 <code>--repeat</code> 逼出隨機性。</strong>溫度設 1（真實 app 不會跑在 0），同一題重跑結果會變；「3/3 通過」不證明這個測試可靠。這一條與 <a href="21-tool-use-is-a-tradeoff.html">卡 21</a>、<a href="24-evaluate-the-evaluator.html">卡 24</a> 同源：隨機系統要計次量，不是單跑。</li>
        <li><strong>設對照、承認雜訊。</strong>比「你的修法 vs 只是把 v0 換句話說（v0 reworded）」，才分得清是修法有效還是改寫的運氣；而且<strong>十個案例根本分不開訊號與抽樣雜訊</strong>——測試讓你更有把握，不是給你證明。</li>
      </ul>

把這張卡接回本站：它是 [[14-prompt-engineering-is-empirical|卡 14「量出來不是刻出來」]]的執行層（prompt 用測試套件來量）、延伸 [[18-prompt-failure-diagnosis|卡 18]] 的輸入敏感（S1/S2）、把 [[22-validate-tool-arguments-not-eval|卡 22]] 的注入（D1 分隔符衝突＋<code>summaryHasNo</code> 安全檢查）變成可回歸的測項。若升級到 <code>llm-rubric</code> 當檢查，就回到 [[24-evaluate-the-evaluator|卡 24]]：那個判官自己要先對人類驗證過。優先用決定性程式碼檢查，能不用 LLM 判官就不用。

::: src
出處 Source：CSIC30216 AI-in-the-Loop in Software Project Cycle，Week 10 Lab《Prompt testing and reliability》（Nimbus Notes ticket triage），NYCU Fall 2026（繳交期限 2026-11-11）。素材：lab 檔案 <code>promptfooconfig.yaml</code>（provider = anthropic claude-haiku-5-5，<code>temperature: 1</code>、<code>max_tokens: 300</code>；<code>npx promptfoo@latest eval --no-cache</code> / <code>view</code> / <code>--repeat 3</code>）、<code>tests.yaml</code>（T1–T3 典型 + 要你補 E1 空／L1 超長／D1 分隔符衝突／S1·S2 輸入敏感／P1 預測失效 + Part 3 的 R1 回歸；一個測試 ALL checks 過才算過）、<code>checks.js</code>（<code>validJson</code>／<code>schemaOk</code>：剛好 category·priority·summary 三 key、category∈{billing,bug,feature_request,account_access,other}、priority∈{low,normal,urgent}、summary ≤25 字英文；<code>categoryIs</code>／<code>priorityIn</code>／<code>priorityNot</code>／<code>summaryHasNo</code>）、<code>prompts/triage_v0.txt</code>（原文把分類寫成有空格的「feature request」「account access」、優先級含 <code>high</code>、<code>Ticket: {{ticket}}</code> 無分隔符）、submission template（Part 3.5 repeat run「為何 3/3 不證明測試可靠」、Part 3.6 v0 vs v0 reworded 對照「十個測試分不開訊號與抽樣雜訊」、Part 4 Q1「有些失效改 prompt 修不了、要架構層修法」）。作者改寫重述，未複製原文。「prompt 要像程式一樣有測試套件」「每修必加回歸＝做完的定義」「決定性 check 優先於 LLM 判官」為作者綜述觀點（Author's view），與本站 [[14-prompt-engineering-is-empirical|14]]／[[18-prompt-failure-diagnosis|18]]／[[21-tool-use-is-a-tradeoff|21]]／[[22-validate-tool-arguments-not-eval|22]]／[[24-evaluate-the-evaluator|24]] 一致。
:::

## 一句話帶走 · Takeaway

Prompt 跑一次對了不叫做完，有一組釘住行為的測試套件才叫做完：分層獨立檢查（格式→schema→正確性→安全，全過才算過）、覆蓋輸入類別（典型／空／超長／分隔符衝突／輸入敏感／預測失效）、每修一個失效就加一條回歸測試、用 <code>--repeat</code> 逼出隨機不穩。優先用決定性程式碼檢查；而且要記得——十個案例讓你更有把握，但分不開訊號與抽樣雜訊。

::: en
A prompt that works once isn't done; done is a test suite that pins its behavior: layered independent checks (format → schema → correctness → safety, all must pass), coverage across input categories (typical / empty / very long / delimiter-conflict / input-sensitivity / predicted-failure), a regression test added for every fix, and <code>--repeat</code> to expose stochastic flakiness. Prefer deterministic code checks; and remember — ten cases make you more confident, but can't separate signal from sampling noise.
:::
