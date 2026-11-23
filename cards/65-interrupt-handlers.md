---
id: "65"
slug: interrupt-handlers
tag: OS
title: 中斷處理：Top Half 要快，Bottom Half 才做事
title_en: "Interrupt Handlers: Top Half Must Be Fast, Bottom Half Does the Work"
title_short: 中斷處理機制
summary: 中斷處理器跑在中斷情境（不能睡眠、不能用 mutex），必須極快完成；真正的工作放到 bottom half（tasklet 或 workqueue）在 process context 完成。
summary_en: Interrupt handlers run in interrupt context — no sleeping, no mutex. They must finish fast. Actual work goes into the bottom half (tasklet or workqueue) which runs in process context where sleeping is allowed.
links: [61-kernel-mutex, 64-blocking-processes-waitqueue]
---

## 是什麼 · What it is

當硬體（鍵盤、網卡、計時器）需要 CPU 注意，觸發**中斷**（interrupt）。CPU 暫停當前工作，跳到中斷處理器（IRQ handler）。

**硬性限制**：中斷處理器跑在**中斷情境（interrupt context）**，不屬於任何行程，因此：
- ❌ 不能睡眠（`mutex_lock`、`kmalloc(GFP_KERNEL)` 都不行）
- ❌ 不能存取 user-space 記憶體
- ✅ 可以讀/寫硬體暫存器
- ✅ 可以 `spin_lock`（不睡眠的鎖）

```c
#include <linux/interrupt.h>

/* 請求 IRQ */
int request_irq(unsigned int irq, irq_handler_t handler,
                unsigned long flags, const char *name, void *dev);

/* IRQ handler — 必須超快！只做最少的工作 */
static irqreturn_t my_irq_handler(int irq, void *dev_id) {
    // 只清旗標、喚醒 wait queue，把真正的工作推到 bottom half
    wake_up(&my_queue);
    return IRQ_HANDLED;
}
```

**Top half / Bottom half 分離**：
- **Top half** = IRQ handler，極短，只確認硬體、推任務
- **Bottom half** 有三種機制：
  - **Tasklet**：在 softirq 情境跑，仍不能睡眠
  - **Workqueue**：在 kernel thread 跑，可以睡眠 ✅
  - **Threaded IRQ** (`IRQF_SHARED + request_threaded_irq`)：直接生一個 thread

::: en
An interrupt handler runs in **interrupt context** — not inside any process. Rules: no sleeping (`mutex_lock` calls `schedule`, which is forbidden), no user-space access, spinlocks only. The standard pattern: **top half** (the IRQ handler) acknowledges hardware and wakes a wait queue; **bottom half** (tasklet or workqueue) does the real work in a schedulable context. Workqueues run in a kernel thread and *can* sleep — use them when the bottom-half work is complex.
:::

::: src
出處 Source：LKMPG Ch. 13 (Interrupt Handlers). sysprog21.github.io/lkmpg; LKD Ch. 7, 8.
:::

## 為什麼重要 · Why it matters

這解釋了 `kfetch` 作業裡為什麼用 **`mutex`（可睡眠）而不是 `spinlock`**：

| | Mutex | Spinlock |
|--|-------|---------|
| 可睡眠 | ✅ 是 | ❌ 否 |
| 適用情境 | Process context（syscall、kthread）| Interrupt context、spinloop |
| 等待方式 | 行程掛起，讓出 CPU | 忙轉直到鎖釋放 |
| `kfetch` 適合 | ✅ | ❌（`open` 在 syscall 路徑） |

Mutex 只能在**可排班（schedulable）**的情境用；`kfetch_open` 是 syscall 路徑，可以，所以用 mutex。

::: en
This explains why `kfetch` uses a **mutex (sleepable)** not a **spinlock (non-sleeping)**. Mutexes require schedulable context (syscall path ✓). Spinlocks are for interrupt context. Using `mutex_lock` in an interrupt handler would deadlock the CPU — the CPU spins waiting for the lock while the holder (another process) can't be scheduled because the CPU is busy spinning.
:::

::: src
出處 Source：LKMPG Ch. 13; LKD Ch. 9 (An Introduction to Kernel Synchronization). 作者整合。
:::

## 一句話帶走 · Takeaway

中斷處理器要極短、不可睡眠，真正的工作推到 bottom half；這也解釋了為何不同的鎖（mutex vs spinlock）適用不同的 kernel 情境。

::: en
Interrupt handlers must be short and non-sleeping — push real work to the bottom half. This distinction (interrupt context vs. process context) is exactly why mutex and spinlock have different rules.
:::
