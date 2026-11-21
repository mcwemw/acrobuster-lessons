---
question: 知識表示要表達什麼(類別/事件/時間/信念)?本體論與語意網路怎麼組織知識?繼承與預設推理怎麼運作、有何取捨?
keywords: [knowledge-representation, ontology-taxonomy, semantic-network-inheritance]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Knowledge representation and reasoning [[raw:aic10-krr-wikipedia]](CC BY-SA 4.0)、Ontology(information science) [[raw:aic10-ontology-wikipedia]](CC BY-SA 4.0)、Semantic network [[raw:aic10-semnet-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.10(Knowledge Representation)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 知識表示 Knowledge Representation（AIMA Ch.10）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★。
> 一句話:用形式語言([[ai-logic]] FOL 為底)把世界的**類別、物件、事件、時間、信念**組織成可推理的知識庫;本體論定架構、語意網路/框架給實作。(aic10-krr-wikipedia)

## 1. 要表達什麼(通用本體)

AIMA 10 章的通用本體要件:(aic10-krr-wikipedia)
- **類別與物件**:category/成員關係、子類(taxonomy 分類階層)、繼承。
- **組成(composition)**:part-of 關係(車→輪子)。
- **度量/物質**:可數 vs 物質(water 不可數)。
- **事件與時間**:事件演算(event calculus)、時間區間(Allen 關係:before/overlaps…)。
- **心智物件與信念**:代理相信/知道什麼(命題態度)。

## 2. 本體論(ontology)

- **本體 = 概念 + 關係 + 公理**的形式規格,定義某領域「有什麼、如何關聯」。(aic10-ontology-wikipedia)
- **上層本體(upper ontology)**:跨領域通用骨架(Thing→抽象/物理…);領域本體接在其下。
- 標準:OWL/RDF(語意網)、描述邏輯(DL)當底(平衡表達力與可判定性,見 [[ai-logic]] 延伸)。

## 3. 語意網路與框架

- **語意網路**:節點=概念、邊=關係(is-a、part-of),圖形化知識 + 繼承推理。(aic10-semnet-wikipedia)
- **框架(frames)**:物件 + 槽(slot)+ 值,物件導向式知識;繼承預設值。
- 兩者等價於 FOL 子集,換「圖/結構」介面讓繼承推理高效。

## 4. 繼承與預設推理

- **繼承**:子類自動獲得父類屬性(鳥→會飛),沿 is-a 鏈傳遞。
- **預設推理(default)**:「鳥通常會飛」但企鵝例外 → **非單調**(新資訊推翻舊結論,見 [[ai-logic]])。
- **多重繼承衝突**:不同父類給矛盾屬性 → 需優先序(最特定優先)。

## 深化:事件演算 + 封閉世界 + 描述邏輯

### 框架問題與事件演算
表達「動作後什麼變、什麼不變」:**框架問題**——不想對每個動作列出所有不變的事實([[ai-planning]] STRIPS 用 add/delete 隱式解)。事件演算/情境演算(situation calculus)用邏輯描述動作效果與持續性(persistence)。

### 封閉世界 vs 開放世界假設
- **封閉世界(CWA)**:資料庫未列為真者即假(Prolog、SQL)→ 便利但要求完整知識。
- **開放世界(OWA)**:未知即未知(語意網/OWL)→ 適合不完整知識。
選哪個是知識系統的根本設計決定。

### 描述邏輯(DL)的取捨
DL = FOL 的可判定片段:TBox(概念公理)+ ABox(個體斷言)。表達力越強越難判定 → DL 在「夠表達 + 推理可終止」間取平衡,是 OWL 的理論底。

### 陷阱
| 陷阱 | 正解 |
|---|---|
| 繼承=單調邏輯 | 預設繼承是**非單調**(例外可推翻) |
| 語意網路比 FOL 強 | 多是 FOL **子集**,換結構介面 |
| 本體=資料庫 schema | 本體含**公理與推理語意**,不只結構 |
| CWA 到處適用 | 不完整知識用 OWA;別把「沒說」當「為假」 |

## 我的想法 / 啟發

- **KR 是 [[ai-logic]] 的「工程化」**:邏輯給語法語意,KR 給「怎麼組織海量常識」的架構(本體/繼承/事件)。資格考偏概念,要能說本體/語意網/框架與 FOL 的關係。
- **非單調 + 預設推理**是常識 AI 的難點,也是符號 AI 的罩門(現實充滿例外)——這正是統計/神經方法([[ai-machine-learning]])補位之處。
- **本體工程**接我的 RAG/知識庫工作:graphify 的知識圖、wiki 的交叉引用,本質都是輕量本體(概念+關係)。

## Next action / 下一步

1. 補事件演算/情境演算完整公理 + Allen 時間區間 13 關係。
2. 接 [[ai-logic]](Ch.7-9 推理)與 [[ai-planning]](Ch.11,KR 用於動作表示)。

## 交叉引用 / 出處
- raw:`wiki/raw/aic10-krr-wikipedia.md`、`aic10-ontology-wikipedia.md`、`aic10-semnet-wikipedia.md`
- [[ai-logic]] — KR 的邏輯底(FOL/DL/非單調);[[ai-planning]] — 動作的知識表示;[[ai-probabilistic-reasoning]] — 不確定知識
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.10)
