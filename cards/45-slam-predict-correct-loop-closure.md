---
id: "45"
slug: slam-predict-correct-loop-closure
tag: 代理工程
title: SLAM：估計＋校正母題最純的化身——推算讓誤差滾雪球，觀測與 loop closure 把它拉回來
title_en: "SLAM: the Purest Form of the Estimate-then-Correct Theme — Dead Reckoning Snowballs Error, Observation and Loop Closure Pull It Back"
title_short: SLAM：推算滾雪球，loop closure 拉回來
summary: SLAM 要一邊建未知環境的地圖、一邊在圖裡定位自己——雞生蛋的難題。它的骨架正是整站的母題：用運動模型一步步「推算」位置，誤差會滾雪球（位置不確定性越滾越大）；再靠「觀測」看到地標把估計拉回來。而 loop closure——認出「我來過這裡」——就是用一個獨立證據，一次修掉累積的漂移。
summary_en: SLAM must build a map of an unknown environment while simultaneously locating itself within it — a chicken-and-egg problem. Its skeleton is the site's recurring theme: "predict" your pose step by step with a motion model (error snowballs, location uncertainty grows), then "correct" it by observing landmarks. And loop closure — recognizing "I've been here before" — uses one piece of independent evidence to wipe out accumulated drift in a single stroke.
---
## 是什麼 · What it is

<strong>SLAM</strong>（Simultaneous Localization And Mapping，同步定位與建圖）要同時做兩件互相依賴的事：<strong>一邊建一張未知環境的地圖、一邊追蹤自己在圖裡的位置</strong>。這是雞生蛋——要定位得先有圖，要建圖得先知道自己在哪。

它的數學骨架就是「推算＋修正」兩步：
<p>
<strong>① 運動模型（predict）</strong>：<code>x_k = f(x_{k−1}, u_k, w_k)</code>——用上一刻位置 ＋ 控制指令 ＋ 雜訊，推算現在的位置。問題在那個雜訊：<strong>只靠推算，位置不確定性會一步步滾大</strong>（投影片畫成越來越大的粉紅橢圓＝dead-reckoning 漂移）。<br>
<strong>② 觀測模型（correct）</strong>：<code>z_{k,j} = h(m_j, x_k, v_{k,j})</code>——感測器看到地標 <code>m_j</code>，拿「我應該看到什麼 vs 實際看到什麼」把位置估計拉回來。
</p>

整個系統分 <strong>front-end</strong>（visual/laser odometry：特徵抽取＋資料關聯，做 prediction／tracking／mapping）和 <strong>back-end</strong>（<strong>error compensation</strong> 修累積誤差＋<strong>loop closure</strong>）；感測器則是 LiDAR／相機（單目/雙目/RGB-D）／IMU。

::: en
**SLAM** (Simultaneous Localization And Mapping) does two interdependent things at once: **build a map of an unknown environment while tracking its own location within that map** — chicken-and-egg, since localizing needs a map and mapping needs to know where you are. Its mathematical skeleton is "predict + correct": **① motion model (predict)** <code>x_k=f(x_{k−1},u_k,w_k)</code> — estimate the current pose from the last pose + control + noise; the catch is that noise: **predicting alone lets location uncertainty snowball** (the slides draw it as ever-growing pink ellipses = dead-reckoning drift); **② observation model (correct)** <code>z_{k,j}=h(m_j,x_k,v_{k,j})</code> — the sensor sees landmark <code>m_j</code>, and "what I should see vs what I actually see" pulls the pose estimate back. The system splits into a **front-end** (visual/laser odometry: feature extraction + data association, doing prediction/tracking/mapping) and a **back-end** (**error compensation** for accumulated error + **loop closure**); sensors are LiDAR / cameras (mono/stereo/RGB-D) / IMU.
:::

## 為什麼重要 · Why it matters

該帶走的洞見：<strong>SLAM 是整站「估計 → 用現實校正」母題最純粹的化身。</strong>你對自己位置的推算一定會漂移（雜訊累積），所以不能只信推算，要用觀測一次次把它拉回——這就是 [[43-pid-present-past-future-of-error|PID 的閉環回授]]、[[37-reward-is-rl-loss-credit-assignment|RL 用未來狀態回填現在]]、[[01-rag-faithfulness|faithfulness 閘門]]同一條線，只是搬到「機器人在空間裡定位」上。

而最漂亮的是 <strong>loop closure</strong>：<span class="tag-warn">當機器人認出「這地方我來過」，它就有了一個獨立於推算鏈的證據，能一次把整段累積的漂移修掉</span>。這幾乎是母題的教科書示範——<strong>不信一條只會越錯越多的自我推算鏈，拿一個外部、可驗證的錨點來校正。</strong>跟 [[35-search-honest-estimate-of-future|A* 用估計導航但要有保證]]的精神也相通：估計可以用，但要有把它拉回現實的機制。

最後一個該帶走的是 back-end 的取捨，又是一個旋鈕：<strong>filter-based</strong>（Bayes／Kalman／EKF → EKF-SLAM、particle → FastSLAM）<strong>線上、算得快、但較不準</strong>；<strong>graph-based</strong>（pose graph ＋ 最小平方優化，Gauss-Newton／LM）<strong>離線、算得重、但更準</strong>。兩者都在解同一件事——把「推算」和「觀測」兜成一個最可能的軌跡與地圖，也就是投影片說的<strong>統計推論（estimation，bottom-up：從取樣資料找最可能的參數）</strong>。SLAM 的演進（EKF 經典期 → g2o／GTSAM 圖優化 → 深度學習＋多感測融合），骨子裡都還是這個 predict-correct 迴圈在換更好的解法。

::: src
出處 Source：Min-Chun Hu（胡敏君），NTHU《Robotic Navigation and Exploration》Unit 5「SLAM Back-end (I)」投影片（578101；SLAM 演進圖註明 Gemini 生成）。SLAM 定義（建未知環境地圖＋同步定位、chicken-egg）、key components（sensors LiDAR/camera mono-stereo-RGBD/IMU、front-end=visual/laser odometry 特徵抽取＋資料關聯、back-end=filters(EKF)/factor graphs 修 cumulative error、loop closure 消 drift、mapping sparse/dense/semantic）、motion model x_k=f(x_{k-1},u_k,w_k) 與 location uncertainty 脹大、observation z_{k,j}=h(m_j,x_k,v_{k,j}) 與 map uncertainty、probabilistic graphical model（control u→trajectory x→observation z←map m；Prediction/Tracking/Mapping/Error compensation filter-based vs graph-based）、SLAM architecture（Sensing→Front-End→Back-End 迴圈）、filter-based（less compute/online/less accurate）vs graph-based（heavier/offline/more accurate）、back-end methods（Bayes/KF/EKF/EKF-SLAM、particle/FastSLAM；pose graph＋least-square、Gauss-Newton/LM、sparse matrix）、evolution（classical EKF/particle→graph g2o/GTSAM/ORB-LSD-DSO→DL+fusion）、inference 與 statistical inference（p(E|C)、estimation bottom-up vs hypothesis testing top-down）均出自該投影片，作者改寫重述。<br>「SLAM＝估計+校正母題最純化身」「loop closure＝用獨立錨點一次修掉累積漂移＝不信只會越錯越多的自我推算鏈」「filter vs graph＝online快但沒那麼準 vs offline重但更準的旋鈕」為作者綜述觀點（Author's view），對應本站 [[43-pid-present-past-future-of-error|43]]／[[37-reward-is-rl-loss-credit-assignment|37]]／[[01-rag-faithfulness|01]]／[[35-search-honest-estimate-of-future|35]]。
:::

## 一句話帶走 · Takeaway

SLAM 一邊建圖一邊定位，骨架就是整站母題：運動模型「推算」位置會滾雪球，觀測「校正」把它拉回，loop closure 更用「我來過這裡」這個獨立證據一次修掉累積漂移。back-end 的 filter（線上、快、較不準）vs graph（離線、重、更準）是又一個取捨旋鈕——但都在解同一個 predict-correct 迴圈。

::: en
SLAM maps and localizes at once, and its skeleton is the site's theme: the motion model "predicts" a pose that snowballs error, observation "corrects" it, and loop closure uses the independent evidence of "I've been here" to wipe out accumulated drift at once. The back-end's filter (online, fast, less accurate) vs graph (offline, heavy, more accurate) is another trade-off dial — but both solve the same predict-correct loop.
:::
