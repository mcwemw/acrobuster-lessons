---
question: 大狀態空間用區域搜尋(爬山/模擬退火/基因)怎麼找近似最優?非確定/部分可觀測/未知環境的搜尋怎麼處理(AND-OR樹/信念狀態/線上搜尋)?
keywords: [local-search, simulated-annealing-genetic, nondeterministic-online-search]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Local search [[raw:aic4-localsearch-wikipedia]](CC BY-SA 4.0)、Simulated annealing [[raw:aic4-annealing-wikipedia]](CC BY-SA 4.0)、Genetic algorithm [[raw:aic4-genetic-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.4(Search in Complex Environments)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 複雜環境搜尋 Search in Complex Environments（AIMA Ch.4）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
> 一句話:當狀態空間太大或路徑不重要時用**區域搜尋**(只保當前狀態往鄰居走);當環境非確定/部分可觀測/未知時,改用 AND-OR 樹、信念狀態、線上搜尋。(aic4-localsearch-wikipedia)

## 1. 區域搜尋(大狀態 / 最佳化)

不建搜尋樹,只保當前狀態 + 目標函數,往鄰居移動:(aic4-localsearch-wikipedia)
- **爬山法 hill climbing**:走更好的鄰居;卡**區域最優 / 高原 / 山脊**。變體:隨機重啟、first-choice、隨機爬山。
- **記憶少、適合最佳化**(n-皇后、排程、VLSI);不保證全域最優。

## 2. 模擬退火(跳出區域最優)

- 以機率 **exp(ΔE/T)** 接受「較差」的 move,溫度 T 隨時間降低 → 高溫多亂走探索、低溫趨於爬山。(aic4-annealing-wikipedia)
- 理論:降溫夠慢時以機率 1 收斂到全域最優(實務用啟發式降溫表)。靈感來自冶金退火。

## 3. 基因演算法 / 束搜尋

- **基因演算法**:一群候選(染色體),用**選擇(適應度)+交配(crossover)+突變**演化下一代。(aic4-genetic-wikipedia)
- **局部束搜尋(local beam)**:保留 k 個狀態,每輪取所有後繼中最好的 k 個(隨機束避免集中)。
- 皆是「平行多點 + 隨機」逃區域最優的最佳化法。

## 4. 非確定 / 部分可觀測 / 未知環境

- **非確定動作**:結果不唯一 → 解是**條件計畫(contingency plan)**,用 **AND-OR 搜尋樹**(OR=代理選動作,AND=環境選結果,都要能應付)。
- **部分可觀測**:維護**信念狀態(belief state)**=可能物理狀態的集合,在信念空間搜尋(無觀測=sensorless/conformant)。
- **未知環境(線上搜尋)**:邊走邊探索(無法先規劃全圖),如 LRTA*(即時學習 A*);競爭比衡量好壞([[parallel-and-online]])。

## 深化:爬山變體 + 退火參數 + AND-OR

### 爬山法的三種卡點
- **區域最優**:鄰居都不更好但非全域最優。
- **高原/肩**:鄰居等值(平原走不出方向)。
- **山脊**:需「先下再上」但單步皆下坡 → 卡住。
解法:隨機重啟(多次爬,取最佳)、容許橫向移動、模擬退火。

### 模擬退火的接受準則
ΔE>0(更好)必接受;ΔE<0 以 exp(ΔE/T) 機率接受。T 大 → 幾乎都接受(隨機漫步);T→0 → 只接受更好(純爬山)。降溫表(cooling schedule)決定品質。

### AND-OR 樹解非確定
OR 節點:代理挑一個動作(找到一個可行即可)。AND 節點:環境可能給任一結果,**全部**都要有後續計畫。解=子樹,執行時依實際觀測選分支(條件計畫,含迴圈處理「再試」)。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| 爬山法找全域最優 | 只找**區域**最優;需重啟/退火 |
| 模擬退火一定全域最優 | 僅「降溫夠慢」理論保證;實務近似 |
| 部分可觀測在物理狀態搜尋 | 在**信念狀態**(狀態集合)搜尋 |
| 非確定環境解是一條路徑 | 是**條件計畫**(依觀測分支) |

## 我的想法 / 啟發

- **這章補足 [[ai-search]] 的另一半**:Ch.3 系統性搜尋(保證最優、小狀態);Ch.4 區域搜尋(大狀態、近似、逃區域最優)。資格考判題:狀態空間大小 + 要不要路徑 → 決定用哪類。
- **模擬退火/基因=隨機化最佳化**,與 [[randomized-algorithms]] 同源(用隨機逃最壞/區域最優)。
- **信念狀態**是通往 [[ai-probabilistic-reasoning]]/POMDP([[ai-decision-making]])的橋:部分可觀測逼你對「狀態集合/分布」推理。

## Next action / 下一步

1. 補 LRTA* 線上搜尋 + conformant/contingent 規劃完整例。
2. 接 [ai-csp](ai-csp.md)（Ch.6）的 min-conflicts(也是區域搜尋)、[[ai-adversarial-search]] MCTS。

## 交叉引用 / 出處
- raw:`wiki/raw/aic4-localsearch-wikipedia.md`、`aic4-annealing-wikipedia.md`、`aic4-genetic-wikipedia.md`
- [[ai-search]] — 系統性搜尋的互補;[[randomized-algorithms]] — 隨機化最佳化;[[ai-decision-making]] — 信念狀態→POMDP
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.4)
