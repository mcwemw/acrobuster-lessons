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

**代理設計範例（PREP 論述結構）**

> **Point（論點）**：「外送機器人」在最難維度組合下，需要學習型 + 效用型架構。
>
> **Reason（理由）**：環境維度直接決定演算法工具——部分可觀察逼出內部模型，隨機逼出機率推論，序列性逼出規劃，多代理逼出博弈推理；一個環境若同時觸發多個「難」軸，架構就必須疊加對應能力。
>
> **Example（例證）**：
>
> | PEAS 要素 | 外送機器人 |
> |---|---|
> | **P**erformance | 準時送達、零碰撞、最短路徑、低電耗 |
> | **E**nvironment | 街道、行人、車輛、紅綠燈、天候 |
> | **A**ctuators | 馬達、轉向、剎車、蜂鳴器 |
> | **S**ensors | GPS、相機、距離感測、里程計 |
>
> 七維度判定：**部分可觀察**（無法看到所有行人意圖）、**多代理**（其他車輛/行人）、**隨機**（天候/行人路徑不可預期）、**序列**（路線決策影響後續）、**動態**（即時交通持續變化）、**連續**（位置/速度）、**未知**（首次跑的新路段）→ 7/7 全命中難側。
>
> 架構選型：簡單反射不夠（部分可觀察）→ 需**基於模型**（維護世界狀態）；多目標衝突（速度 vs 安全）→ 需**效用函數**；新環境動態未知 → 需**學習元件**。最終：**學習型效用代理 + 信念狀態 + 規劃**。
>
> **Point（結論）**：PEAS → 七維 → 架構這條流程，讓申論題有系統性骨幹，不必靠直覺列舉；每個維度都對應一個「不夠就升架構」的充分理由。

LLM agent 的現代對應：感知 = prompt/工具回傳，行動 = 工具呼叫，記憶 = context/向量庫，學習 = fine-tuning/RLHF。ReAct（推理+行動交錯）正是本章「基於目標 + 學習型」在 LLM 時代的體現。

::: en
Exam strategy for "describe the agent design of a system" — use the **P-R-E-P** structure:

**Point**: A food-delivery robot operating in a fully hard environment requires a learning + utility-based architecture.

**Reason**: Environment dimensions directly map to algorithm needs — partial observability demands an internal model; stochasticity demands probabilistic reasoning; sequential decisions demand planning; multi-agent settings demand game-theoretic reasoning. When multiple "hard" dimensions fire simultaneously, the architecture must stack corresponding capabilities.

**Example** — Food Delivery Robot: P = on-time/collision-free/shortest path/low battery; E = streets/pedestrians/vehicles/traffic lights/weather; A = motors/steering/brakes/horn; S = GPS/cameras/range sensors/odometer. All 7 dimensions hit the "hard" end: partially observable, multi-agent, stochastic, sequential, dynamic, continuous, unknown. Architecture chain: simple reflex insufficient → model-based (track world state) → utility (trade off speed vs safety) → learning (handle unknown routes). Result: **learning + utility-based agent with belief state and planning**.

**Point**: The PEAS → dimensions → architecture pipeline gives exam answers a systematic skeleton rather than an ad-hoc list; each hard dimension is a justified reason to move one step up the architecture ladder.
:::

::: src
出處 Source：AIMA 4th Ed. §2.1–2.4（pp. 55–75）及作者觀點整合。Author's synthesis based on R&N §2.1–2.4.
:::

## 互動視覺化導覽 · Interactive Visualisation Guide

**jsurrea AIMA Visualizations — Chapter 02**（`jsurrea.github.io/aima-visualizations/chapter-02/`）提供 6 個互動模組，把本章核心概念帶進可操作的動態環境：

| # | 模組 | 核心互動 | 關鍵學習點 |
|---|---|---|---|
| 1 | **Rationality & Performance Measures** | 切換三種評分規則 × 四種初始狀態 | ①「+1/clean room」→正確；②「+10/Suck」→ King Midas 誘因扭曲；③「−1/action」→代理選 NoOp 躺平。理性≠好績效，**績效定義決定一切** |
| 2 | **PEAS Framework Builder** | 點選 5 種代理（Taxi/醫療/影像/購物/西洋棋）→即時渲染 4 欄表格 | 練習「先填 PEAS 再設計」的工程直覺；看各欄如何因任務而異 |
| 3 | **Environment Properties** | ①書中範例 + 難度條；②🔧自訂七維度 → 自動推薦架構 | 七維度難易如何映射到架構選型；`n/7 hard` 視覺化讓「越難越往上爬」直觀呈現 |
| 4 | **Agent Type Explorer** | 點選五級架構查組件與範例 | 每級「多了什麼」（+model / +goals / +utility / +learning）逐層累積 |
| 5 | **Vacuum World — Simple Reflex** | play/pause/step；調初始狀態看不同路徑 | Condition-action 規則的極限：完全可觀察才有效；若遮蔽一格即失敗 |
| 6 | **Vacuum World — Model-Based** | 與模組 5 並排對比 | 內部模型如何彌補部分可觀察缺口；兩者行為差異清楚說明「模型」的價值 |

**設計特點**：每組件均含教學說明文字 + 可逐步播放的動畫 + 鍵盤導航；評分動畫特別適合解釋「理性代理不是最優解，是期望最優解」。

::: en
The jsurrea AIMA Visualizations site (chapter-02) has six interactive modules: (1) **Rationality & Performance Measures** — toggle three scoring rules (correct / King Midas perverse-incentive / action-minimising misalignment) across four initial states to see how the performance measure definition drives agent behaviour; (2) **PEAS Framework Builder** — click five canonical agents to explore their four-column PEAS tables; (3) **Environment Properties** — classify book examples by their seven dimensions, or build a custom environment and get an architecture recommendation; (4) **Agent Type Explorer** — browse all five architecture tiers with component lists and real-world examples; (5–6) **Vacuum World (Simple Reflex vs Model-Based)** — step-by-step animation comparing the two architectures side by side, illustrating exactly how an internal world model compensates for partial observability.
:::

::: src
出處 Source：jsurrea, *AIMA Visualizations*, Chapter 02 — Intelligent Agents，開源 MIT，`github.com/jsurrea/aima-visualizations`（2026-11-22 閱覽），作者觀點重述。Open-source MIT project; author's paraphrase of visualisation content.
:::

---

## 一句話帶走 · Takeaway

PEAS 先填、七維度判環境、五級架構選設計；越難（部分可觀察 + 隨機 + 動態）就往架構階梯上爬。整個 AIMA 都是這張表的具體化。

::: en
Fill PEAS first, classify environment dimensions second, pick architecture tier third. The harder the environment (partially observable + stochastic + dynamic), the higher up the ladder you go. All of AIMA is an elaboration of this single table.
:::
