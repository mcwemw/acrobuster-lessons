---
question: 深度學習為何能自動學特徵?反向傳播如何用鏈式法則算梯度?CNN/RNN/Transformer 各擅長什麼歸納偏好?
keywords: [deep-learning, backpropagation, cnn-rnn-transformer]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Deep learning [[raw:aic21-deeplearning-wikipedia]](CC BY-SA 4.0)、Backpropagation [[raw:aic21-backprop-wikipedia]](CC BY-SA 4.0)、Convolutional neural network [[raw:aic21-cnn-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.21(Deep Learning)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 深度學習 Deep Learning（AIMA Ch.21）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
> 一句話:多層非線性網路**自動學階層特徵**(低層邊緣→高層語意),用反向傳播算梯度 + SGD 訓練;架構的歸納偏好(卷積/遞迴/注意力)決定擅長的資料型態。(aic21-deeplearning-wikipedia)

## 1. 前饋網路與表示學習

- 多層感知機:線性層 + **非線性活化**(ReLU/sigmoid/tanh)堆疊;足夠寬/深是**萬能近似**。(aic21-deeplearning-wikipedia)
- **表示學習**:不手工設計特徵,網路自動從原始輸入學階層表示——深度學習相對傳統 ML([[ai-machine-learning]])的關鍵優勢。
- 損失:分類用交叉熵(=負對數概似,接 [[ai-learning-probabilistic]] MLE)、迴歸用 MSE。

## 2. 反向傳播

- 用**鏈式法則**在計算圖上由輸出往輸入傳梯度:∂L/∂wᵢ = 逐層相乘的局部梯度。(aic21-backprop-wikipedia)
- **前向傳播**算輸出與損失、**反向傳播**算各參數梯度,一次 O(參數數)算全梯度 → SGD 更新([[ml-algorithms]])。
- **梯度消失/爆炸**:深層連乘使梯度趨 0 或爆 → ReLU、殘差連結(ResNet)、批次正規化、梯度裁剪緩解。

## 3. 主要架構的歸納偏好

- **CNN**:卷積(局部連接 + **權重共享**)+ 池化 → 平移不變、參數少,擅長**影像/網格資料**([[ai-computer-vision]])。(aic21-cnn-wikipedia)
- **RNN/LSTM/GRU**:隱狀態遞迴處理序列,有記憶;梯度消失用門控緩解。擅長**時序/語言**(漸被 Transformer 取代)。
- **Transformer**:**自注意力**全局建模 token 間關係,可平行訓練,擅長**序列/語言**([[ai-nlp-deep]])——現代 LLM 底座。

## 深化:反傳 worked + 正則 + 訓練技巧

### 反向傳播 worked(單神經元)
z=wx+b,a=σ(z),L=½(a−y)²。鏈式:∂L/∂w = (∂L/∂a)(∂a/∂z)(∂z/∂w) = (a−y)·σ'(z)·x。各層把「上游梯度」乘「本層局部梯度」往下傳——這就是反傳的全部。向量化後是矩陣乘。

### 深度學習的正則
dropout(訓練時隨機關神經元,近似 ensemble)、權重衰減(L2)、early stopping、資料增強、batch norm(穩定 + 輕正則)。對抗 [[ai-machine-learning]] 的高變異。

### 訓練技巧
初始化(Xavier/He)、學習率排程 + warmup、Adam 優化器(自適應步長)、梯度裁剪。深網路可訓練靠 ReLU + 殘差 + 正規化三件套。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| 深度學習不需歸納偏好 | 架構(卷積/注意力)就是**歸納偏好**;無偏好難泛化 |
| 反傳是新演算法 | 就是**鏈式法則** + 動態規劃式重用中間梯度 |
| 更深一定更好 | 梯度消失/過擬合;需殘差/正規化/正則 |
| CNN 只能影像 | 任何有**局部性+平移不變**的網格資料(含音訊/文字一維卷積) |

## 我的想法 / 啟發

- **深度學習=表示學習 + 反傳 + 架構歸納偏好**:它不是魔法,是「可微分 + 鏈式法則 + SGD」的規模化。資格考要能寫反傳鏈式、說三架構各自偏好。
- **架構=歸納偏好**是核心觀念([[ai-machine-learning]] Ockham/no free lunch):CNN 偏好局部平移不變、Transformer 偏好全局關係——選架構=注入先驗。
- **交叉熵=MLE**([[ai-learning-probabilistic]])、dropout=ensemble([[ml-algorithms]])——深度學習與機率/傳統 ML 一脈相承,不是斷裂。這接我做的 agent/模型工程底層。

## Next action / 下一步

1. 補 LSTM 門控方程 + ResNet 殘差 + batch norm 完整式。
2. 接 [[ai-nlp-deep]](Ch.24 Transformer/LLM)與 [[ai-computer-vision]](Ch.25 CNN 視覺)。

## 交叉引用 / 出處
- raw:`wiki/raw/aic21-deeplearning-wikipedia.md`、`aic21-backprop-wikipedia.md`、`aic21-cnn-wikipedia.md`
- [[ai-machine-learning]] — 表示學習 vs 手工特徵;[[ml-algorithms]] — SGD/反傳;[[ai-nlp-deep]]/[[ai-computer-vision]] — 架構應用
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.21)
