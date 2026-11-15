---
id: "21"
slug: tool-use-is-a-tradeoff
tag: 代理工程
title: 代理工具用量是要量測的權衡，不是一次修好的 bug：四種失效會互相拉扯，而「今天沒壞」不算證據
title_en: "Agent Tool-Use Is a Measured Trade-off, Not a One-Time Fix: The Four Failures Pull Against Each Other, and \"Didn't Fail Today\" Isn't Evidence"
title_short: 代理工具用量是要量測的權衡，不是一次修好的 bug
summary: 把一個三工具 agent 的描述故意寫爛，你會看到四種工具專屬失效。但真正的體悟有兩個：① 這些失效會**互相拉扯**——修「不必要呼叫」把模型推向少呼叫，修「漏呼叫」推向多呼叫，你是在調一個權衡點，不是修兩個獨立 bug；② 工具呼叫是**隨機的**，所以「跑一次沒壞」不是證據——要用計次量、用壓測逼、持續監控。
summary_en: "Deliberately weaken a three-tool agent's descriptions and you'll see four tool-specific failures. But the real lessons are two: ① the failures **pull against each other** — fixing \"unnecessary calls\" pushes toward calling less, fixing \"missed calls\" pushes toward calling more, so you're tuning a trade-off, not fixing two independent bugs; ② tool-calling is **stochastic**, so \"ran once, didn't break\" is not evidence — measure with run counts, stress it, and monitor it."
links: []
---
## 是什麼 · What it is

Week 7 lab 給你一個三工具 agent（計算機、課程知識庫、課程行事曆），三個工具的描述**故意寫爛**，要你走一遍：先讓它動 → 找出它怎麼壞 → 重寫描述 → 用證據證明有改善。四種「工具專屬」失效模式，每一種都能被一句爛描述製造出來：

| 失效模式 | 它失敗的定義 | V0 爛描述如何製造它 |
|---|---|---|
| **① 選錯工具**<br>Wrong tool | 用了答不了題的工具，或兩個重疊工具選錯，或根本不需要卻用了 | 行事曆寫「Finds course dates **and information**」——「and information」和知識庫重疊，模型分不清該用哪個 |
| **② 參數錯**<br>Wrong parameters | 對的工具，但參數畸形或不是你的本意，於是工具報錯或答錯題 | 計算機寫「Does calculations. Use for anything involving numbers」——沒說能吃什麼格式（自然語言？符號？），模型亂傳 <code>twenty-four divided by eight</code> |
| **③ 不必要呼叫**<br>Unnecessary call | 模型明明能輕鬆直接答，卻還是呼叫了工具 | （描述沒劃清「什麼時候不用」的界線 → 模型寧可呼叫也不冒險） |
| **④ 漏呼叫**<br>Missed call | 模型憑記憶答，但工具能給正確、課程專屬的答案（或憑記憶給了個貌似合理卻錯的數字） | 知識庫寫「Use only if you do **not already know** the answer」——這句直接叫模型相信自己的記憶，親手製造漏呼叫 |

第 ④ 列那句 V0 描述是最漂亮的反面教材：**「只在你還不知道答案時才用」**——它把「要不要查」的判斷交給一個天生會自信幻覺的模型（見 [[18-prompt-failure-diagnosis|卡 18]]／[[16-sycophancy-is-trained-in|卡 16]]），等於明文鼓勵它跳過工具。描述不是中性的說明，描述會**驅動**行為。

::: en
Week 7 gives you a three-tool agent (calculator, course knowledge base, course calendar) whose descriptions are deliberately weak, and walks you through: make it work → find how it fails → rewrite the descriptions → prove the improvement with evidence. Four tool-specific failure modes — wrong tool, wrong parameters, unnecessary call, missed call — each manufacturable by one bad sentence. The sharpest example: the knowledge base's V0 description says "Use only if you do not already know the answer," which hands the decision of whether to look something up to a model that is confidently hallucinatory by construction (see [[18-prompt-failure-diagnosis|card 18]] / [[16-sycophancy-is-trained-in|card 16]]) — explicitly inviting the missed-call failure. A description isn't neutral documentation; it **drives** behavior.
:::

## 為什麼重要 · Why it matters

兩個比「有四種失效」更深的體悟：

      <ul>
        <li><strong>① 失效會互相拉扯——你在調權衡，不是修獨立 bug。</strong>Lab 明講：模式 ③（不必要呼叫）和 ④（漏呼叫）方向相反——修前者把模型推向「少呼叫」，修後者推向「多呼叫」。所以修好一邊可能弄壞另一邊，這就是為什麼 lab 要你改完<strong>重測所有 query</strong>，不只你改的那條。工具用量沒有「全對」，只有「對這組任務與風險校準好」。</li>
        <li><strong>② 「今天沒壞」不是證據。</strong>工具呼叫是隨機的——同一題跑 5 次結果會不同——所以 lab 用 <code>--repeat</code> <strong>計次</strong>而非單跑。更關鍵：某個失效「這次沒出現」不代表安全。Lab 要求你對沒失效的模式也要跑至少三種 query、加壓力測試、換條件（中文、塞大量雜訊、模糊拼錯、需兩步），再說出「你會持續監控什麼」。原文直球：<strong>「'it worked once' is not a test」</strong>、<strong>「why 'it didn't fail today' is not enough to ship」</strong>。</li>
      </ul>

把這張卡接回本站（作者觀點 Author's view）：[[18-prompt-failure-diagnosis|卡 18]] 教你診斷是哪種失效、[[19-tools-are-contracts|卡 19]] 教你工具描述就是介面規格——這張卡補上第三塊：**evaluation 與 monitoring**。因為失效會拉扯、因為隨機，光知道種類和規格不夠，你得用計次量、用壓測逼、持續監控。這正是 [[14-prompt-engineering-is-empirical|卡 14「量出來不是刻出來」]]搬到 agent 工具層。修法仍是介面設計：六問檢查表（做什麼／何時用／**何時不用**／參數格式／回傳／限制），特別照顧兩工具易混處和計算機能吃什麼。

Lab 最後那題也值得收進專案紀律：若工具會**改變東西**（送訊息、開 issue、改檔、刪資料），誰該在它跑之前核可？——這是 [[04-agentic-three-responsibilities|卡 04「收回控制」]]、也是 [[20-slopsquatting-supply-chain|卡 20]] 自動安裝風險的同一條線：會改變世界的工具，要有 human-in-the-loop 閘門。

::: src
出處 Source：CSIC30216 AI-in-the-Loop in Software Project Cycle，Week 7 Lab《Diagnose and Fix a Three-Tool Agent》，NYCU Fall 2026（csic30216-fall26.denniswang.net/labs/week7/，繳交期限 2026-10-21）。素材：lab guide + 起始碼 <code>week7_lab_starter.py</code> 的 <code>TOOLS_V0</code> 三個故意寫爛的描述（calculator「Does calculations. Use for anything involving numbers」；search_knowledge_base「Searches course information. Use only if you do not already know the answer」；get_course_calendar「Finds course dates and information」）。四失效定義（wrong tool／wrong parameters／unnecessary call／missed call）、模式 ③④ 方向相反的張力、<code>--repeat</code> 計次方法、「did not fail」需壓測＋換條件＋說出監控項、六問描述檢查表、Q2 會改變狀態的工具需核可，皆出自 lab guide 原文。作者改寫重述，未複製原文。「工具用量是權衡不是獨立 bug」「隨機→計次量、壓測逼、持續監控」「這是 evaluation/monitoring 第三塊」為作者綜述觀點（Author's view），與本站 [[04-agentic-three-responsibilities|04]]／[[14-prompt-engineering-is-empirical|14]]／[[18-prompt-failure-diagnosis|18]]／[[19-tools-are-contracts|19]]／[[20-slopsquatting-supply-chain|20]] 一致。
:::

## 一句話帶走 · Takeaway

工具失效會互相拉扯（修「少呼叫」可能弄壞「多呼叫」），而且工具呼叫是隨機的——所以別用「跑一次成功」證明修好了，用計次量、用壓測逼、持續監控；「今天沒壞」不等於「可以上線」。而且描述會驅動行為：一句「不知道再查」就能親手製造漏呼叫。

::: en
Tool failures pull against each other (fixing "call less" can break "call more"), and tool-calling is stochastic — so don't let one successful run prove the fix; measure with counts, stress it, and monitor it. "Didn't fail today" isn't "ready to ship." And descriptions drive behavior: one line like "look it up only if you don't already know" manufactures the missed call by itself.
:::
