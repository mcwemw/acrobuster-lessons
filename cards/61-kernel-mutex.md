---
id: "61"
slug: kernel-mutex
tag: Linux
title: Kernel Mutex：DEFINE_MUTEX 與 mutex_trylock 防競態
title_en: "Kernel Mutex: DEFINE_MUTEX and mutex_trylock for Race-Free Device Access"
title_short: Kernel 互斥鎖
summary: Kernel 的共用資料要靠 mutex 保護；字元裝置的慣用做法是在 open 用 trylock（已鎖就回 EBUSY），在 release 解鎖，讓同一時間只有一個行程能存取裝置。
summary_en: Shared kernel data needs mutex protection. The idiomatic character device pattern uses `trylock` in open (returns `EBUSY` if already locked) and `unlock` in release — ensuring only one process accesses the device at a time.
links: [09-linux-char-device-driver, 10-kernel-user-data-transfer]
---

## 是什麼 · What it is

Kernel 裡同樣有多執行緒（多 CPU 核心、中斷、並發系統呼叫）。若兩個行程同時 `open → read`，可能同時呼叫 `build_kfetch_buf()`，對同一個靜態 `kfetch_buf` 寫入 → **data race**。

Linux kernel mutex 的核心 API：

```c
/* 靜態宣告（module 層級） */
static DEFINE_MUTEX(kfetch_mutex);

/* 嘗試加鎖（非阻塞）：成功回 1，已被鎖回 0 */
mutex_trylock(&kfetch_mutex);

/* 解鎖 */
mutex_unlock(&kfetch_mutex);

/* 阻塞加鎖（會睡眠等待） */
mutex_lock(&kfetch_mutex);
```

字元裝置的慣用保護模式：

```c
static int kfetch_open(struct inode *inode, struct file *filp) {
    if (!mutex_trylock(&kfetch_mutex))
        return -EBUSY;  /* 已有人開著，拒絕 */
    return 0;
}

static int kfetch_release(struct inode *inode, struct file *filp) {
    mutex_unlock(&kfetch_mutex);
    return 0;
}
```

**為什麼用 `trylock` 而不是 `lock`？** `mutex_lock` 會讓當前行程睡眠等待，可能在 open 路徑造成長時間阻塞。`trylock` 直接拒絕並回傳 `-EBUSY`，讓 user-space 程式自己決定要不要重試。

::: en
Kernel code runs with multiple CPUs, concurrent syscalls, and interrupts. Two processes calling `open → read` simultaneously could both call `build_kfetch_buf()` and corrupt the shared `kfetch_buf` — a data race. Linux's mutex API: `DEFINE_MUTEX` to declare, `mutex_trylock` (non-blocking: returns 1 on success, 0 if already locked), `mutex_unlock`, and `mutex_lock` (sleeping wait). The idiomatic device pattern uses `trylock` in `open` (returns `-EBUSY` immediately if locked) — avoiding long blocking in the open path and letting user-space handle the retry.
:::

::: src
出處 Source：LKMPG Ch. 10 (Avoiding Collisions and Deadlocks). sysprog21.github.io/lkmpg
:::

## 為什麼重要 · Why it matters

| 情境 | 不加 mutex | 加 mutex (trylock) |
|------|-----------|-------------------|
| 兩個程式同時 open | 兩者都進 read | 第二個收到 EBUSY |
| 並發 build_kfetch_buf | 競態，輸出亂掉 | 序列化，輸出正確 |
| 其中一個 panic | kernel crash | 仍可能 crash，但不會是競態 |

Kernel mutex 與 user-space `pthread_mutex_t` 最大的差異：**kernel mutex 不能在中斷處理器（interrupt handler）裡使用**（中斷不能睡眠）。中斷場景改用 `spinlock`。這個 `kfetch` 裝置在一般系統呼叫路徑，可以安全用 mutex。

::: en
Key difference from user-space `pthread_mutex_t`: **kernel mutex cannot be used in interrupt handlers** (interrupts can't sleep). Use `spinlock` there. The `kfetch` device runs in normal syscall context, so mutex is safe. The `trylock`-in-open / `unlock`-in-release pattern ensures only one process holds the device at a time, serializing buffer access without blocking indefinitely.
:::

::: src
出處 Source：LKMPG Ch. 10; LKD Ch. 9 (An Introduction to Kernel Synchronization). 作者整合。
:::

## 一句話帶走 · Takeaway

Kernel 的共用資料用 `DEFINE_MUTEX` 保護；在 `open` 用 `trylock`（已鎖回 EBUSY），在 `release` 解鎖——比阻塞等待更適合裝置驅動的用法。

::: en
Protect shared kernel data with `DEFINE_MUTEX`. Use `trylock` in `open` (returns `EBUSY` if locked) and `unlock` in `release` — cleaner than blocking-wait for device drivers.
:::
