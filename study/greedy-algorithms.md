---
question: 貪婪演算法是什麼、何時正確？它和動態規劃差在哪，怎麼證明一個貪婪選擇是對的？
keywords: [greedy-algorithms, greedy-choice-property, exchange-argument]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Greedy algorithm [[raw:greedy-wikipedia]](CC BY-SA 4.0)、Jeff Erickson Algorithms ch.4 Greedy [[raw:greedy-erickson]](CC BY 4.0)。canonical=CLRS Ch.15。
source_authority: 高(公開標準教材/教科書,授權 CC,主張可回 wiki/raw/)。
---

# 貪婪演算法 Greedy Algorithms

> 概念頁 · 資格考演算法逐章複習(CLRS Ch.15)。
> 一句話:每一步都做**當下看起來最好的局部選擇、且選了就不反悔**,期望這樣能拼出全域最優。(greedy-wikipedia)

## 1. 是什麼

貪婪法把問題看成「一連串選擇」,在每一步挑**此刻最優的那個**,不回頭、不重估。它比動態規劃**簡單也快**(通常一遍掃過、不建表),但**只有在特定結構下才會對**。(greedy-erickson)

## 2. 正確的兩個前提

- **貪婪選擇性質 (greedy-choice property)**:存在一個「當下最優」的選擇,它一定能**延伸成某個全域最優解** → 才敢選了不反悔。(CLRS Ch.15 的核心條件;greedy-wikipedia)
- **最優子結構 (optimal substructure)**:做完這步後,剩下的子問題的最優解 + 這步 = 原問題最優解。(與 [[dynamic-programming]] 共用的性質)

> 關鍵差別 vs DP:DP 也要最優子結構,但 DP **保留所有子問題的解、可反悔**;貪婪**只走一條路、選了就定**。所以貪婪成立的額外門檻就是「貪婪選擇性質」。(greedy-erickson)

## 3. 怎麼證明貪婪是對的(資格考常考)

- **交換論證 (exchange argument)**:假設有個最優解和貪婪解不同,把最優解裡的某個選擇**換成貪婪的選擇**,證明不會變差 → 故貪婪解也最優。(greedy-erickson 主力手法)
- **「貪婪始終領先」(greedy stays ahead)**:歸納證明貪婪在每一步的部分解都不劣於任何其他解。

## 4. 經典例子

- **活動選擇 / 區間排程 (activity selection)**:挑最早結束的活動 → 最多不重疊活動。(CLRS 15.1)
- **霍夫曼編碼 (Huffman)**:每次合併頻率最小的兩節點 → 最優前綴碼。(CLRS 15.3)
- **分數背包 (fractional knapsack)**:按單位價值由高到低裝 → 貪婪最優。
- **MST / 最短路**:Kruskal、Prim、Dijkstra **本質都是貪婪**(見 [[dynamic-programming]] 旁的圖論章,待建)。

## 5. 什麼時候**不**能用(反例)

- **0/1 背包**:貪婪(按單位價值裝)**會錯** → 必須用 [[dynamic-programming]]。這組「分數背包貪婪 OK / 0-1 背包貪婪錯」是資格考最愛的對照。(greedy-wikipedia)
- 一般而言:**貪婪選擇性質不成立就不能用**,要退回 DP 或窮舉。

## 我的想法 / 啟發

- **DP vs 貪婪是同一條光譜**:都靠最優子結構;貪婪多一個「貪婪選擇性質」的強假設換來速度。資格考要能**判斷題目落在哪邊**——不確定就先假設要 DP,能證明貪婪選擇性質再降成貪婪。
- 教學切入(接簡報敘事):先給「分數背包貪婪成功 vs 0-1 背包貪婪失敗」的對照,最能讓人秒懂「為什麼貪婪不是萬能」。
- **證明比套用重要**:資格考不只要會跑貪婪,要會用**交換論證**說明它為什麼對——這是拿高分的關鍵。

## Next action / 下一步

1. 建圖論章(圖遍歷 BFS/DFS → 最短路 Dijkstra/Bellman-Ford → MST Kruskal/Prim),把「Dijkstra/MST 是貪婪」接起來。
2. 補活動選擇 + Huffman 的交換論證完整推導(Erickson ch.4 raw 已備)。

## 交叉引用 / 出處
- raw:`wiki/raw/greedy-wikipedia.md`、`wiki/raw/greedy-erickson.md`
- [[dynamic-programming]] — 同光譜:貪婪=DP + 貪婪選擇性質;0-1 背包是兩者分界的經典對照
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法第 6 章)
