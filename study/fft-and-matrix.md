---
question: FFT 怎麼把多項式乘法從 O(n²) 降到 O(n log n)?Strassen 怎麼把矩陣乘法壓到 O(n^2.81)?LU 分解解線性方程組的用途?
keywords: [fast-fourier-transform, strassen-matrix-multiply, lu-decomposition]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Fast Fourier transform [[raw:num-fft-wikipedia]](CC BY-SA 4.0)、Strassen algorithm [[raw:num-strassen-wikipedia]](CC BY-SA 4.0)、LU decomposition [[raw:num-lu-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.30(FFT)+Ch.28(Matrix Operations)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# FFT 與矩陣運算（CLRS Ch.30 + Ch.28）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★。
> 一句話:FFT 用「點值表示 + 單位根分治」把多項式乘法降到 O(n log n);矩陣乘法 Strassen 用分治少一次乘法降到 O(n^2.81),LU 分解把解方程組攤成三角回代。(num-fft-wikipedia)

## 1. FFT(Ch.30)

- **多項式兩種表示**:係數式 vs **點值式**;點值式下乘法只需逐點相乘 O(n)。(num-fft-wikipedia)
- **FFT = 係數↔點值的快速轉換**:在 n 個**單位根**上求值,用分治(奇偶項拆半 + 單位根對稱性)→ **O(n log n)**。逆 FFT 同法。
- **多項式乘法**:FFT 求值 → 逐點乘 → 逆 FFT 插值,總 **O(n log n)**(vs 樸素 O(n²))。應用:大整數乘法、卷積、訊號處理。

## 2. 矩陣乘法:Strassen(Ch.28)

- 樸素矩陣乘 O(n³)。**Strassen**:把 2×2 分塊,用 **7 次**(而非 8 次)子矩陣乘法 + 加減 → 遞迴式 T(n)=7T(n/2)+O(n²) → **O(n^log₂7)=O(n^2.807)**。(num-strassen-wikipedia)
- 代價:常數大、數值穩定性較差、實務僅大矩陣划算。理論下界仍開放(目前最佳 ~O(n^2.37),galactic)。
- 分治思想同 [[complexity-and-divide-conquer]] 的 Master 定理。

## 3. 解線性方程組:LU 分解(Ch.28)

- **LU 分解**:A = L·U(下三角×上三角);解 Ax=b 變成 **Ly=b(前代)+ Ux=y(回代)**,各 O(n²)。(num-lu-wikipedia)
- 分解本身 O(n³)(高斯消去),但一次分解可重複解多個 b(分攤)。**部分選主元(partial pivoting)**PA=LU 保數值穩定。
- 相關:矩陣求逆、行列式都可由 LU 得。

## 4. 深化:FFT 蝶形 + Strassen 7 式 + LU trace

### 4.1 FFT 分治(奇偶拆 + 單位根對稱)
求 A(x) 在 n 個單位根 ω^0..ω^{n-1} 的值。拆 A(x)=A_even(x²)+x·A_odd(x²)。因 **(ω^{k+n/2})²=(ω^k)²**(平方後奇偶各半的點重合)→ 只需在 n/2 個點算兩個半多項式,再 O(n) 合併(**蝶形**:y_k=E_k+ω^k O_k, y_{k+n/2}=E_k−ω^k O_k)。T(n)=2T(n/2)+O(n) → **O(n log n)**。逆 FFT 用 ω⁻¹ 並除 n。

### 4.2 Strassen 7 式(為何 7 不是 8)
2×2 分塊 C=AB 本需 8 乘。Strassen 定 7 個積 M₁..M₇(如 M₁=(A₁₁+A₂₂)(B₁₁+B₂₂)…),再用加減組出 C 的四塊。T(n)=7T(n/2)+Θ(n²) → Master 情形 1 → **Θ(n^{log₂7})=Θ(n^2.807)**。省的一次乘法經遞迴放大成指數改善(加減 O(n²) 不影響階)。

### 4.3 LU 解 Ax=b trace
A=[[2,1],[4,3]] → 高斯消去:row2 −= 2·row1 → U=[[2,1],[0,1]],L=[[1,0],[2,1]]。解 b=[3,7]:
- 前代 Ly=b:y₁=3,y₂=7−2·3=1。
- 回代 Ux=y:x₂=1,x₁=(3−1)/2=1。→ x=[1,1]。
一次 LU 分解(O(n³))後,每個新 b 只需 O(n²) 前後代。

### 4.4 陷阱
| 陷阱 | 正解 |
|---|---|
| FFT 任意 n | 基本 Cooley-Tukey 要 n=2ᵏ;任意 n 用 Bluestein/混合基 |
| Strassen 實務總比樸素快 | 否,常數大+數值差,僅大矩陣划算 |
| LU 不需選主元 | 需 **partial pivoting**(PA=LU)防小主元數值爆炸 |
| FFT 只做訊號 | 核心是**多項式/大整數乘法 O(n log n)** |

## 我的想法 / 啟發

- **FFT 的核心是「換表示法」**:係數式難乘、點值式易乘,FFT 是兩者間的快速橋——跟 [[linear-programming]] 的 primal/dual「換視角解更易」同一智慧。單位根的對稱性讓分治成立。
- **Strassen 是「少一次乘法」的分治勝利**:7 vs 8 看似小,遞迴放大成指數改善,是 [[complexity-and-divide-conquer]] Master 定理 case 1 的經典實例。
- **LU 的價值在「一次分解、多次解」**:攤還思想——把貴的 O(n³) 分解攤到多個 b 的 O(n²) 回代上,呼應 [[amortized-analysis]]。

## Next action / 下一步

1. 補 FFT 蝶形運算 + 單位根對稱完整推導;Strassen 7 式明寫。
2. 補 LU partial pivoting 穩定性 + 條件數;接數論(Ch.31)。

## 交叉引用 / 出處
- raw:`wiki/raw/num-fft-wikipedia.md`、`num-strassen-wikipedia.md`、`num-lu-wikipedia.md`
- [[complexity-and-divide-conquer]] — Master 定理(Strassen/FFT 皆分治);[[linear-programming]] — 換表示法;[[amortized-analysis]] — LU 一次分解多次用
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.30+28)
