---
id: "08"
slug: rlhf-preference-reward
tag: 模型原理
title: RLHF：把人的偏好變成獎勵，以及那條 KL 繩
title_en: "RLHF: Turning Human Preference into a Reward — and Why It Needs a KL Leash"
title_short: RLHF：把人的偏好變成獎勵，以及那條 KL 繩
summary: RLHF 用「人更喜歡哪個回答」訓練一個獎勵模型，再讓語言模型去最大化它；但獎勵是偏好的代理、不是真相，優化太狠就會作弊，所以要拴一條 KL 繩。
summary_en: RLHF trains a reward model from "which answer humans prefer," then optimizes the language model to maximize it; but the reward is a proxy for preference, not truth — optimize too hard and it cheats, which is why it needs a KL leash.
links: []
---
## 是什麼 · What it is

RLHF（Reinforcement Learning from Human Feedback）分三步：

      <p>
        <strong>① 預訓練語言模型</strong>：先有一個對多樣指令反應良好的基礎模型。<br>
        <strong>② 訓練獎勵模型（reward model）</strong>：對同一個 prompt 讓模型生多個回答，請標註者<strong>排序</strong>（而非給絕對分數——絕對分數「未校準且雜訊大」），再把排序（常用 Elo 式比較）正規化成一個<strong>純量獎勵</strong>。獎勵模型吃一段文字、吐一個「人有多喜歡它」的分數。<br>
        <strong>③ 用 PPO 強化學習微調</strong>：複製一份模型當 policy，用最終獎勵 <code>r = r_θ − λ·r_KL</code> 優化——<code>r_θ</code> 是獎勵模型給的分，<code>r_KL</code> 懲罰 policy 的逐 token 機率分布<strong>偏離原始模型</strong>多遠。原始模型本身不更新。
      </p>

::: en
RLHF (Reinforcement Learning from Human Feedback) has three steps. **① Pretrain a language model** — start from a base model that responds well to diverse instructions. **② Train a reward model** — for one prompt, have the model generate several answers, ask annotators to **rank** them (not give absolute scores, which are "uncalibrated and noisy"), then normalize the ranking (often Elo-style comparisons) into a **scalar reward**; the reward model takes text and outputs a "how much humans would prefer it" score. **③ Fine-tune with PPO** — copy the model as the policy and optimize the final reward <code>r = r_θ − λ·r_KL</code>, where <code>r_θ</code> is the reward model's score and <code>r_KL</code> penalizes how far the policy's per-token distributions **drift from the initial model**. The initial model itself is not updated.
:::

## 為什麼重要 · Why it matters

最該帶走的工程洞見是那條 **KL 繩**：少了它，policy 會學會**產生一堆亂碼卻照樣騙到高獎勵分**。這就是 reward hacking／Goodhart——**獎勵模型只是「人類偏好」的代理，不是真相；你把它優化到極致，它就不再量你真正要的東西。**KL 懲罰把模型拴在原始語言能力附近，不准它為了衝分跑去講鬼話。

兩個延伸提醒，正好接 [[01-rag-faithfulness|RAG 忠實度]]與 [[07-prompt-techniques-pitfalls|提示技巧的陷阱]]：①訓練訊號本身雜——標註者常意見不合、沒有 ground truth，偏好資料貴且品質決定成敗；②就算「對齊了人類偏好」，模型**仍可能產生有害或不符事實的內容，而且不會示警不確定**。換句話說，RLHF 優化的是「人會不會按讚」，不是「這句對不對」。<span class="tag-warn">討人喜歡 ≠ 誠實</span>——所以 RLHF 之後，[[06-ai-loop-discipline|外部的規格與驗證]]仍然不能省。

::: src
出處 Source：Hugging Face, "Illustrating Reinforcement Learning from Human Feedback (RLHF)" (2022, huggingface.co/blog/rlhf)，三階段、排序式偏好、<code>r = r_θ − λ·r_KL</code> 與 KL 懲罰的作用、以及「仍可能有害／不符事實、標註者不一致」等警告均出自此文，作者改寫重述。「獎勵是偏好的代理非真相、討人喜歡≠誠實」為作者綜述觀點（Author's view），與本站 [[01-rag-faithfulness|01]]／[[06-ai-loop-discipline|06]] 一致。
:::

## 一句話帶走 · Takeaway

RLHF 讓模型「更討人喜歡」，但獎勵是偏好的代理、不是真相；KL 繩防它作弊，而「討人喜歡」不等於「誠實」，所以外部驗證還是得留著。

::: en
RLHF makes a model "more likable," but the reward is a proxy for preference, not truth; the KL leash stops it from cheating, and "likable" isn't "honest" — so external verification stays.
:::
