---
question: 無資訊搜尋(BFS/DFS/UCS/IDS)與有資訊(A*)怎麼比完備性/最優性/時空？heuristic 的 admissible 與 consistent 各保證什麼？
keywords: [state-space-search, a-star, admissible-heuristic]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia A* search [[raw:ai-astar-wikipedia]](CC BY-SA 4.0)、Iterative deepening DFS [[raw:ai-ids-wikipedia]](CC BY-SA 4.0)、Admissible heuristic [[raw:ai-heuristic-wikipedia]](CC BY-SA 4.0)。canonical=AIMA Ch.3。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# AI 搜尋 Search（AIMA Ch.3）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI。
> 一句話:把問題表示成**狀態空間**(初始/目標/動作/路徑成本),用搜尋找從初始到目標的路;有無用 heuristic 分「無資訊」與「有資訊」。(ai-astar-wikipedia)

## 1. 四個評估維度
**完備性**(有解必找到)、**最優性**(找到的是最小成本)、**時間**、**空間**。b=分支因子、d=解深度、m=最大深度。

## 2. 無資訊搜尋(uninformed)

- **BFS**:逐層;完備、單位成本下最優;時間/空間 **O(b^d)**(空間是痛點)。(見 [[graph-traversal]])
- **DFS**:走到底;**不最優、不一定完備**(無限深);空間 **O(bm)** 省。
- **UCS 一致成本**:每次展開 **g(n) 最小** 的點 = **[[shortest-path]] 的 Dijkstra**;非負成本下最優。
- **IDS 迭代加深**:對深度上限 0,1,2… 反覆 DFS → **DFS 的空間 O(bd) + BFS 的最優性**,時間仍 O(b^d)。無資訊搜尋的實務首選。(ai-ids-wikipedia)

## 3. 有資訊搜尋(informed,用 heuristic h)

- **貪婪最佳優先 greedy best-first**:只看 **h(n)**(估到目標的成本);快但**不最優、可能繞路**。
- **A\***:用 **f(n)=g(n)+h(n)**(已走 + 估剩)。在適當 heuristic 下**完備且最優**。(ai-astar-wikipedia)

## 4. heuristic 的兩個性質(資格考核心)

- **可容許 admissible**:`h(n) ≤ 真實最短剩餘成本`(**從不高估**)→ **樹搜尋的 A\* 最優**。(ai-heuristic-wikipedia)
- **一致 consistent / monotone**:`h(n) ≤ c(n,n') + h(n')`(三角不等式)→ **圖搜尋的 A\* 最優且不需重展開**。consistent ⇒ admissible。
- h 越接近真實越少展開;h≡0 時 A\* 退化成 UCS。

## 5. 對照表(資格考必背)

- 要最優 + 省空間(無資訊)→ **IDS**;有好 heuristic → **A\***。
- UCS=Dijkstra(無 h);greedy=只有 h;A\*=g+h 兼顧。

## 6. 深化:A* 最優性證明 + heuristic 設計 + 速查

### 6.1 A* 樹搜尋最優性(admissible 下)
反證:設 A* 回傳次優目標 G₂(g(G₂)>C*=最優成本)。最優路徑上必有未展開節點 n(在 frontier)。因 admissible:f(n)=g(n)+h(n) ≤ g(n)+真實剩餘 = C*。而 f(G₂)=g(G₂)>C* ≥ f(n) → A* 應先展開 n 而非 G₂,矛盾。∎ 圖搜尋版需 **consistent**(否則同節點可能以更小 g 再現要重展開)。

### 6.2 consistent ⇒ admissible(但反之不然)
consistent:h(n)≤c(n,n')+h(n')。沿最優路徑歸納:h(n)≤剩餘真實成本 = admissible。反例:admissible 但非 consistent 的 h 存在(某步 h 掉太快),圖搜尋需重展開才保最優。

### 6.3 heuristic 設計法:鬆弛問題(relaxation)
拿掉原問題約束 → 子問題的最優解成本是 admissible h。例 8-puzzle:
- 允許方塊「瞬移」(拿掉相鄰約束)→ h=**錯位方塊數**(misplaced tiles)。
- 允許方塊「疊走」(拿掉佔格約束)→ h=**曼哈頓距離**(更強、更接近真實)。
鬆弛問題的解**必 ≤ 原問題** → 保證 admissible。更強 h(dominates)展開更少。

### 6.4 速查(b 分支/d 深度/m 最大深度)
| 法 | 完備 | 最優 | 時間 | 空間 |
|---|---|---|---|---|
| BFS | ✓ | 單位成本✓ | O(bᵈ) | O(bᵈ) |
| DFS | ✗(無限深) | ✗ | O(bᵐ) | O(bm) |
| UCS=Dijkstra | ✓ | ✓ | O(b^{1+⌊C*/ε⌋}) | 同 |
| IDS | ✓ | 單位成本✓ | O(bᵈ) | **O(bd)** |
| A* | ✓ | admissible✓ | 指數(視 h) | 指數(痛點)→ IDA* 省 |

## 我的想法 / 啟發

- **A\* 把演算法軌的 Dijkstra 接上 AI**:UCS 就是 Dijkstra,A\* = Dijkstra + heuristic 導向 → 兩科在這裡接起來([[shortest-path]])。
- **admissible vs consistent 是最常考的細節**:樹搜尋只要 admissible,圖搜尋要 consistent(否則得重展開)——別混。
- **IDS 的「省空間又最優」**是無資訊搜尋拿分點:解釋為何 DFS 重跑淺層的成本可忽略(總成本仍 O(b^d))。

## Next action / 下一步

1. 建對抗搜尋(AIMA Ch.5):minimax / alpha-beta / expectimax。
2. 補 A\* 最優性證明 + heuristic 的鬆弛問題(relaxation)設計法 + IDA\*。

## 交叉引用 / 出處
- raw:`wiki/raw/ai-astar-wikipedia.md`、`ai-ids-wikipedia.md`、`ai-heuristic-wikipedia.md`
- [[shortest-path]] — UCS=Dijkstra、A\*=Dijkstra+h;[[graph-traversal]] — BFS/DFS 骨架
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.3)
