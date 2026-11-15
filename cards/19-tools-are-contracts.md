---
id: "19"
slug: tools-are-contracts
tag: 代理工程
title: 工具不是能力，是契約：模型呼叫工具仍然只是在猜，所以「定義工具」就是寫介面規格
title_en: "A Tool Isn't a Capability, It's a Contract: Calling a Tool Is Still Prediction — So Defining Tools Is Interface Design"
title_short: 工具不是能力，是契約：定義工具就是寫介面規格
summary: 模型本身不會「做事」——它只會輸出下一個 token。所謂「呼叫工具」只是模型吐出一段結構化的 tool call（name＋arguments），由外部 runtime 真正執行再把結果塞回對話。所以工具呼叫的品質，等於模型對「你寫的那份工具描述」做 next-token 預測的品質。把工具寫好，是介面設計，不是 prompt 技巧。
summary_en: A model doesn't "do things" — it emits the next token. A "tool call" is just the model producing a structured call (name + arguments) that an external runtime actually executes, feeding the result back. So the quality of a tool call equals the quality of the model's next-token prediction conditioned on the tool description you wrote. Writing good tools is interface design, not a prompting trick.
links: []
---
## 是什麼 · What it is

四個一手來源，從「工具呼叫怎麼運作」一路講到「工具其實是一紙介面契約」：

| 來源 | 核心貢獻 | 對工程的意義 |
|---|---|---|
| **ReAct**<br>Yao et al. 2022<br>(ICLR 2024) | 把推理與行動交錯：thought → action → observation → thought…。推理步驟讓模型規劃、追蹤、處理例外；行動步驟去外部來源抓資訊回饋給下一步。在 ALFWorld / WebShop 比模仿學習與 RL 高 **34% / 10%** 絕對成功率，只需一兩個 in-context 範例。 | 把 action 接地在 reasoning 上，顯著減少 CoT 的幻覺與錯誤傳播——別讓模型盲目呼叫，每步先想為什麼 |
| **Toolformer**<br>Schick et al. 2023 (Meta) | 模型用**自監督**方式自學「該呼叫哪個 API、何時呼叫、傳什麼參數、如何把結果併進輸出」，每個 API 只需少量示範；自監督訊號＝只保留真的幫到模型下一步預測的呼叫。工具：計算機、QA、兩個搜尋引擎、翻譯、日曆。zero-shot 大幅提升，常與大上許多的模型打平。 | tool use 是**學出來**的能力，不是外掛魔法——模型是否會用工具、用得好不好，取決於訓練與介面，而非一句咒語 |
| **Define Tools**<br>Claude 官方文件 | 一個工具定義 = <code>name</code> + <code>description</code> + <code>input_schema</code>(JSON Schema)。官方直說：「提供**極度詳細的描述**是目前為止影響工具效能最重要的因素」——描述要講清楚做什麼、何時該用（和何時不該用）、每個參數的意義、重要限制。 | 工具的 name/description/schema 就是它的**規格**；規格寫爛，模型（跟人一樣）就呼叫錯 |
| **MCP**<br>Model Context Protocol | 把「怎麼把工具／脈絡提供給模型」標準化成 client–host–server 協定。Host（如 Claude Code／VS Code）為每個 server 開一個 client；server 用三種 primitives 曝露：**Tools**(可執行動作)、**Resources**(脈絡資料)、**Prompts**(互動範本)。走 JSON-RPC 2.0，client 用 <code>tools/list</code> 探索、<code>tools/call</code> 執行。 | 介面定義一次，任何 host 都能接——工具從「綁死某個 app」變成**可攜的契約** |

官方文件的其他最佳實務也都是「介面設計」而非「提示技巧」：有意義的命名空間（<code>github_list_prs</code> 而非 <code>calculate</code>）、把相關操作合併成少數幾個帶 <code>action</code> 參數的工具（而非 <code>create_pr</code>/<code>review_pr</code>/<code>merge_pr</code> 各一個以降低選擇歧義）、複雜輸入給 <code>input_examples</code>、工具回傳只給高訊號資訊（穩定的 slug/UUID，而非臃腫內部欄位）。

::: en
Four primary sources trace tool use from "how it works" to "a tool is an interface contract." **ReAct** (Yao et al. 2022, ICLR 2024) interleaves reasoning and acting (thought → action → observation), grounding actions in reasoning to cut CoT hallucination and error propagation — +34% / +10% absolute success on ALFWorld / WebShop with one or two in-context examples. **Toolformer** (Schick et al. 2023, Meta) has the model self-teach, in a self-supervised way, which APIs to call, when, with what arguments, and how to fold results in — keeping only calls that actually improve its own next-token prediction; tool use is a learned capability, not a bolt-on. **Claude's Define Tools** docs: a tool is <code>name</code> + <code>description</code> + <code>input_schema</code>, and "extremely detailed descriptions" are "by far the most important factor in tool performance." **MCP** standardizes how tools and context reach a model via a client–host–server protocol, with three server primitives — Tools, Resources, Prompts — over JSON-RPC, discovered with <code>tools/list</code> and invoked with <code>tools/call</code>. Best practices (namespacing, consolidating related operations under an <code>action</code> param, input examples, high-signal responses) are all interface design, not prompting.
:::

## 為什麼重要 · Why it matters

把四個來源收斂成一句（作者觀點 Author's view）：**工具不是模型「長出來的能力」，是你跟模型之間的一紙契約；而模型履行契約的方式，還是 [[05-how-llms-work|next-token 預測（卡 05）]]。**這有三個工程後果：

      <ul>
        <li><strong>壞描述 → 壞呼叫，跟壞命名的 function 被人誤用是同一回事。</strong>官方的 good vs poor 描述對照，就是 <a href="15-prompt-structure-five-components.html">卡 15「結構優先於技術」</a>在工具層的翻版：工具的 name/description/schema 就是它的規格，規格寫爛了，模型跟人一樣會呼叫錯——你能調的旋鈕（<a href="09-llm-control-surface.html">卡 09</a>）在這裡就是那份描述。</li>
        <li><strong>把 action 接地在 reasoning 上</strong>（ReAct 的 thought→act→observe）是 <a href="04-agentic-three-responsibilities.html">卡 04「評估軌跡」</a>／<a href="06-ai-loop-discipline.html">卡 06「邊做邊對規格驗」</a>的機制版——不讓模型盲目連發工具呼叫，而是每步先想為什麼、再動、再看結果，錯了能當場修。</li>
        <li><strong>MCP 的 primitives + discovery = 把「介面標準化」這個古典軟工智慧搬進 AI。</strong>定義契約一次、到處重用，而不是每換一個 host 就重接線。這正是 <a href="02-context-engineering.html">卡 02</a> 的 Harness 層在做的事：把工具與脈絡用統一介面曝露給編排層。</li>
      </ul>

::: src
出處 Source：四個一手來源。① Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models"，arXiv:2210.03629（ICLR 2024）——交錯推理與行動、推理追蹤計畫／行動介接外部來源、克服 CoT 幻覺與錯誤傳播、ALFWorld +34%／WebShop +10% 絕對成功率、僅需一兩個 in-context 範例。② Schick et al., "Toolformer: Language Models Can Teach Themselves to Use Tools"，arXiv:2302.04761（Meta AI，2023）——自監督、每 API 僅需少量示範、模型自決 which/when/args/how-to-incorporate、保留有助預測的呼叫、工具含 calculator/QA/兩搜尋引擎/翻譯/日曆、zero-shot 大幅提升常與更大模型打平。③ Anthropic《Define tools》官方文件（platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools）——工具 = name/description/input_schema(JSON Schema)、「極度詳細的描述是影響工具效能最重要的因素」、good vs poor 描述對照、命名空間、合併相關操作、input_examples、tool_choice(auto/any/tool/none)。④ Anthropic《MCP Architecture overview》官方文件（modelcontextprotocol.io，protocol 2026-07-28）——client–host–server、每 server 一 client、三 primitives(Tools/Resources/Prompts)、JSON-RPC 2.0、tools/list 探索 + tools/call 執行、stdio/Streamable HTTP transport、stateless + discovery。作者改寫重述，未複製原文。「工具是契約不是能力」「定義工具＝介面設計」「工具呼叫仍是 next-token 預測」為作者綜述觀點（Author's view），與本站 [[02-context-engineering|02]]／[[04-agentic-three-responsibilities|04]]／[[05-how-llms-work|05]]／[[09-llm-control-surface|09]]／[[15-prompt-structure-five-components|15]] 一致。
:::

## 一句話帶走 · Takeaway

工具不是模型的超能力，是你寫的一紙介面契約——模型呼叫它仍然只是在對你的描述做預測；所以「把工具描述寫清楚」跟「把 function 命名好、把 API 設計好」是同一種紀律，不是 prompt 技巧。ReAct 教你讓它先想再動，MCP 教你把契約寫一次到處接。

::: en
A tool isn't a model superpower — it's an interface contract you wrote, and calling it is still just prediction conditioned on your description. So "write a clear tool description" is the same discipline as "name the function well, design the API well" — not a prompting trick. ReAct tells you to reason before acting; MCP tells you to write the contract once and plug it in everywhere.
:::
