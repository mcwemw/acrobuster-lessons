# build — Markdown 單一資料源 → 靜態站生成

這個站的**講義卡內容來源是 `cards/*.md`**（一張卡一個檔，Obsidian 相容）。
`lessons/*.html` 與 `content/lessons.js` 都是**生成物，請勿手改**。

## 新增/修改一張卡

1. 在 `cards/` 新增或編輯 `NN-slug.md`（格式見下）。
2. 重新生成：
   ```
   python3 build/build.py cards .
   ```
   → 產出 `lessons/NN-slug.html` 與 `content/lessons.js`（首頁自動讀）。
3. `git add cards lessons content && git commit && git push`。

## 卡片 md 格式

```markdown
---
id: "NN"
slug: my-slug
tag: 提示工程            # RAG / 提示工程 / AI 工程 / 軟體工程 / 模型原理 / 代理工程
title: 中文主標
title_en: "English title"
title_short: 中文短標     # <title> 用
summary: 中文一句話摘要
summary_en: English one-line summary
links: []                # 選填,相關卡 slug
---

## 是什麼 · What it is

中文段落,可用 **粗體**、*斜體*、[[20-slug|卡 20]] 交叉連結、行內 HTML（<span>/<br>/<code>）。

::: en
English twin paragraph.
:::

## 為什麼重要 · Why it matters

| 欄 | 欄 |
|---|---|
| a | b |

::: src
出處 Source：… 作者觀點（Author's view）…
:::

## 一句話帶走 · Takeaway

中文。
::: en
English.
:::
```

- `::: en … :::` → 英文對照段 `<p class="en">`
- `::: src … :::` → 出處區塊 `<div class="src">`
- markdown 表格 → `<table>`；`[[slug|文字]]` → 卡間連結
- 其餘行內 HTML 原樣穿透（色標 span、`<br>` 等）

## 分析（管理/運用/分析）

```
python3 build/analyze.py cards
```
→ 標籤分布、來源覆蓋、交叉連結熱點、孤卡。frontmatter 是結構化可查詢的，
不用爬 HTML。`cards/` 本身就是 Obsidian vault（frontmatter + `[[連結]]`）。

> 每日論文筆記（`notes.html` / `content/notes.js` / `notes/*.png`）是另一條線，
> 由 cron 產生,**不走這個 build**,互不影響。
