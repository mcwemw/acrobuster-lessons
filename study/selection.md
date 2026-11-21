---
question: 找第 k 小(中位數)不用整排怎麼做？Quickselect 為何平均 O(n)、最壞 O(n²)？median-of-medians 怎麼保證最壞 O(n)？
keywords: [selection-algorithm, quickselect, median-of-medians]
type: concept
source: 公開 CC 來源(2026-11-21 ingest)—Wikipedia Selection algorithm [[raw:sel-overview-wikipedia]](CC BY-SA 4.0)、Quickselect [[raw:sel-quickselect-wikipedia]](CC BY-SA 4.0)、Median of medians [[raw:sel-mom-wikipedia]](CC BY-SA 4.0)。canonical=CLRS Ch.9。
source_authority: 高(公開標準教材,授權 CC,主張可回 wiki/raw/)。
tag: 演算法
---

# 中位數與順序統計 Selection（CLRS Ch.9）

> 概念頁 · 資格考演算法逐章複習 · 軌 A 演算法 · ★★。
> 一句話:找「第 k 小」(中位數是第 n/2 小)**不必整排**;平均 O(n) 用 Quickselect,最壞 O(n) 用 median-of-medians。(sel-overview-wikipedia)

## 1. 問題

- 第 k 個順序統計量 = 排序後第 k 小的元素;中位數 = 第 ⌊n/2⌋(或上/下中位)。
- 樸素:**整排 O(n log n)** 再取第 k。能不能更快?

## 2. Quickselect（平均 O(n))

- 像 [[sorting]] 的 Quicksort,但 partition 後**只遞迴 k 所在的那一側**(另一側丟掉)。(sel-quickselect-wikipedia)
- 期望 **O(n)**(T(n)=T(n/2)+O(n) 幾何級數收斂);**最壞 O(n²)**(壞 pivot 每次只去掉一個)。
- 隨機化 pivot → 期望 O(n) 穩定。

## 3. median-of-medians / BFPRT（最壞 O(n))

- 選 pivot 的確定性法:把元素每 **5 個一組**求各組中位數,再遞迴求「這些中位數的中位數」當 pivot。(sel-mom-wikipedia)
- 保證 pivot 至少踢掉常數比例(~30%)→ 遞迴式 T(n) ≤ T(n/5) + T(7n/10) + O(n) → **最壞 O(n)**。
- 代價:常數大,實務常數比 Quickselect 差;理論價值(破最壞 O(n²))。

## 4. 對照(資格考)

- 要快、可接受隨機:**Quickselect**(期望 O(n))。
- 要最壞保證線性:**median-of-medians**(確定 O(n),常數大)。
- 都 beat「整排 O(n log n)」——**選擇不需要完全排序**是核心洞察。

## 我的想法 / 啟發

- **「平均 vs 最壞」第 N 次出現**(呼應 [[sorting]] Quick/Heap、[[data-structures]] 雜湊/樹、[[string-matching]] KMP/RK):Quickselect 賭平均、BFPRT 買保證——同一個權衡母題。
- **median-of-medians 可當 Quicksort 的 pivot** → 讓 Quicksort 最壞也 O(n log n)(雖常數大,是理論亮點)。
- 核心洞察拿分:**找第 k 不必整排**,partition 一側遞迴就夠。

## Next action / 下一步

1. 建隨機化演算法(Ch.5)——Quickselect/Quicksort 的期望分析根基。
2. 補 median-of-medians 的 T(n)≤T(n/5)+T(7n/10)+O(n) 完整推導。

## 交叉引用 / 出處
- raw:`wiki/raw/sel-overview-wikipedia.md`、`sel-quickselect-wikipedia.md`、`sel-mom-wikipedia.md`
- [[sorting]] — Quickselect=Quicksort 單側遞迴;pivot 選法共用
- roadmap:`deliverables/llm-wiki-hw-w10/STUDY-WIKI-ROADMAP.md`(演算法軌 CLRS Ch.9)
