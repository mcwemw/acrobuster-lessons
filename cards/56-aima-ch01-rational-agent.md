---
id: "56"
slug: aima-ch01-rational-agent
tag: AI/AIMA
title: "AIMA Ch01：AI 的四種定義與理性代理人框架"
title_en: "AIMA Ch01: Four Definitions of AI and the Rational Agent Framework"
title_short: AIMA Ch01 AI 定義
summary: R&N 提出 AI 的四種定義，最終選「理性代理人」：不是模仿人，而是在給定知識下最大化績效期望值。
summary_en: "R&N offer four definitions of AI, then commit to the 'rational agent': not mimicking humans, but maximising expected performance given available knowledge."
links: []
---
## 是什麼 · What it is

Russell & Norvig（AIMA 4th Ed. §1.1）把 AI 的定義拆成 **2×2 矩陣**：

| | 像人類（Human-like） | 理性（Rational） |
|---|---|---|
| **思考** | Thinking Humanly（認知科學） | Thinking Rationally（邏輯推理） |
| **行動** | Acting Humanly（Turing Test） | **Acting Rationally ← R&N 選這個** |

- **Acting Humanly（Turing Test）**：Turing（1950）提出以對話無法辨別為人機的測試；需要 NLP、知識表示、推理、學習。
- **Thinking Humanly（認知科學）**：要求模型與人腦的過程一致，不只是正確結果。
- **Thinking Rationally（邏輯推理）**：Aristotle 的三段論、FOL；難在把非形式知識形式化，且計算量爆炸。
- **Acting Rationally（理性代理人）**：在<strong>給定知識下，最大化績效期望值</strong>的行動選擇。不要求模仿人，也不一定用邏輯推理——只要能達成目標即可。

::: en
Russell & Norvig (AIMA 4th Ed. §1.1) organise the definitions of AI into a **2×2 matrix**: thinking vs. acting × human-like vs. rational. R&N commit to **Acting Rationally (the rational-agent approach)**: selecting actions that maximise expected performance given available percepts and built-in knowledge — without requiring human-like thought or strict logical deduction.
:::

::: src
出處 Source：Russell & Norvig, *Artificial Intelligence: A Modern Approach*, 4th Ed., §1.1（pp. 19–22），作者改寫重述。Paraphrased from R&N AIMA 4th Ed. §1.1.
:::

---

**理性代理人（Rational Agent）**

> 對每一個可能的感知序列，理性代理人應選擇能最大化其**績效測量（performance measure）**期望值的行動——以感知序列提供的證據及代理人內建的知識為依據。（§2.2）

PEAS 框架（§2.3）——描述任務環境的四要素：

| 要素 | 說明 |
|---|---|
| **P**erformance measure | 績效測量：成功的標準（例：掃地機器人清潔面積） |
| **E**nvironment | 環境：代理人所在的世界（例：有地毯的房間） |
| **A**ctuators | 執行器：代理人可做的動作（例：前進/轉向/吸塵） |
| **S**ensors | 感知器：代理人接收環境訊號的管道（例：攝影機/碰撞感測） |

> 理性 ≠ 全知（Omniscient）。理性是在<em>現有資訊</em>下做最好的預期決策；若嘗試收集更多資訊能提升績效，理性代理人應這樣做（= 學習）。

::: en
**Rational Agent (§2.2):** For each possible percept sequence, a rational agent selects the action that maximises its **performance measure** in expectation, given (a) the percept sequence so far and (b) whatever built-in knowledge it has. **PEAS** (§2.3) captures the four elements of a task environment: Performance measure, Environment, Actuators, Sensors. Rationality ≠ omniscience: a rational agent acts on the best available expected outcome, and should acquire more information when doing so improves performance.
:::

::: src
出處 Source：AIMA 4th Ed. §2.2–2.3（pp. 57–64），作者改寫重述。Paraphrased from R&N §2.2–2.3.
:::

---

**任務環境的七個維度**（§2.3，高頻考點）

| 維度 | 選項 | 說明 |
|---|---|---|
| 可觀察性 | 完全 / 部分 | 感測器能否看到環境完整狀態 |
| 代理人數 | 單一 / 多 | 是否有其他代理人影響結果 |
| 確定性 | 確定 / 隨機（/ 策略性） | 下一狀態是否完全由當前狀態+行動決定 |
| 情節性 | 情節 / 序列 | 行動是否影響未來情節 |
| 動態性 | 靜態 / 動態（/ 半動態） | 環境是否在代理人決策時自行改變 |
| 離散性 | 離散 / 連續 | 狀態/時間/感知/行動是否有限可數 |
| 知識 | 已知 / 未知 | 環境規則是否事先已知 |

例：西洋棋 = 完全可觀察、雙代理人、確定、序列、靜態、離散、已知。

::: en
The **seven dimensions of task environments** (§2.3, frequently tested): Observability (fully / partially), Number of agents (single / multi), Determinism (deterministic / stochastic), Episodic vs sequential, Dynamics (static / dynamic / semidynamic), Discreteness (discrete / continuous), Known vs unknown. Example: Chess = fully observable, multi-agent, deterministic, sequential, static, discrete, known.
:::

::: src
出處 Source：AIMA 4th Ed. §2.3（pp. 60–65），作者改寫重述。Paraphrased from R&N §2.3.
:::

## 為什麼重要 · Why it matters

選擇「理性代理人」作為 AI 的定義，決定了整本 AIMA 的研究方向：**搜尋、規劃、機率推理、學習**都是讓代理人在各種環境維度下達成理性行動的工具。考試時，「為什麼不選 Turing Test？」的回答就藏在這裡：Turing Test 是充分而非必要——能通過 Turing Test 的系統不一定是最有用的 AI（例如 Siri 不用真的像人才有用），且難以科學量化。

::: en
Choosing "acting rationally" as the definition of AI sets the agenda for the entire AIMA textbook: **search, planning, probabilistic reasoning, and learning** are all tools for achieving rational behaviour across different environment types. For exams: "Why not the Turing Test?" — it is sufficient but not necessary. A system that passes the Turing Test is not necessarily the most useful AI (Siri doesn't need to be human-like to be useful), and the test is hard to operationalise scientifically.
:::

::: src
出處 Source：AIMA 4th Ed. §1.1（pp. 19–22），作者觀點整合。Author's synthesis based on R&N §1.1.
:::

## 知識回答練習 · Knowledge Practice

**Define in your own words: (a) intelligence, (b) artificial intelligence, (c) agent, (d) rationality, (e) logical reasoning.**

**(a) Intelligence（智慧）**
感知環境、在知識與目標的驅動下作出決策，使預期結果最佳化的能力——不只是遵循固定規則，還能在新情境中調整行為。

**(b) Artificial Intelligence（人工智慧）**
設計能**感知**環境並**行動**以達成目標的系統之學問。涵蓋推理、學習、規劃、感知四大領域；AIMA 採「理性代理人」取向：讓機器在各種環境下最大化績效期望值，而非複製人類思維。

**(c) Agent（代理人）**
透過**感測器**感知環境、透過**執行器**對環境施加影響的系統。核心是「感知→決策→行動」迴圈：任何能將輸入（感知序列）映射到輸出（行動）的實體，都是代理人——從溫控器到自駕車，從軟體助理到人類。

**(d) Rationality（理性）**
對每一個可能的感知序列，選擇能最大化**績效測量**期望值的行動——以至今的感知序列及內建知識為依據。理性 ≠ 全知：在資訊有限下做「預期最好的選擇」才是理性；若收集更多資訊能提升績效，理性代理人應去收集。

**(e) Logical Reasoning（邏輯推理）**
從已知前提出發，依形式規則（三段論、一階邏輯推導規則）得出必然結論的過程。對應 2×2 矩陣的「理性思考」象限。AIMA 承認其價值，但指出兩項限制：①非形式知識難以完整形式化；②推理步驟的計算量容易爆炸，不總能在有限時間內求解。

> **考試提示**：這五個概念在 AIMA Ch.1 一起出現，出題常要求對比——特別是「rationality vs. logical reasoning」（理性行動≠邏輯推理：前者只要結果最佳；後者要求推導過程形式化，計算代價高）。

::: en
**(a) Intelligence**: The capacity to perceive an environment, reason under uncertainty, and act to maximise expected outcomes — going beyond fixed rules to adapt behaviour in novel situations.

**(b) Artificial Intelligence**: The science and engineering of designing systems (agents) that perceive their environment and act to achieve goals. AIMA adopts the **rational-agent** view: maximising expected performance, not mimicking human thought.

**(c) Agent**: Any entity that perceives its environment through sensors and acts on it through actuators. The defining loop is percept → decision → action. Examples range from a thermostat to a self-driving car.

**(d) Rationality**: For each possible percept sequence, selecting the action that maximises the expected value of the performance measure, given available percepts and built-in knowledge. Rationality ≠ omniscience — it means doing the best possible with available information, including gathering more information when that improves expected performance.

**(e) Logical Reasoning**: Deriving conclusions from premises via formal rules (syllogisms, first-order logic inference). Corresponds to the "Thinking Rationally" cell of the 2×2 matrix. AIMA notes two key limitations: (1) not all knowledge is easily formalised; (2) computation can explode, making it impractical as the sole approach to AI.

> **Exam tip**: The key contrast is *rationality vs. logical reasoning* — a rational agent does not need to use logical deduction; it only needs to pick the best-expected action. Logical reasoning is one possible mechanism, not a requirement.
:::

::: src
出處 Source：AIMA 4th Ed. §1.1–1.2 及作者整合重述。Author's synthesis based on R&N §1.1–1.2.
:::

---

## 一句話帶走 · Takeaway

R&N 不要「像人」，要「理性」：在已知資訊下最大化績效期望值的代理人，才是 AIMA 整個框架的錨點。考試遇到「四種 AI 定義」，先畫 2×2、記住 R&N 選右下角。

::: en
R&N don't want "human-like" — they want "rational": an agent that maximises expected performance given available knowledge is the anchor of the entire AIMA framework. On exams: draw the 2×2 matrix first, remember R&N pick the bottom-right cell.
:::
