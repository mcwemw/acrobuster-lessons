// 由 build.py 從 cards/*.md 生成,勿手改。
const LESSONS = [
  {
    "id": "01",
    "slug": "rag-faithfulness",
    "title": "RAG 忠實度三層：PASS / WARN / FAIL",
    "title_en": "Three Tiers of RAG Faithfulness: PASS / WARN / FAIL",
    "summary": "別只問 AI「有沒有附來源」，要問「來源到底有沒有支持這句」。",
    "summary_en": "Don't just ask whether the AI cited a source — ask whether the source actually supports the sentence.",
    "tag": "RAG"
  },
  {
    "id": "02",
    "slug": "context-engineering",
    "title": "四層工程思維：Prompt → Context → Harness → Loop",
    "title_en": "Four Layers of Engineering: Prompt → Context → Harness → Loop",
    "summary": "把「跟 AI 一起工作」拆成四層槓桿，由近而遠、由戰術到制度。",
    "summary_en": "Breaking \"working with AI\" into four layers of leverage — near to far, tactical to systemic.",
    "tag": "AI 工程"
  },
  {
    "id": "03",
    "slug": "intent-output-gap",
    "title": "提示工程的核心：意圖 vs 輸出的落差",
    "title_en": "The Heart of Prompt Engineering: the Intent–Output Gap",
    "summary": "模型回的是你「寫出來的」，不是你「心裡想的」。兩者之間的縫，就是提示工程要收的。",
    "summary_en": "The model answers what you *wrote*, not what you *meant*. That gap is what prompt engineering closes.",
    "tag": "提示工程"
  },
  {
    "id": "04",
    "slug": "agentic-three-responsibilities",
    "title": "代理時代工程師的三職責：指定意圖 → 評估軌跡 → 收回控制",
    "title_en": "The Engineer's Three Jobs in the Agentic Era: Specify Intent → Evaluate Trajectory → Take Back Control",
    "summary": "當 AI agent 能自己跨多步執行，工程師的工作從「自己寫 code」變成三件事。",
    "summary_en": "Once an AI agent can execute across multiple steps on its own, the engineer's job shifts from writing code to three things.",
    "tag": "代理工程"
  },
  {
    "id": "05",
    "slug": "how-llms-work",
    "title": "LLM 怎麼運作：下一個字預測 + 注意力",
    "title_en": "How LLMs Work: Next-Token Prediction + Attention",
    "summary": "模型不是在「查資料庫」，是在猜「最可能的下一個字」；attention 讓它決定每個詞該看句中哪些詞。",
    "summary_en": "The model isn't \"looking up a database\" — it's guessing the \"most likely next token\"; attention lets it decide which words in the sentence each word should look at.",
    "tag": "模型原理"
  },
  {
    "id": "06",
    "slug": "ai-loop-discipline",
    "title": "AI 入迴圈，工程紀律不減反前移",
    "title_en": "AI in the Loop Doesn't Remove Engineering Discipline — It Moves It Forward",
    "summary": "讓 AI 幫你寫，省掉的是打字，不是把關；紀律從「事後審 code」前移到「事前寫規格、當場對規格驗」。",
    "summary_en": "Letting AI write for you saves typing, not judgment; discipline moves forward — from reviewing code after the fact to writing a spec first and checking output against it as you go.",
    "tag": "軟體工程"
  },
  {
    "id": "07",
    "slug": "prompt-techniques-pitfalls",
    "title": "提示工程技術地圖與它的陷阱",
    "title_en": "A Map of Prompt-Engineering Techniques — and Their Pitfalls",
    "summary": "few-shot、CoT 這些技巧讓模型更會「看起來對」；但「看起來對」不等於「對」，所以技巧的另一半是控制敏感度 + 驗證。",
    "summary_en": "Few-shot and CoT make a model better at \"looking right\" — but \"looking right\" isn't \"being right,\" so the other half of these techniques is controlling sensitivity and verifying.",
    "tag": "提示工程"
  },
  {
    "id": "08",
    "slug": "rlhf-preference-reward",
    "title": "RLHF：把人的偏好變成獎勵，以及那條 KL 繩",
    "title_en": "RLHF: Turning Human Preference into a Reward — and Why It Needs a KL Leash",
    "summary": "RLHF 用「人更喜歡哪個回答」訓練一個獎勵模型，再讓語言模型去最大化它；但獎勵是偏好的代理、不是真相，優化太狠就會作弊，所以要拴一條 KL 繩。",
    "summary_en": "RLHF trains a reward model from \"which answer humans prefer,\" then optimizes the language model to maximize it; but the reward is a proxy for preference, not truth — optimize too hard and it cheats, which is why it needs a KL leash.",
    "tag": "模型原理"
  },
  {
    "id": "09",
    "slug": "llm-control-surface",
    "title": "同一個機制，不同旋鈕：你真正能調的 LLM 行為",
    "title_en": "One Mechanism, Different Knobs: What You Can Actually Tune in LLM Behavior",
    "summary": "CoT、few-shot 不是各自的特異功能，是同一個「次字預測」機制的展現；工程師真正能動的旋鈕是 context、message 結構、system prompt——但設定了不等於照辦。",
    "summary_en": "CoT and few-shot aren't separate tricks — they're manifestations of one next-token mechanism; the knobs an engineer actually turns are context, message structure, and the system prompt — but setting them isn't the same as being obeyed.",
    "tag": "模型原理"
  },
  {
    "id": "10",
    "slug": "norms-before-building",
    "title": "開工前先立規矩：團隊 AI 準則與評估前移",
    "title_en": "Set the Rules Before You Build: Team AI Norms and Up-Front Evaluation",
    "summary": "在 AI 協作的專案裡，最該前移的不是寫 code，是「工具做什麼／不做什麼、分歧怎麼裁、成功長什麼樣」——這些要在開工前就定好。",
    "summary_en": "On an AI-assisted project, the thing to move earliest isn't writing code — it's deciding what tools are (and aren't) for, how disputes are settled, and what success looks like, all before building starts.",
    "tag": "軟體工程"
  },
  {
    "id": "11",
    "slug": "ai-is-an-amplifier",
    "title": "AI 是放大器，不是均值回歸",
    "title_en": "AI Is an Amplifier, Not a Great Equalizer",
    "summary": "90% 的開發者在用 AI、八成覺得更快，但只約四分之一真的信任它的輸出；AI 不會把爛團隊拉到平均，它放大你本來就有的系統。",
    "summary_en": "90% of developers use AI and most feel faster — but only about a quarter actually trust its output; AI doesn't level teams up, it amplifies the system you already have.",
    "tag": "軟體工程"
  },
  {
    "id": "12",
    "slug": "process-is-load-bearing",
    "title": "流程不是官僚，是保命索：專業軟體工程 vs 作業",
    "title_en": "Process Isn't Bureaucracy, It's a Lifeline: Professional SE vs. a Coding Assignment",
    "summary": "作業是一個人、交一次、交完就結束；專業軟體工程是多人、持續、有壓力的現實——版本控制與流程存在，就是為了讓這個現實活得下去。",
    "summary_en": "An assignment is one person, submitted once, done; professional software engineering is a multi-person, continuous, high-pressure reality — version control and process exist to make that reality survivable.",
    "tag": "軟體工程"
  },
  {
    "id": "13",
    "slug": "self-correction-not-self-approval",
    "title": "自我修正不是自我感覺良好：讓 AI 的 loop 真的變好",
    "title_en": "Self-Correction Isn't Self-Approval: Making an AI Loop Actually Improve",
    "summary": "天真地叫 AI「檢查一下你的答案」，常常只換來「看起來沒問題！」卻什麼都沒改；要真的變好，批判得具體、得「難過關」、得封頂加人審。",
    "summary_en": "Naively telling an AI to \"check your answer\" often just yields \"looks fine!\" with nothing changed; to actually improve, the critique must be specific, hard to pass, capped, and backed by human review.",
    "tag": "模型原理"
  },
  {
    "id": "14",
    "slug": "prompt-engineering-is-empirical",
    "title": "提示工程是量出來的，不是刻出來的：先定指標、再搜尋、用多數決",
    "title_en": "Prompt Engineering Is Measured, Not Hand-Crafted: Metric First, Then Search, Then Vote",
    "summary": "好 prompt 不是坐在那邊想詞想出來的——是先有一把尺（成功標準＋能跑的評測），然後把 prompt 當成要「搜尋」的東西去優化，必要時多抽幾次取多數。這是把機器學習的老紀律搬到提示上。",
    "summary_en": "A good prompt isn't wordsmithed into existence — you first build a ruler (success criteria plus a runnable eval), then treat the prompt as something to search and optimize, and when needed sample several times and take the majority. It's classic ML discipline applied to prompting.",
    "tag": "提示工程"
  },
  {
    "id": "15",
    "slug": "prompt-structure-five-components",
    "title": "提示有結構，不只有技術：五個組件讓規格變成評測表",
    "title_en": "Prompts Have Structure, Not Just Technique: Five Components That Turn a Spec into an Eval Checklist",
    "summary": "大多數 prompt 失敗不是因為技術選錯——是結構出了問題。一個 prompt 有五個組件：角色、脈絡、任務、格式、限制條件；在下 prompt 之前先寫規格，那份規格就直接變成驗收清單。",
    "summary_en": "Most prompt failures aren't about which technique you chose — they're structural. A prompt has five components: role, context, task, format, constraints; writing the spec before the prompt turns that spec into your evaluation checklist.",
    "tag": "提示工程"
  },
  {
    "id": "16",
    "slug": "sycophancy-is-trained-in",
    "title": "你的 AI 評審天生會拍馬屁：諂媚是訓練出來的，不是 prompt 勸得退的",
    "title_en": "Your AI Judge Is Sycophantic by Construction: Flattery Is Trained In, Not Promptable Away",
    "summary": "諂媚不是 bug，是 RLHF 大規模最佳化人類偏好的必然副產物；它被烤進了模型，不是你在 prompt 裡寫「請客觀」就能勸退的。更麻煩的是：你專案裡任何一個拿 LLM 當裁判的元件，天生都繼承這個偏誤。",
    "summary_en": "Sycophancy isn't a bug — it's an emergent byproduct of optimizing human preference at scale in RLHF; it's baked into the model, not something you prompt away with \"please be objective.\" Worse: any component in your project that uses an LLM as a judge inherits that bias by construction.",
    "tag": "模型原理"
  },
  {
    "id": "17",
    "slug": "more-training-not-more-aligned",
    "title": "更多對齊訓練不一定更對齊：偏誤的訊號、反向擴展、與憲法解方",
    "title_en": "More Alignment Training Isn't Always More Aligned: Biased Signals, Inverse Scaling, and the Constitutional Fix",
    "summary": "「對齊 = 多訓練就會好」是天真假設。用來對齊的訊號本身愛聽好話，有些失效還會隨模型變大、RLHF 變多而更嚴重（反向擴展）。所以對齊不是一次撥好的開關——要把價值寫成一部可稽核的憲法，再對著 ground truth 持續量測。",
    "summary_en": "\"Alignment = just train more\" is a naive assumption. The very signal you align against prefers flattery, and some failures get worse as models grow and RLHF accumulates (inverse scaling). So alignment isn't a switch you flip once — you write the values down as an auditable constitution and keep measuring against ground truth.",
    "tag": "模型原理"
  },
  {
    "id": "18",
    "slug": "prompt-failure-diagnosis",
    "title": "提示失效不是玄學：五個可診斷的失效模式，同一個根因",
    "title_en": "Prompt Failures Aren't Random: Five Diagnosable Failure Modes, One Root Cause",
    "summary": "「換個詞再試試看」不是診斷——那是在猜。五種提示失效（敏感性、幻覺、諂媚、過度拒絕、偏見）每一種都有可辨識的指紋、一個可重現的測試、和一個第一步修法；而這五種失效的根源其實是同一件事：next-token 預測。先識別你碰到的是哪一種，才有辦法工程化地修它。",
    "summary_en": "\"Try different wording until it works\" isn't a diagnosis — it's a guess. Each of the five prompt failure modes (sensitivity, hallucination, sycophancy, over-refusal, bias) has an identifiable fingerprint, a reproducible test, and a first fix; and all five trace back to the same root: next-token prediction. Name the failure mode first — then you can engineer the fix.",
    "tag": "提示工程"
  },
  {
    "id": "19",
    "slug": "tools-are-contracts",
    "title": "工具不是能力，是契約：模型呼叫工具仍然只是在猜，所以「定義工具」就是寫介面規格",
    "title_en": "A Tool Isn't a Capability, It's a Contract: Calling a Tool Is Still Prediction — So Defining Tools Is Interface Design",
    "summary": "模型本身不會「做事」——它只會輸出下一個 token。所謂「呼叫工具」只是模型吐出一段結構化的 tool call（name＋arguments），由外部 runtime 真正執行再把結果塞回對話。所以工具呼叫的品質，等於模型對「你寫的那份工具描述」做 next-token 預測的品質。把工具寫好，是介面設計，不是 prompt 技巧。",
    "summary_en": "A model doesn't \"do things\" — it emits the next token. A \"tool call\" is just the model producing a structured call (name + arguments) that an external runtime actually executes, feeding the result back. So the quality of a tool call equals the quality of the model's next-token prediction conditioned on the tool description you wrote. Writing good tools is interface design, not a prompting trick.",
    "tag": "代理工程"
  },
  {
    "id": "20",
    "slug": "slopsquatting-supply-chain",
    "title": "Slopsquatting：機器幻覺變成供應鏈攻擊面——為什麼它比打錯字更難防",
    "title_en": "Slopsquatting: When Machine Hallucination Becomes a Supply-Chain Attack Surface — and Why It's Harder to Catch Than a Typo",
    "summary": "Typosquatting 賭你手滑（把 lodash 打成 lodahs）；slopsquatting 賭 AI 嘴瓢——套件名是 AI 從零捏造、從來不存在的。關鍵在：AI 的幻覺不是隨機雜訊，**同樣的假名會跨次重複出現**，所以攻擊者能預先把那些名字搶注、埋好惡意程式。這張卡講它的攻擊面、為什麼傳統拼字過濾擋不住，以及三層防線。",
    "summary_en": "Typosquatting bets on your slip (typing lodahs for lodash); slopsquatting bets on the AI's slip — a package name the AI fabricated from scratch that never existed. The crux: AI hallucinations aren't random noise — the same fake names recur across runs — so attackers can pre-register those names with malware waiting. This card covers the attack surface, why traditional spell-check filters miss it, and a three-layer defense.",
    "tag": "軟體工程"
  },
  {
    "id": "21",
    "slug": "tool-use-is-a-tradeoff",
    "title": "代理工具用量是要量測的權衡，不是一次修好的 bug：四種失效會互相拉扯，而「今天沒壞」不算證據",
    "title_en": "Agent Tool-Use Is a Measured Trade-off, Not a One-Time Fix: The Four Failures Pull Against Each Other, and \"Didn't Fail Today\" Isn't Evidence",
    "summary": "把一個三工具 agent 的描述故意寫爛，你會看到四種工具專屬失效。但真正的體悟有兩個：① 這些失效會**互相拉扯**——修「不必要呼叫」把模型推向少呼叫，修「漏呼叫」推向多呼叫，你是在調一個權衡點，不是修兩個獨立 bug；② 工具呼叫是**隨機的**，所以「跑一次沒壞」不是證據——要用計次量、用壓測逼、持續監控。",
    "summary_en": "Deliberately weaken a three-tool agent's descriptions and you'll see four tool-specific failures. But the real lessons are two: ① the failures **pull against each other** — fixing \"unnecessary calls\" pushes toward calling less, fixing \"missed calls\" pushes toward calling more, so you're tuning a trade-off, not fixing two independent bugs; ② tool-calling is **stochastic**, so \"ran once, didn't break\" is not evidence — measure with run counts, stress it, and monitor it.",
    "tag": "代理工程"
  },
  {
    "id": "22",
    "slug": "validate-tool-arguments-not-eval",
    "title": "別 eval 模型輸出：工具參數是外人打的字，要驗不要跑",
    "title_en": "Don't Eval Model Output: Treat Every Tool Argument as Input From a Stranger — Parse and Validate, Never Execute",
    "summary": "模型「回傳」工具參數，但工具是你在跑，所以模型輸出就是你的攻擊面。<code>eval()</code> 一個模型回的運算式，等於給模型一個 shell——就算把 <code>__builtins__</code> 清空也擋不住類別繼承逃逸。講義的規則只有一條：用 AST parser 白名單，驗每個參數如同外人打的字。提示注入 + eval = 一步攻擊鏈。",
    "summary_en": "The model returns tool arguments; you run the tool — so model output is your attack surface. <code>eval()</code>-ing a model-returned expression gives the model a shell. Even stripping <code>__builtins__</code> doesn't sandbox it. The lecture's rule is one: use an AST parser with an allowlist, and validate every tool argument as if a stranger typed it. Prompt injection + eval = a one-step exploit chain.",
    "tag": "軟體工程"
  },
  {
    "id": "23",
    "slug": "rag-two-failure-layers",
    "title": "RAG 是兩個獨立的失效層：先用免費、決定性的指標量檢索，再碰 prompt",
    "title_en": "RAG Has Two Independent Failure Layers: Measure Retrieval First (Free, Deterministic), Then Touch the Prompt",
    "summary": "RAG 不是一個黑盒，是「檢索 → 生成」兩層。檢索可以**完全不呼叫模型**就量——hit@k、MRR 是決定性的、免費的，所以你能跑上百個實驗調 chunk／k／retriever。生成才是花錢又隨機的那層。關鍵紀律：檢索沒撈到的證據，prompt 無論怎麼寫都救不回來——所以答錯時先問「是哪一層錯」，答案決定修法。",
    "summary_en": "RAG isn't a black box — it's two stages: retrieve → generate. Retrieval can be scored **without any model call**: hit@k and MRR are deterministic and free, so you can run hundreds of experiments tuning chunk / k / retriever. Generation is the expensive, stochastic layer. The discipline: no prompt can recover evidence retrieval never fetched — so when an answer is wrong, first ask \"which layer failed,\" because the layer determines the fix.",
    "tag": "RAG"
  },
  {
    "id": "24",
    "slug": "evaluate-the-evaluator",
    "title": "自動評估本身要被評估：RAGAS 給你 reference-free 的三指標，但沒對齊人類的 LLM 裁判只是「自動化的自評」",
    "title_en": "Evaluate the Evaluator: RAGAS Gives You Reference-Free Metrics, but an LLM Judge You Haven't Validated Against Humans Is Just Automated Self-Evaluation",
    "summary": "RAGAS 把「這個 RAG 答案好不好」拆成三個**不需人工標準答案**就能算的指標（Faithfulness／Context Precision／Answer Relevancy），所以你能大規模自動跑。但 Hamel Husain 的警告是另一半：這些指標背後是一個 LLM 裁判，而裁判也是會錯、會諂媚的模型。所以在你信任它的分數之前，**要先用人類標註驗證這個裁判**——沒驗過的 LLM 裁判，等於把自評偷偷自動化。",
    "summary_en": "RAGAS decomposes \"is this RAG answer good\" into three metrics you can compute **without a human gold answer** (Faithfulness, Context Precision, Answer Relevancy), so you can run them at scale. But Hamel Husain supplies the other half: behind those metrics sits an LLM judge, and a judge is itself a model that errs and flatters. Before you trust its scores, **validate the judge against human labels** — an unvalidated LLM judge is self-evaluation, quietly automated.",
    "tag": "RAG"
  },
  {
    "id": "25",
    "slug": "context-window-is-a-budget",
    "title": "上下文視窗是預算，不是免費空間：為什麼要檢索——因為「塞好塞滿」會死在成本、雜訊、和「迷失在中間」",
    "title_en": "The Context Window Is a Budget, Not Free Space: Why Retrieve at All — Because \"Stuff Everything In\" Dies on Cost, Noise, and Lost-in-the-Middle",
    "summary": "模型沒有記憶，每次呼叫都是獨立的——**你送進視窗的，就是它知道的全部**。而視窗是有限預算：把整個知識庫塞進去會三面受敵——每個 token 都計費（成本）、無關文字讓模型分心（雜訊）、而且「迷失在中間」讓放在中段的關鍵事實被忽略（位置）。所以當你不能全塞，你就**必須挑**——RAG 就是「自動挑」。而挑這個動作把風險搬到一個**可量測**的問題：「我們挑對文字了嗎？」",
    "summary_en": "The model has no memory; each call is self-contained — **what you send is all it knows**. And the window is a finite budget: stuffing the whole knowledge base in fails three ways — every token is billed (cost), irrelevant text distracts (noise), and \"lost in the middle\" means key facts placed mid-context get ignored (position). So when you can't include everything, you **must select** — and RAG is automated selection. Selecting relocates the risk to a **measurable** question: \"did we select the right text?\"",
    "tag": "AI 工程"
  },
  {
    "id": "26",
    "slug": "test-prompts-like-code",
    "title": "Prompt 要像程式一樣被測試：分層檢查 × 輸入類別覆蓋 × 每修必加回歸，才叫「做完」",
    "title_en": "Test Prompts Like Code: Layered Checks × Input-Category Coverage × a Regression Test for Every Fix Is What \"Done\" Means",
    "summary": "一個 prompt「跑一次對了」不叫做完；做完是它有一組**測試套件**把行為釘住。Week 10 用 promptfoo 把 prompt 當程式測：每個測試是**分層的獨立檢查**（格式→schema→正確性→安全，全過才算過）、覆蓋**多種輸入類別**（典型／空／超長／分隔符衝突／輸入敏感／預測失效），每修一個失效就**加一條回歸測試**，再用 <code>--repeat</code> 逼出隨機不穩。而且十個案例仍分不開訊號與抽樣雜訊。",
    "summary_en": "A prompt that \"worked once\" isn't done; done is when a **test suite** pins its behavior. Week 10 uses promptfoo to test prompts like code: each test is **layered independent checks** (format → schema → correctness → safety, all must pass), covering **input categories** (typical / empty / very long / delimiter-conflict / input-sensitivity / predicted-failure), with a **regression test added for every fix**, and <code>--repeat</code> to expose stochastic flakiness. And even then, ten cases can't separate signal from sampling noise.",
    "tag": "軟體工程"
  },
  {
    "id": "27",
    "slug": "error-bars-on-evals",
    "title": "Eval 分數要有誤差棒：「10/10 通過」的真實失效率上界可能是 30%——因為 0 失效 ≠ 0% 失效",
    "title_en": "Put Error Bars on Eval Scores: \"10/10 Passed\" Allows a True Failure Rate up to ~30% — Because Zero Failures ≠ a Zero Failure Rate",
    "summary": "一個沒有誤差棒的 eval 分數不是結果，是幻覺。評估是**實驗**：你的題目是一個樣本，裸的「80% 通過」沒有不確定區間等於沒說。最反直覺的一條是「三的法則」：某事在 n 次試驗中**一次都沒出**，它真實發生率的 95% 上界約是 **3/n**——所以 [[26-test-prompts-like-code|卡 26]] 的「10/10 通過」容得下高達 ~30% 的真實失效率。比較兩個模型也一樣：「A 贏 B 兩個百分點」可能整個藏在重疊的信賴區間裡。",
    "summary_en": "An eval score with no error bar isn't a result — it's a hallucination. Evaluations are **experiments**: your questions are a sample, and a bare \"80% pass\" with no interval says nothing. The most counter-intuitive piece is the rule of three: if something occurs **zero** times in n trials, the 95% upper bound on its true rate is about **3/n** — so [[26-test-prompts-like-code|card 26]]'s \"10/10 passed\" is consistent with a true failure rate up to ~30%. Same for comparing models: \"A beat B by 2%\" can hide entirely inside overlapping confidence intervals.",
    "tag": "AI 工程"
  },
  {
    "id": "28",
    "slug": "already-testing-badly-silent-failures",
    "title": "你早就在測了，只是測得爛：「試幾次覺得 OK」是一個爛測試套件，而最危險的失效是沉默的",
    "title_en": "You're Already Testing — Just Badly: \"Tried It a Few Times\" Is a Weak Test Suite, and the Most Dangerous Failures Are Silent",
    "summary": "「我在五個例子上試過，看起來不錯」——這**已經是測試**了，只是一個 size-5 的爛測試套件，有三個弱點：①那五個是寫 prompt 的人自己挑的、②沒人寫下「好」是什麼意思（憑感覺判）、③什麼都沒存，改完不能重跑。更要命的是：你最該抓的失效是**沉默的**——格式正確、讀起來合理、但答案是錯的。沉默失效**只有在你先寫下「對」長什麼樣**時才會現形。",
    "summary_en": "\"I tried it on five examples, looks good\" — that **already is testing**, just a weak test suite of size 5 with three weaknesses: the five were chosen by the person who wrote the prompt; nobody wrote down what \"good\" means (judged by feel); nothing is saved, so you can't rerun after a change. Worse: the failures you most need to catch are **silent** — well-formed, plausible, and wrong. Silent failures only appear if you **first wrote down what \"right\" looks like**.",
    "tag": "提示工程"
  },
  {
    "id": "29",
    "slug": "prompt-broke-check-withheld-context",
    "title": "Prompt 壞掉，先查你漏給了什麼脈絡：在團隊裡，一半的「規格」藏在沒說出口的慣例裡",
    "title_en": "When a Prompt Breaks, First Check What Context You Withheld: In a Team, Half the \"Spec\" Lives in Unspoken Conventions",
    "summary": "prompt 產出的程式壞掉，最常見的原因不是「模型笨」，是**你漏給了脈絡**。Assignment 1 的診斷題故意這樣設計：三個隊友的 prompt 之所以失敗，正因為它們各漏掉一個隱藏需求——團隊的 <code>CONVENTIONS.md</code>、一個 <code>utils.py</code> 裡的 helper、或沒明說的 urgency 規則。模型做的正是 prompt 寫的；是 prompt 沒寫出那段活在共享慣例裡的規格。所以**診斷 = 指出規格漏了什麼，不是罵模型**。",
    "summary_en": "When prompt-generated code breaks, the usual cause isn't a dumb model — it's **context you withheld**. Assignment 1's diagnosis task is built on this: three teammates' prompts fail precisely because each omits a hidden requirement — the team's <code>CONVENTIONS.md</code>, a helper in <code>utils.py</code>, or an unspoken urgency rule. The model did exactly what the prompt said; the prompt just didn't carry the part of the spec that lives in shared conventions. So **diagnosis = naming what the spec left out, not blaming the model**.",
    "tag": "提示工程"
  },
  {
    "id": "30",
    "slug": "define-success-before-you-build",
    "title": "先定義「怎樣算成功」再開始蓋：驗收標準、最低證據門檻、human-AI 邊界，都在 discovery 就定下",
    "title_en": "Define Success Before You Build: Fix the Acceptance Bar, the Minimum Evidence Threshold, and the Human-AI Boundary at Discovery",
    "summary": "CP1 把「評估」放在「建造」**之前**：在認真開蓋前，先寫下「我們怎麼知道這工具有用」——一個成功定義、一個**最低證據門檻**、以及用 AI 時的 **human-AI 邊界**；而且問題要用**真實使用者證據**撐（≥2 次真人對話），不是自己斷言。評分鐵律一句話：**「不確定從不扣分，超出你證據的宣稱才扣分。」** 設這條標準，在 discovery 階段最便宜。",
    "summary_en": "CP1 puts evaluation **before** building: before serious work, you write down how you'll know the tool worked — a success definition, a **minimum evidence threshold**, and the **human-AI boundary** if AI is in the loop — and you ground the problem in **real-user evidence** (≥2 real conversations), not assertion. The grading rule says it in one line: **\"Uncertainty is never penalised; claims that go beyond your evidence are.\"** Setting that bar is cheapest at discovery.",
    "tag": "AI 工程"
  },
  {
    "id": "31",
    "slug": "prompt-builder-is-disciplines-compiled",
    "title": "好的「prompt builder」meta-prompt，其實是把忠實度、測試、失效診斷的紀律「編譯」成可重用的標籤",
    "title_en": "A Good \"Prompt-Builder\" Meta-Prompt Is Just the Faithfulness, Testing, and Failure-Diagnosis Disciplines Compiled Into Reusable Tags",
    "summary": "網路上流行的「用一個 master prompt 生出專家級 prompt」範本，看起來像魔法，拆開看其實不神秘：它把一串**紀律**固化成可重用的區塊——先問清楚再動手、不准編造、拆步、自我複審、寫測試連同「好結果長怎樣」、最後問「這會在哪裡失敗」。換句話說，一個好的 meta-prompt 不是咒語，是**把你本來就該做的事編譯起來，讓你少漏幾項**。但它是鷹架不是保證：它生出的 prompt 仍然要測、要量。",
    "summary_en": "The popular \"one master prompt that generates expert-level prompts\" templates look like magic, but unpacked they're not mysterious: they bake a list of **disciplines** into reusable blocks — clarify before acting, never invent, decompose, self-review, write tests plus \"what a good result looks like,\" and a final \"where could this fail?\" In other words, a good meta-prompt isn't a spell — it's **the things you should already do, compiled, so you skip fewer of them**. But it's a scaffold, not a guarantee: the prompt it produces still has to be tested and measured.",
    "tag": "提示工程"
  },
  {
    "id": "32",
    "slug": "bias-variance-complexity-knob",
    "title": "監督式學習其實只有一個旋鈕：模型複雜度",
    "title_en": "Supervised Learning Has Really Just One Knob: Model Complexity",
    "summary": "監督式學習是在逼近一條看不見的真實對應 f*；而幾乎所有工程決策，最後都歸結到一個旋鈕——模型複雜度，它的兩端分別是 bias（欠擬合）與 variance（過擬合）。驗證存在的理由，就是不准你用訓練誤差幫自己打分。",
    "summary_en": "Supervised learning is approximating an unseen true mapping f*; and almost every engineering decision collapses onto a single knob — model complexity, whose two ends are bias (underfitting) and variance (overfitting). Validation exists for one reason: it forbids you from grading yourself on training error.",
    "tag": "模型原理"
  },
  {
    "id": "33",
    "slug": "loss-is-the-classifier-worldview",
    "title": "選哪個損失，就選了分類器的世界觀",
    "title_en": "Choosing a Loss Is Choosing the Classifier's Worldview",
    "summary": "線性回歸、感知器、邏輯回歸、SVM 畫的都是同一條直線 g(x)=wᵀx，差別只在目標函數。你挑哪個 loss，就決定了它會怎麼錯——MSE 怕離群值、感知器碰到線性不可分就崩、cross-entropy 要機率、SVM 要離最遠。",
    "summary_en": "Linear regression, perceptron, logistic regression, and SVM all draw the same line g(x)=wᵀx — they differ only in the objective function. The loss you pick decides how the classifier fails: MSE fears outliers, the perceptron breaks on non-separable data, cross-entropy wants probabilities, SVM wants maximum distance.",
    "tag": "模型原理"
  },
  {
    "id": "34",
    "slug": "embedding-is-the-throughline",
    "title": "這門課的暗線：一切都在學一個「嵌入」",
    "title_en": "The Hidden Throughline: Everything Is Learning an Embedding",
    "summary": "PCA、FLD、autoencoder、word2vec、對比學習、DINO 看似各走各的，其實都在做同一件事——學一個把高維複雜資料壓成低維向量的「嵌入」。而「好嵌入」沒有唯一定義：你選的目標函數說了算。維度詛咒則是這一切的理由：高維裡 cosine 全擠成一團，嵌入讓「比相似度」重新變得可能。",
    "summary_en": "PCA, FLD, autoencoders, word2vec, contrastive learning, and DINO look unrelated but do the same thing — learn an embedding that compresses high-dimensional data into a low-dimensional vector. And there's no single definition of a \"good\" embedding: the objective function you pick decides. The curse of dimensionality is the reason it all matters — in high dimensions every cosine collapses together, and the embedding makes comparing similarity possible again.",
    "tag": "模型原理"
  },
  {
    "id": "35",
    "slug": "search-honest-estimate-of-future",
    "title": "搜尋的差別全在「下一步探哪」——A* 靠一個不騙自己的估計",
    "title_en": "Search Comes Down to 'Which Node Next' — A* Rides an Estimate That Mustn't Lie",
    "summary": "BFS、DFS、均勻成本、A* 畫的都是同一張狀態圖，差別只在「下一步探哪個狀態」。A* 把走過的過去 g 和估計的未來 h 加起來；而只要那個估計「永不高估」（admissible），就保證找到最優解——否則你會錯過它。這跟「估計只有在有保證下才可信」是同一條紀律。",
    "summary_en": "BFS, DFS, uniform-cost, and A* all walk the same state graph — they differ only in which node to explore next. A* adds the known past g to the estimated future h; and as long as that estimate never overestimates (is admissible), optimality is guaranteed — otherwise you miss the best solution. Same discipline as \"an estimate is trustworthy only with a guarantee.\"",
    "tag": "代理工程"
  },
  {
    "id": "36",
    "slug": "exploration-vs-exploitation-dial",
    "title": "探索 vs 利用：所有 meta-heuristic 都在轉的那個旋鈕",
    "title_en": "Exploration vs Exploitation: The One Dial Every Metaheuristic Turns",
    "summary": "爬山、模擬退火、禁忌搜尋、演化計算、群體演算法看似各有花樣，但投影片一句話點破：它們「一定都含有在探索與利用之間調校的機制」。過度利用會讓整個族群塌成同一個樣子（superstar／早熟收斂）——那正是你在 LLM 取樣、RAG 檢索、甚至研究選題上每天在轉的同一個旋鈕。",
    "summary_en": "Hill climbing, simulated annealing, tabu search, evolutionary computation, and swarm algorithms look like different tricks, but the slides nail it: each \"always includes mechanisms for tuning between exploration and exploitation.\" Over-exploit and the whole population collapses into sameness (the superstar / premature convergence) — the same dial you turn every day in LLM sampling, RAG retrieval, even choosing a research topic.",
    "tag": "模型原理"
  },
  {
    "id": "37",
    "slug": "reward-is-rl-loss-credit-assignment",
    "title": "獎勵是 RL 的 loss，難的是信用分配——Bellman／TD／Q 都在用估計的未來回填現在",
    "title_en": "Reward Is RL's Loss; the Hard Part Is Credit Assignment — Bellman/TD/Q All Backfill the Present with the Estimated Future",
    "summary": "投影片講得很白：獎勵驅動 RL agent 的行為，就像 loss 驅動監督式學習。難的不是拿到獎勵，而是信用分配——一連串動作後才有回饋，怎麼知道是哪一步的功勞？Bellman、TD、Q-learning 的共同招式，就是用「估計的未來價值」回填「現在的價值」。",
    "summary_en": "The slides say it plainly: reward drives an RL agent's behavior the way loss drives supervised learning. The hard part isn't getting the reward — it's credit assignment: feedback comes after a series of actions, so which step gets the credit? Bellman, TD, and Q-learning share one move: backfill the present value using the estimated future value.",
    "tag": "代理工程"
  },
  {
    "id": "38",
    "slug": "games-exhaustive-dream-meets-explosion",
    "title": "遊戲 AI 的故事：窮舉求最優的夢，撞上組合爆炸後認輸轉向",
    "title_en": "The Story of Game AI: the Dream of Exhaustive Optimality Meets Combinatorial Explosion, and Surrenders",
    "summary": "Minimax 的夢是「窮舉到底就最優」，半世紀撐起遊戲 AI。但組合爆炸把它打醒——圍棋有 10¹⁷⁰ 個狀態，比宇宙的原子還多。於是整個領域認輸、轉向：minimax→MCTS（取樣式、邊玩邊學＝RL），手工評估函數→機器學習。而「沒有全樹就只能靠估計」正是你 faithfulness 母題的遊戲版。",
    "summary_en": "Minimax's dream is \"search exhaustively and you're optimal,\" and it carried game AI for half a century. But combinatorial explosion broke it — Go has 10¹⁷⁰ states, more than the atoms in the universe. So the field surrendered and pivoted: minimax → MCTS (sampled, learning-while-playing = RL), hand-crafted evaluation → machine learning. And \"no full tree means you live on an estimate\" is the game-playing version of your faithfulness thesis.",
    "tag": "代理工程"
  },
  {
    "id": "39",
    "slug": "simclr-loss-is-not-objective",
    "title": "SimCLR 實作：loss 下降 ≠ 學得好——對比學習逼你用下游任務驗證表徵",
    "title_en": "SimCLR in Practice: Falling Loss ≠ Good Representations — Contrastive Learning Forces You to Verify via a Downstream Task",
    "summary": "SimCLR 用「在 2N 張圖裡找出自己的擴增雙胞胎」當作一個分類問題，NT-Xent 其實就是對比版的 cross-entropy。但最該帶走的實作教訓是：訓練 loss 一路下降，不代表表徵變好——因為 loss≠objective。你得用 linear probing 或 kNN monitor 這種獨立的下游任務去驗證。這正是「不自評、要外部驗證」的動手版。",
    "summary_en": "SimCLR treats \"find your augmented twin among 2N images\" as a classification problem, and NT-Xent is really contrastive cross-entropy. But the key implementation lesson: a steadily falling training loss does NOT mean the representation improved — because loss ≠ objective. You must verify with an independent downstream task like linear probing or a kNN monitor. This is the hands-on version of \"don't grade yourself; verify externally.\"",
    "tag": "模型原理"
  },
  {
    "id": "40",
    "slug": "data-centric-bias-variance-knobs",
    "title": "資料才是主角：自建資料集的每個實驗，都是在轉 bias-variance 旋鈕",
    "title_en": "Data Is the Real Lever: Every Experiment on a Hand-Built Dataset Is Turning the Bias-Variance Knob",
    "summary": "演算法常被談得比資料多，但模型好壞由資料決定——這就是 data-centric AI。自己動手建一個資料集、跑監督式學習時，那些實驗軸（資料量、類別平衡、SMOTE、資料增強、PCA/autoencoder 降維）其實都是在實際操作 bias-variance 旋鈕；而「必用交叉驗證」就是「不准用訓練誤差幫自己打分」的硬性落地。",
    "summary_en": "Algorithms get talked about more than data, but a model's quality is decided by its data — that's data-centric AI. When you build a dataset yourself and run supervised learning, the experiment axes (amount of data, class balance, SMOTE, augmentation, PCA/autoencoder dimensionality reduction) are all hands-on ways of turning the bias-variance knob; and \"cross-validation is mandatory\" is the concrete enforcement of \"don't grade yourself on training error.\"",
    "tag": "AI 工程"
  },
  {
    "id": "41",
    "slug": "rl-is-hard-sandbox-reward-hacking",
    "title": "RL 出了紙上就難訓練：標準沙盒讓你可控地撞上信用分配與探索利用",
    "title_en": "RL Is Hard the Moment You Leave Paper: a Standard Sandbox Lets You Hit Credit Assignment and Explore-Exploit Under Control",
    "summary": "「RL 比簡單分類器難訓練」是公認的——而它難，不是意外：信用分配、探索vs利用、組合爆炸這三個難題，在實戰裡同時發作。Gymnasium 這種標準化環境之所以重要，正是「遊戲＝真實世界的沙盒」的動手版：可控、安全、快速。而 reward shaping 最危險——你以為在幫忙，常常是在教 agent 鑽漏洞。",
    "summary_en": "\"RL is harder to train than a simple classifier\" is well known — and it's hard for a reason, not by accident: credit assignment, exploration-vs-exploitation, and combinatorial explosion all fire at once in practice. A standardized environment like Gymnasium matters because it's the hands-on form of \"games are sandboxes of the real world\": controllable, safe, fast. And reward shaping is the most dangerous part — you think you're helping, but you're often teaching the agent to game the reward.",
    "tag": "代理工程"
  },
  {
    "id": "42",
    "slug": "motion-planning-search-meets-physics",
    "title": "機器人的 motion planning：把抽象搜尋落進物理世界，就得加上避碰、平滑與回授",
    "title_en": "Robot Motion Planning: Drop Abstract Search into the Physical World and You Must Add Collision-Avoidance, Smoothing, and Feedback",
    "summary": "機器人的動作規劃，骨子裡就是圖上的最短路徑搜尋（Dijkstra／A*）——但一旦落進真實世界，光是「短」不夠：路徑還要避碰、平滑、符合車子的運動限制。於是它拆成 path planning（只管空間）＋ trajectory planning（加上時間與速度）＋ feedback control（因為現實會偏離計畫，得閉環修正）。",
    "summary_en": "A robot's motion planning is, at its core, shortest-path search on a graph (Dijkstra / A*) — but the moment it enters the real world, \"short\" isn't enough: the path must also avoid collisions, be smooth, and respect the vehicle's motion limits. So it splits into path planning (spatial only) + trajectory planning (adding time and speed) + feedback control (because reality drifts from the plan, you must close the loop and correct).",
    "tag": "代理工程"
  },
  {
    "id": "43",
    "slug": "pid-present-past-future-of-error",
    "title": "PID：用誤差的現在、過去、未來來修正——feedback control 的靈魂是不信計畫、量現實",
    "title_en": "PID: Correcting with the Present, Past, and Future of the Error — Feedback Control's Soul Is Distrust the Plan, Measure Reality",
    "summary": "自駕車怎麼把規劃好的路徑在現實裡開出來？靠 feedback control：量測「參考值 − 感測到的真實輸出」當誤差，持續修正。PID 把這件事拆成誤差的三個時間向度——P 看現在、I 記過去、D 看未來。P 單獨會留下穩態誤差，I 補記憶卻會過衝，D 用變化率阻尼。這就是「不信開環計畫、量現實來校正」的母題。",
    "summary_en": "How does a self-driving car actually drive the path it planned, in the real world? Feedback control: measure \"reference − the sensed real output\" as error, and correct continuously. PID splits this into three time axes of the error — P sees the present, I remembers the past, D anticipates the future. P alone leaves steady-state error, I adds memory but overshoots, D uses the rate of change to damp. This is the \"distrust the open-loop plan, measure reality to correct\" theme.",
    "tag": "代理工程"
  },
  {
    "id": "44",
    "slug": "rl-end-of-control-ladder-value-vs-policy",
    "title": "RL 是控制階梯的盡頭：沒模型又非線性時才上 model-free，而學 policy 有兩條路",
    "title_en": "RL Is the End of the Control Ladder: Go Model-Free When You Have No Model and It's Nonlinear — and There Are Two Roads to a Policy",
    "summary": "控制演算法是一道階梯——PID → pure-pursuit → Stanley → LQR → model-free RL，越往上處理越複雜；RL 是盡頭：當你沒有環境模型、系統又非線性，才跳上去。而 model-free RL 學 policy 有兩條路：value-based（學 Q 再貪婪，就是卡 37）vs policy-based（直接學 π）。policy gradient 的死穴是取樣沒效率，PPO 用「一次別改太多」的信賴域來解。",
    "summary_en": "Control algorithms form a ladder — PID → pure-pursuit → Stanley → LQR → model-free RL, each handling more complexity; RL is the end: you jump to it when you have no model of the environment and the system is nonlinear. And model-free RL has two roads to a policy: value-based (learn Q then act greedily — that's card 37) vs policy-based (directly learn π). Policy gradient's weakness is sample inefficiency, which PPO fixes with a \"don't change too much at once\" trust region.",
    "tag": "代理工程"
  },
  {
    "id": "45",
    "slug": "slam-predict-correct-loop-closure",
    "title": "SLAM：估計＋校正母題最純的化身——推算讓誤差滾雪球，觀測與 loop closure 把它拉回來",
    "title_en": "SLAM: the Purest Form of the Estimate-then-Correct Theme — Dead Reckoning Snowballs Error, Observation and Loop Closure Pull It Back",
    "summary": "SLAM 要一邊建未知環境的地圖、一邊在圖裡定位自己——雞生蛋的難題。它的骨架正是整站的母題：用運動模型一步步「推算」位置，誤差會滾雪球（位置不確定性越滾越大）；再靠「觀測」看到地標把估計拉回來。而 loop closure——認出「我來過這裡」——就是用一個獨立證據，一次修掉累積的漂移。",
    "summary_en": "SLAM must build a map of an unknown environment while simultaneously locating itself within it — a chicken-and-egg problem. Its skeleton is the site's recurring theme: \"predict\" your pose step by step with a motion model (error snowballs, location uncertainty grows), then \"correct\" it by observing landmarks. And loop closure — recognizing \"I've been here before\" — uses one piece of independent evidence to wipe out accumulated drift in a single stroke.",
    "tag": "代理工程"
  },
  {
    "id": "46",
    "slug": "slam-graph-optimization-least-squares-consensus",
    "title": "SLAM 的 graph 最佳化：量測互相矛盾時，不二選一，而是最小平方求共識",
    "title_en": "SLAM's Graph Optimization: When Measurements Conflict, Don't Pick One — Least-Squares Finds the Consensus",
    "summary": "卡 45 的 loop closure 一旦發生，就會製造矛盾——追蹤說「我在 0.2」，loop closure 說「我在 0」。SLAM back-end 的 graph 最佳化不挑一個信，而是把所有約束寫成誤差、用加權最小平方找「對全部量測總誤差最小」的那組位置。權重是資訊矩陣（協方差倒數）＝你多信這個量測。這其實就是 MAP／MLE。",
    "summary_en": "Once card 45's loop closure fires, it creates a contradiction — tracking says \"I'm at 0.2,\" loop closure says \"I'm at 0.\" SLAM's graph optimization doesn't trust one over the other; it writes every constraint as an error and uses weighted least squares to find the poses that minimize the total error over all measurements. The weight is the information matrix (inverse covariance) = how much you trust each measurement. This is exactly MAP/MLE.",
    "tag": "模型原理"
  },
  {
    "id": "47",
    "slug": "visual-slam-inverse-problem-direct-indirect",
    "title": "視覺 SLAM 是反問題：相機把 3D 壓成 2D，你得從影像反推——indirect 比幾何、direct 比像素",
    "title_en": "Visual SLAM Is an Inverse Problem: the Camera Squashes 3D into 2D, So You Reconstruct from Images — Indirect Compares Geometry, Direct Compares Pixels",
    "summary": "相機就是一個已知的投影：K[R|t] 把 3D 世界壓成 2D 影像，過程中丟掉了深度。所以視覺 SLAM 是個反問題——從一堆 2D 觀測反推相機位姿與 3D 結構。兩幀之間怎麼對上有兩條路：indirect 先抽特徵點、最小化幾何重投影誤差；direct 直接比像素灰階、最小化光度誤差。選哪種誤差，就是又一次「選 loss＝選世界觀」。",
    "summary_en": "A camera is a known projection: K[R|t] squashes the 3D world into a 2D image, throwing away depth. So visual SLAM is an inverse problem — reconstruct the camera pose and 3D structure from 2D observations. Matching two frames has two roads: indirect extracts feature points and minimizes geometric reprojection error; direct compares pixel intensities and minimizes photometric error. Which error you pick is, once again, \"choosing a loss = choosing a worldview.\"",
    "tag": "代理工程"
  },
  {
    "id": "48",
    "slug": "deep-learning-for-slam-consistency-self-supervision",
    "title": "深度學習進 SLAM：把手工估計器換成學出來的，沒有標註時就用「一致性」自我監督",
    "title_en": "Deep Learning for SLAM: Replace Hand-Designed Estimators with Learned Ones — and When There's No Label, Use Consistency as Self-Supervision",
    "summary": "深度學習進 SLAM，做的就是把古典 pipeline 裡一個個手工設計的估計器換成學出來的——DeepVO 最激進，直接用 CNN+RNN 把整條 pipeline 端到端換掉。但最該帶走的是：沒有 ground truth 時，怎麼訓？用「一致性」當自我監督——往前算的光流該等於往後算的、左眼看的該對得上右眼、渲染出的影像該像真實影像。一致性，就是沒有金標時唯一的校正訊號。",
    "summary_en": "Deep learning for SLAM replaces the hand-designed estimators in the classical pipeline with learned ones — DeepVO being the most radical, swapping the whole pipeline end-to-end with a CNN+RNN. But the key takeaway: with no ground truth, how do you train? Use consistency as self-supervision — the forward flow should equal the backward flow, the left eye should match the right, the rendered image should look like the real one. Consistency is the only correction signal when there is no gold standard.",
    "tag": "代理工程"
  },
  {
    "id": "49",
    "slug": "rrt-sampling-vs-graph-search-planning",
    "title": "A* vs RRT*：窮舉網格的最優 vs 隨機取樣的可擴展——空間大到不能窮舉時，就撒點",
    "title_en": "A* vs RRT*: Grid Exhaustion's Optimality vs Random Sampling's Scalability — When the Space Is Too Big to Exhaust, Sample It",
    "summary": "HW1 要你用 A* 和 RRT* 兩種方法都解一次路徑規劃，而它們正是兩種世界觀。A* 把空間切成網格、系統地搜，最優但維度一高、解析度一細就爆掉。RRT 改成在連續空間隨機撒點、長出一棵樹，機率完備、能擴展到高維，RRT* 再靠 rewire 漸近逼近最優。空間大到不能窮舉時就撒點——這跟遊戲 AI 從 minimax 轉 MCTS 是同一招。",
    "summary_en": "HW1 asks you to solve path planning with both A* and RRT*, and they are two worldviews. A* chops space into a grid and searches systematically — optimal, but it blows up as dimension rises or resolution gets finer. RRT instead samples random points in continuous space and grows a tree — probabilistically complete, scalable to high dimensions, and RRT* rewires to approach optimality asymptotically. When the space is too big to exhaust, sample it — the same move as game AI going from minimax to MCTS.",
    "tag": "代理工程"
  },
  {
    "id": "50",
    "slug": "lateral-control-geometry-feedback-optimal",
    "title": "方向盤怎麼打：pure-pursuit 看幾何、Stanley 盯誤差、LQR 算最優——三種哲學的階梯",
    "title_en": "How to Steer: Pure-Pursuit Looks at Geometry, Stanley Watches the Error, LQR Computes the Optimum — a Ladder of Three Philosophies",
    "summary": "HW2 要你讓車沿著規劃好的路徑開，核心是橫向（方向盤）控制，而它有三種哲學，剛好是一道階梯：pure-pursuit 純看幾何——追前方一個 lookahead 點；Stanley 盯當下誤差——把橫向偏差和朝向偏差回授修正；LQR 算最優——有車體模型，最小化一個二次代價，在「跟得準」與「別亂打方向盤」之間取最優權衡。越往上，要的模型知識越多。",
    "summary_en": "HW2 asks you to drive a car along a planned path, and the heart of it is lateral (steering) control, which comes in three philosophies forming a ladder: pure-pursuit is pure geometry — chase a lookahead point ahead on the path; Stanley watches the current error — feed back the cross-track and heading deviation; LQR computes the optimum — with a vehicle model, it minimizes a quadratic cost, trading off \"track accuracy\" against \"don't thrash the wheel.\" The higher you climb, the more model knowledge you need.",
    "tag": "代理工程"
  },
  {
    "id": "51",
    "slug": "rl-reward-observation-design-is-the-job",
    "title": "RL 真正的工程在 reward 與 observation 的設計——演算法是最不難的部分",
    "title_en": "The Real Engineering in RL Is Designing the Reward and the Observation — the Algorithm Is the Easy Part",
    "summary": "HW3 一半是用 PPO 讓車沿路徑走（reward 現成、清楚），另一半是替 Proly 遊戲 agent「設計 reward 和 observation」——後者才是 RL 真正難的地方。演算法 PPO 是現貨；成敗取決於你怎麼定獎勵、給 agent 看什麼。設計 reward＝把「什麼叫做好」寫進系統，很容易獎勵到鑽漏洞的捷徑；設計 observation＝決定 agent 看得到什麼，看不到的它永遠學不會。",
    "summary_en": "Half of HW3 is using PPO to make a car follow a path (the reward is given and clear); the other half is designing the reward and observation for a Proly game agent — and that half is where RL is actually hard. PPO the algorithm is a commodity; success hinges on how you define the reward and what you let the agent see. Designing the reward writes \"what counts as good\" into the system, and it's easy to reward a loophole-exploiting shortcut; designing the observation decides what the agent can perceive, and it can never learn what it can't see.",
    "tag": "代理工程"
  },
  {
    "id": "52",
    "slug": "perception-for-navigation-detection-vs-segmentation",
    "title": "導航要先看懂世界：偵測給你「哪裡有什麼」、分割給你「每個像素是什麼」",
    "title_en": "Navigation Starts with Understanding the World: Detection Tells You Where Things Are, Segmentation Tells You What Every Pixel Is",
    "summary": "機器人要導航，得先把原始像素變成規劃器讀得懂的世界。HW4 要你訓一個 YOLO 做兩件事：偵測（框出目的地、障礙——稀疏的「哪裡有什麼」）和分割（判斷每個像素是路/牆/橋/河——稠密的「每個像素是什麼」）。偵測到障礙就繞開，分割出可走區域就知道往哪走。而你得自己在虛擬環境蒐資料、設計類別——感知的上限，又是被你蒐的資料鎖死。",
    "summary_en": "To navigate, a robot must first turn raw pixels into a world the planner can read. HW4 asks you to train a YOLO to do two things: detection (box the destination and obstacles — a sparse \"where are things\") and segmentation (label every pixel as road/wall/bridge/river — a dense \"what is every pixel\"). Detect an obstacle and route around it; segment the traversable region and you know where to go. And you must collect data in a virtual environment and design the categories yourself — so perception's ceiling is, once again, set by the data you gather.",
    "tag": "代理工程"
  },
  {
    "id": "53",
    "slug": "tests-are-the-spec-you-own-what-you-merge",
    "title": "AI 寫的程式，測試是你交出去的規格；你 merge 的，你負責",
    "title_en": "When AI Writes the Code, Tests Are the Spec You Hand Over — and You Own What You Merge",
    "summary": "AI 很會寫「看起來對」的程式——但看起來對不等於做對：HumanEval 只認「通過測試」不認「像參考答案」，Veracode 測逾百模型有 45% 引入漏洞，BaxBench 的正確後端約一半仍可被攻破。所以真正的交付物不是程式碼（那可重生），而是你寫的測試——它把「怎樣算對」釘死成可執行的規格。而一段文字規格可以被讀成好幾種意思，你不能執行一段文字。最後：當 AI 寫的程式出錯，負責的是按下 merge 的人；「AI 寫的」不該出現在 bug report、事故檢討或成績申訴裡。",
    "summary_en": "AI is great at code that looks right — but looking right isn't being right: HumanEval only counts a sample correct if it passes the tests, not if it resembles a reference; Veracode found 45% of 100+ models introduced vulnerabilities; about half of BaxBench's correct backends were still exploitable. So the real deliverable isn't the code (that's regenerable) — it's the tests you write, which pin down what 'right' means as an executable spec. A prose spec can be read several ways, and you can't run a paragraph. Finally: when AI-written code is wrong, the person who hit merge owns it; 'the AI wrote it' does not belong in a bug report, an incident review, or a grade appeal.",
    "tag": "軟體工程"
  },
  {
    "id": "54",
    "slug": "self-debugging-loop-diagnose-before-fix-stop-rule",
    "title": "用 AI 除錯要像科學家：先診斷再修、三次無進展就停、沒 traceback 就先寫一個會失敗的測試",
    "title_en": "Debug with AI Like a Scientist: Diagnose Before You Fix, Stop After Three Attempts, and When There's No Traceback, Write a Failing Test First",
    "summary": "跟 AI 跑除錯迴圈很便宜（貼錯誤→要診斷→修→再跑），危險的是不經思考地一直跑。三個紀律把它從「亂猜」變「科學」：① 先診斷再修——要 AI 給「三個可能原因＋各自怎麼驗」，驗證那步你自己做（沒驗過的原因只是講得很順的猜測，建立在錯診斷上的修一定錯）；② 停損規則——同一個問題三次無進展就停，換更小的例子、更清楚的規格、或自己讀；動手前先 git commit，永遠回得去；③ 沒有 traceback 的 bug（答錯、太慢、不安全都不會 crash）要先寫成一個會失敗的測試，迴圈才有靶、你才知道何時算修完。",
    "summary_en": "Running a debug loop with AI is cheap (paste the error, ask for a diagnosis, fix, run again); the danger is running it without thinking. Three disciplines turn it from guessing into science: (1) Diagnose before you fix — ask AI for 'three possible causes and how to check each,' but do the checking yourself (an unchecked cause is just a fluent guess, and a fix built on a wrong diagnosis is wrong however confident it sounds); (2) a stop rule — three attempts with no progress on the same problem, then stop and change something (a smaller example, a clearer spec, or read it yourself); git commit before you start so you can always go back; (3) a bug with no traceback (wrong answers, slow runs, security holes don't crash) must first be turned into a failing test, so the loop has a target and you know when you're done.",
    "tag": "軟體工程"
  },
  {
    "id": "55",
    "slug": "four-engineering-mindsets",
    "title": "四大工程思維：一層疊一層的能力槓桿階梯",
    "title_en": "Four Engineering Mindsets — A Layered Leverage Ladder for AI Capability",
    "summary": "讓 AI 從「只能接話」變成「能自主完成任務並越做越好」的四層槓桿：Prompt → Context → Harness → Loop，不是並列選項，是一層墊一層。",
    "summary_en": "Four layers of leverage that take AI from \"just completing text\" to \"finishing tasks autonomously and improving over time\" — Prompt → Context → Harness → Loop — not parallel options but a stack where each rests on the one below.",
    "tag": "AI 工程"
  },
  {
    "id": "56",
    "slug": "aima-ch01-rational-agent",
    "title": "AIMA Ch01：AI 的四種定義與理性代理人框架",
    "title_en": "AIMA Ch01: Four Definitions of AI and the Rational Agent Framework",
    "summary": "R&N 提出 AI 的四種定義，最終選「理性代理人」：不是模仿人，而是在給定知識下最大化績效期望值。",
    "summary_en": "R&N offer four definitions of AI, then commit to the 'rational agent': not mimicking humans, but maximising expected performance given available knowledge.",
    "tag": "AI/AIMA"
  },
  {
    "id": "57",
    "slug": "aima-ch02-intelligent-agents",
    "title": "AIMA Ch02：理性代理、PEAS 與代理架構階梯",
    "title_en": "AIMA Ch02: Rational Agents, PEAS, and the Agent Architecture Ladder",
    "summary": "AI 的統一框架是「代理」：感測環境、依績效量度選行動；PEAS 刻劃任務，七維環境決定選哪種架構——從簡單反射到學習型五級。",
    "summary_en": "The unifying AI framework is 'agent': perceive the environment, select actions to maximise a performance measure. PEAS describes the task; seven environment dimensions determine which architecture—simple reflex through learning agent—is appropriate.",
    "tag": "AI/AIMA"
  },
  {
    "id": "58",
    "slug": "linux-kernel-module-basics",
    "title": "Linux Kernel Module：動態插拔的 Kernel 擴充單元",
    "title_en": "Linux Kernel Module: Dynamically Loadable Kernel Extensions",
    "summary": "Kernel module 讓你在不重新編譯 kernel 的情況下動態擴充功能；代價是不能用 C 標準函式庫，也不能假設自己跑在 user space。",
    "summary_en": "Kernel modules let you extend the kernel at runtime without recompiling it — the trade-off is losing the C standard library and all user-space assumptions.",
    "tag": "Linux"
  },
  {
    "id": "59",
    "slug": "linux-char-device-driver",
    "title": "Character Device Driver：用 file_operations 把裝置接進 VFS",
    "title_en": "Character Device Driver: Hooking a Device into the VFS via file_operations",
    "summary": "字元裝置讓 user-space 程式可以像讀寫普通檔案一樣操作硬體；misc_register 是最簡潔的做法，自動搞定裝置號碼和 /dev/ 節點。",
    "summary_en": "Character devices let user-space programs interact with hardware exactly like a regular file. `misc_register` is the cleanest path — it handles device numbers and /dev node creation automatically.",
    "tag": "Linux"
  },
  {
    "id": "60",
    "slug": "kernel-user-data-transfer",
    "title": "Kernel-User Space 資料轉移：copy_to_user / copy_from_user",
    "title_en": "Kernel↔User Space Data Transfer: copy_to_user / copy_from_user",
    "summary": "Kernel 和 user space 有各自獨立的位址空間；直接解參考 user pointer 是未定義行為。正確做法是透過 copy_to_user / copy_from_user 安全搬資料。",
    "summary_en": "Kernel and user space have separate address spaces. Dereferencing a user pointer directly is undefined behavior — always use `copy_to_user` / `copy_from_user`.",
    "tag": "Linux"
  },
  {
    "id": "61",
    "slug": "kernel-mutex",
    "title": "Kernel Mutex：DEFINE_MUTEX 與 mutex_trylock 防競態",
    "title_en": "Kernel Mutex: DEFINE_MUTEX and mutex_trylock for Race-Free Device Access",
    "summary": "Kernel 的共用資料要靠 mutex 保護；字元裝置的慣用做法是在 open 用 trylock（已鎖就回 EBUSY），在 release 解鎖，讓同一時間只有一個行程能存取裝置。",
    "summary_en": "Shared kernel data needs mutex protection. The idiomatic character device pattern uses `trylock` in open (returns `EBUSY` if already locked) and `unlock` in release — ensuring only one process accesses the device at a time.",
    "tag": "Linux"
  },
  {
    "id": "62",
    "slug": "proc-filesystem",
    "title": "/proc 虛擬檔案系統：Kernel 資訊出口的輕量化管道",
    "title_en": "/proc Virtual Filesystem: Lightweight Kernel Information Export",
    "summary": "/proc 是 kernel 把內部狀態暴露給 user-space 的虛擬 FS；比字元裝置更輕量，不需要 major/minor number，適合唯讀的診斷資訊輸出。",
    "summary_en": "/proc is a virtual filesystem the kernel uses to expose internal state to user-space. Lighter than a character device — no major/minor number required. Ideal for read-only diagnostic exports.",
    "tag": "Linux"
  },
  {
    "id": "63",
    "slug": "system-calls",
    "title": "System Call：User-Space 進 Kernel 的唯一正門",
    "title_en": "System Calls: The Only Legitimate Gate from User-Space into the Kernel",
    "summary": "System call 是 user-space 程式唯一能合法進入 kernel 的路徑；x86 透過 `syscall` 指令，RISC-V 透過 `ecall`，完成特權切換（ring 3 → ring 0）。",
    "summary_en": "A system call is the only legitimate path from user-space into the kernel. On x86 it uses the `syscall` instruction; on RISC-V, `ecall`. Both trigger a privilege-level transition (user mode → kernel mode).",
    "tag": "Linux"
  },
  {
    "id": "64",
    "slug": "blocking-processes-waitqueue",
    "title": "Blocking 與 Wait Queue：讓 Kernel 優雅等待事件",
    "title_en": "Blocking and Wait Queues: Letting the Kernel Wait for Events Gracefully",
    "summary": "當 kernel 需要等待事件（硬體就緒、資料到達），不應 busy-wait；用 wait queue 讓行程睡眠，事件發生時 wake_up 喚醒，CPU 在等待期間可排班其他工作。",
    "summary_en": "When the kernel needs to wait for an event (hardware ready, data arrived), it should not busy-wait. Use a wait queue to put the process to sleep; call `wake_up` when the event fires. The CPU is free to schedule other work while waiting.",
    "tag": "Linux"
  },
  {
    "id": "65",
    "slug": "interrupt-handlers",
    "title": "中斷處理：Top Half 要快，Bottom Half 才做事",
    "title_en": "Interrupt Handlers: Top Half Must Be Fast, Bottom Half Does the Work",
    "summary": "中斷處理器跑在中斷情境（不能睡眠、不能用 mutex），必須極快完成；真正的工作放到 bottom half（tasklet 或 workqueue）在 process context 完成。",
    "summary_en": "Interrupt handlers run in interrupt context — no sleeping, no mutex. They must finish fast. Actual work goes into the bottom half (tasklet or workqueue) which runs in process context where sleeping is allowed.",
    "tag": "Linux"
  },
  {
    "id": "66",
    "slug": "process-fork-exec",
    "title": "Process 生命週期：fork / exec / wait 三步曲",
    "title_en": "Process Lifecycle: The fork / exec / wait Trilogy",
    "summary": "Unix process model 三個核心 syscall：fork 複製行程、exec 替換映像、wait 收割殭屍。理解這三步是寫 shell、daemon 或任何多行程程式的基礎。",
    "summary_en": "Three core syscalls define the Unix process model — fork copies a process, exec replaces its image, wait reaps the zombie. Understanding this trilogy is fundamental to writing shells, daemons, or any multiprocess program.",
    "tag": "Linux"
  },
  {
    "id": "67",
    "slug": "shared-memory-ipc",
    "title": "Shared Memory IPC：最快的行程間通訊",
    "title_en": "Shared Memory IPC: The Fastest Inter-Process Communication",
    "summary": "Shared memory 讓多個行程直接共用同一塊實體記憶體，資料不需複製，是所有 IPC 機制中吞吐量最高的；代價是必須自行用 semaphore 或 mutex 協調存取。",
    "summary_en": "Shared memory lets multiple processes map the same physical memory — no copying, maximum throughput. The tradeoff is that you must coordinate access yourself with a semaphore or mutex.",
    "tag": "Linux"
  },
  {
    "id": "68",
    "slug": "posix-threads-mutex",
    "title": "POSIX Threads：共享記憶體的並行模型",
    "title_en": "POSIX Threads: The Shared-Memory Concurrency Model",
    "summary": "Pthread 讓同一行程內多條執行緒共享位址空間，省去 IPC 的複製開銷；mutex 保護共享狀態，condition variable 讓執行緒等待條件成立而非 busy-wait。",
    "summary_en": "Pthreads run multiple threads within one process, sharing the address space — no IPC copying. Mutex guards shared state; condition variables let threads wait for conditions without spinning.",
    "tag": "Linux"
  },
  {
    "id": "69",
    "slug": "page-replacement",
    "title": "分頁置換演算法：LRU、LFU 與 Working Set",
    "title_en": "Page Replacement Algorithms: LRU, LFU, and Working Set",
    "summary": "當實體記憶體滿了，OS 要決定踢出哪個分頁；OPT 是理論上限，LRU 以歷史替代未來，LFU 看頻率，Clock 是 LRU 的低成本近似。理解這些演算法是 OS 課的核心題型。",
    "summary_en": "When physical memory is full, the OS must evict a page. OPT (optimal) is the theoretical ceiling. LRU approximates it with recency, LFU with frequency, Clock with a cheap bit-based approximation of LRU.",
    "tag": "Linux"
  },
  {
    "id": "70",
    "slug": "fuse-userspace-fs",
    "title": "FUSE：在 User-Space 實作檔案系統",
    "title_en": "FUSE: Implementing a Filesystem in User Space",
    "summary": "FUSE (Filesystem in Userspace) 讓你用普通使用者程式碼實作完整的 Linux 檔案系統，不用寫 kernel module；VFS 把操作透過 /dev/fuse 轉發，程序回傳結果，對上層完全透明。",
    "summary_en": "FUSE lets you implement a fully functional Linux filesystem as a regular user-space program — no kernel module needed. The kernel's VFS layer proxies all filesystem calls through /dev/fuse to your process, which handles them and returns results transparently.",
    "tag": "Linux"
  },
  {
    "id": "71",
    "slug": "booting-bootloader-kernel",
    "title": "開機流程：從按下電源到 Kernel 接手",
    "title_en": "Booting: From Power-On to Kernel Handoff",
    "summary": "按下電源後，CPU 從固定位址取第一條指令，經 ROM Bootloader → 二階段 Bootloader（GRUB/U-Boot）→ 解壓 kernel image → 跳進 start_kernel()，整個過程在任何 OS 控制之前完成。",
    "summary_en": "Power-on starts the CPU at a fixed reset vector. Control passes through ROM bootloader → second-stage bootloader (GRUB/U-Boot) → decompress kernel image → jump to start_kernel(). All of this happens before any OS code runs.",
    "tag": "Linux"
  },
  {
    "id": "72",
    "slug": "memory-allocators-buddy-slab",
    "title": "記憶體分配器：Buddy System 與 Slab",
    "title_en": "Memory Allocators: Buddy System and Slab",
    "summary": "Linux 實體記憶體用 Buddy System 管理（以 2^n 頁為單位，合併鄰居消除碎片）；小物件用 Slab/SLUB 分配器在 buddy 頁上切割，避免頻繁走 buddy 的高開銷。",
    "summary_en": "Linux manages physical memory with the Buddy System — allocate/free in power-of-two page blocks, merge freed \"buddies\" to defragment. Small kernel objects use the Slab allocator which carves up buddy pages into fixed-size caches, avoiding repeated costly buddy calls.",
    "tag": "Linux"
  },
  {
    "id": "73",
    "slug": "virtual-memory-paging",
    "title": "虛擬記憶體與分頁：每個行程都有自己的位址空間",
    "title_en": "Virtual Memory and Paging: Every Process Gets Its Own Address Space",
    "summary": "虛擬記憶體用多層 Page Table 把每個行程的虛擬位址映射到實體位址；TLB 快取最近的映射；Page Fault 是 OS 的入口，可用來實作 COW、demand paging、swap。",
    "summary_en": "Virtual memory uses a multi-level page table to map each process's virtual addresses to physical ones. The TLB caches recent mappings. Page faults are the kernel's hook for copy-on-write, demand paging, and swap-in.",
    "tag": "Linux"
  },
  {
    "id": "74",
    "slug": "vfs-virtual-filesystem",
    "title": "VFS：統一的虛擬檔案系統抽象層",
    "title_en": "VFS: The Unified Virtual Filesystem Abstraction",
    "summary": "VFS (Virtual File System) 是 Linux 的檔案系統抽象層，讓 ext4、tmpfs、procfs、FUSE 以及網路 FS 都能接受相同的 open/read/write/stat syscall；核心物件是 superblock、inode、dentry、file。",
    "summary_en": "VFS is Linux's filesystem abstraction — it lets ext4, tmpfs, procfs, FUSE, and network filesystems all respond to the same open/read/write/stat system calls. The four core objects are superblock, inode, dentry, and file.",
    "tag": "Linux"
  },
  {
    "id": "75",
    "slug": "kernel-synchronization",
    "title": "Kernel 同步：Spinlock、Semaphore 與 RCU",
    "title_en": "Kernel Synchronization: Spinlock, Semaphore, and RCU",
    "summary": "Kernel 同步工具依「是否可睡眠」和「讀/寫比例」分工：spinlock 用於中斷情境（不能睡眠），mutex/semaphore 用於行程情境（可睡眠），RCU 專為多讀少寫的資料結構設計。",
    "summary_en": "Kernel synchronization tools specialize by context and access pattern. Spinlock for interrupt context (non-sleeping). Mutex/semaphore for process context (can sleep). RCU (Read-Copy-Update) for read-mostly data structures — readers are lock-free and wait-free.",
    "tag": "Linux"
  }
];
