---
id: "41"
slug: rl-is-hard-sandbox-reward-hacking
tag: 代理工程
title: RL 出了紙上就難訓練：標準沙盒讓你可控地撞上信用分配與探索利用
title_en: "RL Is Hard the Moment You Leave Paper: a Standard Sandbox Lets You Hit Credit Assignment and Explore-Exploit Under Control"
title_short: RL 出了紙上就難訓練
summary: 「RL 比簡單分類器難訓練」是公認的——而它難，不是意外：信用分配、探索vs利用、組合爆炸這三個難題，在實戰裡同時發作。Gymnasium 這種標準化環境之所以重要，正是「遊戲＝真實世界的沙盒」的動手版：可控、安全、快速。而 reward shaping 最危險——你以為在幫忙，常常是在教 agent 鑽漏洞。
summary_en: "RL is harder to train than a simple classifier" is well known — and it's hard for a reason, not by accident: credit assignment, exploration-vs-exploitation, and combinatorial explosion all fire at once in practice. A standardized environment like Gymnasium matters because it's the hands-on form of "games are sandboxes of the real world": controllable, safe, fast. And reward shaping is the most dangerous part — you think you're helping, but you're often teaching the agent to game the reward.
links: []
---
## 是什麼 · What it is

這張是 [[37-reward-is-rl-loss-credit-assignment|「獎勵是 RL 的 loss」]]的動手版——把 RL 真的跑起來。標準做法是用 <strong>Gymnasium</strong>（OpenAI Gym 的維護分支）提供的環境：挑<strong>至少兩個任務</strong>（其中至少一個來自 Atari），演算法不限（Q-learning、policy gradient、actor-critic 皆可），可參考並重用網路上的程式碼（要附引用）。

有一句作業裡的實話值得先記住：<strong>RL 是出了名地比簡單分類器難訓練。</strong>而且任務難易本身不是重點——用簡單環境（倒單擺、cliff walking）只要做出<strong>有意義的實驗</strong>，一樣有價值。換句話說，這個 project 的真正課題不是「破關」，是<strong>搞懂 RL 為什麼這麼難搞</strong>。

::: en
This is the hands-on version of [[37-reward-is-rl-loss-credit-assignment|"reward is RL's loss"]] — actually running RL. The standard approach uses environments from **Gymnasium** (the maintained fork of OpenAI Gym): pick **at least two tasks** (at least one from Atari), any algorithm (Q-learning, policy gradient, actor-critic all fine), and you may reference and reuse online code (with citations). One honest line from the assignment is worth remembering first: **RL is famously harder to train than a simple classifier.** And task difficulty itself isn't the point — with a simple environment (inverted pendulum, cliff walking) a **meaningful experiment** is just as valuable. In other words, the real lesson of this project isn't "beat the game," it's **understanding why RL is so hard.**
:::

## 為什麼重要 · Why it matters

該帶走的洞見：<strong>RL 的「難」不是意外，而是前面幾張卡的難題在實戰裡同時發作。</strong>

<p>
<strong>信用分配</strong>（<a href="37-reward-is-rl-loss-credit-assignment.html">卡 37</a>）：回饋姍姍來遲又稀疏，agent 很難知道是哪一步的功勞——在 Atari 這種長序列任務尤其殘酷。<br>
<strong>探索 vs 利用</strong>（<a href="36-exploration-vs-exploitation-dial.html">卡 36</a>）：ε-greedy 之類的機制要調——探索太少卡在爛策略，太多學不穩。<br>
<strong>樣本與穩定性</strong>：RL 的訓練訊號是自己取樣來的（會變動、會自我糾纏），不像監督式有固定標準答案，所以對超參數敏感、曲線常常抖。
</p>

而標準化環境本身就值得一提：<strong>Gymnasium 是 [[38-games-exhaustive-dream-meets-explosion|「遊戲＝真實世界的沙盒」]]的動手版</strong>——可控、安全、能快速模擬，讓你能<strong>反覆、可重現地</strong>逼近上面那些難題，而不必冒真實世界的代價。

最該帶走的一個實作陷阱是 <strong>reward shaping</strong>：當稀疏獎勵難學，人會忍不住自己加一些「中間獎勵」去引導 agent。但這極其危險——<span class="tag-warn">你以為在幫忙，常常是在教 agent 鑽你設的漏洞</span>。這就是 reward hacking／Goodhart，跟 [[08-rlhf-preference-reward|RLHF 的獎勵是偏好的代理、不是真相]]是同一種病；而 RL 這裡的實戰，正是 [[37-reward-is-rl-loss-credit-assignment|RLHF 搬到語言模型]]之前的原型。收束成一句：<strong>RL 教你的，是當回饋稀疏又延遲、而你只能靠一個會被鑽的代理訊號時，要多謹慎地對待「你到底在優化什麼」。</strong>

::: src
出處 Source：NYCU Spr2026 AI 課 Project #3（王才沛，OpenAI Gym／Gymnasium，≥2 任務含 ≥1 Atari，演算法不限）為本卡的實作對象；本卡以 RL 標準實務與課程概念為據、非重製作業規格。Gymnasium＝OpenAI Gym 維護分支、≥2 任務（≥1 Atari）、演算法不限、可重用程式碼（附引用）、「RL 比簡單分類器難訓練」、任務難易非重點（倒單擺／cliff walking 等簡單環境做有意義實驗即可）均為該 project 要點。信用分配／探索-利用（ε-greedy）／取樣訊號不穩與超參數敏感／reward shaping 與 reward hacking 為 RL 標準實務概念。<br>「RL 的難＝信用分配＋探索利用＋組合爆炸同時發作」「Gymnasium＝遊戲沙盒的動手版」「reward shaping 常在教 agent 鑽漏洞＝reward hacking＝RLHF 同病、且為 RLHF 的原型」為作者綜述觀點（Author's view），對應本站 [[37-reward-is-rl-loss-credit-assignment|37]]／[[36-exploration-vs-exploitation-dial|36]]／[[38-games-exhaustive-dream-meets-explosion|38]]／[[08-rlhf-preference-reward|08]]。
:::

## 一句話帶走 · Takeaway

RL 難訓練不是意外——信用分配、探索利用、組合爆炸在實戰同時發作。Gymnasium 是「遊戲＝沙盒」的動手版，讓你可控地撞這些難題。而 reward shaping 最該小心：你以為在幫忙，常常是在教 agent 鑽漏洞——這正是 RLHF 之前的原型。

::: en
RL's training difficulty is no accident — credit assignment, explore-exploit, and combinatorial explosion fire at once in practice. Gymnasium is the hands-on form of "games are sandboxes," letting you hit these problems under control. And reward shaping deserves the most caution: you think you're helping, but you're often teaching the agent to game the reward — the very prototype of what RLHF later became.
:::
