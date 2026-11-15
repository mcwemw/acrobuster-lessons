---
id: "09"
slug: llm-control-surface
tag: 模型原理
title: 同一個機制，不同旋鈕：你真正能調的 LLM 行為
title_en: "One Mechanism, Different Knobs: What You Can Actually Tune in LLM Behavior"
title_short: 同一個機制，不同旋鈕：context、system prompt、長對話漂移
summary: CoT、few-shot 不是各自的特異功能，是同一個「次字預測」機制的展現；工程師真正能動的旋鈕是 context、message 結構、system prompt——但設定了不等於照辦。
summary_en: CoT and few-shot aren't separate tricks — they're manifestations of one next-token mechanism; the knobs an engineer actually turns are context, message structure, and the system prompt — but setting them isn't the same as being obeyed.
links: []
---
## 是什麼 · What it is

接著 [[05-how-llms-work|LLM 怎麼運作]]：模型所有行為都長在**同一個機制**——次字預測——之上。chain-of-thought、給範例之所以有效，不是「各自的特異功能」，而是這一個機制在不同輸入下的展現。

既然機制固定，工程師能動的其實是**輸入這端的幾個旋鈕**：

      <p>
        <strong>① Context window 設計</strong>：放什麼進去、放多少、擺哪裡。<br>
        <strong>② Message 結構</strong>：system / user / assistant 怎麼分、對話怎麼組。<br>
        <strong>③ System prompt 用字</strong>：同一個意思，措辭不同，可靠度就不同。
      </p>

這三個旋鈕怎麼轉，直接決定「同一顆模型」表現得多穩、多可預測。

::: en
Following [[05-how-llms-work|how LLMs work]]: every behavior grows on **one mechanism** — next-token prediction. Chain-of-thought and giving examples work not as "separate tricks" but as that single mechanism manifesting under different inputs. Since the mechanism is fixed, what an engineer actually turns are a few **input-side knobs**: **① context-window design** (what goes in, how much, where), **② message structure** (how system/user/assistant are split and the conversation is assembled), and **③ system-prompt wording** (same intent, different phrasing, different reliability). How you turn these three decides how stable and predictable "the same model" behaves.
:::

## 為什麼重要 · Why it matters

三個最該親手量一次的現象，都在同一個主題上：**你以為「設定了就會照辦」，實際未必。**

      <p>
        <strong>① Tokenization 成本</strong>：文字不是一字一單位，是先切成 token；長度、價格、context 上限全按 token 算，而中文、程式碼、罕見詞往往比你想的更「貴」。<br>
        <strong>② System prompt 遵從度</strong>：system prompt 不是硬約束，它只是<strong>另一段會被機率權衡的文字</strong>；模型「通常」聽、但不保證，措辭與擺位會改變它聽不聽。<br>
        <strong>③ 長對話漂移</strong>：對話一長，早期的指令被稀釋、被後文蓋過，行為會慢慢偏離你最初設定。
      </p>

這三個正是 [[03-intent-output-gap|意圖↔輸出落差]]在系統層的版本：你的設定是「意圖」，模型的實際行為才是「輸出」，中間一樣有縫。所以工程做法不是「設好 system prompt 就信它」，而是**設定 → 量它真的怎麼動 → 對不上就調**——也就是 [[06-ai-loop-discipline|先立標準、對輸出驗]]那一套，落到 context 設計上。

::: src
出處 Source：CSIC30216《AI-in-the-Loop》Week 2 "How LLMs actually work" 學習目標（next-token 為單一機制、context／message／system prompt 塑造可靠度、tokenization cost／system prompt compliance／long-conversation drift 三實驗；Dennis Wang 王邦任、顏羽君 Grace Yen）＋ 既有 LLM 服務常識，作者改寫重述，未複製課程投影片。「設定≠照辦、是系統層的意圖↔輸出落差」為作者綜述觀點（Author's view），與本站 [[03-intent-output-gap|03]]／[[06-ai-loop-discipline|06]] 一致。
:::

## 一句話帶走 · Takeaway

模型行為長在「次字預測」一個機制上；你能調的是 context／message／system prompt，但 system prompt 不是鐵律、token 要花錢、長對話會漂——設定完還是要量、要驗。

::: en
Behavior grows on one mechanism — next-token prediction; your knobs are context, message structure, and the system prompt, but the system prompt isn't law, tokens cost money, and long chats drift — after setting them, still measure and verify.
:::
