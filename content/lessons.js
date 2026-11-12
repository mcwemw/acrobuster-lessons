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
  }
];
