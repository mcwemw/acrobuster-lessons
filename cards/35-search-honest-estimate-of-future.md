---
id: "35"
slug: search-honest-estimate-of-future
tag: 代理工程
title: 搜尋的差別全在「下一步探哪」——A* 靠一個不騙自己的估計
title_en: "Search Comes Down to 'Which Node Next' — A* Rides an Estimate That Mustn't Lie"
title_short: A* 靠一個不騙自己的估計
summary: BFS、DFS、均勻成本、A* 畫的都是同一張狀態圖，差別只在「下一步探哪個狀態」。A* 把走過的過去 g 和估計的未來 h 加起來；而只要那個估計「永不高估」（admissible），就保證找到最優解——否則你會錯過它。這跟「估計只有在有保證下才可信」是同一條紀律。
summary_en: BFS, DFS, uniform-cost, and A* all walk the same state graph — they differ only in which node to explore next. A* adds the known past g to the estimated future h; and as long as that estimate never overestimates (is admissible), optimality is guaranteed — otherwise you miss the best solution. Same discipline as "an estimate is trustworthy only with a guarantee."
links: []
---
## 是什麼 · What it is

在機器學習成為主流前，<strong>搜尋</strong>（searching）才是 AI 課的第一課——而投影片埋了一句很深的話：<strong>任何迭代式的學習程序（例如梯度下降 gradient descent）本身就是一種搜尋。</strong>搜尋的定義是：一個<strong>代理</strong>（agent，廣義）在<strong>狀態空間</strong>（state space）裡，朝某個目標移動。

把一個搜尋問題講清楚，就是五件事：<strong>初始狀態</strong>、<code>Actions(s)</code>（在狀態 s 能做的動作）、<strong>轉移模型</strong><code>Result(s,a)</code>、<strong>目標測試</strong>（顯式如「到達目的地」，或隱式如 <code>checkmate(x)</code>）、<strong>路徑成本</strong>（通常假設可加）。而<strong>搜尋策略</strong>（search strategy）的全部，就是一句話——<strong>決定「下一步探哪個狀態」</strong>。四個無資訊策略畫的是同一張圖，差別只在這個選擇：

<p>
<strong>BFS</strong>（breadth-first，廣度優先）／<strong>DFS</strong>（depth-first，深度優先）：按層或按路徑先後展開。<br>
<strong>均勻成本搜尋</strong>（uniform-cost search）：按已走路徑成本展開——<strong>這就是 Dijkstra 演算法</strong>。<br>
<strong>A* 搜尋</strong>：選「估計總成本最低」的狀態，<code>f(s) = g(s) + h(s)</code>——<code>g</code> 是從起點到 s 的<strong>真實已走成本</strong>，<code>h</code> 是<strong>啟發式</strong>（heuristic），對「從 s 到終點還要多少」的<strong>估計</strong>。
</p>

評一個策略好壞的四把尺：<strong>完備性</strong>（completeness，有解必找到）、<strong>時間</strong>、<strong>空間</strong>、<strong>最優性</strong>（optimality，是否保證最低成本）。

::: en
Before machine learning took over, **searching** was the first topic in an AI course — and the slides plant a deep line: **any iterative learning procedure (e.g., gradient descent) is itself a search.** Searching is defined as an **agent** (in the general sense) moving through a **state space** toward some objective. Formulating a search problem is five things: **initial state**, <code>Actions(s)</code>, the **transition model** <code>Result(s,a)</code>, a **goal test** (explicit like "reached destination," or implicit like <code>checkmate(x)</code>), and **path cost** (assumed additive). A **search strategy** is entirely one thing — **deciding which state to explore next.** Four uninformed strategies walk the same graph, differing only there: **BFS / DFS** expand by level or by path order; **uniform-cost search** expands by accumulated path cost — this **is Dijkstra's algorithm**; **A\*** picks the state with the lowest estimated total cost <code>f(s)=g(s)+h(s)</code>, where <code>g</code> is the **real cost already walked** from start to s and <code>h</code> is a **heuristic**, an **estimate** of the remaining cost to the goal. Four rulers judge a strategy: **completeness**, **time**, **space**, and **optimality**.
:::

## 為什麼重要 · Why it matters

該帶走的是 A* 那個加法 <code>f = g + h</code> 的哲學：<strong>把「已知的過去」(g) 和「估計的未來」(h) 加起來做決定。</strong>這個估計能省到誇張——投影片的 8-puzzle 數字很震撼：解深 d=12 時，無資訊的 IDS 要展開 <strong>3,644,035</strong> 個節點，A* 配 Manhattan heuristic 只要 <strong>73</strong> 個；d=24 時是 540 億 vs 1,641。<strong>一個好估計，抵得過幾個數量級的蠻力。</strong>

但關鍵在那個保證：<strong>A* 要找到最優解，heuristic 必須 admissible——「永不高估」</strong>到終點的真實成本（圖搜尋版要更強的 consistent，滿足三角不等式）。方向很反直覺卻很重要：<span class="tag-warn">估計寧可樂觀，也不能騙自己</span>——一旦高估，A* 就可能提早放棄其實更優的路、失去最優保證。這正是我一直在守的紀律的另一個面孔：<strong>一個「估計」只有在它帶著可證明的保證時才可信</strong>，跟 [[01-rag-faithfulness|RAG 的 faithfulness 閘門]]（接地分數是估計、要設有依據的閾值才敢採信）、以及 [[06-ai-loop-discipline|不自評、要外部驗證]]同源。

還有兩個漂亮的工程點：①<strong>怎麼設計 admissible heuristic？用 relaxed problem（放寬約束）</strong>——把原問題拿掉幾條限制（例如 8-puzzle 允許方塊瞬移），算出的成本天然是個不高估的下界。②<strong>dominance</strong>：若 <code>h₂ ≥ h₁</code> 恆成立且都 admissible，<code>h₂</code> 更好；取兩個 admissible 的 <code>max</code> 仍 admissible 且更強。回到開頭那句——既然<strong>學習也是搜尋</strong>，[[32-bias-variance-complexity-knob|監督式學習逼近那條看不見的 f*]]，其實就是在權重空間裡搜尋；而 heuristic 之於搜尋，正如歸納偏置之於學習：<strong>一個好的「估計未來」的方式，決定你走得多快、以及走不走得到最好。</strong>

::: src
出處 Source：Tsaipei Wang（王才沛），NYCU《Artificial Intelligence》課程 Set 04「Problem Solving by Searching」投影片（2026 春；Romania 地圖與 8-puzzle 例取自 Russell &amp; Norvig,《AIMA》4th ed.）。「搜尋為 ML 前的 AI 第一課、梯度下降也是搜尋」、agent 在 state space 移動、狀態／狀態空間／狀態轉移與離散-連續／可觀測性／決定-隨機、三類搜尋目標、問題形式化五要素（初始狀態／Actions／Result／goal test 顯隱式／additive path cost）、8-puzzle 與 N-queens、搜尋策略＝決定下一步探哪、完備/時間/空間/最優四準則、BFS／DFS、均勻成本＝Dijkstra、informed 用超出問題定義的知識、heuristic h(s)、A* 之 f=g+h、admissible（不高估）／consistent（三角不等式）與最優性、relaxed problem 設計 heuristic、h1 misplaced=7／h2 Manhattan=18、dominance 與 max 組合、8-puzzle 搜尋節點數（d=12：IDS 3,644,035／A*(h1) 227／A*(h2) 73；d=24：IDS 54,000,000,000／A*(h1) 39,135／A*(h2) 1,641）均出自該投影片，作者改寫重述。<br>「策略差別全在下一步探哪」「f=g+h＝已知的過去＋估計的未來」「admissible＝估計寧可樂觀不能騙自己＝估計要有可證明保證才可信」「學習也是搜尋、heuristic 之於搜尋如歸納偏置之於學習」為作者綜述觀點（Author's view），對應本站 [[01-rag-faithfulness|01]]／[[06-ai-loop-discipline|06]]／[[32-bias-variance-complexity-knob|32]]。
:::

## 一句話帶走 · Takeaway

搜尋策略的差別，就是「下一步探哪」；A* 把走過的過去 g 加上估計的未來 h，而只要估計永不高估，就保證最優。估計能省幾個數量級的蠻力，但它必須帶著可證明的保證才可信——這跟接地閘門、不自評的紀律是同一件事。

::: en
A search strategy is just "which node next"; A* adds the known past g to the estimated future h, and as long as the estimate never overestimates, optimality is guaranteed. A good estimate saves orders of magnitude of brute force — but it's trustworthy only with a provable guarantee, the same discipline as grounding gates and not grading yourself.
:::
