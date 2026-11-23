---
id: "70"
slug: fuse-userspace-fs
tag: Linux
title: FUSE：在 User-Space 實作檔案系統
title_en: "FUSE: Implementing a Filesystem in User Space"
title_short: FUSE 使用者空間 FS
summary: FUSE (Filesystem in Userspace) 讓你用普通使用者程式碼實作完整的 Linux 檔案系統，不用寫 kernel module；VFS 把操作透過 /dev/fuse 轉發，程序回傳結果，對上層完全透明。
summary_en: FUSE lets you implement a fully functional Linux filesystem as a regular user-space program — no kernel module needed. The kernel's VFS layer proxies all filesystem calls through /dev/fuse to your process, which handles them and returns results transparently.
links: [59-linux-char-device-driver, 62-proc-filesystem, 63-system-calls]
---

## 是什麼 · What it is

**架構**：

```
user: open("/mnt/myfuse/hello.txt")
         ↓
kernel VFS → /dev/fuse (kernel driver) ──→ FUSE daemon (user process)
                                               │
                                            你的 C/C++ 程式碼
                                               │
         ↑ 回傳結果（errno, 資料, stat）←──────┘
```

**libfuse 低階 API**：

```c
#include <fuse3/fuse.h>

static int hello_getattr(const char *path, struct stat *st,
                         struct fuse_file_info *fi) {
    if (strcmp(path, "/") == 0) {
        st->st_mode = S_IFDIR | 0755;
        st->st_nlink = 2;
    } else if (strcmp(path, "/hello.txt") == 0) {
        st->st_mode = S_IFREG | 0444;
        st->st_size = 13;
    } else {
        return -ENOENT;
    }
    return 0;
}

static int hello_read(const char *path, char *buf, size_t size,
                      off_t offset, struct fuse_file_info *fi) {
    if (strcmp(path, "/hello.txt") != 0) return -ENOENT;
    const char *content = "Hello, FUSE!\n";
    size_t len = strlen(content);
    if (offset >= len) return 0;
    size = MIN(size, len - offset);
    memcpy(buf, content + offset, size);
    return size;
}

static struct fuse_operations ops = {
    .getattr = hello_getattr,
    .read    = hello_read,
    // 實作越多 ops，支援的功能越多
};

int main(int argc, char *argv[]) {
    return fuse_main(argc, argv, &ops, NULL);
}
```

```bash
# 掛載
./hello_fuse /mnt/myfuse -f   # -f = foreground（除錯用）
cat /mnt/myfuse/hello.txt     # 輸出 "Hello, FUSE!"
fusermount -u /mnt/myfuse     # 卸載
```

::: en
FUSE intercepts VFS calls at the kernel level and routes them to a userspace daemon via `/dev/fuse`. Your daemon implements `fuse_operations` callbacks — `getattr`, `read`, `write`, `readdir`, `open`, `create`, `mkdir`, etc. Each is exactly one VFS operation. libfuse handles the message-passing loop; you just fill in the callbacks. The result is a complete, mountable filesystem implemented entirely in user space — no reboot, no kernel module signing, debuggable with `gdb`.
:::

::: src
出處 Source：libfuse3 documentation; nctu-ms07 OS HW5 FUSE Assignment; "To FUSE or Not to FUSE" (FAST 2017).
:::

## 為什麼重要 · Why it matters

**FUSE 的工程應用**（不只是作業）：

| 應用 | 工具 |
|------|------|
| 加密檔案系統 | gocryptfs, encfs |
| 雲端掛載 | s3fs (S3), rclone（你在用！）|
| 壓縮透明掛載 | fuse-zip, archivemount |
| 版本控制 FS | git-fuse |
| 遠端 SSH 掛載 | sshfs |

rclone 就是 FUSE 的應用：把 Google Drive 掛成本地目錄，`ls ~/gdrive` 實際上呼叫的是 rclone 的 FUSE daemon，它把 VFS 操作翻譯成 Drive API 呼叫。

**FUSE 的代價**：每次 syscall 要多一次 user↔kernel 往返（相比 in-kernel FS 多 2 次上下文切換）。大量小 I/O 時性能明顯低於 ext4；大塊順序讀寫差距不大。

::: en
Real-world FUSE examples you've probably used: `rclone mount` (Google Drive as a local directory — that's your machine), `sshfs` (remote directory over SSH). The performance cost: each VFS call involves an extra round-trip through `/dev/fuse` — roughly 2 extra context switches vs. an in-kernel filesystem. For metadata-heavy workloads (many small files, many `stat` calls), this hurts. For large sequential I/O, the gap is small. It's a worthwhile tradeoff for correctness, security isolation, and debuggability.
:::

::: src
出處 Source：Vangoor et al. "To FUSE or Not to FUSE" (FAST 2017); libfuse3 README; rclone source (backend/vfs). 作者整合。
:::

## 一句話帶走 · Takeaway

FUSE = VFS 的鉤子，讓你在 user-space 用普通程式碼實作 Linux 檔案系統；代價是多一次 kernel↔user 往返，優點是不用寫 kernel module，可以 `gdb`，崩了也不會 panic 整台機器。

::: en
FUSE = VFS hooks in user space. You implement `fuse_operations` callbacks, mount the filesystem with `fuse_main`, and the kernel routes every VFS call to your program. Cost: one extra kernel↔user round-trip per syscall. Benefit: no kernel module, fully debuggable, process-isolated — a crash is just an unmount, not a kernel panic.
:::
