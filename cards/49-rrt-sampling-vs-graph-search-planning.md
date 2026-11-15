---
id: "49"
slug: rrt-sampling-vs-graph-search-planning
tag: 代理工程
title: A* vs RRT*：窮舉網格的最優 vs 隨機取樣的可擴展——空間大到不能窮舉時，就撒點
title_en: "A* vs RRT*: Grid Exhaustion's Optimality vs Random Sampling's Scalability — When the Space Is Too Big to Exhaust, Sample It"
title_short: A* vs RRT*：撒點取代窮舉
summary: HW1 要你用 A* 和 RRT* 兩種方法都解一次路徑規劃，而它們正是兩種世界觀。A* 把空間切成網格、系統地搜，最優但維度一高、解析度一細就爆掉。RRT 改成在連續空間隨機撒點、長出一棵樹，機率完備、能擴展到高維，RRT* 再靠 rewire 漸近逼近最優。空間大到不能窮舉時就撒點——這跟遊戲 AI 從 minimax 轉 MCTS 是同一招。
summary_en: HW1 asks you to solve path planning with both A* and RRT*, and they are two worldviews. A* chops space into a grid and searches systematically — optimal, but it blows up as dimension rises or resolution gets finer. RRT instead samples random points in continuous space and grows a tree — probabilistically complete, scalable to high dimensions, and RRT* rewires to approach optimality asymptotically. When the space is too big to exhaust, sample it — the same move as game AI going from minimax to MCTS.
---
## 是什麼 · What it is

這是 [[42-motion-planning-search-meets-physics|卡 42 motion planning]]的動手版——HW1 要你對同一張有障礙的地圖，用<strong>兩種截然不同的方法</strong>各解一次無碰撞路徑：<strong>A*</strong> 和 <strong>RRT*</strong>。它們代表兩種世界觀。

<p>
<strong>A*（圖搜尋）</strong>：把空間切成<strong>網格/圖</strong>，從起點系統地展開，<code>f=g+h</code> 挑最有希望的格子走。<strong>有 admissible 啟發式就保證最優</strong>——但問題在那個網格：維度一高（機器手臂的關節空間）或解析度一細，格子數就<strong>指數爆炸</strong>，窮舉不完。<br>
<strong>RRT（Rapidly-exploring Random Tree，快速隨機探索樹）</strong>：不切網格，直接在<strong>連續空間隨機撒點</strong>，從已有的樹朝每個撒到的點長一小段（避開障礙就保留）。它<strong>機率完備</strong>（只要路徑存在、取樣夠多就找得到），而且天生擴展到高維、能塞進車子轉向之類的運動約束——但長出來的路<strong>歪歪扭扭、不是最優</strong>。<strong>RRT*</strong> 多了一步 <strong>rewire</strong>（新點加入時，就近重接讓路徑更短），使它<strong>漸近最優</strong>：取樣越多，路徑品質越逼近最佳。
</p>

::: en
This is the hands-on version of [[42-motion-planning-search-meets-physics|card 42's motion planning]] — HW1 asks you to solve a collision-free path on the same obstacle map with **two very different methods**: **A*** and **RRT***, representing two worldviews. **A\* (graph search)** chops space into a **grid/graph**, expands systematically from the start, and picks the most promising cell by <code>f=g+h</code>. With an admissible heuristic it's **optimal** — but the grid is the catch: as dimension rises (a robot arm's joint space) or resolution gets finer, the cell count **explodes exponentially** and can't be exhausted. **RRT** doesn't grid anything; it **samples random points in continuous space**, growing the existing tree a short step toward each sample (kept if collision-free). It is **probabilistically complete** (finds a path if one exists, given enough samples), scales naturally to high dimensions, and absorbs motion constraints like steering limits — but the path it grows is **jagged, not optimal**. **RRT\*** adds a **rewire** step (when a new point joins, reconnect nearby nodes to shorten paths), making it **asymptotically optimal**: the more you sample, the closer the path quality gets to the best.
:::

## 為什麼重要 · Why it matters

該帶走的洞見：<span class="tag-warn">空間大到不能窮舉時，就別窮舉，改隨機取樣</span>——而這句話你已經在站上見過了。[[38-games-exhaustive-dream-meets-explosion|卡 38 的遊戲 AI]]走的正是同一條路：棋局的狀態太多，minimax 窮舉不下去，就改成 <strong>MCTS 的取樣</strong>。<strong>RRT 本質上就是「規劃空間版的 MCTS」</strong>：當 config space 大到 A* 的網格爆炸，就用隨機撒點去探索、漸漸集中到有希望的區域。[[36-exploration-vs-exploitation-dial|探索 vs 利用]]那個旋鈕也在這裡——RRT 的隨機撒點就是純探索，讓樹快速鋪滿空間。

第二個該帶走的是那組取捨，正好對應 [[35-search-honest-estimate-of-future|卡 35 的保證]]：<strong>A* 給你「確定性的最優保證」，但不保證算得完；RRT 給你「機率完備＋漸近最優」，用可擴展性換掉了那個硬保證。</strong>這不是誰比較好，是你在「<strong>保證</strong> vs <strong>可擴展</strong>」之間選一邊——低維、要最優、空間小就 A*；高維、連續、有運動約束、只要夠好就 RRT*。HW1 讓你兩種都跑一遍，就是要你親眼看到：同一張地圖，一個靠窮舉、一個靠撒點，而維度一上去，差距就是能不能算得出來。

::: src
出處 Source：NTHU《Robotic Navigation and Exploration》(578101, 胡敏君) HW1「Path Planning」（給定有障礙的地圖、起點與終點，用 A* 與 RRT* 各求一條無碰撞路徑；A* 45%／RRT* 45%／report 10%）為本卡的實作對象；本卡以路徑規劃標準概念為據、非重製作業規格。A*（圖/網格搜尋、f=g+h、admissible→最優、維度/解析度→格子指數成長）、RRT（連續空間隨機取樣長樹、機率完備、可擴展高維與運動約束、路徑非最優）、RRT*（rewire→漸近最優）均為 sampling-based motion planning 標準概念，與 Unit 2 outline（Graph Search Based / Sampling Based Methods）一致。<br>「空間大到不能窮舉就撒點」「RRT＝規劃空間版的 MCTS」「A* 確定性最優保證 vs RRT 機率完備＋漸近最優＝保證 vs 可擴展的取捨」為作者綜述觀點（Author's view），對應本站 [[42-motion-planning-search-meets-physics|42]]／[[38-games-exhaustive-dream-meets-explosion|38]]／[[36-exploration-vs-exploitation-dial|36]]／[[35-search-honest-estimate-of-future|35]]。
:::

## 一句話帶走 · Takeaway

A* 把空間切網格系統搜，最優但維度一高就爆；RRT 在連續空間隨機撒點長樹，機率完備、可擴展，RRT* 再 rewire 漸近最優。空間大到不能窮舉時就撒點——這就是遊戲 AI 從 minimax 轉 MCTS 的同一招，搬到規劃空間。選哪個，是在「確定性最優保證」與「可擴展」之間選一邊。

::: en
A* grids the space and searches systematically — optimal, but it explodes as dimension rises; RRT samples random points in continuous space to grow a tree — probabilistically complete and scalable, and RRT* rewires to approach optimality. When the space is too big to exhaust, sample it — the very move of game AI going from minimax to MCTS, applied to planning. Choosing between them is choosing between a deterministic optimality guarantee and scalability.
:::
