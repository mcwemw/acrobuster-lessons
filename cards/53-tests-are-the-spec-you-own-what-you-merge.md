---
id: "53"
slug: tests-are-the-spec-you-own-what-you-merge
tag: 軟體工程
title: AI 寫的程式，測試是你交出去的規格；你 merge 的，你負責
title_en: "When AI Writes the Code, Tests Are the Spec You Hand Over — and You Own What You Merge"
title_short: 測試即規格 × 你 merge 的你負責
summary: AI 很會寫「看起來對」的程式——但看起來對不等於做對：HumanEval 只認「通過測試」不認「像參考答案」，Veracode 測逾百模型有 45% 引入漏洞，BaxBench 的正確後端約一半仍可被攻破。所以真正的交付物不是程式碼（那可重生），而是你寫的測試——它把「怎樣算對」釘死成可執行的規格。而一段文字規格可以被讀成好幾種意思，你不能執行一段文字。最後：當 AI 寫的程式出錯，負責的是按下 merge 的人；「AI 寫的」不該出現在 bug report、事故檢討或成績申訴裡。
summary_en: "AI is great at code that looks right — but looking right isn't being right: HumanEval only counts a sample correct if it passes the tests, not if it resembles a reference; Veracode found 45% of 100+ models introduced vulnerabilities; about half of BaxBench's correct backends were still exploitable. So the real deliverable isn't the code (that's regenerable) — it's the tests you write, which pin down what 'right' means as an executable spec. A prose spec can be read several ways, and you can't run a paragraph. Finally: when AI-written code is wrong, the person who hit merge owns it; 'the AI wrote it' does not belong in a bug report, an incident review, or a grade appeal."
---
## 是什麼 · What it is

AI 寫程式最危險的不是它會錯，而是它會寫出<strong>「看起來完全正確」但其實沒做你要的事</strong>的程式。<span class="tag-warn">看起來對 ≠ 做對</span>——這不是感覺，是量出來的：

<p>
<strong>HumanEval（Chen et al. 2021）</strong>：164 題手寫題，每題附單元測試，<strong>只有通過測試才算對，「長得像參考答案」不算</strong>。<br>
<strong>Veracode（2025）</strong>：測 100+ 模型、80 個已知弱點任務，<strong>45% 的情況引入漏洞</strong>（Java 逾 70%），而且大模型沒有明顯比較安全。<br>
<strong>BaxBench（Vero et al. 2025）</strong>：392 個後端任務，最強模型約 62% 正確，但<strong>這些「正確」程式約有一半仍可被攻破</strong>。
</p>

所以當 AI 來寫實作，你手上真正的資產就不是程式碼了——<strong>程式碼可以丟掉重生，測試不行</strong>。先把「怎樣算對」寫成會失敗的測試（紅），再叫 AI 生出讓它變綠的程式，然後你跑測試、讀 diff。這就是把 [[30-define-success-before-you-build|卡 30「先定義怎樣算成功」]]與 [[26-test-prompts-like-code|卡 26「像程式一樣測試」]]推到極致：<strong>規格即測試（spec-as-tests）——測試是你交出去的那一份，程式碼只是可重生的副產品。</strong>

::: en
The dangerous thing about AI-written code isn't that it errs — it's that it writes code that **looks completely correct but doesn't do what you asked**. Looking right ≠ being right, and that's measured, not felt: **HumanEval** (164 hand-written problems, each with unit tests) counts a sample correct only if it passes the tests, not if it resembles a reference; **Veracode (2025)** found 45% of 100+ models introduced vulnerabilities (Java over 70%), with larger models no clearly safer; **BaxBench** (392 backend tasks) saw the best model ~62% correct, yet about half of those "correct" programs were still exploitable. So when AI does the implementation, your real asset is no longer the code — **the code can be thrown away and regenerated; the tests can't.** Write "what counts as right" as a failing test (red), ask AI for code that turns it green, then run the tests yourself and read the diff. This pushes [[30-define-success-before-you-build|card 30's "define done first"]] and [[26-test-prompts-like-code|card 26's "test like code"]] to their limit: **spec-as-tests — the tests are what you hand over; the code is a regenerable by-product.**
:::

## 為什麼重要 · Why it matters

第一，<strong>一段文字規格可以被讀成好幾種意思，你不能執行一段文字</strong>。「把學生分組，每組 size 人」——size 是上限還是剛好？9 人分 4 是 4+4+1 還是 3+3+3？剩的人獨自一組還是打散？size=0 要回空還是報錯？就算你照「角色/脈絡/任務/需求/格式/範例」寫了漂亮 prompt，這些洞還在。把六個決策寫成七條測試，模糊就沒地方躲——這正是 [[03-intent-output-gap|卡 03 意圖 vs 輸出落差]]在程式生成端的具體解法。

第二，<span class="tag-fail">別讓同一個模型、從同一個模糊需求，同時寫程式又寫測試</span>——它們會「互相同意」，包括一起錯。<strong>有決策含量的案例（邊界、錯誤、那條「不能有人落單」的規則）你自己寫，例行案例才交給 AI 補</strong>；把決策寫進 DECISIONS.md。這跟 [[22-validate-tool-arguments-not-eval|卡 22「工具參數要驗不要跑」]]同一個骨：AI 的產出預設是「待驗的猜測」，不是「可信的答案」。

第三，也是最重的——<strong>你 merge 的，你負責</strong>。AI 寫的程式出錯時，擁有它的是按下合併的人；「AI 寫的」不該出現在 bug report、事故檢討、或成績申訴裡。負起責任的意思是你能證明：你解釋得了它、它有你信得過（且會失敗）的測試、PR 寫明用了 AI 且你怎麼查的、為什麼這樣做寫在 DECISIONS.md。審核者按下 approve＝「我讀過了」，不是「看起來沒問題」。這是把 [[06-ai-loop-discipline|卡 06「紀律前移」]]與 [[12-process-is-load-bearing|卡 12「流程是保命索」]]收束成一條責任線：<strong>工具可以放大你的產出，但放大不了你的責任——責任永遠停在人這一端。</strong>

::: src
出處 Source：NYCU/陽明交大《CSIC30216 AI-in-the-Loop in Software Project Cycle》Week 11「AI-Assisted Code Generation and Debugging」（講者 Dennis Wang 王邦任、Yu-Chun Grace Yen 顏羽君，2026-11-16）為本卡觸發脈絡；本卡以作者研究框架改寫綜述，非重製講義內容。<br>量化事實引自該課所引之公開來源：METR, <em>Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity</em>, arXiv:2507.09089（16 名資深開發者預期省 24%／自覺省 20%／實測多花 19%；late-2025 追蹤 57 人效果較小且區間含零）；Chen et al. (2021), <em>Evaluating LLMs Trained on Code</em>（HumanEval）, arXiv:2107.03374；Veracode (2025) GenAI Code Security Report（45% 引入漏洞、XSS 未防護 86%、log injection 88%；<strong>為廠商報告、非同儕審查，屬單函數補全場景</strong>）；Vero et al. (2025), <em>BaxBench</em>, arXiv:2502.11844（ICML 2025）。<br>「測試＝你交出去的規格、程式碼可重生」「文字規格不可執行、模糊藏在沒寫的決策裡」「同模型寫碼又寫測試會一起錯、決策案例要自己寫」「你 merge 的你負責、approve＝我讀過了」為作者綜述觀點（Author's view），對應本站 [[30-define-success-before-you-build|30]]／[[26-test-prompts-like-code|26]]／[[22-validate-tool-arguments-not-eval|22]]／[[06-ai-loop-discipline|06]]／[[12-process-is-load-bearing|12]]／[[03-intent-output-gap|03]]。
:::

## 一句話帶走 · Takeaway

AI 很會寫「看起來對」的程式（HumanEval 只認通過測試、Veracode 45% 引入漏洞、BaxBench 正確後端半數可破），所以你真正交付的不是程式碼——那可重生——而是你寫的測試：它把「怎樣算對」釘成可執行、模糊無處躲的規格。決策含量的案例自己寫、別讓同個模型一手包碼與測試。而最後一條鐵律：你 merge 的，你負責；「AI 寫的」不該出現在 bug report 裡。

::: en
AI is great at code that looks right (HumanEval only counts passing tests; Veracode: 45% introduce vulnerabilities; half of BaxBench's correct backends are exploitable), so what you actually deliver isn't the code — that's regenerable — it's the tests you write: they pin "what counts as right" into an executable spec where ambiguity can't hide. Write the decision-carrying cases yourself; don't let one model author both the code and its tests. And the iron rule: you own what you merge — "the AI wrote it" does not belong in a bug report.
:::
