---
id: "07"
slug: prompt-techniques-pitfalls
tag: 提示工程
title: 提示工程技術地圖與它的陷阱
title_en: A Map of Prompt-Engineering Techniques — and Their Pitfalls
title_short: 提示工程技術地圖與它的陷阱
summary: few-shot、CoT 這些技巧讓模型更會「看起來對」；但「看起來對」不等於「對」，所以技巧的另一半是控制敏感度 + 驗證。
summary_en: Few-shot and CoT make a model better at "looking right" — but "looking right" isn't "being right," so the other half of these techniques is controlling sensitivity and verifying.
links: []
---
## 是什麼 · What it is

提示工程有一組由淺到深的常見技巧：

      <p>
        <strong>① Zero-shot</strong>：只給任務，直接要答案。<br>
        <strong>② Few-shot</strong>：附幾個高品質的輸入／輸出範例，讓模型推出你要的格式與標準。<br>
        <strong>③ Instruction prompting</strong>：明講任務、要求與受眾，而非靠範例；可再和 few-shot 合用。<br>
        <strong>④ Chain-of-Thought（CoT）</strong>：引導模型「一步一步想」——用示範（few-shot CoT）或一句「Let's think step by step」（zero-shot CoT）。對複雜推理、大模型幫助最大，簡單任務幫助有限。<br>
        <strong>⑤ Self-consistency</strong>：在溫度 &gt; 0 多抽幾個答案，再用多數決<strong>或實際驗證（如跑單元測試）</strong>挑一個。
      </p>

再往上還有自動化提示設計（APE、soft prompt）與「增強式」路線（檢索增強、program-aided、呼叫外部工具）。但日常用得最多的是 ①–⑤。

::: en
Prompt engineering has a ladder of common techniques. **① Zero-shot:** give the task, ask for the answer. **② Few-shot:** add a few high-quality input/output examples so the model infers your format and criteria. **③ Instruction prompting:** state the task, requirements, and audience explicitly rather than relying on examples; can be combined with few-shot. **④ Chain-of-Thought (CoT):** elicit step-by-step reasoning — via worked examples (few-shot CoT) or a cue like "Let's think step by step" (zero-shot CoT); it helps most on complex reasoning and large models, only slightly on simple tasks. **⑤ Self-consistency:** sample several answers at temperature &gt; 0, then pick one by majority vote **or by actually verifying it (e.g. running unit tests)**. Above these sit automatic prompt design (APE, soft prompts) and "augmented" routes (retrieval-augmented, program-aided, external tool calls) — but ①–⑤ cover most daily use.
:::

## 為什麼重要 · Why it matters

這些技巧真正的教訓不是「咒語」，是它們有多**脆**：同一個任務，光改格式、換範例、調範例順序，表現可以從「接近亂猜」擺到「接近 SOTA」。few-shot 還帶著**多數標籤偏誤、近因偏誤、常見詞偏誤**——選例要「相關且多樣」而非彼此雷同，順序用隨機，指令要具體、說「要做什麼」別只說「別做什麼」。

最該記住的一條，正好接 [[01-rag-faithfulness|RAG 忠實度]]與 [[05-how-llms-work|LLM 怎麼運作]]：**CoT 生出的「推理過程」常常不符事實，而不符事實的解釋往往伴隨錯誤的答案。**也就是說，一條讀起來很有條理的思路，不保證結論對——這就是為什麼 self-consistency 要「**驗**」（跑測試）而不是「**信**」（看起來有理）。提示技巧負責讓模型「更可能說對」，[[06-ai-loop-discipline|規格與驗證]]負責確認它「真的說對」。

::: en
The real lesson of these techniques isn't incantation — it's how **brittle** they are: for the same task, changing only the format, the examples, or the example order can swing performance from near-random to near-SOTA. Few-shot also carries **majority-label, recency, and common-token biases** — pick examples that are "relevant and diverse" rather than similar to each other, randomize order, and make instructions specific, saying what to do rather than only what to avoid.
:::

::: en
The one to remember connects straight to [[01-rag-faithfulness|RAG faithfulness]] and [[05-how-llms-work|how LLMs work]]: **CoT-generated "reasoning" is often nonfactual, and nonfactual explanations tend to accompany wrong answers.** A chain that reads as coherent does not guarantee a correct conclusion — which is exactly why self-consistency should **verify** (run tests), not **trust** (looks reasonable). Prompt techniques make the model "more likely to say the right thing"; [[06-ai-loop-discipline|spec and verification]] confirm it "actually said the right thing."
:::

::: src
出處 Source：Lilian Weng, "Prompt Engineering" (2023, lilianweng.github.io/posts/2023-03-15-prompt-engineering)，技術清單與各項警告（敏感度、few-shot 偏誤、CoT 解釋常不符事實）均出自此文，作者改寫重述。「技巧讓模型更可能說對、驗證才確認真的對」為作者綜述觀點（Author's view），與本站 [[01-rag-faithfulness|01]]／[[06-ai-loop-discipline|06]] 一致。
:::

## 一句話帶走 · Takeaway

few-shot／CoT 讓模型更會「看起來對」，但看起來對≠對：選例相關且多樣、順序隨機、說要做什麼；最後一定要「驗」而不是「信」。

::: en
Few-shot/CoT make a model better at "looking right," but looking right isn't being right: choose relevant, diverse examples, randomize order, say what to do — and in the end, verify rather than trust.
:::
