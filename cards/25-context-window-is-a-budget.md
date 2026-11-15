---
id: "25"
slug: context-window-is-a-budget
tag: AI 工程
title: 上下文視窗是預算，不是免費空間：為什麼要檢索——因為「塞好塞滿」會死在成本、雜訊、和「迷失在中間」
title_en: "The Context Window Is a Budget, Not Free Space: Why Retrieve at All — Because \"Stuff Everything In\" Dies on Cost, Noise, and Lost-in-the-Middle"
title_short: 上下文視窗是預算，不是免費空間
summary: 模型沒有記憶，每次呼叫都是獨立的——**你送進視窗的，就是它知道的全部**。而視窗是有限預算：把整個知識庫塞進去會三面受敵——每個 token 都計費（成本）、無關文字讓模型分心（雜訊）、而且「迷失在中間」讓放在中段的關鍵事實被忽略（位置）。所以當你不能全塞，你就**必須挑**——RAG 就是「自動挑」。而挑這個動作把風險搬到一個**可量測**的問題：「我們挑對文字了嗎？」
summary_en: "The model has no memory; each call is self-contained — **what you send is all it knows**. And the window is a finite budget: stuffing the whole knowledge base in fails three ways — every token is billed (cost), irrelevant text distracts (noise), and \"lost in the middle\" means key facts placed mid-context get ignored (position). So when you can't include everything, you **must select** — and RAG is automated selection. Selecting relocates the risk to a **measurable** question: \"did we select the right text?\""
links: []
---
## 是什麼 · What it is

Week 9 講義的核心問句是：**「模型看得到什麼？我們怎麼決定它看到什麼？」** 起點是一個模型答不了的問題——「Nimbus Notes 的 search service 聽哪個 port？」模型沒看過你的 repo／wiki／ADR，它要嘛說不知道、要嘛給個貌似合理的數字、要嘛矇對——**知識不在它的參數記憶裡**。解法是把知識放進上下文視窗，但視窗有代價：

| 「更多 context」的代價 | 為什麼痛 |
|---|---|
| **成本 / 延遲** | 視窗裡每個 token 每次呼叫都被處理、都計費（prompt caching 只省「重複的前綴」） |
| **雜訊** | 無關文字給模型更多可以「抓錯」的東西 |
| **位置** | 事實放在哪裡，會改變它到底有沒有被用到 ↓ |

**「迷失在中間」（Liu et al. 2023）**：在多文件問答與 key-value 檢索上，當關鍵資訊放在 context 的**開頭或結尾**時準確率最高、放在**中間**時最低——**連為長 context 設計的模型也一樣**。這很像人類記憶的「序列位置效應」（首尾最記得住）。實務後果：把最重要的材料放在**兩端**、別用「以防萬一」的段落灌水、**寧可少而精**。

::: en
Week 9's core question: "What does the model see, and how do we decide what it sees?" It starts from a question the model cannot answer — which port Nimbus Notes' search service listens on — because the knowledge isn't in its parametric memory. The fix is to put knowledge in the context window, but the window has costs: cost/latency (every token billed each call), noise (irrelevant text to latch onto), and position. **Lost in the Middle (Liu et al. 2023)**: on multi-document QA and key-value retrieval, accuracy is highest when the relevant information is at the beginning or end and lowest in the middle — even for long-context models — resembling the serial-position effect in human memory. So: put the most important material at the edges, don't pad with "just in case" passages, prefer fewer, better passages.
:::

## 為什麼重要 · Why it matters

把視窗當**預算**來想，「什麼進得去」就有三種策略（講義表）：

| 策略 | 做法 | 適合 |
|---|---|---|
| **全部塞進去**<br>（document injection） | 把文件直接貼進 prompt | 小而穩定的知識 |
| **選擇性檢索**<br>（RAG） | 先搜尋、只放相關段落 | 大或會變的知識 |
| **管理其餘** | 修剪／摘要舊對話、縮短工具結果、呼叫查詢工具 | 長對話；結構化資料 |

決定「全塞 vs 檢索」看五問：知識多大、多常變、多常被問、要不要秀來源、答案要多精確。Lewis et al.（2020）把底層想法講成**參數記憶（在權重裡）＋非參數記憶（一個你能讀能更新的索引）**；而 fine-tuning 改的是權重，適合**風格/格式**，是教「會變的事實」的爛方法。（Anthropic 2024 的 contextual retrieval 曾建議：知識庫若小於約 200K tokens 就整包塞進 prompt 並快取——講義自己標註「此數字可能過時，要用請查當前上限」，呼應 [[20-slopsquatting-supply-chain|卡 20]] 的「推薦≠現況」精神。）

這張卡的收斂點，也是它接上 Week 9 其他卡的地方（作者觀點 Author's view）：**當你不能全塞，你就必須「挑」；RAG 就是把「挑」自動化。而挑這個動作，把風險從「模型會不會幻覺」搬到一個可量測的問題——「我們挑對文字了嗎？」** 這正是 [[23-rag-two-failure-layers|卡 23]] 的檢索層（用 hit@k／MRR 免費、決定性地量）與 [[24-evaluate-the-evaluator|卡 24]] 的 Context Precision 指標在做的事。所以三張 Week 9 卡是一條線：**卡 25 說「為什麼要挑」→ 卡 23 說「挑完怎麼量兩層」→ 卡 24 說「量尺本身也要先驗」**。而把重要段落放兩端、寧少勿濫，又回到 [[01-rag-faithfulness|卡 01 的忠實度]]與 [[02-context-engineering|卡 02 的 Context 層]]。

::: src
出處 Source：CSIC30216 AI-in-the-Loop in Software Project Cycle，Week 9 Lecture《Context Management and Grounding (RAG)》，Dennis Wang 王邦任、Yu-Chun (Grace) Yen 顏羽君，NYCU Fall 2026（2026-11-02）。核心素材（投影片原文）：核心問句「What does the model see, and how do we decide what it sees?」；「context window is everything the model sees／no memory／self-contained」；「More context is not free」三代價（cost&latency／noise／position）；「put the most important material at the edges；do not pad with 'just in case' passages；fewer, better passages」；三策略表（include everything／retrieve selectively／manage the rest）；五問 include-vs-retrieve 表；pipeline 圖（documents→chunk→index｜retrieve→prompt→model→answer+source，offline/online 標註）；chunk size/overlap 機制；「selecting moves the risk: the question becomes 'did we select the right text?' — and that is measurable」。引用文獻：Liu et al.，《Lost in the Middle: How Language Models Use Long Contexts》，2023，arXiv:2307.03172；Lewis et al.，《Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks》，2020，arXiv:2005.11401；Anthropic，《Introducing Contextual Retrieval》，2024-09-19（講義標註數字可能過時）。本講義與 [[23-rag-two-failure-layers|卡 23]] lab 共用同一 Nimbus Notes corpus。作者改寫重述，未複製原文。「視窗是預算」「塞滿三面受敵」「挑的風險可量測＝接 23/24」為作者綜述觀點（Author's view），與本站 [[01-rag-faithfulness|01]]／[[02-context-engineering|02]]／[[23-rag-two-failure-layers|23]]／[[24-evaluate-the-evaluator|24]] 一致。
:::

## 一句話帶走 · Takeaway

上下文視窗是預算不是免費空間：全塞會死在成本、雜訊、和「迷失在中間」（關鍵事實放中段會被忽略，連長 context 模型也一樣）——所以重要的放兩端、寧少勿濫。當你不能全塞就必須挑，RAG 是自動挑；而挑把風險搬到一個可量測的問題：「我們挑對文字了嗎？」——這就是檢索評估的起點。

::: en
The context window is a budget, not free space: stuffing everything in dies on cost, noise, and lost-in-the-middle (key facts placed mid-context get ignored, even in long-context models) — so put important material at the edges and prefer fewer, better passages. When you can't include everything you must select; RAG is automated selection; and selecting relocates the risk to a measurable question: "did we select the right text?" — which is where retrieval evaluation begins.
:::
