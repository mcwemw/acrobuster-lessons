---
question: 雙人零和賽局怎麼用 minimax 決策?alpha-beta 剪枝為何能把有效分支降到 √?有隨機性(擲骰)的賽局怎麼辦?
keywords: [adversarial-search, minimax, alpha-beta-pruning]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Minimax [[raw:ai-minimax-wikipedia]](CC BY-SA 4.0)、Alpha–beta pruning [[raw:ai-alphabeta-wikipedia]](CC BY-SA 4.0)、Expectiminimax [[raw:ai-expectiminimax-wikipedia]](CC BY-SA 4.0)。canonical=AIMA 4e Ch.5(Adversarial Search and Games)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: AI
---

# 對抗搜尋 Adversarial Search（AIMA Ch.5）

> 概念頁 · 資格考 AI 逐章複習 · 軌 B AI · ★★。
> 一句話:雙人零和完全資訊賽局,**MAX 想最大化、MIN 想最小化同一效用**;minimax 遞迴算出每個狀態值,alpha-beta 在不改結果下剪掉不可能影響決策的分支。(ai-minimax-wikipedia)

## 1. Minimax

- 賽局樹:MAX 層取子節點 **max**、MIN 層取 **min**,葉=效用(或啟發式評估值)。根的 minimax 值=雙方都最優下 MAX 能保證的結果。(ai-minimax-wikipedia)
- **深度限制**:完整樹太大 → 搜到深度 d 用**評估函數**估葉;配合迭代加深。
- 複雜度:樸素 minimax = **O(b^d)**(b 分支、d 深度),時間指數、空間 O(bd)。

## 2. Alpha-Beta 剪枝

- 維護 **α**(MAX 目前能保證的下界)、**β**(MIN 目前能保證的上界);當某節點值使 **α ≥ β** → 剩餘子節點剪掉(對手不會讓你走到這)。(ai-alphabeta-wikipedia)
- **不改 minimax 結果**,只省搜尋。西洋棋 4 層、分支 36:最佳剪枝把 ~百萬葉降到 ~2000(減 99.8%)。(ai-alphabeta-wikipedia)
- **節點排序決定效益**:最佳排序下有效分支 b→√b,複雜度 **O(b^{d/2})** → 同樣時間能搜**兩倍深度**。最差排序退回 O(b^d)。

## 3. 隨機性賽局:Expectiminimax

- 加入**機會節點(chance node)**:值 = 子節點值的**機率加權期望**(如擲骰、發牌)。(ai-expectiminimax-wikipedia)
- 樹層變三種:MAX / MIN / CHANCE。評估函數的**尺度**此時有意義(不只序關係),因為要算期望。
- 可用 *-minimax 配合上下界對機會節點做類 alpha-beta 剪枝。

## 我的想法 / 啟發

- **alpha-beta 的 O(b^{d/2}) 是資格考必背結論**,且要能說清「為何靠排序」:好排序讓 MAX 先看好手、MIN 先看狠手,早觸 α≥β。這跟 [[ai-search]] 啟發式的「好序省搜尋」同精神。
- **剪枝不犧牲最優**(與近似/取樣不同)——這點常被混淆:alpha-beta 是**精確**的,蒙地卡羅樹搜尋(MCTS)才是取樣近似。
- expectiminimax 把「對手」換成「機率」,是通往**決策論/MDP**([[ai-search]]→後續機率/決策章)的橋:MIN 是對抗期望,CHANCE 是中立期望。

## Next action / 下一步

1. 補 MCTS(UCT)作為大分支賽局(圍棋)對 minimax 的補充,與 alpha-beta 對照。
2. 建 CSP(AIMA Ch.6)+ 機率/貝氏(Ch.13-14),接 expectiminimax 的期望決策。

## 交叉引用 / 出處
- raw:`wiki/raw/ai-minimax-wikipedia.md`、`ai-alphabeta-wikipedia.md`、`ai-expectiminimax-wikipedia.md`
- [[ai-search]] — 同為狀態空間搜尋,對抗版加對手;啟發式評估函數共用
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(AI 軌 AIMA Ch.5)
