---
question: 攤還分析在算什麼(跟平均情形差在哪)？aggregate / accounting / potential 三法怎麼用？動態陣列為何 append 攤還 O(1)？
keywords: [amortized-analysis, potential-method, dynamic-array]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Amortized analysis [[raw:amort-analysis-wikipedia]](CC BY-SA 4.0)、Dynamic array [[raw:amort-dynarray-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.16。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 攤還分析 Amortized Analysis（CLRS Ch.16）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法。
> 一句話:看**一連串操作的總成本平均到每次**,保證最壞序列下的平均——**不是機率平均**。(amort-analysis-wikipedia)

## 1. 是什麼(跟平均情形的差別)

- 攤還成本 = 最壞情況下「n 次操作的總成本 / n」。**不涉及機率/輸入分佈**(這點和「平均情形分析」根本不同)。(amort-analysis-wikipedia)
- 用途:某些資料結構單次操作偶爾很貴,但**攤到整個序列很便宜**。

## 2. 三種方法

- **聚合法 Aggregate**:直接算 n 次操作總成本 T(n),攤還 = T(n)/n。
- **記帳法 Accounting**:每次操作「多收一點 credit」存起來,貴的操作用存款付。保證存款不為負 ⇒ 攤還上界成立。
- **位能法 Potential**:定義位能函數 Φ(狀態);攤還成本 = 實際成本 + ΔΦ。選對 Φ 讓貴操作的 ΔΦ 為負來抵銷。(amort-analysis-wikipedia)

## 3. 經典例

- **動態陣列 append(doubling)**:滿了就配**兩倍**空間搬移。偶爾一次 O(n) 搬,但 n 次 append 總搬移 ≈ 2n → **攤還 O(1)**。(amort-dynarray-wikipedia)
- **堆疊 multipop**:push/pop/multipop 混合序列,每元素最多被 pop 一次 → 攤還 O(1)。
- **二進位計數器 increment**:n 次加一總翻轉位元 ≈ 2n → 攤還 O(1)。
- **Union-Find** 的 α(n)(見 [[mst-union-find]])也是攤還結果。

## 4. 為什麼不是「最壞單次」

單看 append 最壞是 O(n)(那次搬移),但**不可能每次都搬**——doubling 讓貴操作稀疏到被便宜操作攤平。資格考要點:**別把偶發的貴操作當每次成本**。

## 5. 深化:三法同題 worked + 位能計算

同一題「動態陣列 doubling append」用三法各算一次,證攤還 O(1):

### 5.1 聚合法
n 次 append,搬移只發生在容量為 1,2,4,…,2^⌊log n⌋ 時,總搬移 = 1+2+4+…+2^⌊log n⌋ < 2n。加上 n 次基本寫入 n → 總 ≤ 3n → **攤還 3 = O(1)**。

### 5.2 記帳法
每次 append **收 3 元**:1 元付本次寫入、存 2 元。當擴容搬 k 個舊元素時,每個舊元素身上剛好有存款(自它寫入後累積)付搬移。存款永不為負 → **攤還 O(1)**。

### 5.3 位能法
設 Φ = 2·size − capacity(剛擴容後 Φ=0,快滿時 Φ=size)。
- 不擴容的 append:實際 1,ΔΦ=+2 → 攤還 3。
- 擴容(size=cap=k→搬 k):實際 k+1,capacity k→2k 使 ΔΦ = (2(k+1)−2k) − (2k−k) = 2−k → 攤還 = (k+1)+(2−k) = **3**。
貴操作的大實際成本被 Φ 驟降抵銷 → **攤還 O(1)**。∎

### 5.4 二進位計數器(位能法)
Φ = 當前 1 的個數。increment 翻 t 個 1→0 再 1 個 0→1:實際 t+1,ΔΦ = 1−t → 攤還 = (t+1)+(1−t) = **2 = O(1)**。

### 5.5 陷阱
| 陷阱 | 正解 |
|---|---|
| 攤還=平均情形 | 攤還是**最壞序列的確定性平均**,無機率;平均情形對輸入分佈取期望 |
| doubling 改成 +常數擴容也 O(1) | 否!每次 +k 固定 → 總搬移 O(n²) → 攤還 O(n) |
| 位能法 Φ 可亂選 | 須 Φ(初始)≤Φ(任何後續)(或補償),否則攤還界不成立 |
| 單次最壞 O(n) 就是每次成本 | 貴操作稀疏,攤到序列是 O(1) |

## 6. 延伸:進階結構的攤還 + 收縮策略

### 6.1 Splay tree 攤還 O(log n)(位能法)
Φ = Σ_v log(size(v))(各節點子樹大小對數和)。splay 操作把存取節點旋到根,存取路徑上節點的 size 重新分配 → 攤還存取成本 O(log n)(Access Lemma)。無需平衡資訊卻達攤還平衡,且有工作集/靜態最優等自適應性質。見 [[data-structures]]。

### 6.2 Fibonacci 堆攤還
Φ = 樹數 + 2·標記節點數。decrease-key 攤還 **O(1)**(切下子樹、級聯切割用標記控制),extract-min 攤還 O(log n)。使 Dijkstra/Prim 達 O(E+V log V)(見 [[shortest-path]]/[[mst-union-find]])。攤還讓「偶爾的級聯切割」被便宜操作攤平。

### 6.3 動態陣列收縮策略(避免抖動)
刪除也要縮容省空間,但**滿才擴、半滿才縮**會在邊界反覆擴縮(每次 O(n))→ 攤還退化。正解:**容量 1/4 才縮到一半**(擴縮門檻錯開)→ 兩次昂貴操作間必有足夠便宜操作,攤還 O(1)。這是位能/記帳法的經典應用。

### 6.4 三法適用時機
- **聚合法**:所有操作同型、好算總和。
- **記帳法**:不同操作收不同費、直覺「存錢付貴操作」。
- **位能法**:最通用、能處理狀態相關成本;難在選 Φ。

## 我的想法 / 啟發

- **攤還 vs 平均情形是資格考最常混淆點**:攤還是「最壞序列的確定性平均」,平均情形是「對輸入分佈取期望」——務必講清不混用。
- **位能法最通用**:選 Φ 像選 DP 的狀態([[dynamic-programming]])——選對了貴操作自動被抵銷,是高分技巧。
- doubling 的「總搬移 ≈ 2n」是最愛考的攤還計算,要能一步算出。

## Next action / 下一步

1. 建 NP-完備(Ch.34)補完演算法軌。
2. 補位能法對 Fibonacci heap / splay tree 的攤還證明。

## 交叉引用 / 出處
- raw:`wiki/raw/amort-analysis-wikipedia.md`、`amort-dynarray-wikipedia.md`
- [[mst-union-find]] — Union-Find α(n) 攤還;[[data-structures]] — 動態陣列/雜湊 rehash;[[complexity-and-divide-conquer]] — 複雜度表達
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.16)
