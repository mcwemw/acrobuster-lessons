---
question: 理性決策=最大化期望效用怎麼來的?MDP 如何形式化序列決策?value iteration 與 policy iteration 差在哪?
keywords: [expected-utility, markov-decision-process, value-policy-iteration]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Markov decision process [[raw:ai-mdp-wikipedia]](CC BY-SA 4.0)、Expected utility hypothesis [[raw:ai-eu-wikipedia]](CC BY-SA 4.0)、Bellman equation [[raw:ai-bellman-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.16-17(Making Simple/Complex Decisions)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 決策論與 MDP Decision Making（AIMA Ch.16-17）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
> 一句話:理性代理=**最大化期望效用**;單步決策用效用理論,序列決策用 **MDP**,靠 Bellman 方程算最優策略。(ai-eu-wikipedia)

## 1. 期望效用(單步決策)

- **期望效用假說**:理性選擇=選期望效用 EU(a)=∑ P(s'|a)·U(s') 最大的動作。(ai-eu-wikipedia)
- **效用≠金錢**:效用函數常對財富**凹**(風險趨避);這解釋聖彼得堡悖論、保險。符合 von Neumann–Morgenstern 公理(完備/遞移/連續/獨立)者,其偏好可用效用函數表示。
- 決策網路(influence diagram)=貝氏網 + 決策節點 + 效用節點。

## 2. MDP(序列決策)

- **MDP** = ⟨S, A, P(s'|s,a), R(s,a), γ⟩;馬可夫性=下一狀態只依當前狀態與動作。(ai-mdp-wikipedia)
- 目標:求策略 π:S→A 最大化期望折扣報酬。**最優價值**滿足 **Bellman 最優方程**:
  V*(s)=maxₐ [R(s,a)+γ∑ P(s'|s,a)V*(s')]。(ai-bellman-wikipedia)

## 3. 求解:value iteration vs policy iteration

- **Value iteration**:反覆套 Bellman 更新 V 直到收斂(壓縮映射,保證收斂),再萃取貪婪策略。每步 O(|S|²|A|)。
- **Policy iteration**:交替 ①**策略評估**(解當前 π 的線性方程得 V^π)②**策略改進**(對 V^π 貪婪更新 π)。通常**更少迭代**收斂(策略空間有限),但每步評估較貴。
- 兩者都要**已知模型**(P、R);模型未知 → [[ai-reinforcement-learning]](Q-learning 從經驗學)。

## 4. 深化:value iteration worked + PI vs VI + 風險

### 4.1 Value iteration worked(2 狀態)
狀態 A,B;γ=0.9。A 做動作得 r=0 到 B;B 得 r=10 到 B(吸收)。
- V₀=[0,0]。
- V₁(B)=10+0.9·0=10;V₁(A)=0+0.9·0=0 → [0,10]。
- V₂(A)=0+0.9·10=9;V₂(B)=10+0.9·10=19 → [9,19]。
- 收斂:V(B)=10/(1−0.9)=100;V(A)=0.9·100=90。反覆套 Bellman 更新到 ‖ΔV‖<ε。

### 4.2 policy iteration vs value iteration
- **VI**:每步對所有狀態套 max Bellman 更新值,收斂後萃取策略。單步 O(|S|²|A|),迭代數多(幾何收斂 γᵏ)。
- **PI**:①策略評估(解 |S| 線性方程得 V^π,或迭代)②策略改進(貪婪)。**迭代數少**(策略空間有限,通常幾輪),但每輪評估較貴。
兩者都收斂到最優;VI=「評估一步就改進」的 PI 極限。

### 4.3 效用與風險
效用對財富**凹** → 風險趨避(保險、聖彼得堡悖論)。vNM 公理(完備/遞移/連續/獨立)成立 → 偏好可用期望效用表示。資格考常考「為何最大化期望金錢≠理性」(效用非線性)。

### 4.4 陷阱
| 陷阱 | 正解 |
|---|---|
| VI/PI 不需模型 | **需** P、R;無模型用 [[ai-reinforcement-learning]] |
| 理性=最大化期望金錢 | 最大化期望**效用**(對財富凹) |
| PI 迭代多 | PI 迭代**少**(但每輪評估貴);VI 迭代多但單步便宜 |
| γ 可任意 | γ∈[0,1);γ→1 收斂慢但重視長期 |

## 5. 延伸:POMDP + 收斂證明 + 博弈/VOI

### 5.1 POMDP(部分可觀測)
狀態不可直接觀測,只有帶雜訊的 observation。代理維護**信念狀態(belief)**=狀態的機率分布,在信念空間上做 MDP。信念更新用 Bayes([[ai-probabilistic-reasoning]])。精確解 PSPACE-hard;近似用 point-based value iteration。機器人定位/對話系統的框架。

### 5.2 value iteration 收斂(γ-壓縮)
Bellman 更新算子 T 是 **γ-壓縮**:‖TV−TV'‖∞ ≤ γ‖V−V'‖∞。由 Banach 不動點定理,反覆套 T 收斂到唯一不動點 V*,誤差每輪 ×γ(幾何)。給定 ε,O(log(1/ε)/log(1/γ)) 輪。這是 VI 為何保證收斂的根據。

### 5.3 決策網路 / 資訊價值(VOI)
influence diagram = 貝氏網 + 決策節點 + 效用節點。**資訊價值(VOI)**=取得某觀測後最優期望效用的提升;VOI≥0、遞減。回答「值不值得多做一個檢測/觀測」,是感測/實驗設計的理論。

### 5.4 博弈論接點
多代理下「最優」=**納許均衡**(無人想單方偏離);零和兩人=minimax([[ai-adversarial-search]])。機制設計、拍賣、合作博弈是 MDP/決策論在多代理的推廣([[ai-intelligent-agents]] 多代理環境)。

## 我的想法 / 啟發

- **MDP 是整條 AI 決策線的收束點**:[[ai-adversarial-search]] expectiminimax 的機會節點、[[ai-probabilistic-reasoning]] 的機率轉移、[[ai-reinforcement-learning]] 的無模型學習,全部站在「最大化期望效用」這個地基上。資格考愛考這條脈絡。
- **value iteration ↔ policy iteration** 是必考對比:VI 單純迭代值、PI 評估+改進兩步;PI 迭代數少但單步貴,是「收斂快慢 vs 每步成本」的權衡。
- **Bellman 方程=[[dynamic-programming]] 的 DP**:Bellman 本人就是 DP 之父;最優子結構在這裡以 V*(s) 遞迴呈現。

## Next action / 下一步

1. 補 value iteration 收斂證明(γ-壓縮)+ policy iteration 完整 trace。
2. 建邏輯推論(AIMA Ch.7-9)補符號 AI 另一支。

## 交叉引用 / 出處
- raw:`wiki/raw/ai-mdp-wikipedia.md`、`ai-eu-wikipedia.md`、`ai-bellman-wikipedia.md`
- [[ai-reinforcement-learning]] — 無模型版的 MDP 求解;[[dynamic-programming]] — Bellman=DP;[[ai-probabilistic-reasoning]] — 機率轉移/決策網路
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.16-17)
