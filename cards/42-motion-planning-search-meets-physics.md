---
id: "42"
slug: motion-planning-search-meets-physics
tag: 代理工程
title: 機器人的 motion planning：把抽象搜尋落進物理世界，就得加上避碰、平滑與回授
title_en: "Robot Motion Planning: Drop Abstract Search into the Physical World and You Must Add Collision-Avoidance, Smoothing, and Feedback"
title_short: motion planning：搜尋落進物理世界
summary: 機器人的動作規劃，骨子裡就是圖上的最短路徑搜尋（Dijkstra／A*）——但一旦落進真實世界，光是「短」不夠：路徑還要避碰、平滑、符合車子的運動限制。於是它拆成 path planning（只管空間）＋ trajectory planning（加上時間與速度）＋ feedback control（因為現實會偏離計畫，得閉環修正）。
summary_en: A robot's motion planning is, at its core, shortest-path search on a graph (Dijkstra / A*) — but the moment it enters the real world, "short" isn't enough: the path must also avoid collisions, be smooth, and respect the vehicle's motion limits. So it splits into path planning (spatial only) + trajectory planning (adding time and speed) + feedback control (because reality drifts from the plan, you must close the loop and correct).
---
## 是什麼 · What it is

<strong>motion planning</strong>（動作規劃）要找出把機器人從起點送到終點的動作序列，而且序列必須滿足四件事：<strong>避開已知障礙、路徑平滑、長度最短、符合運動約束</strong>（例如最高速度）。它拆成兩層，投影片一句話總結：<strong>Motion Planning ＝ Path Planning ＋ Trajectory Planning</strong>。

<p>
<strong>path planning（路徑規劃）</strong>：只管<strong>空間</strong>——輸入起終點，輸出一串 <strong>waypoints</strong>（像地圖上的轉彎點）。<br>
<strong>curve interpolation（曲線內插）</strong>：把 waypoints 用曲線函數接成平滑路徑，順便算出路徑的導數資訊。<br>
<strong>trajectory planning（軌跡規劃）</strong>：加進<strong>時間</strong>——輸出帶速度、加速度、時間戳的動作（<code>[x,y,v,a,t]</code>），才能應付<strong>動態環境</strong>（會動的障礙物，用 state lattices 之類方法選一條不撞的時空軌跡）。
</p>

整條流程是：感知模型給「我在哪、要去哪」→ path planning 出 waypoints → curve interpolation 平滑 → trajectory planning 加時間 → 最後交給 <strong>feedback control</strong> 去執行。

::: en
**Motion planning** finds the sequence of actions that moves a robot from start to goal, and that sequence must satisfy four things: **avoid known obstacles, be a smooth path, be minimal length, and respect motion constraints** (e.g., max speed). It splits into layers, which the slides sum up as **Motion Planning = Path Planning + Trajectory Planning**. **Path planning** handles **space only** — input start/end, output a list of **waypoints**. **Curve interpolation** connects the waypoints into a smooth path via a curve function (and gives path derivatives). **Trajectory planning** adds **time** — outputting actions with speed, acceleration and timestamps (<code>[x,y,v,a,t]</code>), so it can handle **dynamic environments** (moving obstacles, via methods like state lattices). The flow: the perception model gives "where am I, where to go" → path planning yields waypoints → curve interpolation smooths → trajectory planning adds time → finally handed to **feedback control** to execute.
:::

## 為什麼重要 · Why it matters

該帶走的第一個洞見：<strong>path planning 的核心，就是 [[35-search-honest-estimate-of-future|卡 35 那套搜尋]]搬到機器人身上。</strong>把世界表示成圖 <code>G=(V,E)</code>（頂點＋帶權邊），要的就是<strong>最短路徑</strong>（邊權總和最小）。單源最短路徑的三個老朋友原封不動：<strong>Dijkstra</strong>（只吃非負權、複雜度高）、<strong>Best-First／貪婪啟發式</strong>（快但非最優）、以及 <strong>A\*</strong>——投影片直接寫成「<strong>A\* ＝ BFS with Dijkstra</strong>」，正是 [[35-search-honest-estimate-of-future|卡 35 的 f=g+h]]：已走成本 ＋ 估計未來。（連續空間、車子轉向受限時，另有 sampling-based 的 RRT／RRT\* 作為互補——HW1 正好要你把 A\* 和 RRT\* 都實作一遍。）

但真正讓它跟卡 35 不同、也最該帶走的是：<span class="tag-warn">抽象搜尋可以假設「找到路就走得到」，物理世界不行</span>。一條幾何上最短的路可能<strong>撞上會動的障礙</strong>（dynamic environment problem）、或要求車子做不到的急轉——所以才需要<strong>時間維度（trajectory）</strong>和<strong>運動約束</strong>。而最後那塊 <strong>feedback control</strong> 才是點睛：<strong>規劃出的理想軌跡，執行時一定會因現實誤差而偏離，要靠回授閉環不斷修正。</strong>這又是我一整天在講的母題——<strong>先有一個計畫/估計，再用現實回授去校正它</strong>，跟 [[37-reward-is-rl-loss-credit-assignment|RL 用未來回填現在]]、以及 SLAM 的 loop closure 修漂移，是同一條線。

::: src
出處 Source：Min-Chun Hu（胡敏君），NTHU《Robotic Navigation and Exploration》Unit 2「Motion Planning」投影片（578101）。motion planning 定義與四要求（避碰／平滑／最短／運動約束）、Motion Planning＝Path Planning＋Trajectory Planning、path planning（空間、輸出 waypoints、route vs grid-space）、curve interpolation（曲線接平滑＋導數）、trajectory planning（加速度/速度/時間、動態環境、state lattices、輸入含 curve function 與 Δt、輸出 [x,y,v,a,t]）、dynamic environment problem 與 collision、feedback control、motion planning flow（感知→path→curve→trajectory→feedback）、graph G=(V,E) 有向/無向/權重、最短路徑＝邊權總和最小、Dijkstra（非負權、高複雜度、更新式 d(v,v')=min(d(v,u)+⟨u,v'⟩, d(v,v'))）、Best-First Search（啟發貪婪、快但非最優）、A\*＝BFS with Dijkstra 均出自該投影片；sampling-based RRT／RRT\* 見本課 HW1 與 Unit 2 outline（Sampling Based Methods），作者改寫重述。<br>「motion planning＝卡 35 搜尋的物理落地、多了避碰/時間/運動約束」「feedback control＝規劃後用現實回授校正＝估計+校正母題」為作者綜述觀點（Author's view），對應本站 [[35-search-honest-estimate-of-future|卡 35]]／[[37-reward-is-rl-loss-credit-assignment|37]]。
:::

## 一句話帶走 · Takeaway

機器人動作規劃骨子裡是圖上的最短路徑搜尋（Dijkstra／A\*＝BFS+Dijkstra，就是卡 35 的 f=g+h）；但落進真實世界，光短不夠，要避碰、平滑、符合運動約束，所以拆成 path（空間）＋trajectory（加時間）＋feedback（現實會偏、要閉環修正）。最後這層回授，就是「先估計再用現實校正」母題的機器人版。

::: en
Robot motion planning is at heart shortest-path search on a graph (Dijkstra / A* = BFS + Dijkstra, i.e., card 35's f=g+h); but in the real world "short" isn't enough — you need collision-avoidance, smoothness, and motion constraints, so it splits into path (space) + trajectory (adds time) + feedback (reality drifts, close the loop). That last feedback layer is the robot version of the "estimate, then correct against reality" theme.
:::
