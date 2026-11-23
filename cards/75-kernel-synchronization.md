---
id: "75"
slug: kernel-synchronization
tag: Linux
title: Kernel 同步：Spinlock、Semaphore 與 RCU
title_en: "Kernel Synchronization: Spinlock, Semaphore, and RCU"
title_short: Kernel 同步機制
summary: Kernel 同步工具依「是否可睡眠」和「讀/寫比例」分工：spinlock 用於中斷情境（不能睡眠），mutex/semaphore 用於行程情境（可睡眠），RCU 專為多讀少寫的資料結構設計。
summary_en: Kernel synchronization tools specialize by context and access pattern. Spinlock for interrupt context (non-sleeping). Mutex/semaphore for process context (can sleep). RCU (Read-Copy-Update) for read-mostly data structures — readers are lock-free and wait-free.
links: [61-kernel-mutex, 65-interrupt-handlers, 68-posix-threads-mutex]
---

## 是什麼 · What it is

### 1. Spinlock — 忙等，不可睡眠

```c
#include <linux/spinlock.h>

static DEFINE_SPINLOCK(my_lock);

// 在中斷情境或需要禁止 preemption 的地方
spin_lock(&my_lock);
/* critical section */
spin_unlock(&my_lock);

// 若 critical section 可能在中斷處理器中被訪問
// → 用 spin_lock_irqsave（關本地中斷）
unsigned long flags;
spin_lock_irqsave(&my_lock, flags);
/* critical section */
spin_unlock_irqrestore(&my_lock, flags);
```

### 2. Semaphore & Mutex — 可睡眠

```c
#include <linux/semaphore.h>

static DEFINE_SEMAPHORE(my_sem, 1);  // 初始值 1 = binary semaphore = mutex

down(&my_sem);        // 若 count=0，行程睡眠
/* critical section */
up(&my_sem);          // 喚醒等待者

// Mutex（比 semaphore 語義更嚴格：只有 lock 的人可以 unlock）
#include <linux/mutex.h>
static DEFINE_MUTEX(my_mutex);
mutex_lock(&my_mutex);
/* critical section */
mutex_unlock(&my_mutex);
```

### 3. RCU（Read-Copy-Update）— 無鎖讀

```c
#include <linux/rcupdate.h>

// 讀者：不需要鎖，只要在 RCU read-side critical section 內
rcu_read_lock();
struct Node *p = rcu_dereference(global_ptr);  // 安全解參考
/* 使用 p，不能睡眠 */
rcu_read_unlock();

// 寫者：複製、修改、原子交換指標
struct Node *new = kmalloc(...);
*new = *old;        // 複製
new->value = 42;    // 修改副本
rcu_assign_pointer(global_ptr, new);    // 原子換指標
synchronize_rcu();  // 等所有進行中的 reader 結束
kfree(old);         // 安全釋放舊版本
```

::: en
**Spinlock**: CPU spins in a tight loop until the lock is free — no context switch, no sleeping. Fast for short critical sections; mandatory in interrupt context where sleeping is forbidden. `spin_lock_irqsave` also disables local interrupts, preventing deadlock when the same lock is used in an interrupt handler. **Semaphore/Mutex**: the waiting task goes to sleep (put on a wait queue), freeing the CPU. Only valid in process context. Use `mutex_lock` for exclusive access; it enforces the ownership invariant (only the locker may unlock). **RCU**: readers are always lock-free and can run concurrently with the writer. The writer atomically swaps a pointer to a new version, then waits for a "grace period" (all pre-existing readers finish) before freeing the old version. Ideal for routing tables, network protocol data, and any read-dominated data structure.
:::

::: src
出處 Source：NYCU OSDI Week 11 (Kernel Synchronization); LKD Ch. 9-10; McKenney "What is RCU, Fundamentally?" (LWN 2007).
:::

## 為什麼重要 · Why it matters

**選型決策樹**：

```
是否在中斷情境 / 不可睡眠？
  是 → Spinlock（+ irqsave 若有 IRQ 競爭）
  否（process context）→
      讀多寫少（如 routing table）？
        是 → RCU（讀者零開銷）
        否 → 只需要排他存取 → Mutex
             需要計數型信號（N 個並行）→ Semaphore
```

**常見 bug**：

| Bug | 後果 |
|-----|------|
| spinlock 內呼叫 `kmalloc(GFP_KERNEL)`（可睡眠） | 核心掛死或 BUG_ON |
| mutex_lock 後忘了 unlock（返回前有多條 path） | 死鎖，`D` state 行程永遠掛著 |
| RCU reader 在 `rcu_read_lock()` 內睡眠 | 破壞 grace period 保證，潛在 UAF |
| `spin_lock` 而非 `spin_lock_irqsave`（IRQ 也用同一鎖） | 同 CPU 中斷打斷自己，自我死鎖 |

::: en
The most dangerous mistake: calling any function that might sleep (memory allocation with `GFP_KERNEL`, `mutex_lock`, `copy_from_user`) while holding a spinlock. The kernel will either BUG_ON or silently corrupt state. When in doubt about whether a function can sleep, check `might_sleep()` annotations in the kernel source — they insert debug assertions that fire in spinlock context. For lock-ordering, always document the lock order and use `lockdep` (CONFIG_PROVE_LOCKING) to automatically detect deadlock cycles in development.
:::

::: src
出處 Source：LKD Ch. 9 (An Introduction to Kernel Synchronization), Ch. 10 (Kernel Synchronization Methods); McKenney RCU articles at LWN.net. 作者整合。
:::

## 一句話帶走 · Takeaway

Spinlock = 中斷情境的快鎖（不睡眠），Mutex = 行程情境的慢鎖（可睡眠），RCU = 讀者零成本、寫者複製後等 grace period；選錯情境就是死鎖或核心崩潰。

::: en
Spinlock = fast non-sleeping lock for interrupt context. Mutex = sleeping lock for process context. RCU = zero-overhead readers via copy-on-write pointer swap. Pick the wrong one for the context and you get a deadlock or kernel BUG_ON.
:::
