---
question: 約束滿足問題(CSP)怎麼形式化?回溯搜尋靠哪些啟發式加速?弧相容(AC-3)在做什麼、複雜度多少?
keywords: [constraint-satisfaction, arc-consistency, backtracking-search]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Constraint satisfaction problem [[raw:ai-csp-wikipedia]](CC BY-SA 4.0)、AC-3 algorithm [[raw:ai-ac3-wikipedia]](CC BY-SA 4.0)、Local consistency [[raw:ai-localconsistency-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.6(Constraint Satisfaction Problems)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 約束滿足問題 CSP（AIMA Ch.6）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
> 一句話:把問題化成**(變數 X、值域 D、約束 C)三元組**,求一組完整且不違反任何約束的賦值;用**回溯搜尋 + 約束傳播(弧相容)+ 排序啟發式**比盲搜快很多。(ai-csp-wikipedia)

## 1. 形式化

- CSP = ⟨**X** 變數集,**D** 各變數值域,**C** 約束集⟩。賦值**一致**=不違反任何約束;**完整**=所有變數都賦值;**解**=一致且完整。(ai-csp-wikipedia)
- 例:地圖著色、N 皇后、排課、數獨。約束圖:節點=變數,邊=約束(二元約束)。
- CSP 的好處:結構顯式 → 可用通用方法(傳播/啟發式)而非每題寫搜尋。

## 2. 回溯搜尋 + 啟發式

- **回溯(backtracking)**:逐變數賦值,違反約束就回退。配下列啟發式:
  - **MRV(最少剩餘值)**:先選剩合法值最少的變數(最易失敗先做,早剪枝)。
  - **度啟發式(degree)**:平手時選約束最多的變數。
  - **LCV(最少約束值)**:選對鄰居限制最少的值(保留彈性)。
- **前向檢查(forward checking)**:賦值後刪掉鄰居值域中不相容的值;值域空 → 立刻回溯。

## 3. 約束傳播:弧相容與 AC-3

- **弧相容(arc consistency)**:對弧 (X→Y),X 的每個值都在 Y 中找得到相容值,否則刪除。(ai-localconsistency-wikipedia)
- **AC-3**:維護待檢弧佇列,逐弧修剪值域;某值域被改就把指向它的弧重新入列,直到穩定。(ai-ac3-wikipedia)
- **複雜度**:AC-3 最壞 **O(e·d³)**(e 約束數、d 值域大小);AC-4 可到 O(e·d²) 但常數大。弧相容是**必要非充分**:過了不保證有解,仍需搜尋。

## 4. 深化:AC-3 trace + MRV worked + 複雜度

### 4.1 AC-3 弧相容 trace
變數 X,Y,值域 X∈{1,2,3},Y∈{1,2,3},約束 X<Y。
- 弧 (X→Y):X=3 在 Y 找不到 >3 的值 → **刪 X=3** → X∈{1,2}。
- 弧 (Y→X):Y=1 找不到 <1 的 X → **刪 Y=1** → Y∈{2,3}。
佇列再檢受影響弧,穩定後 X∈{1,2},Y∈{2,3}。弧相容**不保證有解**(此處仍需搜尋確認),但大幅剪枝。

### 4.2 MRV + 度啟發式 worked(地圖著色)
3 色,變數 WA,NT,SA,Q…。SA 與最多州相鄰(度最高)。開局平手時**度啟發式**選 SA 先賦值 → 立刻約束所有鄰州,剪枝最多。賦值後 **MRV** 選剩合法色最少的變數(最接近失敗→早回溯)。LCV 選對鄰居排除最少的色(留彈性)。

### 4.3 複雜度
AC-3 最壞 **O(e·d³)**:e 條弧、每弧值域 d,每次刪值可能重入該弧 d 次、每次檢查 O(d)。回溯搜尋最壞指數 O(dⁿ),但 MRV+前向檢查+MAC 實務大幅剪。

### 4.4 陷阱
| 陷阱 | 正解 |
|---|---|
| 弧相容=有解 | **必要非充分**;過了仍需搜尋 |
| AC-3 是 O(ed²) | 標準界 **O(ed³)**(AC-4 可 O(ed²) 但常數大) |
| forward checking=MAC | FC 只做單層弧相容;MAC 每步跑完整 AC-3(剪更兇但更貴) |
| MRV 選剩值最多 | 選剩值**最少**(最易失敗→早剪) |

## 5. 延伸:一致性層級 + 結構分解 + 區域搜尋

### 5.1 一致性層級
- **節點一致**(1-consistency):一元約束過濾值域。
- **弧一致**(2,AC-3):每弧每值有相容對。
- **路徑一致**(3)/ **k-一致**:任 k−1 變數的相容賦值可延伸到第 k 個。
更高一致性剪更多但更貴;實務 AC + 搜尋最平衡。**強 k-一致**可無回溯求解。

### 5.2 結構分解(利用約束圖拓撲)
- **樹狀 CSP**:約束圖是樹 → **O(nd²)** 多項式解(拓樸排序 + 有向弧一致,無需回溯)。
- **樹寬(treewidth)**:約束圖樹寬 w → O(n·d^{w+1}) 解;cutset conditioning / tree decomposition 把一般圖轉近樹。小樹寬=易解。

### 5.3 區域搜尋解 CSP
**min-conflicts**:從完整(可能違反)賦值開始,每步挑衝突變數改成「衝突最少」的值。對 n-皇后等**百萬級**極快(近乎常數步),是大規模 CSP 實務利器(對比系統性回溯)。

### 5.4 CSP ↔ SAT ↔ ILP
CSP 可編碼成 SAT([[ai-logic]])丟給 CDCL 求解器,或編成 ILP([[linear-programming]])。現代 CP/SAT 求解器(如 OR-Tools)整合傳播 + 子句學習,是強大的通用組合求解器。

## 我的想法 / 啟發

- **CSP 是「結構換效率」的典範**:把搜尋問題顯式成變數+約束,就能套 MRV/傳播這類通用武器——跟 [[ai-search]] 盲搜相比,CSP 用問題結構大幅剪枝。資格考常考「MRV 為何有效」(答:失敗快=早剪)。
- **AC-3 的 O(ed³) 要記**,且要能說「弧相容是必要非充分、不取代回溯」——常見陷阱題。
- forward checking = 單步弧相容;MAC(維持弧相容)= 每步跑完整 AC-3,剪得更兇但更貴,是搜尋 vs 傳播的權衡。

## Next action / 下一步

1. 補數獨/地圖著色完整 MAC trace + 約束圖可視化。
2. 建邏輯推論(AIMA Ch.7-9),接 CSP 的命題約束到 SAT。

## 交叉引用 / 出處
- raw:`wiki/raw/ai-csp-wikipedia.md`、`ai-ac3-wikipedia.md`、`ai-localconsistency-wikipedia.md`
- [[ai-search]] — 回溯=深度優先搜尋的 CSP 特化;啟發式排序呼應
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.6)
