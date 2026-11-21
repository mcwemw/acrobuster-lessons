---
question: 自動規劃跟一般搜尋差在哪?STRIPS 怎麼用前提/新增/刪除表示動作?為何規劃搜尋空間要用啟發式(如 planning graph)?
keywords: [automated-planning, strips-representation, planning-graph]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Automated planning and scheduling [[raw:ai-planning-wikipedia]](CC BY-SA 4.0)、STRIPS [[raw:ai-strips-wikipedia]](CC BY-SA 4.0)、Graphplan [[raw:ai-graphplan-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.11(Automated Planning;3e Ch.10)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 自動規劃 Automated Planning（AIMA Ch.11 4e / Ch.10 3e）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:規劃=找一串動作把初始狀態變到目標;比盲搜強在**用因子化狀態表示(命題/一階)讓啟發式能看穿結構**。(ai-planning-wikipedia)

## 1. 規劃 vs 一般搜尋

- 一般搜尋把狀態當黑箱;規劃用**因子化表示**(狀態=命題集合),動作有結構 → 可自動推導啟發式、偵測獨立子目標。(ai-planning-wikipedia)
- **經典規劃假設**:確定、完全可觀測、靜態、離散、單一代理。放寬任一條 → 條件規劃/重規劃/MDP([[ai-decision-making]])。

## 2. STRIPS 表示

- 動作 = ⟨**前提(precondition)**、**新增表(add list)**、**刪除表(delete list)**⟩。(ai-strips-wikipedia)
- 執行動作:前提須在當前狀態成立 → 刪 delete list、加 add list。
- 例 Move(A,B,C):前提 On(A,B)∧Clear(A)∧Clear(C);add On(A,C)∧Clear(B);delete On(A,B)∧Clear(C)。
- **PDDL** 是 STRIPS 的現代標準化語言。

## 3. 求解方向與 planning graph

- **前向(progression)**:從初始往目標搜;**後向(regression)**:從目標往回。分支大 → 需好啟發式。
- **Planning graph**(Graphplan):交替堆疊「命題層/動作層」,記錄**互斥(mutex)**關係;可抽取 admissible 啟發式(目標在圖中最早出現的層)、或直接抽解。(ai-graphplan-wikipedia)
- 其他:把規劃編譯成 **SAT**([[ai-logic]])丟給 SAT solver(SATPlan)。

## 4. 深化:STRIPS worked + planning graph mutex + 複雜度

### 4.1 STRIPS 積木世界 worked
初始:On(A,Table),On(B,Table),Clear(A),Clear(B)。目標:On(A,B)。
動作 Stack(A,B):**前提** Clear(A)∧Clear(B)∧Holding(A)…(簡化)。
先 Pickup(A):前提 Clear(A)∧OnTable(A)∧ArmEmpty;add Holding(A);del OnTable(A),ArmEmpty。再 Stack(A,B):add On(A,B),Clear(A),ArmEmpty;del Holding(A),Clear(B)。計畫 = [Pickup(A), Stack(A,B)]。

### 4.2 planning graph 與 mutex
交替堆「命題層 Pᵢ / 動作層 Aᵢ」。**互斥(mutex)**關係:
- 動作互斥:一個的效果否定另一個的前提/效果(衝突),或前提互斥。
- 命題互斥:所有產生它們的動作兩兩互斥。
目標命題在圖中**最早同時非互斥出現的層**= admissible 啟發式(level sum/max)。Graphplan 從圖反向抽解。

### 4.3 複雜度
經典規劃(PlanSAT 計畫存在性)一般 **PSPACE-complete**;有界長度計畫 NP-complete。因子化表示讓啟發式能看穿結構,實務靠 planning graph/SATPlan/啟發式搜尋(如 FF)對抗指數。

### 4.4 陷阱
| 陷阱 | 正解 |
|---|---|
| 規劃=一般圖搜尋 | 規劃用**因子化狀態**,可導啟發式/偵測獨立子目標 |
| delete list 可省 | 不可;要記哪些命題被動作**否定**(否則狀態錯) |
| planning graph 直接給解 | 給**啟發式/mutex**;抽解需反向搜尋(Graphplan) |
| 經典規劃假設可放寬無代價 | 放寬確定性→MDP、可觀測→POMDP,複雜度升 |

## 5. 延伸:啟發式規劃 + 偏序 + 時序/階層

### 5.1 啟發式搜尋規劃(現代主流)
在狀態空間用啟發式 A*/貪婪搜尋,啟發式自動從問題導出:
- **delete-relaxation(h⁺)**:忽略 delete list(效果只增不減)→ 鬆弛問題成本是 admissible 下界;FF 啟發式近似它。
- **landmark**:必經的子目標;**pattern database**:子問題最優表。
這類啟發式讓規劃器(FF、LAMA)對抗 PSPACE 難度,是現代規劃主力(勝純 planning graph)。

### 5.2 偏序規劃(POP)
不強制動作全序,只記必要的順序約束(誰前誰後)+ 因果連結 → 更靈活、易平行化、延遲承諾。least-commitment 原則。

### 5.3 時序與數值規劃
- **PDDL 2.1+**:動作有**持續時間**、數值資源(燃料/預算)、並行動作 → 時序規劃(排程+規劃合體)。
- 與 [[linear-programming]]/CP 求解器結合處理資源約束。

### 5.4 階層式規劃(HTN)
高層任務分解成子任務(method),遞迴到基本動作。注入領域知識、規模大時更實用(遊戲 AI、物流)。對比從零搜尋的經典規劃。

## 我的想法 / 啟發

- **規劃=[[ai-search]] + 結構化狀態**:同是找路徑,但因子化表示讓啟發式「看進」狀態內部(哪些子目標已達)——這正是 AIMA「規劃比搜尋聰明」的關鍵,資格考要能說清差別。
- **STRIPS 的 add/delete list 是框架問題的優雅解**:只列改變的命題,沒列的默認不變(frame axiom 隱式化)。
- **planning graph 的 mutex** 把「哪些動作/命題不能同時」顯式化,是 admissible 啟發式來源;跟 [[ai-csp]] 的約束傳播、[[ai-logic]] 的 SAT 編譯都相通——符號 AI 的共同手法=顯式結構換剪枝。

## Next action / 下一步

1. 補 Graphplan mutex 傳播 + 解抽取完整 trace;SATPlan 編碼。
2. 建智能代理架構(AIMA Ch.2)收束 AI 軌全景(感知-決策-行動迴圈)。

## 交叉引用 / 出處
- raw:`wiki/raw/ai-planning-wikipedia.md`、`ai-strips-wikipedia.md`、`ai-graphplan-wikipedia.md`
- [[ai-search]] — 規劃=結構化搜尋;[[ai-logic]] — SATPlan 編譯;[[ai-decision-making]] — 放寬確定性→MDP;[[ai-csp]] — 約束傳播同源
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.10/11 規劃)
