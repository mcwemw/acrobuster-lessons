---
id: "57"
slug: aima-ch02-intelligent-agents
tag: 模型原理
title: "AIMA Ch02：理性代理、PEAS 與代理架構階梯"
title_en: "AIMA Ch02: Rational Agents, PEAS, and the Agent Architecture Ladder"
title_short: AIMA Ch02 代理架構
summary: AI 的統一框架是「代理」：感測環境、依績效量度選行動；PEAS 刻劃任務，七維環境決定選哪種架構——從簡單反射到學習型五級。
summary_en: "The unifying AI framework is 'agent': perceive the environment, select actions to maximise a performance measure. PEAS describes the task; seven environment dimensions determine which architecture—simple reflex through learning agent—is appropriate."
links: []
---
## 是什麼 · What it is

**代理（Agent）** = 透過感測器感知環境、透過致動器行動的系統（AIMA 4th Ed. §2.1）。

**理性代理（Rational Agent, §2.2）**：對每一個可能的感知序列，選擇能最大化**績效量度（performance measure）**期望值的行動——以至今的感知序列及代理人內建的知識為依據。

> 理性 ≠ 全知（omniscience）。理性 = 在**現有資訊與計算資源**下做期望最好的選擇（bounded rationality）。若收集更多資訊能提升績效，理性代理應去收集——即**學習**。

::: en
An **agent** perceives its environment via sensors and acts via actuators (§2.1). A **rational agent** (§2.2) selects, for each possible percept sequence, the action that maximises its **performance measure** in expectation given available percepts and built-in knowledge. Rationality ≠ omniscience: a rational agent acts on the best available expected outcome and should gather more information when doing so improves performance.
:::

::: src
出處 Source：Russell & Norvig, *Artificial Intelligence: A Modern Approach*, 4th Ed., §2.1–2.2（pp. 55–60），作者改寫重述。Paraphrased from R&N AIMA 4th Ed. §2.1–2.2.
:::

---

**PEAS 框架（§2.3）**——設計代理前先回答四個問題：

| 要素 | 說明 | 自駕計程車範例 |
|---|---|---|
| **P**erformance | 績效量度：怎樣算成功 | 安全、合法、快速、乘客舒適、利潤 |
| **E**nvironment | 環境：代理人所在世界 | 道路、其他車輛/行人、天氣、號誌 |
| **A**ctuators | 致動器：可執行的動作 | 方向盤、油門、煞車、喇叭、顯示器 |
| **S**ensors | 感測器：接收環境資訊的管道 | 相機、光達、GPS、速度計、里程計 |

::: en
**PEAS** (§2.3): before designing an agent, specify **P**erformance measure, **E**nvironment, **A**ctuators, and **S**ensors. Example — self-driving taxi: P = safety/legality/speed/comfort/profit; E = roads/vehicles/pedestrians/traffic; A = steering/throttle/brakes/horn; S = cameras/lidar/GPS/speedometer.
:::

::: src
出處 Source：AIMA 4th Ed. §2.3（pp. 60–65），作者改寫重述。Paraphrased from R&N §2.3.
:::

---

**任務環境七維度（§2.3）**——決定要選哪種代理架構：

| 維度 | 選項 | 越難的方向 |
|---|---|---|
| 可觀察性 | 完全 / 部分 | 部分 → 需內部狀態 |
| 代理人數 | 單一 / 多 | 多 → 需博弈推理 |
| 確定性 | 確定 / 隨機（/ 策略性） | 隨機 → 需機率推論 |
| 情節性 | 情節 / 序列 | 序列 → 需規劃 |
| 動態性 | 靜態 / 動態（/ 半動態） | 動態 → 決策時環境在變 |
| 離散性 | 離散 / 連續 | 連續 → 需連續狀態方法 |
| 知識 | 已知 / 未知 | 未知 → 需探索/學習 |

自駕車 = 部分可觀察、多代理、隨機、序列、動態、連續、未知 → **最難象限**，需機率推論 + 規劃 + 強化學習。

::: en
The **seven environment dimensions** (§2.3) determine which algorithm/architecture fits: partially observable → need internal state; multi-agent → game-theoretic reasoning; stochastic → probability; sequential → planning; dynamic → decisions under time pressure; continuous → continuous-state methods; unknown → exploration/learning. Self-driving cars hit all the hard ends simultaneously.
:::

::: src
出處 Source：AIMA 4th Ed. §2.3（pp. 60–65），作者改寫重述。Paraphrased from R&N §2.3.
:::

---

**代理架構五級階梯（§2.4）**：

| 架構 | 核心 | 適用環境 |
|---|---|---|
| 簡單反射（Simple Reflex） | condition-action 規則，只看當前感知 | 完全可觀察 + 無記憶需求 |
| 基於模型反射（Model-based Reflex） | 維護**內部世界模型**補部分可觀察 | 部分可觀察 |
| 基於目標（Goal-based） | 目標 + 搜尋/規劃決定行動序列 | 需達成明確目標 |
| 基於效用（Utility-based） | 效用函數取捨多目標/不確定性 | 多目標衝突或隨機結果 |
| 學習型（Learning） | 以上任一架構 + **學習元件**，從經驗改進 | 未知/非穩態環境 |

> 學習型不是獨立類別，而是**任何架構 + 學習元件**的疊加。

::: en
The **five-level architecture ladder** (§2.4): **Simple Reflex** (condition-action rules, no memory); **Model-based Reflex** (internal world model for partial observability); **Goal-based** (search/planning to reach goals); **Utility-based** (utility function to trade off competing objectives); **Learning agent** (any architecture + learning component that improves with experience). Learning agents are not a separate category — they are an overlay on any of the above.
:::

::: src
出處 Source：AIMA 4th Ed. §2.4（pp. 66–75），作者改寫重述。Paraphrased from R&N §2.4.
:::

## 為什麼重要 · Why it matters

AIMA Ch02 是整本書的**全景索引**：後面每一章（搜尋、邏輯、機率、規劃、學習、強化學習）都是「讓代理在某種環境維度組合下理性行動」的工具。

考試策略：遇到「描述某系統的代理設計」→先填 PEAS → 判定七維度 → 由難易選架構。部分可觀察 + 隨機 → 信念狀態 / MDP；多代理 → 對抗搜尋/機制設計。

LLM agent 的現代對應：感知 = prompt/工具回傳，行動 = 工具呼叫，記憶 = context/向量庫，學習 = fine-tuning/RLHF。ReAct（推理+行動交錯）正是本章「基於目標 + 學習型」在 LLM 時代的體現。

::: en
Ch02 is the **master index** for all of AIMA: every subsequent chapter (search, logic, probability, planning, learning, RL) is a tool for making agents rational under some combination of environment dimensions. Exam strategy: given a system description → fill PEAS → classify seven dimensions → pick architecture tier. Modern LLM agents map directly onto this framework: perception = prompts/tool returns, action = tool calls, memory = context/vector store, learning = fine-tuning/RLHF.
:::

::: src
出處 Source：AIMA 4th Ed. §2.1–2.4（pp. 55–75）及作者觀點整合。Author's synthesis based on R&N §2.1–2.4.
:::

## 一句話帶走 · Takeaway

PEAS 先填、七維度判環境、五級架構選設計；越難（部分可觀察 + 隨機 + 動態）就往架構階梯上爬。整個 AIMA 都是這張表的具體化。

::: en
Fill PEAS first, classify environment dimensions second, pick architecture tier third. The harder the environment (partially observable + stochastic + dynamic), the higher up the ladder you go. All of AIMA is an elaboration of this single table.
:::
