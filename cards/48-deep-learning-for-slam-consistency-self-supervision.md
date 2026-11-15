---
id: "48"
slug: deep-learning-for-slam-consistency-self-supervision
tag: 代理工程
title: 深度學習進 SLAM：把手工估計器換成學出來的，沒有標註時就用「一致性」自我監督
title_en: "Deep Learning for SLAM: Replace Hand-Designed Estimators with Learned Ones — and When There's No Label, Use Consistency as Self-Supervision"
title_short: 深度 SLAM：一致性就是校正訊號
summary: 深度學習進 SLAM，做的就是把古典 pipeline 裡一個個手工設計的估計器換成學出來的——DeepVO 最激進，直接用 CNN+RNN 把整條 pipeline 端到端換掉。但最該帶走的是：沒有 ground truth 時，怎麼訓？用「一致性」當自我監督——往前算的光流該等於往後算的、左眼看的該對得上右眼、渲染出的影像該像真實影像。一致性，就是沒有金標時唯一的校正訊號。
summary_en: Deep learning for SLAM replaces the hand-designed estimators in the classical pipeline with learned ones — DeepVO being the most radical, swapping the whole pipeline end-to-end with a CNN+RNN. But the key takeaway: with no ground truth, how do you train? Use consistency as self-supervision — the forward flow should equal the backward flow, the left eye should match the right, the rendered image should look like the real one. Consistency is the only correction signal when there is no gold standard.
---
## 是什麼 · What it is

這是這門課（也是整站 AI＋機器人）的收尾。深度學習進 SLAM 的核心動作很單純：<strong>把古典 pipeline 裡一個個「手工設計的估計器」換成「學出來的」</strong>——正是 [[38-games-exhaustive-dream-meets-explosion|卡 38「手工特徵 → 機器學習」]]、[[34-embedding-is-the-throughline|卡 34「用學到的表徵取代手工特徵」]]在機器人感知上的重演。

<p>
<strong>FlowNet</strong>：用 CNN 直接學<strong>光流</strong>（兩幀之間每個像素怎麼動），不再手刻。<br>
<strong>DeepVO</strong>（最激進）：用 <strong>CNN+RNN 端到端</strong>把整條 <a href="47-visual-slam-inverse-problem-direct-indirect.html">視覺里程計 pipeline</a>（特徵偵測→匹配→運動估計→bundle adjustment）換成一個學出來的黑盒：影像序列進、位姿直接出。<br>
<strong>NeRF／3D Gaussian Splatting</strong>：把「場景」本身也學出來——用可微渲染，讓神經場或一堆高斯去擬合觀測影像。
</p>

::: en
This closes the course (and the whole AI + robotics site). The core move of deep learning for SLAM is simple: **replace the hand-designed estimators in the classical pipeline with learned ones** — a rerun of [[38-games-exhaustive-dream-meets-explosion|card 38's "hand features → machine learning"]] and [[34-embedding-is-the-throughline|card 34's "learned representations replace hand features"]], now in robot perception. **FlowNet** learns **optical flow** (how each pixel moves between two frames) with a CNN instead of hand-crafting it. **DeepVO** (the most radical) uses a **CNN+RNN end-to-end** to replace the whole [[47-visual-slam-inverse-problem-direct-indirect|visual-odometry pipeline]] (feature detection → matching → motion estimation → bundle adjustment) with a learned black box: image sequence in, poses straight out. **NeRF / 3D Gaussian Splatting** even learn the **scene itself** — differentiable rendering makes a neural field or a cloud of Gaussians fit the observed images.
:::

## 為什麼重要 · Why it matters

最該帶走、也最接我 faithfulness 世界的一句：<span class="tag-warn">沒有 ground truth 時，就用「一致性」當自我監督訊號。</span>深度 SLAM 的資料大多沒有人標的位姿/深度真值，那怎麼訓？答案一再出現：

<p>
<strong>UnFlow</strong>：無監督學光流，用<strong>前後一致性檢查</strong>——「往前算的光流」和「往後算的光流」理當互逆，不一致的地方就是遮擋或錯誤，拿這個當 loss。<br>
<strong>UnDeepVO</strong>：單目視覺里程計，訓練時用<strong>雙目（左右一致）</strong>當自監督——左眼看到的，用估出的深度與位姿投到右眼該對得上。<br>
<strong>NeRF／3D GS</strong>：用<strong>光度一致性</strong>——渲染出的影像該像真實影像，最小化兩者誤差。
</p>

這三個都是同一招，也正是 [[39-simclr-loss-is-not-objective|卡 39「loss≠objective、要用獨立訊號驗證」]]與整站 [[45-slam-predict-correct-loop-closure|estimate → 用一致性校正]]母題的又一次現身：<strong>當你沒有金標，內部一致性（前後、左右、渲染對真實）就是你唯一能用的校正訊號。</strong>而 NeRF/3D GS 的「最小化渲染對真實的誤差」，根本就是 [[47-visual-slam-inverse-problem-direct-indirect|卡 47 的 direct/光度最小平方]]，只是把場景表示換成了神經場或高斯。

最後留一個該帶走的張力：<strong>DeepVO 那種端到端黑盒雖然強，卻比模組化 pipeline 更難解釋、更難給保證</strong>——這正是把整站「估計要有可驗證的保證」接回我 trustworthy 主線的地方：能學不代表能信，學出來的估計器一樣需要一致性、需要外部驗證，才敢用在會撞牆的真機器人上。

::: src
出處 Source：Min-Chun Hu（胡敏君），NTHU《Robotic Navigation and Exploration》Unit 8「Deep Learning for SLAM」投影片（578101；各方法圖取自原論文 FlowNet、UnFlow、DeepVO、UnDeepVO、VisFusion CVPR 2023、NeRF/3D GS、SEGS-SLAM）。pose estimation、FlowNet（FlowNetSimple/FlowNetCorr correlation layer、合成資料集生成）、UnFlow（無監督光流、bidirectional census loss、forward-backward consistency check、occlusion、smoothness E_S/consistency E_C/data E_D loss、warp）、DeepVO（end-to-end CNN+RNN/RCNN、取代 conventional pipeline：feature detection→matching/tracking→motion estimation→bundle adjustment、image sequence→poses）、UnDeepVO（無監督單目 VO、stereo 訓練、輸出 depth+pose）、VisFusion（線上 3D 重建、visibility-aware、back-projection/GRU/MLP）、NeRF（MLP (x,y,z,θ,φ)→color+density、ray volume rendering）與 3D Gaussian Splatting（splatting 到 image space、可微渲染）、SEGS-SLAM（3D GS SLAM + appearance embedding、rendered vs ground-truth frequency pyramid loss）均出自該投影片，作者改寫重述。<br>「深度 SLAM＝手工估計器換成學出來的、DeepVO 端到端取代 pipeline」「無 ground truth 時用一致性（前後/左右/光度）自監督＝唯一校正訊號＝loss≠objective＋estimate-verify 母題」「NeRF/3DGS＝direct 光度最小平方換場景表示」「端到端黑盒難解釋難保證＝能學不代表能信」為作者綜述觀點（Author's view），對應本站 [[38-games-exhaustive-dream-meets-explosion|38]]／[[34-embedding-is-the-throughline|34]]／[[39-simclr-loss-is-not-objective|39]]／[[45-slam-predict-correct-loop-closure|45]]／[[47-visual-slam-inverse-problem-direct-indirect|47]]。
:::

## 一句話帶走 · Takeaway

深度學習進 SLAM＝把古典 pipeline 裡的手工估計器換成學出來的，DeepVO 甚至端到端全換。但沒有 ground truth 時，訓練靠「一致性」自我監督——前後光流該互逆、左右眼該對上、渲染該像真實。一致性就是沒有金標時唯一的校正訊號；而端到端黑盒再強，能學不代表能信，仍需一致性與外部驗證。

::: en
Deep learning for SLAM replaces the classical pipeline's hand-designed estimators with learned ones, DeepVO even swapping the whole thing end-to-end. But with no ground truth, training relies on consistency as self-supervision — forward and backward flow should invert, left and right eyes should match, renders should look real. Consistency is the only correction signal without a gold standard; and however strong an end-to-end black box is, learnable isn't trustworthy — it still needs consistency and external verification.
:::
