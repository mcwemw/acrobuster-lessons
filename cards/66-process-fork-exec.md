---
id: "66"
slug: process-fork-exec
tag: Linux
title: Process 生命週期：fork / exec / wait 三步曲
title_en: "Process Lifecycle: The fork / exec / wait Trilogy"
title_short: fork / exec / wait
summary: Unix process model 三個核心 syscall：fork 複製行程、exec 替換映像、wait 收割殭屍。理解這三步是寫 shell、daemon 或任何多行程程式的基礎。
summary_en: Three core syscalls define the Unix process model — fork copies a process, exec replaces its image, wait reaps the zombie. Understanding this trilogy is fundamental to writing shells, daemons, or any multiprocess program.
links: [63-system-calls]
---

## 是什麼 · What it is

Unix 的「生一個新行程」分兩個步驟，刻意設計如此：

```c
#include <unistd.h>
#include <sys/wait.h>

pid_t pid = fork();   // 複製整個行程（copy-on-write）

if (pid < 0) {
    perror("fork");   // 失敗
} else if (pid == 0) {
    // === 子行程 ===
    execvp("ls", (char *[]){ "ls", "-l", NULL });
    // exec 成功就不會回到這裡；失敗才繼續
    perror("exec");
    _exit(1);
} else {
    // === 父行程 ===
    int status;
    waitpid(pid, &status, 0);   // 等子行程結束，回收資源
    if (WIFEXITED(status))
        printf("exit code: %d\n", WEXITSTATUS(status));
}
```

**三個動作的分工**：

| syscall | 做什麼 | 回傳 |
|---------|--------|------|
| `fork()` | 複製當前行程（包含 fd、記憶體映射，copy-on-write） | 父=子PID，子=0 |
| `exec*()` | 把當前行程的映像換成新程式（不建新行程） | 成功不返回，失敗返回 -1 |
| `wait`/`waitpid` | 父行程等子行程結束，讀取退出狀態並清除 PCB | 子PID |

**殭屍行程（zombie）**：子行程結束後，PCB 殘留直到父行程 `wait`。若父行程先死，init/systemd 接手 `wait`。

::: en
Unix separates "create process" into two steps by design. `fork()` clones the calling process (copy-on-write, so no actual memory copy until write). `exec*()` replaces the process image with a new binary — it does *not* create a new PID. `waitpid` lets the parent reap the child's exit status and free its PCB entry. A child that has exited but not been waited on is a *zombie* — it holds a slot in the process table until the parent calls `wait`.
:::

::: src
出處 Source：APUE Ch. 8 (Process Control); POSIX.1-2017; nctu-ms07 OS HW1 Shell Assignment.
:::

## 為什麼重要 · Why it matters

Shell 的核心邏輯正是這個迴圈：

```c
while (1) {
    char *cmd = readline("$ ");
    pid_t pid = fork();
    if (pid == 0) {
        execvp(cmd, args);  // 子行程變成 cmd
        _exit(127);
    }
    waitpid(pid, NULL, 0);  // 父（shell）等命令結束
}
```

理解 fork/exec 分離的理由：在 `exec` 之前，子行程可以 `dup2` 重導向 fd、`setpgid` 設 job group、`setsid` 建 daemon——這些都要在「已是子行程、尚未換成新程式」的視窗內完成。

::: en
The shell is literally a `fork`→`exec`→`wait` loop. The deliberate gap between `fork` and `exec` is where you do I/O redirection (`dup2`), job control (`setpgid`), and daemonization (`setsid`). Without this two-step design, none of that would be possible without special kernel support.
:::

::: src
出處 Source：APUE Ch. 8; Richard Stevens "Advanced Programming in the UNIX Environment". 作者整合。
:::

## 一句話帶走 · Takeaway

fork = 複印機，exec = 換靈魂，wait = 收屍；shell 的一切行程操作都是這三步的組合。

::: en
fork = copier, exec = soul transplant, wait = reaper. Every process operation a shell does is a composition of these three primitives.
:::
