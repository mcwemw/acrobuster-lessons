---
id: "47"
slug: visual-slam-inverse-problem-direct-indirect
tag: 代理工程
title: 視覺 SLAM 是反問題：相機把 3D 壓成 2D，你得從影像反推——indirect 比幾何、direct 比像素
title_en: "Visual SLAM Is an Inverse Problem: the Camera Squashes 3D into 2D, So You Reconstruct from Images — Indirect Compares Geometry, Direct Compares Pixels"
title_short: 視覺 SLAM：從 2D 反推 3D 的反問題
summary: 相機就是一個已知的投影：K[R|t] 把 3D 世界壓成 2D 影像，過程中丟掉了深度。所以視覺 SLAM 是個反問題——從一堆 2D 觀測反推相機位姿與 3D 結構。兩幀之間怎麼對上有兩條路：indirect 先抽特徵點、最小化幾何重投影誤差；direct 直接比像素灰階、最小化光度誤差。選哪種誤差，就是又一次「選 loss＝選世界觀」。
summary_en: A camera is a known projection: K[R|t] squashes the 3D world into a 2D image, throwing away depth. So visual SLAM is an inverse problem — reconstruct the camera pose and 3D structure from 2D observations. Matching two frames has two roads: indirect extracts feature points and minimizes geometric reprojection error; direct compares pixel intensities and minimizes photometric error. Which error you pick is, once again, "choosing a loss = choosing a worldview."
---
## 是什麼 · What it is

視覺 SLAM 跟 [[45-slam-predict-correct-loop-closure|卡 45／46 的 SLAM]]是同一件事，只是「觀測」換成相機影像。關鍵先認清：<strong>相機是一個已知的投影 <code>x ~ K[R|t]X</code>——把 3D 世界點壓成 2D 像素，過程中深度被壓掉了。</strong>所以視覺 SLAM 本質是<strong>反問題</strong>：手上只有 2D 影像，要反推出相機位姿 <code>[R|t]</code> 與 3D 結構。

而「相鄰兩幀怎麼對上（估出相對位姿 T）」有兩條路，差別就在<strong>最小化哪一種誤差</strong>：
<p>
<strong>indirect（間接法）</strong>：先抽特徵點，最小化<strong>幾何重投影誤差</strong> <code>T = argmin Σ‖u' − Tp‖²</code>——比的是「點投影到哪」。代表：ORB-SLAM。<br>
<strong>direct（直接法）</strong>：不抽特徵，直接最小化<strong>光度誤差</strong> <code>T = argmin Σ‖I_k(u') − I_{k−1}(u)‖²</code>——比的是「像素灰階對不對」。代表：LSD-SLAM、DSO。
</p>

用多少影像資訊也是個選擇：<strong>sparse</strong>（只用特徵點）／<strong>dense</strong>（全部像素）／<strong>semi-dense</strong>（重要的點）。

::: en
Visual SLAM is the same thing as [[45-slam-predict-correct-loop-closure|the SLAM of cards 45/46]], except the "observation" is now a camera image. First see the crux: **a camera is a known projection <code>x ~ K[R|t]X</code> — it squashes 3D world points into 2D pixels, and depth gets flattened away.** So visual SLAM is fundamentally an **inverse problem**: with only 2D images in hand, reconstruct the camera pose <code>[R|t]</code> and the 3D structure. And "how to match two adjacent frames (estimate the relative pose T)" has two roads, differing in **which error you minimize**: **indirect** extracts feature points and minimizes the **geometric reprojection error** <code>T=argmin Σ‖u'−Tp‖²</code> — comparing "where points project to" (e.g. ORB-SLAM); **direct** skips features and minimizes the **photometric error** <code>T=argmin Σ‖I_k(u')−I_{k−1}(u)‖²</code> — comparing "do the pixel intensities agree" (e.g. LSD-SLAM, DSO). How much of the image you use is also a choice: **sparse** (feature points only) / **dense** (all pixels) / **semi-dense** (the important points).
:::

## 為什麼重要 · Why it matters

該帶走的第一個洞見：<strong>indirect vs direct，就是「對哪個殘差做最小平方」的選擇</strong>——又一次 [[33-loss-is-the-classifier-worldview|選哪個 loss 就選了世界觀]]：比幾何點位置，還是比像素亮度，決定了這個系統對什麼敏感、在什麼情況下會壞（弱紋理、光照變化各有死穴）。它跟 [[46-slam-graph-optimization-least-squares-consensus|卡 46 的最小平方]]是同一招，只是誤差項換成了重投影或光度。

第二個、也是最該帶走的：<span class="tag-warn">觀測永遠是對真實的有損投影，SLAM 做的是「反推一個最能解釋所有觀測的 3D 解釋」</span>。這在 <strong>bundle adjustment</strong> 裡最清楚——當 3D 結構也未知時，<strong>同時優化所有相機位姿與所有 3D 點，讓它們投影回各張影像的重投影誤差總和最小</strong>。這正是 [[46-slam-graph-optimization-least-squares-consensus|graph 最佳化]]的推廣：不是挑一張影像信，而是找一組「對全部觀測最一致」的結構與位姿。（若 3D 結構已知，問題退化成 <strong>PnP</strong>：給 n 個 3D-2D 對應就能解相機位姿，Marker AR 就是這樣把虛擬物件貼到現實。）

把整門課縫起來：相機把 3D 壓成 2D ＝一次有損的「觀測」，視覺 SLAM 用最小化重投影/光度誤差把 3D 反推回來——這還是 [[45-slam-predict-correct-loop-closure|predict-correct]]、也是整站「觀測是有損的，要靠對所有證據最一致的估計把真實重建回來」的母題，只是搬到了相機幾何上。

::: src
出處 Source：Min-Chun Hu（胡敏君），NTHU《Robotic Navigation and Exploration》Unit 7「3D SLAM (I)」投影片（578101；相機模型與多視圖幾何部分取自 Hartley &amp; Zisserman 式經典 CV）。SLAM overview（pose tracking／local optimization／loop closure）、image 資訊 sparse/dense/semi-dense、objective function 之 indirect（幾何重投影誤差 T=argmin Σ‖u'−Tp‖²）vs direct（光度誤差 T=argmin Σ‖I_k(u')−I_{k−1}(u)‖²）、visual SLAM 歷史（monoSLAM/PTAM 2007、DTAM 2011、KinectFusion 2011、LSD-SLAM/SVO 2014、ORB-SLAM/ElasticFusion 2015、DSO 2016；PTAM 分 tracking/mapping 兩執行緒為現代 SLAM 基礎、ORB-SLAM 集特徵法大成）、feature-based visual SLAM（CV 測量：feature matching／PnP／bundle adjustment／epipolar geometry；系統管線：map storage／graph optimization／loop closure）、camera calibration（intrinsics：scale/focal/aspect/principal point/distortion；extrinsics：optical center/orientation）、pinhole model x~K[I|0]X、intrinsic matrix（f、principal point、aspect、skew、radial/tangential distortion）、PnP（已知 3D 結構解 [R|t]、需 n 點、Marker AR）、unknown structure→bundle adjustment（聯合優化相機 M＋3D 點、最小化重投影）或 reduce P→epipolar geometry 均出自該投影片，作者改寫重述。<br>「視覺 SLAM＝從 2D 反推 3D 的反問題（相機投影丟了深度）」「indirect vs direct＝對幾何/光度殘差做最小平方＝選 loss=選世界觀」「bundle adjustment＝graph 最佳化的推廣」「觀測是有損投影、靠最一致估計重建真實」為作者綜述觀點（Author's view），對應本站 [[45-slam-predict-correct-loop-closure|45]]／[[46-slam-graph-optimization-least-squares-consensus|46]]／[[33-loss-is-the-classifier-worldview|33]]。
:::

## 一句話帶走 · Takeaway

相機用 K[R|t] 把 3D 壓成 2D、丟掉深度，所以視覺 SLAM 是從影像反推位姿與結構的反問題。兩幀對上有兩條路：indirect 最小化幾何重投影誤差、direct 最小化光度誤差——選哪個誤差就是選世界觀。Bundle adjustment 聯合優化相機與 3D 點，是 graph 最佳化的推廣，也還是「觀測有損、反推最一致真實」的老母題。

::: en
A camera's K[R|t] squashes 3D into 2D and discards depth, so visual SLAM is the inverse problem of reconstructing pose and structure from images. Matching frames has two roads: indirect minimizes geometric reprojection error, direct minimizes photometric error — and which error you pick is choosing a worldview. Bundle adjustment jointly optimizes cameras and 3D points, generalizing graph optimization, and is still the old theme of "observation is lossy; reconstruct the most consistent reality."
:::
