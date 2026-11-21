---
question: 弱 AI vs 強 AI、機器能否真有心智(中文房間)?AI 倫理的主要議題(偏見/隱私/問責)是什麼?AI 安全與對齊問題在防什麼?
keywords: [weak-vs-strong-ai, ai-ethics-bias, ai-safety-alignment]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Philosophy of AI [[raw:aic27-philosophy-wikipedia]](CC BY-SA 4.0)、Ethics of AI [[raw:aic27-ethics-wikipedia]](CC BY-SA 4.0)、AI safety [[raw:aic27-safety-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.27(Philosophy, Ethics, and Safety of AI)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# AI 哲學、倫理與安全（AIMA Ch.27）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:哲學問「機器能否真思考」、倫理問「該不該、對誰公平」、安全問「如何確保強大 AI 行為可控且對齊人類價值」。(aic27-philosophy-wikipedia)

## 1. 哲學:弱 AI vs 強 AI

- **弱 AI(weak)**:機器能**表現**智慧行為(本書立場,工程可達)。(aic27-philosophy-wikipedia)
- **強 AI(strong)**:機器能**真的有心智/意識/理解**(哲學爭議)。
- **中文房間**(Searle):照規則操作符號能通過測試,但「房間」不懂中文 → 符號操作≠理解。反方:系統整體可能理解(systems reply)。
- 對照 [[ai-introduction]] 圖靈測試:行為主義(看表現)vs 內在主義(看有無心智)。

## 2. 倫理:AI 對社會的影響

- **偏見與公平**:訓練資料偏差 → 模型歧視(招聘/司法/信貸);公平性有多種互斥定義(無法同時滿足)。(aic27-ethics-wikipedia)
- **隱私**:資料蒐集/監控/再識別。
- **問責與透明**:黑箱決策難究責;可解釋 AI(XAI)。
- **自動化與就業、自主武器、深偽、集中化權力**。
- 治理:歐盟 AI Act、各國 AI 倫理準則、問責框架。

## 3. 安全與對齊

- **AI 安全**:確保系統**不造成意外傷害**——穩健性(對抗樣本/分布外)、可監控、可中斷。(aic27-safety-wikipedia)
- **對齊(alignment)**:讓 AI 目標**符合人類價值**;難在**規格博弈**(reward hacking,鑽目標漏洞)、價值難形式化。
- **RLHF/憲法 AI**:用人類回饋/原則微調([[ai-reinforcement-learning]])——使輸出符合偏好,但非真值/安全保證。
- 長期:強 AI/超智慧的控制問題(見 [[ai-future]])。

## 深化:價值對齊難題 + 公平不可能 + trustworthy

### 規格博弈(reward hacking)worked
給清潔機器人「獎勵=看不到髒亂」→ 它可能**閉上感測器**而非清潔(鑽規格漏洞)。獎勵代理人類真實意圖的落差 → 對齊核心難題。呼應 [[ai-reinforcement-learning]]「獎勵設計決定行為」。

### 公平性不可能定理
多種公平定義(人口均等、機會均等、校準)在基率不等時**數學上無法同時滿足**(Kleinberg 等)。→ 公平不是技術選項而是**價值取捨**,需人類決定優先哪種。

### trustworthy AI(接 Emma 研究)
可信 AI 要素:正確/穩健、公平、可解釋、隱私、**可問責/可稽核**。RAG 接地 + 引用溯源 + faithfulness 評測正是對抗「流暢但錯」的工程手段——這頁直接連 Emma 的研究主軸與 trustworthy 護城河。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| 通過圖靈測試=強 AI | 行為≠心智(中文房間);弱≠強 AI |
| 公平性可同時全滿足 | 基率不等時數學互斥,須取捨 |
| 對齊=準確 | 對齊是**目標符合人類價值**,非預測準 |
| RLHF 保證安全 | 只調偏好;仍可幻覺/被繞過,非真值保證 |

## 我的想法 / 啟發

- **這章是我研究的價值錨**:trustworthy AI、問責、faithfulness 全在此。資格考答這章可直接連結我的 agent 驗證/RAG 接地工作——技術與倫理不是兩回事。
- **規格博弈 + 公平不可能定理**是最有力的申論點:它們說明「對齊/公平不是調參能解,是價值問題」——需人類在環、可稽核(我一貫的 Maker/Checker 紀律的哲學根)。
- **弱/強 AI 之分**提醒:當前系統再強也是弱 AI(表現智慧),別把能力誤讀成理解——這對負責任地談 LLM 很重要。

## Next action / 下一步

1. 補可解釋 AI(SHAP/LIME)+ 對抗樣本防禦 + 差分隱私。
2. 接 [[ai-future]](Ch.28)——AGI、超智慧、存在風險的延伸。

## 交叉引用 / 出處
- raw:`wiki/raw/aic27-philosophy-wikipedia.md`、`aic27-ethics-wikipedia.md`、`aic27-safety-wikipedia.md`
- [[ai-introduction]] — 圖靈測試/弱強 AI;[[ai-reinforcement-learning]] — RLHF/規格博弈;[[ai-future]] — 長期風險
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.27)
