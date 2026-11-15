---
id: "50"
slug: lateral-control-geometry-feedback-optimal
tag: 代理工程
title: 方向盤怎麼打：pure-pursuit 看幾何、Stanley 盯誤差、LQR 算最優——三種哲學的階梯
title_en: "How to Steer: Pure-Pursuit Looks at Geometry, Stanley Watches the Error, LQR Computes the Optimum — a Ladder of Three Philosophies"
title_short: 轉向控制：幾何／誤差回授／最優
summary: HW2 要你讓車沿著規劃好的路徑開，核心是橫向（方向盤）控制，而它有三種哲學，剛好是一道階梯：pure-pursuit 純看幾何——追前方一個 lookahead 點；Stanley 盯當下誤差——把橫向偏差和朝向偏差回授修正；LQR 算最優——有車體模型，最小化一個二次代價，在「跟得準」與「別亂打方向盤」之間取最優權衡。越往上，要的模型知識越多。
summary_en: HW2 asks you to drive a car along a planned path, and the heart of it is lateral (steering) control, which comes in three philosophies forming a ladder: pure-pursuit is pure geometry — chase a lookahead point ahead on the path; Stanley watches the current error — feed back the cross-track and heading deviation; LQR computes the optimum — with a vehicle model, it minimizes a quadratic cost, trading off "track accuracy" against "don't thrash the wheel." The higher you climb, the more model knowledge you need.
---
## 是什麼 · What it is

這是 [[43-pid-present-past-future-of-error|卡 43 的 feedback control]]的動手版。HW2 要讓車沿著 [[42-motion-planning-search-meets-physics|規劃好的路徑]]開，拆成兩軸：<strong>縱向控制</strong>（longitudinal，管車速／離目標多遠）和<strong>橫向控制</strong>（lateral，管方向盤怎麼打、把車咬在路徑上）。橫向才是重頭戲，而它有三種哲學，剛好是一道階梯：

<p>
<strong>pure-pursuit（純追蹤）＝幾何</strong>：在路徑上取一個前方 <code>L_d</code> 遠的 <strong>lookahead 點</strong>，算出一段圓弧對準它、照這個轉向角開。不管誤差模型，就是「追前面那根紅蘿蔔」；lookahead 距離是個旋鈕（太近會抖、太遠會切彎）。<br>
<strong>Stanley ＝誤差回授</strong>：直接盯<strong>當下的兩個偏差</strong>——橫向偏差（cross-track error）和朝向偏差（heading error），回授修正 <code>δ = θ_e + arctan(k·e/v)</code>。像 PID 的精神，但為轉向量身設計、顧漸進穩定。<br>
<strong>LQR（線性二次調節器）＝最優控制</strong>：先有車體<strong>運動模型</strong>（如 bicycle model），再最小化一個二次代價 <code>∫(xᵀQx + uᵀRu)</code>，解出最優的線性回授。<strong>Q 與 R 是權重：Q 看「跟得多準」、R 罰「方向盤打多凶」</strong>——又一個要調的權衡旋鈕。
</p>

::: en
This is the hands-on version of [[43-pid-present-past-future-of-error|card 43's feedback control]]. HW2 drives a car along a [[42-motion-planning-search-meets-physics|planned path]], split into two axes: **longitudinal control** (speed / distance to goal) and **lateral control** (steering, keeping the car on the path). Lateral is the main event, and it has three philosophies forming a ladder: **pure-pursuit = geometry** — pick a **lookahead point** <code>L_d</code> ahead on the path, compute an arc aimed at it, and steer by that angle; no error model, just "chase the carrot" (lookahead distance is a knob — too short oscillates, too long cuts corners). **Stanley = error feedback** — watch the two **current deviations**, cross-track error and heading error, and correct <code>δ=θ_e+arctan(k·e/v)</code>; PID in spirit but tailored to steering, for progressive stability. **LQR (Linear Quadratic Regulator) = optimal control** — start from a vehicle **motion model** (e.g. bicycle model), minimize a quadratic cost <code>∫(xᵀQx+uᵀRu)</code>, and solve for the optimal linear feedback; **Q and R are weights: Q cares "how accurately you track," R penalizes "how hard you yank the wheel"** — yet another trade-off knob.
:::

## 為什麼重要 · Why it matters

該帶走的洞見：<strong>這三個控制器排成一道階梯，往上一階就要多付出一分「模型知識」。</strong>pure-pursuit 幾乎不需要模型（純幾何）；Stanley 要知道怎麼量誤差；LQR 要一個完整的車體動力學模型。這正是 [[44-rl-end-of-control-ladder-value-vs-policy|卡 44 那道控制階梯]]的前半段——而它的終點很關鍵：<span class="tag-warn">當車體非線性到連 LQR 的模型都寫不出來，就只能跳去 model-free RL（卡 44）</span>。所以 HW1→HW2→HW3（規劃→控制→RL）不是三個孤立作業，是同一道「越來越不依賴手寫模型」的階梯。

第二個該帶走的，是那個反覆出現的<strong>權衡旋鈕</strong>：LQR 的 <code>Q/R</code>——跟得準 vs 別亂打方向盤——跟 [[46-slam-graph-optimization-least-squares-consensus|SLAM 的資訊矩陣權重]]、[[36-exploration-vs-exploitation-dial|探索 vs 利用]]、PID 的穩態誤差 vs 過衝，是同一種「兩個你都想要、但得取捨」的結構。而 pure-pursuit「看前方」vs Stanley「修當下」，又恰好是<strong>前饋（預判）vs 回授（校正）</strong>的對照，呼應 [[43-pid-present-past-future-of-error|PID 的現在/未來]]。

最後是 HW2 那個 <strong>F1 賽道挑戰</strong>的寓意：把你的控制器拉到真實賽道上飆，會<strong>暴露你的運動模型和現實之間的誤差</strong>——完美的模型不存在，所以再好的規劃與最優控制，上路後都還是要靠回授一路修。這還是整站「<strong>計畫/模型 ≠ 現實，中間要有一道校正</strong>」的母題。

::: src
出處 Source：NTHU《Robotic Navigation and Exploration》(578101, 胡敏君) HW2「Kinematic Models and Path Tracking Control」（kinematic models 20%／longitudinal control 20%／lateral controllers PID·pure-pursuit·Stanley·LQR 50%／F1 賽道挑戰 10%）與 Unit 3 投影片為本卡的實作對象；本卡以路徑追蹤控制標準概念為據、非重製作業規格。縱向/橫向控制之分、kinematic/differential drive/bicycle model、pure-pursuit（lookahead 點、δ=arctan(2L sinα/L_d)、純幾何）、Stanley（cross-track+heading error 回授、δ=θ_e+arctan(ke/v)、漸進穩定）、LQR（運動模型＋二次代價 Q/R、解 DARE/最優線性回授）、控制階梯（PID→pure-pursuit→Stanley→LQR→無模型則 model-free RL）、F1 賽道挑戰均出自該課程/投影片，作者改寫重述。<br>「三控制器＝幾何/誤差回授/最優的階梯、越上階越需模型知識」「LQR 的 Q/R＝跟得準 vs 別亂打的權衡旋鈕（同資訊矩陣/探索利用）」「pure-pursuit 看前方 vs Stanley 修當下＝前饋 vs 回授」「F1 賽道暴露模型與現實誤差＝計畫≠現實要校正」為作者綜述觀點（Author's view），對應本站 [[43-pid-present-past-future-of-error|43]]／[[44-rl-end-of-control-ladder-value-vs-policy|44]]／[[46-slam-graph-optimization-least-squares-consensus|46]]／[[36-exploration-vs-exploitation-dial|36]]。
:::

## 一句話帶走 · Takeaway

橫向控制有三種哲學、一道階梯：pure-pursuit 看幾何（追 lookahead 點）、Stanley 盯誤差（回授 cross-track+heading）、LQR 算最優（有模型、Q/R 權衡跟得準 vs 別亂打）。往上要越多模型知識，模型寫不出來就跳 model-free RL。LQR 的 Q/R 是又一個權衡旋鈕；F1 賽道則提醒你：模型 ≠ 現實，上路仍得靠回授修。

::: en
Lateral control has three philosophies on one ladder: pure-pursuit looks at geometry (chase a lookahead point), Stanley watches the error (feed back cross-track + heading), LQR computes the optimum (with a model, Q/R trading accuracy against wheel-thrash). Climbing needs more model knowledge; when you can't write the model, jump to model-free RL. LQR's Q/R is yet another trade-off knob; and the F1 track reminds you the model ≠ reality — on the road you still correct by feedback.
:::
