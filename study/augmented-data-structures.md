---
question: 怎麼「擴充」紅黑樹做順序統計/區間查詢而維持 O(log n)?擴充三步驟是什麼?B-tree 為何適合磁碟、分支為何大?
keywords: [augmenting-data-structures, order-statistic-interval-tree, b-tree]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Order statistic tree [[raw:augds-orderstat-wikipedia]](CC BY-SA 4.0)、Interval tree [[raw:augds-interval-wikipedia]](CC BY-SA 4.0)、B-tree [[raw:augds-btree-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.17(Augmenting Data Structures)+Ch.18(B-Trees)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 擴充資料結構 + B-tree（CLRS Ch.17 + Ch.18）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★。
> 一句話:Ch.17=在既有平衡樹上**加存輔助資訊**換新查詢而不破壞 O(log n);Ch.18=B-tree 用**高分支低樹高**把磁碟 I/O 次數壓到最低。(augds-orderstat-wikipedia)

## 1. 擴充資料結構(Ch.17)

- **三步驟方法論**:①選底層結構(通常紅黑樹[[data-structures]])②決定要多存什麼欄位 ③驗證插入/刪除/旋轉時該欄位能 O(1) 由子節點局部維護 → 不升階複雜度。
- **順序統計樹(order-statistic tree)**:每節點存 **size(子樹節點數)**。(augds-orderstat-wikipedia)
  - `SELECT(i)` 找第 i 小、`RANK(x)` 求名次,皆 **O(log n)**;旋轉時 size 由兩子 size + 1 重算(O(1))。
- **區間樹(interval tree)**:鍵=區間左端,每節點加存**子樹最大右端 max**。(augds-interval-wikipedia)
  - 查「與 [a,b] 重疊的區間」:用 max 剪掉不可能有交集的子樹 → O(log n) 找一個、O(k log n) 找全部。

## 2. B-tree(Ch.18)

- **多路平衡搜尋樹**:每節點含多把鍵(介於 t−1 到 2t−1,t=最小度數)、對應多個子節點;所有葉同深。(augds-btree-wikipedia)
- **為何適合磁碟**:節點做大(= 一個磁碟區塊),分支因子大 → 樹高 **O(log_t n)** 很矮 → **磁碟 I/O(讀節點)次數最少**。CPU 內比較便宜,I/O 才是瓶頸。
- 操作:搜尋/插入/刪除皆 O(t·log_t n) 比較、O(log_t n) 次磁碟存取。插入滿節點**先分裂(split)**、刪除不足**先合併/借鍵**,維持下限。
- 變體:**B+ tree**(資料全在葉 + 葉間鏈結,利於範圍掃描)是資料庫/檔案系統索引主力。

## 我的想法 / 啟發

- **擴充三步驟的關鍵是「欄位可局部維護」**:加的資訊若無法在旋轉時 O(1) 從子節點重算,就會破壞 O(log n)。資格考常考「這個欄位能不能擴充」——答題要檢驗局部性。
- **B-tree 的設計哲學=對齊硬體成本模型**:矮樹換少 I/O,呼應「演算法要看真實瓶頸」。跟 [[data-structures]] 的 BST/紅黑樹相比,B-tree 是「外存版」平衡樹。
- 順序統計樹把 [[selection]] 的「第 k 小」從一次性 O(n) 升級成可動態維護的 O(log n),是「擴充換動態查詢能力」的典範。

## Next action / 下一步

1. 補 order-statistic 刪除時 size 維護 + interval tree 重疊搜尋正確性證明。
2. 補 B-tree split/merge 完整偽碼 + B+ tree 範圍查詢;接演算法軌其餘 ★ 專門章(LP/FFT/數論)。

## 交叉引用 / 出處
- raw:`wiki/raw/augds-orderstat-wikipedia.md`、`augds-interval-wikipedia.md`、`augds-btree-wikipedia.md`
- [[data-structures]] — 底層紅黑樹/BST;[[selection]] — 第k小動態化;[[amortized-analysis]] — B-tree 分裂攤還
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.17+18)
