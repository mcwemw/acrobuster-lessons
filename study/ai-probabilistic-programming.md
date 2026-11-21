---
question: 機率編程語言把機率模型寫成程式有何威力?生成模型 vs 判別模型差在哪?MCMC/變分如何對這些程式做推論?
keywords: [probabilistic-programming, generative-vs-discriminative, mcmc-inference]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Probabilistic programming [[raw:aic15-probprog-wikipedia]](CC BY-SA 4.0)、Generative model [[raw:aic15-generative-wikipedia]](CC BY-SA 4.0)、Markov chain Monte Carlo [[raw:aic15-mcmc-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.15(Probabilistic Programming)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 機率編程 Probabilistic Programming（AIMA Ch.15）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:把機率模型寫成**程式**(含隨機抽樣語句),語言的推論引擎自動對「給定觀測求後驗」做推論 → 模型表達力大增,開放宇宙/關係型都能寫。(aic15-probprog-wikipedia)

## 1. 機率編程語言(PPL)

- 程式 = 生成過程:隨機變數用抽樣語句宣告,觀測用 condition/observe 固定,引擎求後驗。(aic15-probprog-wikipedia)
- 威力:**開放宇宙機率模型(OUPM)**——物件數目未知(如「有幾顆星/幾個人」);關係型、遞迴結構(貝氏網難表達的)。
- 例子語言:BUGS、Stan、Church、Pyro、Gen。把「建模」與「推論」解耦:寫模型即可,推論交引擎。

## 2. 生成 vs 判別模型

- **生成模型**:學聯合分布 P(x,y)(或 P(x|y)P(y)),能**生成**資料、處理缺值;如樸素貝氏([[ai-learning-probabilistic]])、HMM([[ai-temporal-models]])、GAN/VAE。(aic15-generative-wikipedia)
- **判別模型**:只學 P(y|x)(決策邊界);如邏輯迴歸、SVM、多數神經分類器。
- 取捨:生成能做更多(抽樣/缺值/異常偵測)但需學更多;判別在純分類常更準。機率編程偏**生成**視角。

## 3. 推論引擎:MCMC / 變分

- **MCMC**:建一條馬可夫鏈,平穩分布=目標後驗,取樣估期望。(aic15-mcmc-wikipedia)
  - **Metropolis-Hastings**:提議新樣本,以 min(1, 後驗比·提議比) 接受。
  - **Gibbs**:逐變數依條件分布重抽(見 [[ai-probabilistic-reasoning]])。
  - **HMC/NUTS**:用梯度提議,高維高效(Stan 用)。
- **變分推論**:把後驗近似成易算分布族,最小化 KL → 轉最佳化(快但有偏)。

## 深化:MCMC 正確性 + worked + 收斂診斷

### MCMC 為何收斂到後驗
鏈需**不可約 + 非週期 + 以目標為平穩分布**(細緻平衡 π(x)T(x→x')=π(x')T(x'→x) 即充分)。Metropolis 的接受率正是為滿足細緻平衡而設計 → 長跑後樣本服從後驗。

### Metropolis worked(接受準則)
目標 π(x)∝未正規化 p(x)。從 x 提議 x'(對稱提議):接受機率 **a=min(1, p(x')/p(x))**。更好(p 大)必接受;較差以比值機率接受(容許下坡→遍歷)。不需知正規化常數 Z —— 這是 MCMC 的關鍵優勢。

### 收斂診斷
燒機期(burn-in)丟棄、自相關/有效樣本數(ESS)、多鏈 R̂(Gelman-Rubin)判混合。MCMC 無限時間保證,有限時間需診斷。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| 判別模型能生成資料 | 只有**生成模型**學 P(x,y) 可生成/補缺值 |
| MCMC 需正規化常數 Z | **不需**(只用比值),這是其威力 |
| MCMC 立即給後驗 | 需燒機 + 診斷收斂;混合差會偏 |
| 變分=精確 | 變分**有偏**(近似族限制);MCMC 漸近無偏但慢 |

## 我的想法 / 啟發

- **機率編程=「模型即程式、推論自動化」**,是 [[ai-probabilistic-reasoning]] 貝氏網的泛化(能寫貝氏網寫不出的開放宇宙/遞迴模型)。它把建模門檻降到「會寫生成過程」。
- **生成 vs 判別**是 ML 核心二分([[ai-machine-learning]]):接我的研究——RAG/檢索常是判別式排序,生成式則能建模不確定、補缺。
- **MCMC 不需 Z** 的洞察極美:繞開最難算的正規化常數,用比值遍歷後驗——隨機化([[randomized-algorithms]])的高階應用。

## Next action / 下一步

1. 補 Gibbs/HMC 完整步驟 + 變分(ELBO)推導;VAE 作為機率編程 × 深度學習接點。
2. 接 [[ai-learning-probabilistic]](Ch.20)的 EM/貝氏學習——機率模型的參數學習。

## 交叉引用 / 出處
- raw:`wiki/raw/aic15-probprog-wikipedia.md`、`aic15-generative-wikipedia.md`、`aic15-mcmc-wikipedia.md`
- [[ai-probabilistic-reasoning]] — 貝氏網的泛化;[[ai-learning-probabilistic]] — 參數學習;[[randomized-algorithms]] — MCMC 取樣
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.15)
