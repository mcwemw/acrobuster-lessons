---
id: "43"
slug: pid-present-past-future-of-error
tag: 代理工程
title: PID：用誤差的現在、過去、未來來修正——feedback control 的靈魂是不信計畫、量現實
title_en: "PID: Correcting with the Present, Past, and Future of the Error — Feedback Control's Soul Is Distrust the Plan, Measure Reality"
title_short: PID：誤差的現在、過去、未來
summary: 自駕車怎麼把規劃好的路徑在現實裡開出來？靠 feedback control：量測「參考值 − 感測到的真實輸出」當誤差，持續修正。PID 把這件事拆成誤差的三個時間向度——P 看現在、I 記過去、D 看未來。P 單獨會留下穩態誤差，I 補記憶卻會過衝，D 用變化率阻尼。這就是「不信開環計畫、量現實來校正」的母題。
summary_en: How does a self-driving car actually drive the path it planned, in the real world? Feedback control: measure "reference − the sensed real output" as error, and correct continuously. PID splits this into three time axes of the error — P sees the present, I remembers the past, D anticipates the future. P alone leaves steady-state error, I adds memory but overshoots, D uses the rate of change to damp. This is the "distrust the open-loop plan, measure reality to correct" theme.
---
## 是什麼 · What it is

控制系統是「影響系統未來狀態」的機制，控制理論則是「怎麼改輸入去逼近想要的輸出」。關鍵對比：<strong>open-loop（開環）</strong>只是輸入→plant→輸出，不看結果——像踩油門控速，一遇上坡就慢下來卻不知道修正；<strong>closed-loop／feedback（閉環／回授）</strong>則多了一條回授線：<strong>參考值 − 感測器量到的真實輸出 ＝ 誤差</strong>，用誤差去驅動 controller 不斷校正。

最經典的 feedback controller 是 <strong>PID</strong>，而它的精髓是把「怎麼用誤差」拆成<strong>三個時間向度</strong>：

<p>
<strong>P（Proportional，比例）＝現在</strong>：輸出 ∝ 當下誤差（<code>K_p·e(t)</code>）。<br>
<strong>I（Integral，積分）＝過去（記憶）</strong>：把長期累積的誤差加總（<code>K_i·∫e(t)dt</code>）。<br>
<strong>D（Derivative，微分）＝未來</strong>：看誤差的<strong>變化率</strong>、預判走向（<code>K_d·de/dt</code>）。
</p>

合起來就是 <code>Output = K_p·e(t) + K_i·∫e(t)dt + K_d·de(t)/dt</code>（離散版把積分換成求和、微分換成 <code>e(t)−e(t−1)</code>）。

::: en
A control system is the mechanism that affects a system's future state; control theory is the strategy for changing the input to approach a desired output. The key contrast: **open-loop** is just input → plant → output with no feedback — like controlling speed with the accelerator, which slows on a hill without knowing to correct; **closed-loop / feedback** adds a feedback line: **reference − the real output measured by a sensor = error**, and the error drives the controller to correct continuously. The classic feedback controller is **PID**, whose essence is splitting "how to use the error" into **three time axes**: **P (Proportional) = the present** — output ∝ current error (<code>K_p·e(t)</code>); **I (Integral) = the past (memory)** — sum accumulated error over time (<code>K_i·∫e(t)dt</code>); **D (Derivative) = the future** — the **rate of change** of the error, anticipating its trend (<code>K_d·de/dt</code>). Together: <code>Output = K_p·e(t) + K_i·∫e(t)dt + K_d·de(t)/dt</code> (the discrete form replaces the integral with a sum and the derivative with <code>e(t)−e(t−1)</code>).
:::

## 為什麼重要 · Why it matters

該帶走的洞見有兩層。第一層是<strong>為什麼要三項，而不是一項就好</strong>——每一項都在補前一項的坑：

<p>
<strong>只用 P 會留下穩態誤差</strong>：因為輸出正比於誤差，若維持輸出<strong>需要</strong>非零誤差（投影片的螺旋槳例：要定在 200rpm 就得有誤差乘上增益），誤差就永遠歸不了零。<br>
<strong>加 I 補記憶</strong>：把過去累積的穩態誤差加總、逼它歸零——但累過頭會<strong>過衝（overshoot）</strong>、來回震盪。<br>
<strong>加 D 看未來</strong>：用誤差變化率提前踩煞車，<strong>阻尼</strong>那個過衝。
</p>

所以 P 的穩態誤差 vs I 的過衝，是一組要調的張力——又是一個熟悉的旋鈕，精神上近 [[36-exploration-vs-exploitation-dial|探索 vs 利用]]那種取捨。而 <strong>D 用「誤差將往哪走」來現在就修正</strong>，根本是 [[35-search-honest-estimate-of-future|A\* 用估計的未來 h 導航]]、[[37-reward-is-rl-loss-credit-assignment|TD 用未來狀態回填現在]]的同一招換了件衣服。

第二層、也是最該帶走的：<span class="tag-warn">open-loop 相信自己的計畫，closed-loop 量測現實、承認會偏、然後校正</span>。這正是我一整天的母題，而 PID 是它最乾淨的化身——有了它，[[42-motion-planning-search-meets-physics|卡 42 規劃出來的理想路徑]]才能在真實世界被<strong>開出來</strong>：longitudinal control 管「離目標多遠（速度）」，lateral control（pure pursuit／Stanley／LQR）管「方向盤怎麼打」把車咬在路徑上。規劃給你一張地圖，feedback control 才是那雙會不斷修正的手。

::: src
出處 Source：Min-Chun Hu（胡敏君），NTHU《Robotic Navigation and Exploration》Unit 3「Kinematic Model &amp; Path Tracking Control」投影片（578101）。control system／control theory 定義、open-loop（accelerator→speed、上下坡擾動）、closed-loop/feedback（reference−sensor measured＝error、controller/plant/sensor）、LTI 與 Laplace（time↔frequency、閉環轉移 DG/(1+DGH)）、PID 之 P=present／I=past(memory)／D=future、連續式 Output=K_p·e+K_i·∫e+K_d·de/dt 與離散式（Σe、e(t)−e(t−1)）、P 的穩態誤差（error×gain=propeller speed、100×2=2×100=200rpm）、I 補記憶但 overshoot、D 看誤差變化率阻尼、path tracking problem（longitude control＝到目標距離；lateral＝pure pursuit／Stanley／LQR）均出自該投影片，作者改寫重述。<br>「P/I/D＝誤差的現在/過去/未來」為投影片原框架；「open-loop 信計畫 vs closed-loop 量現實校正＝估計+校正母題」「D 看未來＝A\* 的 h／TD bootstrap 同招」「P 穩態誤差 vs I 過衝＝一組旋鈕」「feedback control 是執行卡 42 規劃的手」為作者綜述觀點（Author's view），對應本站 [[35-search-honest-estimate-of-future|35]]／[[36-exploration-vs-exploitation-dial|36]]／[[37-reward-is-rl-loss-credit-assignment|37]]／[[42-motion-planning-search-meets-physics|42]]。
:::

## 一句話帶走 · Takeaway

PID 用誤差的現在(P)、過去(I)、未來(D)來修正：P 留穩態誤差、I 補記憶卻過衝、D 看變化率阻尼。更深一層，open-loop 信計畫、closed-loop 量現實再校正——這就是整站的母題，也是讓卡 42 規劃的路徑真能在現實被開出來的那雙手。

::: en
PID corrects using the present (P), past (I), and future (D) of the error: P leaves steady-state error, I adds memory but overshoots, D uses the rate of change to damp. Deeper: open-loop trusts the plan, closed-loop measures reality then corrects — the site's recurring theme, and the hands that let card 42's planned path actually be driven in the real world.
:::
