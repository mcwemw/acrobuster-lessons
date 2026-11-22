---
question: NLP 的核心任務有哪些?n-gram 語言模型怎麼算、有何限制?上下文無關文法(CFG)如何剖析句子、CYK 為何是 DP?
keywords: [natural-language-processing, n-gram-language-model, cfg-parsing]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Natural language processing [[raw:aic23-nlp-wikipedia]](CC BY-SA 4.0)、N-gram [[raw:aic23-ngram-wikipedia]](CC BY-SA 4.0)、Context-free grammar [[raw:aic23-cfg-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.23(Natural Language Processing)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 自然語言處理 NLP（AIMA Ch.23）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:讓機器處理人類語言——從統計語言模型(n-gram)與文法剖析(CFG)等經典方法,到序列標註與語意分析;難在**歧義**與**組合性**。(aic23-nlp-wikipedia)

## 1. 核心任務

- 分詞/斷詞、詞性標註(POS)、句法剖析(parsing)、命名實體識別(NER)、指代消解、語意角色、情感分析、機器翻譯、問答、摘要。(aic23-nlp-wikipedia)
- 共同挑戰:**歧義**(詞義/句法/指代)、**組合性**(無限句子由有限規則生成)、長距依賴、世界知識。

## 2. n-gram 語言模型

- 語言模型估 P(句子)=∏P(wᵢ|前文);n-gram 用**馬可夫假設**只看前 n−1 詞:P(wᵢ|wᵢ₋ₙ₊₁:ᵢ₋₁)。(aic23-ngram-wikipedia)
- 估計=數頻率([[ai-learning-probabilistic]] MLE);**稀疏問題**:沒見過的 n-gram 機率 0 → **平滑**(Laplace、Kneser-Ney)、**回退(backoff)/插值**。
- 限制:只看局部窗、無法長距依賴 → 被神經語言模型([[ai-nlp-deep]])取代。

## 3. 文法與剖析(CFG)

- **上下文無關文法(CFG)**:規則 A→β(非終端展開),生成語言的樹狀結構。(aic23-cfg-wikipedia)
- **剖析**:找句子的推導樹;歧義句有多棵樹。
- **CYK 演算法**:CNF 文法下,`dp[i][j][A]`=子串 i..j 能否由 A 生成,按**子串長度由小到大**填 → O(n³|G|),是標準 [[dynamic-programming]]。
- **PCFG**(機率 CFG):每規則帶機率,選最可能剖析樹(Viterbi 式 DP,接 [[ai-temporal-models]])。

## 深化:平滑 worked + CYK trace + 評估

### n-gram 平滑 worked
Laplace(加一):P(wᵢ|wᵢ₋₁)=(count(wᵢ₋₁wᵢ)+1)/(count(wᵢ₋₁)+V)。未見組合不再是 0。缺點:把太多機率勻給未見 → Kneser-Ney 更精(按「出現於多少不同前文」估續接機率)。

### CYK trace(概念)
句 "she eats fish",文法 S→NP VP, VP→V NP, NP→she|fish, V→eats。
- 長度1:dp[she]=NP, dp[eats]=V, dp[fish]=NP。
- 長度2:eats fish → V NP = VP。
- 長度3:she + (eats fish) → NP VP = S ✓。
自底向上合併相鄰區間,O(n³)。

### NLP 評估
困惑度(perplexity,語言模型)、BLEU/ROUGE(翻譯/摘要)、F1(標註/抽取)、準確率。評估指標選擇本身是研究議題。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| n-gram 能抓長距依賴 | 只看前 n−1 詞;長距要 RNN/Transformer |
| CFG 無歧義 | 自然語言句常**多棵剖析樹**;PCFG 選最可能 |
| CYK 任意文法 | 需 **CNF**(喬姆斯基正規式);一般文法先轉換 |
| 平滑可省 | 不平滑→未見 n-gram 機率 0→整句機率 0 |

## 我的想法 / 啟發

- **經典 NLP = 統計(n-gram)+ 符號(CFG)兩支**,都被神經方法([[ai-nlp-deep]])整合,但概念底仍重要:n-gram 的馬可夫假設、CFG 的組合性是理解 LLM 的前提。
- **CYK/PCFG 又是 DP**([[dynamic-programming]]):和 Viterbi([[ai-temporal-models]])同骨架——語言的結構推論本質是「區間/序列上的最優子結構」。
- **歧義是 NLP 的核心難題**:接我做的評測/faithfulness 研究——語言的多義性正是檢索/生成忠實度難保的根源。

## Next action / 下一步

1. 補依存剖析 + CRF 序列標註 + perplexity 推導。
2. 接 [ai-nlp-deep](ai-nlp-deep.md)（Ch.24）——詞向量/Transformer/LLM 如何超越 n-gram+CFG。

## 交叉引用 / 出處
- raw:`wiki/raw/aic23-nlp-wikipedia.md`、`aic23-ngram-wikipedia.md`、`aic23-cfg-wikipedia.md`
- [[ai-nlp-deep]] — 神經 NLP 超越經典;[[dynamic-programming]] — CYK/Viterbi;[[ai-learning-probabilistic]] — n-gram=MLE+平滑
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.23)
