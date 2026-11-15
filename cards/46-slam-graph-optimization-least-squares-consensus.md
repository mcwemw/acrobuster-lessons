---
id: "46"
slug: slam-graph-optimization-least-squares-consensus
tag: 模型原理
title: SLAM 的 graph 最佳化：量測互相矛盾時，不二選一，而是最小平方求共識
title_en: "SLAM's Graph Optimization: When Measurements Conflict, Don't Pick One — Least-Squares Finds the Consensus"
title_short: 量測矛盾時：最小平方求共識
summary: 卡 45 的 loop closure 一旦發生，就會製造矛盾——追蹤說「我在 0.2」，loop closure 說「我在 0」。SLAM back-end 的 graph 最佳化不挑一個信，而是把所有約束寫成誤差、用加權最小平方找「對全部量測總誤差最小」的那組位置。權重是資訊矩陣（協方差倒數）＝你多信這個量測。這其實就是 MAP／MLE。
summary_en: Once card 45's loop closure fires, it creates a contradiction — tracking says "I'm at 0.2," loop closure says "I'm at 0." SLAM's graph optimization doesn't trust one over the other; it writes every constraint as an error and uses weighted least squares to find the poses that minimize the total error over all measurements. The weight is the information matrix (inverse covariance) = how much you trust each measurement. This is exactly MAP/MLE.
---
## 是什麼 · What it is

這張是 [[45-slam-predict-correct-loop-closure|卡 45 SLAM]]的數學內核。先把問題寫成機率：帶高斯雜訊的運動 <code>x_k=f(x_{k−1},u_k)+w</code> 和觀測 <code>z=h(m,x)+v</code>，要求的是<strong>後驗</strong> <code>P(x,m | z,u) ∝ 似然 × 先驗</code>——也就是 <strong>MAP（最大後驗）估計</strong>。關鍵一步：高斯分布取負對數，<strong>乘積就變成「誤差的加權平方和」</strong>，於是「找最可能的軌跡與地圖」＝<strong>一個最小平方問題</strong>：

<p>
<code>min F = Σ eᵤᵀ R⁻¹ eᵤ + Σ e_zᵀ Q⁻¹ e_z</code><br>
其中 <code>eᵤ = x_k − f(x_{k−1},u_k)</code>（運動誤差）、<code>e_z = z − h(m,x)</code>（觀測誤差）；<code>R⁻¹、Q⁻¹</code> 是<strong>資訊矩陣 Ω</strong>（協方差的倒數）＝這個量測有多可信。
</p>

投影片那個 1D 例子最醍醐灌頂：機器人追蹤得到 <code>x0=0, x1=x0+1, x2=x1−0.8</code>，繞一圈後 loop closure 又說 <code>x0=x2+0</code>。<strong>這四條約束彼此矛盾</strong>（追蹤推出 x2=0.2，loop closure 卻要 x2=x0=0）——沒有一組數字能同時滿足。graph 最佳化的答案不是挑一條信，而是 <code>min Σ wᵢ fᵢ²</code>：<strong>找一組位置，讓對所有約束的總加權誤差最小。</strong>

::: en
This is the mathematical core of [[45-slam-predict-correct-loop-closure|card 45's SLAM]]. Write the problem probabilistically: Gaussian-noise motion <code>x_k=f(x_{k−1},u_k)+w</code> and observation <code>z=h(m,x)+v</code>; what you want is the **posterior** <code>P(x,m|z,u) ∝ likelihood × prior</code> — i.e. the **MAP (maximum a posteriori)** estimate. The key step: taking the negative log of a Gaussian turns the product into a **weighted sum of squared errors**, so "find the most likely trajectory and map" becomes a **least-squares problem**: <code>min F = Σ eᵤᵀR⁻¹eᵤ + Σ e_zᵀQ⁻¹e_z</code>, where <code>eᵤ=x_k−f(x_{k−1},u_k)</code> (motion error), <code>e_z=z−h(m,x)</code> (observation error), and <code>R⁻¹,Q⁻¹</code> are the **information matrix Ω** (inverse covariance) = how trustworthy each measurement is. The slides' 1D example is the clincher: tracking gives <code>x0=0, x1=x0+1, x2=x1−0.8</code>, and after a loop, loop closure says <code>x0=x2+0</code>. **These four constraints contradict each other** (tracking implies x2=0.2, loop closure demands x2=0) — no single set of numbers satisfies all. Graph optimization's answer isn't to pick one; it's <code>min Σ wᵢfᵢ²</code>: **find the poses that minimize the total weighted error across all constraints.**
:::

## 為什麼重要 · Why it matters

該帶走的洞見：<span class="tag-warn">當多個量測互相矛盾，成熟的做法不是二選一，而是找一個「對所有證據總誤差最小」的共識，並按每個量測的可信度加權</span>。那個權重 <code>Ω = Σ⁻¹</code>（協方差倒數）說得很直白——<strong>越確定的量測，拉力越大</strong>。這根本就是我一直在守的紀律：多來源不一致時，不挑順眼的一個，而是依可靠度把它們兜成最一致的估計（Maker/Checker、證據強度加權、[[01-rag-faithfulness|faithfulness 的 support strength]]都是同一件事）。loop closure 之所以威力強，是因為它多加一條<strong>獨立約束</strong>進這個最小平方，把累積漂移整段拉正。

第二個該帶走的是怎麼解：把誤差用一階 Taylor 線性化，再用 <strong>Gauss-Newton</strong>（解 <code>HΔx=−b</code>，<code>H≈JᵀJ</code>）或 <strong>Levenberg-Marquardt</strong>（<code>(H+λI)Δx=−b</code>）迭代；大型稀疏系統用 sparse Cholesky 分解（g2o／Ceres 這些庫）。注意 <strong>LM 的那個 λI 阻尼</strong>——它限制每步別更新太遠，正是 [[44-rl-end-of-control-ladder-value-vs-policy|PPO 信賴域]]／[[08-rlhf-preference-reward|RLHF 的 KL 繩]]同一個「小步、別跳太遠」的直覺，只是換到優化器裡。而「MAP ＝ 先驗 × 似然」這個骨架，本身就是<strong>先用運動模型 predict（先驗），再用觀測 correct（似然）</strong>——又回到 [[45-slam-predict-correct-loop-closure|predict-correct]]母題。（至於兩幀之間的相對位姿怎麼量出來？scan-to-scan registration：最小化 <code>‖q−Rp−t‖²</code>，去均值後用 SVD 解旋轉 <code>R*=VUᵀ</code>——也是最小平方。）

::: src
出處 Source：Min-Chun Hu（胡敏君），NTHU《Robotic Navigation and Exploration》Unit 6「SLAM Back-end (II)」投影片（578101；graph optimization general form 與演算法取自 g2o 相關文獻、Ceres Solver）。高斯雜訊運動/觀測模型、state estimation 為 MAP（posterior ∝ likelihood × prior）與 MLE、−lnP(高斯)＝½(x−μ)ᵀΣ⁻¹(x−μ) 轉最小平方（Mahalanobis）、graph optimization min F=ΣeᵤᵀR⁻¹eᵤ+Σe_zᵀQ⁻¹e_z 與一般式 F(x)=Σe(x_i,x_j,z_ij)ᵀΩ_ij e、1D loop-closure 範例（x0=0/x1=x0+1/x2=x1−0.8/loop closure x0=x2+0、min Σw_i f_i²、edge e01/e12/e02）、2D pose graph 誤差項 e_ij、一階 Taylor 線性化、Gauss-Newton（HΔx=−b, H≈JᵀJ）/Levenberg-Marquardt（(H+λI)Δx=−b）、sparse Cholesky、g2o／Ceres、complete algorithm（Jacobian A_ij/B_ij、H/b 累加、固定首節點）、scan-to-scan registration（min ½Σ‖q−Rp−t‖²、去均值、rotation 由 H=Σq'p'ᵀ 的 SVD R*=VUᵀ、t*=μ_q−R*μ_p、Trace 引理證明）均出自該投影片，作者改寫重述。<br>「量測矛盾時不二選一、用資訊矩陣加權的最小平方求共識＝Maker/Checker 證據加權」「LM 的 λI＝PPO/KL 的小步直覺」「MAP＝先驗 predict × 似然 correct」為作者綜述觀點（Author's view），對應本站 [[45-slam-predict-correct-loop-closure|45]]／[[01-rag-faithfulness|01]]／[[44-rl-end-of-control-ladder-value-vs-policy|44]]／[[08-rlhf-preference-reward|08]]。
:::

## 一句話帶走 · Takeaway

SLAM back-end 的 graph 最佳化就是 MAP：高斯雜訊讓「找最可能的軌跡與地圖」變成加權最小平方。量測矛盾（尤其 loop closure 一進來）時，不二選一，而是找對所有約束總誤差最小的共識，權重＝資訊矩陣＝可信度。用 Gauss-Newton／LM 解，LM 的 λI 阻尼又是「小步別跳太遠」的老直覺。

::: en
SLAM's graph optimization is MAP: Gaussian noise turns "find the most likely trajectory and map" into weighted least squares. When measurements conflict (especially once loop closure arrives), don't pick one — find the consensus minimizing total error over all constraints, weighted by the information matrix = trustworthiness. Solve with Gauss-Newton / LM, whose λI damping is once again the "small steps, don't jump too far" intuition.
:::
