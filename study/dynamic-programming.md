---
question: 動態規劃是什麼、什麼時候該用？它靠哪兩個前提成立，記憶化與 tabulation 差在哪？
keywords: [dynamic-programming, optimal-substructure, memoization-vs-tabulation]
type: concept
source: 5 篇公開 CC 來源(2026-11-21 ingest)—Wikipedia DP [[raw:dp-wikipedia]](CC BY-SA)、CP-Algorithms Intro-to-DP [[raw:dp-cp-algorithms]](CC BY-SA)、Wikipedia Knapsack [[raw:dp-knapsack-wikipedia]](CC BY-SA)、Jeff Erickson Algorithms ch.3 [[raw:dp-erickson]](CC BY 4.0)、CP-Algorithms 0-1 Knapsack [[raw:dp-knapsack-cp]](CC BY-SA)。
source_authority: 高(五篇皆公開標準教材/教科書,授權 CC,每條主張可回 wiki/raw/)。
---

# 動態規劃 Dynamic Programming（DP）

> 概念頁 · 第十週作業 LLM Wiki 主題;亦為資格考(演算法)教材來源之一。
> 一句話:把一個大問題拆成**重疊的子問題**,每個子問題**只算一次、把答案記下來重用**,靠**最優子結構**把子答案組回原問題的最優解。(dp-wikipedia / dp-erickson)

## 1. 是什麼

DP 是一種**解題範式**(不是單一演算法):當一個問題能表達成「在較小的同型子問題之上做最優選擇」時,直接遞迴會把同一個子問題重算指數多次;DP 的做法是**把每個子問題的解存起來(記憶化)**,使總工作量降到「**相異子問題數 × 每個轉移的成本**」。(dp-wikipedia 概念;dp-erickson「recursion + memory」框架)

歷史名詞:名稱由 Richard Bellman 1950s 提出,"programming" 指的是「用表格做規劃/排程」,非寫程式。(dp-wikipedia)

## 2. 成立的兩個前提(缺一不可)

- **重疊子問題 (overlapping subproblems)**:同一個子問題會被反覆用到 → 記下來才有省。若子問題都互不相同(如 merge sort 的左右半),DP 沒有省的空間,那是分治而非 DP。(dp-wikipedia)
- **最優子結構 (optimal substructure)**:原問題的最優解,可由子問題的最優解組合而得 → 才能「由小解推大解」。(dp-wikipedia / dp-erickson)

> 判斷口訣:**「會重複算」+「大解由小解的最優拼出」** → 兩者同時成立,才是 DP 題。

## 3. 記憶化 vs. 製表(兩種實作,同一遞迴)

同一條遞迴關係,兩種跑法:(dp-cp-algorithms)

- **記憶化 (top-down / memoization)**:照遞迴自然寫,第一次算某子問題就把結果存進表,之後直接查表。好處:只算**真正用到**的狀態、貼近思路;代價:遞迴堆疊 + 查表開銷。
- **製表 (bottom-up / tabulation)**:按子問題的依賴順序,**從最小的往大的迭代填表**,不遞迴。好處:無堆疊、常數小、易做空間壓縮;代價:要想清楚填表順序,可能算到用不到的狀態。

兩者時間複雜度同階;選哪個看「狀態空間是否稠密」與「是否要空間壓縮」。(dp-cp-algorithms)

## 4. 設計一題 DP 的步驟

1. **定狀態**:一個子問題用什麼參數唯一描述?(狀態 = 要記的東西)(dp-erickson)
2. **寫轉移(遞迴式)**:大狀態的最優解 = 哪些小狀態的最優解怎麼組合?(dp-erickson)
3. **定邊界/base case**:最小子問題的答案。
4. **定求值順序**:記憶化(遞迴)或製表(由小到大迭代)。(dp-cp-algorithms)
5. **讀答案 + (選)還原方案**:最終狀態即解;要輸出方案就回溯轉移來源。
6. **複雜度**:≈ **狀態數 × 單次轉移成本**;空間常可只留需要的前幾層。(dp-erickson)

## 5. 經典例子(教學用)

- **費氏數列**:直接遞迴 O(φⁿ) → 記憶化/製表降到 **O(n)**,是「重疊子問題」最乾淨的示範。(dp-erickson)
- **0/1 背包 (Knapsack)**:n 件物品各有重量/價值、容量 W,求不超重的最大價值。狀態 `dp[i][w]` = 前 i 件、容量 w 的最大價值;轉移 = 取或不取第 i 件取 max;複雜度 **O(nW)**(偽多項式)。(dp-knapsack-wikipedia / dp-knapsack-cp)
- **最長遞增子序列 (LIS)**、**編輯距離 (edit distance)**:皆以「前綴/區間」為狀態的經典 DP。(dp-erickson)

## 6. 什麼時候**不**用 DP

- 子問題**不重疊** → 分治(divide & conquer)。(dp-wikipedia)
- 每步的**局部最優就是全域最優** → 貪婪(greedy)更簡單;DP 是「貪婪不成立時」的保險做法。(dp-erickson 的對比精神)

## 7. 深化:worked trace + 經典遞迴式 + 陷阱

### 7.1 0/1 背包完整填表(W=5,物品 (w,v)=(2,3),(3,4),(4,5),(5,6))
狀態 `dp[i][w]`=前 i 件、容量 w 的最大價值;轉移 `dp[i][w]=max(dp[i-1][w], dp[i-1][w-wᵢ]+vᵢ)`(w≥wᵢ 才可取)。(dp-knapsack-cp)

```
         w=0  1   2   3   4   5
i=0(無)   0   0   0   0   0   0
i=1(2,3)  0   0   3   3   3   3
i=2(3,4)  0   0   3   4   4   7   ← dp[2][5]=max(dp1[5]=3, dp1[2]+4=7)=7
i=3(4,5)  0   0   3   4   5   7
i=4(5,6)  0   0   3   4   5   7   ← dp[4][5]=max(7, dp3[0]+6=6)=7
```
最優值 **7**(取物品 1+2,重 5、值 7)。還原方案:從 dp[4][5] 回溯——值未因第 4 件改變⟹沒取;dp[3][5]=dp[2][5]⟹沒取第 3 件;dp[2][5]≠dp[1][5]⟹取第 2 件,退到 dp[1][2];dp[1][2]≠dp[0][2]⟹取第 1 件。**複雜度 O(nW) 偽多項式**(W 以位元數算是指數,故背包仍 NP-hard,見 [[approximation-algorithms]] FPTAS)。

### 7.2 LIS 兩解
- **O(n²)**:`dp[i]`=以 a[i] 結尾的最長遞增長度=1+max{dp[j]:j<i, a[j]<a[i]}。
- **O(n log n)**:維護 tails[] 陣列(tails[k]=長度 k+1 的遞增子序列最小尾值),每個元素二分搜尋替換——把「結尾」狀態壓成單調陣列。這是「狀態設計換複雜度」的典範。

### 7.3 編輯距離(Levenshtein)
`dp[i][j]`=A 前 i 字轉 B 前 j 字的最少操作;`dp[i][j]=dp[i-1][j-1]`(若 A[i]=B[j])否則 `1+min(dp[i-1][j]刪, dp[i][j-1]插, dp[i-1][j-1]改)`。邊界 dp[i][0]=i、dp[0][j]=j。複雜度 O(mn)。(dp-erickson)

### 7.4 資格考陷阱表
| 陷阱 | 正解 |
|---|---|
| 背包「O(nW) 是多項式」 | 偽多項式——W 的輸入長度是 log W,故對輸入指數 |
| 0/1 背包壓一維時順序 | 容量**由大到小**掃(避免同一件重複取);完全背包才由小到大 |
| 以為有重疊就一定能 DP | 還要**最優子結構**;最長**簡單**路徑無最優子結構(子路徑可能共用節點)→ 非 DP |
| LIS 誤以為 tails 陣列是答案序列 | tails 只給長度;要還原序列需另記前驅 |
| DP vs 貪婪 | 貪婪要能證「交換論證/擬陣」;不確定時 DP 保險(見 [[greedy-algorithms]]) |

## 我的想法 / 啟發(接點)

- **資格考槓桿**:DP 是我 KG 裡**7 年 14 題最持久**的演算法考點 → 這頁不只交作業,是資格考高頻主題的教材底。
- **跟我研究的類比**:DP 的「記憶化」= 把算過的子答案**快取重用**,本質和 RAG/wiki「讀進來就整合、不每次重算」(見 [[deterministic-grounding-gate]] 母檔 wiki/WIKI.md 的『會複利的 artifact』)是同一個美學——**狀態設計好,重算就消失**。
- **教學切入**:對不熟的人,先講「暴力遞迴為什麼慢(重算)」再引出「記下來(記憶化)」,比先丟轉移式好懂——這決定了簡報的敘事順序。

## Next action / 下一步

1. 由本頁產教學 HTML 簡報(敘事:暴力遞迴→為何慢→記憶化→製表→經典例→何時用)。
2. 5 篇 raw 登錄進 nycu-qual-exam `source_registry.json`(subject=Algorithm/DP,layer=public)。
3. 日後補 LIS/編輯距離的獨立例頁 + 複雜度證明(Erickson ch.3 有完整推導,raw 已備)。

## 交叉引用 / 出處
- raw 來源(真相源,可回溯):`wiki/raw/dp-wikipedia.md`、`dp-cp-algorithms.md`、`dp-knapsack-wikipedia.md`、`dp-erickson.md`、`dp-knapsack-cp.md`
- [[deterministic-grounding-gate]] — 「算過就快取、不重算」的同源美學
- 作業底稿與 loop/graph 設計:`deliverables/llm-wiki-hw-w10/README.md`
