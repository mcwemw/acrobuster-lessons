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

## 4. 深化:擴充歐幾里得 + RSA 小例 + 快速冪 trace

### 4.1 擴充歐幾里得求模反元素(gcd(a,b) 與係數)
求 x,y 使 ax+by=gcd。例 a=3,b=11 求 3⁻¹ mod 11:
```
gcd(3,11): 11=3·3+2; 3=1·2+1; 2=2·1+0 → gcd=1
回代: 1=3−1·2=3−1·(11−3·3)=4·3−1·11
```
→ 4·3 ≡ 1 (mod 11) → **3⁻¹ mod 11 = 4**。這是 RSA 求 d、CRT 合併的核心。

### 4.2 快速冪 trace 3¹³ mod 7
13=1101₂。平方-乘:從高位 1→ r=3;1→ r=3²·3=27≡6;0→ r=6²=36≡1;1→ r=1²·3=3。→ **3¹³≡3 (mod 7)**。O(log 13)=4 步,每步 1 平方(+ 可能 1 乘)。

### 4.3 RSA 端到端小例(p=3,q=11)
n=33,φ=(3−1)(11−1)=20。選 e=3(gcd(3,20)=1);d=3⁻¹ mod 20=7(3·7=21≡1)。
- 加密 m=4:c=4³ mod 33=64 mod 33=**31**。
- 解密 c=31:31⁷ mod 33=**4** ✓(歐拉定理保證)。
安全靠「由 n=33 反推 φ 需分解 33=3×11」——大數時分解難。

### 4.4 陷阱
| 陷阱 | 正解 |
|---|---|
| gcd 遞迴 O(n) | **O(log min)**(餘數兩步減半,最壞費氏數) |
| RSA e 可任選 | 須 gcd(e,φ(n))=1 才有 d |
| 大整數分解是 NPC | **未知**;在 NP∩co-NP,普遍認為非 NPC([[np-completeness]]) |
| 直接算 aᵇ 再 mod | 會溢位;**每步取模** + 平方-乘 O(log b) |

## 5. 延伸:CRT + 質數測試/分解 + 離散對數

### 5.1 中國剩餘定理(CRT)
一組 x≡aᵢ (mod mᵢ)(mᵢ 兩兩互質)有唯一解 mod M=∏mᵢ:x=Σ aᵢ·Mᵢ·(Mᵢ⁻¹ mod mᵢ),Mᵢ=M/mᵢ(模反用擴充歐幾里得 §4.1)。用途:RSA 解密加速(分別 mod p、q 再 CRT 合併,快 ~4 倍)、大數運算分治。

### 5.2 質數測試與分解
- **Miller-Rabin**(機率,§[[randomized-algorithms]]):O(k log³n),實務標準。
- **AKS**:確定性多項式(2002,理論里程碑「質數判定∈P」),實務慢。
- **分解**:試除 O(√n)、Pollard's rho O(n^{1/4})、二次篩/數域篩(大數)。RSA 安全賴分解難;**Shor 演算法**量子多項式分解 → 後量子密碼動機。

### 5.3 離散對數與 Diffie-Hellman
求 x 使 gˣ≡h (mod p) 難(離散對數問題)→ **DH 金鑰交換**:雙方交換 gᵃ、gᵇ,共享密鑰 gᵃᵇ。ElGamal、橢圓曲線密碼(ECC,更短金鑰同安全)皆基於此。與 RSA 並列公鑰兩大家族。

### 5.4 歐拉函數與原根
φ(n)=小於 n 且與 n 互質的個數(φ(p)=p−1,積性);原根 g:其冪遍歷模 p 所有非零餘數。這些是 NTT([[fft-and-matrix]])、密碼的代數基礎。

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
