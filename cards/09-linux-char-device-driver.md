---
id: "09"
slug: linux-char-device-driver
tag: 軟體工程
title: Character Device Driver：用 file_operations 把裝置接進 VFS
title_en: "Character Device Driver: Hooking a Device into the VFS via file_operations"
title_short: 字元裝置驅動
summary: 字元裝置讓 user-space 程式可以像讀寫普通檔案一樣操作硬體；misc_register 是最簡潔的做法，自動搞定裝置號碼和 /dev/ 節點。
summary_en: Character devices let user-space programs interact with hardware exactly like a regular file. `misc_register` is the cleanest path — it handles device numbers and /dev node creation automatically.
links: [08-linux-kernel-module-basics, 10-kernel-user-data-transfer, 11-kernel-mutex]
---

## 是什麼 · What it is

Linux 把所有輸入輸出都抽象成「檔案」。字元裝置（character device）是其中一種：每次讀寫都是串流式的，`/dev/tty`、`/dev/random` 都是例子。

實作字元裝置需要兩件事：

**1. 填 `file_operations` 結構**（你的 handler table）

```c
static const struct file_operations kfetch_ops = {
    .owner   = THIS_MODULE,
    .open    = kfetch_open,
    .release = kfetch_release,
    .read    = kfetch_read,
    .write   = kfetch_write,
};
```

**2. 用 `misc_register` 註冊**（最簡方式，自動分配 minor number 並建立 `/dev/kfetch`）

```c
static struct miscdevice kfetch_misc = {
    .minor = MISC_DYNAMIC_MINOR,
    .name  = "kfetch",           /* /dev/kfetch */
    .fops  = &kfetch_ops,
    .mode  = 0666,               /* rw-rw-rw- */
};

static int __init kfetch_init(void) {
    return misc_register(&kfetch_misc);
}
static void __exit kfetch_exit(void) {
    misc_deregister(&kfetch_misc);
}
```

`misc_register` 透過 Linux devtmpfs 在模組載入瞬間自動創建 `/dev/kfetch`，不需要手動 `mknod`。

::: en
Linux abstracts all I/O as "files." A character device is one variant: byte-stream, like `/dev/tty` or `/dev/random`. Implementing one requires two things: (1) fill a `file_operations` struct with your handler callbacks, and (2) register with `misc_register` — it auto-assigns a minor number and auto-creates the `/dev/kfetch` node via devtmpfs. No manual `mknod` needed.
:::

::: src
出處 Source：LKMPG Ch. 4 (Character Device Drivers), Ch. 9 (Talking to Device Files). sysprog21.github.io/lkmpg
:::

## 為什麼重要 · Why it matters

| 方式 | 適用場景 | 要自己處理 |
|------|---------|-----------|
| `register_chrdev` (舊式) | 傳統驅動 | major/minor number、`mknod` |
| `cdev` + `class` (現代) | 生產級驅動 | 更多初始化步驟 |
| **`misc_register`** | 教學、原型、小工具 | **幾乎不用** |

`file_operations` 是整個 Linux VFS 的「插頭」設計精髓：你提供 handler，VFS 決定什麼時候呼叫你。user-space 的 `read(fd, ...)` → 系統呼叫 → kernel VFS → `kfetch_read()`，整條鏈路是標準 C struct 函式指標。

這就是為什麼 Linux 能讓一切都是檔案——靠的就是這個統一的 hook 表。

::: en
`file_operations` is the "plug" into Linux VFS: you provide the callbacks; VFS decides when to call them. `user-space read(fd)` → syscall → VFS → `kfetch_read()` — the whole chain is function pointers in a plain C struct. This is why Linux can treat everything as a file — one unified hook table.
:::

::: src
出處 Source：LKMPG Ch. 4; LKD (Linux Kernel Development, Love) Ch. 13. 作者觀點整合。
:::

## 一句話帶走 · Takeaway

Kernel 裡的「讀寫檔案」，就是填滿 `file_operations` 結構的函式指標，然後把自己掛進 VFS；`misc_register` 讓這件事只要幾行程式碼。

::: en
"File I/O" in the kernel means filling a `file_operations` struct with function pointers and hooking into VFS. `misc_register` makes it a few lines of code.
:::
