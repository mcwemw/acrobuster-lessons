---
id: "01"
slug: rag-faithfulness
tag: RAG
title: RAG 忠實度三層：PASS / WARN / FAIL
title_en: "Three Tiers of RAG Faithfulness: PASS / WARN / FAIL"
title_short: RAG 忠實度三層
summary: 別只問 AI「有沒有附來源」，要問「來源到底有沒有支持這句」。
summary_en: Don't just ask whether the AI cited a source — ask whether the source actually supports the sentence.
links: []
---
## 是什麼 · What it is

RAG（檢索增強生成）讓語言模型先去「檢索」一批來源，再「生成」答案。但附上來源不等於有據——模型可能引了一篇文章，卻講出文章裡根本沒說的內容。**忠實度（faithfulness）**就是逐句去驗：這句話到底有沒有被它所引的來源支持。驗完分成三層：

      <p>
        <span class="tag-pass">PASS 有據</span>　句子被來源支持。<br>
        <span class="tag-warn">WARN 真但離題</span>　句子是真的，但不在這次檢索到的脈絡裡——模型在背書自己的記憶，不是用檢索證據。<br>
        <span class="tag-fail">FAIL 捏造</span>　來源完全不支持。
      </p>

::: en
RAG (Retrieval-Augmented Generation) lets a language model first *retrieve* sources, then *generate* an answer. But citing a source doesn't make a claim grounded — the model may cite an article yet say things the article never states. **Faithfulness** checks, sentence by sentence, whether each claim is actually supported by the source it cites, sorting them into three tiers: **PASS** (supported by the source), **WARN** (factually true, but outside the retrieved context — the model is drawing on its own memory, not the evidence), and **FAIL** (the source doesn't support it at all).
:::

## 為什麼重要 · Why it matters

一般 RAG 的 citation 檢查只看「*有沒有附來源*」，不驗「*來源有沒有支持這句*」。最危險的是中間那層 <span class="tag-warn">WARN</span>：答案看起來有憑有據、內容也是真的，卻不是從檢索證據來的——使用者最容易被這種「聽起來對」的答案騙。把 WARN 當成一個**獨立的失效類別**去抓，才擋得住這個灰色地帶。

::: en
Most RAG citation checks only verify that a source is *attached*, not that the source *supports the sentence*. The dangerous middle tier is <span class="tag-warn">WARN</span>: the answer looks grounded and is even true, yet it didn't come from the retrieved evidence — exactly the "sounds right" answer users are most likely to trust blindly. Treating WARN as a **distinct failure class** is what lets you catch this grey zone.
:::

::: src
出處 Source：作者研究框架（faithfulness 三層分類），延伸自 RAG 忠實度評測文獻（如 RAGTruth）。Author's framework, extending RAG faithfulness-evaluation work (e.g., RAGTruth).
:::

## 一句話帶走 · Takeaway

有引用 ≠ 有據。忠實度要逐句比對來源，而「真事實但離題（WARN）」是最該獨立抓出來的一類。

::: en
Cited ≠ grounded. Faithfulness means checking each sentence against its source — and "true but out-of-context" (WARN) is the class most worth isolating.
:::
