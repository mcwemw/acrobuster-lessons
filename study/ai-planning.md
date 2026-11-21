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
