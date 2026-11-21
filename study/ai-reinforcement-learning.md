---
question: 強化學習從獎勵學什麼?MDP/Bellman 方程怎麼定義最優?Q-learning 為何 off-policy、TD 更新怎麼算?探索-利用如何權衡?
keywords: [reinforcement-learning, q-learning, exploration-exploitation]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Reinforcement learning [[raw:ai-rl-wikipedia]](CC BY-SA 4.0)、Q-learning [[raw:ai-qlearning-wikipedia]](CC BY-SA 4.0)、Temporal difference learning [[raw:ai-td-wikipedia]](CC BY-SA 4.0)。canonical=AIMA Ch.22(4e)/Ch.21(3e)(Reinforcement Learning)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 強化學習 Reinforcement Learning（AIMA Ch.22 4e / Ch.21 3e）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
> 一句話:代理在環境中試誤,靠**獎勵訊號**學一個最大化長期累積報酬的策略;不給標準答案,只給好壞回饋。(ai-rl-wikipedia)

## 1. MDP 與 Bellman

- 建模為 **MDP**:狀態 S、動作 A、轉移 P(s'|s,a)、獎勵 R、折扣 γ。目標=學策略 π 最大化 **E[∑ γᵗ rₜ]**。(ai-rl-wikipedia)
- **價值函數**:V^π(s)=從 s 起跟 π 的期望報酬;Q^π(s,a)=先做 a 再跟 π。
- **Bellman 最優方程**:Q*(s,a)=R(s,a)+γ·∑ P(s'|s,a) maxₐ' Q*(s',a')。最優策略=每狀態選 argmax Q*。

## 2. 無模型學習:TD 與 Q-learning

- **時序差分(TD)**:用後繼狀態的估計更新當前估計(bootstrapping),不需等整回合結束、不需環境模型。(ai-td-wikipedia)
  - TD 更新:V(s) ← V(s) + α[r + γV(s') − V(s)],中括號=**TD 誤差**。
- **Q-learning**(off-policy):Q(s,a) ← Q(s,a) + α[r + γ·**maxₐ' Q(s',a')** − Q(s,a)]。(ai-qlearning-wikipedia)
  - **off-policy**:更新用 max(貪婪目標),行為可用別的策略(如 ε-greedy)探索 → 學最優 Q 不受探索策略牽制。
  - **SARSA**(on-policy):用實際採取的 a' 而非 max → 學的是當前行為策略的 Q。

## 3. 探索 vs 利用

- **利用(exploit)**:選當前估計最好的動作;**探索(explore)**:試沒試過的以免錯過更好。(ai-rl-wikipedia)
- **ε-greedy**:機率 ε 隨機探索、1−ε 貪婪;或 UCB/樂觀初始值。探索不足 → 卡在次優。

## 4. 深化:Q-learning 更新 worked + Q vs SARSA + 收斂

### 4.1 Q-learning 更新 worked
狀態 s 做 a 得 r=5、到 s';α=0.1,γ=0.9。當前 Q(s,a)=2,s' 各動作 Q 最大 =10。
Q(s,a) ← 2 + 0.1·[5 + 0.9·10 − 2] = 2 + 0.1·[12] = **3.2**。TD 誤差 δ=12>0 → 此動作比預期好,上調。

### 4.2 Q-learning(off-policy) vs SARSA(on-policy)
同轉移 (s,a,r,s',a'),a' 由 ε-greedy 實際選到某非最優動作:
- **Q-learning**:用 max_{a'} Q(s',a') 更新(不管實際 a')→ 學**最優**策略,較激進。
- **SARSA**:用實際 Q(s',a') 更新 → 學**當前行為**策略,較保守。
**懸崖漫步**經典對比:Q-learning 學會走懸崖邊最短路(但 ε 探索時常摔);SARSA 學繞遠路避懸崖(考慮探索風險)。

### 4.3 收斂條件
Q-learning 收斂到 Q* 需:①所有 (s,a) 被無限次訪問 ②步長 α 滿足 Σα=∞, Σα²<∞(如 α=1/t)。TD/Q 是**無模型 + bootstrapping**:不需 P、R,用樣本估並以估計更新估計。

### 4.4 陷阱
| 陷阱 | 正解 |
|---|---|
| Q-learning=SARSA | Q 用 max(off-policy)、SARSA 用實際 a'(on-policy) |
| RL 需環境模型 | TD/Q **無模型**;value/policy iteration 才需模型 |
| 純利用最好 | 探索不足卡次優;需 ε-greedy/UCB 平衡 |
| TD 等回合結束才更新 | TD **單步** bootstrap,不等回合結束(對比 Monte Carlo) |

## 5. 延伸:函數近似 + 策略梯度 + 探索策略

### 5.1 函數近似(大/連續狀態)
表格 Q 無法存連續/巨量狀態 → 用參數化 Q_θ(s,a):
- **DQN**:神經網路估 Q + 經驗回放(打破相關)+ 目標網路(穩定) → Atari 突破。
- 風險:bootstrapping + off-policy + 函數近似 =「致命三元組」可能發散。

### 5.2 策略梯度(直接學策略)
不學 Q 而直接參數化策略 π_θ,沿 ∇J=E[∇log π_θ(a|s)·回報] 上升(REINFORCE)。**Actor-Critic**:actor 更新策略、critic 估價值降變異。**PPO/TRPO**:限制每步策略變化穩定訓練(現代 RLHF 用 PPO)。適合連續動作。

### 5.3 探索策略進階
ε-greedy 之外:**UCB**(樂觀面對不確定,見 [[ai-adversarial-search]] MCTS)、**Thompson 取樣**(後驗抽樣)、內在動機/好奇心(稀疏獎勵)。探索-利用在 bandit 問題有緊的 regret 下界。

### 5.4 model-based RL
學環境模型 P,R 再規劃(Dyna、MuZero)→ 樣本效率高。連回 [[ai-decision-making]] 的 value/policy iteration(有模型)——RL=「模型未知時邊學邊規劃」。

## 我的想法 / 啟發

- **RL = [[ai-probabilistic-reasoning]] 的 MDP + 從經驗估值**:expectiminimax/決策論給「已知模型下的最優」,RL 處理「模型未知、要邊做邊學」。這條線(搜尋→對抗→機率→決策→RL)資格考常串起來考。
- **Q-learning off-policy vs SARSA on-policy** 是高頻對比題:max(學最優、可能較激進) vs 實際 a'(學安全行為,如懸崖漫步 SARSA 更保守)。
- **TD 誤差 = 預測與現實的落差**,是 bootstrapping 的引擎;跟 [[dynamic-programming]] 的 Bellman 遞迴同源,差在 DP 需完整模型、TD 從樣本估。

## Next action / 下一步

1. 補 value iteration / policy iteration(已知模型 DP)對照 Q-learning(無模型)。
2. 建決策論/MDP(AIMA Ch.16-17)補 RL 的理論地基(效用/最優策略存在性)。

## 交叉引用 / 出處
- raw:`wiki/raw/ai-rl-wikipedia.md`、`ai-qlearning-wikipedia.md`、`ai-td-wikipedia.md`
- [[ai-probabilistic-reasoning]] — MDP 的機率轉移;[[dynamic-programming]] — Bellman 方程=DP;[[ai-adversarial-search]] — expectiminimax→MDP 期望決策
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.21/22 RL)
