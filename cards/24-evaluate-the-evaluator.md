---
id: "24"
slug: evaluate-the-evaluator
tag: RAG
title: 自動評估本身要被評估：RAGAS 給你 reference-free 的三指標，但沒對齊人類的 LLM 裁判只是「自動化的自評」
title_en: "Evaluate the Evaluator: RAGAS Gives You Reference-Free Metrics, but an LLM Judge You Haven't Validated Against Humans Is Just Automated Self-Evaluation"
title_short: 自動評估本身要被評估：RAGAS 與「驗你的裁判」
summary: RAGAS 把「這個 RAG 答案好不好」拆成三個**不需人工標準答案**就能算的指標（Faithfulness／Context Precision／Answer Relevancy），所以你能大規模自動跑。但 Hamel Husain 的警告是另一半：這些指標背後是一個 LLM 裁判，而裁判也是會錯、會諂媚的模型。所以在你信任它的分數之前，**要先用人類標註驗證這個裁判**——沒驗過的 LLM 裁判，等於把自評偷偷自動化。
summary_en: "RAGAS decomposes \"is this RAG answer good\" into three metrics you can compute **without a human gold answer** (Faithfulness, Context Precision, Answer Relevancy), so you can run them at scale. But Hamel Husain supplies the other half: behind those metrics sits an LLM judge, and a judge is itself a model that errs and flatters. Before you trust its scores, **validate the judge against human labels** — an unvalidated LLM judge is self-evaluation, quietly automated."
links: []
---
## 是什麼 · What it is

RAGAS（Shahul Es、Jithin James、Luis Espinosa-Anke、Steven Schockaert，2023）是一個 **reference-free**（不需 ground-truth 人工標準答案）的 RAG 自動評估框架。它把籠統的「答得好不好」拆成三個各自可算的指標：

| 指標 | 怎麼算 | 需要的輸入 / 範圍 |
|---|---|---|
| **Faithfulness**<br>答案忠不忠於檢索脈絡 | 把答案拆成一條條**主張（claims）**→ 逐條檢查能否從檢索到的脈絡推得 → 分數 = 被支持的主張數 / 總主張數 | question＋answer＋retrieved contexts（**不需** ground-truth）／ 0–1。官方例：愛因斯坦答案「生於德國」被支持、「生於 3/20」與脈絡（3/14）矛盾 → 1/2＝**0.5** |
| **Context Precision**<br>檢索器有沒有把相關段落排前面 | 對前 K 個檢索段落取 <code>precision@k</code> 的加權平均（＝Average Precision 結構）：相關段落排越前、分數越高 | question＋retrieved contexts＋reference（有一個 reference-free 變體改用 answer）／ 0–1 |
| **Answer Relevancy**<br>答案有沒有真的回到問題 | 用 LLM 從答案**反向生成 N 個問題**（預設 N=3）→ 算每個生成問題和原問題的 embedding 餘弦相似度 → 取平均。**不檢查事實對錯**，只罰「答非所問／不完整／冗贅」 | question＋answer＋LLM＋embedding 模型／ ~0–1 |

三個指標剛好對到 [[23-rag-two-failure-layers|卡 23]] 的兩層：Context Precision 量**檢索層**，Faithfulness＋Answer Relevancy 量**生成層**。而「reference-free」是關鍵賣點——不用先人工寫標準答案，就能把 [[01-rag-faithfulness|卡 01 的忠實度概念]]變成可以大規模跑的數字。

::: en
RAGAS (Shahul Es, Jithin James, Luis Espinosa-Anke, Steven Schockaert, 2023) is a **reference-free** framework for evaluating RAG — no human gold answer required. It splits "is the answer good" into three computable metrics. *Faithfulness*: break the answer into claims, check each is inferable from the retrieved context, score = supported / total. *Context Precision*: a weighted mean of precision@k (Average-Precision structure) — are relevant chunks ranked high. *Answer Relevancy*: an LLM generates N questions from the answer, then cosine-compares them to the original question; it rewards addressing the question, not factual accuracy. The three map onto [[23-rag-two-failure-layers|card 23]]'s two layers (Context Precision = retrieval; Faithfulness + Answer Relevancy = generation), and "reference-free" is the selling point: you turn [[01-rag-faithfulness|card 01's faithfulness idea]] into numbers you can run at scale.
:::

## 為什麼重要 · Why it matters

RAGAS 讓你「能大規模量」，但 Hamel Husain 的《AI Evals FAQ》補上更硬的一半：**能自動量 ≠ 可以信那個數字**。因為每個 RAGAS 指標背後都是一個 LLM 裁判，而裁判本身是會錯、會[[16-sycophancy-is-trained-in|諂媚（卡 16）]]的模型。Hamel 的幾條直球：

      <ul>
        <li><strong>怎麼知道能不能信自動評估？</strong>拿人類標註過的例子驗它，同時量兩個數：抓到失敗的比率（catch rate）<em>和</em>誤報率（false alarm）——只看前者會自我感覺良好。留一組 hold-out 做最後查核。</li>
        <li><strong>LLM 裁判跟人類標註不合怎麼辦？</strong>先<strong>人工檢查分歧的根因</strong>（脈絡不足？指令含糊？）再談自動調 prompt。最常見的錯：叫一個裁判一次抓太多種錯 → 應該<strong>一種失效類型配一個專門裁判</strong>。</li>
        <li><strong>該用「開箱即用」的通用指標嗎？</strong>別當品質量尺。通用指標「當成品質量測會浪費時間、製造假信心」；它們只能當<strong>探索訊號</strong>，幫你撈出值得人工複審的 trace。</li>
        <li><strong>CI/CD vs 線上監控？</strong>CI＝改動應用時跑一組固定 eval 當回歸測試；production＝在事故、客訴暴增或指標漂移後，反向抽樣真實 trace 來看。（抽樣訣竅：隨機＋分群＋離群＋分類器旗標混用，但每批都留一些純隨機的，才抓得到你訊號漏掉的失效。）</li>
      </ul>

把這張卡接回本站（作者觀點 Author's view）：RAGAS 是你**開始**量的地方，不是你**得以信任**那個數字的地方。一個沒對齊人類的 LLM 裁判，本質上就是**把「自評」自動化**——而這正是 Maker/Checker 紀律要擋的事：checker 自己也要被 check。[[01-rag-faithfulness|卡 01]] 給你忠實度的三層概念、[[23-rag-two-failure-layers|卡 23]] 教你先量檢索——這張卡補上第三件事：**先驗你的量尺，再信它的讀數**。這也是 [[14-prompt-engineering-is-empirical|卡 14「量出來不是刻出來」]]的自然終點——量之前，先確定你的尺是準的。

::: src
出處 Source：① Shahul Es、Jithin James、Luis Espinosa-Anke、Steven Schockaert（2023），《RAGAS: Automated Evaluation of Retrieval Augmented Generation》，arXiv:2309.15217——框架自述為 reference-free「not tied to having ground truth available」。② RAGAS 官方文件三頁（docs.ragas.io）Faithfulness／Context Precision／Answer Relevancy 的定義、計算程序、所需輸入與 worked example（指標計算細節引自文件，非 arXiv 摘要頁）。③ Hamel Husain，《Frequently Asked Questions (And Answers) About AI Evals》（hamel.dev/blog/posts/evals-faq）——「驗自動評估要同時量 catch rate 與 false alarm」「裁判與人類不合先查根因、一種失效一個裁判」「通用指標只能當探索訊號不是品質量尺」「production 抽樣每批留隨機樣本」等論點出自原文；CI vs monitoring 一段為其一般立場之改寫。作者改寫重述，未複製原文。「沒驗過的 LLM 裁判＝自動化的自評」「RAGAS 是開始量不是得以信」「checker 自己也要被 check」為作者綜述觀點（Author's view），與本站 [[01-rag-faithfulness|01]]／[[14-prompt-engineering-is-empirical|14]]／[[16-sycophancy-is-trained-in|16]]／[[23-rag-two-failure-layers|23]] 一致。
:::

## 一句話帶走 · Takeaway

RAGAS 讓你不用人工標準答案就能大規模量 RAG（Faithfulness／Context Precision／Answer Relevancy），但自動評估沒有消除對人類判斷的需求——它只是把它**往後挪**：你仍然得先用人類標註驗證你的 LLM 裁判（抓到率＋誤報率、一種失效一個裁判），才有資格大規模信它的分數。沒驗過的裁判＝自動化的自評。

::: en
RAGAS lets you measure RAG at scale without a gold answer (Faithfulness, Context Precision, Answer Relevancy), but automated eval doesn't remove the need for human judgment — it relocates it: you still have to validate your LLM judge against human labels (catch rate + false-alarm rate, one judge per failure type) before you're entitled to trust its scores at scale. An unvalidated judge is self-evaluation, automated.
:::
