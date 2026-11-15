---
id: "05"
slug: how-llms-work
tag: 模型原理
title: LLM 怎麼運作：下一個字預測 + 注意力
title_en: "How LLMs Work: Next-Token Prediction + Attention"
title_short: LLM 怎麼運作
summary: 模型不是在「查資料庫」，是在猜「最可能的下一個字」；attention 讓它決定每個詞該看句中哪些詞。
summary_en: The model isn't "looking up a database" — it's guessing the "most likely next token"; attention lets it decide which words in the sentence each word should look at.
links: []
---
## 是什麼 · What it is

LLM 的運作，剝到最裸的直覺是兩件事：

      <p>
        <strong>① 預測下一個 token</strong>：模型看前面的文字，輸出「下一個字最可能是什麼」的<strong>機率分布</strong>，然後一個一個往下接。它不是從資料庫撈事實，是在生成「最像樣的接續」。<br>
        <strong>② 注意力（self-attention）</strong>：處理某個詞時，模型會「看」句子裡其他詞來決定它的意思。經典例子：「The animal didn't cross the street because <em>it</em> was too tired」——模型靠 attention 把「it」連回「animal」，而不是「street」。
      </p>

直覺上（不碰數學）：每個詞被投影成 Query / Key / Value 三個向量，用 query·key 算出「這個詞該多關注其他哪些詞」，softmax 加權後把相關詞的理解「揉」進來。pre-training（讀海量文本學語言）和 instruction tuning（學著聽人話）造成模型行為的差異，也是這套機制上長出來的。

::: en
At its barest intuition, an LLM does two things: **① Next-token prediction** — given the text so far, it outputs a **probability distribution** over "what the next token most likely is," then appends one token at a time. It isn't retrieving facts from a database; it's generating the "most plausible continuation." **② Self-attention** — when processing a word, the model "looks at" other words in the sentence to decide its meaning. The classic example: "The animal didn't cross the street because *it* was too tired" — attention links "it" back to "animal," not "street." Intuitively (no math): each word is projected into Query / Key / Value vectors; query·key decides how much a word should attend to others, and a softmax-weighted sum blends the relevant words' meaning in. The gap between pre-training (learning language from vast text) and instruction tuning (learning to follow instructions) grows out of this same machinery.
:::

## 為什麼重要 · Why it matters

知道模型是在「預測最可能的接續」而非「查真相」，幾乎解釋了這整個站的其他卡：[[03-intent-output-gap|意圖↔輸出落差]]之所以存在，是因為模型接的是「統計上最可能」的話，不是你心裡的意思；[[01-rag-faithfulness|RAG 的 WARN／幻覺]]之所以發生，是因為「聽起來最合理」的接續，不一定被檢索證據支持。**先懂機制，才知道該怎麼 prompt、怎麼評估、哪裡要加護欄。**

::: en
Knowing the model predicts the "most likely continuation" rather than "looks up the truth" explains almost every other card here: the [[03-intent-output-gap|intent–output gap]] exists because the model continues with what is *statistically* most likely, not what you meant; RAG's [[01-rag-faithfulness|WARN / hallucination]] happens because the "most plausible-sounding" continuation isn't necessarily supported by the retrieved evidence. **Understand the mechanism first, and you'll know how to prompt, how to evaluate, and where to add guardrails.**
:::

::: src
出處 Source：CSIC30216《AI-in-the-Loop》Week 1 自學模組（Dennis Wang 王邦任）＋ Jay Alammar《The Illustrated Transformer》，作者改寫重述。CSIC30216 Week 1 self-paced module (Dennis Wang) + Jay Alammar, "The Illustrated Transformer" — paraphrased by the author.
:::

## 一句話帶走 · Takeaway

LLM 是在猜「最可能的下一個字」，不是查資料庫；attention 是它決定「每個詞該看句中哪些詞」的方法。懂這點，落差與幻覺就都說得通了。

::: en
An LLM guesses the "most likely next token," not a database lookup; attention is how it decides "which words each word should look at." Grasp this, and both the gap and hallucination make sense.
:::
