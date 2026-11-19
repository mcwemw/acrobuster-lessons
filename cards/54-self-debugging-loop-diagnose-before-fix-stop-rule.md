---
id: "54"
slug: self-debugging-loop-diagnose-before-fix-stop-rule
tag: 軟體工程
title: 用 AI 除錯要像科學家：先診斷再修、三次無進展就停、沒 traceback 就先寫一個會失敗的測試
title_en: "Debug with AI Like a Scientist: Diagnose Before You Fix, Stop After Three Attempts, and When There's No Traceback, Write a Failing Test First"
title_short: 自我除錯迴圈：診斷 → 停損 → 無 trace 先寫測試
summary: 跟 AI 跑除錯迴圈很便宜（貼錯誤→要診斷→修→再跑），危險的是不經思考地一直跑。三個紀律把它從「亂猜」變「科學」：① 先診斷再修——要 AI 給「三個可能原因＋各自怎麼驗」，驗證那步你自己做（沒驗過的原因只是講得很順的猜測，建立在錯診斷上的修一定錯）；② 停損規則——同一個問題三次無進展就停，換更小的例子、更清楚的規格、或自己讀；動手前先 git commit，永遠回得去；③ 沒有 traceback 的 bug（答錯、太慢、不安全都不會 crash）要先寫成一個會失敗的測試，迴圈才有靶、你才知道何時算修完。
summary_en: "Running a debug loop with AI is cheap (paste the error, ask for a diagnosis, fix, run again); the danger is running it without thinking. Three disciplines turn it from guessing into science: (1) Diagnose before you fix — ask AI for 'three possible causes and how to check each,' but do the checking yourself (an unchecked cause is just a fluent guess, and a fix built on a wrong diagnosis is wrong however confident it sounds); (2) a stop rule — three attempts with no progress on the same problem, then stop and change something (a smaller example, a clearer spec, or read it yourself); git commit before you start so you can always go back; (3) a bug with no traceback (wrong answers, slow runs, security holes don't crash) must first be turned into a failing test, so the loop has a target and you know when you're done."
---
## 是什麼 · What it is

拿到一包「AI 寫的、但有 bug」的程式（像本週 lab 那個 teamboard 專案），最自然的做法是把錯誤貼給 AI、拿回一個修法、套上去、再跑——<strong>這個迴圈每一圈都很便宜，所以真正的風險不是迴圈本身，是不經思考地一直轉</strong>。把它變成有紀律的除錯，靠三件事：

<p>
<strong>① 先診斷、再修</strong>：問「<em>這裡哪裡錯、為什麼？先別寫程式</em>」，或「給我三個可能原因，和各自我能怎麼驗」。<span class="tag-warn">提原因 AI 很強，但驗證那一步你自己做</span>——一個沒被驗過的原因，只是講得很順的猜測。<br>
<strong>② 停損規則</strong>：同一個問題<strong>三次無進展就停</strong>，然後「換一個東西」——更小的例子、更清楚的規格、或換個問法；真的不行就自己讀。<span class="tag-pass">動手前先 git commit</span>，隨時回得到上一個好狀態。<br>
<strong>③ 沒有 traceback 的 bug 先寫測試</strong>：答錯、太慢、不安全——這三種都不會 crash，沒有 traceback 可貼。先把它變成一個會失敗的測試（答錯→輸入＋期望輸出；太慢→真實大小＋時間上限；不安全→一個敵意輸入），<strong>迴圈才有靶，你才知道何時算修完</strong>。
</p>

科學家除錯的五步就是這個骨架：<strong>重現（一道指令讓它穩定壞）→ 縮小（最小輸入＋最少程式還會壞）→ 假設（一個具體原因）→ 驗證（print／斷點／測試確認或推翻它）→ 修（最小改動，留著測試讓它不再回來）</strong>。曾經會動、現在壞了，就 git bisect。

::: en
Given a package of "AI-written but buggy" code (like this week's teamboard lab), the natural move is to paste the error to AI, take back a fix, apply it, run again — **each turn of this loop is cheap, so the real risk isn't the loop, it's spinning it without thinking.** Three things make it disciplined: **(1) Diagnose, then fix** — ask "what's wrong and why? don't write code yet," or "give me three possible causes and how I can check each." AI is strong at proposing causes, but you do the checking — an unchecked cause is just a fluent guess. **(2) A stop rule** — three attempts, no progress, stop; then change something (a smaller example, a clearer spec, a different question), or read it yourself; git commit before you start so you can always return to the last good state. **(3) No traceback? Write a test first** — wrong answers, slow runs, and security holes don't crash, so turn each into a failing test (wrong → input + expected output; slow → realistic size + a time limit; insecure → a hostile input), and now the loop has a target and you can tell when you're done. The scientist's five steps are the same skeleton: reproduce → isolate → hypothesize → verify → fix (smallest change, keep the test); if it used to work, git bisect.
:::

## 為什麼重要 · Why it matters

第一，<span class="tag-fail">建立在錯診斷上的修，一定是錯的——不管那段修法讀起來多有自信</span>。AI 最會的就是「流暢地給你一個聽起來對的原因」，而流暢 ≠ 正確（這正是 [[16-sycophancy-is-trained-in|卡 16 諂媚]]與 [[28-already-testing-badly-silent-failures|卡 28 沉默失效]]的同一個病）。所以迴圈裡唯一不能外包的，就是「驗證診斷」那一步：它要能在診斷是錯的時候<strong>失敗</strong>——一個不會推翻假設的檢查，沒有驗到任何東西。這跟 [[53-tests-are-the-spec-you-own-what-you-merge|卡 53]]「測試是你交出去的規格」是同一條線：你信的是你驗過的，不是 AI 說的。

第二，<strong>迴圈失控有固定的形狀，認得出來就擋得住</strong>：東修西壞、程式越長越大（thrash）；用 try/except 把錯誤蓋掉、或對「那個會壞的輸入」開特例（症狀修）；<span class="tag-fail">偷改測試讓它變綠</span>（該問的是：錯的是程式，還是測試？）；修 bug 時夾帶無關改動；還有「每次重問、每次自信地重複同一個錯診斷」。停損規則就是為這些而設——<strong>三次沒進展，代表你困在一個壞假設裡，繼續轉只會把洞挖深</strong>。這呼應 [[12-process-is-load-bearing|卡 12 流程是保命索]]：git commit／stop rule 不是官僚，是讓你輸得起、回得來的安全索。

第三，<strong>便宜的迴圈最需要紀律，不是最不需要</strong>。因為每圈成本趨近於零，人會傾向「再試一次就好」而放棄思考；但這整套的前提從頭到尾沒變過——<strong>知道這段程式「應該」做什麼的人是你，不是模型</strong>。AI 加速的是迴圈的每一步，加速不了「決定何時停、驗證是否成立、這樣修對不對」——那些判斷永遠停在你這端，正是 [[04-agentic-three-responsibilities|卡 04 工程師三職責]]裡「收回控制」的具體操作。

::: src
出處 Source：NYCU/陽明交大《CSIC30216 AI-in-the-Loop in Software Project Cycle》Week 11「AI-Assisted Code Generation and Debugging」（講者 Dennis Wang 王邦任、Yu-Chun Grace Yen 顏羽君，2026-11-16）之自我除錯迴圈與本週 lab（debug 一個 AI 寫的 teamboard 程式庫）為本卡觸發脈絡；本卡以作者研究框架改寫綜述，<strong>不重製 lab 程式碼或其題解</strong>。<br>除錯迴圈步驟（重現/隔離/假設/驗證/修）、「先診斷再修、驗證那步自己做」、停損規則（三次無進展就停、先 git commit）、「沒 traceback 先寫失敗測試（答錯／太慢／不安全三型）」、迴圈失控模式（thrash／症狀修／偷改測試／夾帶無關改動／自信重複錯診斷）、git bisect 均出自該課 Week 11 講義；工具參考 Hypothesis（Python）／fast-check（JS）屬公開函式庫。<br>「錯診斷上的修一定錯、流暢≠正確」「便宜的迴圈最需要紀律」「知道程式應做什麼的是你、AI 加速步驟不加速判斷」為作者綜述觀點（Author's view），對應本站 [[53-tests-are-the-spec-you-own-what-you-merge|53]]／[[28-already-testing-badly-silent-failures|28]]／[[16-sycophancy-is-trained-in|16]]／[[12-process-is-load-bearing|12]]／[[04-agentic-three-responsibilities|04]]。
:::

## 一句話帶走 · Takeaway

AI 除錯迴圈很便宜，所以危險的是不經思考地一直轉。三條紀律讓它變科學：先診斷再修（驗證那步自己做，錯診斷上的修一定錯）、三次無進展就停（先 git commit，回得去）、沒 traceback 的 bug（答錯／太慢／不安全）先寫成會失敗的測試讓迴圈有靶。AI 加速每一步，但「何時停、診斷成不成立、這樣修對不對」永遠是你的判斷。

::: en
The AI debug loop is cheap, so the danger is spinning it without thinking. Three disciplines make it science: diagnose before you fix (do the checking yourself — a fix on a wrong diagnosis is wrong), stop after three attempts with no progress (git commit first, so you can return), and turn a no-traceback bug (wrong / slow / insecure) into a failing test so the loop has a target. AI speeds up every step, but when to stop, whether the diagnosis holds, and whether the fix is right stay your judgment.
:::
