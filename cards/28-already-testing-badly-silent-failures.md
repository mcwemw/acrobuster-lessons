---
id: "28"
slug: already-testing-badly-silent-failures
tag: 提示工程
title: 你早就在測了，只是測得爛：「試幾次覺得 OK」是一個爛測試套件，而最危險的失效是沉默的
title_en: "You're Already Testing — Just Badly: \"Tried It a Few Times\" Is a Weak Test Suite, and the Most Dangerous Failures Are Silent"
title_short: 你早就在測了，只是測得爛
summary: 「我在五個例子上試過，看起來不錯」——這**已經是測試**了，只是一個 size-5 的爛測試套件，有三個弱點：①那五個是寫 prompt 的人自己挑的、②沒人寫下「好」是什麼意思（憑感覺判）、③什麼都沒存，改完不能重跑。更要命的是：你最該抓的失效是**沉默的**——格式正確、讀起來合理、但答案是錯的。沉默失效**只有在你先寫下「對」長什麼樣**時才會現形。
summary_en: "\"I tried it on five examples, looks good\" — that **already is testing**, just a weak test suite of size 5 with three weaknesses: the five were chosen by the person who wrote the prompt; nobody wrote down what \"good\" means (judged by feel); nothing is saved, so you can't rerun after a change. Worse: the failures you most need to catch are **silent** — well-formed, plausible, and wrong. Silent failures only appear if you **first wrote down what \"right\" looks like**."
links: []
---
## 是什麼 · What it is

Week 10 講義的核心問句：**「你怎麼知道你的 prompt 有用？」** 用的例子是一個「從 diff 寫 commit message」的 prompt——你在五個 diff 上試過、看起來不錯，但你有多確定它在**接下來 1,000 個 commit** 上也行？講義的第一刀：**「試五次」本身就是測試，只是爛測試。**

| 「試五次」的弱點 | 為什麼是問題 |
|---|---|
| ①那五個是**你自己挑的** | 選題偏誤——你挑的是你想得到的情況 |
| ②沒寫下**「好」是什麼** | 憑感覺判，無法重現、無法交接 |
| ③**什麼都沒存** | 改完 prompt 不能重跑，沒有回歸 |

一個測試套件，是你**刻意**去採樣三種變異：**輸入**（空 diff／2000 行 diff／含對 AI 喊話的 diff）、**輸出**（同一個 diff 這次跑和下次跑給不同訊息）、**prompt 或模型**（你改一句話、或供應商更新了模型）。「試五次」每一種都漏：你只試了典型輸入、每個只跑一次、只檢查了你自己寫的那版。

::: en
Week 10's core question: "How do you know your prompt works?" The running example is a prompt that writes a commit message from a diff — you tried five diffs and it looked good, but how confident are you about the next 1,000 commits? The lecture's first cut: trying it five times **already is testing — just bad testing**, a suite of size 5 with three weaknesses (self-chosen examples; no written definition of "good"; nothing saved to rerun). A real suite deliberately samples three kinds of variation — the input (empty diff / 2,000-line diff / a diff with a comment addressed to the AI), the output (the same diff gives a different message on another run), and the prompt-or-model (you reword a sentence; the provider updates the model) — and "five tries" misses each: you tried typical inputs, ran each once, and checked only the version you wrote.
:::

## 為什麼重要 · Why it matters

講義把失效按**「有多容易被發現」**分成三種——這是這堂課最重要的一張表：

| 失效種類 | 長什麼樣 | 誰會發現 |
|---|---|---|
| **格式 Format** | 輸出破壞了讀它的程式（被 code fence 包住、第一行 140 字） | 程式，**大聲**報錯 |
| **邊界 Edge case** | 奇怪輸入得到壞結果（空 diff、超大 diff） | 程式或使用者，**有時** |
| **沉默 Silent** | 格式正確、讀起來合理、但**就是錯的**（給刪功能的 commit 寫「fix: update config」） | **沒有人，直到很久以後** |

關鍵一句（講義原文精神）：**格式和邊界失效會「自己宣告」——只要你有檢查；沉默失效只有在你先寫下「對」長什麼樣時才會出現。** 這就是 **oracle 問題**：沒有「正確答案的定義」，你看不見錯誤——所以 [[26-test-prompts-like-code|卡 26]]「寫下期望行為再測」不是形式主義，是唯一能抓到沉默失效的辦法。這也呼應 [[24-evaluate-the-evaluator|卡 24]]：判斷「對不對」本身需要一把先驗過的尺。

另外兩個講義重點，收進紀律：

      <ul>
        <li><strong>prompt 測試 ≈ 軟體測試，但有三個關鍵差異。</strong>prompt 是用英文寫的 spec；一個 test case 是「輸入＋期望<strong>行為</strong>」（通常是一個性質，不是逐字文字）；而且<strong>非決定性</strong>——要重跑。甚至 temperature=0 也不保證逐字相同：講義舉 2025 一個實驗，同一個 prompt 在一個開源模型上跑 1,000 次給出 80 種不同輸出，肇因於服務端如何批次化請求，用 API 你管不到。所以「失敗的測試」有時是<strong>測試本身的 bug</strong>，不是 prompt 的。</li>
        <li><strong>要有對照，也要承認極限。</strong>修完 prompt，旁邊跑一個「舊 prompt 的中性改寫」當對照：若改寫把結果移動得跟你的修法一樣多，你<strong>沒證明</strong>修法有效（呼應 <a href="27-error-bars-on-evals.html">卡 27</a>）。而且 prompt 脆不脆弱不能用猜的：講義列了 Sclar 2023（改格式動 76 分）到 2026 多模型測試（強模型上格式常常不重要、但抽樣雜訊很大）的演變，結論只有一句——<strong>別宣稱脆或不脆，去量它。</strong></li>
      </ul>

把這張卡接回本站（作者觀點 Author's view）：[[26-test-prompts-like-code|卡 26]] 教你**怎麼**建測試套件（promptfoo、分層檢查、回歸）、[[27-error-bars-on-evals|卡 27]] 教你**怎麼讀**分數（誤差棒、三的法則）——這張卡補上**為什麼**：因為你早就在測、只是測得爛，而且不先定義「對」就永遠看不見沉默失效。這正是 [[18-prompt-failure-diagnosis|卡 18]] 診斷紀律與 [[21-tool-use-is-a-tradeoff|卡 21]]「跑一次成功不算測試」的同一條線。

::: src
出處 Source：CSIC30216 AI-in-the-Loop in Software Project Cycle，Week 10 Lecture《Prompt Testing and Reliability》，Dennis Wang 王邦任、Yu-Chun (Grace) Yen 顏羽君，NYCU Fall 2026（2026-11-09）。核心素材（投影片原文）：核心問句「How do you know your prompt works?」；running example「從 diff 寫 Conventional-Commits commit message，試五個 diff 看起來 OK，對接下來 1,000 commit 多有信心？」；「This already is testing, a test suite of size 5, with three weaknesses（五個是寫 prompt 的人自選／沒寫下 good 的定義、憑感覺／什麼都沒存不能重跑）」；三種變異表（input／output：同 diff 另一次給不同訊息／prompt-or-model，及「為何五次會漏」）；三種失效表（Format=破壞讀它的程式、程式大聲報；Edge case=奇怪輸入壞結果、程式或使用者有時；Silent=格式正確但錯、沒人直到很久以後）＋「Format and edge failures announce themselves if you check；silent failures only appear if you wrote down what right looks like」；「parallel with software testing」表（prompt=英文 spec／test case=input+expected behaviour 是性質非逐字／non-deterministic 要 repeat／失敗的測試可能是測試的 bug／model update 也是 change）；非決定性（temperature 0 不保證相同，2025 實驗 1,000 次給 80 種輸出，肇因 serving-system batching，API 不可控；PromptFoo 預設 temperature 0）；三種 sensitivity（Input 使用者改詞不可控＝lab S1/S2；Prompt 你改、可控、每次 edit 都影響；Model 換/更新模型可能不同，Anthropic 指引：為舊模型調的措辭在新模型上可能 overtrigger）＋對照（舊 prompt 中性改寫；若改寫移動結果與修法一樣多則未證明修法有效）；prompt sensitivity 證據表（Sclar 2023 格式動 up to 76 points；He 2024 GPT-3.5 up to 40%、GPT-4 more robust；2026 多模型 format rarely mattered 3/4、一模型 96.4%→84.0% Markdown vs XML/JSON；2026 12 模型 minor rewordings/typos/reorder little effect、sampling noise large），結論「Not claimed: fragile or robust — measure it」。作者改寫重述，未複製原文。「你早就在測只是測得爛」「沉默失效＝oracle 問題、是這堂課核心」「26 是 how、27 是 how-to-read、28 是 why」為作者綜述觀點（Author's view），與本站 [[18-prompt-failure-diagnosis|18]]／[[21-tool-use-is-a-tradeoff|21]]／[[24-evaluate-the-evaluator|24]]／[[26-test-prompts-like-code|26]]／[[27-error-bars-on-evals|27]] 一致。
:::

## 一句話帶走 · Takeaway

「試幾次覺得 OK」已經是測試了，只是個爛的：自己選題、沒定義「對」、不能重跑。升級它，而且記住最該抓的失效是**沉默的**（格式對、讀來合理、答案錯），它只有在你**先寫下「對」長什麼樣**時才現形。prompt 測試像軟體測試，但非決定性（要重跑、連 temperature 0 都不保證相同）、期望的是行為性質不是逐字、而且失敗的測試有時是測試的 bug。別猜 prompt 脆不脆——去量。

::: en
"Tried it a few times, looks good" already is testing — just a bad test: self-chosen cases, no definition of "right," nothing to rerun. Upgrade it, and remember the failures that matter most are silent (well-formed, plausible, wrong); they only appear once you've written down what "right" looks like. Prompt testing is like software testing but non-deterministic (repeat it — even temperature 0 isn't guaranteed identical), the expectation is a behavioral property not exact text, and a failing test is sometimes a bug in the test. Don't guess whether your prompt is fragile — measure it.
:::
