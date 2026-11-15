---
id: "40"
slug: data-centric-bias-variance-knobs
tag: AI 工程
title: 資料才是主角：自建資料集的每個實驗，都是在轉 bias-variance 旋鈕
title_en: "Data Is the Real Lever: Every Experiment on a Hand-Built Dataset Is Turning the Bias-Variance Knob"
title_short: 資料才是主角：轉 bias-variance 旋鈕
summary: 演算法常被談得比資料多，但模型好壞由資料決定——這就是 data-centric AI。自己動手建一個資料集、跑監督式學習時，那些實驗軸（資料量、類別平衡、SMOTE、資料增強、PCA/autoencoder 降維）其實都是在實際操作 bias-variance 旋鈕；而「必用交叉驗證」就是「不准用訓練誤差幫自己打分」的硬性落地。
summary_en: Algorithms get talked about more than data, but a model's quality is decided by its data — that's data-centric AI. When you build a dataset yourself and run supervised learning, the experiment axes (amount of data, class balance, SMOTE, augmentation, PCA/autoencoder dimensionality reduction) are all hands-on ways of turning the bias-variance knob; and "cross-validation is mandatory" is the concrete enforcement of "don't grade yourself on training error."
links: []
---
## 是什麼 · What it is

這張是 [[32-bias-variance-complexity-knob|「監督式學習只有一個旋鈕」]]的動手版——但它先把一個常被忽略的事實擺正：<strong>演算法被談得比資料多，可是要建好模型，你需要好資料來學。</strong>這就是 data-centric AI 的精神，也是為什麼「自己<strong>從零建一個資料集</strong>（不能用現成的）」本身就是一大塊工程：你得想清楚樣本的<strong>特性、約束、組成</strong>。

把它跑成一個監督式學習實驗，骨架是：挑分類或回歸、用<strong>至少兩種方法</strong>（至多一種深度學習）、用對的量尺評估——分類看<strong>confusion matrix</strong>，是非題看 <strong>precision／recall／F1／AUROC</strong>，回歸看 <strong>MSE</strong>——而且<strong>一定要用交叉驗證</strong>取得這些數字。

::: en
This is the hands-on version of [[32-bias-variance-complexity-knob|"supervised learning has just one knob"]] — but it first sets straight a commonly ignored fact: **algorithms get talked about more than data, yet to build a good model you need good data to learn from.** That's the spirit of data-centric AI, and why "build a dataset **from scratch** yourself (you can't use an existing one)" is itself a big chunk of engineering: you must think through the samples' **characteristics, constraints, and composition.** Run it as a supervised experiment and the skeleton is: pick classification or regression, use **at least two methods** (at most one deep-learning), evaluate with the right yardstick — **confusion matrix** for classification, **precision/recall/F1/AUROC** for yes-no, **MSE** for regression — and **always use cross-validation** to obtain those numbers.
:::

## 為什麼重要 · Why it matters

該帶走的洞見：<strong>那些看似雜七雜八的實驗軸，其實都是在轉同一個 bias-variance 旋鈕。</strong>

<p>
<strong>加訓練資料</strong>：最直接的降 variance——模型看得越多，越不會把這批雜訊當訊號。<br>
<strong>類別不平衡</strong>：用類別加權或 <strong>SMOTE</strong> 重採樣，避免模型靠「永遠猜多數類」就拿到假的高準確率。<br>
<strong>資料增強</strong>：等於免費多造訓練樣本，同樣是壓 variance、逼模型學不變的訊號。<br>
<strong>降維（PCA／autoencoder）</strong>：對高維特徵砍掉冗餘——降低模型複雜度、讓過擬合更不容易發生，這正是 <a href="34-embedding-is-the-throughline.html">嵌入那條線</a>在資料前處理端的現身。
</p>

另一個該帶走的是評估紀律，直通我一整天在守的那條：<span class="tag-warn">「一定要交叉驗證」不是形式，是「不准用訓練誤差幫自己打分」的硬性落地</span>——跟 [[39-simclr-loss-is-not-objective|SimCLR 的 loss≠objective]]、[[06-ai-loop-discipline|不自評、要外部驗證]]同一條線。而「是非題要看 F1／AUROC 而非只看 accuracy」又接回 [[33-loss-is-the-classifier-worldview|選對指標＝選對你真正在乎的東西]]：<strong>在類別不平衡時，accuracy 會騙你，就像 MSE 不等於分類誤差。</strong>一句話收束：模型的上限由資料決定，而你怎麼切資料、怎麼量結果，就是你有沒有誠實面對 bias-variance 的證據。

::: src
出處 Source：NYCU Spr2026 AI 課 Project #1（王才沛，自建資料集＋監督式學習）為本卡的實作對象；本卡以 data-centric AI 概念與監督式學習標準實務為據、非重製作業規格。「演算法被談得比資料多、好模型需好資料、建資料集耗大量工、須想樣本特性/約束/組成」、分類/回歸、≥2 方法（≤1 DL）、confusion matrix／precision-recall-F1-AUROC／MSE、必用交叉驗證、實驗軸（資料量、類別平衡與加權/SMOTE 重採樣、資料增強、PCA/autoencoder 降維）均為 data-centric 監督式學習的標準概念與該 project 主題。<br>「資料才是主角（data-centric）」「每條實驗軸＝在轉 bias-variance 旋鈕」「交叉驗證＝不准用訓練誤差自評的落地」「不平衡時 accuracy 會騙人、要選對指標」為作者綜述觀點（Author's view），對應本站 [[32-bias-variance-complexity-knob|32]]／[[34-embedding-is-the-throughline|34]]／[[33-loss-is-the-classifier-worldview|33]]／[[39-simclr-loss-is-not-objective|39]]／[[06-ai-loop-discipline|06]]。
:::

## 一句話帶走 · Takeaway

演算法被談得比資料多，但模型上限由資料決定。自建資料集跑實驗時，資料量/平衡/SMOTE/增強/降維全是在轉 bias-variance 旋鈕；而「一定要交叉驗證」「不平衡別只看 accuracy」就是「不准用訓練誤差幫自己打分、要選對指標」的動手版。

::: en
Algorithms get more airtime than data, but data sets a model's ceiling. When you experiment on a hand-built dataset, amount/balance/SMOTE/augmentation/dimensionality-reduction are all turning the bias-variance knob; and "always cross-validate" and "don't trust accuracy under imbalance" are the hands-on form of "don't grade yourself on training error, and pick the right metric."
:::
