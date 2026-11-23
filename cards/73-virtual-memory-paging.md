---
id: "73"
slug: virtual-memory-paging
tag: Linux
title: 虛擬記憶體與分頁：每個行程都有自己的位址空間
title_en: "Virtual Memory and Paging: Every Process Gets Its Own Address Space"
title_short: 虛擬記憶體 & 分頁
summary: 虛擬記憶體用多層 Page Table 把每個行程的虛擬位址映射到實體位址；TLB 快取最近的映射；Page Fault 是 OS 的入口，可用來實作 COW、demand paging、swap。
summary_en: Virtual memory uses a multi-level page table to map each process's virtual addresses to physical ones. The TLB caches recent mappings. Page faults are the kernel's hook for copy-on-write, demand paging, and swap-in.
links: [69-page-replacement, 72-memory-allocators-buddy-slab, 63-system-calls]
---

## 是什麼 · What it is

**多層頁表（x86-64 四層 / AArch64 四層）**：

```
虛擬位址（48-bit）：
  [47:39] PGD index (9-bit)
  [38:30] PUD index (9-bit)
  [29:21] PMD index (9-bit)
  [20:12] PTE index (9-bit)
  [11:0]  Page offset (12-bit = 4KB)

              CR3/TTBR0 → PGD → PUD → PMD → PTE → 實體頁 frame
```

每個 entry 都有保護位元（R/W/X/User/Present），MMU 硬體自動 walk；走完得到實體位址：

```
physical addr = PTE.PFN << 12 | (virtual addr & 0xFFF)
```

**TLB（Translation Lookaside Buffer）**：  
頁表 walk 要 4 次記憶體存取，代價高。TLB 是 MMU 內建的快取，存最近的 `virt → phys` 映射；context switch 時必須 flush（否則 A 行程的映射殘留在 B 的 TLB）：

```c
// Linux context switch 時（arch/arm64/mm/proc.S）：
cpu_switch_mm(mm->pgd, mm);    // 換 TTBR0_EL1，自動 TLB 刷新（ASID 機制可減少 flush）
```

**AArch64 兩套 page table**：
- `TTBR0_EL1`：user-space（0x0 ~ 0x0000_FFFF_FFFF_FFFF）
- `TTBR1_EL1`：kernel-space（0xFFFF_0000_0000_0000 ~ ）

::: en
Virtual memory gives each process the illusion of its own full address space. The CPU's MMU walks the page table (4 levels on x86-64 and AArch64) to translate every memory access. This walk takes 4 sequential memory reads — prohibitively slow on every access. The TLB caches recent translations; a TLB miss triggers a hardware page-table walk. AArch64 has two sets of page-table registers (`TTBR0`/`TTBR1`), cleanly splitting user and kernel virtual address spaces — no "split" heuristic like x86's historical 3G/1G.
:::

::: src
出處 Source：OSC2022 Lab 6 (Virtual Memory); ARM Architecture Reference Manual §D5; Intel SDM Vol 3A §4; LKD Ch. 15.
:::

## 為什麼重要 · Why it matters

**Page Fault 是 OS 的核心槓桿**：

| Page Fault 類型 | 原因 | OS 動作 |
|----------------|------|---------|
| **Minor fault** | 頁表項存在但 Present=0（demand paging） | 分配物理頁，建 PTE，返回 |
| **Copy-on-Write** | fork 後子行程寫父行程的唯讀頁 | 複製頁，更新 PTE，返回 |
| **Major fault (swap-in)** | 頁被 swap 到磁碟 | 從磁碟讀回頁，更新 PTE（慢！） |
| **Segfault** | 存取不合法位址（no VMA covering it） | 送 SIGSEGV |

**OSC2022 Lab 6 要點**（AArch64 identity paging + user space mapping）：

```c
// 建 identity paging（PA == VA）給 kernel 自身
// TCR_EL1: T0SZ=25 (kernel), T1SZ=25 (user), granule=4KB
// MAIR_EL1: define memory attributes (normal/device)

// 建 user process page table：
// 把 ELF .text/.data/stack 映射到低位址（TTBR0）
// 系統呼叫時 TTBR0 → 切換到 kernel 的 TTBR1
```

::: en
Page faults are how the kernel implements lazy allocation (demand paging), copy-on-write (fork efficiency), and swap. When `fork` is called, instead of copying all parent pages, the kernel marks them read-only and shared. When either process writes, the MMU raises a page fault; the fault handler detects the COW case, copies the page, remaps it writable, and returns. The process never knows this happened. This is why `fork` is cheap even for processes with gigabytes of heap — no actual copying occurs until a write.
:::

::: src
出處 Source：OSC2022 Lab 6; LKD Ch. 15 (The Process Address Space); "Understanding the Linux Kernel" Ch. 2. 作者整合。
:::

## 一句話帶走 · Takeaway

Page Table = 每個行程的「虛擬→實體」翻譯本，TLB 是翻譯快取，Page Fault 是 OS 實作 COW/swap/demand paging 的入口——OS 在頁表這個層面上做了大量「你看不見的魔法」。

::: en
Page table is each process's private virtual→physical translation book. TLB caches it. Page fault is the kernel's hook for lazy allocation, copy-on-write, and swap. Almost every clever OS memory trick happens at the page-table level, invisible to the application.
:::
