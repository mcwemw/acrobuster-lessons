---
id: "44"
slug: rl-end-of-control-ladder-value-vs-policy
tag: 代理工程
title: RL 是控制階梯的盡頭：沒模型又非線性時才上 model-free，而學 policy 有兩條路
title_en: "RL Is the End of the Control Ladder: Go Model-Free When You Have No Model and It's Nonlinear — and There Are Two Roads to a Policy"
title_short: RL：控制階梯的盡頭，兩條學 policy 的路
summary: 控制演算法是一道階梯——PID → pure-pursuit → Stanley → LQR → model-free RL，越往上處理越複雜；RL 是盡頭：當你沒有環境模型、系統又非線性，才跳上去。而 model-free RL 學 policy 有兩條路：value-based（學 Q 再貪婪，就是卡 37）vs policy-based（直接學 π）。policy gradient 的死穴是取樣沒效率，PPO 用「一次別改太多」的信賴域來解。
summary_en: Control algorithms form a ladder — PID → pure-pursuit → Stanley → LQR → model-free RL, each handling more complexity; RL is the end: you jump to it when you have no model of the environment and the system is nonlinear. And model-free RL has two roads to a policy: value-based (learn Q then act greedily — that's card 37) vs policy-based (directly learn π). Policy gradient's weakness is sample inefficiency, which PPO fixes with a "don't change too much at once" trust region.
---
## 是什麼 · What it is

這張接著 [[43-pid-present-past-future-of-error|卡 43 的控制]]往上走。投影片把控制演算法排成一道<strong>階梯</strong>：<strong>PID →</strong>（套進車體運動學）<strong>pure-pursuit →</strong>（顧漸進穩定）<strong>Stanley →</strong>（更複雜的運動模型）<strong>LQR →</strong>（<strong>不需要模型、處理非線性</strong>）<strong>model-free RL</strong>。換句話說，<strong>RL 是這道階梯的盡頭：當你連環境模型都沒有、系統又非線性到寫不出控制律，才跳上去「用經驗學」。</strong>

[[37-reward-is-rl-loss-credit-assignment|卡 37 已經講過 RL 的底層]]（MDP ⟨S,A,P,r,γ⟩、Bellman、Q-learning、TD、信用分配），這張只補那張課沒有的<strong>演算法地圖</strong>：

<p>
<strong>model-based（有 MDP → 用它規劃）</strong>：Monte-Carlo、動態規劃（value / policy iteration）、MPC、MCTS。<br>
<strong>model-free（沒 MDP → 靠取樣經驗學）</strong>，再分兩條學 policy 的路——<br>
　<strong>① value-based</strong>：先學一個價值函數（Q），再對它貪婪地選動作。Q-learning → <strong>DQN</strong>、NAF。<strong>這就是卡 37 那條。</strong><br>
　<strong>② policy-based</strong>：<strong>不繞價值、直接學策略 π</strong>。policy gradient → REINFORCE、TRPO、<strong>PPO</strong>；actor-critic 則兩者合體（A3C、DDPG、SAC）。
</p>

::: en
This continues upward from [[43-pid-present-past-future-of-error|card 43's control]]. The slides arrange control algorithms as a **ladder**: **PID →** (apply vehicle kinematics) **pure-pursuit →** (progressive stability) **Stanley →** (a more complex motion model) **LQR →** (**no model needed, handles nonlinearity**) **model-free RL**. In other words, **RL is the end of this ladder: you jump to it when you don't even have a model of the environment and the system is too nonlinear to write a control law for — so you "learn from experience" instead.** [[37-reward-is-rl-loss-credit-assignment|Card 37 already covered RL's foundations]] (the MDP ⟨S,A,P,r,γ⟩, Bellman, Q-learning, TD, credit assignment); this card adds the **algorithm map** that course didn't: **model-based** (you have the MDP → plan with it: Monte-Carlo, dynamic programming = value/policy iteration, MPC, MCTS) vs **model-free** (no MDP → learn from sampled experience), which splits into two roads to a policy — **① value-based**: learn a value function (Q) then act greedily on it (Q-learning → DQN, NAF — **this is card 37's road**); **② policy-based**: **skip value, directly learn the policy π** (policy gradient → REINFORCE, TRPO, **PPO**; actor-critic fuses both — A3C, DDPG, SAC).
:::

## 為什麼重要 · Why it matters

該帶走的第一件事：<strong>value-based 和 policy-based 是兩種截然不同的「怎麼得到 policy」。</strong>value-based 繞一圈——先學「每個動作值多少」再挑最大的；policy-based 更直接——<strong>把 π 本身當參數去優化</strong>，特別適合<strong>連續動作</strong>（機器人的方向盤、油門不是離散的），這也是為什麼機器人課的 HW3 要你用 <strong>PPO</strong> 讓車學會沿路徑跑。

但 policy gradient 有個著名死穴，也是最該帶走的：<span class="tag-warn">取樣效率很差——每次更新都要用當前策略重新互動取樣，一旦策略一步更新改太多，之前蒐集的經驗就作廢、還可能直接崩掉</span>。<strong>TRPO／PPO 的解法是「信賴域」：限制每次更新不要讓新策略離舊策略太遠。</strong>這個「<strong>小步、別跳太遠</strong>」的直覺，正是 [[08-rlhf-preference-reward|RLHF 那條 KL 繩]]的同一招（RLHF 本質就是把 PPO 用到語言模型上）——也跟 [[43-pid-present-past-future-of-error|feedback control 不信大跳、持續小修]]同精神：<strong>當你只有一個會變動又不可靠的估計，就別一次賭太大。</strong>

最後一個接回本站的點：投影片把 RL 跟其他學習法對照——<strong>reward 之於 RL，就像 label 之於監督式</strong>（[[37-reward-is-rl-loss-credit-assignment|獎勵是 RL 的 loss]]）；而「沒有明確 reward 的 RL」（curiosity-driven／skill-driven）對應無監督，「meta RL」對應元學習——也就是說，<strong>連「沒有獎勵也要先探索出有用技能」都有對應</strong>，那又是 [[36-exploration-vs-exploitation-dial|探索]]被推到極致的樣子。

::: src
出處 Source：Min-Chun Hu（胡敏君），NTHU《Robotic Navigation and Exploration》Unit 4「Reinforcement Learning」投影片（578101；RL 迴圈/meta-RL 圖註明 Botvinick et al. 2019）。控制階梯 review（PID→pure-pursuit→Stanley→LQR→model-free RL，各箭頭理由；LQR 解 DARE）、RL 定義（map situations→actions 以 max 數值 reward、agent-environment 迴圈 S_t/R_t/A_t、env emit S_{t+1}/R_{t+1}）、「reward=label、監督式 min expected error vs RL max expected sum of reward、unsupervised↔no-explicit-reward RL(curiosity/skill-driven)、meta-learning↔meta RL」、RL 演算法樹（MDP→model-based：Monte-Carlo／DP=value+policy iteration／MPC／MCTS；model-free→value-based：Q-learning/DQN/NAF；policy-based：policy gradient/REINFORCE/TRPO/PPO/actor-critic/A3C/DDPG/SAC）、MDP 5-tuple ⟨S,A,P,r,γ⟩ 與 π*=argmax E[Σγ^t r]、discount γ、stochastic P(s'|s,a)、reward=guide agent 的 signal、deterministic μ(s)→a vs stochastic π(s)→p(a|s)、sampling efficiency problem(TRPO&PPO) 均出自該投影片；PPO 為機器人課 HW3 指定（path following）。<br>「RL＝控制階梯盡頭(無模型+非線性才上)」「value-based vs policy-based＝兩條得到 policy 的路、policy-based 適合連續動作」「policy gradient 取樣沒效率→PPO 信賴域＝RLHF KL 繩同招＝不信大跳的 estimate/correct 母題」為作者綜述觀點（Author's view），對應本站 [[43-pid-present-past-future-of-error|43]]／[[37-reward-is-rl-loss-credit-assignment|37]]／[[08-rlhf-preference-reward|08]]／[[36-exploration-vs-exploitation-dial|36]]。
:::

## 一句話帶走 · Takeaway

控制演算法是一道階梯，RL 是盡頭：沒模型又非線性才上 model-free。它學 policy 有兩條路——value-based（學 Q 再貪婪，卡 37）vs policy-based（直接學 π，適合連續動作、機器人 HW3 的 PPO）。policy gradient 取樣沒效率，PPO 用信賴域「一次別改太多」解——那正是 RLHF 的 KL 繩、也是「別一次賭太大」的老母題。

::: en
Control algorithms form a ladder and RL is the end: go model-free only when you have no model and it's nonlinear. It reaches a policy by two roads — value-based (learn Q then act greedily, card 37) vs policy-based (directly learn π, good for continuous actions, the PPO in the robot HW3). Policy gradient is sample-inefficient, and PPO fixes it with a trust region that "doesn't change too much at once" — the very KL leash of RLHF, and the old theme of "don't bet too big in one step."
:::
