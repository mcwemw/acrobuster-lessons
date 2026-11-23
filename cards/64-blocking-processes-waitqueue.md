---
id: "64"
slug: blocking-processes-waitqueue
tag: OS
title: Blocking 與 Wait Queue：讓 Kernel 優雅等待事件
title_en: "Blocking and Wait Queues: Letting the Kernel Wait for Events Gracefully"
title_short: 阻塞與 Wait Queue
summary: 當 kernel 需要等待事件（硬體就緒、資料到達），不應 busy-wait；用 wait queue 讓行程睡眠，事件發生時 wake_up 喚醒，CPU 在等待期間可排班其他工作。
summary_en: When the kernel needs to wait for an event (hardware ready, data arrived), it should not busy-wait. Use a wait queue to put the process to sleep; call `wake_up` when the event fires. The CPU is free to schedule other work while waiting.
links: [58-linux-kernel-module-basics, 61-kernel-mutex]
---

## 是什麼 · What it is

**Wait Queue** 是 Linux kernel 的「事件等待清單」：一群行程睡在這個 queue 上，等某件事發生；事件發生時由其他行程或中斷呼叫 `wake_up` 喚醒。

```c
#include <linux/wait.h>

/* 宣告 */
static DECLARE_WAIT_QUEUE_HEAD(my_queue);
static int condition = 0;  /* 等待的條件 */

/* 生產者（如中斷處理/另一個行程）：設條件、喚醒 */
void some_event_handler(void) {
    condition = 1;
    wake_up(&my_queue);
}

/* 消費者（如 read handler）：等到條件成立 */
static ssize_t my_read(...) {
    wait_event_interruptible(my_queue, condition != 0);
    if (signal_pending(current)) return -ERESTARTSYS;
    // condition 成立，繼續處理
    condition = 0;
    ...
}
```

**`wait_event_interruptible`** vs **`wait_event`**：
- `interruptible`：可被 signal 打斷（Ctrl-C）→ 回傳 `-ERESTARTSYS`；**通常用這個**
- 非 interruptible：無法被 signal 打斷 → `kill -9` 也殺不掉，要非常謹慎

::: en
A **wait queue** is a list of sleeping processes waiting for a condition. The consumer calls `wait_event_interruptible(queue, condition)` to sleep; the producer sets the condition and calls `wake_up(&queue)` to wake everyone up. Use `wait_event_interruptible` (can be interrupted by signals, returns `-ERESTARTSYS`) in almost all cases; non-interruptible waits block even `SIGKILL` and must be used carefully.
:::

::: src
出處 Source：LKMPG Ch. 9 (Blocking Processes and Threads). sysprog21.github.io/lkmpg
:::

## 為什麼重要 · Why it matters

**Busy-wait（壞）vs Blocking（好）**：

```c
// ❌ 忙等 — 佔滿 CPU core，其他行程被餓死
while (!condition) cpu_relax();

// ✅ 睡眠等 — 行程掛起，CPU 給其他人用
wait_event_interruptible(my_queue, condition);
```

`kfetch` 作業用 `mutex_trylock` 是「**若鎖被佔用就直接拒絕（-EBUSY）**」，不進入等待。這是刻意選擇：裝置是個簡單的一次性讀取工具，不值得讓第二個行程排隊等。

若要支援多個 reader 排隊等待，就需要 wait queue：
```c
// kfetch_open 改成等待版本：
wait_event_interruptible(open_queue, !device_in_use);
device_in_use = 1;
```

::: en
**Busy-wait wastes CPU; blocking is cooperative**. `kfetch` uses `mutex_trylock` (returns `-EBUSY` immediately if locked) — a deliberate choice for a simple one-shot device. If you wanted multiple readers to queue up, you'd replace it with a wait queue: `wait_event_interruptible(open_queue, !device_in_use)`.
:::

::: src
出處 Source：LKMPG Ch. 9. 作者對比整合。
:::

## 一句話帶走 · Takeaway

Wait queue = kernel 的「叫號等待區」，讓行程睡眠而非忙轉；`wake_up` 是廣播器，`wait_event_interruptible` 是在等候室入睡，signal 可以把人喚醒離開。

::: en
Wait queue = the kernel's "take-a-number waiting area" — processes sleep instead of spinning. `wake_up` broadcasts the wake; `wait_event_interruptible` is the sleep that signals can interrupt.
:::
