---
id: "67"
slug: shared-memory-ipc
tag: Linux
title: Shared Memory IPC：最快的行程間通訊
title_en: "Shared Memory IPC: The Fastest Inter-Process Communication"
title_short: Shared Memory IPC
summary: Shared memory 讓多個行程直接共用同一塊實體記憶體，資料不需複製，是所有 IPC 機制中吞吐量最高的；代價是必須自行用 semaphore 或 mutex 協調存取。
summary_en: Shared memory lets multiple processes map the same physical memory — no copying, maximum throughput. The tradeoff is that you must coordinate access yourself with a semaphore or mutex.
links: [66-process-fork-exec, 68-posix-threads-mutex]
---

## 是什麼 · What it is

兩種 API，選 POSIX（`shm_open`）或 System V（`shmget`）：

```c
// === POSIX Shared Memory（現代推薦）===
#include <sys/mman.h>
#include <fcntl.h>

// 建立 / 開啟共享物件
int fd = shm_open("/myshm", O_CREAT | O_RDWR, 0600);
ftruncate(fd, sizeof(SharedData));

// 映射到虛擬位址空間
SharedData *shm = mmap(NULL, sizeof(SharedData),
                       PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
close(fd);  // fd 可以關了，映射已建立

// 存取共享記憶體（需要同步！）
shm->counter++;

// 清除
munmap(shm, sizeof(SharedData));
shm_unlink("/myshm");
```

```c
// === System V（較舊，常見於考題）===
#include <sys/shm.h>

key_t key = ftok("/tmp", 42);
int shmid = shmget(key, sizeof(SharedData), IPC_CREAT | 0600);
SharedData *shm = shmat(shmid, NULL, 0);
// 使用後
shmdt(shm);
shmctl(shmid, IPC_RMID, NULL);
```

**比較其他 IPC**：

| 機制 | 吞吐量 | 需複製 | 適用場景 |
|------|--------|--------|---------|
| Shared Memory | ★★★★★ | 否 | 大量資料、同機器 |
| Pipe / FIFO | ★★★ | 是（kernel buffer） | 串流、parent↔child |
| Socket | ★★ | 是（2次） | 跨機器、跨語言 |
| Message Queue | ★★★ | 是 | 訊息型、有邊界 |

::: en
POSIX shared memory (`shm_open` + `mmap`) maps the same physical pages into two or more processes' virtual address spaces. No data is copied — a write in process A is immediately visible in process B. That's also the danger: without synchronization, concurrent writes corrupt the data. Use a POSIX semaphore (`sem_open`) or a `pthread_mutex` with `PTHREAD_PROCESS_SHARED` as the guard.
:::

::: src
出處 Source：APUE Ch. 15 (IPC); POSIX.1-2017 §3.357; nctu-ms07 OS HW2 Shared Memory Assignment.
:::

## 為什麼重要 · Why it matters

```c
// 兩行程共用的控制結構——mutex 要設 PROCESS_SHARED
typedef struct {
    pthread_mutex_t lock;   // 必須 PTHREAD_PROCESS_SHARED
    int counter;
    char buf[4096];
} SharedData;

// 初始化（建立方）：
pthread_mutexattr_t attr;
pthread_mutexattr_init(&attr);
pthread_mutexattr_setpshared(&attr, PTHREAD_PROCESS_SHARED);
pthread_mutex_init(&shm->lock, &attr);
```

**mmap vs shmget**：`mmap(MAP_SHARED)` 也可以直接映射普通檔案作為 IPC（file-backed shared memory），不需要 `shm_open`；`shmget` 是 System V 的做法，兩者底層都是 kernel 的匿名記憶體頁。

::: en
The classic pitfall: forgetting `PTHREAD_PROCESS_SHARED` on the mutex attribute. Without it, the mutex is only valid within one process's address space — it silently misbehaves across process boundaries. Set the attribute before `pthread_mutex_init` when the lock lives in shared memory. Alternatively, use a POSIX named semaphore (`sem_open`/`sem_wait`/`sem_post`) which is always process-shared by design.
:::

::: src
出處 Source：APUE Ch. 15; "The Linux Programming Interface" Ch. 54 (POSIX Shared Memory). 作者整合。
:::

## 一句話帶走 · Takeaway

Shared memory = 零複製的行程間通訊，是最快的 IPC；代價是共享記憶體沒有自動保護，race condition 需要自行用 semaphore 或 mutex 防守。

::: en
Shared memory = zero-copy IPC, highest throughput of all IPC mechanisms. The cost: no automatic protection — you own the synchronization. Forget the semaphore and you have a silent race condition.
:::
