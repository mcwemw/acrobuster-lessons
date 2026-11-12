# ACROBUSTER (Accept Robust Master)研究講義站

一個靜態研究講義站，把作者（吳美真 / Emma Wu）的原創研究概念拆成一張張「概念卡」呈現。像課堂的呆一布講義，但內容全部原創。

**線上瀏覽**：啟用 GitHub Pages 後的網址（見下）。

## 這個 repo 的重點

重點不是「做出一個網頁」，而是一套**讓 AI 能照規則繼續長內容**的設定。所有規則寫在 [`AGENTS.md`](AGENTS.md)：AI 讀完就能在不問作者的情況下，正確新增一張風格一致、言而有據的講義卡。

## 結構

```
index.html          首頁(自動列出所有卡)
AGENTS.md           施工規則書(核心)
assets/style.css    全站樣式
content/lessons.js  講義清單資料
lessons/            各張講義卡 + _TEMPLATE.html
```

## 如何新增一張卡

見 [`AGENTS.md`](AGENTS.md) §4：複製範本 → 填內容 → 在 `content/lessons.js` 登記一筆。首頁自動更新。

## 本機預覽

直接用瀏覽器開 `index.html` 即可（純靜態、無需建置）。

## 啟用 GitHub Pages

Settings → Pages → Source 選 `main` 分支 `/ (root)` → 儲存，等網址生效。
