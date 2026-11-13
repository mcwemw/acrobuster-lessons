// 每日論文筆記清單 — cron 每天在最前面 unshift 一筆(最新在上)。
// 欄位: date / title(中) / title_en / source / img(notes/ 內的檔名)
const NOTES = [
  {
    date: "2026-11-14",
    title: "Ragas — 不靠人工標準答案,自動評 RAG 的多個維度",
    title_en: "Ragas — reference-free automated evaluation of RAG pipelines",
    source: "Es et al. 2023 · arXiv:2309.15217 · CC-BY-4.0",
    img: "2026-11-14_ragas.png"
  },
  {
    date: "2026-11-13",
    title: "The Instruction Hierarchy — 教 LLM 分指令優先級、擋越權",
    title_en: "The Instruction Hierarchy — teaching LLMs to prioritize privileged instructions",
    source: "Wallace et al. 2024 · OpenAI · arXiv:2404.13208",
    img: "2026-11-13_instruction-hierarchy.png"
  },
  {
    date: "2026-11-12",
    title: "The Prompt Report — prompt 技術的系統性 survey",
    title_en: "The Prompt Report — a systematic survey of prompt engineering",
    source: "Schulhoff et al. 2024 · arXiv:2406.06608 · CC-BY-4.0",
    img: "2026-11-12_prompt-report.png"
  }
];
