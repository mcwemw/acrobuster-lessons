// 講義清單 — 新增一張卡時,在陣列最後加一筆(見 AGENTS.md §4 步驟 B)
// 欄位: id(兩位數,與檔名 NN 一致) / slug / title / summary / tag
const LESSONS = [
  {
    id: "01",
    slug: "rag-faithfulness",
    title: "RAG 忠實度三層：PASS / WARN / FAIL",
    summary: "別只問 AI「有沒有附來源」,要問「來源到底有沒有支持這句」。",
    tag: "RAG"
  },
  {
    id: "02",
    slug: "context-engineering",
    title: "四層工程思維：Prompt → Context → Harness → Loop",
    summary: "把「跟 AI 一起工作」拆成四層槓桿,由近而遠、由戰術到制度。",
    tag: "AI 工程"
  },
  {
    id: "03",
    slug: "intent-output-gap",
    title: "提示工程的核心：意圖 vs 輸出的落差",
    summary: "模型回的是你「寫出來的」,不是你「心裡想的」。那條縫就是提示工程要收的。",
    tag: "提示工程"
  }
];
