---
id: "60"
slug: kernel-user-data-transfer
tag: OS
title: Kernel-User Space 資料轉移：copy_to_user / copy_from_user
title_en: "Kernel↔User Space Data Transfer: copy_to_user / copy_from_user"
title_short: Kernel-User 資料轉移
summary: Kernel 和 user space 有各自獨立的位址空間；直接解參考 user pointer 是未定義行為。正確做法是透過 copy_to_user / copy_from_user 安全搬資料。
summary_en: Kernel and user space have separate address spaces. Dereferencing a user pointer directly is undefined behavior — always use `copy_to_user` / `copy_from_user`.
links: [09-linux-char-device-driver, 11-kernel-mutex]
---

## 是什麼 · What it is

Linux 把虛擬位址空間分成兩半：**user space**（應用程式）和 **kernel space**（作業系統）。兩者互相隔離，kernel 不能直接讀寫 user 傳進來的指標——可能是無效位址、swap-out 的頁面、或惡意構造的值。

Kernel 提供兩個安全拷貝函式：

```c
/* kernel 緩衝區 → user 緩衝區 (read 實作用) */
unsigned long copy_to_user(void __user *to, const void *from, unsigned long n);

/* user 緩衝區 → kernel 緩衝區 (write 實作用) */
unsigned long copy_from_user(void *to, const void __user *from, unsigned long n);
```

兩者回傳「**未能複製的 bytes 數**」：0 = 全部成功，非零 = 部分失敗 → 應回傳 `-EFAULT`。

實際用法：

```c
/* kfetch read：把 kernel 內的字串送給 user */
if (copy_to_user(buffer, kfetch_buf, len))
    return -EFAULT;

/* kfetch write：從 user 讀一個 int（bitmask） */
int mask_info;
if (copy_from_user(&mask_info, buffer, sizeof(mask_info)))
    return -EFAULT;
info_mask = mask_info;
```

`__user` 是 Sparse（靜態分析工具）標記，不影響執行期行為，但讓工具能偵測「你直接解 user pointer」的錯誤。

::: en
Linux splits virtual address space: **user space** (apps) and **kernel space** (OS). They're isolated — kernel cannot directly dereference user-provided pointers (invalid address, swapped-out page, or malicious value). The safe API: `copy_to_user` (kernel → user, for `read`) and `copy_from_user` (user → kernel, for `write`). Both return the number of bytes **not** copied: 0 = success, nonzero = partial failure → return `-EFAULT`. The `__user` annotation is a Sparse hint for static analysis; it has no runtime effect.
:::

::: src
出處 Source：LKMPG Ch. 4 (Character Device Drivers), copy_to/from_user section. sysprog21.github.io/lkmpg
:::

## 為什麼重要 · Why it matters

這個設計背後有兩個理由：

**安全性**：user 傳進任意指標，如果 kernel 直接解參考，攻擊者可以讓 kernel 讀寫任意記憶體（kernel 跑在 ring 0，沒有更高層級的保護）。

**可靠性**：user-space 頁面可能被 swap 出去；`copy_from_user` 在內部處理 page fault，不會直接 panic。

常見錯誤（別這樣做）：
```c
// ❌ 直接解參考 user pointer — 未定義行為
int mask = *(int *)buffer;

// ✅ 正確
int mask;
copy_from_user(&mask, buffer, sizeof(mask));
```

::: en
Two reasons this design exists: **Security** — a user-supplied pointer could be anything; with ring-0 access, a direct dereference lets attackers read/write arbitrary memory. **Reliability** — user-space pages may be swapped out; `copy_from_user` handles page faults internally. Common bug to avoid: `*(int*)buffer` bypasses all checks.
:::

::: src
出處 Source：LKMPG Ch. 4; Linux Kernel Security section on user pointer validation. 作者整合。
:::

## 一句話帶走 · Takeaway

Kernel 收到 user 傳進來的指標，永遠不要直接解參考——用 `copy_from_user` / `copy_to_user`，它同時保護安全性和頁面錯誤處理。

::: en
Never dereference a user-space pointer directly in kernel code — always use `copy_from_user` / `copy_to_user`. They handle both security validation and page-fault recovery.
:::
