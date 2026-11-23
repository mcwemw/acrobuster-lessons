---
question: RAG（Retrieval-Augmented Generation）是什麼？Lewis 2020 如何把「查資料」接進 LLM？
keywords: [rag, retrieval-augmented-generation, dpr, bart, faithfulness]
type: source
source: Lewis et al., NeurIPS 2020 — "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
license: arXiv:2005.11401，可公開引用
---

# RAG — Retrieval-Augmented Generation（Lewis et al. 2020）

> 來源頁。**primary source**：Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, Douwe Kiela, *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, **NeurIPS 2020, arXiv:2005.11401**。

## 核心問題

LLM 把知識壓進參數裡（parametric knowledge），**更新慢、不透明、難追來源**。若能在推論時動態查外部文件（non-parametric），就可以解耦「知識來源」與「推論能力」。

## 機制（trace → arXiv:2005.11401）

RAG = **Dense Retriever（DPR）+ Sequence-to-Sequence 生成器（BART）**，端對端聯合訓練。

1. **DPR 檢索**：用 bi-encoder 把問題與 Wikipedia chunk 各自 embed，cosine 取 Top-k 段落。
2. **BART 生成**：把問題 + Top-k 段落拼接成 context，餵給 BART 生成答案。
3. **兩種生成模式**：
   - **RAG-Sequence**：每個答案 token 對同一組文件做條件生成，每份文件一個完整答案，再加權合併。
   - **RAG-Token**：逐 token 決定要用哪份文件，每步獨立 marginalize；支持同一個答案拼接多份文件資訊。

## 忠實度缺口（faithfulness gap）

RAG 減少幻覺，但**不保證消除**：生成器（BART）仍帶參數化知識，可以「繞過」檢索內容補充內容。引用不代表每句話都真的被文件支持。這正是後來 RAGAS、Self-RAG 等驗證方法要解決的問題。

## 授權 / provenance

- primary paper arXiv:2005.11401 / NeurIPS 2020，可公開引用。
- 機制描述 trace 論文 §2–3（DPR、BART、RAG-Sequence/Token formulation）。

