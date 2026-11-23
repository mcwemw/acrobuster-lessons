---
id: "68"
slug: posix-threads-mutex
tag: Linux
title: POSIX Threads：共享記憶體的並行模型
title_en: "POSIX Threads: The Shared-Memory Concurrency Model"
title_short: Pthreads & Mutex
summary: Pthread 讓同一行程內多條執行緒共享位址空間，省去 IPC 的複製開銷；mutex 保護共享狀態，condition variable 讓執行緒等待條件成立而非 busy-wait。
summary_en: Pthreads run multiple threads within one process, sharing the address space — no IPC copying. Mutex guards shared state; condition variables let threads wait for conditions without spinning.
links: [61-kernel-mutex, 67-shared-memory-ipc, 64-blocking-processes-waitqueue]
---

## 是什麼 · What it is

```c
#include <pthread.h>

// 共享狀態
static int counter = 0;
static pthread_mutex_t mtx = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t  cond = PTHREAD_COND_INITIALIZER;
static int ready = 0;

// 工作執行緒
void *worker(void *arg) {
    pthread_mutex_lock(&mtx);
    counter++;
    pthread_mutex_unlock(&mtx);
    return NULL;
}

// 生產者
void producer(void) {
    pthread_mutex_lock(&mtx);
    ready = 1;
    pthread_cond_signal(&cond);   // 喚醒一個等待者
    pthread_mutex_unlock(&mtx);
}

// 消費者（等待 ready）
void consumer(void) {
    pthread_mutex_lock(&mtx);
    while (!ready)                // ⚠️ 必須用 while，不是 if（spurious wakeup）
        pthread_cond_wait(&cond, &mtx);  // 睡眠並自動釋放 mtx
    // ready == 1，繼續工作
    pthread_mutex_unlock(&mtx);
}

int main(void) {
    pthread_t tid[4];
    for (int i = 0; i < 4; i++)
        pthread_create(&tid[i], NULL, worker, NULL);
    for (int i = 0; i < 4; i++)
        pthread_join(tid[i], NULL);
    printf("counter = %d\n", counter);  // 應該是 4
}
```

**Thread Pool 模式**（NYCU HW3 核心）：

```
主執行緒  ──→  工作佇列  ←── worker threads（固定數量）
                 ↑
             mutex + cond 保護
```

```c
// 任務入列
pthread_mutex_lock(&q_mtx);
enqueue(task);
pthread_cond_signal(&q_cond);
pthread_mutex_unlock(&q_mtx);

// worker 取任務
pthread_mutex_lock(&q_mtx);
while (queue_empty())
    pthread_cond_wait(&q_cond, &q_mtx);
Task *t = dequeue();
pthread_mutex_unlock(&q_mtx);
do_task(t);
```

::: en
`pthread_create` spawns a thread sharing the same virtual address space — no `fork`, no copy-on-write overhead. `pthread_mutex_lock/unlock` guards critical sections; `pthread_cond_wait` atomically releases the mutex and sleeps, then reacquires it on wake. **Always use `while (!condition)` around `cond_wait`** — POSIX allows spurious wakeups where the condition hasn't actually changed. `pthread_join` waits for a thread to finish and frees its resources (like `waitpid` for processes).
:::

::: src
出處 Source：POSIX.1-2017 §4 (Threads); APUE Ch. 11 (Threads); nctu-ms07 OS HW3 Thread Pool Assignment.
:::

## 為什麼重要 · Why it matters

**Thread vs Process 的基本選型**：

| | Process (`fork`) | Thread (`pthread`) |
|--|-----------------|-------------------|
| 位址空間 | 獨立（fork 後 copy-on-write） | 共享 |
| 通訊 | IPC（pipe/shm/socket） | 直接讀寫（需鎖） |
| 崩潰影響 | 子行程死，父不受影響 | 一個 thread crash → 整個行程死 |
| 建立代價 | 較高（需 mmap、複製 fd table）| 低（只建 stack） |
| 適用 | 安全隔離、multicore 純計算 | 共享大型資料結構、低延遲 |

**常見 bug**：
- **忘了 `while`**（用 `if` 判斷 condition）→ spurious wakeup 導致繼續跑但 condition 未滿足
- **lock 裡面 sleep**（`pthread_cond_wait` 外沒拿到鎖）→ undefined behavior
- **忘了 `pthread_join`**（thread 資源洩漏，或行程結束前 thread 還跑著）

::: en
The critical invariant: **always check the condition in a `while` loop, never `if`**. POSIX explicitly allows spurious wakeups — the OS may wake a thread even when no signal/broadcast was sent. The `while` loop re-checks and re-sleeps if needed. This is not a bug in pthread; it's intentional for portability across locking implementations.
:::

::: src
出處 Source：APUE Ch. 11; "The Art of Multiprocessor Programming" (Herlihy & Shavit) Ch. 1. 作者整合。
:::

## 一句話帶走 · Takeaway

Pthread = 同一行程內的並行；mutex + condition variable 是標準同步原語；`cond_wait` 外面一定要用 `while`，不是 `if`，因為 POSIX 允許 spurious wakeup。

::: en
Pthreads = concurrency within one process. The standard sync pattern is mutex + condvar. **Use `while`, not `if`**, around `cond_wait` — spurious wakeups are POSIX-compliant behavior, not a bug.
:::
