---
date: 2026-11-15
tag: 模型原理
title: AI 期末複習：8 題範例 → 概念卡導航
title_en: AI Final Review — 8 Sample Problems Mapped to Concept Cards
source: NYCU Spr2026《Artificial Intelligence》期末範例考題（王才沛）· 範例題目，非真題
---

## 核心問題 · Question

範例考題怎麼對到站上的概念卡？教授提示：<strong>別背公式，要懂每個項的意義與目的</strong>——這正好是這些卡的寫法。以下 8 題各連到能直接複習的卡，附一句話答題骨架；完整推導與連結在卡裡。

## 8 題 → 概念卡導航 · Problem → Card

- <strong>pretext task 各舉一例（影像／NLP）</strong> → <a href="lessons/34-embedding-is-the-throughline.html">卡 34</a>、<a href="lessons/39-simclr-loss-is-not-objective.html">39</a>：影像＝遮塊補（inpainting）／旋轉預測／拼圖，或 SimCLR 的「同圖兩擴增互為正樣本」；NLP＝遮字（masked word）、預測下一詞、CBOW／skip-gram 用上下文預測中心詞。
- <strong>model-based vs model-free RL</strong> → <a href="lessons/37-reward-is-rl-loss-credit-assignment.html">卡 37</a>：model-based＝已知（或先學）轉移函數與獎勵，拿 MDP 來規劃；model-free＝不知 MDP，直接靠取樣經驗學 policy／價值（Q-learning、TD）。
- <strong>policy 是什麼＋為何 state value 依賴 policy</strong> → <a href="lessons/37-reward-is-rl-loss-credit-assignment.html">卡 37</a>：policy π＝狀態→動作的對應；state value＝從該狀態起的期望累積獎勵，但你拿到哪些未來獎勵取決於走哪些動作＝policy，換 policy→走不同路徑→期望報酬就不同。
- <strong>bias-variance 兩難＋與模型複雜度的關係</strong> → <a href="lessons/32-bias-variance-complexity-knob.html">卡 32</a>：bias＝擬合不足（太簡單→欠擬合）、variance＝對訓練集太敏感（太複雜→過擬合學到雜訊）；模型複雜度是同一個旋鈕，兩端各拉一邊。
- <strong>畫 autoencoder＋指出 information bottleneck 及其目的</strong> → <a href="lessons/34-embedding-is-the-throughline.html">卡 34</a>：encoder→code（瓶頸）→decoder 重建輸入；瓶頸逼網路壓縮、只留重要資訊，那段 code 就是嵌入。
- <strong>SVM 成本函數兩項的意義</strong>（<code>½‖w‖² + C·Σξᵢ</code>）→ <a href="lessons/33-loss-is-the-classifier-worldview.html">卡 33</a>：½‖w‖²＝最大化間隔（最小化 ‖w‖，求泛化）；C·Σξ＝對鬆弛（違反間隔／分錯）的懲罰，C 權衡「大間隔 vs 少分錯」。
- <strong>PCA 投影的準則（最小化／最大化什麼）</strong> → <a href="lessons/34-embedding-is-the-throughline.html">卡 34</a>：最大化保留變異 ＝ 最小化重建誤差；投影到協方差矩陣最大特徵值的特徵向量（讓新座標去相關）。
- <strong>用圖說明對比學習的基本概念</strong> → <a href="lessons/39-simclr-loss-is-not-objective.html">卡 39</a>、<a href="lessons/34-embedding-is-the-throughline.html">34</a>：同源的兩個 view 要拉近、不同源要推遠，在嵌入空間裡學出「相似」。

## 一條貫穿線 · The through-line

八題背後其實是同一句話：<strong>你優化的代理訊號 ≠ 你真正要的，中間永遠要插一道獨立驗證</strong>。loss／reward 是代理（<a href="lessons/33-loss-is-the-classifier-worldview.html">卡 33</a>／<a href="lessons/37-reward-is-rl-loss-credit-assignment.html">37</a>），SimCLR 的 loss≠objective 要靠下游任務驗（<a href="lessons/39-simclr-loss-is-not-objective.html">卡 39</a>），bias-variance 要靠交叉驗證而非訓練誤差（<a href="lessons/32-bias-variance-complexity-knob.html">卡 32</a>）。懂了這條線，題目換皮也答得出來。
