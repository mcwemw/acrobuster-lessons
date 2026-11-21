---
question: AI 的四種定義取向(像人想/理性想/像人做/理性做)差在哪?圖靈測試測什麼、有何限制?AI 發展史的幾次起落與典範轉移?
keywords: [ai-definitions, turing-test, ai-history-paradigms]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Artificial intelligence [[raw:aic1-ai-wikipedia]](CC BY-SA 4.0)、Turing test [[raw:aic1-turing-wikipedia]](CC BY-SA 4.0)、History of AI [[raw:aic1-history-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.1(Introduction)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# AI 導論 Introduction（AIMA Ch.1）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:AIMA 以「**理性行動的代理**」統一 AI;定義分「思考 vs 行動 × 像人 vs 理性」四象限,本書選**理性行動(rational agent)**取向。(aic1-ai-wikipedia)

## 1. AI 的四種定義取向(AIMA 1.1)

兩軸交叉成四類:
- **像人地思考**(認知科學,建模人腦)。
- **理性地思考**(邏輯主義,正確推理法則)。
- **像人地行動**(圖靈測試,表現得像人)。
- **理性地行動**(**本書選**:理性代理,做期望最好的事)。
理性行動最可操作、不受人類認知限制綁住 → [[ai-intelligent-agents]] 的框架。

## 2. 圖靈測試

- **模仿遊戲**:若評審隔簾無法分辨對話對象是人或機器,則機器「通過」。測的是**行為表現**,不問內部機制。(aic1-turing-wikipedia)
- 需要的能力:自然語言([[ai-logic]] 之外的 NLP)、知識表示([[ai-logic]])、自動推理、機器學習([[ai-machine-learning]]);完整版(total Turing test)還要視覺/機器人([[ai-intelligent-agents]])。
- 批評:**中文房間**(Searle)——通過測試≠真理解;且 AIMA 認為「造會飛的機器不必模仿鳥」→ 理性取向不執著於像人。

## 3. 發展史與典範轉移

- **孕育**(1943-1956):McCulloch-Pitts 神經元、圖靈、達特茅斯會議(1956「AI」命名)。(aic1-history-wikipedia)
- **早期樂觀 → 第一次寒冬**(1970s):組合爆炸、感知機侷限(Minsky-Papert)、經費縮減。
- **知識系統/專家系統**(1980s)→ 商業泡沫 → **第二次寒冬**。
- **統計/機率轉向**(1990s-2000s):機率推論([[ai-probabilistic-reasoning]])、機器學習成主流,強調可驗證、資料驅動。
- **深度學習革命**(2010s-):大數據+GPU+神經網路([[ai-machine-learning]] 延伸),影像/語音/語言突破,至今的大模型時代。

## 深化:理性的務實定義 + 基礎學科

### 理性≠全知
理性 = 在**已知資訊與資源**下做期望效用最大的行動([[ai-decision-making]]);不是全知全能。**有限理性**(bounded rationality)承認計算受限 → satisficing。這讓「理性代理」可工程化。

### AI 的基礎學科
哲學(邏輯/心智)、數學(邏輯/機率/計算)、經濟學(效用/決策/賽局 [[ai-decision-making]])、神經科學、心理學、控制論、語言學。AI 站在多學科交會。

### 風險陷阱(資格考常出)
| 陷阱 | 正解 |
|---|---|
| 通過圖靈測試=有智慧/理解 | 行為表現≠理解(中文房間) |
| AI 要模仿人腦 | AIMA 選**理性行動**,不必像人 |
| AI 一路線性進步 | 經歷兩次寒冬;典範從符號→統計→深度學習 |
| 強 AI=弱 AI | 弱 AI=表現智慧行為;強 AI=真有心智/意識(哲學爭議 [[ai-intelligent-agents]]) |

## 我的想法 / 啟發

- **「理性行動代理」是整本 AIMA 的骨架**:後面搜尋/邏輯/機率/學習/RL 全是「如何造理性代理」的工具。這頁=AI 軌的總綱([[ai-intelligent-agents]] 是其具體化)。
- **符號→統計→深度學習的典範轉移**對應我的研究視角:AIMA 的統計轉向正是「可驗證、資料驅動」的根,呼應 trustworthy AI 的底色。
- **圖靈測試的行為主義 vs 中文房間的內在主義**是很好的申論切入:評量 AI 該看表現還是機制?

## Next action / 下一步

1. 補 AI 各子領域地圖(感知/推理/學習/行動)對應後續章節。
2. 接 [[ai-intelligent-agents]](Ch.2)把「理性」具體成 PEAS + 架構。

## 交叉引用 / 出處
- raw:`wiki/raw/aic1-ai-wikipedia.md`、`aic1-turing-wikipedia.md`、`aic1-history-wikipedia.md`
- [[ai-intelligent-agents]] — 理性代理的具體框架;[[ai-machine-learning]]/[[ai-probabilistic-reasoning]] — 統計典範
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.1)
