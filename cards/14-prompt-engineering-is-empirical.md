---
id: "14"
slug: prompt-engineering-is-empirical
tag: 提示工程
title: 提示工程是量出來的，不是刻出來的：先定指標、再搜尋、用多數決
title_en: "Prompt Engineering Is Measured, Not Hand-Crafted: Metric First, Then Search, Then Vote"
title_short: 提示工程是量出來的，不是刻出來的：先定指標、再搜尋、用多數決
summary: 好 prompt 不是坐在那邊想詞想出來的——是先有一把尺（成功標準＋能跑的評測），然後把 prompt 當成要「搜尋」的東西去優化，必要時多抽幾次取多數。這是把機器學習的老紀律搬到提示上。
summary_en: A good prompt isn't wordsmithed into existence — you first build a ruler (success criteria plus a runnable eval), then treat the prompt as something to search and optimize, and when needed sample several times and take the majority. It's classic ML discipline applied to prompting.
links: []
---
## 是什麼 · What it is

三份材料串起同一條線：**提示工程不是雕詞，是實證工程。**分三步，每步都有一篇在撐：

      <p>
        <strong>① 先有尺（Anthropic 提示工程指南）</strong>：官方指南開宗明義，動手調 prompt <em>之前</em>要先備齊三件事——明確的成功標準、能對這標準<strong>實證測試</strong>的方法、一版可改的草稿 prompt；缺了就先去把這三件立起來。它還提醒：<strong>不是每個失敗的 eval 都是 prompt 問題</strong>，像延遲／成本常常換個模型更快解。<br>
        <strong>② 把 prompt 當成要搜尋的東西（APE，Zhou et al. 2022）</strong>：一旦有了打分的尺，寫 prompt 就變成搜尋問題。APE 把「指令」當成一支<em>程式</em>：讓一個 LLM 生出一大堆候選指令，用「另一個 LLM 照這指令做得多好」當分數，挑分數最高的那個。結果：在 24 個任務裡，有 <strong>19 個</strong>追平或贏過人手寫的指令。<br>
        <strong>③ 用多數決壓隨機雜訊（Self-Consistency，Wang et al. 2022）</strong>：不要只走貪婪解碼那一條路。對同一題<strong>抽樣多條不同的推理路徑</strong>，再把這些路徑收斂成「最常出現的那個答案」。直覺是：一道難題通常有好幾條不同推理都通到同一個正解。數字很猛：GSM8K <strong>+17.9%</strong>、SVAMP +11.0%、AQuA +12.2%、StrategyQA +6.4%、ARC-challenge +3.9%。
      </p>

::: en
Three sources trace one line: **prompt engineering isn't wordsmithing, it's empirical engineering** — in three steps, each backed by one source. **① Build the ruler first (Anthropic's prompt engineering guide):** the official guide states that *before* you tune a prompt you need three things — clear success criteria, a way to **empirically test** against them, and a draft prompt to improve; if you lack them, go build those first. It also warns that **not every failing eval is a prompt problem** — latency and cost are often fixed faster by picking a different model. **② Treat the prompt as something to search (APE, Zhou et al. 2022):** once you have a scoring ruler, writing a prompt becomes a search problem. APE treats the instruction as a *program*: one LLM proposes a large pool of candidate instructions, each scored by how well a second LLM performs when following it, and the top-scoring one is selected. Result: on 24 tasks, APE matched or beat human-written instructions on **19**. **③ Use majority vote to cancel random noise (Self-Consistency, Wang et al. 2022):** don't take only the single greedy-decoding path. **Sample many diverse reasoning paths** for the same question, then collapse them to the most frequent final answer. The intuition: a hard problem usually has several reasoning routes that reach the same correct answer. The gains: GSM8K **+17.9%**, SVAMP +11.0%, AQuA +12.2%, StrategyQA +6.4%, ARC-challenge +3.9%.
:::

## 為什麼重要 · Why it matters

最該帶走的一句：**你不能改善一個你沒在量的東西。**Anthropic 指南把「先有成功標準與評測」擺在調 prompt 之前，APE 根本沒有那把分數尺就跑不起來——兩者都在說同一件事：[[10-norms-before-building|評估前移]]、[[06-ai-loop-discipline|先定規格再對它驗]]。prompt 不是靈感，是**對著指標搜出來的工件**。

但兩個失效邊界一定要記住，否則「量化」會給你假的安心：

      <p>
        <strong>① APE 的 prompt 是「在評分集上最好」，不等於「可靠」。</strong>它是對你的打分例子最佳化出來的——這就是調校集／held-out 的老問題：若只在挑它的那些例子上看它好，你可能是把指令<strong>過擬合</strong>到 eval 上了。所以自動搜出來的 prompt 要再丟到<strong>沒參與挑選的例子</strong>上驗（接 <a href="13-self-correction-not-self-approval.html">卡 13</a> 的 held-out 提醒、<a href="07-prompt-techniques-pitfalls.html">卡 07</a> 的「看起來對≠對」）。<br>
        <strong>② Self-consistency 修的是變異，不是偏誤。</strong>多數決壓的是<strong>隨機</strong>雜訊；如果模型是<strong>系統性</strong>地錯，多抽幾次只會「對一個錯答案很有信心地一致」。變異（reliability）和偏誤（bias）是兩回事，ensemble 降前者不降後者——這正是 <a href="01-rag-faithfulness.html">要驗不要信</a> 的統計版。
      </p>

::: src
出處 Source：①《Prompt engineering overview》Anthropic 官方文件（platform.claude.com/docs：調 prompt 前需成功標準＋實證測試＋草稿；非每個失敗 eval 都是 prompt 問題；技巧清單 clarity／examples／XML／role／thinking／chaining 收於 Prompting best practices）。②Zhou, Muresanu, Han, et al., "Large Language Models Are Human-Level Prompt Engineers"（APE），arXiv:2211.01910，2022（指令當程式、LLM 生候選池、以第二個 LLM zero-shot 表現打分選最高、24 任務中 19 追平或勝過人手寫、受程式合成啟發）。③Wang, Wei, Schuurmans, Le, Chi, et al., "Self-Consistency Improves Chain of Thought Reasoning in Language Models"，arXiv:2203.11171，2022（ICLR 2023；取代貪婪解碼、抽樣多條推理路徑取最一致答案、GSM8K +17.9%／SVAMP +11.0%／AQuA +12.2%／StrategyQA +6.4%／ARC-c +3.9%）。作者改寫重述，未複製原文。「提示工程是實證工程非雕詞」「APE 要 held-out 驗否則過擬合」「多數決修變異不修偏誤」為作者綜述觀點（Author's view），與本站 [[01-rag-faithfulness|01]]／[[06-ai-loop-discipline|06]]／[[13-self-correction-not-self-approval|13]] 一致。
:::

## 一句話帶走 · Takeaway

好 prompt 是量出來的：先立成功標準與評測（沒尺就別調），再把 prompt 當搜尋問題去優化（APE），必要時多抽幾次取多數（self-consistency）。但自動搜出的 prompt 要在沒選過它的例子上驗（別過擬合），多數決只修隨機錯、不修系統錯（只降變異不降偏誤）。

::: en
A good prompt is measured, not mused: set success criteria and an eval first (no ruler, no tuning), then optimize the prompt as a search problem (APE), and sample-and-vote when needed (self-consistency). But validate an auto-searched prompt on examples it wasn't selected on (don't overfit), and remember majority voting fixes random, not systematic, error (it cuts variance, not bias).
:::
