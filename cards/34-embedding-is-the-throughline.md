---
id: "34"
slug: embedding-is-the-throughline
tag: 模型原理
title: 這門課的暗線：一切都在學一個「嵌入」
title_en: "The Hidden Throughline: Everything Is Learning an Embedding"
title_short: 一切都在學一個「嵌入」
summary: PCA、FLD、autoencoder、word2vec、對比學習、DINO 看似各走各的，其實都在做同一件事——學一個把高維複雜資料壓成低維向量的「嵌入」。而「好嵌入」沒有唯一定義：你選的目標函數說了算。維度詛咒則是這一切的理由：高維裡 cosine 全擠成一團，嵌入讓「比相似度」重新變得可能。
summary_en: PCA, FLD, autoencoders, word2vec, contrastive learning, and DINO look unrelated but do the same thing — learn an embedding that compresses high-dimensional data into a low-dimensional vector. And there's no single definition of a "good" embedding: the objective function you pick decides. The curse of dimensionality is the reason it all matters — in high dimensions every cosine collapses together, and the embedding makes comparing similarity possible again.
links: []
---
## 是什麼 · What it is

這一整段課（降維、嵌入、自監督）表面上像一堆互不相干的方法，但<strong>暗線只有一條：把一筆複雜資料變成一個低維向量</strong>——也就是<strong>嵌入</strong>（embedding）。無監督學習（unsupervised learning）要從原始資料裡<strong>發現新知識</strong>，沒有「正確答案」或 ground truth，只求結果<strong>合理且有資訊量</strong>；降維就是其中最大的一支，本質是<strong>表徵學習</strong>（representation learning）——但它<strong>有損</strong>（lossy），所以關鍵是「保留對任務有用的資訊」。

同一條暗線上串起的，全是「用不同目標函數定義『好的壓法』」：

<p>
<strong>PCA</strong>（principal component analysis，主成分分析）：線性變換，讓新座標<strong>去相關</strong>（用協方差矩陣的特徵向量當基底），保留<strong>變異最大</strong>的方向（最大特徵值）——等價於<strong>最小化重建誤差</strong>。<br>
<strong>FLD／LDA</strong>（Fisher's linear discriminant）：PCA <strong>不管下游任務</strong>，FLD 改成最大化<strong>類別可分性</strong>（類內／類間散佈，FDR）。<br>
<strong>autoencoder</strong>（自編碼器）：pretext 是「重建輸入」，中間的<strong>資訊瓶頸</strong>（bottleneck）逼網路只留重要資訊，那段 code 就是嵌入。<br>
<strong>word2vec</strong>：用 CBOW／skip-gram 預測上下文，把 one-hot 的高維稀疏換成能表達詞義關係的低維向量。<br>
<strong>t-SNE／manifold 法</strong>：把高維裡的<strong>低維流形</strong>（manifold）「攤平」，保留局部鄰近結構來視覺化。
</p>

::: en
This whole stretch of the course (dimensionality reduction, embedding, self-supervision) looks like a grab-bag of methods, but there is **one hidden throughline: turn a complex datum into a low-dimensional vector** — an **embedding**. Unsupervised learning **discovers new knowledge** from raw data with no "correct answer" or ground truth, only results that are **reasonable and informative**; dimensionality reduction is its biggest branch, essentially **representation learning** — but **lossy**, so the key is "preserve the information useful for the task." On that one thread: **PCA** = linear transform that **decorrelates** (eigenvectors of the covariance) and keeps the **maximum-variance** directions (largest eigenvalues) — equivalent to **minimizing reconstruction error**; **FLD/LDA** = PCA **ignores the downstream task**, so FLD instead maximizes **class separability** (within/between scatter, FDR); **autoencoder** = the pretext is "reconstruct the input," the **information bottleneck** forces it to keep only what matters, and the code is the embedding; **word2vec** = predict context via CBOW/skip-gram, trading high-dimensional one-hot for a low-dimensional vector that captures word relations; **t-SNE / manifold methods** = "flatten" a low-dimensional **manifold** living in high-dimensional space, preserving local neighborhood structure for visualization.
:::

## 為什麼重要 · Why it matters

兩個該帶走的洞見，都直通你自己的檢索世界。

① <strong>維度詛咒（curse of dimensionality）是「為什麼要嵌入」的硬理由。</strong>投影片那張圖很震撼：在 L 維單位球面上隨機取點對、看它們 cosine 相似度的分布——<strong>L=3 時分散，L=1000 時全擠成 0 附近一根尖峰</strong>。意思是<strong>高維裡所有點對都「差不多像／差不多不像」</strong>，距離失去鑑別力，比鄰居、分群、估密度全部變難（除非樣本數隨維度指數成長）。所以嵌入不是炫技，是<strong>讓「比較相似度」這件事重新變得可能</strong>。這正是 [[01-rag-faithfulness|RAG 的檢索]]能成立的前提：bge-m3 把文件壓進低維語意空間後，<strong>cosine 才重新有意義</strong>，你的 faithfulness 餘弦閘門才敢設一條閾值——<span class="tag-warn">沒有好嵌入，cosine 閘門只是在量噪音</span>。

② <strong>「好嵌入」沒有唯一定義——目標函數說了算。</strong>這是 [[33-loss-is-the-classifier-worldview|「選哪個損失就選了世界觀」]]在無監督世界的延伸：PCA 要去相關、FLD 要類別分得開、autoencoder 要重建、對比學習要「相似拉近、不相似推遠」。到了<strong>自監督</strong>（self-supervised learning），招數更直白——<strong>沒有外部標註，就用資料自己相關的部分當監督訊號</strong>：self-prediction（遮住一塊去預測，word2vec／MAE 都是）或 contrastive learning（同一張圖的兩個 view 要近、別張要遠）。先用 pretext task 練出表徵，再 transfer 到 downstream——這就是 [[08-rlhf-preference-reward|foundation model]]的底層邏輯（DINO：student／teacher 無標註蒸餾）。對你而言，這條線解釋了<strong>為什麼「嵌入的品質」是整個 RAG 的地基</strong>：換嵌入模型＝換了「相似」的定義，retrieval 與 faithfulness 的行為會跟著變。

::: src
出處 Source：Tsaipei Wang（王才沛），NYCU《Artificial Intelligence》課程 Set 03「Unsupervised Learning / Dimensionality Reduction / Embedding / Self-Supervised Learning」投影片（2026 春；部分自監督插圖註明取自 neurips-2021 Slides 21895、LeCun、word2vec／autoencoder 等來源）。無監督＝發現新知識無 ground truth、降維為 lossy representation learning、維度詛咒（L 維單位球 cosine 直方圖 L=3→L=1000 收斂）、PCA（去相關＝協方差特徵向量、保最大變異＝最小重建誤差、eigenfaces）、FLD/LDA（PCA 不管下游→最大化類別可分性、散佈矩陣、FDR、廣義特徵值、M−1 維）、embedding 定義與 PCA/FLD 為線性嵌入、autoencoder（重建 pretext＋資訊瓶頸＝code 為嵌入）、word2vec CBOW/skip-gram 與 one-hot 缺點、manifold／MDS／ISOMAP／LLE／t-SNE（perplexity）、self-supervised（無外部標註、pretext→downstream、transfer/fine-tune、foundation model、self-prediction vs contrastive、DINO）均出自該投影片，作者改寫重述。<br>「嵌入是整門課的暗線」「維度詛咒＝好嵌入讓 cosine 重新有意義＝我 RAG cosine 閘門的前提」「好嵌入由目標函數定義、換嵌入＝換『相似』的定義」為作者綜述觀點（Author's view），對應本站 [[33-loss-is-the-classifier-worldview|33]]／[[01-rag-faithfulness|01]]／[[08-rlhf-preference-reward|08]]。
:::

## 一句話帶走 · Takeaway

降維、嵌入、自監督全在學同一個東西——把複雜資料壓成一個向量；而「好」由目標函數定義。維度詛咒告訴你為什麼非做不可：高維裡 cosine 全擠成一團，好嵌入讓「比相似度」重新可能——那正是你 RAG 檢索與 faithfulness 閘門站著的地基。

::: en
Dimensionality reduction, embedding, and self-supervision all learn the same thing — compress complex data into a vector; "good" is defined by the objective function. The curse of dimensionality says why you must: in high dimensions every cosine collapses together, and a good embedding makes comparing similarity possible again — which is exactly the ground your RAG retrieval and faithfulness gate stand on.
:::
