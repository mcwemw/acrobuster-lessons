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

## 5. 深化:π 表手算 + KMP 線性證明 + 滾動雜湊

### 5.1 π(failure)表手算 P="ababaca"
π[i]=P[0..i] 最長「真前綴=後綴」長度:
```
 i: 0 1 2 3 4 5 6
P:  a b a b a c a
π:  0 0 1 2 3 0 1
```
如 i=4 "ababa":最長真前綴=後綴="aba" 長 3。i=5 "ababac":無 → 0。失配時 P 滑到 π[上一位] 對齊,文字指標不退。

### 5.2 KMP 掃描 O(n+m) 的攤還論證
文字指標 i 只增不減(0→n)。P 指標 j:每次匹配 +1、每次失配 j←π[j−1] 嚴格減。j 總增量 ≤ n(跟著匹配),故總減量也 ≤ n → 失配回退總次數 ≤ n → **掃描 O(n)**。預處理 π 同理 O(m)。合 **O(n+m)**,與 [[amortized-analysis]] 「i 單調」的攤還同型。

### 5.3 滾動雜湊具體式
視窗雜湊 h = (T[i]·b^{m-1}+…+T[i+m-1]) mod q。右移一格:**h' = ((h − T[i]·b^{m-1})·b + T[i+m]) mod q**,O(1) 更新。相等只是「可能匹配」→ **必須逐字驗證**(雜湊碰撞);對手構造全碰撞 → 每視窗驗 m 字 → 最壞 O(nm)。

### 5.4 陷阱
| 陷阱 | 正解 |
|---|---|
| KMP 失配時文字指標回退 | **不回退**;只滑樣式指標 j←π[j−1] |
| Rabin-Karp 雜湊相等即匹配 | 要**逐字驗證**(可能碰撞);否則偽陽性 |
| Rabin-Karp 保證 O(n+m) | 平均 O(n+m),**最壞 O(nm)**(碰撞);KMP 才是確定 O(n+m) |
| π[i]=含自己的前綴 | 是**真前綴**(不含整段),否則永遠=i+1 無意義 |

## 6. 延伸:Z 函數 + Boyer-Moore + Aho-Corasick + 後綴結構

### 6.1 Z 函數
Z[i]=「T 與 T[i..] 的最長公共前綴長」。用「Z-box」維護已知最右匹配區間,O(n) 線性求。可做模式比對(P$T 上找 Z[i]=|P|)、週期檢測、本質上與 KMP 的 π 等價互換。

### 6.2 Boyer-Moore(實務最快)
從樣式**右端往左**比;失配用兩規則跳:**壞字元**(把失配字元對齊樣式中該字元最右出現)+**好後綴**(已匹配後綴的下一出現)。實務常**次線性**(跳過大段文字),最壞 O(nm) 但 Galil 規則可 O(n)。

### 6.3 Aho-Corasick(多樣式)
把多個樣式建成 **Trie + 失配連結(類 KMP π 的多樣式版)** → 一遍掃文字 O(n + 總樣式長 + 匹配數),同時找所有樣式所有出現。病毒掃描/關鍵字過濾主力。Rabin-Karp 多樣式的確定性替代。

### 6.4 後綴結構(更強的全文索引)
- **後綴陣列 + LCP**:O(n log n)/O(n) 建,支援任意子串查詢 O(m log n)。
- **後綴自動機/後綴樹**:O(n) 建,解最長重複子串、最長公共子串、不同子串計數。
把「預處理文字」推到極致,一次建索引多次查詢。

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
