---
question: 演算法的嚴格定義是什麼?為何把演算法當「技術」看待?正確性(部分vs完全)與效率為何是兩大評量軸?
keywords: [algorithm-definition, algorithms-as-technology, correctness-vs-efficiency]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Algorithm [[raw:algo-role-wikipedia]](CC BY-SA 4.0)、Analysis of algorithms [[raw:algo-analysis-wikipedia]](CC BY-SA 4.0)、Correctness(computer science) [[raw:algo-correctness-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.1(The Role of Algorithms in Computing)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 演算法的角色 The Role of Algorithms（CLRS Ch.1）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★。
> 一句話:演算法=把輸入轉成輸出的**明確有限計算程序**;評一個演算法看兩軸——**正確(對所有合法輸入都停且給對答案)與高效(用多少時間/空間)**。(algo-role-wikipedia)

## 1. 演算法的定義

- **演算法**=一組**良定義、有限步**的計算指令,把一組**輸入**轉成**輸出**。(algo-role-wikipedia)
- 要件:①**有限性**(有限步終止)②**明確性**(每步無歧義)③**輸入/輸出**④**可行性**(每步可機械執行)。
- 一個**計算問題**=指定輸入與期望輸出的關係;演算法是解該問題的**具體方法**。例:排序問題 vs merge sort / quicksort 兩個解。

## 2. 演算法即技術(algorithms as technology)

- CLRS 核心論點:**演算法效率和硬體一樣是「技術」**——更好的演算法帶來的加速,常**勝過更快的硬體**。(algo-role-wikipedia)
- 例:n=10⁷ 時,O(n log n) 的 merge sort 在慢機器上仍遠勝 O(n²) 的 insertion sort 在快機器上 → **演算法選擇決定可行性**,不是堆硬體。
- 演算法是現代系統的共同底層:路由、密碼([[number-theoretic-algorithms]])、生物資訊、搜尋、ML([[ml-algorithms]])皆是。

## 3. 兩大評量軸

- **正確性(correctness)**:(algo-correctness-wikipedia)
  - **部分正確(partial)**:若終止,則輸出正確。
  - **完全正確(total)**:對所有合法輸入**都終止且**輸出正確(= 部分正確 + 終止性)。
  - 證明工具:迴圈不變式(見 [[algorithms-getting-started]])、歸納、前/後置條件。
- **效率(efficiency)**:用[[complexity-and-divide-conquer]] 的漸進符號 O/Θ/Ω 描述時間/空間隨輸入成長率;關注**最壞/平均情形**。

## 4. 深化:成長率實測對照 + 正確性論證 + 陷阱

### 4.1 成長率在大 n 的實際時間(每秒 10⁹ 基本運算)
| n | log₂n | n | n log₂n | n² | 2ⁿ | n! |
|---|---|---|---|---|---|---|
| 10 | 3.3 ns | 10 ns | 33 ns | 100 ns | 1 µs | 3.6 ms |
| 100 | 6.6 ns | 100 ns | 0.66 µs | 10 µs | 4×10¹³ **年** | 天文(>10¹⁴⁰ 年) |
| 10⁶ | 20 ns | 1 ms | 20 ms | **16.7 分** | 不可行 | 不可行 |
| 10⁹ | 30 ns | 1 s | 30 s | **~30 年** | 不可行 | 不可行 |
直觀:n² 在 n=10⁶ 已要分鐘級、10⁹ 要數十年;2ⁿ 在 n=100 就宇宙年齡級。**這張表就是「演算法即技術」的量化根據**——選對階數 vs 換快硬體,差距是指數。

### 4.2 「演算法勝硬體」worked
A 機 10¹⁰ 運算/秒跑 insertion sort(2n²);B 機 10⁷ 運算/秒(慢 1000 倍)跑 merge sort(50n log n)。n=10⁷:
- A:2(10⁷)²/10¹⁰ = **2×10⁴ 秒 ≈ 5.5 小時**。
- B:50·10⁷·log₂10⁷ / 10⁷ ≈ 50·23 = **~1163 秒 ≈ 20 分**。
慢 1000 倍的機器配好演算法,**快了一個量級**。(algo-role-wikipedia 的經典論據)

### 4.3 完全正確性 = 部分正確 + 終止性(worked)
歐幾里得 gcd(a,b):
- **部分正確**:若終止,回傳值整除 a,b 且為最大(由 gcd(a,b)=gcd(b,a mod b) 不變式)。
- **終止性**:每輪第二參數嚴格遞減的非負整數 → 有限步必到 0。
兩者齊 ⟹ **完全正確**。🔴 只證「答案對」不夠,漏證終止 = 只有部分正確(若演算法可能不停,part. correct 空洞成立)。

### 4.4 陷阱
| 陷阱 | 正解 |
|---|---|
| O(n²) 只是「慢一點」 | n 大時是**可行/不可行**的分界(見 4.1) |
| 換更快硬體就能救慢演算法 | 指數/高次項下硬體線性加速杯水車薪(見 4.2) |
| 證了輸出正確=證了正確 | 還要證**終止**才是完全正確 |
| 演算法=程式碼 | 演算法是**方法**(語言無關);程式是其一種實作 |

## 我的想法 / 啟發

- **「演算法即技術」是整門課的世界觀**:它把「選對演算法」提到和工程/硬體同級——呼應我做 RAG/agent 時「對的檢索策略勝過堆模型」的直覺。資格考申論常要你論證「為何不是加硬體就好」。
- **正確 vs 高效是兩條獨立軸**:一個演算法可以對但慢(暴力)、也可以快但錯(漏 case);兩軸都要顧,這正是 Maker/Checker 紀律在演算法上的版本。
- **部分正確 vs 完全正確**的區分常被忽略:證「完全正確」一定要另證**終止性**,資格考愛在這扣分。

## Next action / 下一步

1. 補不同成長率(n! / 2ⁿ / n² / n log n / log n)在大 n 的實際執行時間對照表。
2. 接 [[algorithms-getting-started]](Ch.2)用插入排序示範「正確性(迴圈不變式)+效率(漸進分析)」怎麼落地。

## 交叉引用 / 出處
- raw:`wiki/raw/algo-role-wikipedia.md`、`algo-analysis-wikipedia.md`、`algo-correctness-wikipedia.md`
- [[algorithms-getting-started]] — Ch.2 把本章兩軸具體化;[[complexity-and-divide-conquer]] — 效率軸的符號工具
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.1)
