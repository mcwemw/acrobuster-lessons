---
question: AI 的「理性代理」怎麼定義?PEAS 與環境性質(可觀測/確定/靜態…)怎麼刻劃任務?代理架構從簡單反射到效用/學習有哪幾級?
keywords: [rational-agent, peas-environment, agent-architectures]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Intelligent agent [[raw:ai-agent-wikipedia]](CC BY-SA 4.0)、Rational agent [[raw:ai-rationalagent-wikipedia]](CC BY-SA 4.0)、Agent architecture [[raw:ai-agentarch-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.2(Intelligent Agents)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 智能代理 Intelligent Agents（AIMA Ch.2）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:AI 統一框架=**代理**——透過感測器感知、致動器行動;**理性代理**在給定感知序列與知識下,選期望績效最大化的行動。(ai-agent-wikipedia)

## 1. 理性代理

- **理性≠全知/完美**:在**已知資訊與可用資源**下做期望最好的選擇(bounded rationality),結果不保證最優。(ai-rationalagent-wikipedia)
- 理性取決於:績效量度、先驗環境知識、可執行動作、至今的感知序列。
- 與 [[ai-decision-making]] 的期望效用一致:理性=最大化期望績效/效用。

## 2. PEAS 與環境性質

- **PEAS** 刻劃任務:**P**erformance(績效)、**E**nvironment、**A**ctuators、**S**ensors。設計代理前先定 PEAS。
- **環境維度**(決定該用哪種代理/演算法):
  - 完全 vs 部分可觀測、單一 vs 多代理、確定 vs 隨機、片段 vs 序列、靜態 vs 動態、離散 vs 連續、已知 vs 未知。
  - 越難(部分可觀測+隨機+動態+連續)→ 越需 [[ai-probabilistic-reasoning]]/[[ai-reinforcement-learning]]。

## 3. 代理架構階梯

- **簡單反射**:只看當前感知套 condition-action 規則(無記憶)。(ai-agentarch-wikipedia)
- **基於模型反射**:維護內部狀態(世界模型)補部分可觀測。
- **基於目標**:考慮未來、用搜尋/規劃([[ai-search]]/[[ai-planning]])達目標。
- **基於效用**:多目標/不確定下用效用取捨([[ai-decision-making]])。
- **學習型**:以上任一 + 學習元件,從經驗改進([[ai-machine-learning]]/[[ai-reinforcement-learning]])。

## 4. 深化:PEAS worked + 環境維度判定 + 架構選型

### 4.1 PEAS worked(自駕計程車)
- **P**erformance:安全、合法、快速、舒適、利潤。
- **E**nvironment:道路、其他車/行人、天氣、交通號誌。
- **A**ctuators:方向盤、油門、煞車、喇叭、顯示。
- **S**ensors:相機、光達、GPS、速度計、里程計。

### 4.2 環境維度判定(自駕車)
部分可觀測(看不到所有車意圖)、**多代理**(其他車)、隨機(路況不可預測)、序列(現在決策影響未來)、動態(環境持續變)、連續(位置/速度)、未知(新路段)。→ 最難象限 → 需機率推論([[ai-probabilistic-reasoning]])+ 學習([[ai-reinforcement-learning]])+ 規劃([[ai-planning]])。

### 4.3 架構選型對照
| 環境特性 | 適用架構 |
|---|---|
| 完全可觀測+簡單規則 | 簡單反射 |
| 部分可觀測 | 基於模型反射(維護內部狀態) |
| 要達成目標+可搜尋 | 基於目標([[ai-search]]) |
| 多目標/不確定取捨 | 基於效用([[ai-decision-making]]) |
| 環境未知/需改進 | 學習型([[ai-reinforcement-learning]]) |

### 4.4 陷阱
| 陷阱 | 正解 |
|---|---|
| 理性=全知/完美 | 理性=**有限資源下期望最好**(bounded) |
| 簡單反射能處理部分可觀測 | 不行;需**內部狀態**(基於模型) |
| 環境維度與演算法無關 | **決定選型**(部分可觀測+隨機→MDP/信念狀態) |
| 學習型是獨立一類 | 是**任一架構+學習元件**的疊加 |

## 我的想法 / 啟發

- **「代理」是整個 AIMA 的骨架**:搜尋/對抗/CSP/邏輯/規劃/機率/決策/學習/RL 全是「給某種環境設計理性代理」的工具箱。這頁等於 AI 軌的**全景索引**,資格考答申論時可用此框架組織。
- **環境維度決定方法選型**:這是最實用的考點——看到「部分可觀測+隨機」就該想到信念狀態/MDP,「多代理」想到 [[ai-adversarial-search]]。
- **bounded rationality(有限理性)** 是誠實的理性觀:不是全知,是「用有限資源做期望最好」,呼應 [[randomized-algorithms]]/近似「不求最優求夠好有保證」的工程精神。

## Next action / 下一步

1. 補各架構的完整 agent program 偽碼 + 一個 PEAS 範例(如自駕車)完整環境維度判定。
2. (AI 軌已全建)回頭補各章 trace/證明深化,或接演算法軌 ★ 專門章。

## 交叉引用 / 出處
- raw:`wiki/raw/ai-agent-wikipedia.md`、`ai-rationalagent-wikipedia.md`、`ai-agentarch-wikipedia.md`
- [[ai-search]]/[[ai-planning]] — 目標型代理;[[ai-decision-making]] — 效用型;[[ai-reinforcement-learning]]/[[ai-machine-learning]] — 學習型;整頁=AI 軌全景
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.2)
