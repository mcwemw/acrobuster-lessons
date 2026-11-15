---
id: "29"
slug: prompt-broke-check-withheld-context
tag: 提示工程
title: Prompt 壞掉，先查你漏給了什麼脈絡：在團隊裡，一半的「規格」藏在沒說出口的慣例裡
title_en: "When a Prompt Breaks, First Check What Context You Withheld: In a Team, Half the \"Spec\" Lives in Unspoken Conventions"
title_short: Prompt 壞掉，先查你漏給了什麼脈絡
summary: prompt 產出的程式壞掉，最常見的原因不是「模型笨」，是**你漏給了脈絡**。Assignment 1 的診斷題故意這樣設計：三個隊友的 prompt 之所以失敗，正因為它們各漏掉一個隱藏需求——團隊的 <code>CONVENTIONS.md</code>、一個 <code>utils.py</code> 裡的 helper、或沒明說的 urgency 規則。模型做的正是 prompt 寫的；是 prompt 沒寫出那段活在共享慣例裡的規格。所以**診斷 = 指出規格漏了什麼，不是罵模型**。
summary_en: "When prompt-generated code breaks, the usual cause isn't a dumb model — it's **context you withheld**. Assignment 1's diagnosis task is built on this: three teammates' prompts fail precisely because each omits a hidden requirement — the team's <code>CONVENTIONS.md</code>, a helper in <code>utils.py</code>, or an unspoken urgency rule. The model did exactly what the prompt said; the prompt just didn't carry the part of the spec that lives in shared conventions. So **diagnosis = naming what the spec left out, not blaming the model**."
links: []
---
## 是什麼 · What it is

Assignment 1「Technique Practice and Prompt Diagnosis」（佔 10%）讓你在一個 <code>task_manager.py</code> 模組上做兩件事：

      <ul>
        <li><strong>Part 1 — 刻意練技法（50 分）：</strong>對三個 coding 任務<strong>指名</strong>用特定技法，並寫下它造成的<strong>可見差異</strong>：① 用 <strong>Chain-of-Thought ＋ Step-back</strong> 修 <code>get_overdue_tasks</code> 的 TypeError；② 用 <strong>Zero-shot ＋ Self-correction</strong> 寫 <code>sort_tasks_by_priority</code>，而且要秀出 self-correction 的<strong>三回合</strong>（生成 → 批評 → 修訂）；③ 用 <strong>Few-shot</strong> 給 <code>calculate_completion_rate</code> 寫 docstring。每題都要交：逐字 prompt ＋ 完整未剪輯回應 ＋ 2–3 句反思。</li>
        <li><strong>Part 2 — 診斷並重寫（50 分）：</strong>三個隊友的 prompt 各<strong>漏掉一個隱藏需求</strong>（團隊 <code>CONVENTIONS.md</code>／<code>utils.py</code> 的 helper／urgency 規則），所以產出的碼會壞。你在<strong>乾淨的新對話</strong>裡只貼 <code>task_manager.py</code> ＋ 原 prompt 跑一次、存進 <code>my_solutions.py</code>、跑 <code>check_my_work.py</code>，<strong>精確命名失效模式</strong>、用 Weeks 1–7 的詞彙講清楚<strong>因果機制</strong>，再寫改良版（這次可用被扣住的材料）重跑，兩份執行紀錄都交。</li>
      </ul>

它建立在 Weeks 5–6（寫 prompt 的技法）＋ Week 6（失效診斷詞彙）之上——是整個提示工程段的**實作驗收**。

::: en
Assignment 1 ("Technique Practice and Prompt Diagnosis," 10%) has two parts on a <code>task_manager.py</code> module. Part 1 (50 pts): deliberately apply named techniques and record the **visible difference** each makes — Chain-of-Thought + Step-back to fix a TypeError in <code>get_overdue_tasks</code>; Zero-shot + Self-correction to build <code>sort_tasks_by_priority</code> (showing all three turns: generate → critique → revise); Few-shot to docstring <code>calculate_completion_rate</code>. Part 2 (50 pts): three teammates' prompts each omit a hidden requirement (the team <code>CONVENTIONS.md</code>, a <code>utils.py</code> helper, or urgency rules), so the generated code fails; you run the original in a fresh chat (pasting only <code>task_manager.py</code> + the prompt), name the failure mode precisely, explain the causal mechanism in Weeks 1–7 vocabulary, then rewrite with the withheld materials and rerun.
:::

## 為什麼重要 · Why it matters

**Part 2 的設計藏著整份作業最深的一課：失敗的 prompt 通常不是模型的錯，是規格不完整。**那三個 prompt 失敗，不是模型能力不夠——是 prompt 沒把活在 <code>CONVENTIONS.md</code>、<code>utils.py</code>、urgency 規則裡的那段規格寫出來。模型忠實地照著（不完整的）prompt 做了。這把 [[03-intent-output-gap|卡 03「模型回的是你寫出來的，不是你心裡想的」]]銳化到**團隊**維度：

      <blockquote>一個人時，「你心裡想的」在你腦袋裡；<strong>在團隊裡，「你心裡想的」分散在慣例、共享 helper、和沒人寫進 prompt 的默契規則裡</strong>——模型從沒看過它們。</blockquote>

這也正是 [[25-context-window-is-a-budget|卡 25]] 的接地：知識不在模型的參數記憶裡——而這裡更尖銳，它連 **prompt 裡都沒有**。所以 Part 2 的「診斷」不是去找模型哪裡壞，是去**重建規格漏了什麼**、把它補回 context。命名失效、講因果（[[18-prompt-failure-diagnosis|卡 18]] 的診斷紀律）之後，修法幾乎總是「把被扣住的脈絡放回去」。

Part 1 也有一條可遷移的紀律：**技法不是咒語，是要刻意選、然後觀察差異的。**CoT 讓推理現形、self-correction 的三回合要真的看到「批評改變了答案」、few-shot 把格式釘住——你為了一個理由選技法，再去看**到底變了什麼**。這是 [[14-prompt-engineering-is-empirical|卡 14「量出來不是刻出來」]]搬到技法選擇層。

最後，A1 的評分方式本身就是一課（作者觀點 Author's view）：分數來自**逐字 prompt ＋ 完整未剪輯回應 ＋ 反思／診斷**，**checker 的輸出只算佐證、不給分**。這就是 Maker/Checker 與「言而有據」寫進評分標準——交的是可查證的過程，不是「它過了」這句話。呼應 [[28-already-testing-badly-silent-failures|卡 28]]：先寫下「對」長什麼樣，證據才站得住。

::: src
出處 Source：CSIC30216 AI-in-the-Loop in Software Project Cycle，Assignment 1《Technique Practice and Prompt Diagnosis》，NYCU Fall 2026（csic30216-fall26.denniswang.net/assignments/a1/，佔學期 10%，繳交期限 2026-11-01 Week 8 結束）。素材：繳交物為 Markdown 檔（Part 1／Part 2 ＋ AI 使用紀錄），每個 prompt 須附逐字 prompt＋完整未剪輯回應＋反思；作業在 <code>task_manager.py</code>（<code>add_task</code>／<code>mark_complete</code>／<code>get_overdue_tasks</code>／<code>calculate_completion_rate</code>）上進行。Part 1 三技法任務（CoT＋Step-back 修 <code>get_overdue_tasks</code> TypeError／Zero-shot＋Self-correction 寫 <code>sort_tasks_by_priority</code> 須含生成-批評-修訂三回合／Few-shot 寫 <code>calculate_completion_rate</code> docstring）、Part 2 三個各漏一個隱藏需求（團隊 <code>CONVENTIONS.md</code>／<code>utils.py</code> helper／urgency 規則）的隊友 prompt、流程（新對話只貼 task_manager.py＋prompt → <code>my_solutions.py</code> → <code>check_my_work.py</code> → 命名失效＋用 Weeks 1–7 詞彙講因果 → 改良重跑）、評分（技法須如指定、回應須完整、反思／診斷要具體；「checker output is evidence only — points come from prompts, responses, reflections, and diagnoses」）皆出自 A1 頁面。建立於 Weeks 5–6 提示工程＋Week 6 失效診斷詞彙。作者改寫重述，未複製原文。「prompt 壞掉先查漏了什麼脈絡」「團隊裡規格分散在慣例/helper/默契」「評分即 Maker/Checker 紀律」為作者綜述觀點（Author's view），與本站 [[03-intent-output-gap|03]]／[[14-prompt-engineering-is-empirical|14]]／[[18-prompt-failure-diagnosis|18]]／[[25-context-window-is-a-budget|25]]／[[28-already-testing-badly-silent-failures|28]] 一致。
:::

## 一句話帶走 · Takeaway

Prompt 產出的碼壞掉，第一個嫌疑犯是**你漏給的脈絡**，不是笨模型——尤其在團隊裡，一半的規格活在 <code>CONVENTIONS.md</code>、共享 helper、和沒人寫進 prompt 的規則裡，模型從沒看過。診斷 = 命名失效、講因果、然後把漏掉的脈絡補回去。附帶兩條：技法不是咒語，要刻意選再觀察差異；而可查證的證據（逐字 prompt＋完整回應＋反思）才給分，「它過了」不算。

::: en
When prompt-generated code breaks, the first suspect is **context you withheld**, not a dumb model — especially in a team, where half the spec lives in <code>CONVENTIONS.md</code>, shared helpers, and rules nobody wrote into the prompt, which the model never saw. Diagnosis = name the failure, explain the mechanism, then put the missing context back. Two riders: techniques aren't magic words — choose them deliberately and observe the difference; and verifiable evidence (verbatim prompt + full response + reflection) earns the credit, "it passed" does not.
:::
