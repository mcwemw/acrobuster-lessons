---
id: "51"
slug: rl-reward-observation-design-is-the-job
tag: 代理工程
title: RL 真正的工程在 reward 與 observation 的設計——演算法是最不難的部分
title_en: "The Real Engineering in RL Is Designing the Reward and the Observation — the Algorithm Is the Easy Part"
title_short: RL 工程＝設計 reward 與 observation
summary: HW3 一半是用 PPO 讓車沿路徑走（reward 現成、清楚），另一半是替 Proly 遊戲 agent「設計 reward 和 observation」——後者才是 RL 真正難的地方。演算法 PPO 是現貨；成敗取決於你怎麼定獎勵、給 agent 看什麼。設計 reward＝把「什麼叫做好」寫進系統，很容易獎勵到鑽漏洞的捷徑；設計 observation＝決定 agent 看得到什麼，看不到的它永遠學不會。
summary_en: Half of HW3 is using PPO to make a car follow a path (the reward is given and clear); the other half is designing the reward and observation for a Proly game agent — and that half is where RL is actually hard. PPO the algorithm is a commodity; success hinges on how you define the reward and what you let the agent see. Designing the reward writes "what counts as good" into the system, and it's easy to reward a loophole-exploiting shortcut; designing the observation decides what the agent can perceive, and it can never learn what it can't see.
---
## 是什麼 · What it is

這是 [[44-rl-end-of-control-ladder-value-vs-policy|卡 44 的 RL]]的動手版，但它逼你看見一件事：<strong>真正難的不是演算法。</strong>HW3 兩半剛好是對照——

<p>
<strong>① Path Following（用 PPO 讓車沿路徑走）</strong>：reward 幾乎是現成的、清楚的（離路徑越近、往前進展越多就給分），你只要把 <a href="44-rl-end-of-control-ladder-value-vs-policy.html">PPO</a> 實作對、跑起來。<br>
<strong>② Proly Game AI（替遊戲 agent 設計 reward 和 observation）</strong>：這裡沒有人給你 reward——<strong>你得自己設計「獎勵什麼」和「agent 看得到什麼」</strong>。這才是 RL 真正的工作。
</p>

換句話說：<strong>PPO 這個演算法是現貨，隨便抓得到；成敗取決於你怎麼定 reward、怎麼設 observation。</strong>這兩件事本質上是——<strong>你親手在設計那個 MDP</strong>（[[37-reward-is-rl-loss-credit-assignment|卡 37 的 ⟨S,A,P,r,γ⟩]]）：r 是你定的，agent 的 state 看得到多少也是你定的。

::: en
This is the hands-on version of [[44-rl-end-of-control-ladder-value-vs-policy|card 44's RL]], but it forces you to see one thing: **the hard part isn't the algorithm.** HW3's two halves are a perfect contrast. **① Path following (use PPO to make a car follow a path)**: the reward is basically given and clear (score higher the closer to the path and the more progress), so you just implement <a href="44-rl-end-of-control-ladder-value-vs-policy.html">PPO</a> correctly and run it. **② Proly game AI (design the reward and observation for a game agent)**: here no one hands you a reward — **you must design "what to reward" and "what the agent can see."** That is RL's real job. In other words: **PPO the algorithm is a commodity you can grab anywhere; success hinges on how you define the reward and set the observation.** Both of those are, in essence, **you hand-designing that MDP** ([[37-reward-is-rl-loss-credit-assignment|card 37's ⟨S,A,P,r,γ⟩]]): you set r, and you set how much of the state the agent gets to see.
:::

## 為什麼重要 · Why it matters

該帶走的兩個洞見，都是 RL 失敗最常發生的地方。

① <strong>reward 設計＝把「什麼叫做好」寫進系統，而你很容易獎勵錯東西。</strong><span class="tag-warn">你以為在獎勵「完成任務」，常常是在獎勵「鑽你漏洞的捷徑」</span>——這正是 [[41-rl-is-hard-sandbox-reward-hacking|reward hacking]]、也是 [[08-rlhf-preference-reward|RLHF 獎勵是偏好的代理、不是真相]]。替 Proly 設 reward 時，若只獎勵分數，agent 可能找到遊戲 bug 刷分而非真的玩好；獎勵設計就是 [[30-define-success-before-you-build|把「成功」定義對]]，比急著訓練更關鍵。

② <strong>observation 設計＝決定 agent 看得到什麼，而看不到的它永遠學不會。</strong>RL 的 agent 只能根據你餵給它的 observation 做決策。如果該看的資訊沒放進 observation（部分可觀測／違反 Markov），再多訓練也學不出好策略——反之塞太多無關雜訊又拖慢學習。所以設 observation 是在回答：<strong>要做好這個決策，agent「至少」需要看到什麼？</strong>這跟 [[34-embedding-is-the-throughline|選什麼表徵]]、也跟我 RAG 裡「檢索要給 LLM 看對的脈絡」是同一個問題——<strong>系統的上限，被它能看到的東西鎖死。</strong>

收束一句：演算法會商品化，但<strong>「定義獎勵」與「決定它看什麼」是你把價值與假設親手寫進 agent 的地方</strong>——這也是為什麼 RL 的對齊與可信問題，不在 PPO 的程式碼裡，而在你設計 reward 和 observation 的那一刻。

::: src
出處 Source：NTHU《Robotic Navigation and Exploration》(578101, 胡敏君) HW3「Reinforcement Learning」（Path Following：訓練 agent 跟隨規劃路徑、完成 PPO 實作 50%；Proly Game AI：訓練 agent 玩 Proly、設計 reward 與 observation 50%）為本卡的實作對象；本卡以 RL 工程標準概念為據、非重製作業規格。「PPO 跑 path following（reward 明確）vs Proly 自設 reward/observation」出自該 HW；reward 設計與 reward hacking、observation/state 設計與部分可觀測/Markov、MDP ⟨S,A,P,r,γ⟩ 為 RL 標準概念。<br>「演算法是現貨、reward 與 observation 設計才決定成敗」「reward 設計易獎勵到鑽漏洞捷徑＝reward hacking＝定義成功」「observation 設計＝agent 看不到就學不會、系統上限被可見資訊鎖死」「設計 reward/observation＝把價值與假設寫進 MDP＝RL 對齊/可信的真正所在」為作者綜述觀點（Author's view），對應本站 [[44-rl-end-of-control-ladder-value-vs-policy|44]]／[[41-rl-is-hard-sandbox-reward-hacking|41]]／[[08-rlhf-preference-reward|08]]／[[37-reward-is-rl-loss-credit-assignment|37]]／[[30-define-success-before-you-build|30]]／[[34-embedding-is-the-throughline|34]]。
:::

## 一句話帶走 · Takeaway

RL 的演算法（PPO）是現貨，真正的工程在 reward 與 observation 的設計。設 reward＝把「什麼叫好」寫進系統，很容易獎勵到鑽漏洞的捷徑；設 observation＝決定 agent 看得到什麼，看不到就學不會。這兩件事就是你親手寫 MDP——RL 的對齊與可信，不在程式碼裡，在這一刻。

::: en
RL's algorithm (PPO) is a commodity; the real engineering is designing the reward and the observation. Designing the reward writes "what counts as good" into the system and easily rewards a loophole shortcut; designing the observation decides what the agent can see, and it can't learn what it can't see. These two are you hand-writing the MDP — and RL's alignment and trustworthiness live not in the code but in that moment.
:::
