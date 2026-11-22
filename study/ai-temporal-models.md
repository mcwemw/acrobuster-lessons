---
question: 時序機率模型(HMM/卡爾曼/DBN)怎麼表示隨時間變化的狀態?濾波/預測/平滑/最可能序列四大推論任務各算什麼?Viterbi 為何是 DP?
keywords: [hidden-markov-model, kalman-filter, filtering-smoothing-viterbi]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Hidden Markov model [[raw:aic14-hmm-wikipedia]](CC BY-SA 4.0)、Kalman filter [[raw:aic14-kalman-wikipedia]](CC BY-SA 4.0)、Dynamic Bayesian network [[raw:aic14-dbn-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.14(Probabilistic Reasoning over Time)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 時序機率推論 Reasoning over Time（AIMA Ch.14）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
> 一句話:用**馬可夫假設**(現在只依賴前一刻)+ 觀測模型,對隨時間演變的隱藏狀態做推論;HMM(離散)、卡爾曼(連續線性高斯)、DBN(通用)是三種實例。(aic14-hmm-wikipedia)

## 1. 時序模型結構

- **轉移模型** P(Xₜ|Xₜ₋₁)(馬可夫假設)+ **感測模型** P(Eₜ|Xₜ)(觀測只依當前狀態)。(aic14-hmm-wikipedia)
- **HMM**:隱藏狀態離散、觀測離散/連續;轉移矩陣 + 發射機率。
- **卡爾曼濾波**:狀態連續、線性高斯轉移與觀測 → 後驗恆為高斯,遞迴更新均值/共變。(aic14-kalman-wikipedia)
- **DBN**:貝氏網([[ai-probabilistic-reasoning]])的時序展開,每個時間片一組變數 + 片間邊;HMM/卡爾曼是其特例。(aic14-dbn-wikipedia)

## 2. 四大推論任務

- **濾波(filtering)**:P(Xₜ|e₁:ₜ)——由過去到現在估當前狀態(前向演算法,遞迴)。
- **預測(prediction)**:P(Xₜ₊ₖ|e₁:ₜ)——往未來推。
- **平滑(smoothing)**:P(Xₖ|e₁:ₜ),k<t——用未來觀測修正過去估計(前向-後向)。
- **最可能解釋**:argmax P(X₁:ₜ|e₁:ₜ)——最可能狀態序列(**Viterbi**)。

## 3. 前向-後向 + Viterbi

- **前向演算法**:遞迴 αₜ(x)=P(eₜ|x)·Σ_{x'} P(x|x')αₜ₋₁(x') → 濾波 O(S²T)。
- **前向-後向**:結合前向 α 與後向 β 做平滑。
- **Viterbi**:同前向但把 Σ 換 **max** + 記回溯指標 → 求最可能狀態序,是標準 [dynamic-programming](dynamic-programming.md)（狀態=時刻×隱藏態）。

## 深化:卡爾曼 + 粒子濾波 + worked

### 卡爾曼濾波兩步
**預測**:x̂⁻=F x̂,P⁻=FPFᵀ+Q(狀態與不確定度往前推)。**更新**:算 Kalman gain K=P⁻Hᵀ(HP⁻Hᵀ+R)⁻¹,x̂=x̂⁻+K(z−Hx̂⁻),修正均值與共變。線性高斯下是**最優**估計;非線性用 EKF(線性化)/UKF(sigma 點)。

### 粒子濾波(非線性/非高斯)
用一群加權樣本(粒子)近似信念:**預測**(各粒子依轉移取樣)→**更新**(按觀測概似重新加權)→**重取樣**(複製高權、淘汰低權,避退化)。通用但高維退化,是 [[randomized-algorithms]] 蒙地卡羅在時序的應用。

### Viterbi worked(2 隱態)
天氣{晴,雨} 隱藏,觀測{傘,無傘}。給轉移+發射,Viterbi 逐時刻維護「到此狀態的最可能路徑機率 + 來源」,終點回溯得最可能天氣序。與 [[dynamic-programming]] 的最長路同構:max 而非 sum。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| 濾波=平滑 | 濾波只用過去;平滑用未來觀測修正過去(更準) |
| Viterbi=前向演算法 | Viterbi 用 **max**(求序列);前向用 **sum**(求機率) |
| 卡爾曼適用任意模型 | 僅**線性高斯**最優;非線性用 EKF/UKF/粒子 |
| HMM 狀態=觀測 | 狀態**隱藏**,只能經觀測間接推 |

## 我的想法 / 啟發

- **這章把 [[ai-probabilistic-reasoning]] 展開到時間軸**:靜態貝氏網 → 動態 DBN;HMM/卡爾曼是語音、追蹤、定位、金融的底層。資格考要分清四任務 + Viterbi 是 DP。
- **Viterbi=DP、前向=sum-product**:同一遞迴骨架換半環(max-plus vs sum-product),呼應 [[dynamic-programming]] 的統一視角。
- **粒子濾波=時序版蒙地卡羅**:接 [[randomized-algorithms]];當精確推論不可行時的通用近似。

## Next action / 下一步

1. 補前向-後向完整推導 + Baum-Welch(HMM 參數學習,EM 特例,見 [[ai-learning-probabilistic]])。
2. 補 EKF/UKF 線性化細節 + 粒子退化/重取樣策略。

## 交叉引用 / 出處
- raw:`wiki/raw/aic14-hmm-wikipedia.md`、`aic14-kalman-wikipedia.md`、`aic14-dbn-wikipedia.md`
- [[ai-probabilistic-reasoning]] — DBN=貝氏網時序展開;[[dynamic-programming]] — Viterbi/前向=DP;[[randomized-algorithms]] — 粒子濾波
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.14)
