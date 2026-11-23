---
id: "74"
slug: vfs-virtual-filesystem
tag: Linux
title: VFS：統一的虛擬檔案系統抽象層
title_en: "VFS: The Unified Virtual Filesystem Abstraction"
title_short: VFS 虛擬檔案系統
summary: VFS (Virtual File System) 是 Linux 的檔案系統抽象層，讓 ext4、tmpfs、procfs、FUSE 以及網路 FS 都能接受相同的 open/read/write/stat syscall；核心物件是 superblock、inode、dentry、file。
summary_en: VFS is Linux's filesystem abstraction — it lets ext4, tmpfs, procfs, FUSE, and network filesystems all respond to the same open/read/write/stat system calls. The four core objects are superblock, inode, dentry, and file.
links: [70-fuse-userspace-fs, 62-proc-filesystem, 63-system-calls]
---

## 是什麼 · What it is

**VFS 四大物件**：

```
superblock   → 一個掛載的 FS 實例的後設資料（block size、inode 數、FS 類型）
inode        → 一個檔案/目錄的後設資料（大小、權限、時間戳、data block 位址）
dentry       → 目錄項目（name → inode 的映射）；組成路徑快取 (dcache)
file         → 一個行程開啟的檔案（包含 fd、offset、file_operations 指標）
```

```c
// 每個 inode 都有一套 inode_operations（目錄操作）
struct inode_operations {
    struct dentry *(*lookup)(struct inode *, struct dentry *, unsigned int);
    int (*create)(struct mnt_idmap *, struct inode *, struct dentry *,
                  umode_t, bool);
    int (*mkdir)(struct mnt_idmap *, struct inode *, struct dentry *, umode_t);
    int (*unlink)(struct inode *, struct dentry *);
    // ...
};

// 每個 file 都有一套 file_operations（檔案 I/O 操作）
struct file_operations {
    ssize_t (*read)(struct file *, char __user *, size_t, loff_t *);
    ssize_t (*write)(struct file *, const char __user *, size_t, loff_t *);
    int     (*open)(struct inode *, struct file *);
    int     (*release)(struct inode *, struct file *);
    // ...
};
```

**路徑解析（pathname lookup）**：  
`open("/home/emma/notes.txt", O_RDONLY)` 的過程：
```
"/"       → root dentry → root inode（superblock.s_root）
"home"    → dcache 查 dentry；miss → inode.lookup("home")
"emma"    → dcache 查；miss → lookup
"notes.txt" → 找到 inode → 建 file struct → 返回 fd
```

Mount 時：某個 dentry 的 `d_mounted` 指向另一個 superblock 的 root，pathname lookup 自動穿越 mount point。

::: en
VFS decouples the kernel's syscall interface from the actual filesystem implementation. When `read(fd, buf, n)` is called, the VFS looks up the `file` struct for `fd`, finds its `file_operations`, and calls `f_op->read(...)`. This is a standard vtable dispatch — ext4, tmpfs, procfs, FUSE all plug in by filling `file_operations` and `inode_operations`. The **dcache** (dentry cache) memoizes path component lookups — traversing `/home/emma/notes.txt` without dcache would require 3 inode lookups on every `open`; with dcache it's often zero.
:::

::: src
出處 Source：OSC2022 Lab 7 (Virtual File System); LKD Ch. 13 (The Virtual Filesystem); "Understanding the Linux Kernel" Ch. 12.
:::

## 為什麼重要 · Why it matters

**OSC2022 Lab 7 要實作的 VFS 子集**：

```
rootfs（tmpfs）
└── /                 ← superblock.s_root
    ├── hello.txt     ← inode (regular file)
    └── subdir/       ← inode (dir)
        └── world.txt ← inode (regular file)

需要實作的 operations：
vnode.lookup / vnode.create / vnode.mkdir
vnode.open / vnode.close / vnode.read / vnode.write
```

**FS 類型比較（都接在 VFS 下）**：

| FS | 後端儲存 | 特色 |
|----|---------|------|
| ext4 | 磁碟 block | 日誌、extent tree、大規模使用 |
| tmpfs | RAM | 重開機消失；`/tmp`、`/dev/shm` |
| procfs | kernel data | 動態生成，零磁碟（見卡片 [[62-proc-filesystem]]）|
| FUSE | user process | 彈性最大（見卡片 [[70-fuse-userspace-fs]]）|
| NFS/CIFS | 網路 | 透過 VFS 完全透明給應用程式 |

::: en
VFS is why `cat /proc/cpuinfo` and `cat /home/emma/notes.txt` both work with the same `open/read` path in glibc — the VFS dispatch table selects the right implementation at runtime. For OSC2022 Lab 7, you build a minimal VFS from scratch: implement the four objects, wire up `lookup`/`create`/`read`/`write` callbacks, and mount it as the root filesystem. The result is a working `ls`/`cat`/`echo` on a ramdisk with no disk at all.
:::

::: src
出處 Source：OSC2022 Lab 7; LKD Ch. 13. 作者整合。
:::

## 一句話帶走 · Takeaway

VFS = 檔案系統的 vtable 層，讓磁碟 FS/記憶體 FS/proc/FUSE/NFS 共用相同的 syscall 介面；四個核心物件（superblock/inode/dentry/file）加上 dcache，就是 Linux 裡所有 `open/read/write` 的骨架。

::: en
VFS = filesystem vtable layer — superblock, inode, dentry, file, plus dcache. Every `open/read/write` syscall dispatches through this layer, making ext4, procfs, FUSE, and NFS completely interchangeable from the application's perspective.
:::
