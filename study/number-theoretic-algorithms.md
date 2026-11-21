---
question: 歐幾里得算 gcd 為何 O(log) 快?擴充版怎麼解模反元素?快速冪模怎麼 O(log n)?RSA 安全性靠什麼數論難題?
keywords: [euclidean-gcd, modular-exponentiation, rsa-cryptosystem]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Euclidean algorithm [[raw:nt-euclid-wikipedia]](CC BY-SA 4.0)、Modular exponentiation [[raw:nt-modexp-wikipedia]](CC BY-SA 4.0)、RSA cryptosystem [[raw:nt-rsa-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.31(Number-Theoretic Algorithms)。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 數論演算法 Number-Theoretic Algorithms（CLRS Ch.31）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★。
> 一句話:gcd/模反元素/快速冪是公鑰密碼的基石;RSA 的安全靠「乘兩大質數容易、分解回去難」這個不對稱。(nt-euclid-wikipedia)

## 1. 歐幾里得算 gcd

- **gcd(a,b)=gcd(b, a mod b)**,遞迴到 b=0。(nt-euclid-wikipedia)
- **複雜度 O(log min(a,b))**:每兩步餘數至少減半(與費氏數相關,最壞是連續費氏數)。
- **擴充歐幾里得**:求 x,y 使 ax+by=gcd(a,b) → 當 gcd=1 時 x 即 **a 的模 b 反元素**(a⁻¹ mod b),解模線性方程/CRT 的關鍵。

## 2. 模運算與快速冪

- **快速冪模(modular exponentiation)**:算 aᵇ mod n,用**平方-乘(binary exponentiation)**把指數二進位拆 → **O(log b)** 次乘法,每次取模防溢位。(nt-modexp-wikipedia)
- 基礎定理:**費馬小定理** a^(p−1)≡1 (mod p)(p 質數)、**歐拉定理** a^φ(n)≡1、**中國剩餘定理(CRT)** 合併互質模同餘。
- 用於:Miller-Rabin 質數測試([[randomized-algorithms]] Monte Carlo)、RSA 加解密。

## 3. RSA

- **金鑰生成**:選大質數 p,q;n=pq,φ(n)=(p−1)(q−1);選 e 與 φ 互質;d=e⁻¹ mod φ(n)(擴充歐幾里得)。(nt-rsa-wikipedia)
- **加密** c=mᵉ mod n、**解密** m=cᵈ mod n(快速冪);正確性由歐拉定理保證。
- **安全**:由 n 反推 d 需知 φ(n)=需分解 n=pq;**大整數分解**目前無多項式算法(但非 NP-complete;Shor 量子算法可破)。

## 我的想法 / 啟發

- **數論這章是「理論難題撐起實用安全」的典範**:gcd/快速冪都 O(log) 便宜,安全性反而建在「分解難」上——易算難逆的不對稱正是公鑰密碼的靈魂。
- **擴充歐幾里得求模反元素**是串起一切的樞紐:CRT、RSA 金鑰、模線性方程全靠它,資格考必會手算。
- **快速冪的平方-乘**是 [[dynamic-programming]]/分治「拆半」思想在指數上的應用;Miller-Rabin 又把它接到 [[randomized-algorithms]] 的 Monte Carlo——數論與隨機化在質數測試交會。

## Next action / 下一步

1. 補擴充歐幾里得 + CRT 完整手算例;Miller-Rabin 錯誤率推導。
2. 補 RSA 數值小例(p,q 具體)端到端;接演算法軌最後專門章(平行/線上/ML演算法)。

## 交叉引用 / 出處
- raw:`wiki/raw/nt-euclid-wikipedia.md`、`nt-modexp-wikipedia.md`、`nt-rsa-wikipedia.md`
- [[randomized-algorithms]] — Miller-Rabin 質數測試(MC);[[np-completeness]] — 分解難但非 NP-complete;[[dynamic-programming]] — 快速冪拆半
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.31)
