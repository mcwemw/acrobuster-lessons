---
id: "58"
slug: linux-kernel-module-basics
tag: 軟體工程
title: Linux Kernel Module：動態插拔的 Kernel 擴充單元
title_en: "Linux Kernel Module: Dynamically Loadable Kernel Extensions"
title_short: Kernel Module 基礎
summary: Kernel module 讓你在不重新編譯 kernel 的情況下動態擴充功能；代價是不能用 C 標準函式庫，也不能假設自己跑在 user space。
summary_en: Kernel modules let you extend the kernel at runtime without recompiling it — the trade-off is losing the C standard library and all user-space assumptions.
links: [09-linux-char-device-driver, 10-kernel-user-data-transfer]
---

## 是什麼 · What it is

Linux 把可選功能設計成**可動態載入的 `.ko` 模組**，不用重啟、不用重新編譯整顆 kernel。用 `insmod` 載入、`rmmod` 移除；`lsmod` 查看當前載入清單。

每個模組都有兩個強制入口點：

```c
static int __init mymod_init(void) { ... }   // insmod 時呼叫
static void __exit mymod_exit(void) { ... }  // rmmod 時呼叫
module_init(mymod_init);
module_exit(mymod_exit);
MODULE_LICENSE("GPL");
```

**關鍵限制**：kernel module 跑在 **kernel space**，不能呼叫 `printf`、`malloc`、`fopen` 等 libc 函式（它們都是 user-space 才有的）；改用 `pr_info`、`kmalloc`、proc/sysfs 介面。

::: en
Linux packages optional features as **dynamically loadable `.ko` modules** — no reboot, no kernel recompile. `insmod` loads, `rmmod` removes, `lsmod` lists. Every module needs two mandatory hooks: `module_init` (called at load) and `module_exit` (called at unload). **Key constraint**: a module runs in **kernel space** and cannot call libc functions like `printf`, `malloc`, or `fopen` — use kernel equivalents (`pr_info`, `kmalloc`, proc/sysfs).
:::

::: src
出處 Source：The Linux Kernel Module Programming Guide (LKMPG), Ch. 1–3. sysprog21.github.io/lkmpg
:::

## 為什麼重要 · Why it matters

| 傳統做法 | Kernel Module |
|---------|--------------|
| 把功能燒進 kernel，重新編譯 | 只編 `.ko`，動態插拔 |
| 更新要重啟 | 不重啟 |
| 一個 bug 破壞整顆 kernel | 移除模組即可 |

從「寫 kernel module」這件事學到的最大認知跳躍是：**你不再有 OS 幫你管記憶體、不再有 user mode 保護**。你的 bug 直接 kernel panic。這讓你真正感受到 user space 保護層的存在。

::: en
The biggest cognitive leap from writing kernel modules: **the OS no longer protects you** — no user mode, no automatic memory management. A bug causes a kernel panic. This makes you *feel* the user-space protection layer that you usually take for granted.
:::

::: src
出處 Source：作者觀點 (Author's view)，整合自 LKMPG Ch. 1–3 實作體驗。
:::

## 一句話帶走 · Takeaway

Kernel module = 可插拔的 kernel 擴充，但你進入了一個沒有 libc、沒有 user-space 護欄的世界——一切都靠自己管理。

::: en
A kernel module is a plug-in for the kernel, but you're entering a world without libc and without user-space safety nets — you manage everything yourself.
:::
