---
question: KMP 的 prefix/failure 函數怎麼讓比對 O(n+m) 不回溯？Rabin-Karp 的滾動雜湊何時 O(nm)？各適合什麼？
keywords: [string-matching, kmp, rabin-karp]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia KMP [[raw:str-kmp-wikipedia]](CC BY-SA 4.0)、Rabin-Karp [[raw:str-rabinkarp-wikipedia]](CC BY-SA 4.0)、String-searching 總覽 [[raw:str-overview-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.32。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 字串比對 String Matching（KMP / Rabin-Karp）

> 概念頁 · 資格考演算法逐章複習(CLRS Ch.32)· 軌 A 演算法。
> 一句話:在長度 n 的文字找長度 m 的樣式;暴力 O(nm),KMP **O(n+m)** 不回溯,Rabin-Karp 用滾動雜湊平均 O(n+m)。(str-overview-wikipedia)

## 1. 問題與暴力法

- 文字 T(n)、樣式 P(m),找所有出現位置。
- **暴力**:每個位置逐字比,最壞 **O(nm)**(如 T=aaaa…、P=aaab)。

## 2. KMP（Knuth-Morris-Pratt)

- 預處理 P 的 **prefix / failure 函數 π**:π[i] = P[0..i] 的「最長**真前綴**同時也是後綴」長度。(str-kmp-wikipedia)
- 比對時遇到失配,**不把 T 的指標往回退**,而是用 π 把 P 往右滑到下一個可能對齊 → 文字指標只前進。
- 複雜度 **O(n+m)**(預處理 O(m) + 掃描 O(n))。
- 🔴 關鍵觀念:π 把「已匹配前綴的自我重複結構」記下來,避免重比——資格考常考 π 表的計算。

## 3. Rabin-Karp

- 對 P 算一個**雜湊值**;對 T 的每個長度 m 視窗算雜湊,相等才逐字驗證。(str-rabinkarp-wikipedia)
- **滾動雜湊 (rolling hash)**:視窗右移時 O(1) 更新雜湊(減舊字、加新字)→ 掃描 O(n)。
- 平均 **O(n+m)**;**最壞 O(nm)**(雜湊大量碰撞或對手構造)。
- **強項:多樣式比對**(一次比多個 P 的雜湊)、二維/子串指紋。

## 4. 對照（資格考)

- **KMP**:決定性 O(n+m) 保證、單樣式、要算 π 表。
- **Rabin-Karp**:雜湊、平均 O(n+m) 最壞 O(nm)、**多樣式友善**、實作簡單。
- (其他:Boyer-Moore 實務最快、Z-function、Aho-Corasick 多樣式自動機。)

## 我的想法 / 啟發

- **KMP 的 π 函數 = 把樣式的自相似性預先編譯**,和 [[dynamic-programming]] 的「記下來重用」同精神:都是用預處理換掉重算。
- **「平均 vs 最壞」第三度出現**(呼應 [[sorting]] Quick/Heap、[[data-structures]] 雜湊/平衡樹):Rabin-Karp 賭平均、KMP 買保證。
- 資格考拿分點:會**手算 π 表** + 說清 Rabin-Karp 為何最壞 O(nm)(碰撞後要逐字驗)。

## Next action / 下一步

1. 建攤還分析(Ch.16)+ NP-完備(Ch.34)補完演算法軌。
2. 補 Boyer-Moore / Z-function / Aho-Corasick 多樣式。

## 交叉引用 / 出處
- raw:`wiki/raw/str-kmp-wikipedia.md`、`str-rabinkarp-wikipedia.md`、`str-overview-wikipedia.md`
- [[dynamic-programming]] — π 預處理=記憶化精神;[[data-structures]] — 雜湊(Rabin-Karp 滾動雜湊)
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.32)
