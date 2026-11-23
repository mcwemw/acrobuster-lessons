---
id: "71"
slug: booting-bootloader-kernel
tag: Linux
title: 開機流程：從按下電源到 Kernel 接手
title_en: "Booting: From Power-On to Kernel Handoff"
title_short: 開機與 Bootloader
summary: 按下電源後，CPU 從固定位址取第一條指令，經 ROM Bootloader → 二階段 Bootloader（GRUB/U-Boot）→ 解壓 kernel image → 跳進 start_kernel()，整個過程在任何 OS 控制之前完成。
summary_en: Power-on starts the CPU at a fixed reset vector. Control passes through ROM bootloader → second-stage bootloader (GRUB/U-Boot) → decompress kernel image → jump to start_kernel(). All of this happens before any OS code runs.
links: [63-system-calls, 59-linux-char-device-driver]
---

## 是什麼 · What it is

```
[電源]
  ↓
[CPU Reset Vector]  ← CPU 從固定位址（x86: 0xFFFFFFF0, ARM: 0x0 or EL3）取指令
  ↓
[ROM Bootloader / BIOS/UEFI / RPi GPU Firmware]
  │  初始化 DDR、DRAM 時序；找開機媒體（SD/NVMe/USB）
  ↓
[第二階段 Bootloader]  ← GRUB2 (x86) / U-Boot (embedded) / RPi start.elf
  │  載入 kernel image（zImage / vmlinuz / Image.gz）
  │  載入 Initial Ramdisk（initrd / initramfs）
  │  設定 kernel cmdline（/proc/cmdline）
  │  跳到 kernel entry point
  ↓
[Kernel 解壓縮 + 自我重定位]
  ↓
[start_kernel()]  ← C 程式進入點，開始初始化各子系統
  │  setup_arch(), mem_init(), trap_init()
  │  sched_init(), init_IRQ(), console_init()
  ↓
[init process (PID 1)]  ← execve("/sbin/init") 或 systemd
```

**Initial Ramdisk（initrd/initramfs）**：  
Kernel 在掛載真正根 FS 之前，先用 initramfs（cpio 格式）跑一個最小 root，載入儲存控制器模組、LUKS 解密等，再 `pivot_root` 到真正的 `/`。

::: en
Power-on puts the CPU at its reset vector — a fixed physical address. The first code that runs is ROM firmware (RPi: VideoCore GPU firmware; x86: UEFI). It initializes DRAM, finds a bootable device, and hands off to the second-stage bootloader (GRUB or U-Boot). The bootloader loads the kernel image and an optional initramfs (a minimal root in cpio format), passes the kernel cmdline, then jumps to the kernel entry point. `start_kernel()` is the first C function; it brings up the memory allocator, IRQ controller, scheduler, and finally spawns PID 1 (`init`/`systemd`).
:::

::: src
出處 Source：OSC2022 Lab 2 (Booting, UART Bootloader, Ramdisk); Linux kernel `init/main.c`; ARM Trusted Firmware-A docs.
:::

## 為什麼重要 · Why it matters

**UART Bootloader（OSC2022 Lab 2 重點）**：  
Raspberry Pi 3 開發時的 workflow：Bootloader 透過 UART 接收新 kernel image，不用每次重插 SD 卡：

```
Host PC                          RPi3
  │                               │
  │──── UART (115200 baud) ──────→│
  │  xmodem/custom protocol       │ bootloader 在 RAM 中接收 image
  │                               │ 跳到 image entry point
```

**CPIO Archive (initramfs 格式)**：  
```bash
# 解開：
cpio -idmv < initramfs.img
# 建立：
find . | cpio -o --format=newc | gzip > initramfs.img
```
OSC2022 Lab 2 要求實作解析這個格式，讀出其中的 `/init` 並執行。

::: en
Embedded OS development (OSC2022, Raspberry Pi) uses a UART bootloader: the stub resident on the board receives a new kernel image over serial port on every boot, sparing you SD card re-flashing on each test cycle. The initramfs is a cpio archive; the kernel unpacks it into a tmpfs root, runs `/init`, and that script mounts the real filesystem before `pivot_root`. Understanding this two-stage root-mount is essential for debugging early-boot failures (the classic "kernel panic — not syncing: VFS: unable to mount root fs").
:::

::: src
出處 Source：OSC2022 Lab 2; Linux `Documentation/admin-guide/initrd.rst`; "Linux Device Drivers" Ch. 2. 作者整合。
:::

## 一句話帶走 · Takeaway

開機 = CPU 從固定位址醒來 → ROM firmware → bootloader 載 kernel → start_kernel() 初始化所有子系統 → PID 1；initramfs 是 kernel 掛真正根 FS 前的「緊急工具箱」。

::: en
Boot = CPU wakes at reset vector → ROM firmware → bootloader loads kernel → `start_kernel()` initializes all subsystems → PID 1. The initramfs is the kernel's "rescue kit" before the real root filesystem is mounted.
:::
