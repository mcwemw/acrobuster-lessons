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
