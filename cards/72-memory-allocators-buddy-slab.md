---
id: "72"
slug: memory-allocators-buddy-slab
tag: Linux
title: 記憶體分配器：Buddy System 與 Slab
title_en: "Memory Allocators: Buddy System and Slab"
title_short: Buddy System & Slab
summary: Linux 實體記憶體用 Buddy System 管理（以 2^n 頁為單位，合併鄰居消除碎片）；小物件用 Slab/SLUB 分配器在 buddy 頁上切割，避免頻繁走 buddy 的高開銷。
summary_en: Linux manages physical memory with the Buddy System — allocate/free in power-of-two page blocks, merge freed "buddies" to defragment. Small kernel objects use the Slab allocator which carves up buddy pages into fixed-size caches, avoiding repeated costly buddy calls.
links: [73-virtual-memory-paging, 65-interrupt-handlers]
---

## 是什麼 · What it is

### Buddy System（頁面分配器）

**核心思想**：每個 order（0–10）維護一個 free list，order-k 的 block = 2^k 頁。

```
Order 0: [ ][ ][ ]...  各 1 page (4KB)
Order 1: [  ][  ]...   各 2 pages (8KB)
Order 2: [    ]...     各 4 pages (16KB)
...
Order 10:              各 1024 pages (4MB)
```

**分配 order-k**：
1. 在 order-k free list 找空 block → 直接返回
2. 若無 → 從 order-(k+1) 取一個，**切半**，一半放回 order-k，一半給使用者
3. 遞迴向上找，最多找到 order-10

**釋放（合併）**：
1. 計算 buddy 位址：`buddy = addr ^ (1 << k << PAGE_SHIFT)`
2. 若 buddy 也是 free → 合併成 order-(k+1)，繼續嘗試向上合併

```c
// Linux kernel API
struct page *alloc_pages(gfp_t gfp, unsigned int order);
void __free_pages(struct page *page, unsigned int order);

// 更常用的包裝（自動計算 order）
void *__get_free_pages(gfp_t gfp, unsigned int order);  // 返回虛擬位址
```

### Slab Allocator（物件分配器）

Buddy 最小單位是 1 page (4KB)。若 kernel 大量分配 `task_struct`（≈7KB）或 `kmalloc(64)`，直接走 buddy 太浪費。

```
Slab Cache "task_struct": slab slab slab ...
                           ↑ 每個 slab = 幾個 buddy page，切成固定大小的 object slots
```

```c
// 建 slab cache
struct kmem_cache *cachep = kmem_cache_create(
    "my_cache", sizeof(MyObj), __alignof__(MyObj), SLAB_HWCACHE_ALIGN, NULL);

// 分配/釋放 object（比 kmalloc 快，cache-friendly）
MyObj *obj = kmem_cache_alloc(cachep, GFP_KERNEL);
kmem_cache_free(cachep, obj);
kmem_cache_destroy(cachep);

// 一般用途（走 kmalloc cache）
void *p = kmalloc(size, GFP_KERNEL);   // size 自動對應最近的 slab cache
kfree(p);
```

**現代 Linux 預設用 SLUB**（Slab Unqueued）：更簡單的結構，每個 CPU 一個 partial slab，減少鎖競爭。

::: en
The **Buddy System** is Linux's physical page allocator. It tracks free memory in 11 lists (order 0–10), where order-k holds blocks of 2^k contiguous pages. Allocation splits larger blocks if the right size isn't free; freeing merges adjacent "buddy" blocks (at XOR-distance 2^k) back up. This eliminates external fragmentation at the page granularity. The **Slab allocator** sits on top: it pre-carves buddy pages into fixed-size object caches (`kmem_cache`), so allocating a `task_struct` doesn't go all the way to the buddy allocator every time. Modern Linux uses **SLUB** (the slab unqueue'd allocator) — per-CPU partial slabs reduce lock contention on multicore systems.
:::

::: src
出處 Source：OSC2022 Lab 4 (Buddy System, Dynamic Memory Allocator); LKD Ch. 11 (Memory Management); Bonwick 1994 "The Slab Allocator".
:::

## 為什麼重要 · Why it matters

| | Buddy System | Slab/SLUB | `vmalloc` |
|--|-------------|-----------|-----------|
| 物理連續 | ✅ 是 | ✅ 是（在 slab 內） | ❌ 否（page table 映射） |
| 最小粒度 | 1 page (4KB) | object size | 1 page |
| 速度 | 中 | 快（per-CPU cache hot）| 慢（需修改 page table） |
| 適合 | DMA（需連續）| struct 小物件 | 大型不需連續的 buffer |

**GFP flags 選型**：
- `GFP_KERNEL`：一般 kernel 路徑，可睡眠，可 reclaim
- `GFP_ATOMIC`：中斷/spinlock 情境，**不可睡眠**，失敗機率高
- `GFP_DMA`：要求 16MB 以下的 ZONE_DMA（舊式 ISA DMA）

::: en
Choosing the allocator: `kmalloc` with `GFP_KERNEL` for small kernel objects in process context. `GFP_ATOMIC` in interrupt handlers (cannot sleep — the allocator won't reclaim memory). `alloc_pages` for page-aligned physical memory (DMA drivers). `vmalloc` for large allocations that don't need to be physically contiguous (not usable for DMA). **Never use `GFP_ATOMIC` by default** — it's often used as a lazy workaround for not restructuring code, and it increases OOM risk.
:::

::: src
出處 Source：OSC2022 Lab 4; LKD Ch. 11-12; Linux kernel `Documentation/core-api/memory-allocation.rst`. 作者整合。
:::

## 一句話帶走 · Takeaway

Buddy System = 2^n 頁的分配/合併，解決外部碎片；Slab = 在 buddy page 上切小物件快取，解決頻繁小分配的內部碎片與速度問題；`kmalloc` = 一般情況的入口。

::: en
Buddy System = allocate/coalesce 2^n page blocks, eliminating external fragmentation. Slab = carve buddy pages into fixed-size object caches, fast per-CPU hot paths. `kmalloc` is your everyday entry point; reach for `GFP_ATOMIC` only when you're truly in interrupt context.
:::
