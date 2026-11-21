---
question: 詞向量怎麼把詞的語意變成向量?Transformer 的自注意力機制在算什麼、為何勝 RNN?大型語言模型(LLM)如何預訓練+微調,能力與限制為何?
keywords: [word-embedding, transformer-attention, large-language-model]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Word embedding [[raw:aic24-embedding-wikipedia]](CC BY-SA 4.0)、Transformer [[raw:aic24-transformer-wikipedia]](CC BY-SA 4.0)、Large language model [[raw:aic24-llm-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.24(Deep Learning for NLP)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# NLP 的深度學習 Deep Learning for NLP（AIMA Ch.24）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:用稠密**詞向量**表示語意、用 **Transformer 自注意力**建模全局 token 關係,大規模預訓練出 **LLM**;「分布假說」(由上下文定義語意)是底層哲學。(aic24-embedding-wikipedia)

## 1. 詞向量(word embedding)

- 把詞映到稠密向量,語意近的詞向量近。基於**分布假說**:「觀其友知其人」——詞義由上下文決定。(aic24-embedding-wikipedia)
- **word2vec**(skip-gram/CBOW)、**GloVe**(共現矩陣分解);著名 king−man+woman≈queen(類比的向量算術)。
- 局限:**靜態**(一詞一向量,無法分多義)→ 情境化向量(ELMo/BERT)解決。

## 2. Transformer 與自注意力

- **自注意力**:每個 token 用 Query·Key 算對其他 token 的注意力權重,加權 Value 聚合 → **全局**建模任意距離關係。(aic24-transformer-wikipedia)
  - Attention(Q,K,V)=softmax(QKᵀ/√d)V。多頭(multi-head)學不同關係子空間。
- **位置編碼**補序列順序(注意力本身無序)。
- 優於 RNN([[ai-deep-learning]]):**可平行**(非逐步)、長距依賴直接(無梯度消失) → 訓練大模型可行。

## 3. 大型語言模型(LLM)

- **預訓練**:在海量文本自監督(預測下一 token / 遮罩還原)→ 學通用語言表示。(aic24-llm-wikipedia)
- **微調 / 對齊**:監督微調 + RLHF([[ai-reinforcement-learning]] PPO)使其遵循指令、符合偏好。
- **能力**:few-shot/in-context learning、推理、生成。**限制**:幻覺(編造)、知識截止、無事實保證、對齊脆弱 → 需 RAG/檢索增強 + 驗證。

## 深化:注意力 worked + 縮放律 + 幻覺

### 自注意力 worked(直覺)
句 "it" 指代誰?自注意力讓 "it" 的 Query 與各詞 Key 相似度計算 → 對正確先行詞(如 "animal")給高權重,聚合其 Value → 情境化表示自動解指代。QKᵀ/√d 的 √d 縮放防 softmax 梯度過小。

### 縮放律(scaling laws)
模型表現隨**參數量、資料量、算力**冪律提升(Kaplan/Chinchilla)。Chinchilla:固定算力下,參數與資料應**同比例**增長(多數早期模型參數過大、資料不足)。這解釋「大就是好」的量化根據與最優配置。

### 幻覺與對齊(接 trustworthy AI)
LLM 生成是**機率續寫**,非事實查詢 → 可能流暢但錯(幻覺)。緩解:RAG(檢索真來源接地)、引用/溯源、事實一致性評測(faithfulness)——正是 Emma 研究的核心。對齊(RLHF/憲法 AI)讓輸出符合人類偏好但非真值保證。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| 詞向量都靜態 | word2vec 靜態;BERT/GPT 是**情境化**(同詞不同境不同向量) |
| 注意力有順序概念 | 自注意力**無序**,靠位置編碼補 |
| LLM 回答=事實 | 機率續寫,可能**幻覺**;需檢索接地 + 驗證 |
| 參數越多越好 | Chinchilla:參數與資料要**平衡**(算力最優) |

## 我的想法 / 啟發

- **這章是我研究的正中心**:LLM 的幻覺/對齊/RAG 接地/faithfulness 評測,正是 trustworthy AI 的戰場。資格考答這章可直接連結我的 agent/檢索工程。
- **分布假說 → 詞向量 → 注意力 → LLM** 是一條清楚的演進:語意的「上下文定義」哲學貫穿始終。接 [[ai-nlp]] 的 n-gram(也是上下文,但只局部窗)。
- **Transformer 可平行 + 長距直連**是「架構歸納偏好」([[ai-deep-learning]])的勝利:選對結構讓規模化可行——這就是現代 AI 的引擎。

## Next action / 下一步

1. 補 Transformer 完整結構(encoder/decoder、FFN、殘差)+ RLHF 流程。
2. 補 RAG 架構 + 幻覺評測指標(接我的研究線)。

## 交叉引用 / 出處
- raw:`wiki/raw/aic24-embedding-wikipedia.md`、`aic24-transformer-wikipedia.md`、`aic24-llm-wikipedia.md`
- [[ai-nlp]] — 經典 NLP 的超越;[[ai-deep-learning]] — Transformer 架構;[[ai-reinforcement-learning]] — RLHF 對齊;[[ai-intelligent-agents]] — LLM agent
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.24)
