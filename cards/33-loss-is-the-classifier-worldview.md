---
id: "33"
slug: loss-is-the-classifier-worldview
tag: 模型原理
title: 選哪個損失，就選了分類器的世界觀
title_en: "Choosing a Loss Is Choosing the Classifier's Worldview"
title_short: 選哪個損失，就選了分類器的世界觀
summary: 線性回歸、感知器、邏輯回歸、SVM 畫的都是同一條直線 g(x)=wᵀx，差別只在目標函數。你挑哪個 loss，就決定了它會怎麼錯——MSE 怕離群值、感知器碰到線性不可分就崩、cross-entropy 要機率、SVM 要離最遠。
summary_en: Linear regression, perceptron, logistic regression, and SVM all draw the same line g(x)=wᵀx — they differ only in the objective function. The loss you pick decides how the classifier fails: MSE fears outliers, the perceptron breaks on non-separable data, cross-entropy wants probabilities, SVM wants maximum distance.
links: []
---
## 是什麼 · What it is

把一個分類器叫做<strong>基於優化的</strong>（optimization-based），意思是：它是一個<strong>有可調參數的數學模型</strong>，參數靠<strong>最小化一個目標函數</strong>（objective function）得到。重點在這句投影片的話——<strong>目標函數會決定它用什麼演算法、有什麼行為、以及什麼極限。</strong>

四個線性分類器畫的<strong>都是同一條線</strong> <code>g(x) = wᵀx + w₀ = 0</code>（discriminant function，判別函數；靠正負號分兩類），差別<strong>只在那個 loss</strong>：

<p>
<strong>① 線性回歸</strong>（linear regression）＝<strong>均方誤差</strong>（MSE）：有漂亮的解析解 <code>w = (XᵀX)⁻¹Xᵀy</code>（pseudo-inverse，偽逆）。<br>
<strong>② 感知器</strong>（perceptron）＝<strong>只算誤分類點的 loss</strong>：<code>J(w)=Σ max(0, −wᵀxᵢyᵢ)</code>，是一種 hinge loss。<br>
<strong>③ 邏輯回歸</strong>（logistic regression）＝<strong>交叉熵</strong>（cross-entropy）：先用 sigmoid <code>p(x)=1/(1+e^−wᵀx)</code> 輸出機率，再最大概似；無解析解、得迭代。<br>
<strong>④ 支援向量機</strong>（SVM）＝<strong>間隔</strong>（margin）：間隔＝<code>2/‖w‖</code>，最大化間隔＝最小化 <code>‖w‖</code>。
</p>

::: en
Calling a classifier **optimization-based** means it is a **mathematical model with adjustable parameters**, obtained by **minimizing an objective function** — and, as the slides stress, the objective function decides the algorithm used, the behaviors, and the limitations. All four linear classifiers draw the **same line** <code>g(x)=wᵀx+w₀=0</code> (a discriminant function; signs split the two classes) and differ **only in the loss**: ① linear regression = **MSE** (closed-form <code>w=(XᵀX)⁻¹Xᵀy</code>, the pseudo-inverse); ② perceptron = a loss **over misclassified samples only**, <code>J(w)=Σ max(0,−wᵀxᵢyᵢ)</code>, a hinge loss; ③ logistic regression = **cross-entropy**, outputting probabilities via the sigmoid <code>p(x)=1/(1+e^−wᵀx)</code> then doing maximum likelihood (no closed form, iterate); ④ SVM = **margin**, where margin <code>=2/‖w‖</code>, so maximizing margin = minimizing <code>‖w‖</code>.
:::

## 為什麼重要 · Why it matters

最該帶走的是：<strong>loss 不是技術細節，它是分類器的世界觀——你挑哪個，就決定了它會怎麼錯。</strong>

<p>
<strong>MSE 以為「每個點都該離邊界等距」</strong>，所以它會被遠方的<strong>離群值</strong>（outlier）硬拉歪。投影片的「怪例」很直白：<strong>最小化 MSE ≠ 最小化分類誤差</strong>——這是「優化的指標不等於你真正要的」的教科書案例。<br>
<strong>感知器只在乎「分對了沒」</strong>：線性可分時可證明收斂，但<strong>解不唯一</strong>；一旦<strong>線性不可分</strong>（not linearly separable）就<strong>無限更新、停不下來</strong>。它是史上第一個為分類設計的「機器學習」演算法（引來<strong>過度樂觀</strong>），而這個不可分的死穴又讓人們一度<strong>放棄整個神經運算</strong>（過度悲觀）——直到約十年後<strong>反向傳播</strong>（backpropagation）才解套。<br>
<strong>交叉熵要的是「機率說得準」</strong>，不是只分對；<strong>SVM 要的是「離得最遠最安全」</strong>，只有最靠近邊界的<strong>支援向量</strong>（support vectors）說話。
</p>

SVM 的收尾最能呼應本站：它寫成一個<strong>凸優化</strong>（convex，單一全域最小）<code>min ½‖w‖²</code> s.t. <code>yᵢ(wᵀxᵢ+w₀)≥1</code>；資料不可分時放寬成<strong>軟間隔</strong>，加鬆弛變數與懲罰 <code>J=½‖w‖²+C·Σξᵢ</code>。這個 <strong>C 是超參數</strong>，權衡「大間隔 vs 少分錯」，而<strong>C 要另外用交叉驗證選</strong>——正是 [[32-bias-variance-complexity-knob|那個複雜度旋鈕]]再次現身。往上一層，<span class="tag-warn">你優化的指標 ≠ 你真正要的</span>：選錯目標函數，就像 [[08-rlhf-preference-reward|RLHF 把偏好當真相]]一樣會被鑽漏洞，所以 [[30-define-success-before-you-build|先把「成功」定義對]]，比急著訓練更關鍵。（線性不夠用時，下一步才是非線性的<strong>神經網路</strong>——universal approximator，同時當特徵抽取器與分類器。）

::: src
出處 Source：Tsaipei Wang（王才沛），NYCU《Artificial Intelligence》課程 Set 02「Supervised Learning – Classifiers」投影片（2026 春）。optimization-based 定義與「目標函數決定演算法／行為／極限」、g(x)=wᵀx+w₀ 判別函數與 augmented vector、四分類器對應的 MSE／perceptron／cross-entropy／margin、偽逆解、「最小化 MSE ≠ 最小化分類誤差」與對離群值敏感、perceptron loss 公式與可分收斂／解不唯一／不可分無限更新／「過度樂觀←→過度悲觀←backprop」、sigmoid 與最大概似、margin=2/‖w‖、primal 凸問題與軟間隔 C（交叉驗證選、C→∞ 回到硬間隔）、多類 one-vs-rest／softmax／one-vs-one／DAGSVM、神經網路為非線性 universal approximator，均出自該投影片，作者改寫重述。<br>「loss＝分類器的世界觀、決定它怎麼錯」「目標函數＝你對成功的定義，選錯會被鑽漏洞」為作者綜述觀點（Author's view），對應本站 [[32-bias-variance-complexity-knob|32]]／[[08-rlhf-preference-reward|08]]／[[30-define-success-before-you-build|30]]。
:::

## 一句話帶走 · Takeaway

四個線性分類器畫的是同一條線，差別只在目標函數；loss 是它的世界觀，決定它會怎麼錯。選對 loss＝把「成功」定義對，比急著訓練更關鍵。

::: en
The four linear classifiers draw the same line and differ only in the objective function; the loss is the classifier's worldview and decides how it fails. Picking the right loss = defining "success" correctly — which matters more than rushing to train.
:::
