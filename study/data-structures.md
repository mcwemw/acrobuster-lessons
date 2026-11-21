---
question: 雜湊表為何平均 O(1)、最壞 O(n)？BST 的 O(h) 怎麼靠平衡(紅黑樹)保證 O(log n)？何時選雜湊 vs 平衡樹？
keywords: [data-structures, hash-table, balanced-bst]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Hash table [[raw:ds-hashtable-wikipedia]](CC BY-SA 4.0)、Binary search tree [[raw:ds-bst-wikipedia]](CC BY-SA 4.0)、Red-black tree [[raw:ds-rbtree-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.10–13。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 資料結構 Data Structures（基本 / 雜湊 / BST / 紅黑樹）

> 概念頁 · 資格考演算法逐章複習(CLRS Ch.10–13)· 軌 A 演算法。
> 一句話:**雜湊**換「無序但平均 O(1)」、**平衡 BST**換「有序且最壞 O(log n)」——選哪個看要不要排序性。(ds-hashtable-wikipedia / ds-bst-wikipedia)

## 1. 基本 DS（Ch.10)

- **堆疊 Stack**:LIFO,push/pop O(1)。**佇列 Queue**:FIFO,enqueue/dequeue O(1)。**鏈結串列 Linked list**:插入/刪除已知位置 O(1),搜尋 O(n)。
- (優先佇列 = heap,見 [[sorting]] 的 Heapsort。)

## 2. 雜湊表 Hash Table（Ch.11)

- key 經 hash function → bucket 索引;**平均 O(1)** 搜尋/插入/刪除。(ds-hashtable-wikipedia)
- **碰撞處理**:① 鏈結法 chaining(每 bucket 掛串列)② 開放定址 open addressing(線性/二次/雙重雜湊)。
- **load factor α = n/m**:α 越大碰撞越多;超過門檻要 **rehash**(擴容重雜湊)。
- 🔴 **最壞 O(n)**:所有 key 撞同一 bucket(壞 hash / 對手攻擊)→ 無序、無法做範圍查詢。

## 3. 二元搜尋樹 BST（Ch.12)

- 左子 < 根 < 右子;中序走訪 = 排序輸出。(ds-bst-wikipedia)
- 搜尋/插入/刪除 **O(h)**,h = 樹高。
- 🔴 **退化**:照序插入 → 變鏈狀 h=O(n) → 退化成 O(n)。要保證就得**平衡**。

## 4. 平衡 BST：紅黑樹（Ch.13)

- 紅黑不變式保證高度 **h ≤ 2·log₂(n+1)** → 所有操作 **最壞 O(log n)**。(ds-rbtree-wikipedia)
- 五性質:① 每節點紅或黑 ② 根黑 ③ 葉(NIL)黑 ④ 紅節點的子皆黑(不連紅)⑤ 任一節點到其後代葉的每條路徑**黑節點數相同**(black-height)。
- 插入/刪除後用**旋轉 + 重新著色**修復不變式。
- (AVL 樹:更嚴格的高度平衡,查詢更快、改寫更常旋轉;紅黑改寫較省。)

## 5. 選哪個(資格考對照)

- **雜湊表**:平均 O(1)、**無序**;要「有沒有/快取/集合」用它。
- **平衡 BST**:最壞 O(log n)、**有序**;要「範圍查詢 / successor / 排序遍歷 / 最壞保證」用它。
- 要 O(1) 又要有序 → 兩者都不行,看需求取捨。

## 6. 深化:紅黑高度證明 + 旋轉 + 雜湊分析

### 6.1 紅黑樹 h ≤ 2log₂(n+1) 證明
令 bh(x)=x 到葉的黑節點數。先證「以 x 為根的子樹至少 2^bh(x)−1 個內部節點」(對高度歸納)。因不連紅(性質4),從根到葉**至少一半是黑** → bh(根) ≥ h/2。故 n ≥ 2^(h/2)−1 → h ≤ 2log₂(n+1)。∎ 所以搜尋/插入/刪除最壞 **O(log n)**。

### 6.2 旋轉(維持 BST 性質的 O(1) 局部手術)
左旋 LEFT-ROTATE(x):x 的右子 y 上位,y 的左子轉成 x 的右子。中序不變(BST 性質保持),只改 3 條指標 → O(1)。插入後修復分三類:叔叔紅→**重著色**上推;叔叔黑且 zig-zag→先旋轉拉直;zig-zig→旋轉+著色收尾。最多 O(log n) 次重著色、≤2 次旋轉。

### 6.3 雜湊 chaining 平均 O(1) 推導
簡單均勻雜湊假設下,每 key 等機率落任一 bucket。一次搜尋期望探查長度 = 1+α(α=n/m 負載因子)。只要 **m 隨 n 成長使 α=O(1)**(靠 rehash,攤還 O(1)),搜尋/插入/刪除期望 O(1)。open addressing 期望探查 ≈ 1/(1−α),α→1 急升,故通常 α≤0.7 就擴容。

### 6.4 open addressing 刪除的 tombstone 陷阱
線性探查刪除不能直接清空(會截斷後續探查鏈),要標 **tombstone(刪除標記)**:搜尋時跳過、插入時可覆蓋。tombstone 累積會退化效能 → 需定期 rehash 清理。

### 6.5 速查
| 操作 | 雜湊(chaining) | 平衡BST | 無序陣列 |
|---|---|---|---|
| 搜尋 | 平均O(1)/最壞O(n) | O(log n) | O(n) |
| 範圍/successor | ✗ 無序 | ✓ O(log n+k) | ✗ |
| 最壞保證 | ✗ | ✓ | — |

## 我的想法 / 啟發

- **「平均 vs 最壞」又出現了**(呼應 [[sorting]] 的 Quick vs Heap):雜湊賭平均 O(1)、紅黑樹買最壞 O(log n) 保證。資格考判題先問「能不能接受最壞退化」。
- **有序性是分水嶺**:雜湊無序 → 不能範圍/successor;需要排序關係就只能平衡樹。
- 紅黑樹的五性質 + black-height 推高度上界,是資格考最愛考的「為什麼 O(log n)」證明骨架。

## Next action / 下一步

1. 建 Union-Find(Ch.19,互斥集 + 路徑壓縮/按秩合併,接 MST Kruskal)。
2. 補紅黑樹插入 5 種修復情形 + AVL 旋轉細節 + 雜湊 open addressing 刪除的 tombstone。

## 交叉引用 / 出處
- raw:`wiki/raw/ds-hashtable-wikipedia.md`、`ds-bst-wikipedia.md`、`ds-rbtree-wikipedia.md`
- [[sorting]] — heap/priority queue;[[complexity-and-divide-conquer]] — O/Θ/Ω 表達複雜度
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.10–13)
