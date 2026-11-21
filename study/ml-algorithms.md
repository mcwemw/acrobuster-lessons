---
question: 梯度下降怎麼最小化損失、SGD 差在哪?感知機如何線性分類、收斂保證?K-means 怎麼分群、為何只保證局部最優?
keywords: [gradient-descent, perceptron, k-means-clustering]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Gradient descent [[raw:mlalgo-gd-wikipedia]](CC BY-SA 4.0)、Perceptron [[raw:mlalgo-perceptron-wikipedia]](CC BY-SA 4.0)、K-means clustering [[raw:mlalgo-kmeans-wikipedia]](CC BY-SA 4.0)。canonical=CLRS 4e Ch.33(Machine-Learning Algorithms)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 機器學習演算法 Machine-Learning Algorithms（CLRS 4e Ch.33）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · 一般。
> 一句話:從演算法角度看 ML——梯度下降是通用最佳化引擎,感知機是最早的線性分類器,K-means 是最常見的分群;重點在收斂性與複雜度。(mlalgo-gd-wikipedia)
> 註:這是**演算法軌**從最佳化/複雜度角度看 ML;AI 軌的統計學習視角見 [[ai-machine-learning]]。

## 1. 梯度下降

- 最小化可微損失 f:沿**負梯度**走 θ ← θ − η·∇f(θ),η=學習率。(mlalgo-gd-wikipedia)
- **凸函數**保證收斂到全域最優;非凸只保證局部。η 太大發散、太小慢。
- **SGD(隨機梯度下降)**:每步用一個(或小批)樣本估梯度 → 單步便宜、能跳出淺局部、但有雜訊;大資料主力。變體:momentum、Adam。

## 2. 感知機(Perceptron)

- 線性分類器:輸出 sign(w·x + b);**感知機學習規則**:錯分時 w ← w + y·x(朝正確方向推)。(mlalgo-perceptron-wikipedia)
- **感知機收斂定理**:若資料**線性可分**,保證有限步收斂到一個分隔超平面(步數與 margin 相關)。
- **限制**:線性不可分(如 XOR)不收斂 → 催生多層網路/核方法。是神經網路的歷史起點。

## 3. K-means 分群

- 無監督:把 n 點分成 k 群,最小化**群內平方和(WCSS)**。(mlalgo-kmeans-wikipedia)
- **Lloyd 演算法**:①指派每點到最近中心 ②重算中心為群均值,交替到收斂。
- **只保證局部最優**:結果依初始中心;**k-means++** 聰明初始化改善。每輪 O(nkd);k 要預先給(用 elbow/silhouette 選)。

## 我的想法 / 啟發

- **這章與 [[ai-machine-learning]] 互補但視角不同**:AI 軌談偏差-變異/泛化,演算法軌談**收斂性與複雜度**(GD 凸收斂、感知機線性可分收斂、K-means 局部最優)。資格考 AI+演算法兩科都可能問 ML,要能切換視角。
- **GD/SGD 是現代 ML 的通用引擎**,SGD 的隨機性呼應 [[randomized-algorithms]]:用隨機換便宜+逃局部。
- **K-means 只保證局部最優**是典型「貪婪交替下降」([[greedy-algorithms]] 精神),初始化敏感 → k-means++;感知機收斂依賴線性可分,是「有前提才有保證」的教科書例。

## Next action / 下一步

1. 補感知機收斂定理證明(margin/Novikoff)+ K-means WCSS 單調下降論證。
2. 補 SGD 收斂率(凸 O(1/√t))+ 與 [[ai-reinforcement-learning]] 的 TD/SGD 關聯。

## 交叉引用 / 出處
- raw:`wiki/raw/mlalgo-gd-wikipedia.md`、`mlalgo-perceptron-wikipedia.md`、`mlalgo-kmeans-wikipedia.md`
- [[ai-machine-learning]] — AI 軌統計學習視角(偏差-變異);[[randomized-algorithms]] — SGD 隨機性;[[greedy-algorithms]] — K-means 貪婪交替
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.33)
