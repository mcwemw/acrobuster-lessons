---
id: "69"
slug: page-replacement
tag: Linux
title: 分頁置換演算法：LRU、LFU 與 Working Set
title_en: "Page Replacement Algorithms: LRU, LFU, and Working Set"
title_short: 分頁置換 LRU/LFU
summary: 當實體記憶體滿了，OS 要決定踢出哪個分頁；OPT 是理論上限，LRU 以歷史替代未來，LFU 看頻率，Clock 是 LRU 的低成本近似。理解這些演算法是 OS 課的核心題型。
summary_en: When physical memory is full, the OS must evict a page. OPT (optimal) is the theoretical ceiling. LRU approximates it with recency, LFU with frequency, Clock with a cheap bit-based approximation of LRU.
links: [63-system-calls]
---

## 是什麼 · What it is

**分頁置換的情境**：每個行程有虛擬位址空間；物理 RAM 只有有限個 frame；page fault 時 OS 把需要的頁調進來，若沒空位就要踢出（evict）一頁。

**主要演算法比較**：

| 演算法 | 策略 | 實作複雜度 | Page Fault 率 |
|--------|------|-----------|--------------|
| OPT (Belady) | 踢掉「最遠的未來才用」 | 不可實作（需未來知識） | 最低（理論下界） |
| **LRU** | 踢掉「最久沒用」 | 中（需完整時間戳） | 接近 OPT |
| **LFU** | 踢掉「用最少次」 | 中（需計數器） | 與 LRU 互有優劣 |
| **Clock** | 循環掃，reference bit=0 才踢 | 低（指針+1 bit） | 比 LRU 稍差，實務常用 |
| FIFO | 踢掉「最早進來」 | 最低 | 差，有 Belady's Anomaly |

**LRU 的 O(1) 實作**（經典面試題）：

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()      # key → value，有序（插入序 / move_to_end）

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)     # 移到「最近使用」端
        return self.cache[key]

    def put(self, key: int, value: int):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)   # 踢掉最舊（LRU）端
```

::: en
Page replacement is the OS problem: *given a full set of physical frames, which page do I evict to bring in the new one?* OPT evicts the page used furthest in the future — perfect but requires oracle knowledge. LRU (Least Recently Used) approximates OPT by evicting the page unused for the longest time. LFU (Least Frequently Used) evicts the least-accessed page — good for skewed access patterns. Clock algorithm uses a single reference bit per frame; a pointer sweeps frames, clearing bits (second chance) until it finds bit=0 to evict. Clock is LRU's practical sibling, used in real OS kernels.
:::

::: src
出處 Source：OS Concepts (Silberschatz) Ch. 10; nctu-ms07 OS HW4 Page Replacement Assignment; LeetCode 146 (LRU Cache).
:::

## 為什麼重要 · Why it matters

**Belady's Anomaly**（FIFO 的反直覺現象）：

```
存取序列：1 2 3 4 1 2 5 1 2 3 4 5
3 frames：9 page faults
4 frames：10 page faults  ← 更多 frame 反而更多 fault！
```

FIFO 有這個問題；LRU、OPT 不會（它們是「堆疊演算法」，frame 增加一定不會更差）。

**Working Set 模型**：
- 定義：行程在最近 Δ 個存取中用到的分頁集合，`W(t, Δ)`
- 若能保留 working set → page fault 率低；若分配 frame < |W| → **thrashing**（大量 page fault，CPU 忙換頁而不做事）

::: en
**Belady's Anomaly**: FIFO can produce *more* page faults with *more* frames — counterintuitive and a classic exam question. Stack algorithms (OPT, LRU) are immune: more frames ⊇ fewer frames' hit set. The **Working Set** model captures this: `W(t, Δ)` is the set of pages referenced in the last Δ accesses. If allocated frames < |W|, the process constantly page-faults — called **thrashing**. The fix is either give the process more frames or swap it out entirely.
:::

::: src
出處 Source：OS Concepts Ch. 10 (Virtual Memory); Denning 1968 "The Working Set Model for Program Behavior". 作者整合。
:::

## 一句話帶走 · Takeaway

LRU 踢最舊、LFU 踢最少用、Clock 是 LRU 的廉價近似；FIFO 有 Belady's Anomaly 是考試陷阱；Working Set 太小會 thrashing。

::: en
LRU evicts the least recently used, LFU the least frequently used, Clock approximates LRU with one bit. FIFO's Belady's Anomaly is a classic trap — more frames, more faults. Working set too small → thrashing.
:::
