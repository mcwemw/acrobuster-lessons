---
id: "63"
slug: system-calls
tag: Linux
title: System Call：User-Space 進 Kernel 的唯一正門
title_en: "System Calls: The Only Legitimate Gate from User-Space into the Kernel"
title_short: System Call 機制
summary: System call 是 user-space 程式唯一能合法進入 kernel 的路徑；x86 透過 `syscall` 指令，RISC-V 透過 `ecall`，完成特權切換（ring 3 → ring 0）。
summary_en: A system call is the only legitimate path from user-space into the kernel. On x86 it uses the `syscall` instruction; on RISC-V, `ecall`. Both trigger a privilege-level transition (user mode → kernel mode).
links: [58-linux-kernel-module-basics, 60-kernel-user-data-transfer]
---

## 是什麼 · What it is

當 user-space 程式呼叫 `read(fd, buf, n)` 時，發生的事情：

```
user-space:  libc read() → 把 syscall number 放進暫存器 → syscall/ecall 指令
                                           ↓ 特權切換（ring 3 → ring 0）
kernel-space: 系統呼叫分派表 → sys_read() → VFS → driver → copy_to_user → 返回
                                           ↑ 特權恢復（ring 0 → ring 3）
```

**RISC-V 細節**：`ecall`（Environment Call）指令觸發 trap，CPU 跳到 `stvec` 暫存器指向的 trap handler；系統呼叫號放在 `a7`，參數在 `a0–a5`。

從 kernel module 視角，系統呼叫就是你實作的 `file_operations` 被呼叫的時機：user 呼叫 `read(fd, ...)` → 最終進入你的 `kfetch_read()`。

**系統呼叫攔截**（LKMPG Ch. 8 的示範概念，不建議生產使用）：

```c
// 找到 sys_call_table 並替換某個 entry
// 需要先關掉寫保護，完事後再開回來
// ⚠️ 這會影響整個系統——只用於學習/研究
```

::: en
When user-space calls `read(fd, buf, n)`: libc puts the syscall number in a register, executes `syscall` (x86) or `ecall` (RISC-V), triggering a privilege transition to ring 0. The kernel dispatches through the syscall table to `sys_read()`, which flows through VFS → driver → `copy_to_user`, then returns to user mode. From a module's perspective, your `file_operations` callbacks *are* the system call implementation — `read(fd)` eventually reaches your `kfetch_read()`.
:::

::: src
出處 Source：LKMPG Ch. 8 (System Calls). sysprog21.github.io/lkmpg; RISC-V ISA Spec §3.2 (ecall)
:::

## 為什麼重要 · Why it matters

理解 syscall 機制有三個直接工程含義：

1. **User pointer 不可信**：syscall 是特權邊界，user 傳入的指標跨越了這道邊界，所以需要 `copy_from_user`（見卡片 [[60-kernel-user-data-transfer]]）。

2. **不可睡眠的路徑**：某些 kernel 路徑（中斷處理）不能呼叫可能睡眠的函式；syscall 路徑（process context）可以，所以 `mutex_lock` 在這裡合法。

3. **性能代價**：每次 syscall 有 user→kernel→user 的切換代價（flush TLB、特權切換、cache miss）。高頻操作（如圖形渲染）會用 mmap 共享記憶體來避免頻繁 syscall。

::: en
Three direct engineering implications: (1) **User pointers cross the privilege boundary** — that's why `copy_from_user` is mandatory. (2) **Process context can sleep** — syscalls run in process context, so `mutex_lock` (sleeping) is safe; interrupt handlers can't sleep. (3) **Syscalls have overhead** — each crossing flushes parts of TLB and cold-starts caches; high-frequency paths use `mmap` to avoid repeated crossings.
:::

::: src
出處 Source：LKMPG Ch. 8; LKD Ch. 5 (System Calls). 作者整合。
:::

## 一句話帶走 · Takeaway

System call = CPU 特權切換的唯一合法門；你的 `file_operations` 就是這道門後面的 kernel-side 實作，所以 user pointer 一進來就必須用 `copy_from_user` 驗證。

::: en
A system call is the only legitimate CPU privilege gate. Your `file_operations` is the kernel-side code behind that gate — which is exactly why user-supplied pointers must be validated with `copy_from_user` on arrival.
:::
