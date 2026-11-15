---
id: "20"
slug: slopsquatting-supply-chain
tag: 軟體工程
title: Slopsquatting：機器幻覺變成供應鏈攻擊面——為什麼它比打錯字更難防
title_en: "Slopsquatting: When Machine Hallucination Becomes a Supply-Chain Attack Surface — and Why It's Harder to Catch Than a Typo"
title_short: Slopsquatting：機器幻覺變成供應鏈攻擊面
summary: Typosquatting 賭你手滑（把 lodash 打成 lodahs）；slopsquatting 賭 AI 嘴瓢——套件名是 AI 從零捏造、從來不存在的。關鍵在：AI 的幻覺不是隨機雜訊，**同樣的假名會跨次重複出現**，所以攻擊者能預先把那些名字搶注、埋好惡意程式。這張卡講它的攻擊面、為什麼傳統拼字過濾擋不住，以及三層防線。
summary_en: "Typosquatting bets on your slip (typing lodahs for lodash); slopsquatting bets on the AI's slip — a package name the AI fabricated from scratch that never existed. The crux: AI hallucinations aren't random noise — the same fake names recur across runs — so attackers can pre-register those names with malware waiting. This card covers the attack surface, why traditional spell-check filters miss it, and a three-layer defense."
links: []
---
## 是什麼 · What it is

**Slopsquatting vs Typosquatting——人為錯誤 vs 機器錯誤：**

      <ul>
        <li><strong>Typosquatting（賭人手滑）</strong>：攻擊者註冊一個「真實套件的常見錯拼」（例如 <code>lodahs</code> 之於 <code>lodash</code>）。它寄生在一個<em>真的存在</em>的名字上。</li>
        <li><strong>Slopsquatting（賭 AI 嘴瓢）</strong>：套件名<strong>從來不存在</strong>，是 AI 從零幻覺出來的。正因為它<em>不是</em>任何正版函式庫的錯拼，傳統的「名稱相似度／拼字檢查」過濾器往往抓不到——編輯距離比對需要一個「正確答案」來比，而這個假名沒有正確答案可比。</li>
      </ul>

**這個詞怎麼來的：**2025 年 4 月由資安研究者 **Seth Larson**（Python Software Foundation 的 Developer-in-Residence）提出，並經 **Andrew Nesbitt** 在 Mastodon 上推廣。它把「AI slop（AI 生成的爛內容）」與「typosquatting」合成——本質上是 cybersquatting 的一個新變種。

**規模（Spracklen et al., arXiv:2406.10279, USENIX Security 2025）：**

| 指標 | 數字 |
|---|---|
| LLM 推薦的套件中「根本不存在」的比例 | 平均 **19.7%** |
| 開源模型的幻覺率（平均） | **21.7%** |
| 商業／專有模型的幻覺率（平均） | **5.2%** |
| 最嚴重者（CodeLlama 7B / 34B） | 逾 **1/3** 的輸出含幻覺套件 |
| 觀察到的唯一捏造套件名總數 | 逾 **205,000** 個 |

最致命的一項不是比例，是**一致性**：相當比例的幻覺套件名會跨模型輸出*反覆出現*。隨機的幻覺無法被利用；**可預測**的幻覺才能——攻擊者只要先跑模型、蒐集常被幻覺的名字，就能預先搶注。

::: en
Typosquatting preys on human error — registering a common misspelling of a real package (<code>lodahs</code> for <code>lodash</code>), parasitic on a name that *does* exist. Slopsquatting preys on machine error — the package name **never existed**; the AI fabricated it. Because it is not a misspelling of any legitimate library, traditional name-similarity and spell-check filters often miss it: edit-distance matching needs a "correct" name to compare against, and a fabricated name has none. The term was coined in April 2025 by security researcher **Seth Larson** (Python Software Foundation Developer-in-Residence) and popularized by **Andrew Nesbitt** on Mastodon, blending "AI slop" with "typosquatting" — a new variant of cybersquatting. Spracklen et al. (arXiv:2406.10279, USENIX Security 2025) found 19.7% of LLM-recommended packages don't exist, averaging 21.7% for open-source vs 5.2% for proprietary models, with CodeLlama 7B/34B hallucinating in over a third of outputs and 205,000+ unique fabricated names observed. The deadliest property isn't the rate — it's **consistency**: a significant share of fake names recur across runs. Random hallucinations can't be exploited; **predictable** ones can.
:::

## 為什麼重要 · Why it matters

這張卡和 [[18-prompt-failure-diagnosis|卡 18「失效不是隨機的」]]是同一枚硬幣的兩面，而且諷刺：**「幻覺可預測」這個事實，能幫你診斷，也能幫攻擊者下手。**同樣是「不隨機」，在防守方手上是可修的工程問題，在攻擊方手上就是可搶注的攻擊面。所以光知道「AI 會幻覺」不夠，要有防線。

三層防禦（防禦要疊起來，不是單點）：

      <ol>
        <li><strong>人工確認存在性</strong>：跑任何 install 指令前，先去官方 registry（npmjs.com／pypi.org）確認 AI 推薦的套件<em>真的存在</em>、且作者／下載量／發布歷史看起來正常。這是最便宜也最有效的一步。</li>
        <li><strong>Human-in-the-loop 審批</strong>：把 AI 編碼 agent／IDE 設定成「自動執行依賴安裝腳本前必須人工明確核可」。這正是 <a href="04-agentic-three-responsibilities.html">卡 04「收回控制」</a>的具體落地——別讓 agent 無人攔截地跑 <code>npm install</code>。</li>
        <li><strong>依賴掃描與鎖定</strong>：用 SCA（software composition analysis）工具、lock files、供應鏈安全平台（如 Snyk、Socket）標記未知／未驗證／可疑的安裝腳本。機器防線補人會漏看的部分。</li>
      </ol>

把三層接回本站的一貫主張（作者觀點 Author's view）：這是 [[01-rag-faithfulness|卡 01「要驗不要信」]]在供應鏈層的版本——AI 推薦一個套件，就跟 AI 給你一句「有附來源」的答案一樣，**推薦 ≠ 存在，附名 ≠ 可信**；你要獨立去 registry 驗，就像你要獨立去驗來源是否真的支持那句話。

::: src
出處 Source：① Spracklen et al., "We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs"，arXiv:2406.10279（USENIX Security 2025）——19.7% 推薦套件不存在、開源 21.7%／專有 5.2% 平均幻覺率、CodeLlama 7B/34B 逾 1/3、205,000+ 唯一捏造名、相當比例跨輸出重複。② "Slopsquatting"，Wikipedia（en.wikipedia.org/wiki/Slopsquatting）——2025 年 4 月由 Seth Larson（PSF Developer-in-Residence）提出、Andrew Nesbitt 於 Mastodon 推廣、「AI slop」+「typosquatting」合成、屬 cybersquatting。③ 防禦措施（人工確認存在性、human-in-the-loop 安裝審批、SCA／lock file／Snyk‧Socket）為標準軟體供應鏈安全實務。作者改寫重述，未複製原文。「人為錯誤 vs 機器錯誤的對比」「可預測的幻覺＝可利用的攻擊面」「三層防線＝卡 01『要驗不要信』的供應鏈版」為作者綜述觀點（Author's view），與本站 [[01-rag-faithfulness|01]]／[[04-agentic-three-responsibilities|04]]／[[06-ai-loop-discipline|06]]／[[18-prompt-failure-diagnosis|18]] 一致。
:::

## 一句話帶走 · Takeaway

Typosquatting 賭你手滑，slopsquatting 賭 AI 嘴瓢——而 AI 會**重複**嘴瓢同樣的名字，所以攻擊者能預先埋好。裝任何 AI 推薦的套件前，先去官方 registry 確認它真的存在；別讓 agent 無人核可地自動安裝。推薦 ≠ 存在。

::: en
Typosquatting bets on your slip; slopsquatting bets on the AI's slip — and the AI **repeats** the same fabricated names, so attackers can pre-plant them. Before installing any AI-recommended package, verify it actually exists on the official registry; never let an agent auto-install without approval. Recommended isn't the same as real.
:::
