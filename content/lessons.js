// 講義清單 — 新增一張卡時,在陣列最後加一筆(見 AGENTS.md §4 步驟 B)
// 欄位: id / slug / title(中) / title_en / summary(中) / summary_en / tag
const LESSONS = [
  {
    id: "01",
    slug: "rag-faithfulness",
    title: "RAG 忠實度三層：PASS / WARN / FAIL",
    title_en: "Three Tiers of RAG Faithfulness: PASS / WARN / FAIL",
    summary: "別只問 AI「有沒有附來源」,要問「來源到底有沒有支持這句」。",
    summary_en: "Don't just ask whether the AI cited a source — ask whether the source actually supports the claim.",
    tag: "RAG"
  },
  {
    id: "02",
    slug: "context-engineering",
    title: "四層工程思維：Prompt → Context → Harness → Loop",
    title_en: "Four Layers of Engineering: Prompt → Context → Harness → Loop",
    summary: "把「跟 AI 一起工作」拆成四層槓桿,由近而遠、由戰術到制度。",
    summary_en: "Breaking \"working with AI\" into four layers of leverage — from tactical to systemic.",
    tag: "AI 工程"
  },
  {
    id: "03",
    slug: "intent-output-gap",
    title: "提示工程的核心：意圖 vs 輸出的落差",
    title_en: "The Heart of Prompt Engineering: the Intent–Output Gap",
    summary: "模型回的是你「寫出來的」,不是你「心裡想的」。那條縫就是提示工程要收的。",
    summary_en: "The model answers what you wrote, not what you meant. Closing that gap is what prompt engineering is.",
    tag: "提示工程"
  },
  {
    id: "04",
    slug: "agentic-three-responsibilities",
    title: "代理時代工程師的三職責：指定意圖 → 評估軌跡 → 收回控制",
    title_en: "The Engineer's Three Jobs in the Agentic Era: Specify Intent → Evaluate Trajectory → Take Back Control",
    summary: "AI 能自己跨步執行後,工程師的工作從「寫 code」變成三件事。",
    summary_en: "Once AI can execute across steps on its own, the engineer's job shifts from writing code to three things.",
    tag: "代理工程"
  },
  {
    id: "05",
    slug: "how-llms-work",
    title: "LLM 怎麼運作：下一個字預測 + 注意力",
    title_en: "How LLMs Work: Next-Token Prediction + Attention",
    summary: "模型不是在「查資料庫」,是在猜「最可能的下一個字」;attention 讓它決定每個詞該看句中哪些詞。",
    summary_en: "Not a database lookup — the model guesses the \"most likely next token\"; attention decides which words each word looks at.",
    tag: "模型原理"
  },
  {
    id: "06",
    slug: "ai-loop-discipline",
    title: "AI 入迴圈，工程紀律不減反前移",
    title_en: "AI in the Loop Doesn't Remove Engineering Discipline",
    summary: "讓 AI 幫你寫，省的是打字不是把關；紀律從事後審 code 前移到事前寫規格、當場對規格驗。",
    summary_en: "AI saves typing, not judgment; discipline moves forward — spec first, verify against it as you go.",
    tag: "軟體工程"
  },
  {
    id: "07",
    slug: "prompt-techniques-pitfalls",
    title: "提示工程技術地圖與它的陷阱",
    title_en: "A Map of Prompt-Engineering Techniques — and Their Pitfalls",
    summary: "few-shot、CoT 讓模型更會「看起來對」；但看起來對≠對，技巧的另一半是控制敏感度 + 驗證。",
    summary_en: "Few-shot and CoT make a model better at \"looking right\" — but looking right isn't being right; the other half is controlling sensitivity and verifying.",
    tag: "提示工程"
  },
  {
    id: "08",
    slug: "rlhf-preference-reward",
    title: "RLHF：把人的偏好變成獎勵，以及那條 KL 繩",
    title_en: "RLHF: Turning Human Preference into a Reward — and Why It Needs a KL Leash",
    summary: "RLHF 用「人更喜歡哪個回答」訓出獎勵模型再去最大化它；但獎勵是偏好的代理、不是真相，優化太狠就作弊，所以要拴 KL 繩。",
    summary_en: "RLHF trains a reward model from human preferences, then maximizes it; but the reward is a proxy for preference, not truth — over-optimize and it cheats, hence the KL leash.",
    tag: "模型原理"
  },
  {
    id: "09",
    slug: "llm-control-surface",
    title: "同一個機制，不同旋鈕：你真正能調的 LLM 行為",
    title_en: "One Mechanism, Different Knobs: What You Can Actually Tune in LLM Behavior",
    summary: "CoT、few-shot 是同一個「次字預測」機制的展現；你能調的是 context／message／system prompt，但設定了不等於照辦。",
    summary_en: "CoT and few-shot are one next-token mechanism; your knobs are context, message structure, and the system prompt — but setting them isn't being obeyed.",
    tag: "模型原理"
  },
  {
    id: "10",
    slug: "norms-before-building",
    title: "開工前先立規矩：團隊 AI 準則與評估前移",
    title_en: "Set the Rules Before You Build: Team AI Norms and Up-Front Evaluation",
    summary: "AI 協作專案最該前移的不是寫 code，是「工具做什麼／不做什麼、分歧怎麼用證據裁、成功長什麼樣」。",
    summary_en: "On an AI-assisted project, move the acceptance standard earliest: what tools are (and aren't) for, how evidence settles disputes, what success looks like.",
    tag: "軟體工程"
  },
  {
    id: "11",
    slug: "ai-is-an-amplifier",
    title: "AI 是放大器，不是均值回歸",
    title_en: "AI Is an Amplifier, Not a Great Equalizer",
    summary: "90% 開發者在用 AI、八成覺得更快，但只約四分之一真信任輸出；AI 不拉平團隊，它放大你本來的系統。",
    summary_en: "90% use AI and most feel faster, but only ~a quarter trust its output; AI doesn't level teams up — it amplifies the system you already have.",
    tag: "軟體工程"
  },
  {
    id: "12",
    slug: "process-is-load-bearing",
    title: "流程不是官僚，是保命索：專業軟體工程 vs 作業",
    title_en: "Process Isn't Bureaucracy, It's a Lifeline: Professional SE vs. a Coding Assignment",
    summary: "作業是一個人、交一次、交完就結束；專業軟體工程是多人、持續、有壓力的現實——版本控制與流程存在，就是為了讓這個現實活得下去。",
    summary_en: "An assignment is one person, submitted once, done; professional SE is multi-person, continuous, high-pressure — version control and process exist to make that reality survivable.",
    tag: "軟體工程"
  },
  {
    id: "13",
    slug: "self-correction-not-self-approval",
    title: "自我修正不是自我感覺良好：讓 AI 的 loop 真的變好",
    title_en: "Self-Correction Isn't Self-Approval: Making an AI Loop Actually Improve",
    summary: "天真地叫 AI「檢查一下你的答案」，常常只換來「看起來沒問題！」卻什麼都沒改；要真的變好，批判得具體、得「難過關」、得封頂加人審。",
    summary_en: "Naively telling an AI to \"check your answer\" often just yields \"looks fine!\" with nothing changed; to actually improve, the critique must be specific, hard to pass, capped, and backed by human review.",
    tag: "模型原理"
  },
  {
    id: "14",
    slug: "prompt-engineering-is-empirical",
    title: "提示工程是量出來的，不是刻出來的：先定指標、再搜尋、用多數決",
    title_en: "Prompt Engineering Is Measured, Not Hand-Crafted: Metric First, Then Search, Then Vote",
    summary: "好 prompt 不是坐在那邊想詞想出來的——先有一把尺（成功標準＋能跑的評測），再把 prompt 當成要搜尋的東西優化，必要時多抽幾次取多數。這是把機器學習的老紀律搬到提示上。",
    summary_en: "A good prompt isn't wordsmithed into existence — first build a ruler (criteria plus a runnable eval), then search-and-optimize the prompt, and sample-and-vote when needed. Classic ML discipline applied to prompting.",
    tag: "提示工程"
  },
  {
    id: "15",
    slug: "prompt-structure-five-components",
    title: "提示有結構，不只有技術：五個組件讓規格變成評測表",
    title_en: "Prompts Have Structure, Not Just Technique: Five Components That Turn a Spec into an Eval Checklist",
    summary: "大多數 prompt 失敗不是因為技術選錯——是結構出了問題。一個 prompt 有五個組件：角色、脈絡、任務、格式、限制條件；在下 prompt 之前先寫規格，那份規格就直接變成驗收清單。",
    summary_en: "Most prompt failures aren't about which technique you chose — they're structural. A prompt has five components: role, context, task, format, constraints; writing the spec before the prompt turns that spec into your evaluation checklist.",
    tag: "提示工程"
  },
  {
    id: "16",
    slug: "sycophancy-is-trained-in",
    title: "你的 AI 評審天生會拍馬屁：諂媚是訓練出來的，不是 prompt 勸得退的",
    title_en: "Your AI Judge Is Sycophantic by Construction: Flattery Is Trained In, Not Promptable Away",
    summary: "諂媚不是 bug，是 RLHF 大規模最佳化人類偏好的必然副產物，被烤進模型裡；prompt 勸不退。更麻煩的是：你專案裡任何拿 LLM 當裁判的元件，天生都繼承這個偏誤——要用 pushback＋consistency 去量。",
    summary_en: "Sycophancy isn't a bug — it's an emergent byproduct of optimizing human preference at scale in RLHF, baked into the model; you can't prompt it away. Worse: any component using an LLM as a judge inherits the bias by construction — measure it with pushback and consistency tests.",
    tag: "模型原理"
  },
  {
    id: "17",
    slug: "more-training-not-more-aligned",
    title: "更多對齊訓練不一定更對齊：偏誤的訊號、反向擴展、與憲法解方",
    title_en: "More Alignment Training Isn't Always More Aligned: Biased Signals, Inverse Scaling, and the Constitutional Fix",
    summary: "「對齊=多訓練就會好」是天真假設：用來對齊的訊號本身愛聽好話，有些失效還隨模型變大、RLHF 變多而更嚴重（反向擴展）。對齊不是一次撥好的開關——把價值寫成可稽核的憲法，再對著 ground truth 持續量測。",
    summary_en: "\"Alignment = just train more\" is naive: the signal you align against prefers flattery, and some failures get worse as models grow and RLHF accumulates (inverse scaling). Alignment isn't a one-time switch — write the values down as an auditable constitution and keep measuring against ground truth.",
    tag: "模型原理"
  },
  {
    id: "18",
    slug: "prompt-failure-diagnosis",
    title: "提示失效不是玄學：五個可診斷的失效模式，同一個根因",
    title_en: "Prompt Failures Aren't Random: Five Diagnosable Failure Modes, One Root Cause",
    summary: "「換個詞再試試看」不是診斷——那是在猜。五種失效（敏感性、幻覺、諂媚、過度拒絕、偏見）每一種都有指紋、測試、修法；根源同一個：next-token 預測。先識別類別，才能工程化地修。",
    summary_en: "\"Try different wording\" isn't a diagnosis — it's a guess. Each of the five failure modes (sensitivity, hallucination, sycophancy, over-refusal, bias) has a fingerprint, a test, and a first fix; all trace to one root: next-token prediction. Name the mode first, then engineer the fix.",
    tag: "提示工程"
  },
  {
    id: "19",
    slug: "tools-are-contracts",
    title: "工具不是能力，是契約：模型呼叫工具仍然只是在猜，所以「定義工具」就是寫介面規格",
    title_en: "A Tool Isn't a Capability, It's a Contract: Calling a Tool Is Still Prediction — So Defining Tools Is Interface Design",
    summary: "模型不會「做事」——它只吐出一段 tool call(name＋arguments)，由外部 runtime 執行。工具呼叫的品質＝模型對「你寫的工具描述」做 next-token 預測的品質。ReAct 讓它先想再動、Toolformer 證明工具用法是學出來的、Claude 文件說詳細描述是頭號效能因子、MCP 把介面標準化——合起來：寫工具是介面設計，不是 prompt 技巧。",
    summary_en: "A model doesn't act — it emits a tool call (name + arguments) that an external runtime executes. Call quality equals next-token prediction conditioned on the description you wrote. ReAct: reason before acting; Toolformer: tool use is learned; Claude's docs: detailed descriptions are the top performance factor; MCP: standardize the interface. Together: writing tools is interface design, not a prompting trick.",
    tag: "代理工程"
  },
  {
    id: "20",
    slug: "slopsquatting-supply-chain",
    title: "Slopsquatting：機器幻覺變成供應鏈攻擊面——為什麼它比打錯字更難防",
    title_en: "Slopsquatting: When Machine Hallucination Becomes a Supply-Chain Attack Surface",
    summary: "Typosquatting 賭你手滑(lodahs←lodash)；slopsquatting 賭 AI 嘴瓢——套件名是 AI 從零捏造、從不存在的，所以拼字過濾擋不住。致命的是幻覺「可預測」(同名跨次重複)，攻擊者能預先搶注埋惡意程式。三層防線：人工確認存在性、human-in-the-loop 安裝審批、SCA/Snyk/Socket 掃描。推薦 ≠ 存在。",
    summary_en: "Typosquatting bets on your typo (lodahs←lodash); slopsquatting bets on the AI's slip — a name the AI fabricated that never existed, so spell-check filters miss it. The killer: hallucinations are predictable (same names recur), so attackers pre-register them with malware. Three-layer defense: verify existence, human-in-the-loop install approval, SCA/Snyk/Socket scanning. Recommended isn't real.",
    tag: "軟體工程"
  },
  {
    id: "21",
    slug: "tool-use-is-a-tradeoff",
    title: "代理工具用量是要量測的權衡，不是一次修好的 bug：四種失效會互相拉扯，而「今天沒壞」不算證據",
    title_en: "Agent Tool-Use Is a Measured Trade-off, Not a One-Time Fix: The Four Failures Pull Against Each Other, and \"Didn't Fail Today\" Isn't Evidence",
    summary: "把三工具 agent 的描述寫爛，會看到四種工具專屬失效(選錯工具/參數錯/不必要呼叫/漏呼叫)。但真正體悟有二：① 失效互相拉扯——修「少呼叫」會弄壞「多呼叫」，你在調權衡不是修獨立 bug；② 工具呼叫是隨機的，「跑一次沒壞」不是證據，要計次量、壓測逼、持續監控。描述會驅動行為：一句「不知道再查」就能製造漏呼叫。",
    summary_en: "Weaken a three-tool agent's descriptions and you see four tool-specific failures (wrong tool / wrong params / unnecessary call / missed call). Two real lessons: ① they pull against each other — fixing \"call less\" breaks \"call more,\" so you tune a trade-off, not fix independent bugs; ② tool-calling is stochastic, so one clean run isn't evidence — measure with counts, stress it, monitor it. Descriptions drive behavior: one line like \"look it up only if you don't already know\" manufactures the missed call.",
    tag: "代理工程"
  },
  {
    id: "22",
    slug: "validate-tool-arguments-not-eval",
    title: "別 eval 模型輸出：工具參數是外人打的字，要驗不要跑",
    title_en: "Don't Eval Model Output: Treat Every Tool Argument as Input From a Stranger — Parse and Validate, Never Execute",
    summary: "模型回傳工具參數，但工具是你在跑——所以模型輸出是你的攻擊面。eval() 一個模型回的運算式等於給模型一個 shell；清空 __builtins__ 擋不住類別繼承逃逸；提示注入讓文件裡的惡意文字劫持 tool call。正確做法：AST parser + 白名單，驗每個參數如同外人打的字。MCP 的「Results are untrusted」說的是同一件事。",
    summary_en: "The model emits tool arguments; you run the tool — so model output is your attack surface. eval()-ing a model-returned expression hands it a shell; stripping __builtins__ doesn't sandbox it; prompt injection in a pasted document can hijack tool calls. Fix: AST parser + allowlist, validate every argument as if a stranger typed it. MCP's \"Results are untrusted\" is the same principle.",
    tag: "軟體工程"
  },
  {
    id: "23",
    slug: "rag-two-failure-layers",
    title: "RAG 是兩個獨立的失效層：先用免費、決定性的指標量檢索，再碰 prompt",
    title_en: "RAG Has Two Independent Failure Layers: Measure Retrieval First (Free, Deterministic), Then Touch the Prompt",
    summary: "RAG 不是黑盒，是「檢索→生成」兩層。檢索可以完全不呼叫模型就量——hit@k／MRR 是決定性的、免費的，能跑上百個實驗調 chunk／k／retriever；生成才是花錢又隨機的那層。紀律：檢索沒撈到的證據 prompt 救不回來，所以答錯時先問「是哪一層、哪種錯」（沒撈到／讀錯／衝突／無中生有／跟從注入），答案決定修法。",
    summary_en: "RAG isn't a black box — it's retrieve → generate. Retrieval scores with no model call: hit@k / MRR are deterministic and free, so you run hundreds of experiments tuning chunk / k / retriever; generation is the expensive, stochastic layer. Discipline: no prompt recovers evidence retrieval never fetched — so when an answer is wrong, first name the layer and failure type (miss / misread / conflict / invented / injection); the name tells you whether to fix retrieval or the prompt.",
    tag: "RAG"
  },
  {
    id: "24",
    slug: "evaluate-the-evaluator",
    title: "自動評估本身要被評估：RAGAS 給你 reference-free 的三指標，但沒對齊人類的 LLM 裁判只是「自動化的自評」",
    title_en: "Evaluate the Evaluator: RAGAS Gives You Reference-Free Metrics, but an Unvalidated LLM Judge Is Just Automated Self-Evaluation",
    summary: "RAGAS（Shahul Es 等，2023）把「RAG 答得好不好」拆成三個不需人工標準答案的指標：Faithfulness（答案主張逐條對檢索脈絡查，支持數／總數）、Context Precision（相關段落有沒有排前面）、Answer Relevancy（從答案反生問題再比對原題）。但 Hamel Husain 提醒：指標背後是會錯、會諂媚的 LLM 裁判——要先用人類標註驗證（抓到率＋誤報率、一種失效一個裁判），才有資格信它的分數。沒驗過的裁判＝自動化的自評。",
    summary_en: "RAGAS (Shahul Es et al., 2023) splits \"is the RAG answer good\" into three reference-free metrics: Faithfulness (verify each answer claim against retrieved context, supported/total), Context Precision (are relevant chunks ranked high), Answer Relevancy (generate questions back from the answer, compare to the original). But Hamel Husain's warning: behind the metrics sits an LLM judge that errs and flatters — validate it against human labels (catch rate + false-alarm, one judge per failure type) before trusting its scores. An unvalidated judge is self-evaluation, automated.",
    tag: "RAG"
  },
  {
    id: "25",
    slug: "context-window-is-a-budget",
    title: "上下文視窗是預算，不是免費空間：為什麼要檢索——因為「塞好塞滿」會死在成本、雜訊、和「迷失在中間」",
    title_en: "The Context Window Is a Budget, Not Free Space: Why Retrieve at All — Stuffing Everything In Dies on Cost, Noise, and Lost-in-the-Middle",
    summary: "模型沒記憶，你送進視窗的就是它知道的全部；而視窗是有限預算。全塞知識庫三面受敵：每個 token 計費（成本）、無關文字讓模型分心（雜訊）、「迷失在中間」讓中段的關鍵事實被忽略（位置，Liu 2023，連長 context 模型也一樣）。所以重要的放兩端、寧少勿濫。不能全塞就必須挑，RAG＝自動挑；挑把風險搬到可量測的問題：「我們挑對文字了嗎？」——這就是卡 23/24 檢索評估的起點。",
    summary_en: "The model has no memory — what you send is all it knows — and the window is a finite budget. Stuffing the whole KB in fails three ways: every token billed (cost), irrelevant text distracts (noise), lost-in-the-middle ignores mid-context facts (position, Liu 2023, even long-context models). So put important material at the edges, prefer fewer better passages. Can't include everything → you must select; RAG is automated selection; selecting relocates risk to a measurable question — \"did we select the right text?\" — where cards 23/24's retrieval evaluation begins.",
    tag: "AI 工程"
  },
  {
    id: "26",
    slug: "test-prompts-like-code",
    title: "Prompt 要像程式一樣被測試：分層檢查 × 輸入類別覆蓋 × 每修必加回歸，才叫「做完」",
    title_en: "Test Prompts Like Code: Layered Checks × Input-Category Coverage × a Regression Test for Every Fix Is What \"Done\" Means",
    summary: "一個 prompt「跑一次對了」不叫做完；做完是它有一組測試套件把行為釘住。Week 10 用 promptfoo 把 prompt 當程式測：每個測試是分層的獨立檢查（格式→schema→正確性→安全，全過才算過）、覆蓋多種輸入類別（典型／空／超長／分隔符衝突／輸入敏感／預測失效），每修一個失效就加一條回歸測試，再用 --repeat 逼出隨機不穩。優先用決定性程式碼檢查；而且十個案例仍分不開訊號與抽樣雜訊。",
    summary_en: "A prompt that \"worked once\" isn't done; done is a test suite that pins its behavior. Week 10 uses promptfoo to test prompts like code: each test is layered independent checks (format → schema → correctness → safety, all must pass), covering input categories (typical / empty / very long / delimiter-conflict / input-sensitivity / predicted-failure), with a regression test added for every fix, and --repeat to expose stochastic flakiness. Prefer deterministic code checks; and ten cases still can't separate signal from sampling noise.",
    tag: "軟體工程"
  },
  {
    id: "27",
    slug: "error-bars-on-evals",
    title: "Eval 分數要有誤差棒：「10/10 通過」的真實失效率上界可能是 30%——因為 0 失效 ≠ 0% 失效",
    title_en: "Put Error Bars on Eval Scores: \"10/10 Passed\" Allows a True Failure Rate up to ~30% — Because Zero Failures ≠ a Zero Failure Rate",
    summary: "沒有誤差棒的 eval 分數不是結果。評估是實驗：題目是樣本，裸的「80% 通過」沒有不確定區間等於沒說。三的法則：某事在 n 次試驗零次發生，真實發生率 95% 上界 ≈ 3/n → 10/10 容得下 ~30% 失效率。比較模型要配對題目（同題抵銷難易雜訊、更有檢定力），差異要看信賴區間有沒有重疊；面向客戶看 pass^k 不是 pass@k（75%³≈42%）；eval 一旦飽和只剩抓退步、量不出進步。",
    summary_en: "An eval score without an error bar isn't a result. Evaluations are experiments: questions are a sample, and a bare \"80% pass\" with no interval says nothing. Rule of three: zero events in n trials → 95% upper bound ≈ 3/n, so 10/10 allows a true failure rate up to ~30%. Compare models with paired questions (same items cancel difficulty noise, more power) and check whether intervals overlap; for customer-facing work read pass^k not pass@k (0.75³≈42%); and once an eval saturates it only catches regressions, not gains.",
    tag: "AI 工程"
  },
  {
    id: "28",
    slug: "already-testing-badly-silent-failures",
    title: "你早就在測了，只是測得爛：「試幾次覺得 OK」是一個爛測試套件，而最危險的失效是沉默的",
    title_en: "You're Already Testing — Just Badly: \"Tried It a Few Times\" Is a Weak Test Suite, and the Most Dangerous Failures Are Silent",
    summary: "「我在五個例子上試過，看起來不錯」已經是測試了，只是 size-5 的爛套件：①那五個是你自己挑的、②沒寫下「好」是什麼（憑感覺）、③什麼都沒存，改完不能重跑。失效按「多容易被發現」分三種：格式（破壞程式、大聲報）、邊界（奇怪輸入壞結果、有時）、沉默（格式對、讀來合理、但錯，沒人直到很久以後）。沉默失效只有在你先寫下「對」長什麼樣時才現形——這就是 oracle 問題。prompt 測試像軟體測試但非決定性、期望的是行為不是逐字、失敗的測試有時是測試的 bug。",
    summary_en: "\"Tried it on five examples, looks good\" already is testing — just a weak suite of size 5: the five were self-chosen; nobody wrote down what \"good\" means; nothing is saved to rerun. Failures split by visibility: format (breaks the program, loud), edge (odd input, bad result, sometimes), and silent (well-formed, plausible, wrong — nobody until much later). Silent failures only appear once you've written down what \"right\" looks like — the oracle problem. Prompt testing is like software testing but non-deterministic, expects a behavioral property not exact text, and a failing test is sometimes a bug in the test.",
    tag: "提示工程"
  },
  {
    id: "29",
    slug: "prompt-broke-check-withheld-context",
    title: "Prompt 壞掉，先查你漏給了什麼脈絡：在團隊裡，一半的「規格」藏在沒說出口的慣例裡",
    title_en: "When a Prompt Breaks, First Check What Context You Withheld: In a Team, Half the \"Spec\" Lives in Unspoken Conventions",
    summary: "prompt 產出的碼壞掉，最常見原因不是模型笨，是你漏給了脈絡。Assignment 1 的診斷題故意這樣設計：三個隊友 prompt 失敗，正因各漏一個隱藏需求——團隊 CONVENTIONS.md、utils.py 的 helper、或沒明說的 urgency 規則。模型忠實照著不完整的 prompt 做了。所以診斷=指出規格漏了什麼，不是罵模型——這把卡 03「意圖 vs 輸出落差」銳化到團隊維度。附帶：技法不是咒語要刻意選再看差異（Part 1）；評分只給逐字 prompt＋完整回應＋反思，checker 輸出只算佐證。",
    summary_en: "When prompt-generated code breaks, the usual cause isn't a dumb model — it's context you withheld. Assignment 1's diagnosis task is built on this: three teammates' prompts fail because each omits a hidden requirement — the team CONVENTIONS.md, a utils.py helper, or an unspoken urgency rule. The model did exactly what the incomplete prompt said. So diagnosis = naming what the spec left out, not blaming the model — sharpening card 03's intent–output gap into the team dimension. Riders: techniques aren't magic words, choose deliberately and observe the difference (Part 1); and credit comes from verbatim prompt + full response + reflection, checker output is evidence only.",
    tag: "提示工程"
  },
  {
    id: "30",
    slug: "define-success-before-you-build",
    title: "先定義「怎樣算成功」再開始蓋：驗收標準、最低證據門檻、human-AI 邊界，都在 discovery 就定下",
    title_en: "Define Success Before You Build: Fix the Acceptance Bar, the Minimum Evidence Threshold, and the Human-AI Boundary at Discovery",
    summary: "CP1 把「評估」放在「建造」之前：認真開蓋前，先寫下「我們怎麼知道這工具有用」——成功定義＋最低證據門檻＋用 AI 時的 human-AI 邊界；問題要用真實使用者證據撐（≥2 次真人對話），不是自己斷言。評分鐵律：「不確定從不扣分，超出你證據的宣稱才扣分。」這是卡 28「先寫下『對』長什麼樣」的專案版，也是 SDD/TDD/BDD「先定驗收再做」——量一個還不存在的東西，就是在它存在前先決定要量什麼、量到多少才算數；而這在 discovery 最便宜。",
    summary_en: "CP1 puts evaluation before building: before serious work, write down how you'll know the tool worked — a success definition + a minimum evidence threshold + the human-AI boundary if AI is in the loop — and ground the problem in real-user evidence (≥2 conversations), not assertion. The grading rule: \"Uncertainty is never penalised; claims that go beyond your evidence are.\" It's card 28's \"write down what right looks like\" at the project level, and SDD/TDD/BDD's acceptance-criteria-first: the way to measure a thing that doesn't exist yet is to decide, before it exists, what you'll measure and how much counts — cheapest at discovery.",
    tag: "AI 工程"
  }
];
